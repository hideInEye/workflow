<template>
  <el-dialog
    title="选择用户"
    :visible.sync="mVisible"
    :close="handlerClose"
    :before-close="handlerClose"
    :append-to-body="true"
    >
    <el-select style="width: 100%" v-model="users" filterable multiple :filter-method="QueryLikeName" >
      <el-option v-for="item in data" :label="item.name" :value="item.record_id" :key="item.record_id"></el-option>
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
  data () {
    return {
      // 原始用户数据
      data: [],
      // 当前选中的用户
      users: this.selectUsers || []
    }
  },
  methods: {
    handlerClose () {
      this.$emit('onClose', this.users)
    },
   async QueryUserListData(params){
      const res = await QueryUserList(params)
     if(res&&!res.error){
       this.data=res.list
     }
    },
    async QueryLikeName (e) {
      const res = await QueryUserList({
        q:'page',
        current:1,
        pageSize:10,
        name:e
      })
      if(res&&!res.error){
        this.data=res.list
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
      get () {
        return this.visible
      },
      set (value) {
        this.$emit('update:visible', value)
      }
    }
  },
  mounted() {
    const params ={
      q:'page',
      current:1,
      pageSize:10
    }
    this.QueryUserListData(params)
  }
}
</script>

<style scoped>

</style>
