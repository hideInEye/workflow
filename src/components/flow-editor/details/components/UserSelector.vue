<template>
  <el-dialog
    title="选择用户"
    :visible.sync="mVisible"
    :close="handlerClose"
    :append-to-body="true"
    >
    <el-checkbox-group v-model="users">
      <el-checkbox v-for="item in data" :label="item" :key="item.record_id">{{item.user_name}}</el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
    <el-button @click="handlerClose">取 消</el-button>
    <el-button type="primary" @click="handlerClose">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  // 选择用户控件
  name: 'UserSelector',
  data () {
    return {
      // 原始用户数据
      data: [
        { record_id: 1, user_name: '用户一', phone: '1528475728' },
        { record_id: 2, user_name: '用户2', phone: '1528475728' }
      ],
      // 当前选中的用户
      users: this.selectUsers || []
    }
  },
  methods: {
    handlerClose () {
      this.$emit('onClose', this.users)
    }
  },
  props: {
    // 是否显示
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    // 已经选中的用户
    selectUsers: {
      type: Array
    }
  },
  computed: {
    mVisible: {
      get () {
        return this.visible
      },
      set (value) {
        this.$emit('update:visible', value)
      }
    }
  }
}
</script>

<style scoped>

</style>
