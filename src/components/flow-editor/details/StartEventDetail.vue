<template>
  <div :data-clazz="model.clazz">
    <el-card header="开始节点">
        <default-detail :on-change="onChange" :model="model"/>
    </el-card>
  </div>
</template>

<script>
import DefaultDetail from './DefaultDetail'
export default {
  // 开始节点配置
  name: 'StartEventDetail',
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
