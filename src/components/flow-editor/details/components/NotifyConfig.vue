<template>
  <div class="row">
      <span>通知方式：</span>
        <el-radio-group v-model="notify" @change="v => {onChange('config', {notify: v})}">
          <el-radio :label="2">邮件</el-radio>
          <el-radio :label="1">短信</el-radio>
        </el-radio-group>
  </div>
</template>

<script>
// 通知方式配置
export default {
  name: 'NotifyConfig',
  data () {
    return {
      notify: (this.model.config && this.model.config.notify) || 1
    }
  },
  props: {
    model: {
      type: Object,
      default: () => ({ })
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  },
  mounted () {

  }
}
</script>

<style scoped>

</style>
