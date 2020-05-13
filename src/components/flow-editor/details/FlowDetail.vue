<template>
  <el-card header="流程配置">
    <default-detail :model="model" :on-change="onChange"/>
  </el-card>
</template>

<script>
import DefaultDetail from './DefaultDetail'
export default {
  // 线条配置
  name: 'FlowDetail',
  components: { DefaultDetail },
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
