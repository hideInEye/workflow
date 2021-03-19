import {QuerySystemList} from "@/api/biz.flow";

export default {
  namespaced: true,
  state: {
    // G6
    graph: null,
    flowData: [],
    // 行数据
    rowData:{}
  },
  mutations: {
    /**
     * 保存当前编辑的流程
     * @param state
     * @param flow flow对象
     */
    save(state, flow) {
      state.flow = flow
    },
    /**
     * 保存当前编辑器的G6对象
     * @param state
     * @param graph
     */
    setGraph(state, graph) {
      state.graph = graph
    },
    // 保存审批流程行数据
    saveFlowData(state, row) {
      state.flowData = row
    },
    saveRowData(state,row){
      console.log(row,'modules')
     state.rowData=row

    }
  },
  actions: {
    async saveFlowData({commit}, row) {
      const params = {
        q: 'list',
        form_id: row.form_id
      }
      const res = await QuerySystemList(params)
      if (res && !res.error) {
        commit("saveFlowData", res.list)
      }
    },
    saveRowData({commit},row){
      commit("saveRowData",row)
    }

  }
}
