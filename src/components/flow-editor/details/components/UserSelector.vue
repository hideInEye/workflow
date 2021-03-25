<template>
  <el-dialog
    title="选择用户"
    :visible.sync="mVisible"
    :close="handlerClose"
    :before-close="handlerClose"
    :append-to-body="true"
  >
    <el-select style="width: 100%" @change="handleChange" v-model="users" clearable filterable multiple
               :filter-method="QueryLikeName" @remove-tag="handleRemove">
      <el-option v-for="item in data" :label="item.name" :value="item.user_id" :key="item.user_id"></el-option>
    </el-select>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handlerClose">取 消</el-button>
      <el-button type="primary" @click="handlerClose">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {QueryUserList} from "@/api/biz.flow";

export default {
  // 选择用户控件
  name: 'UserSelector',
  data() {
    return {
      // 原始用户数据
      data: [],
      userData: [],
      // 当前选中的用户
      users: []
    }
  },
  methods: {
    handleRemove(e) {
      const Data = this.userData.filter(item => item.user_id !== e && item)
      this.userData = Data
    },
    handleChange(e) {
      const Data = this.data.filter(item => item.user_id === e[e.length - 1] && item)
      this.userData = this.userData.concat(Data)
    },
    handlerClose() {
      this.$emit('onClose', this.userData)
    },
    async QueryUserListData(params) {
      const res = await QueryUserList(params)
      if (res && !res.error) {
        this.data = res.list
      }
    },
    async QueryLikeName(e) {
      const res = await QueryUserList({
        q: 'page',
        current: 1,
        pageSize: 10,
        name: e
      })
      if (res && !res.error) {
        this.data = res.list
      }
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
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      }
    }
  },
  mounted() {
    const params = {
      q: 'page',
      current: 1,
      pageSize: 10
    }
    this.QueryUserListData(params)
  },
  watch: {
    selectUsers(val) {
      const data = val.map(item => item.user_id)
      this.users = data
      this.userData = val
    }
  }
}
</script>

<style scoped>

</style>
