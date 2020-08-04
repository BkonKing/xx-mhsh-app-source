<template>
  <div class="tf-bg tf-screen">
    <van-nav-bar title="我的资料" :fixed="true" :border="false" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="tf-main-container">
      <van-tabs v-model="current">
        <van-tab v-for="(item, i) in items" :key="i" @click="onClickItem" :title="item"></van-tab>
      </van-tabs>
      <div class="tf-padding-base tab-content">
        <template v-if="current === 0">
          <tf-list style="background-color: #fff;border-radius: 8px;margin-bottom: 30px;">
            <tf-list-item border title="头像">
              <template v-slot:right>
                <img class="tf-avatar-m tf-mr-base" src="/static/logo.png" mode="widthFix" />
              </template>
            </tf-list-item>
            <tf-list-item border title="昵称" rightText="这是一个默认昵称" :showArrow="false"></tf-list-item>
            <tf-list-item border title="性别" rightText></tf-list-item>
            <tf-list-item title="生日" rightText="1990-01-01"></tf-list-item>
          </tf-list>
          <tf-list style="background-color: #fff;border-radius: 8px;margin-bottom: 30px;">
            <tf-list-item border title="姓名" rightText="张三" :showArrow="false"></tf-list-item>
            <tf-list-item border title="手机号" rightText="1555555555" @click="jumpPhone"></tf-list-item>
            <tf-list-item
              title="收货地址"
              rightText="福建省省福建省福建省福建省福建省省福建省福建省福建省福建省省福建省福建省福建省福建省省福建省福建省福建省"
              rightWidth="460px"
              @click="goAddress"
            ></tf-list-item>
          </tf-list>
          <tf-list style="background-color: #fff;border-radius: 8px;margin-bottom: 30px;">
            <tf-list-item title="人脸采集"></tf-list-item>
          </tf-list>
          <tf-list style="background-color: #fff;border-radius: 8px;">
            <tf-list-item
              border
              :title="`${payCodeStatus ? '修改' : '设置'}支付密码`"
              @click="editPaymentCode"
            ></tf-list-item>
            <tf-list-item :title="`${passwordStatus ? '修改' : '设置'}登录密码`" @click="editLoginPassword"></tf-list-item>
          </tf-list>
        </template>
        <template v-if="current === 1">
          <div class="house-owner house-box">
            <div class="tf-row-center">
              <div class="house-owner-current">当前房产</div>
            </div>
            <div class="tf-row-space-between">
              <div class="tf-row">
                <div class="house-user house-user--owner">业主业主</div>
                <div class="tf-space-around">
                  <div class="house-name">XXXX美好生活家园</div>
                  <div class="house-address">5栋1单元1001</div>
                </div>
              </div>
              <div class="tf-row-vertical-center house-people-box">
                <div class="tf-icon tf-icon-team"></div>
                <div class="house-people-number">4</div>
              </div>
            </div>
          </div>
          <div class="house-box tf-row">
            <div class="house-user house-user--relation">业主业主</div>
            <div class="tf-space-around">
              <div class="house-name">XXXX美好生活家园</div>
              <div class="house-address">5栋1单元1001</div>
            </div>
          </div>
          <div class="house-box tf-row">
            <div class="house-user house-user--tenant">业主业主</div>
            <div class="tf-space-around">
              <div class="house-name">XXXX美好生活家园</div>
              <div class="house-address">5栋1单元1001</div>
            </div>
          </div>
          <div class="house-box tf-row">
            <div class="house-user house-user--relation">业主业主</div>
            <div class="tf-space-around">
              <div class="house-name">XXXX美好生活家园</div>
              <div class="house-address">5栋1单元1001</div>
            </div>
          </div>
          <button class="tf-btn tf-btn-primary" type="warn" @click="addHouse">新增房产</button>
        </template>
        <template v-if="current === 2">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value" :options="list" />
          </van-dropdown-menu>
          <div class="tf-card tf-mt-base">
            <div class="tf-card-header">XXXX美好生活家园 5栋1单元1002</div>
            <div class="tf-card-content">
              <van-tag
                class="user-role tf-mr-base"
                plain
                type="danger"
                :inverted="true"
                size="small"
              >业主</van-tag>
              <div>哈哈哈</div>
              <div class="tf-mr-base">(本人)</div>
              <div class="tf-mr-base">女</div>
              <div>12312312312</div>
            </div>
          </div>
          <button class="tf-btn tf-btn-primary" type="warn" @click="addHouse">新增成员</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs, DropdownMenu, DropdownItem, Tag } from 'vant'
