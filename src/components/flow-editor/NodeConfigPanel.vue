<template>
  <div class="detailPanel">
    <start-event-detail v-if="model.clazz=== 'start' " :key="model.id" :model="model" :on-change="onChange"/>
    <draft-node-detail v-else-if="model.clazz=== 'draft' " :key="model.id" :model="model" :on-change="onChange"/>
    <approve-node-detail v-else-if="model.clazz=== 'userTask' " :key="model.id" :model="model" :on-change="onChange"/>
    <flow-detail v-else-if="model.clazz=== 'flow' " :model="model" :key="model.id" :on-change="onChange"/>
    <auto-branch-detail v-else-if="model.clazz=== 'autoBranch' " :key="model.id" :model="model" :on-change="onChange"/>
  </div>
</template>

<script>
import StartEventDetail from './details/StartEventDetail'
import DraftNodeDetail from './details/DraftNodeDetail'
import ApproveNodeDetail from './details/ApproveNodeDetail'
import FlowDetail from './details/FlowDetail'
import AutoBranchDetail from './details/AutoBranchDetail'
export default {
  name: 'NodeConfigPanel',
  components: { AutoBranchDetail, FlowDetail, ApproveNodeDetail, DraftNodeDetail, StartEventDetail },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
  .detailPanel {
    background: #f0f2f5;
    flex: 0 0 auto;
    float: left;
    width: 20%;
    border-right: 1px solid #E9E9E9;
    border-bottom: 1px solid #E9E9E9;
    .panelTitle {
      text-align: left;
      padding-left: 12px;
      color: #000;
      line-height: 40px;
      background: #FFF;
      border: 1px solid #DCE3E8;
    }
    .row {
      line-height: 30px;
      margin-bottom: 10px;
      .tips {
        font-size: 10px;
        color: #c8ccc8;
      }
    }
    .panelBody {
      .panelRow {
        text-align: left;
        display: inline-block;
        font-size: 12px;
        width: 100%;
        padding: 5px 12px;
      }
    }
  }
</style>
