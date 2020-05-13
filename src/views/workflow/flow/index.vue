<template>
  <d2-container>
    <data-table
      :options="tableProps"
      @onDelete="handleDelete"
      @onAdd="handleAdd"
      @onUpdate="handleUpdate"
      :custom-events="customEvents"
    />
    <flow-editor-dialog :visible="editorDialogVisible" @onClose="handleDialogClose"/>
  </d2-container>
</template>

<script>
import DataTable from '../../../components/data-table/index'
import FlowStatus from './FlowStatus'
import FlowEditorDialog from './FlowEditorDialog'
export default {
  name: 'index',
  components: { FlowEditorDialog, DataTable },
  data () {
    return {
      tableProps: {
        columns: [
          {
            title: '业务表单',
            name: 'form_id',
            formItem: {
              rules: [{ required: true, message: '必须选择一个业务表单' }]
            },
            tableItem: {}
          },
          {
            title: '流程名称',
            name: 'name',
            formItem: {
              rules: [
                { required: true, message: '名称必须填写' },
                { max: 100, message: '不能超过100个字符' }
              ]
            },
            tableItem: {}
          },
          {
            title: '流程编号',
            name: 'code',
            formItem: {
              rules: [
                { required: true, message: '编号必须填写' },
                { max: 100, message: '不能超过100个字符' }
              ]
            },
            tableItem: {}
          },
          {
            title: '版本号',
            name: 'version',
            tableItem: {
              width: 80
            }
          },
          {
            title: '状态',
            name: 'status',
            tableItem: {
              component: {
                name: FlowStatus
              },
              width: 80
            }
          },
          {
            title: '备注',
            name: 'memo',
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
          }
        ],
        data: [
          {
            name: '流程名称一',
            code: 'FS-QJ-FLOW',
            status: 1,
            memo: '234234',
            version: 1,
            form_id: 'sdfsdf'
          }
        ],
        actionCol: {
          custom: [
            {
              text: '绘制流程',
              type: 'warning',
              size: 'small',
              emit: 'OpenEditFlowDialog'
            }
          ]
        }
      },
      customEvents: {
        // 打开编辑器
        OpenEditFlowDialog: () => {
          this.editorDialogVisible = true
        }
      },
      editorDialogVisible: false
    }
  },
  methods: {
    /**
     * 删除
     * @param index 序号
     * @param row 记录行
     * @param done 完成
     */
    handleDelete ({ index, row }, done) {
      done()
    },
    handleAdd ({ index, row }, resolve) {
      console.log(row)
    },
    handleUpdate ({ index, row }, resolve) {
      console.log(row)
    },
    handleDialogClose () {
      this.editorDialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
