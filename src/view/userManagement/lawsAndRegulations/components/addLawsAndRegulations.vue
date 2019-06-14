<template>
  <!-- 添加数据 -->
  <div>
    <Form ref="formValidate" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="lawTitle" label="法律法规标题">
        <Input v-model="formInline.lawTitle" placeholder="法律法规标题" style="width: 250px" />
      </FormItem>
      <!--<FormItem prop="rotationUrl" label="轮播图访问链接">-->
        <!--<Input v-model="formInline.rotationUrl" placeholder="轮播图访问链接" style="width: 250px" />-->
      <!--</FormItem>-->
      <FormItem prop="lawContent" label="法律法规内容">
        <editor v-model="formInline.lawContent" :showSubmit="false" ref="editorRef"></editor>
        <!--<Input v-model="formInline.rotationAddress" placeholder="轮播图图片地址" style="width: 250px" />-->
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import { addLaw, updateLaw } from '@/api/userManagement/lawsAndRegulations'
  import editor from '_c/editor'
  export default {
    components: {
      editor
    },
    data () {
      return {
        formInline: {
          lawTitle: '',
          lawContent: ''
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
                updateLaw(this.formInline).then(res => {
                  this.$Message.success('成功')
                  this.$emit('submitState', true)
                }).catch(err => {
                  this.$Message.error(err)
                  this.$emit('submitState', false)
                })
              } else {
                addLaw(this.formInline).then(res => {
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
        this.$refs.editorRef.emptyHtml()
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
        console.log(e.lawContent)
        this.formInline = e
      }
    }
  }
</script>

<style scoped>

</style>
