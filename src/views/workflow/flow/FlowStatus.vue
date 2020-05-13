<template>
  <span>
    <el-tag
      size="small"
      effect="dark"
      type="success"
      v-if="flowStatus === 1"
    >{{statusText}}</el-tag>
  <el-tag
    size="small"
    effect="dark"
    type="danger"
    v-if="flowStatus === 2"
  >{{statusText}}</el-tag>
    <el-tag
      size="small"
      effect="dark"
      type="warning"
      v-if="flowStatus === 3"
    >{{statusText}}</el-tag>
    <el-tag
      size="small"
      effect="dark"
      type="info"
      v-if="flowStatus === 4"
    >{{statusText}}</el-tag>
  </span>
</template>

<script>
export default {
  // 流程状态组件
  name: 'FlowStatus',
  data () {
    return {
      flowStatus: this.value
    }
  },
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  computed: {
    statusText: {
      get () {
        switch (this.flowStatus) {
          case 1:
            return '发布'
          case 2:
            return '挂起'
          case 3:
            return '暂存'
          case 4:
            return '归档'
          default:
            return '未知'
        }
      },
      set () {
        this.flowStatus = this.value
      }
    }
  }
}
</script>

<style scoped>

</style>
