import request from '@/plugin/axios'
/**
 * 创建
 * @param data
 * @returns {AxiosPromise}
 */
export function create (data) {
  return request({
    url: '/web/v1/forms',
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
    url: `/web/v1/forms`,
    method: 'GET',
    pageInfo: pageData
  })
}

export function QueryFormList(params){
  return request({
    url:`/web/v1/forms`,
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
    url: `/web/v1/forms/${recordId}`,
    method: 'PUT',
    data
  })
}

/**
 * 删除
 * @param recordId 记录ID
 */
export function deleteSystem (recordId) {
  return request({
    url: `/web/v1/forms/${recordId}`,
    method: 'delete'
  })
}
