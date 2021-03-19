<template>
  <el-dialog
    title="配置分支条件"
    :visible.sync="mVisible"
    @close="handleClose"
    append-to-body
  >
    <div class="conditions">
      <div class="andCondition">
        <div class="formItem">
          <div v-if="field" style="margin-right: 10px">{{field.title}}</div>
          <el-select v-if="field" :style="{width: '30%', marginRight: '10px'}" value="" v-model="condition" placeholder="判断条件">
            <el-option
              v-for="item in (field.type === 'string' ? strConditions : intConditions)"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
          <el-input placeholder="输入判定值" :style="{width: '30%'}" v-model="value"/>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="SaveCondition">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // 分支条件配置组件
  name: 'ConditionConfig',
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    // 当前配置
    config: {
      type: Object,
      default: () => {
        return {
        }
      }
    },
    field: {
      type: Object,
      default: () => {
        return {
          type: ''
        }
      }
    }
  },
  watch: {
    config: {
      handler (value) {
        console.log(value)
        this.condition = value.condition
        this.value = value.value
      }
    }
  },
  data () {
    return {
      // 条件
      condition: this.config && this.config.condition,
      // 判定值
      value: this.config && this.config.value,

      // 字段串条件
      strConditions: [
        { value: '=', label: '等于' },
        { value: '!=', label: '不等于' },
        { value: 'include', label: '包含' },
        { value: 'exclude', label: '不包含' }
      ],
      // 数值条件
      intConditions: [
        { value: '=', label: '等于' },
        { value: '!=', label: '不等于' },
        { value: '>', label: '大于' },
        { value: '<', label: '小于' },
        { value: '>=', label: '大于等于' },
        { value: '<=', label: '小于等于' }
      ]
    }
  },
  methods: {
    handleClose () {
      this.$emit('onClose')
    },
    SaveCondition () {
      if (this.condition === null || this.condition === undefined) {
        this.$message.error('请把条件填写完整')
        return
      }
      this.$emit('onChange', {
        value: this.value,
        condition: this.condition
      })
    }
  },
  computed: {
    mVisible: {
      get () {
        return this.visible
      },
      set (v) {
        this.$emit('update:visible', v)
      }
    },
    ...mapState('workflow/editor', {
      flow: state => state.flow
    })
  }
}
</script>

<style lang="scss">
  .conditions {
    .andCondition {
      .formItem {
        display: flex;
        line-height: 30px;
      }
    }
  }
</style>
