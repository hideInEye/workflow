<template>
  <div>
    <d2-container>
      <data-table
        :options="tableProps"
        @onDelete="handleDelete"
        @onAdd="handleAdd"
        @onUpdate="handleUpdate"
        :custom-events="customEvents"
        :data="data"
        :pagination="pagination"
        @paginationCurrentChange="Change"
      />
      <flow-editor-dialog :RowData="rowData" :row_data="RowData" :visible="editorDialogVisible" @onClose="handleDialogClose"/>

    </d2-container>
    <copy-flow :visible="CopyVisible" @Close="handleCopyClose" />
  </div>
</template>

<script>
import DataTable from '../../../components/data-table/index'
import FlowStatus from './FlowStatus'
import FlowEditorDialog from './FlowEditorDialog'
import {QueryFormList} from "@/api/biz.form";
import {QueryList} from "@/api/biz.system";
import {queryPageFlow, createFlow, updateFlow, deleteFlow} from "@/api/biz.flow";
import PageHelper from "@/libs/pageHelper";
import CopyFlow from "@/views/workflow/flow/CopyFlow";
export default {
  name: 'index',
  components: { FlowEditorDialog, DataTable,CopyFlow },
  data () {
    return {
      rowData:{},
      tableProps: {
        columns: [
          {
            title: '业务系统',
            name:'system_id',
            key:'system_id',
            formItem: {
                rules:[{required: true,message: '必须选择一个业务系统'}],
                component: {
                  name:'el-select',
                  option:[]
                }
            },
          },
          {
            title:"业务系统",
            name:'system_name',
            key:'system_name',
            tableItem: {
              width: 200
            }
          },
          {
            title: '业务表单',
            name: 'form_id',
            key: 'form_id',
            formItem: {
              rules: [{ required: true, message: '必须选择一个业务表单' }],
              component: {
                name:'el-select',
                option:[]
              }
            },
          },
          {
            title:'业务表单',
            name: 'form_name',
            key: 'form_name',
            tableItem: {
              width: 200
            }
          },
          {
            title: '流程名称',
            name: 'name',
            key: 'name',
            formItem: {
              rules: [
                { required: true, message: '名称必须填写' },
                { max: 100, message: '不能超过100个字符' }
              ]
            },
            tableItem: {
              width: 250
            }
          },
          {
            title: '流程编号',
            name: 'code',
            key: 'code',
            formItem: {
              rules: [
                { required: true, message: '编号必须填写' },
                { max: 100, message: '不能超过100个字符' }
              ]
            },
            tableItem: {
              width: 200
            }
          },
          {
            title: '版本号',
            name: 'version',
            key: 'version',
            tableItem: {
              width: 80
            }
          },
          {
            title: '状态',
            name: 'status',
            key: 'status',
            // formItem: {
            //   component: {
            //     name:FlowStatus
            //   }
            // },
            tableItem: {
              component: {
                name: FlowStatus,
                key:'status'
              },
              width: 80
            }
          },
          {
            title: '备注',
            name: 'memo',
            key: 'memo',
            formItem: {
              rules: [
                { max: 1024, message: '不能超过1024个字符' }
              ],
              component: {
                name: 'el-input',
                type: 'textarea',
                maxLength: 1024
              }
            }
          },

        ],
        data: [],
        actionCol: {
          custom: [
            {
              text: '绘制流程',
              type: 'warning',
              size: 'small',
              emit: 'OpenEditFlowDialog',
            },
            {
              text: '复制流程',
              type:'success',
              size: "small",
              emit: "OpenCopyFlow"
            }
          ]
        },
      },
      pagination: {},
      customEvents: {
        // 打开编辑器
        OpenEditFlowDialog: ({index,row}) => {
          if(row.config&&row.config!==''){
            this.rowData=JSON.parse(row.config)
          }else{
            this.rowData={}
          }
          this.RowData = row
          // this.rowData=JSON.stringify(row)
          this.editorDialogVisible = true
          this.$store.commit("workflow/editor/saveRowData",{
            row
          })
        },
        OpenCopyFlow:({index,row})=>{
          this.copyRow = row
          this.CopyVisible = true
        }
      },
      editorDialogVisible: false,
      FormListData:[],
      data:[],
      pageData: PageHelper.create(),
      CopyVisible:false,
      RowData:{}
    }
  },
  methods: {
    Change(currentPage){
      this.pageData.currentPage=currentPage
      this.QueryFlow()
    },
    /**
     * 删除
     * @param index 序号
     * @param row 记录行
     * @param done 完成
     */

   async handleDelete ({ index, row }, done) {
      const res= await deleteFlow(row.record_id)
      if(res&&!res.error){
        this.$message.success("删除成功")
        await this.QueryFlow()
      }
      done()
    },
   async handleAdd ( row , resolve) {
      const res = await createFlow(row)
     if(res&&!res.error){
       this.$message.success("添加成功")
       resolve()
      await this.QueryFlow()
     }

    },
    async handleUpdate ({ index, row }, resolve) {
      const res = await updateFlow({
        recordId:row.record_id,
        data:row
      })
      if(res&&!res.error){
        this.$message.success("更新成功")
        resolve()
      }
    },
    handleDialogClose () {
      this.editorDialogVisible = false
    },
    handleCopyClose(){
     this.CopyVisible = false
    },
   async QueryFormList () {
      const res = await QueryFormList({q:'list'})
     if(res&&!res.error){
       const data = res.list.map(item=>{
         return {
           label:item.name,
           value:item.record_id,
           key:item.record_id
         }
       })
      this.tableProps.columns[2].formItem.component.options = data
     }
   },
    async QuerySystemList(){
      const res = await QueryList({q:'list'})
      if(res&&!res.error){
        const data = res.list.map(item=>{
          return {
            label:item.name,
            value:item.record_id,
            key:item.record_id
          }
        })
        this.tableProps.columns[0].formItem.component.options = data
      }
    },
    async QueryFlow () {
      const res = await queryPageFlow({pageData: this.pageData})
      if(res&&!res.error){
        this.pageData = res
        const pagination={
          currentPage: res.currentPage,
          pageSize:res.pageSize,
          total: res.total
        }
        this.pagination = pagination
        this.data=[...res.list]
      }
    }
  },
  mounted() {
    this.QueryFormList()
    this.QuerySystemList()
    this.QueryFlow()
  }
}
</script>

<style scoped>

</style>
