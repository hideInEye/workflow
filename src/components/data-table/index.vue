<template>
  <d2-crud
    ref="d2Crud"
    :loading="defaultProps.loading"
    :options="dtOptions"
    :columns="defaultProps.columns"
    index-row=""
    :data="data"
    :pagination="defaultProps.pagination"
    :row-handle="defaultProps.actionCol"
    :edit-template="defaultProps.editTemplate"
    :add-template="defaultProps.addTemplate"
    :add-rules="defaultProps.rules"
    :edit-rules="defaultProps.rules"
    @row-remove="handleRowRemove"
    @dialog-cancel="handleDialogCancel"
    @row-add="handleRowAdd"
    @row-edit="handleRowEdit"
    :form-options="formOptions"
    v-on="{...customEvents}"
    @pagination-current-change="paginationChange"
  >
    <div style="margin-bottom: 8px" slot="header">
      <el-button type="primary" @click="onAdd">新增</el-button>
      <slot name="toolbar"/>
    </div>
  </d2-crud>
</template>

<script>
/**
   * 转换数据
   * @param fields
   */
const parseData = (fields) => {
  if (!fields.columns) return {}
  if (fields.actionCol) {
    delete fields.actionCol
  }
  const data = { ...fields }
  data.columns = [] // 列
  data.addTemplate = {} // 新增表单模板
  data.editTemplate = {} // 编辑表单模板
  data.rules = [] // 表单校验
  fields.columns.forEach(item => {
    if (item.tableItem) {
      data.columns.push({
        title: item.title,
        key: item.name,
        ...item.tableItem
      })
    }
    if (item.formItem) {
      data.addTemplate = data.editTemplate = {
        ...data.editTemplate,
        [item.name]: {
          title: item.title,
          ...item.formItem
        }
      }
      if (item.formItem.rules) {
        data.rules = {
          [item.name]: item.formItem.rules,
          ...data.rules
        }
      }
    }
  })
  return data
}
export default {
  name: 'DataTable',
  mounted () {

  },
  data () {
    return {
      formOptions: {
        labelWidth: '100px',
        labelPosition: 'left',
        saveLoading: false
      },
      dtOptions: {
        stripe: true
      },
      defaultProps: {
        // 加载状态
        loading: false,
        // 列描述
        columns: [],
        // // 分页配置
        // pagination: {
        //   currentPage: 1,
        //   pageSize: 10,
        //   total: 10
        // },
        actionCol: {
          remove: {
            icon: 'el-icon-delete',
            size: 'small',
            fixed: 'right',
            confirm: true
          },
          edit: {
            icon: 'el-icon-edit',
            text: '编辑',
            size: 'small'
          },
          ...this.options.actionCol
        },
        ...parseData(this.options)
      }
    }
  },
  watch: {
    options: {
      immediate: true,
      handler (value) {
        this.defaultProps = {
          ...this.defaultProps,
          ...parseData(value)
        }
      }
    },
    pagination(oldValue,newValue){
      if(oldValue){
        this.defaultProps.pagination = oldValue
      }
    }
  },

  methods: {
    /**
       * 点击新增时
       */
    onAdd () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    /**
       * 删除数据时
       */
    handleRowRemove (p, done) {
      this.$emit('onDelete', p, done)
    },
    /**
       * 退出编辑框
       * @param done
       */
    handleDialogCancel (done) {
      done()
    },
    /**
       * 保存新增数据时
       * @param row
       * @param done
       */
    handleRowAdd (row, done) {
      // this.formOptions.saveLoading = true
      new Promise(resolve => {
        this.$emit('onAdd', row, resolve)
      }).then(
        () => {
          done()
          // this.formOptions.saveLoading = false
        }
      )
    },
    /**
       * 编辑数据时
       * @param row
       * @param done
       */
    handleRowEdit (row, done) {
      // this.formOptions.saveLoading = true
      new Promise(resolve => {
        this.$emit('onUpdate', row, resolve)
      }).then(
        () => {
          done()
          // this.formOptions.saveLoading = false
        }
      )
    },
    paginationChange(current){
      this.$emit('paginationCurrentChange',current)
    }
  },
  props: {
    options: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    },
    data: {
      type: Array,
      default: () => []
    },
    // 自定义操作列事件注册
    customEvents: {
      type: Object,
      default: () => {
        return {}
      }
    },
    paginationCurrentChange:{
      type:Function,
      default:Function
    },
    pagination:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>
