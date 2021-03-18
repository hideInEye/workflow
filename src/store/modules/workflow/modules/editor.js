export default {
  namespaced: true,
  state: {
    // 当前编辑的流程
    flow: {
      form: [
        {
          title: '标题',
          name: 'title',
          type: 'string'
        },
        {
          title: '金额',
          name: 'number',
          type: 'number'
        }
      ]

    },
    // G6
    graph: null,
    row:{}
  },
  mutations: {
    /**
     * 保存当前编辑的流程
     * @param state
     * @param flow flow对象
     */
    save (state, flow) {
      state.flow = flow
    },
    /**
     * 保存当前编辑器的G6对象
     * @param state
     * @param graph
     */
    setGraph (state, graph) {
      state.graph = graph
    },
    // 保存审批流程行数据
    saveRowData(state,row){
      console.log(row)
      state.row=row
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },

  }
}
