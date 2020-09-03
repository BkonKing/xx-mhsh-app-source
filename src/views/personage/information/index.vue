<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="我的资料"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goback"
    ></van-nav-bar>
    <van-tabs class="tf-body-container" v-model="current">
      <van-tab title="基础信息">
        <tf-list class="basics-list">
          <van-uploader :after-read="afterRead" style="width: 100%;">
            <tf-list-item border title="头像">
              <template v-slot:right>
                <img v-if="avatar" class="tf-avatar-m" :src="avatar" />
                <img v-else class="tf-avatar-m" src="@/assets/imgs/touxiang.png" />
              </template>
            </tf-list-item>
          </van-uploader>
          <tf-list-item border title="昵称" :showArrow="false">
            <template v-slot:right>
              <input v-model="nickname" class="tf-input" @change="setNickname" maxlength="15" />
            </template>
          </tf-list-item>
          <tf-list-item border title="性别">
            <template v-slot:right>
              <tf-picker
                v-model="gender"
                title="性别"
                value-key="label"
                selected-key="value"
                :columns="sexArray"
                @confirm="setSex"
              >
                <template v-slot="{valueText}">
                  <div class="tf-text">{{valueText}}</div>
                </template>
              </tf-picker>
            </template>
          </tf-list-item>
          <tf-list-item title="生日">
            <template v-slot:right>
              <tf-date-time-picker
                class="tf-date-time-picker"
                v-model="birthday"
                type="date"
                title="生日"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="setBirthday"
              >
                <template>
                  <div class="tf-text text-right">{{birthday || '选择日期'}}</div>
                </template>
              </tf-date-time-picker>
            </template>
          </tf-list-item>
        </tf-list>
        <tf-list class="basics-list">
          <tf-list-item border title="姓名" :showArrow="false">
            <template v-slot:right>
              <input v-model="realname" class="tf-input" @change="setRealname" />
            </template>
          </tf-list-item>
          <tf-list-item border title="手机号" :rightText="mobile" @click="jumpPhone"></tf-list-item>
          <tf-list-item
            title="收货地址"
            :rightText="userInfo.address_name"
            rightWidth="460px"
            @click="goAddress"
          ></tf-list-item>
        </tf-list>
        <tf-list class="basics-list">
          <!-- <van-uploader :after-read="cjFace" style="width: 100%;"> -->
          <tf-list-item title="人脸采集" @click="faceDialog = true"></tf-list-item>
          <!-- </van-uploader> -->
        </tf-list>
        <tf-list class="basics-list">
          <tf-list-item
            border
            :title="`${userInfo.is_setpaypassword ? '修改' : '设置'}支付密码`"
            @click="editPaymentCode"
          ></tf-list-item>
          <tf-list-item
            :title="`${userInfo.is_setpassword ? '修改' : '设置'}登录密码`"
            @click="editLoginPassword"
          ></tf-list-item>
        </tf-list>
      </van-tab>
      <van-tab v-if="userType != 0 && currentProject" title="房产信息">
        <house
          ref="house"
          @manClick="toHouseMember"
          @change="(bindingId) => goAttestation(1,1,bindingId)"
        ></house>
      </van-tab>
      <van-tab v-if="userType != 0 && currentProject" title="成员信息">
        <van-dropdown-menu class="tf-mb-lg" @change="getMemberList">
          <van-dropdown-item v-model="value" :options="list" />
        </van-dropdown-menu>
        <div
          class="tf-card tf-mb-lg"
          v-for="(item, i) in memberList"
          :key="i"
          @click="goAttestation(0, 1, item.id, item)"
        >
          <div class="tf-card-header">{{item.project_name}} {{item.fc_info}}</div>
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
            <div class="tf-mr-lg">{{gender | sexText}}</div>
            <div>{{item.mobile}}</div>
          </div>
        </div>
        <div class="btn-placeholder">
          <button class="tf-btn tf-btn-primary" type="warn" @click="addMember">新增成员</button>
        </div>
      </van-tab>
    </van-tabs>
    <tf-dialog class="explain-dialog" v-model="faceDialog" title="请上传一张清晰的人脸照片" :showFotter="false">
      <van-uploader :after-read="cjFace" style="width: 100%;">
        <van-button type="danger" style="width: 100%;">确定</van-button>
      </van-uploader>
    </tf-dialog>
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
  Toast,
  uploader,
  Field,
  Button
} from 'vant'
import tfList from '@/components/tf-list/index.vue'
import tfListItem from '@/components/tf-list/item.vue'
import tfPicker from '@/components/tf-picker/index'
import tfDateTimePicker from '@/components/tf-date-time-picker/index'
import tfDialog from '@/components/tf-dialog/index.vue'
import house from '../house/components/house'
import { uImages } from '@/api/user'
import { mapGetters } from 'vuex'
import { getDate } from '@/utils/util'
import eventBus from '@/api/eventbus.js'
import {
  getMemberList,
  yzHouse,
  editAvatar,
  editNickname,
  editGender,
  editBirthday,
  editRealname,
  cjFace
} from '@/api/personage'
export default {
  name: 'informationIndex',
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [uploader.name]: uploader,
    [Button.name]: Button,
    [Tag.name]: Tag,
    [Field.name]: Field,
    tfDateTimePicker,
    tfList,
    tfListItem,
    tfPicker,
    house,
    tfDialog
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
      birthday: '',
      faceDialog: false,
      maxDate: new Date(getDate()),
      minDate: new Date('1900/1/1'),
      memberList: [], // 成员列表
      houseRoleColor: {
        1: 'danger',
        2: 'warning',
        3: 'primary',
        4: 'primary'
      },
      sexArray: [
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '2'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userType', 'currentProject'])
  },
  mounted () {
    eventBus.$on(
      'chooseAddress',
      function (data) {
        this.addressInfo = JSON.parse(data)
        this.address_id = this.addressInfo.id
        console.log(this.addressInfo)
      }.bind(this)
    )
  },
  created () {
    eventBus.$off('chooseAddress')
  },
  activated () {
    if (this.current === 0) {
      this.getMyAccount()
    } else if (this.current === 1) {
      this.$refs.house.reload()
    } else if (this.current === 2) {
      this.yzHouse(1)
      this.getMemberList()
    }
  },
  methods: {
    /* 获取用户信息 */
    async getMyAccount () {
      await this.$store.dispatch('getMyAccount')
      const {
        realname,
        gender,
        avatar,
        mobile,
        nickname,
        birthday
      } = this.userInfo
      this.realname = realname
      this.nickname = nickname
      this.gender = gender
      this.avatar = avatar
      this.mobile = mobile
      this.birthday = birthday || ''
    },
    /* 图片上传 */
    afterRead (file) {
      Toast.loading({
        message: '头像上传中'
      })
      const formData = new FormData()
      formData.append('imgFile', file.file)
      uImages(formData)
        .then((res) => {
          this.avatar = res.data
          this.editAvatar()
        })
        .catch((message) => {
          Toast.clear()
          Toast.fail(message)
        })
    },
    /* 头像上传 */
    editAvatar () {
      editAvatar({
        avatar: this.avatar
      })
        .then((res) => {
          Toast.clear()
          Toast.success('头像上传成功')
        })
        .catch(() => {
          Toast.clear()
        })
    },
    /* 设置昵称 */
    setNickname () {
      editNickname({
        nickname: this.nickname
      }).then((res) => {
        Toast.success('昵称设置成功')
      })
    },
    /* 设置性别 */
    setSex () {
      editGender({
        gender: this.gender
      }).then((res) => {
        Toast.success('性别设置成功')
      })
    },
    /* 设置生日 */
    setBirthday () {
      editBirthday({
        birthday: this.birthday
      }).then((res) => {
        Toast.success('生日设置成功')
      })
    },
    /* 设置姓名 */
    setRealname () {
      editRealname({
        realname: this.realname
      }).then((res) => {
        Toast.success('姓名设置成功')
      })
    },
    /* 获取业主房产信息 */
    yzHouse (type) {
      // type: 0 - 默认选中第一个， 1 - 保持当前状态
      yzHouse().then((res) => {
        const allItem = {
          text: '全部',
          value: undefined
        }
        let data = res.data || []
        data = data.map((obj) => {
          const { project_name, fc_info, members, house_id } = obj
          return {
            text: `${project_name}${fc_info}(${members})`,
            value: house_id
          }
        })
        data.unshift(allItem)
        this.list = data
        if (!type) {
          this.value = res.data[0].house_id
        }
      })
    },
    /* 获取成员列表 */
    getMemberList () {
      getMemberList({
        house_id: this.value
      }).then((res) => {
        this.memberList = res.data
      })
    },
    /* 添加成员 */
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
    /**
     * 房屋认证（成员添加修改）
     * @param {number} type 页面类型  0：成员 1：房屋
     * @param {number} mode 模式类型  0：新增 1：修改
     * @param {string} id 当前选中房屋或成员id
     * @param {object} info 当前选中房屋或成员所有信息
     */
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
    /* 跳转收货地址 */
    goAddress () {
      this.$router.push({
        path: '/address/list',
        query: {
          isSelect: 1
        }
      })
      // this.$router.push('/pages/personage/information/address')
    },
    /* 跳转手机验证 */
    jumpPhone () {
      this.$router.push('/pages/personage/information/phone')
    },
    /* 跳转支付密码设置修改  */
    editPaymentCode () {
      this.$router.push({
        path: '/pages/personage/information/payment-code',
        query: {
          status: this.userInfo.is_setpaypassword
        }
      })
    },
    /* 跳转登录密码设置修改 */
    editLoginPassword () {
      this.$router.push({
        path: '/pages/personage/information/login-password',
        query: {
          status: this.userInfo.is_setpassword
        }
      })
    },
    // 人脸采集
    cjFace (file) {
      Toast.loading({
        message: '人脸图片上传中'
      })
      const formData = new FormData()
      formData.append('imgFile', file.file)
      uImages(formData)
        .then((res) => {
          cjFace({
            face_url: res.data
          }).then((res) => {
            Toast.clear()
            Toast.success(res.message)
            this.faceDialog = false
          }).catch((message) => {
            Toast.clear()
            Toast.fail(message)
          })
        })
        .catch((message) => {
          Toast.clear()
          Toast.fail(message)
        })
    },
    /* 跳转房产成员信息 */
    toHouseMember (info) {
      this.value = info.house_id
      this.current = 2
    },
    goback () {
      this.$router.go(-1)
      // this.$router.replace('/personage')
    }
  },
  watch: {
    value (value) {
      this.getMemberList()
    },
    current (val) {
      if (val === 2) {
        !this.list.length && this.yzHouse()
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    const names = ['settingIndex', 'personage']
    if (names.includes(to.name)) {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.tf-body-container {
  @flex-column();
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .van-tab__pane {
      height: 100%;
      padding: 20px;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
}

/deep/ .van-uploader__input-wrapper {
  display: flex;
  align-items: center;
  flex: 1;
}

.basics-list {
  background-color: #fff;
  border-radius: 8px;
}

.btn-placeholder {
  margin-bottom: env(safe-area-inset-bottom);
  margin-bottom: constant(safe-area-inset-bottom);
}

.basics-list + .basics-list {
  margin-top: 30px;
}

.tab-content {
  width: 750px;
  position: fixed;
  top: 196px;
  bottom: 128px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
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

.tf-picker,
.tf-date-time-picker {
  width: 100%;
  text-align: right;
}

/deep/ .tf-clist-cell-left {
  width: 240px;
  flex: initial;
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
  height: 88px;
}
/deep/ .van-cell--clickable:active {
  background: @gray-3;
}
.tf-input {
  flex: 1;
  font-size: 30px;
  text-align: right;
}
</style>
