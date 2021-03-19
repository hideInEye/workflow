<template>
  <el-dialog
    :fullscreen="true"
    title="流程编辑器"
    :visible.sync="mVisible"
    :center="true"
    @close="handleClose"
  >
    <flow-editor  ref="editor" :height="600" />
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="SaveFlowData">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import FlowEditor from '../../../components/flow-editor/index'
import {UpdateFlowEdit} from "@/api/biz.flow";
import { mapState } from 'vuex'
export default {
  // 流程编辑器模态框
  name: 'FlowEditorDialog',
  components: { FlowEditor },

  methods: {
    handleClose () {
      this.$emit('onClose')
    },
    // 保存数据
    async  SaveFlowData () {
      const data = {
        config:this.$refs.editor.save()
      }
      const  res = await UpdateFlowEdit(this.row.record_id,data)
      if(res&&!res.error){
        this.$message.success("绘制完成")
        this.$emit("onClose")
      }else{
        this.$message.error("绘制失败")
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  computed: {
    ...mapState('workflow/editor', {
      row:state=>state.rowData
    }),
    mVisible: {
      get () {
        return this.visible
      },
      set (v) {
        this.$emit('update:visible', v)
      }
    }
  },
  mounted() {
  console.log('组件渲染')
  }
}
</script>

<style scoped>

</style>
