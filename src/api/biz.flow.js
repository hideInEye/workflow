import request from '@/plugin/axios'

/**
 * 创建三方业务系统
 * @param data
 * @returns {AxiosPromise}
 */
export function createFlow (data) {
  return request({
    url: '/web/v1/flows',
    method: 'POST',
    data: data
  })
}

/**
 * 查询分页
 * @param params
 */
export function queryPageFlow ({ pageData }) {
  return request({
    url: `/web/v1/flows`,
    method: 'GET',
    pageInfo: pageData
  })
}

/**
 * 更新
 * @param recordId 编辑记录ID
 * @param data 数据
 */
export function updateFlow ({ recordId, data }) {
  return request({
    url: `/web/v1/flows/${recordId}`,
    method: 'PUT',
    data
  })
}

/**
 * 删除三方业务系统
 * @param recordId 记录ID
 */
export function deleteFlow (recordId) {
  return request({
    url: `/web/v1/flows/${recordId}`,
    method: 'delete'
  })
}

/**
 * 更新流程实例
 * */
export function UpdateFlowEdit (id,data){
  return request(
    {
      url:`/web/v1/edit_flows/${id}`,
      method:"PUT",
      data
    }
  )

}

export function QueryUserList (data) {
  return request({
    url:'/web/v1/b_users',
    method:"GET",
    data:data
  })
}
