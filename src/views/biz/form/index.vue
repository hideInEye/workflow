<template>
  <d2-container>
    <data-table
      :options="tableProps"
      @onDelete="handleDelete"
      @onAdd="handleAdd"
      @onUpdate="handleUpdate"
    />
  </d2-container>
</template>

<script>
import DataTable from '@/components/data-table/index'
import FormFields from './FormFields'

export default {
  components: { DataTable },
  methods: {
    handleDelete ({ index, row }, done) {
      done()
    },
    handleAdd ({ index, row }, resolve) {
      console.log(row)
      setTimeout(() => {
        resolve()
      }, 5000)
    },
    handleUpdate ({ index, row }, resolve) {
      console.log(row)
      setTimeout(() => {
        this.$message.success('保存已成功')
        resolve()
      }, 5000)
    }
  },
  data () {
    return {
      tableProps: {
        actions: ['del'],
        columns: [
          {
            title: '业务系统',
            name: 'biz_id',
            formItem: {
              component: {
                name: 'el-select',
                options: [
                  {
                    value: '信息化系统',
                    label: '信息化系统'
                  }
                ]
              }
            },
            tableItem: {}
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
            title: '表单字段',
            name: 'fields',
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
        data: [
          {
            biz_id: '信息化系统',
            name: '请假表单',
            fields: [
              {
                title: '金额',
                type: 'int',
                name: 'amount'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
