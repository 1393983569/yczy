<template>
  <div style="display: inline-block; margin-right: 5px">
    <Button type="primary" size="small" style="margin-top: 8px" @click="showModal">项目参建单位管理</Button>
    <Modal
      v-model="showTeamOrGroup"
      :mask-closable='false'
      title="查看班组"
      width="900">
      <teamOrGroup ref="refShowTeamOrGroup" @formState="formSuccessWorker"></teamOrGroup>
    </Modal>
    <Drawer
      v-model="contractorState"
      width="900"
      title="
      单位列表">
      <Button type="primary" style="margin-bottom: 5px" @click="add">添加参建单位</Button>
      <Table :columns="columns" :data="data"></Table>
    </Drawer>
    <Modal
      v-model="addModalWorker"
      :mask-closable='false'
      title="添加班组"
      width="900">
      <addProjectWorker ref="addWorker" @formState="formSuccessWorker" :projectCode="listCodeId + ''"></addProjectWorker>
      <div slot="footer">
        <Button type="primary" :loading="loading_group" @click="addWorkerOk">提交</Button>
      </div>
    </Modal>
    <Modal
      v-model="addState"
      title="添加参建单位"
      :mask-closable='false'
      width="900"
    >
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="corpCode" label="社会信用代码或组织机构代码" style="width: 200px">
          <Input v-model="formInline.corpCode" style="margin-bottom: 5px" placeholder="社会信用代码或组织机构代码" />
        </FormItem>
        <FormItem prop="corpName" label="企业名称" style="width: 200px">
          <Input v-model="formInline.corpName" style="margin-bottom: 5px" placeholder="企业名称" />
        </FormItem>
        <FormItem prop="corpType" label="参建类型">
          <Select v-model="formInline.corpType" style="width:200px">
            <Option v-for="item in subcontractorTypeList" :value="item.id + ''" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
         <!-- <FormItem prop="corpTypeEnterprise" label="单位性质">
          <Select v-model="formInline.corpTypeEnterprise" style="width:200px">
            <Option v-for="item in corpTypeEnterpriseList.info" :value="item.id + ''" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem> -->
        <FormItem prop="entryTimeData" label="进场时间" style="width: 200px">
          <DatePicker v-model="formInline.entryTimeData" type="date" placeholder="进场时间"></DatePicker>
        </FormItem>
        <FormItem prop="areaCode" label="企业注册地区" style="width: 200px">
          <siteSelect v-model="formInline.areaCode"></siteSelect>
        </FormItem>
        <!-- <FormItem prop="exitTime" label="退场时间" style="width: 200px">
          <DatePicker v-model="formInline.exitTime" type="date" placeholder="退场时间"></DatePicker>
        </FormItem> -->
        <FormItem prop="bankNameValue" label="银行支行名称">
          <Select v-model="formInline.bankNameValue" style="width:200px">
            <Option v-for="item in bankList" :value="item.id + ':' + item.accountTitle" :key="item.id">{{ item.accountTitle }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="bankNumber" label="银行卡号" style="width: 200px">
          <Input v-model="formInline.bankNumber" style="margin-bottom: 5px" placeholder="银行卡号" />
        </FormItem>
        <FormItem prop="bankLinkNumber" label="银行联号" style="width: 200px">
          <Input v-model="formInline.bankLinkNumber" style="margin-bottom: 5px" placeholder="银行联号" />
        </FormItem>
        <!--<FormItem prop="bankInfos" label="发放工资的银行" style="width: 200px">-->
          <!--<Input v-model="formInline.bankInfos" style="margin-bottom: 5px" placeholder="发放工资的银行" />-->
        <!--</FormItem>-->
        <FormItem prop="pmName" label="项目经理名称" style="width: 200px">
          <Input v-model="formInline.pmName" style="margin-bottom: 5px" placeholder="项目经理名称" />
        </FormItem>
        <!--<FormItem prop="pmIDCardType" label="项目经理证件类型">-->
          <!--<Input v-model="formInline.pmIDCardType" style="margin-bottom: 5px" placeholder="项目经理证件类型" />-->
        <!--</FormItem>-->
        <FormItem prop="pmIDCardNumber" label="项目经理证件号码" style="width: 200px">
          <Input v-model="formInline.pmIDCardNumber" style="margin-bottom: 5px" placeholder="项目经理证件号码" />
        </FormItem>
        <FormItem prop="pmPhone" label="项目经理电话" style="width: 200px">
          <Input v-model="formInline.pmPhone" style="margin-bottom: 5px" placeholder="项目经理电话" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelAdd">取消</Button>
        <Button type="primary" :loading="add_loading" @click="confirmAdd">确定</Button>
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
    <modificationTeamOrGroup ref="modificationTeamOrGroupRef" />
  </div>
</template>

<script>
import {getPageList, addUnity, itemExit, corpUpload} from '@/api/constructionOrganizationAdmin/contractorAdmin/contractorAdmin'
import addProjectWorker from './addProjectWorker'
import contractorAdminList from './components/contractorAdminList'
import {aesDecrypt} from '@/libs/util'
import { subcontractorType, unityType, getBankList, projectPropertyConstruction } from '@/api/public'
import teamOrGroup from './components/teamOrGroup'
import modificationTeamOrGroup from './components/modificationTeamOrGroup'
import siteSelect from '@/components/siteSelect/siteSelect'
export default {
  name: 'contractorAdmin',
  components: {
    addProjectWorker,
    teamOrGroup,
    modificationTeamOrGroup,
    siteSelect
  },
  props: {
    projectCode: {
      type: String
    },
    disabled: Boolean
  },
  data () {
    return {
      columns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(contractorAdminList, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '统一社会信用代码',
          key: 'corpCode'
        },
        {
          title: '企业名称',
          key: 'corpName'
        },
        {
          title: '参建类型',
          key: 'corpTypeName',
          render: (h, params) => {
            return h('div', params.row.subcontractorTypeDomain.name)
          }
        },
        {
          title: '进场时间',
          key: 'entryTime',
          render: (h, params) => {
            return h('div', params.row.entryTime.split(' ')[0])
          }
        },
        {
          title: '退场时间',
          key: 'exitTime',
          render: (h, params) => {
            return h('div', params.row.exitTime.split(' ')[0])
          }
        },
        {
          title: '状态',
          key: 'corpTypeName',
          render: (h, params) => {
            return h('div', params.row.exitTime ? '已退场' : '未退场')
          }
        },
        // {
        //   title: '退场时间',
        //   key: 'exitTime',
        //   render: (h, params) => {
        //     return h('div', params.row.exitTime.split('.')[0])
        //   }
        // },
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
                  marginTop: '5px'
                },
                on: {
                  click: () => {
                    this.addModalWorker = true
                    this.listCodeId = params.row.bankDomain.projectCorpId
                    this.formInline.areaCode = []
                    this.$refs.addWorker.handleReset()  // 清空表单
                  }
                }
              }, '添加班组'),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  marginTop: '5px'
                },
                on: {
                  click: () => {
                    this.$refs.refShowTeamOrGroup.getList(params.row.bankDomain.projectCorpId)
                    this.showTeamOrGroup = true
                  }
                }
              }, '查看班组'),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small',
                  disabled: Boolean(params.row.exitTime)
                },
                style: {
                  marginRight: '5px',
                  marginTop: '5px',
                  marginBottom: '5px'
                },
                on: {
                  click: () => {
                    this.$refs.modificationTeamOrGroupRef.setData(params.row)
                  }
                }
              }, '修改参建单位'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: Boolean(params.row.exitTime)
                },
                style: {
                  marginRight: '5px',
                  marginTop: '5px',
                  marginBottom: '5px'
                },
                on: {
                  click: () => {
                    this.offShow = true
                    this.offDateObj = params.row
                    this.loading_uploadOffOk = false
                    this.offData = ''
                  }
                }
              }, '参建单位退场')
            ])
          }
        }
      ],
      data: [],
      contractorState: false,
      addState: false,
      add_loading: false,
      loading_group: false,
      addModalWorker: false,
      showTeamOrGroup: false,
      projectCorpId: '',
      pidList: '',
      didList: '',
      subcontractorTypeList: [],
      listCodeId: '',
      bankList: [],
      offShow: false,
      offDateObj: {},
      loading_uploadOffOk: false,
      modificationData: {},
      // corpTypeEnterpriseList: [],
      optionsData: {
        disabledDate  (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      offData: '',
      formInline: {
        corpCode: '',
        corpName: '',
        corpType: '',
        entryTimeData: '',
        exitTimeData: '',
        pmName: '',
        pmIDCardNumber: '',
        pmPhone: '',
        bankNameValue: '',
        bankNumber: '',
        bankLinkNumber: '',
        listCodeId: ''
      },
      ruleInline: {
        corpCode: [
          { required: true, message: '社会信用代码或组织机构代码', trigger: 'blur' }
        ],
        corpName: [
          { required: true, message: '企业名称不能为空', trigger: 'blur' }
        ],
        // bankNameValue: [
        //   { required: true, message: '银行支行名称不能为空', trigger: 'change' }
        // ],
        corpType: [
          { required: true, message: '参建类型不能为空', trigger: 'change' }
        ],
        // corpTypeEnterprise:  [
        //   { required: true, message: '单位性质不能为空', trigger: 'change' }
        // ],
        bankNameValue:  [
          { required: true, message: '支行名称不能为空', trigger: 'change' }
        ],
        bankNumber: [
          { required: true, message: '银行卡号不能为空', trigger: 'blur' }
        ],
        entryTimeData: [
          { required: true, type: 'date', message: '进场时间不能为空', trigger: 'blur' }
        ],
        areaCode: [
          { required: true, type: 'array', message: '企业注册地区不能为空', trigger: 'blur' }
        ],
        // exitTime: [
        //   { required: true, type: 'date', message: '退场时间不能为空', trigger: 'blur' }
        // ]
      }
    }
  },
  methods: {
    getList () {
      this.data = []
      getPageList(this.projectCode).then(res => {
        this.data = []
        if (res.info === '暂无数据') {
          this.$Message.error(res.info)
          this.pageTotal = 1
          return
        }
        this.data.push(...res.info.data)
      }).catch(err => {
        console.log(err)
      })
    },
    showModal () {
      this.contractorState = true
      this.getList()
    },
    hideModal () {
      this.contractorState = false
    },
    add () {
      this.getSubcontractorType()
      this.getBankType()
      // this.getDictionaries()
      this.addState = true
    },
    cancelAdd () {
      this.$refs['formInline'].resetFields()
      this.addState = false
      this.add_loading = false
    },
    addUnitData () {
      this.formInline.entryTime = new Date(this.formInline.entryTimeData).Format("yyyy-MM-dd hh:mm:ss")
      this.formInline.bankId = this.formInline.bankNameValue.split(':')[0]
      this.formInline.bankName = this.formInline.bankNameValue.split(':')[1]
      this.formInline.projectCode = this.projectCode
      addUnity(this.formInline).then(res => {
        this.add_loading = false
        this.$refs['formInline'].resetFields()
        this.$Message.success('成功')
        this.addState = false
        this.getList()
      }).catch(err => {
        this.$Message.error(err)
        this.add_loading = false
      })
    },
    confirmAdd () {
      this.add_loading = true
       console.log(this.formInline)
      this.$refs['formInline'].validate((valid) => {
        if (valid) {
          try{
            let data = {}
            data.corpCode = this.formInline.corpCode
            data.corpName  = this.formInline.corpName
            data.areaCode = this.formInline.areaCode[2]
            corpUpload(data).then(res => {
              setTimeout(() => {
                this.addUnitData()
              }, 2000)
              this.add_loading = false
            }).catch(err => {
              this.$Message.error(err)
              this.add_loading = false
            })
          } catch (e) {
              this.add_loading = false
          }
        } else {
          this.add_loading = false
        }
      })
    },
    // 添加工人 响应结果
    formSuccessWorker (e) {
      if (e) {
        this.loading_group = false
        this.addModalWorker = false
        this.$Message.success('成功')
      } else {
        this.loading_group = false
      }
    },
    addWorkerOk () {
      this.loading_group = true
      this.$refs.addWorker.handleSubmit('formInline')
    },
    getSubcontractorType () {
      this.subcontractorTypeList = []
      // subcontractorType
      unityType().then(res => {
        this.subcontractorTypeList = []
        this.subcontractorTypeList.push(...res.info)
      }).catch(err => {

      })
    },
    // 获取数据字典
    // async getDictionaries () {
    //   try {
    //     this.corpTypeEnterpriseList = await projectPropertyConstruction()
    //     console.log(this.corpTypeEnterpriseList, '==========')
    //   } catch (e) {
    //     console.log(e)
    //   }
    // },
    getBankType () {
      this.bankList = []
      getBankList().then(res => {
        this.bankList = []
        this.bankList.push(...res.info)
      }).catch(err => {

      })
    },
    // 参建单位退场
    uploadOffOk () {
      this.loading_uploadOffOk = true
      if (this.offData) {
        this.offDateObj.type = 0
        this.offDateObj.exitTime = new Date(this.offData).Format("yyyy-MM-dd hh:mm:ss")
        this.offDateObj.corpType = this.offDateObj.subcontractorTypeDomain.id
        delete this.offDateObj._rowKey
        delete this.  offDateObj.legalManIdCardTypeDomain
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
  }
}
</script>

<style scoped>

</style>
