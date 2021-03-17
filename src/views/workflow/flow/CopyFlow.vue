<template>
  <el-dialog
    :visible.sync="Mvisibel"
    title="流程复制"
    @close="handleClose"
  >
    <el-form ref="form" :model="formData" label-width="80px" size="mini">
      <el-form-item label="业务系统">
        <el-col :span="11">
          <el-select v-model="formData.region" placeholder="">
            <el-option label="1" value="1"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose">取 消</el-button>
      <el-button size="small" type="primary" @click="handleClose">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'CopyFlow',
  data() {
    return {
      Mvisibel: false,
      formData: {
        region: 'shanghai'
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
  },
  watch: {
    visible(oldValue, NewValue) {
      this.Mvisibel = oldValue
    }
  },
  methods: {
    handleClose() {
      this.$emit("Close")
    }
  }
}
</script>
