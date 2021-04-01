<template>
  <div>
    <div
      class="form-line"
      v-for="(item, index) in values"
      :key="index"
    >
      <div class="form-item">
        <el-row>
          <el-col :span="5">
            <span>标题:</span>
          </el-col>
          <el-col :span="19">
            <el-input v-model="item.code" size="small" placeholder="输入标题" @change="handleChange(index, item)"/>
          </el-col>
        </el-row>
      </div>
      <div class="form-item">
        <el-row>
          <el-col :span="8">
            <span>字段名:</span>
          </el-col>
          <el-col :span="16">
            <el-input v-model="item.value" @change="handleChange(index, item)" size="small" placeholder="表单字段名"/>
          </el-col>
        </el-row>
      </div>
      <div class="form-item">
        <el-row>
          <el-col :span="8">
            <span>数据类型:</span>
          </el-col>
          <el-col :span="16">
            <el-select @change="handleChange(index, item)" size="small" v-model="item.type" placeholder="数据类型选择" value="">
              <el-option
                v-for="item in dataTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="form-item">
        <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="deleteField(index)"></el-button>
      </div>
    </div>

    <div class="add-btn">
      <el-button size="small" icon="el-icon-circle-plus-outline" @click="addNewField">添加新字段</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormFields',
  methods: {
    /**
     * 处理更新
     * */
    handleChange (index, item) {
      this.values.slice(index, 0, item)
      let validate = false
      this.values.forEach(d => {
        validate = !!((d.code && d.code !== '') && (d.value && d.value !== '') && (d.type && d.type !== ''))
      })
      if (validate) {
        this.$emit('input', this.values)
      } else {
        this.$message.error('把内容填写完整')
        this.$emit('input', [])
      }
    },
    /**
     * 新增表单域
     */
    addNewField () {
      this.values.push({})
    },
    /**
     * 删除表单域
     */
    deleteField (index) {
      this.values.splice(index, 1)
    }
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      dataTypes: [
        {
          value: 2,
          label: '数值型'
        },
        {
          value: 1,
          label: '字符串'
        },
        {
          value: 3,
          label: '对象'
        }
      ],
      data: {},
      values: this.value || []
    }
  },
  mounted () {

  },
}
</script>

<style lang="scss">
  .form-line {
    display: flex;
    .form-item {
      margin-right: 8px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .add-btn {
    text-align: center;
    > .el-button {
      border-style: dashed;
    }
  }
</style>
