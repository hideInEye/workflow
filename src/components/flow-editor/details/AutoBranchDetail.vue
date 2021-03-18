<template>
  <el-card header="条件节点">
    <default-detail :model="model" :on-change="onChange"/>
    <el-divider></el-divider>
    <div class="row">
      <span>分支条件配置：</span>
      <div v-if="outEdges.length === 0" style="color: #ff0000">没有连接节点，请连接流程节点!!</div>
      <div class="config">
        数据字段:
        <el-select size="small"  :style="{width: '40%', marginLeft: '10px'}" value="" v-model="field" placeholder="请选择字段">
          <el-option
            v-for="item in data"
            :key="item.record_id"
            :label="item.value"
            :value="item"
          />
        </el-select>
      </div>
    </div>
    <div class="row">
      <branch-condition :field="field" :conditions="conditions" :on-change="onConditionChange" v-for="item in outEdges" :node="item" :key="item.get('id')"/>
    </div>
  </el-card>
</template>

<script>
import DefaultDetail from './DefaultDetail'
import BranchCondition from './components/BranchCondition'
import { mapState } from 'vuex'
import {QuerySystemList} from "@/api/biz.flow";
export default {
  // 条件分支节点配置
  name: 'AutoBranchDetail',
  components: { BranchCondition, DefaultDetail },
  data () {
    return {
      // 当前节点条件配置
      conditions: (this.model.config && this.model.config.conditions) || [],
      // 出线集合
      outEdges: this.model.item.getOutEdges(),
      // 选中表单字段对象
      field: (this.model.config && this.model.config.field) || null,
      data:[]
    }
  },
  computed: {
    ...mapState('workflow/editor', {
      flow: state => state.flow,
      row:state=>state.row
    })
  },
  methods: {
    // 某个分支条件配置更新
    onConditionChange (value) {
      if (this.conditions.length > 0) {
        this.conditions.forEach((c, index) => {
          if (c.targetId === value.targetId) {
            this.conditions.splice(index, 1)
          } else {
            this.conditions.push(value)
          }
        })
      } else {
        this.conditions.push(value)
      }
      this.onChange('config', { field: this.field, conditions: this.conditions })
    },
   async QuerySyList(){
      const params ={
        q:'list',
        form_id:this.row.form_id
      }
      const res=await QuerySystemList(params)
        if(res&&!res.error){
          this.data  = res.list
        }
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
  mounted() {
    this.QuerySyList()
  }
}
</script>

<style scoped>

</style>
