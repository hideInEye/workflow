import request from '@/plugin/axios'
// import {stringify} from 'qs'
/**
 * 创建三方业务系统
 * @param data
 * @returns {AxiosPromise}
 */
export function create (data) {
  return request({
    url: '/web/v1/systems',
    method: 'POST',
    data: data
  })
}

/**
 * 查询分页
 * @param params
 */
export function queryPage ({ pageData }) {
  return request({
    url: `/web/v1/systems`,
    method: 'GET',
    pageInfo: pageData
  })
}

export function QueryList(params){
  return request({
    url:`/web/v1/systems`,
    method:"GET",
    data:params
  })
}

/**
 * 更新
 * @param recordId 编辑记录ID
 * @param data 数据
 */
export function update ({ recordId, data }) {
  return request({
    url: `/web/v1/systems/${recordId}`,
    method: 'PUT',
    data
  })
}

/**
 * 删除三方业务系统
 * @param recordId 记录ID
 */
export function deleteSystem (recordId) {
  return request({
    url: `/web/v1/systems/${recordId}`,
    method: 'delete'
  })
}

export function QueryUserList(params){
  return request({
    url:`/sys/v1/users`,
    method:'GET',
    data:params
  })
}
