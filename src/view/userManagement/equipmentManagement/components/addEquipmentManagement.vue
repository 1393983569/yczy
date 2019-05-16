<template>
  <!-- 添加数据 -->
  <div>
    <Form ref="formValidate" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="sn" label="设备序列号">
        <Input v-model="formInline.sn" placeholder="设备序列号" style="width: 250px" />
      </FormItem>
      <FormItem prop="name" label="设备名称">
        <Input v-model="formInline.name" placeholder="设备名称" style="width: 250px" />
      </FormItem>
      <FormItem prop="equipmentNum" label="设备编号">
        <Input v-model="formInline.equipmentNum" placeholder="设备编号" style="width: 250px" />
      </FormItem>
      <FormItem prop="dataIp" label="数据上报IP/域名">
        <Input v-model="formInline.dataIp" placeholder="数据上报IP/域名" style="width: 250px" />
      </FormItem>
      <FormItem prop="dataPort" label="数据上报端口">
        <Input v-model="formInline.dataPort" placeholder="数据上报端口" style="width: 250px" />
      </FormItem>
      <FormItem prop="configIp" label="配置ip">
        <Input v-model="formInline.configIp" placeholder="配置ip" style="width: 250px" />
      </FormItem>
      <FormItem prop="configPort" label="配置端口">
        <Input v-model="formInline.configPort" placeholder="配置端口" style="width: 250px" />
      </FormItem>
      <FormItem prop="type" label="进出状态">
        <Select v-model="formInline.type" style="width:250px" placeholder="进出状态">
          <Option  value="02">进门</Option>
          <Option  value="01">出门</Option>
        </Select>
      </FormItem>
      <FormItem prop="projectCode" label="项目编号">
        <Input v-model="formInline.projectCode" placeholder="项目编号" style="width: 250px" />
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import { equipmentConfigAdd, equipmentConfigEdit } from '@/api/userManagement/addEquipmentManagement'
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
                equipmentConfigEdit(this.formInline).then(res => {
                  this.$Message.success('成功')
                  this.$emit('submitState', true)
                }).catch(err => {
                  this.$Message.error(err)
                  this.$emit('submitState', false)
                })
              } else {
                equipmentConfigAdd(this.formInline).then(res => {
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
        console.log(e)
        this.formInline = e
      }
    },
    mounted () {
      //
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