import tfList from '@/components/tf-list/index.vue'
import tfListItem from '@/components/tf-list/item.vue'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Tag.name]: Tag,
    tfList,
    tfListItem
  },
  data () {
    return {
      items: ['基础信息', '房产信息', '成员信息'],
      current: 0,
      value: 0,
      list: [
        {
          text: 'item1',
          value: 0
        },
        {
          text: 'item2',
          value: 1
        },
        {
          text: 'item3',
          value: 2
        }
      ],
      payCodeStatus: 1, // 0为未设置过，1我设置过
      passwordStatus: 0 // 0为未设置过，1我设置过
    }
  },
  methods: {
    onClickItem (e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex
      }
    },
    addHouse () {
      this.$router.replace('/pages/personage/house/attestation')
    },
    goAddress () {
      this.$router.push('/pages/personage/information/address')
    },
    jumpPhone () {
      this.$router.push('/pages/personage/information/phone')
    },
    editPaymentCode () {
      this.$router.push({
        path: '/pages/personage/information/payment-code',
        query: {
          status: this.payCodeStatus
        }
      })
    },
    editLoginPassword () {
      this.$router.push({
        path: '/pages/personage/information/login-password',
        query: {
          status: this.passwordStatus
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.house-owner {
  border-width: 3px;
  border-style: solid;
  border-color: @red-dark;
  padding-top: 0 !important;
}

.house-owner-current {
  position: relative;
  width: 194px;
  height: 40px;
  line-height: 40px;
  background: @red-dark;
  font-size: 20px;
  color: #fff;
  text-align: center;
  margin-bottom: @padding-md;
}

.house-user {
  @flex();
  width: 88px;
  padding: 0 20px;
  height: 88px;
  text-align: center;
  align-items: center;
  color: #fff;
  font-size: 24px;
  margin-right: @padding-md;
}

.house-user--owner {
  background-image: linear-gradient(to top left, #eb5841, #f9866b);
}

.house-user--relation {
  background-image: linear-gradient(to top left, #ffc017, #ffa110);
}

.house-user--tenant {
  background-image: linear-gradient(to top left, #45d5da, #31b4b9);
}

.house-name {
  font-size: 30px;
  color: @text-color;
}

.house-address {
  font-size: 30px;
  color: @gray-7;
}

.house-box {
  background-color: #fff;
  border-radius: 8px;
  padding: 40px 30px;
  margin-bottom: @padding-lg;
}
.house-people-box {
  padding: 0 40px;
  border-left-width: 1px;
  border-left-style: dashed;
  border-left-color: #aaa;
}
.house-people-number {
  font-size: 30px;
  color: #383838;
  margin-left: 20px;
}
.tab-content {
  width: 750px;
  position: fixed;
  top: 196px;
  bottom: 128px;
}
.tf-btn {
  width: 710px;
  position: fixed;
  bottom: 20px;
}
.tf-card-header {
  font-size: 24px;
  color: @gray-7;
}
.tf-card-content {
  @flex();
  align-items: center;
}
.tf-icon-team {
  font-size: 36px;
}
/deep/ .van-dropdown-menu__bar {
  border-radius: 33px;
}
/deep/ .van-dropdown-menu__title:after {
  margin-top: -10px;
  border-width: 8px;
  border-color: transparent transparent #aaa #aaa;
}
/deep/ .van-dropdown-item__option {
  height: 66px;
}
/deep/ .van-cell--clickable:active {
  background: @gray-3;
}
</style>
