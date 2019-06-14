<template>
  <!-- 添加数据 -->
  <div>
    <Form ref="formValidate" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="rotationTitle" label="轮播图标题">
        <Input v-model="formInline.rotationTitle" placeholder="轮播图标题" style="width: 250px" />
      </FormItem>
      <FormItem prop="rotationUrl" label="轮播图访问链接">
        <Input v-model="formInline.rotationUrl" placeholder="轮播图访问链接" style="width: 250px" />
      </FormItem>
      <FormItem prop="rotationAddress" label="轮播图图片地址">
        <Input v-model="formInline.rotationAddress" placeholder="轮播图图片地址" style="width: 250px" />
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import { addRotation, updateRotation } from '@/api/userManagement/slideshow'
  export default {
    components: {

    },
    data () {
      return {
        formInline: {
          rotationTitle: '',
          rotationUrl: '',
          rotationAddress: ''
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
                updateRotation(this.formInline).then(res => {
                  this.$Message.success('成功')
                  this.$emit('submitState', true)
                }).catch(err => {
                  this.$Message.error(err)
                  this.$emit('submitState', false)
                })
              } else {
                addRotation(this.formInline).then(res => {
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
