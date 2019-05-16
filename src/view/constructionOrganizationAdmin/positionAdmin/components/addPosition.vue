<template>
  <!-- 添加数据 -->
  <div>
    <Form ref="formValidate" :model="formInline" :rules="ruleInline" inline>
      <!--<FormItem prop="sn" label="职位名称">-->
        <!--<Input v-model="formInline.positionName" placeholder="职位名称" style="width: 250px" />-->
      <!--</FormItem>-->
      <FormItem prop="positionName" label="职位名称">
        <Select v-model="formInline.positionName" style="width:250px" placeholder="职位名称">
          <Option  :value="item.profession" :key="index" v-for="(item, index) in workerTypeList.info">{{item.profession}}</Option>
        </Select>
      </FormItem>
      <FormItem prop="description" label="职位描述">
        <Input v-model="formInline.description" placeholder="职位描述" style="width: 250px" />
      </FormItem>
      <FormItem prop="contactsName" label="	联系人姓名">
        <Input v-model="formInline.contactsName" placeholder="联系人姓名" style="width: 250px" />
      </FormItem>
      <FormItem prop="contactsMobile" label="联系人电话">
        <Input v-model="formInline.contactsMobile" placeholder="联系人电话" style="width: 250px" />
      </FormItem>
      <FormItem prop="experienceId" label="经验">
        <Select v-model="formInline.experienceId" style="width:250px" placeholder="经验">
          <Option  :value="item.eid" :key="index" v-for="(item, index) in experiencesList.info">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem prop="salaryId" label="薪资">
        <Select v-model="formInline.salaryId" style="width:250px" placeholder="薪资">
          <Option  :value="item.sid" :key="index" v-for="(item, index) in salarysList.info">{{item.name}}</Option>
        </Select>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import { commonGetSalarys, commonGetExperiences, workerType } from '@/api/public'
  import { positionAdd, positionEdit  } from '@/api/constructionOrganizationAdmin/positionAdmin'
  export default {
    components: {

    },
    data () {
      return {
        formInline: {
          sn: '',
          name: '',
          equipmentNum: '',
          dataIp: '',
          dataPort: '',
          configIp: '',
          configPort: '',
          type: '',
          projectCode: '',
          state: ''
        },
        ruleInline: {

        },
        salarysList: [],
        experiencesList: [],
        workerTypeList: []
      }
    },
    props: {
      row: {
        type: Object
      }
    },
    methods: {
      // 提交表单
      handleSubmit () {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            try {
              if (this.formInline.custom) {
                positionEdit(this.formInline).then(res => {
                  this.$Message.success('成功')
                  this.$emit('submitState', true)
                }).catch(err => {
                  this.$Message.error(err)
                  this.$emit('submitState', false)
                })
              } else {
                positionAdd(this.formInline).then(res => {
                  this.$Message.success('成功')
                  this.$emit('submitState', true)
                }).catch(err => {
                  this.$Message.error(err)
                  this.$emit('submitState', false)
                })
              }
            } catch (e) {
              console.log(e)
            }
          } else {
            this.$Message.error('请完善信息')
            this.$emit('submitState', false)
          }
        })
      },
      // 清空表单
      handleReset () {
        this.$refs.formValidate.resetFields()
      },
      setData(e) {
        this.formInline = e
      },
      async getDictionaries () {
        this.salarysList = await commonGetSalarys()
        this.experiencesList = await commonGetExperiences()
        this.workerTypeList = await workerType()
      }
    },
    mounted () {
      this.getDictionaries()
    },
    watch: {
      row (e) {
        console.log(e)
        this.formInline = e
      }
    }
  }
</script>

<style scoped>

</style>
