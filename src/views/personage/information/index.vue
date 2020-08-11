<template>
  <div class="tf-bg tf-screen">
    <van-nav-bar title="我的资料" :fixed="true" :border="false" left-arrow @click-left="goback"></van-nav-bar>
    <div class="tf-main-container">
      <van-tabs v-model="current">
        <van-tab title="基础信息">
          <div class="tf-padding-base tab-content" style="bottom: 0">
            <tf-list style="background-color: #fff;border-radius: 8px;margin-bottom: 30px;">
              <tf-list-item border title="头像">
                <template v-slot:right>
                  <img class="tf-avatar-m tf-mr-base" :src="avatar" />
                </template>
              </tf-list-item>
              <tf-list-item border title="昵称" :rightText="nicknameText" :showArrow="false"></tf-list-item>
              <tf-list-item border title="性别" :rightText="gender | sexText"></tf-list-item>
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
              <tf-list-item
                :title="`${passwordStatus ? '修改' : '设置'}登录密码`"
                @click="editLoginPassword"
              ></tf-list-item>
            </tf-list>
          </div>
        </van-tab>
        <van-tab v-if="userType != 0" title="房产信息">
          <div class="tf-padding-base tab-content" style="bottom: 0">
            <house @manClick="current = 2" @change="(id) => goAttestation(1,1,id)"></house>
          </div>
        </van-tab>
        <van-tab v-if="userType != 0" title="成员信息">
          <div class="tf-padding-base tab-content" style="bottom: ''">
            <van-dropdown-menu @change="getMemberList">
              <van-dropdown-item v-model="value" :options="list" />
            </van-dropdown-menu>
            <div
              class="tf-card tf-mt-base"
              v-for="(item, i) in memberList"
              :key="i"
              @click="goAttestation(0, 1, item.id, item)"
            >
              <div class="tf-card-header">XXXX美好生活家园 5栋1单元1002</div>
              <div class="tf-card-content">
                <van-tag
                  class="user-role tf-mr-lg"
                  plain
                  :type="houseRoleColor[item.house_role]"
                  :inverted="true"
                  size="small"
                >{{item.house_role | houseRoleText}}</van-tag>
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
          </div>
        </van-tab>
      </van-tabs>
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
import { getMemberList, yzHouse } from '@/api/personage'
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
      current: 0,
      value: 0,
      list: [],
      realname: '',
      gender: '',
      avatar: '',
      mobile: '',
      nickname: '',
      payCodeStatus: 1, // 0为未设置过，1我设置过
      passwordStatus: 0, // 0为未设置过，1我设置过
      memberList: [], // 成员列表
      houseRoleColor: {
        1: 'danger',
        2: 'warning',
        3: 'primary',
        4: 'primary'
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userType']),
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
    this.yzHouse()
    // this.getMemberList()
  },
  methods: {
    /* 获取业主房产信息 */
    yzHouse () {
      yzHouse().then((res) => {
        this.list = res.data.map((obj) => {
          const { project_name, fc_info, members, house_id } = obj
          return {
            text: `${project_name}${fc_info}(${members})`,
            value: house_id
          }
        })
        console.log(1)
        this.value = res.data[0].house_id
      })
    },
    /* 获取成员列表 */
    getMemberList () {
      console.log(3)
      getMemberList({
        house_id: this.value
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
  },
  watch: {
    value (value) {
      console.log(2)
      this.getMemberList()
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
  color: #222;
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
