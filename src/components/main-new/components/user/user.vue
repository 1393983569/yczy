<template>
  <div class="user-avator-dropdown">
    <!--<Dropdown @on-click="handleClick">-->
      <!--&lt;!&ndash;<Badge :dot="!!messageUnreadCount">&ndash;&gt;-->
        <!--<Avatar :src="userAvator"/>-->
      <!--&lt;!&ndash;</Badge>&ndash;&gt;-->
      <!--<Icon color="#002a19" :size="18" type="md-arrow-dropdown"></Icon>-->
      <!--<DropdownMenu slot="list">-->
        <!--&lt;!&ndash;<DropdownItem name="message">&ndash;&gt;-->
          <!--&lt;!&ndash;消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>&ndash;&gt;-->
        <!--&lt;!&ndash;</DropdownItem>&ndash;&gt;-->
        <!--<DropdownItem name="logout">退出登录</DropdownItem>-->
      <!--</DropdownMenu>-->
    <!--</Dropdown>-->
    <span style="font-size: 30px; display: inline-block; margin-right: 50px;">{{name}}</span>
    <i class="iconfont icontuichu2"  style="font-size: 30px;position: relative; top: 2px;cursor: pointer; float: right;"  @click="handleClick" ></i>
    <!-- <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-xxx"></use>
    </svg> -->
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
export default {
  name: 'User',
  data() {
    return {
      name: this.$store.state.user.shopName
    }
  },
  props: {
    userAvator: {
      type: String,
      default: ''
    },
//    messageUnreadCount: {
//      type: Number,
//      default: 0
//    }
  },
  methods: {
    // 退出登录
    ...mapActions([
      'handleLogOut'
    ]),
    logout () {
      this.handleLogOut().then(() => {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
        this.$router.push({
          name: 'login'
        })
      })
    },
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    handleClick (name) {
      this.logout()
      // switch (name) {
      //   case 'logout': this.logout()
      //     break
      //   case 'message': this.message()
      //     break
      // }
    }
  }
}
</script>
