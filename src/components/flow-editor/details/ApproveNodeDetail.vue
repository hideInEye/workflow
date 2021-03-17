<template>
  <el-card header="审批节点">
    <default-detail :on-change="onChange" :model="model"/>
    <el-divider></el-divider>
    <notify-config :model="model" :on-change="onChange"/>
    <todo-user title="默认处理人" :select-users="todo_users" @onChangeUser="handleChangeTodoUser"/>
    <el-divider></el-divider>
    <div class="row">
      <span>流转方式：</span>
      <el-radio-group size="small" v-model="approveType" @change=" value => {onChange('config', {approve_type: value})}">
        <el-radio-button :label="1">会签</el-radio-button>
        <el-radio-button :label="2">或签</el-radio-button>
      </el-radio-group>
    </div>
    <div class="row">
      <span>是否允许协同：</span>
      <el-radio-group size="small" v-model="allow_teamwork" @change="value => { onChange('config', {allow_teamwork: value})}">
        <el-radio-button :label="1">是</el-radio-button>
        <el-radio-button :label="2">否</el-radio-button>
      </el-radio-group>
    </div>
    <div class="row">
      <span>
        办理时限：<span class="tips">(都为0则不限制)</span>
      </span>
      <time-limit v-model="doLimit" :on-change="value => { onChange('config', {do_limit: value})}"/>
    </div>
    <div class="row">
      <span>
        超时处理:
      </span>
      <el-select value="" size="small" v-model="timeout" @change="value => { onChange('config', {timeout: value})}" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>


    </div>
    <div class="row">
      <span>
        是否需要动态审核人:
      </span>
      <el-select value="" size="small" v-model="process_dynamic" @change="value => { onChange('config', {process_dynamic: value})}" placeholder="请选择">
        <el-option
          v-for="item in process_data"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <todo-user v-if="timeout === 2" title="转办人" :select-users="next_users" @onChangeUser="handleChangeNextDoUser"/>

  </el-card>
</template>

<script>
import DefaultDetail from './DefaultDetail'
import NotifyConfig from './components/NotifyConfig'
import TodoUser from './components/TodoUser'
import TimeLimit from './components/TimeLimit'
export default {
  // 审批节点配置
  name: 'ApproveNodeDetail',
  components: { TimeLimit, TodoUser, NotifyConfig, DefaultDetail },
  data () {
    return {
      // 是否允许协同
      allow_teamwork: (this.model.config && this.model.config.allow_teamwork) || 2,
      // 默认处理人
      todo_users: (this.model.config && this.model.config.todo_users) || [],
      // 转办处理人
      next_users: (this.model.config && this.model.config.next_users) || [],
      // 超时处理
      timeout: this.model.config && this.model.config.timeout,
      // 审批类型
      approveType: (this.model.config && this.model.config.approve_type) || 2,
      // 操作时限
      doLimit: this.model.config && this.model.config.do_limit,
      process_dynamic:this.model.config&&this.model.config.process_dynamic,
      options: [
        {
          label: '自动跳过',
          value: 1
        },
        {
          label: '自动转办',
          value: 2
        },
        {
          label: '回退上一节点',
          value: 3
        },
        {
          label: '回退起草节点',
          value: 4
        },
        {
          label: '等待',
          value:5
        }
      ],
      process_data:[
        {
          label:'需要',
          value:1
        },
        {
          label:'不需要',
          value:2
        },
        {
          label:'限制动态审核人',
          value:3
        },
      ]
    }
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  },
  watch: {
    doLimit: {
      handler (value) {
        console.log(value)
      }
    }
  },
  methods: {
    // 处理默认处理人
    handleChangeTodoUser (value) {
      this.onChange('config', { todo_users: value })
    },
    // 处理转办人
    handleChangeNextDoUser (value) {
      this.onChange('config', { next_users: value })
    }
  }
}
</script>

<style scoped>

</style>
