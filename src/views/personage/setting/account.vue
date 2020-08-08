<template>
  <div class="tf-bg-white">
    <van-nav-bar :fixed="true" :border="false" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="tf-h3">切换账户登录</div>
    <div
      class="account"
      v-for="(item, i) in accountList"
      :key="i"
      :class="{'account-active': active.id === item.id}"
      @click="switchAccount(item)"
    >
      <img class="user-avatar" :src="item.avatar" mode="aspectFill" />
      <div class="tf-space-around">
        <div class="user-name">{{item.realname}}</div>
        <div class="tf-text-grey">{{item.mobile}}</div>
      </div>
      <template v-if="active.id === item.id">
        <div class="checked-tag"></div>
        <div class="tf-icon tf-icon-check"></div>
      </template>
    </div>
    <van-button class="account-btn" type="danger" @click="login">换个账户登录</van-button>
  </div>
</template>

<script>
import { NavBar, Button, Toast } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button
  },
  data () {
    return {
      active: {},
      accountList: [
        {
          id: 1,
          avatar: '/static/app-icon.png',
          realname: '这是一个默认昵称',
          mobile: '15022223333'
        }
      ]
    }
  },
  created () {

  },
  methods: {
    /* 切换账号 */
    switchAccount (item) {
      this.active = item
    },
    /* 账号登录 */
    login () {

    }
  }
}
</script>

<style lang="less" scoped>
.tf-bg-white {
  padding: 30px 50px;
  height: 100%;
}

.tf-h3 {
  margin: 168px 0 80px;
}

.account {
  @flex();
  width: 650px;
  height: 180px;
  padding: 30px;
  border: 1px solid #aaa;
  border-radius: 10px;
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
.tf-icon-check {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  color: #fff;
  font-size: 43px;
}
</style>
