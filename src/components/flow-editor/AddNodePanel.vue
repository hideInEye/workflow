<template>
  <div class="add-node-panel">
    <el-collapse accordion value="1">
      <el-collapse-item title="常用节点" :name="defaultActiveItemBar">
        <img data-item="{clazz:'start',size:'30*30',label:'开始'}"
             :src="require('../../assets/flow/start.svg')" style="width:42px;height:42px" />
        <div>开始节点</div>
        <img data-item="{clazz:'draft',size:'80*44',label:'起草节点'}" alt="起草节点"
             :src="require('../../assets/flow/script-task.svg')" style="width:80px;height:44px" />
        <div>起草节点</div>
        <img :data-item="userTaskData" alt="审批节点"
             :src="require('../../assets/flow/user-task.svg')" style="width:80px;height:44px" />
        <div>审批节点</div>
        <img data-item="{clazz:'autoBranch',size:'40*40',label:'条件分支'}"
             :src="require('../../assets/flow/parallel-gateway.svg')" style="width:48px;height:48px" />
        <div>条件分支</div>
        <img data-item="{clazz:'end',size:'30*30',label:'结束'}"
             :src="require('../../assets/flow/end.svg')" style="width:42px;height:42px" />
        <div>结束节点</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'AddNodePanel',
  data () {
    return {
      defaultActiveItemBar: '1',
      userTaskData: "{clazz:'userTask',size:'80*44',label:'审批节点'}"
    }
  }
}
</script>

<style lang="scss">
  .add-node-panel {
    width: 10%;
    background: #f0f2f5;
    overflow-y: auto;
    border-left: 1px solid #E9E9E9;
    border-bottom: 1px solid #E9E9E9;
    img{
      width: 92px;
      height: 96px;
      padding: 4px;
      border: 1px solid rgba(0,0,0,0);
      border-radius: 2px;
      &:hover{
        border: 1px solid #ccc;
        cursor: move;
      }
    }
    .el-collapse-item {
      > div > div {
        padding: 3px;
      }
    }
    .el-collapse {
      border: 0;
      .el-collapse-item {
        > div[role=tab] > div {
          padding-left: 10px;
          border: 1px solid #E9E9E9;
          border-left:0;
        }
        &:first-child{
          > div[role=tab] > div {
            border-top: 0;
          }
        }
        &:last-child{
          > div[role=tab] > div {
            border-bottom: 1px solid #E9E9E9;
          }
        }
        .el-collapse-item__wrap{
          border-top: 0;
          background: #f0f2f5;
          text-align: center;
        }
      }
    }
  }
</style>
