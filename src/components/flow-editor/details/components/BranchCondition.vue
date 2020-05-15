<template>
  <div class="branch">
    <el-row>
      <el-col :span="12">分支：{{this.node.getTarget().getModel().label}}</el-col>
      <el-col :span="12"><el-button type="warning" size="small" @click="handleOpenConfig">条件配置</el-button></el-col>
    </el-row>
    <condition-config
      :config="selectConditions"
      :visible="configVisible"
      :field="field"
      @onClose="handleConfigDialogClose"
      @onChange="handleConditionChange"/>
  </div>
</template>

<script>
import ConditionConfig from './ConditionConfig'
import { mapState } from 'vuex'
export default {
  // 分支条件配置组件
  name: 'BranchCondition',
  components: { ConditionConfig },
  data () {
    return {
      configVisible: false,
      selectConditions: null
    }
  },
  props: {
    // 当前出线的对象
    node: {
      type: Object
    },
    onChange: {
      type: Function,
      default: () => {}
    },
    // 节点条件配置
    conditions: {
      type: Array,
      default: () => []
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
  computed: {
    ...mapState('workflow/editor', [
      'graph'
    ])
  },
  methods: {
    handleOpenConfig () {
      if (!this.field) {
        this.$message.error('请选择数据字段')
        return
      }
      this.configVisible = true
      this.selectConditions = this.conditions.find(item => item.targetId === this.node.getTarget().get('id'))
    },
    // 关闭dialog
    handleConfigDialogClose () {
      this.configVisible = false
    },
    /**
     * 条件配置更改
     * @param value
     */
    handleConditionChange (value) {
      const label = this.field.title + value.condition + value.value
      // 更新当前出线对象的label属性
      this.graph.update(this.node, { label })
      this.configVisible = false
      this.onChange({
        targetId: this.node.getTarget().get('id'),
        ...value
      })
      this.$message.success('保存成功')
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
