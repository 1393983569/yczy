<template>
  <div>
    <div>
      <queryCondition @sendDataList="sendDataList" />
      <editableTables  :columns='columns' :showHeader="false" :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
    </div>
    <Modal
      v-model="addModal"
      :mask-closable='false'
      title="合同上传"
      width="600">
      <addContract ref="addContractRes" @submitState="submitState" :projectCorpId="wId"></addContract>
      <div slot="footer">
        <Button type="primary" :loading="loading" @click="addOk" >提交</Button>
      </div>
    </Modal>
    <Modal
      v-model="modificationWorkerState"
      :mask-closable='false'
      title="修改信息"
      width="900">
      <addWorker ref="addWorkerRef" @submitState="submitStateEdit" :apiState="true" :row="rowObj" :projectCorpId="wId + ''" ></addWorker>
      <div slot="footer">
        <Button type="primary" :loading="loading_edit" @click="editOk" >提交</Button>
      </div>
    </Modal>
     <Modal
      v-model="uploadSalaryState"
      :mask-closable='false'
      title="上传工资"
      width="900">
      <uploadSalary ref="uploadSalaryRef" @submitState="submitStateUpload" :wId="wId + ''" ></uploadSalary>
      <div slot="footer">
        <Button type="primary" :loading="loading_uploadSalaryS" @click="uploadSalarySOk" >提交</Button>
      </div>
    </Modal>
    <Modal
      v-model="checkingInState"
      :mask-closable='false'
      title="考勤记录"
      width="900">
      <checking-in ref="checkingInRef" :wId="wId"></checking-in>
    </Modal>
    <Modal
      v-model="contractSeeState"
      :mask-closable='false'
      title="查看合同"
      width="900">
      <contractSee ref="contractSeeRef" :wId="wId"></contractSee>
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
  </div>
