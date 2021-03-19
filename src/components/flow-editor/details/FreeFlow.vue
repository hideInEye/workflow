<template>
  <el-card header="自由节点">
      <div class="row">
        <span>
          是否允许协办
        </span>
        <el-radio-group v-model="allow_delegate"  @change="v => {onChange('config', {allow_delegate: v})}">
          <el-radio :label="1">允许</el-radio>
          <el-radio :label="2">不允许</el-radio>
        </el-radio-group>
      </div>
    <div class="row">
        <span>
          是否需要验证关联的名称列表
        </span>
        <el-radio-group v-model="need_check_name"  @change="v => {onChange('config', {need_check_name: v})}">
          <el-radio :label="1">验证</el-radio>
          <el-radio :label="2">不验证</el-radio>
        </el-radio-group>
      </div>
    <div class="row">
      <span>
        节点备用名称列表
      </span>
      <el-input v-for="(item,index) in node_names" :key="index" v-model="item.node_name" @input="value=>{handleOnchange(value,index)}"  />
    </div>
   <div >
     <el-button @click="handleAdd">
       添加
     </el-button>
   </div>
  </el-card>
</template>

<script>
export default {
  name: 'FreeFlow',
  data(){
    return{
      allow_delegate: (this.model.config && this.model.config.allow_delegate) || [],
      need_check_name: (this.model.config && this.model.config.need_check_name) || [],
      node_names: (this.model.config && this.model.config.node_names) || [],
    }
  },
  methods:{
    handleOnchange(e,index){
      this.node_names[index].node_name=e
      this.onChange("config",{node_names:this.node_names})
    },
    handleAdd(){
      this.node_names.push({
        node_name:''
      })
      this.onChange("config",{node_names:this.node_names})
    }
  },
  props: {
    model: {
      type: Object,
      default: () => ({ })
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  },
}
</script>
