<template>
  <el-dialog
    :visible.sync="mVisible"
    @close="handleClose"
    title="导入业务用户">
    <el-transfer
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入用户姓名"
      v-model="value"
      :titles="['业务系统用户', '已导入用户']"
      :data="data">
      <div class="buttons" slot="left-footer">
        <el-button size="small" @click="prePage">上一页</el-button>
        <el-button size="small" @click="nextPage">下一页</el-button>
      </div>
    </el-transfer>
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="importUser">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  // 导入业务用户组件
  name: 'ImportUser',
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    // 关闭时事件
    handleClose () {
      this.$emit('onClose')
    },
    /**
     * 导入用户
     */
    importUser () {

    },
    // 上一页
    prePage () {
      this.currentPage--
      if (this.currentPage < 0) { this.currentPage = 0 }
    },
    // 下一页
    nextPage () {
      this.currentPage++
      if (this.currentPage > this.totalPage) { this.currentPage = this.totalPage }
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
  },
  data () {
    return {
      // 当前页码
      currentPage: 0,
      // 数据总页数
      totalPage: 0,
      data: [
        { label: '用户名', key: 'asdfasdfsdf' },
        { label: '李建', key: 'asdfasdf' }
      ],
      value: [],
      filterMethod (query, item) {
        return item.label.indexOf(query) > -1
      }
    }
  }
}
</script>

<style lang="scss">
  .buttons {
    text-align: center;
    padding: 4px;
  }
</style>
