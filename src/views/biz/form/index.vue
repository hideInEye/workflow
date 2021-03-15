<template>
  <d2-container>
    <data-table
      :options="tableProps"
      @onDelete="handleDelete"
      @onAdd="handleAdd"
      @onUpdate="handleUpdate"
      :data="data"
    />
  </d2-container>
</template>

<script>
import DataTable from '@/components/data-table/index'
import FormFields from './FormFields'
import {queryPage, deleteSystem, create, update} from "@/api/biz.form";
import {QueryList} from "@/api/biz.system";
import PageHelper from "@/libs/pageHelper";

export default {
  components: { DataTable },
  methods: {
    async QueryFormList(){
      const res = await queryPage({pageData: this.pageData})
      if(res){
        this.pageData = res
        this.data=[...res.list]
      }
    },
    async QueryBusList(){
      const res = await QueryList({
        q:'list'
      })
      if(res&&!res.error){
        const data =res.list.map(item=>{
          return ({
              label:item.name,
              value:item.record_id,
              key:item.record_id
            }
          )
        })
        this.tableProps.columns[0].formItem.component.options=data
      }
    }
  ,
   async handleDelete ({ index, row }, done) {
      const res = await deleteSystem(row.record_id)
     if(res&&!res.error){
       this.$message.success("删除成功")
       await this.QueryFormList()
       done()
     }else{
       this.$message.error("删除失败")
     }

    },
    async handleAdd (row, resolve) {
     const res =await create(row)
      if(res&&!res.error){
        this.$message.success("新增成功")
        resolve()
        await this.QueryFormList()
      }else{
        this.$message.error("添加失败")
      }
    },
   async handleUpdate ({ index, row }, resolve) {
        const res  = await update({
          recordId:row.record_id,
          data:row
        })
     if(res&&!res.error){
       this.$message.success('保存已成功')
       resolve()
       await this.QueryFormList()
     }

    }
  },
  data () {
    return {
      data: [],
      pageData: PageHelper.create(),
      tableProps: {
        actions: ['del'],
        columns: [
          {
            title: '业务系统',
            name: 'system_id',
            formItem: {
              rules: [{ required: true, message: '名称必须填写' }],
              component: {
                name: 'el-select',
                option:[
                  {
                    label:'111',
                    value:'1'
                  }
                ]
              }
            },
            tableItem: {},
          },
          {
            title: '表单名称',
            name: 'name',
            formItem: {
              rules: [{ required: true, message: '名称必须填写' }]
            },
            tableItem: {}
          },
          {
            title: '表单编号',
            name:'code',
            formItem: {
              rules: [{required: true,message: "编号必须填写"}]
            }

          },
          {
            title: '表单字段',
            name: 'form_field',
            formItem: {
              rules: [
                { required: true, message: '必须配置表单字段' }
              ],
              component: {
                name: FormFields
              }
            }
          }
        ],

      }
    }
  },
  mounted() {
    this.QueryFormList()
    this.QueryBusList()
  }
}
</script>

<style scoped>

</style>
