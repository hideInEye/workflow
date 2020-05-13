<template>
  <div class="time">
    <el-input-number size="small" type="number" controls-position="right" @input="handleChange" v-model="data.day" :min="0"/>天
    <el-input-number size="small" type="number" controls-position="right" @input="handleChange" v-model="data.hour" :min="0" :max="23"/>时
    <el-input-number size="small" type="number" controls-position="right" @input="handleChange" v-model="data.minutes" :min="0" :max="59"/>分
  </div>
</template>

<script>
export default {
  // 时间限制组件
  name: 'TimeLimit',
  data () {
    return {
      data: this.value || {}
    }
  },
  methods: {
    handleChange () {
      this.$emit('input', this.data)
      this.onChange(this.data)
    }
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          day: 0,
          hour: 0,
          minutes: 0
        }
      }
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
  .time {
    display: flex;
    justify-content: space-between;
  }
</style>
