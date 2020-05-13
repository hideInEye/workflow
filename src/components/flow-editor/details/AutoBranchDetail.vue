<template>
  <el-card header="条件节点">
    <default-detail :model="model" :on-change="onChange"/>
    <el-divider></el-divider>
    <div class="row">
      <span>分支条件配置：</span>
      <branch-condition :on-change="branchChange" v-for="item in outEdges" :node="item" :key="item.get('id')"/>
    </div>
  </el-card>
</template>

<script>
import DefaultDetail from './DefaultDetail'
import BranchCondition from './components/BranchCondition'
export default {
  // 条件分支节点配置
  name: 'AutoBranchDetail',
  components: { BranchCondition, DefaultDetail },
  data () {
    return {
      branches: (this.model.config && this.model.config.branches) || [],
      outEdges: this.model.item.getOutEdges()
    }
  },
  methods: {
    branchChange (node) {
      this.model.graph.updateItem(node.get('id'), { label: 'sdfsdf' })
    }
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style scoped>

</style>
