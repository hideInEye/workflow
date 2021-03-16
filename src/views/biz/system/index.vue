<template>
  <d2-container>
    <data-table
      :data="data"
      :options="tableProps"
      @onDelete="handleDelete"
      @onAdd="handleAdd"
      @onUpdate="handleUpdate"
      :customEvents="customEvents"
      :pagination="pagination"
      @paginationCurrentChange="Change"

    />
    <import-user :RowData="RowData" :visible="dialogVisible" @onClose="handleImportDialogClose"/>
  </d2-container>
</template>

<script>
import DataTable from '@/components/data-table/index'
import ImportUser from './ImportUser'
import {AsyncUser, create, queryPage, update} from '../../../api/biz.system'
import PageHelper from '../../../libs/pageHelper'
export default {
  components: { ImportUser, DataTable },
  methods: {
    Change(currentPage){
      this.pageData.currentPage=currentPage
      this.QueryList()
    },
   async syncUser(row){
      const res = await AsyncUser(row.record_id)
     if(res&&!res.error){
       this.$message.success("同步成功")
     }

    }
    ,
    async QueryList(){
      const res = await queryPage({ pageData: this.pageData })
      if (res) {
        this.pageData = res
        const pagination={
          currentPage: res.currentPage,
          pageSize:res.pageSize,
          total: res.total
        }
        this.pagination = pagination
        this.data = [...res.list]
      }
    }
    ,
    async handleDelete ({ index, row }, done) {
      // const res = await deleteSystem(row.record_id)
      // if (res) {
      //   this.$message.success('删除成功')
      // }
      this.$message.error('暂时无法删除三方业务系统')
      // done()
    },
    async handleAdd (row, resolve) {
      const res = await create(row)
      if (res.record_id) {
        this.$message.success('添加成功')
      }
      resolve()
    },
    async handleUpdate ({ index, row }, resolve) {
      // this.$message.success('保存已成功')
      // console.log(row)
      const res = await update(
        {
          recordId: row.record_id,
          data: row
        }
      )
      if (res) {
        this.$message.success('保存成功')
      }
      resolve()
      await this.QueryList()
    },
    handleImportDialogClose () {
      this.dialogVisible = false
    }
  },
  data () {
    return {
      RowData:{},
      data: [],
      dialogVisible: false,
      // 表格属性定义
      tableProps: {
        actions: ['del'],
        columns: [
          {
            title: '系统名称',
            name: 'name',
            formItem: {
              rules: [{ required: true, message: '请输入名称' }]
            },
            tableItem: {}
          },
          {
            title: '用户接口',
            name: 'user_info_api',
            formItem: {
              rules: [{ required: true, message: '请输入接口地址' }]
            },
            tableItem: {}
          }
        ],
        actionCol: {
          custom: [
            {
              text: '导入操作用户',
              type: 'warning',
              size: 'small',
              emit: 'importUser' // 对应 customEvents 中的相应函数
            }
          ]
        }
      },

      // 传入crud组件的自定义事件列表
      customEvents: {
        /**
         * 导入用户操作
         * @param index
         * @param row
         */
        importUser: ({ index, row }) => {
          // this.RowData = row
          // this.dialogVisible = true
          this.syncUser(row)
        }
      },
      pageData: PageHelper.create(),
      pagination: {},
    }
  },
  async mounted () {
  await this.QueryList()
  }
}
</script>

<style scoped>

</style>
