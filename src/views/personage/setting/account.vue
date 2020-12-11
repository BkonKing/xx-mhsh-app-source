<template>
  <div class="tf-bg-white">
    <van-nav-bar :fixed="true" :border="false" placeholder left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="page-container">
      <div class="tf-h3">切换账户登录</div>
      <div
        class="account"
        v-for="(item, i) in accountList"
        :key="i"
        :class="{'account-active': active.id === item.id}"
        @click="switchAccount(item)"
      >
        <img v-if="item.avatar" class="user-avatar" :src="item.avatar"/>
        <img v-else class="user-avatar" src="@/assets/imgs/touxiang.png"/>
        <div class="tf-space-around">
          <div class="user-name">{{item.nickname}}</div>
          <div class="tf-text-grey">{{item.mobile}}</div>
        </div>
        <template v-if="active.id === item.id">
          <div class="checked-tag"></div>
          <div class="tf-icon tf-icon-gou"></div>
        </template>
      </div>
      <van-button class="account-btn" type="danger" @click="login">换个账户登录</van-button>
    </div>
  </div>
</template>

<script>
import { NavBar, Button, Toast } from 'vant'
import { mapGetters } from 'vuex'
import { bindAliasAndTags } from '@/utils/ajpush'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button
  },
  data () {
    return {
      active: {},
      accountList: {}
    }
  },
  created () {
    const userList =
      api.getPrefs({
        key: 'user_list',
        sync: true
      }) || {}
    this.accountList = typeof userList === 'string' ? JSON.parse(userList) : userList
    this.active = this.accountList[this.userInfo.id]
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    /* 切换账号 */
    switchAccount (item) {
      Toast.loading('正在切换')
      let tokenList = api.getPrefs({
        key: 'token_list',
        sync: true
      })
      tokenList = typeof tokenList === 'string' ? JSON.parse(tokenList) : tokenList
      api.setPrefs({
        key: 'access_token',
        value: tokenList[item.id]
      })
      this.$store.dispatch('getMyAccount').then(async () => {
        Toast.clear()
        if (process.env.VUE_APP_IS_APP === '1') {
          bindAliasAndTags(this.userInfo.id)
        }
        await this.$store.dispatch('getHouse')
        this.$router.replace('/')
        this.mtjEvent({
          eventId: 79
        })
      }).catch(() => {
        Toast.clear()
      })
    },
    /* 账号登录 */
    login () {
      this.$router.push('/login?status=1')
    }
  }
}
</script>

<style lang="less" scoped>
.page-container {
  padding: 0 50px 50px;
}

.tf-h3 {
  margin: 80px 0;
}

.account {
  @flex();
  width: 650px;
  height: 180px;
  padding: 30px;
  border: 1px solid #aaa;
  border-radius: 10px;
  margin-bottom: 30px;
}

.account-active {
  @relative();
  border: 3px solid @red-dark;
}

.user-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-right: @padding-md;
}

.user-name {
  font-size: 34px;
  font-weight: 500;
  color: @text-color;
}

.tf-text-grey {
  font-size: 30px;
}
.account-btn {
  width: 90%;
  margin: 80px 5% 0;
}
.checked-tag {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 0px;
  height: 0px;
  border-width: 44px;
  border-width: 0;
  border-width: 0;
  border-width: 44px;
  border-style: solid;
  border-top-color: transparent;
  border-right-color: @red-dark;
  border-bottom-color: @red-dark;
  border-left-color: transparent;
}
.tf-icon-gou {
  position: absolute;
  right: 2px;
  bottom: -4px;
  z-index: 1;
  color: #fff;
  font-size: 50px;
}
</style>
