import request from './request'

/** 获取人员列表*/
export function getUserList(params) {
  return request({
    url: '/api/getUserList',
    method: 'get',
    params
  })
}

/** 获取人员分页列表*/
export function getUserListByPage(params) {
  return request({
    url: '/api/getUserListByPage',
    method: 'get',
    params
  })
}

/** 添加人员*/
export function createUser(data) {
  return request({
    url: '/api/createUser',
    method: 'post',
    data
  })
}

/** 删除人员*/
export function delUser(params) {
  return request({
    url: '/api/delUser',
    method: 'delete',
    params
  })
}

/** 修改人员*/
export function updateUser(data) {
  return request({
    url: '/api/updateUser',
    method: 'put',
    data
  })
}

/** 获取单个人员*/
export function getUserDetail(params) {
  return request({
    url: '/api/getUserDetail',
    method: 'get',
    params
  })
}

/** 上传头像 */
export function upload(data) {
  return request({
    url: '/api/upload',
    method: 'post',
    data
  })
}
