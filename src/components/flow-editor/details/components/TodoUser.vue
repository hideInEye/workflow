<template>
  <div class="row">
    <span>{{title}}：</span>
    <div class="users">
      <el-tag
        closable
        type="info"
        v-for="(item, index) in users"
        @close="onCloseUser(index)"
        :key="item.record_id"
      >
        <i class="el-icon-user"></i>{{item.name}}
      </el-tag>
    </div>
    <el-button size="small" @click="selectUserModalVisible = true">添加</el-button>
    <user-selector :visible="selectUserModalVisible" @onClose="handleSelectUser"/>
  </div>
</template>

<script>
import UserSelector from './UserSelector'
export default {
  // 默认处理人
  name: 'TodoUser',
  components: { UserSelector },
  data () {
    return {
      // 被选中的用户
      users: this.selectUsers || [],
      // 选择框显示状态
      selectUserModalVisible: false
    }
  },
  methods: {
    // 删除用户
    onCloseUser (index) {
      this.users.splice(index, 1)
    },
    // 关闭用户选择框处理
    handleSelectUser (users) {
      if(users&&users.length>0){
        this.users = users
      }
      this.selectUserModalVisible = false
      this.$emit('onChangeUser', this.users)
    }
  },
  props: {
    // 已经选中的用户数据
    selectUsers: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 标题
    title: {
      type: String,
      default: '处理人'
    }
  }
}
</script>

<style lang="scss">
  .users {
    span {
      margin-right: 5px;
      margin-bottom: 5px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
