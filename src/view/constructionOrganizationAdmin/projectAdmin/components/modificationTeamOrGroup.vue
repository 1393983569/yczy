<template>
    <div>
      <Modal
        v-model="addState"
        title="修改参建单位"
        :mask-closable='false'
        :closable="false"
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
              <Option v-for="(item, index) in subcontractorTypeList" :value="item.id + ''" :key="index">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <!--<FormItem prop="bankNameValue" label="银行支行名称">-->
            <!--<Select v-model="formInline.bankNameValue" style="width:200px">-->
              <!--<Option v-for="item in bankList" :value="item.id + ':' + item.accountTitle" :key="item.id">{{ item.accountTitle }}</Option>-->
            <!--</Select>-->
          <!--</FormItem>-->
          <FormItem prop="bankNumber" label="银行卡号" style="width: 200px">
            <Input v-model="formInline.bankNumber" style="margin-bottom: 5px" placeholder="银行卡号" />
          </FormItem>
          <FormItem prop="bankLinkNumber" label="银行联号" style="width: 200px">
            <Input v-model="formInline.bankLinkNumber" style="margin-bottom: 5px" placeholder="银行联号" />
          </FormItem>
          <FormItem prop="pmName" label="项目经理名称" style="width: 200px">
            <Input v-model="formInline.pmName" style="margin-bottom: 5px" placeholder="项目经理名称" />
          </FormItem>
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
    </div>
</template>
<script>
  import { edit } from '@/api/constructionOrganizationAdmin/projectAdmin/modificationTeamOrGroup'
  import { subcontractorType, getBankList } from '@/api/public'
  import clonedeep from 'clonedeep'
export default ({
  data() {
    return {
      ruleInline: {
        corpCode: [
          { required: true, message: '社会信用代码或组织机构代码', trigger: 'blur' }
        ],
        corpName: [
          { required: true, message: '企业名称不能为空', trigger: 'blur' }
        ],
        bankNameValue: [
          { required: true, message: '银行支行名称不能为空', trigger: 'change' }
        ],
        corpType: [
          { required: true, message: '参建类型不能为空', trigger: 'change' }
        ],
        bankNumber: [
          { required: true, message: '银行卡号不能为空', trigger: 'blur' }
        ],
        entryTimeData: [
          { required: true, type: 'date', message: '进场时间不能为空', trigger: 'blur' }
        ]
      },
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
      addState: false,
      add_loading: false,
      subcontractorTypeList: [],
      bankList: []
    }
  },
  methods: {
    setData (e) {
      this.formInline = e
      this.formInline.corpType = e.subcontractorTypeDomain.id
      this.formInline.bankNumber = e.bankDomain.bankNumber
      this.formInline.bankLinkNumber = e.bankDomain.bankLinkNumber
      this.formInline.bankNameValue = `${e.bankDomain.bankCode + ''}:${e.bankDomain.bankName}`
      this.addState = true
      this.getDictionaries()
    },
    cancelAdd () {
      this.addState = false
    },
    confirmAdd () {
      let data = clonedeep(this.formInline)
      this.add_loading = true
      delete data.subcontractorTypeDomain
      delete data.bankDomain
      delete data.legalManIdCardTypeDomain
      delete data._rowKey
      data.bankName = this.formInline.bankNameValue.split(':')[1]
      data.bankCode = this.formInline.bankNameValue.split(':')[0]
      edit(data).then(res => {
        this.add_loading = false
        this.$Message.success('成功')
        this.addState = false
      }).catch(err => {
        this.$Message.error(err)
        this.add_loading = false
      })
    },
    getDictionaries () {
      subcontractorType().then(res => {
        this.subcontractorTypeList.push(...res.info)
      }).catch(err => {

      })
      getBankList().then(res => {
        this.bankList.push(...res.info)
      }).catch(err => {

      })
    },
  },
  mounted () {

  }
})
</script>
<style>

</style>
