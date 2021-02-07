import request from '../request'

/** 获取人员列表*/
export function getUserList(params) {
  return request({
    url: '/getUserList',
    method: 'get',
    params
  })
}

/** 获取人员分页列表*/
export function getUserListByPage(params) {
  return request({
    url: '/getUserListByPage',
    method: 'get',
    params
  })
}

/** 添加人员*/
export function createUser(data) {
  return request({
    url: '/createUser',
    method: 'post',
    data
  })
}

/** 删除人员*/
export function delUser(params) {
  return request({
    url: '/delUser',
    method: 'delete',
    params
  })
}

/** 修改人员*/
export function updateUser(data) {
  return request({
    url: '/updateUser',
    method: 'put',
    data
  })
}

/** 获取单个人员*/
export function getUserDetail(params) {
  return request({
    url: '/getUserDetail',
    method: 'get',
    params
  })
}
