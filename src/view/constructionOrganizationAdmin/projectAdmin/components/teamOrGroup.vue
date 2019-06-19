<template>
  <div>
    <div>
      <editableTables :progress="editableTablesProgress" :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
    </div>
    <Modal
      v-model="modalMessage"
      title="添加工人"
      :mask-closable="false"
      width="900">
      <addWorker ref="addWorkerRef" @submitState="submitState" :projectCorpId="teamOrGroupId + ''"></addWorker>
      <div slot="footer">
        <Button type="primary" :loading="loading" @click="addWorkerOk">提交</Button>
      </div>
    </Modal>
    <Modal
      v-model="offShow"
      :mask-closable='false'
      title="退场">
      <DatePicker type="date" v-model="offData" :options="optionsData" placeholder="请选择时间" style="width: 200px"></DatePicker>
      <div slot="footer">
        <Button type="primary" :loading="loading_uploadOffOk" @click="uploadOffOk" >提交</Button>
      </div>
    </Modal>
    <modificationProjectWorke ref="modificationProjectWorkeRef" />
  </div>
</template>
<script>
  // 基本模板
  import editableTables from '_c/editableTables/editableTables.vue'
  import clickImg from '_c/clickImg'
  import { projectCorpTeam, itemExit } from '@/api/constructionOrganizationAdmin/projectAdmin/teamOrGroup'
  import { aesDecrypt } from '@/libs/util'
  import addWorker from './addWorker'
  import modificationProjectWorke from './modificationProjectWorke'
  export default({
    components: {
      editableTables,
      clickImg,
      addWorker,
      modificationProjectWorke
    },
    data () {
      return {
        columns: [
          {
            title: '班组名称',
            key: 'teamName'
          },
          {
            title: '责任人姓名',
            key: 'responsiblePersonName'
          },
          {
            title: '责任人联系电话',
            key: 'responsiblePersonPhone'
          },
          {
            title: '责任人证件号码',
            key: 'responsiblePersonIDNumber',
            render: (h, params) => {
              return h('div', aesDecrypt(params.row.responsiblePersonIDNumber))
            }
          },
          {
            title: '备注',
            key: 'remark'
          },
          {
            title: '进场日期',
            key: 'entryTime'
          },
          {
            title: '退场日期',
            key: 'exitTime'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 180,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: Boolean(params.row.exitTime)
                  },
                  style: {
                    marginRight: '5px',
                    marginTop: '5px',
                  },
                  on: {
                    click: () => {
                      console.log(params.row.teamSysNo)
                      this.modalMessage = true
                      this.teamOrGroupId = params.row.teamSysNo + ''
                      this.$refs.addWorkerRef.getDictionaries()
                      this.$refs.addWorkerRef.handleReset()
                    }
                  }
                }, '添加工人'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    disabled: Boolean(params.row.exitTime)
                  },
                  style: {
                    marginRight: '5px',
                    marginTop: '5px',
                  },
                  on: {
                    click: () => {
                      this.$refs.modificationProjectWorkeRef.setData(params.row)
                    }
                  }
                }, '修改班组'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    disabled: Boolean(params.row.exitTime)
                  },
                  style: {
                    marginRight: '5px',
                    marginTop: '5px',
                    marginBottom: '5px',
                    display: 'inline-block',
                    textAlign: 'center'
                  },
                  on: {
                    click: () => {
                      this.offShow = true
                      this.offDateObj = params.row
                      this.loading_uploadOffOk = false
                      this.offData = ''
                    }
                  }
                }, '班组退场')
              ])
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
        modalMessage: false,
        modificationData: '',
        loading: false,
        callData: '',
        projectCorpId: '',
        teamOrGroupId: '',
        offShow: false,
        offDateObj: {},
        loading_uploadOffOk: false,
        offData: '',
        editableTablesProgress: true,
        optionsData: {
          disabledDate  (date) {
            return date && date.valueOf() > Date.now()
          }
        }
      }
    },
    methods: {
      // 分页查询班组
      getList (projectCorpId) {
        this.dataList = []
        this.projectCorpId = projectCorpId
        this.editableTablesProgress = true
        projectCorpTeam(this.pageNum, this.projectCorpId).then(res => {
          this.dataList = []
          this.editableTablesProgress = false
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
        this.pageNum = 1
      },
      addWorkerOk () {
        this.loading = true
        this.$refs.addWorkerRef.handleSubmit('formInline')
      },
      submitState (e) {
        // 提交成功
        if (e) {
          this.loading = false
          this.modalMessage = false
          this.getList(this.projectCorpId)
        // 失败
        } else {
          this.loading = false
           this.modalMessage = true
        }
      },
      uploadOffOk () {
        this.loading_uploadOffOk = true
        if (this.offData) {
          this.offDateObj.type = 0
          this.offDateObj.exitTime = new Date(this.offData).Format("yyyy-MM-dd")
          this.offDateObj.projectCropTeamId = this.offDateObj.id
          // this.offDateObj.responsiblePersonIDNumber = '620111199702250014'
          delete this.offDateObj._rowKey
          delete this.offDateObj.projectCorpTeamDomain
          delete this.offDateObj.workerTypeDomain
          itemExit(this.offDateObj).then(res => {
            this.loading_uploadOffOk = false
            this.offShow = false
            this.getList(this.projectCorpId)
            this.$Message.success('成功')
          }).catch(err => {
            this.loading_uploadOffOk = false
            this.offShow = true
            this.$Message.error(err)
            this.offDateObj.exitTime = ''
          })
        } else {
          this.loading_uploadOffOk = false
          this.offShow = true
          this.$Message.error('请填写时间')
        }
      }
    }
  })
</script>
<style>
</style>
