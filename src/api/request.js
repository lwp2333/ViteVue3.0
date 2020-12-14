import axios from 'axios'
import { message } from 'ant-design-vue'
import { setAccessToken, getAccessToken, setRefreshToken, getRefreshToken } from '/@/utils/auth'
import router from '../router/index'
import { autologin } from '/@/api/user'
message.config({
  top: `64px`,
  duration: 2,
  maxCount: 3
})

/**
 * 加载环境变量
 */
const baseURL = import.meta.env.VITE_APP_BASE_API
const service = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000
})
window.axiosCalcelTokenArr = []
// 请求前拦截
service.interceptors.request.use(
  config => {
    /**
     * 给每个请求一个token 标记，用于页面切换。取消上个未完成的接口请求
     */
    config.cancelToken = new axios.CancelToken(cancel => {
      window.axiosCalcelTokenArr.push({ cancel })
    })
    config.headers.accessToken = getAccessToken()
    config.headers.refreshToken = getRefreshToken()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

const successRes = res => {
  // 接口请求成功
  return res.data.data
}
const successChange = res => {
  // 删除，修改记录成功
  message.success(res.data.message)
  return res.data.data
}
const warning = res => {
  // 请求失败，字段缺失
  message.warning(res.data.message)
  return Promise.reject(res.data.message)
}
const danger = res => {
  // 请求失败，原因message
  message.error(res.data.message)
  return Promise.reject(res.data.message)
}
const autoLogin = async res => {
  const data = {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken()
  }
  const hide = message.loading(res.data.message, 0)

  const token = await autologin(data).catch(() => {
    // 处理自动登录失败
    message.error('自动登录失败，请重新登录')
    hide()
    // 跳转登录界面
    window.location.href = '/#/login'
  })
  // 自动登录成功
  const { accessToken, refreshToken } = token
  setAccessToken(accessToken)
  setRefreshToken(refreshToken)
  hide()
  window.location.reload() //浏览器刷新，体验不友好
}
// 响应拦截
service.interceptors.response.use(
  res => {
    switch (res.data.code) {
      case 200:
        return successRes(res)
      case 201:
        return successChange(res)
      case 202:
        return danger(res)
      case 203:
        return successChange(res)
      case 204:
        return danger(res)
      case 301:
        return danger(res)
      case 302:
        return warning(res)
      case 403:
        return autoLogin(res)
      default:
        break
    }
  },
  err => {
    // 处理403 重新登录逻辑
    if (err.response.status === 403) {
      message.error('登录凭证失效，请重新登录')
      window.location.href = '/#/login'
      return
    }
    message.error(err.message)
    return Promise.reject(err.message)
  }
)
service.download = async (url, params) => {
  // 下载二进制文件
  const fullUrl = process.env.VUE_APP_BASE_API + url
  const res = await axios.get(fullUrl, { params, responseType: 'blob' })
  // 保存文件
  const { fileName } = params
  if (!res.data) {
    message.error('文件下载失败')
    return
  }
  if (window.navigator.msSaveBlob) {
    navigator.msSaveBlob(res.data, fileName)
    return
  }
  // 处理兼容IE
  let blobUrl = window.URL.createObjectURL(res.data)
  let link = document.createElement('a')
  link.download = blobUrl
  link.click()
  window.URL.revokeObjectURL(blobUrl)
}

router.beforeEach((to, from, next) => {
  window.axiosCalcelTokenArr.forEach((item, index) => {
    if (item) {
      item.cancel('上个页面未完成的接口请求已成功取消')
      window.axiosCalcelTokenArr.splice(index, 1)
    }
  })
  next()
})

export default service
