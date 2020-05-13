<template>
  <div class="branch">
    <el-row>
      <el-col :span="12">分支：{{this.node.getTarget().getModel().label}}</el-col>
      <el-col :span="12"><el-button size="small" @click="handleOpenConfig">配置</el-button></el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  // 分支条件配置组件
  name: 'BranchCondition',
  props: {
    node: {
      type: Object
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleOpenConfig () {
      this.onChange(this.node)
    }
  }
}
</script>

<style lang="scss">
  .branch {
    margin-bottom: 8px;
    padding-bottom: 4px;
    border-bottom: 1px solid #EBEEF5;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
