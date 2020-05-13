<template>
  <d2-container>
    <data-table
      :options="tableProps"
      @onDelete="handleDelete"
      @onAdd="handleAdd"
      @onUpdate="handleUpdate"
      :customEvents="customEvents"
    />
    <import-user :visible="dialogVisible" @onClose="handleImportDialogClose"/>
  </d2-container>
</template>

<script>
import DataTable from '@/components/data-table/index'
import ImportUser from './ImportUser'

export default {
  components: { ImportUser, DataTable },
  methods: {
    handleDelete ({ index, row }, done) {
      done()
    },
    handleAdd (row, resolve) {
      console.log(row)
      resolve()
    },
    handleUpdate (row, resolve) {
      // this.$message.success('保存已成功')
      console.log(row)
      resolve()
    },
    handleImportDialogClose () {
      this.dialogVisible = false
    }
  },
  data () {
    return {
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
            name: 'get_user_api',
            formItem: {
              rules: [{ required: true, message: '请输入接口地址' }]
            },
            tableItem: {}
          },
          {
            title: '备注',
            name: 'memo',
            formItem: {
              component: {
                name: 'el-input',
                type: 'textarea',
                maxLength: 1024
              }
            },
            tableItem: {
            }
          }
        ],
        data: [
          {
            name: '信息化系统',
            get_user_api: 'http://baidu.com',
            memo: '备注信息没有吧'
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
          this.dialogVisible = true
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
