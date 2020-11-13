import axios from 'axios'
import { message } from 'ant-design-vue'

import router from '../router/index'

message.config({
  top: `64px`,
  duration: 2,
  maxCount: 3
})

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: false,
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

// 响应拦截
service.interceptors.response.use(
  res => {
    switch (res.data.code) {
      case 200:
        return successRes(res)
      case 201:
        return successChange(res)
      case 203:
        return successChange(res)
      case 202:
        return danger(res)
      case 204:
        return danger(res)
      case 301:
        return danger(res)
      case 302:
        return warning(res)
      default:
        break
    }
  },
  err => {
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
