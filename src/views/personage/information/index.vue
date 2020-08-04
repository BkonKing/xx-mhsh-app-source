<template>
  <div class="tf-bg tf-screen">
    <van-nav-bar title="我的资料" :fixed="true" :border="false" left-arrow @click-left="goback"></van-nav-bar>
    <div class="tf-main-container">
      <van-tabs v-model="current">
        <van-tab v-for="(item, i) in items" :key="i" @click="onClickItem" :title="item"></van-tab>
      </van-tabs>
      <div class="tf-padding-base tab-content" :style="{'bottom': current !== 2 ? '0' : ''}">
        <template v-if="current === 0">
          <tf-list style="background-color: #fff;border-radius: 8px;margin-bottom: 30px;">
            <tf-list-item border title="头像">
              <template v-slot:right>
                <img class="tf-avatar-m tf-mr-base" :src="avatar" />
              </template>
            </tf-list-item>
            <tf-list-item border title="昵称" :rightText="nicknameText" :showArrow="false"></tf-list-item>
            <tf-list-item border title="性别" :rightText="gender === '1' ? '男' : '女'"></tf-list-item>
            <tf-list-item title="生日" rightText="1990-01-01"></tf-list-item>
          </tf-list>
          <tf-list style="background-color: #fff;border-radius: 8px;margin-bottom: 30px;">
            <tf-list-item border title="姓名" :rightText="realname" :showArrow="false"></tf-list-item>
            <tf-list-item border title="手机号" :rightText="mobile" @click="jumpPhone"></tf-list-item>
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
          <house @manClick="current = 2" @change="(id) => goAttestation(1,1,id)"></house>
        </template>
        <template v-if="current === 2">
          <van-dropdown-menu @change="getMemberList">
            <van-dropdown-item v-model="value" :options="list" />
          </van-dropdown-menu>
          <div class="tf-card tf-mt-base" v-for="(item, i) in memberList" :key="i" @click="goAttestation(0, 1, item.id, item)">
            <div class="tf-card-header">XXXX美好生活家园 5栋1单元1002</div>
            <div class="tf-card-content">
              <van-tag
                class="user-role tf-mr-lg"
                plain
                :type="houseRoleColor[item.house_role]"
                :inverted="true"
                size="small"
              >{{houseRoleText[item.house_role]}}</van-tag>
              <div class="tf-mr-lg">
                {{item.realname}}
                <span
                  v-if="item.house_role === '1'"
                  class="tf-text-grey tf-text-sm"
                >(本人)</span>
              </div>
              <div class="tf-mr-lg">女</div>
              <div>{{mobile}}</div>
            </div>
          </div>
          <button class="tf-btn tf-btn-primary" type="warn" @click="addMember">新增成员</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {
  NavBar,
  Tab,
  Tabs,
  DropdownMenu,
  DropdownItem,
  Tag,
  Dialog,
  Toast
} from 'vant'
import tfList from '@/components/tf-list/index.vue'
import tfListItem from '@/components/tf-list/item.vue'
import house from '../house/components/house'
import { mapGetters } from 'vuex'
import { getMemberList } from '@/api/personage'
export default {
  name: 'informationIndex',
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Tag.name]: Tag,
    tfList,
    tfListItem,
    house
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
      realname: '',
      gender: '',
      avatar: '',
      mobile: '',
      nickname: '',
      payCodeStatus: 1, // 0为未设置过，1我设置过
      passwordStatus: 1, // 0为未设置过，1我设置过
      memberList: [], // 成员列表
      houseRoleText: {
        1: '业主',
        2: '业主成员',
        3: '租户',
        4: '租户成员'
      },
      houseRoleColor: {
        1: 'danger',
        2: 'warning',
        3: 'primary',
        4: 'primary'
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    nicknameText () {
      return this.nickname
        ? this.nickname
        : this.mobile.substr(0, 3) + '****' + this.mobile.substr(7)
    }
  },
  created () {
    const { realname, gender, avatar, mobile } = this.userInfo
    this.realname = realname
    this.gender = gender
    this.avatar = avatar
    this.mobile = mobile
    this.getMemberList()
  },
  methods: {
    onClickItem (e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex
      }
    },
    /* 获取成员列表 */
    getMemberList () {
      getMemberList({
        HouseId: this.value
      }).then((res) => {
        this.memberList = res.data
      })
    },
    addMember () {
      if (this.memberList.length >= 10) {
        Toast('一个房产最多只能绑定10个人（包括业主），超过只能解除后再添加')
        // Dialog.alert({
        //   title: '一个房产最多只能绑定10个人（包括业主），超过只能解除后再添加'
        // })
      } else {
        this.goAttestation(0, 0)
      }
    },
    goAttestation (type, mode, id, info) {
      this.$router.push({
        path: '/pages/personage/house/attestation',
        query: {
          type,
          mode,
          id,
          info: JSON.stringify(info)
        }
      })
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
    },
    goback () {
      this.$router.replace('/personage')
    }
  }
}
</script>

<style lang="less" scoped>
.tab-content {
  width: 750px;
  position: fixed;
  top: 196px;
  bottom: 128px;
  overflow: auto;
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
