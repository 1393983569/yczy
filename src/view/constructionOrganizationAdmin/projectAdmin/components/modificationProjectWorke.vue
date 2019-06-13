<template>
  <!-- 添加数据 -->
  <div class="password">
    <Modal
      v-model="modificationState"
      title="修改班组"
      :mask-closable='false'
      :closable="false"
      width="900"
    >
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="teamName" label="班组名称">
          <Input type="text" v-model="formInline.teamName" style="width: 250px" placeholder="班组名称"></Input>
        </FormItem>
        <FormItem prop="responsiblePersonName" label="责任人姓名">
          <Input type="text" v-model="formInline.responsiblePersonName" style="width: 250px" placeholder="责任人姓名"></Input>
        </FormItem>
        <FormItem prop="responsiblePersonPhone" label="责任人联系电话">
          <Input type="text" v-model="formInline.responsiblePersonPhone" style="width: 250px" placeholder="责任人联系电话"></Input>
        </FormItem>
        <FormItem prop="responsiblePersonIDNumber" label="责任人证件号码">
          <Input type="text" v-model="formInline.responsiblePersonIDNumber" style="width: 250px" placeholder="责任人证件号码"></Input>
        </FormItem>
        <FormItem prop="remark" label="备注">
          <Input type="text" v-model="formInline.remark" style="width: 250px" placeholder="备注"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleReset">取消</Button>
        <Button type="primary" :loading="add_loading" @click="confirmAdd">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { edit } from '@/api/constructionOrganizationAdmin/projectAdmin/modificationProjectWorke'
  export default {
    components: {

    },
    data () {
      const validaAccountPhone = (rule, value, callback) => {
        console.log(value)
        if (value !== '') {
          if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value))) {
            callback(new Error('请输入正确的手机号'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      // 效验身份证
      const identityCard = (rule, value, callback) => {
        if (value !== '') {
          if (!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value))) {
            callback(new Error('请输入正确的身份证号码'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      return {
        formInline: {
          teamName: '',
          responsiblePersonPhone: '',
          responsiblePersonName: '',
          responsiblePersonIDNumber: '',
          remark: '',
          corpName: '',
          corpCode: '',
          entryAttachments: [],
          exitAttachments: [],
        },
        ruleInline: {
          teamName: [
            { required: true, message: '班组名称不能为空', trigger: 'blur' }
          ],
          responsiblePersonPhone: [
            { validator: validaAccountPhone, trigger: 'blur' }
          ],
          responsiblePersonIDNumber: [
            { validator: identityCard, trigger: 'blur' }
          ]
        },
        loading: false,
        modificationState: false,
        add_loading: false
      }
    },
    methods: {
      handleSubmit (name) {
        // this.loading = true
        return this.$refs[name].validate((valid) => {
          console.log(this.formInline)
          edit().then(res => {

          }).catch(err => {

          })
        })
      },
      // 清空
      handleReset () {
        // this.$refs.formInline.resetFields()
        this.modificationState = false
      },
      setData (e) {
        this.modificationState = true
        this.formInline = e
      },
      confirmAdd () {
        this.add_loading = true
        console.log('sssssssssssss')
        edit(this.formInline).then(res => {
          this.add_loading = false
          this.modificationState = false
          this.$Message.success('成功')
        }).catch(err => {
          this.add_loading = false
          this.modificationState = true
          this.$Message.error(err)
        })
      }
    },
    mounted () {

    }
  }
</script>

<style scoped>
</style>
