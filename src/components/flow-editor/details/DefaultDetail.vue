<template>
  <div>
      <div class="row">
        <el-row>
          <el-col :span="5">标题：</el-col>
          <el-col :span="19"><el-input
            :value="model.label"
            size="small"
            @input="(value) => {onChange('label', value)}"
          />
          </el-col>
        </el-row>
      </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultDetail',
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

<style lang="scss">

</style>
