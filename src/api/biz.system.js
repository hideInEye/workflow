import request from '@/plugin/axios'
import { stringify } from 'qs'
/**
 * 创建三方业务系统
 * @param data
 * @returns {AxiosPromise}
 */
export function create (data) {
  return request({
    url: 'v1/systems',
    method: 'post',
    data
  })
}

/**
 * 查询分页
 * @param params
 */
export function queryPage ({ pageData }) {
  return request({
    url: `/v1/systems`,
    method: 'GET',
    pageInfo: pageData
  })
}
