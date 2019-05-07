<template>
  <div>
    <div>
      <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
    </div>
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables.vue'
import { getPageListByDept, projectGetPageList } from '@/api/zjjAdmin/construction'
import clickImg from '_c/clickImg'
import './companyAdmin'
export default({
  components: {
    editableTables,
    clickImg
  },
  data () {
    return {
      columns: [
        {
          title: '项目名称',
          key: 'name'
        },
        {
          title: '总承包单位名称',
          key: 'contractorCorpName'
        },
        {
          title: '组织机构代码',
          key: 'contractorCorpCode'
        },
        {
          title: '项目编码',
          key: 'projectCode'
        },
        {
          title: '主板编号',
          key: 'mainboardNum'
        },
        {
          title: '保证金状态',
          key: 'projectAddr',
          render: (h, params) => {
            return h('div', params.row.bondState + '' === '0' ? '未审核/未提交' : '通过')
          }
        },
        {
          title: '发放金状态',
          key: 'projectAddr',
          render: (h, params) => {
            return h('div', params.row.grantState + '' === '0' ? '未审核/未提交' : '通过')
          }
        }
      ],
      // 基本参数
      dataList: [],
      // 查询参数
      selectValue: '',
      // 分页参数
      pageNum: 1,
      pageTotal: 1
      // 需求参数
    }
  },
  methods: {
    // 分页查询管理员
    getList () {
      this.dataList = []
      projectGetPageList(this.pageNum, this.selectValue).then(res => {
        this.dataList = []
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        this.dataList.push(...res.info.data)
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    // 得到页数
    getPageNum (e) {
      this.pageNum = e
      this.getList()
    },
    // 复位
    restoration () {
      this.accountTitle = ''
      this.accountJob = ''
      this.pageNum = 1
    }
  },
  mounted () {
    // 初始化管理员列表
    this.getList()
  }
})
</script>
<style>
</style>
