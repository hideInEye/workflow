<template>
  <div class="row">
      <span>通知方式：</span>
        <el-checkbox-group v-model="notify" @change="v => {onChange('config', {notify: v})}">
          <el-checkbox label="待办">待办</el-checkbox>
          <el-checkbox label="邮件">邮件</el-checkbox>
          <el-checkbox label="短信">短信</el-checkbox>
        </el-checkbox-group>
  </div>
</template>

<script>
// 通知方式配置
export default {
  name: 'NotifyConfig',
  data () {
    return {
      notify: (this.model.config && this.model.config.notify) || []
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
