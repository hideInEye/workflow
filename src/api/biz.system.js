import request from '@/plugin/axios'
/**
 * 创建三方业务系统
 * @param data
 * @returns {AxiosPromise}
 */
export function create (data) {
  return request({
    url: 'v1/systems',
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
    url: `/v1/systems`,
    method: 'GET',
    pageInfo: pageData
  })
}

/**
 * 更新
 * @param recordId 编辑记录ID
 * @param data 数据
 */
export function update ({ recordId, data }) {
  return request({
    url: `/v1/systems/${recordId}`,
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
    url: `/v1/systems/${recordId}`,
    method: 'delete'
  })
}