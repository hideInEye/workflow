<template>
  <el-dialog
    :fullscreen="true"
    title="流程编辑器"
    :visible.sync="mVisible"
    :center="true"
    @close="handleClose"
  >
    <flow-editor ref="editor" :height="600" />
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="SaveFlowData">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import FlowEditor from '../../../components/flow-editor/index'
export default {
  // 流程编辑器模态框
  name: 'FlowEditorDialog',
  components: { FlowEditor },
  methods: {
    handleClose () {
      this.$emit('onClose')
    },
    // 保存数据
    SaveFlowData () {
      console.log(this.$refs.editor.save())
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
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
    }
  }
}
</script>

<style scoped>

</style>
