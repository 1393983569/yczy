<template>
  <div>
    <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
    <Modal
      v-model="modalAudit"
      title="审核">
      <div>
        是否通过:
        <RadioGroup v-model="state">
          <Radio label="1">是</Radio>
          <Radio label="0">否</Radio>
        </RadioGroup>
      </div>
      <div style="margin-top: 5px">
        是否绑定银行:
        <RadioGroup v-model="stateType">
          <Radio label="1">是</Radio>
          <Radio label="0">否</Radio>
        </RadioGroup>
      </div>
      <div style="margin-top: 5px">
        试用结束时间:
        <InputNumber v-model="dayNumber" style="width: 200px" placeholder="请输入天数"></InputNumber >
      </div>
      <div slot="footer">
        <Button type="default" @click="cancelClick">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="confirmClick">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  // 基本模板
  import editableTables from '_c/editableTables/editableTables.vue'
  import { getAdmins, editAdmin } from '@/api/userManagement/IDaudit'
  export default({
    components: {
      editableTables
    },
    data () {
      return {
        columns: [
          {
            title: '账号',
            key: 'accountName'
          },
          {
            title: '加密密码',
            key: 'accountPass'
          },
          {
            title: '提交时间',
            key: 'createTime'
          },
          {
            title: 'id',
            key: 'id'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    // disabled: params.row.state === 1
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.auditId = ''
                      this.state = 1
                      this.stateType = 1
                      this.dayNumber = 0
                      this.audit(params.row.id)
                    }
                  }
                }, '审核')
              ]);
            }
          }
        ],
        // 基本参数
        dataList: [],
        // 查询参数
        selectValue: '',
        // 分页参数
        pageNum: 1,
        pageTotal: 1,
        // 需求参数
        modalAudit: false,
        auditId: '',
        state: 1,
        stateType: 1,
        dayNumber: 0,
        modal_loading: false
      }
    },
    methods: {
      // 分页查询管理员
      getList () {
        this.dataList = []
        getAdmins().then(res => {
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
      },
      audit (e) {
        this.auditId = e
        this.modalAudit = true
      },
      // 点击取消
      cancelClick () {
        this.modalAudit = false
        this.auditId = ''
        this.state = 1
        this.stateType = 1
      },
      // 点击确定
      confirmClick () {
        let data = {}
        data.accountId = this.auditId
        data.expireDate = this.dayNumber
        data.state = this.state
        data.type = this.stateType
        this.modal_loading = true
        editAdmin(data).then(res => {
          this.modal_loading = false
          this.modalAudit = false
          this.getList()
          this.$Message.success('成功')
        }).catch(err => {
          this.modal_loading = false
        })
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
