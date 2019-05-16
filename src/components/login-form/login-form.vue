<template>
  <Form ref="loginForm" :model="form" :rules="rules">
    <div style="margin-bottom: 10px; font-size: 20px">欢迎登录！</div>
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon type="ios-contact" :size="16"/>
        </span>
      </Input>
      <!--<Select v-model="form.userName">-->
        <!--<Option v-for="(item, index) in modelSelect" :key="index" :value="item">{{item}}</Option>-->
      <!--</Select>-->
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon type="md-lock" :size="16"/>
        </span>
      </Input>
    </FormItem>
    <FormItem style="margin-bottom: 0">
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'loginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        password: ''
      },
      // modelSelect: ['工行定西市分行', '工行安定区支行', '工行陇西县支行', '工行临洮县支行', '工行岷县支行', '工行通渭县支行', '工行渭源县支行', '工行漳县支行']
      modelSelect: ['定西市人社局', '安定区人社局', '渭源县人社局', '通渭县人社局', '临洮县人社局', '岷县人社局', '陇西县人社局', '漳县人社局']
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>
