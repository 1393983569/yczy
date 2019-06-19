<template>
  <Form ref="loginForm" :model="form" :rules="rules">
    <!--<div style="margin-bottom: 10px; font-size: 20px">欢迎登录！</div>-->
    <div style="margin-bottom: 24px" v-if="clientSide">
      <siteSelect @changeCascader="changeCascader" v-model="siteId" :width="'300px'"></siteSelect>
    </div>
    <FormItem prop="userName">
      <Input v-model="form.userName" v-if="!clientSide" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon type="ios-contact" :size="16"/>
        </span>
      </Input>
      <Select v-model="form.userName" v-if="clientSide">
        <Option v-for="(item, index) in modelSelect" :key="index" :value="item.id">{{item.accountName}}</Option>
      </Select>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" @keyup.enter.native="handleSubmit" placeholder="请输入密码">
        <span slot="prepend">
          <Icon type="md-lock" :size="16"/>
        </span>
      </Input>
    </FormItem>
    <FormItem style="margin-bottom: 0">
      <Button @click="handleSubmit" style="background-color: #44abf0; border: solid 1px #4095d6;" type="primary" :loading="log_loading" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import siteSelect from ".././siteSelectCity/siteSelect"
import { adminQuery } from '@/api/public'
export default {
  name: 'loginForm',
  components:{
    siteSelect
  },
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
      // modelSelect: ['定西市人社局', '安定区人社局', '渭源县人社局', '通渭县人社局', '临洮县人社局', '岷县人社局', '陇西县人社局', '漳县人社局'],
      modelSelect: [],
      log_loading: false,
      siteId: [],
      clientSide: false, // 如果为false为施工
      accountType: 2 //  1超管 2 施工 3银行 4 人设
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
      this.log_loading = true
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password
          })
        } else {
          this.log_loading = false
        }
      })
    },
    changeCascader (e) {
      this.modelSelect = []
      adminQuery(e[0], e[1], this.accountType).then(res => {
        this.modelSelect = []
        this.modelSelect.push(...res.info)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
