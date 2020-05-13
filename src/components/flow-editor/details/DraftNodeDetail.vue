<template>
  <div>
    <el-card header="起草节点">
      <default-detail :model="model" :on-change="onChange"/>
      <notify-config :model="model" :on-change="onChange"/>
    </el-card>
  </div>
</template>

<script>
import DefaultDetail from './DefaultDetail'
import NotifyConfig from './components/NotifyConfig'
export default {
  // 起草节点配置
  name: 'DraftNodeDetail',
  components: { NotifyConfig, DefaultDetail },
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
