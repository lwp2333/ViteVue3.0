import request from '../request'

/** 获取人员列表*/
export function getMockPic(params) {
  return request({
    url: '/mockPic',
    method: 'get',
    params
  })
}
