  <style lang="less">
    @import './login.less';
  </style>
  <template>
    <div class="login" @keydown.enter="handleLogin">
      <div class="logo-location">
        <img src="http://qiniu-hr-landa.lz-cc.com/1557826353278.png" style="height: 85px; margin-right: 15px">
        <div class="logo-img">
          <img src="http://qiniu-hr-landa.lz-cc.com/1557826400942.png">
          <img src="http://qiniu-hr-landa.lz-cc.com/1557826268246.png">
        </div>
      </div>

      <div class="login-con">
        <div class="form-con">
          <div class="form-coment">
            <login-form @on-success-valid="handleSubmit" ref="loginFormRef" style="margin-top: 16px; width: 250px"></login-form>
          </div>
          <div class="register">
            <div class="register-cut">
              <span @click="checkIn" style="color: #eb6c27">工地入住</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
<script>
import loginForm from '_c/login-form'
import { mapActions } from 'vuex'
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      carValue: 0,
      value: false
    }
  },
  components: {
    loginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$Message.success('欢迎登陆')
          this.$refs.loginFormRef.log_loading = false
          this.$router.push({
            name: 'home'
          })
        })
      }).catch(err => {
        this.$refs.loginFormRef.log_loading = false
        this.$Message.error(err)
      })
    },
    // 工地入住
    checkIn () {
      this.$router.push({
        name: 'checkIn'
      })
    },
    // 忘记密码
    passwordForget () {
      this.$router.push({
        name: 'passwordForget'
      })
    }
  },
  mounted () {
    this.$Notice.destroy()
  }
}
</script>

  <style>

  </style>