</template>
<script>
// 基本模板
import editableTables from '_c/editableTables/editableTables.vue'
import clonedeep from 'clonedeep'
import { workerQuery, itemExit } from '@/api/constructionOrganizationAdmin/workerAdmin/workerAdmin'
import clickImg from '_c/clickImg'
import { aesDecrypt } from '@/libs/util'
import { workerType } from '@/api/public'
// 添加合同
import addContract from './components/addContract'
// 添加/修改 工人
import addWorker from '../projectAdmin/components/addWorker'
// 上传工资
import uploadSalary from './components/uploadSalary'
// 考勤记录
import checkingIn from './components/checking-in'
// 查询组件
import queryCondition from './components/queryCondition'
// 查看合同
import contractSee from './components/contractSee'
export default({
  components: {
    editableTables,
    clickImg,
    addContract,
    addWorker,
    uploadSalary,
    checkingIn,
    queryCondition,
    contractSee
  },
  data () {
    return {
      columns: [
        {
          title: '基本信息',
          key: 'JBXX',
          width: 140,
          render: (h, params) => {
            return (
              <div style="padding: 5px; width: 102px; height: 126px;">
                <img src={params.row.headImage} />
              </div>
            )
          }
        },
        {
          title: '基本信息',
          key: 'JBXX',
          render: (h, params) => {
            let style = params.row.state ? `color: red` : `display: none`
            let styleModification = params.row.state ?  `display: none` : `display: inline-block`
            return (
              <div>
                <div style="cursor: pointer" >
                  <span style="color: #2D8cF0; font-weight: 700">{params.row.workerName} </span>
                  <span style={style}>(已退场)</span>
                  <tooltip content="修改工人信息" style={styleModification}>
                    <icon type="ios-create" style="font-size: 16px; color: #2D8cF0;" on-click={this.modificationWorker.bind(this, params.row)}/>
                  </tooltip>
                  <tooltip content="查看合同">
                    <icon on-click={this.contrac.bind(this, params.row.id)} type="ios-eye" style="font-size: 20px; color: #2D8cF0;"/>
                  </tooltip>
                </div>
                 <div>
                  <b>民族：</b>
                  <span>{params.row.nation}</span>
                </div>
                <div>
                  <b>身份证号：</b>
                  <span>{aesDecrypt(params.row.idCardNumber)}</span>
                </div>
              </div>
            )
          }
        },
        {
          title: '基本信息2',
          key: 'JBXX2',
          render: (h, params) => {
            return (
              <div>
                <div>
                  <b>工种：</b>
                  <span>{params.row.workerTypeDomain.profession}</span>
                </div>
                 <div>
                  <b>是否班组长：</b>
                  {params.row.isTeamLeader === 1 ? <span>是</span> : <span>否</span>}
                </div>
                <div>
                  <b>当前所班组：</b>
                  <span>{params.row.projectCorpTeamDomain.teamName}</span>
                </div>
              </div>
            )
          }
        },
        {
          title: '基本信息3',
          key: 'JBXX3',
          render: (h, params) => {
            return (
              <div>
                <div>
                  <b>年龄：</b>
                    {params.row.age ? <span>{params.row.age}</span> : <span>暂无数据</span>}
                </div>
                 <div>
                  <b>性别：</b>
                  {params.row.gender ? <span>{params.row.gender}</span> : <span>暂无数据</span>}
                </div>
                <div>
                  <b>住址：</b>
                  <span>{params.row.address}</span>
                </div>
              </div>
            )
          }
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
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  verticalAlign: 'top'
                },
                on: {
                  click: () => {
                    this.addModal = true
                    this.wId = params.row.id + ''
                    this.apiState = ''
                    // 清除add状态
                    this.$refs.addContractRes.handleReset()
                  }
                }
              }, '上传合同'),
               h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  // marginTop: '5px'
                  // display: 'block'
                },
                on: {
                  click: () => {
                    this.uploadSalaryState = true
                    this.wId = params.row.id + ''
                    // 清除add状态
                    this.$refs.uploadSalaryRef.handleReset()
                    this.$refs.uploadSalaryRef.getDictionaries()
                    this.$refs.uploadSalaryRef.getSalaryParticulars(params.row.id)
                  }
                }
              }, '上传工资'),
                h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  marginTop: '5px',
                  // display: 'block'
                },
                on: {
                  click: () => {
                    this.checkingInState = true
                    this.$refs.checkingInRef.getList(params.row.id)
                  }
                }
              }, '查看考勤'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  marginTop: '5px',
                  // display: 'block'
                },
                on: {
                  click: () => {
                    this.offShow = true
                    this.offDateObj = params.row
                    this.loading_uploadOffOk = false
                    this.offData = ''
                  }
                }
              }, '工人退场')
            ])
          }
        }
      ],
      // 基本参数
      dataList: [],
      // 查询参数
      selectValue: {},
      // 分页参数
      pageNum: 1,
      pageTotal: 1,
      // 需求参数
      addModal: false,
      loading: false,
      apiState: '',
      workerTypeList: [],
      wId: '',
      rowObj: {},
      modificationWorkerState: false,
      loading_edit: false,
      uploadSalaryState: false,
      loading_uploadSalaryS: false,
      checkingInState: false,
      contractSeeState: false,
      offShow: false,
      optionsData: {
        disabledDate  (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      offData: '',
      loading_uploadOffOk: false,
      offDateObj: {}
    }
  },
  methods: {
    // 分页查询管理员
    getList () {
      this.dataList = []
      workerQuery(this.pageNum, this.selectValue).then(res => {
        this.dataList = []
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.data.map((res) => {
          this.dataList.push({...res})
        })
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
    addOk () {
      this.loading = true
      this.$refs.addContractRes.handleSubmit()
    },
    submitState (e) {
      // 提交成功
      if (e) {
        this.loading = false
        this.addModal = false
      // 失败
      } else {
        this.loading = false
        this.addModal = true
      }
    },
    clickSearch (e) {
      this.selectValue.workerName = e
      this.restoration()
      this.getList()
    },
    async getWorkerTypeList () {
      this.workerTypeList = await workerType().then().catch()
      this.getList()
    },
    // 修改工人信息
    modificationWorker (row) {
      let rowData = clonedeep(row)
      rowData.idCardNumber = aesDecrypt(rowData.idCardNumber)
      rowData.hasBadMedicalHistory = rowData.hasBadMedicalHistory + ''
      rowData.isTeamLeader = rowData.isTeamLeader + ''
      rowData.workRole = rowData.workRole + ''
      if (rowData.payRollBankCardNumber) rowData.payRollBankCardNumber = aesDecrypt(rowData.payRollBankCardNumber)
      if (rowData.hasBuyInsurance + '') rowData.hasBuyInsurance = rowData.hasBuyInsurance + ''
      delete rowData._rowKey
      this.wId = rowData.id + ''
      this.modificationWorkerState = true
      this.$refs.addWorkerRef.handleReset()  // 清空表单
      this.rowObj = clonedeep(rowData)
      this.$refs.addWorkerRef.getDictionaries()
    },
    // 提交工人修改
    editOk () {
      this.loading_edit = true
      // this.modificationWorkerState = true
      this.$refs.addWorkerRef.handleSubmit()
    },
    submitStateEdit (e) {
      console.log(e)
      // 提交成功
      if (e) {
        this.loading_edit = false
        this.modificationWorkerState = false
      // 失败
      } else {
        this.loading_edit = false
        this.modificationWorkerState = true
      }
    },
    // 提交工资
    uploadSalarySOk () {
      this.loading_uploadSalaryS = true
      this.$refs.uploadSalaryRef.handleSubmit()
    },
    submitStateUpload (e) {
      console.log(e)
      // 提交成功
      if (e) {
        this.loading_uploadSalaryS = false
        this.uploadSalaryState = false
      // 失败
      } else {
        this.loading_uploadSalaryS = false
        this.uploadSalaryState = true
      }
    },
    sendDataList (e) {
      this.restoration()
      this.selectValue = e
      this.getList()
    },
    contrac (id, e) {
      console.log(e, id)
      this.contractSeeState = true
      this.$refs.contractSeeRef.getList(id)
    },
    // 参建单位退场
    uploadOffOk () {
      this.loading_uploadOffOk = true
      if (this.offData) {
        this.offDateObj.type = '0'
        this.offDateObj.wId = this.offDateObj.id
        this.offDateObj.date = new Date(this.offData).Format("yyyy-MM-dd hh:mm:ss")
        delete this.offDateObj._rowKey
        delete this.offDateObj.projectCorpTeamDomain
        delete this.offDateObj.legalManIdCardTypeDomain
        delete this.offDateObj.workerTypeDomain
        itemExit(this.offDateObj).then(res => {
          this.loading_uploadOffOk = false
          this.offShow = false
          this.getList()
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
  },
  mounted () {
    // 初始化管理员列表
    this.getWorkerTypeList()
  }
})
</script>
<style>
</style>
