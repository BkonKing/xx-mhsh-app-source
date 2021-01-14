<template>
  <div class="tf-bg tf-body">
    <van-nav-bar title="我的资料"
                 :fixed="true"
                 :border="false"
                 placeholder
                 left-arrow
                 @click-left="goback"></van-nav-bar>
    <van-tabs class="tf-body-container"
              v-model="current">
      <van-tab title="基础信息">
        <!-- <van-uploader :after-read="afterRead" style="width: 100%;"> -->
        <!-- <tf-list-item class="title" border title="头像">
            <template #right>
              <img v-if="avatar" class="tf-avatar-m" :src="avatar" />
              <img
                v-else
                class="tf-avatar-m"
                src="@/assets/imgs/touxiang.png"
              />
            </template>
          </tf-list-item> -->
        <van-cell is-link
                  class="cell"
                  center
                  @click="$router.push('/pages/personage/information/personInfo')">
          <template #title>
            <div class="title">
              <div class="left">
                <img v-if="avatar"
                     class="tf-avatar-m"
                     :src="avatar" />
                <img v-else
                     class="tf-avatar-m"
                     src="@/assets/imgs/touxiang.png" />
              </div>
              <div class="right">
                <div class="l-left">
                  <div class="t1">{{ phone }}</div>
                  <div class="t2">
                    <i v-if="userInfo.gender == 2"
                       class="font_family icon-xingbie nv"></i>
                    <i v-if="userInfo.gender == 1"
                       class="font_family icon-xingbie1 nan"></i>
                    {{ userInfo.birthday }}
                  </div>
                </div>
                <div class="r-left">
                  <div class="name">
                    {{ userInfo.realname }}
                    <i v-if="userInfo.idcard"
                       class="font_family icon-yishiming n1">
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </van-cell>
        <!-- </van-uploader> -->
        <div class="attes">
          <!-- <van-cell class="nameCell"
                    is-link
                    center
                    v-if="userInfo.idcard">
            <template #title>
              <div class="title"
                   @click="toPersonInfo">
                <div class="txt">实名认证</div>
                <div class="name">
                  {{ userInfo.realname }}
                  <i v-if="userInfo.realname"
                     class="font_family icon-yishiming n1">
                  </i>
                  <i v-else
                     class="font_family icon-weishiming n2"></i>
                </div>
              </div>
            </template>
          </van-cell> -->

          <tf-list-item border
                        title="手机号"
                        :rightText="mobile"
                        @click="jumpPhone">
          </tf-list-item>
          <van-cell v-if="userInfo.idcard && userInfo.have_bank_card"
                    class="nameCell"
                    is-link
                    center
                    @click="$router.push('/pages/personage/information/BankCard')">
            <template #title>
              <div class="title">
                <div class="txt">银行卡</div>
                <!-- <div class="name">0000000000000000</div> -->
              </div>
            </template>
          </van-cell>
        </div>
        <!-- <tf-list class="basics-list">
          <tf-list-item
            border
            title="昵称"
            :showArrow="false"
            :IFocusStatus="true"
          >
            <template v-slot:right>
              <input
                v-model="nickname"
                class="tf-input"
                @change="setNickname"
                maxlength="15"
              />
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
        </tf-list> -->
        <tf-list class="basics-list">
          <!-- <tf-list-item
            border
            title="姓名"
            :showArrow="false"
            :IFocusStatus="true"
          >
            <template v-slot:right>
              <input v-model="realname" class="tf-input" @change="setRealname" />
            </template>
          </tf-list-item>
          <tf-list-item
            border
            title="手机号"
            :rightText="mobile"
            @click="jumpPhone"
          ></tf-list-item> -->
          <tf-list-item title="收货地址"
                        rightWidth="460px"
                        @click="goAddress"></tf-list-item>
        </tf-list>
        <tf-list class="basics-list">
          <!-- <van-uploader :after-read="cjFace" style="width: 100%;"> -->
          <!-- <tf-list-item title="人脸采集" @click="faceDialog = true"></tf-list-item> -->
          <tf-list-item title="人脸采集"
                        @click="openCamera"></tf-list-item>
          <!-- </van-uploader> -->
        </tf-list>
        <tf-list class="basics-list">
          <tf-list-item border
                        :title="`${userInfo.is_setpaypassword ? '修改' : '设置'}支付密码`"
                        @click="editPaymentCode"></tf-list-item>
          <tf-list-item :title="`${userInfo.is_setpassword ? '修改' : '设置'}登录密码`"
                        @click="editLoginPassword"></tf-list-item>
        </tf-list>
      </van-tab>
      <van-tab v-if="userType != 0 && currentProject"
               title="房产信息">
        <house ref="house"
               @manClick="toHouseMember"
               @change="(bindingId) => goAttestation(1,1,bindingId)"></house>
      </van-tab>
      <van-tab v-if="userType == 1 && currentProject"
               title="成员信息"
               class="mermber-info">
        <van-dropdown-menu class="tf-mb-lg"
                           @change="getMemberList">
          <van-dropdown-item v-model="selectedHouseId"
                             :options="houselist" />
        </van-dropdown-menu>
        <div class="tf-card tf-mb-lg"
             v-for="(item, i) in memberList"
             :key="i"
             @click="goAttestation(item.house_role === '1' ? 1 : 0, 1, item.id, item)">
          <div class="tf-card-header">{{item.project_name}} {{item.fc_info}}</div>
          <div class="tf-card-content">
            <van-tag class="user-role tf-mr-lg"
                     plain
                     :type="houseRoleColor[item.house_role]"
                     :inverted="true"
                     size="small">{{item.house_role | houseRoleText}}</van-tag>
            <div class="tf-mr-lg">
              {{item.realname}}
              <span v-if="item.house_role === '1'"
                    class="tf-text-grey tf-text-sm">(本人)</span>
            </div>
            <div class="tf-mr-lg">{{item.gender | sexText}}</div>
            <div>{{item.mobile}}</div>
          </div>
        </div>
        <div class="btn-placeholder">
          <button class="tf-btn tf-btn-primary"
                  type="warn"
                  @click="addMember">新增成员</button>
        </div>
      </van-tab>
    </van-tabs>
    <tf-dialog class="explain-dialog"
               v-model="faceDialog"
               title="请上传一张清晰的人脸照片"
               :showFotter="false">
      <van-uploader :after-read="cjFace"
                    style="width: 100%;">
        <van-button type="danger"
                    style="width: 100%;">确定</van-button>
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
  Button,
  Cell
  // CellGroup
} from 'vant'
import tfList from '@/components/tf-list/index.vue'
import tfListItem from '@/components/tf-list/item.vue'
// import tfPicker from '@/components/tf-picker/index'
// import tfDateTimePicker from '@/components/tf-date-time-picker/index'
import tfDialog from '@/components/tf-dialog/index.vue'
import house from '../house/components/house'
import { uImages } from '@/api/user'
import { mapGetters } from 'vuex'
import { getDate, selectFileImage } from '@/utils/util'
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
    // tfDateTimePicker,
    tfList,
    tfListItem,
    // tfPicker,
    house,
    tfDialog,
    [Cell.name]: Cell
  },
  data () {
    return {
      current: 0,
      selectedHouseId: 0,
      houselist: [], // 成员tab，房屋列表
      realname: '',
      gender: '',
      avatar: '',
      mobile: '',
      nickname: '',
      birthday: '',
      faceDialog: false,
      phone: '',
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
        // console.log(this.addressInfo)
      }.bind(this)
    )
  },
  created () {
    this.userType == 1 && this.yzHouse(0)
    eventBus.$off('chooseAddress')
    this.phone =
      this.userInfo.mobile.substr(0, 3) +
      '****' +
      this.userInfo.mobile.substr(7)
  },
  activated () {
    if (this.current === 0) {
      this.getMyAccount()
    } else if (this.current === 1) {
      this.$refs.house.reload()
    } else if (this.current === 2) {
      this.yzHouse(1)
      this.getMemberList()
      this.$refs.house && this.$refs.house.reload()
    }
  },
  methods: {
    //  个人信息
    toPersonInfo () {
      this.$router.push('/pages/personage/information/realNameInfo')
    },
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
    openCamera () {
      this.$router.push({
        name: 'faceCollect'
      })
    },
    /* 图片上传 */
    async afterRead (file) {
      Toast.loading({
        message: '头像上传中'
      })
      const formData = new FormData()
      const newFile = await selectFileImage(file.file)
      formData.append('imgFile', newFile)
      uImages(formData)
        .then(res => {
          this.editAvatar(res.data)
        })
        .catch(message => {
          Toast.clear()
          Toast.fail(message)
        })
    },
    /* 头像上传 */
    editAvatar (avatar) {
      editAvatar({
        avatar
      })
        .then((res) => {
          // Toast.clear()
          Toast.success('头像上传成功')
          this.avatar = avatar
          this.$store.dispatch('getMyAccount')
        })
        .catch(() => {
          Toast.clear()
        })
    },
    /* 设置昵称 */
    setNickname () {
      editNickname({
        nickname: this.nickname
      }).then(res => {
        Toast.success('昵称设置成功')
      })
    },
    /* 设置性别 */
    setSex () {
      editGender({
        gender: this.gender
      }).then(res => {
        Toast.success('性别设置成功')
      })
    },
    /* 设置生日 */
    setBirthday () {
      editBirthday({
        birthday: this.birthday
      }).then(res => {
        Toast.success('生日设置成功')
      })
    },
    /* 设置姓名 */
    setRealname () {
      editRealname({
        realname: this.realname
      }).then(res => {
        Toast.success('姓名设置成功')
      })
    },
    /* 获取业主房产信息 */
    yzHouse (type) {
      // type: 0 - 默认选中第一个， 1 - 保持当前状态
      yzHouse().then((res) => {
        let data = res.data || []
        let num = 0
        data = data.map((obj) => {
          const { project_name, fc_info, members, house_id } = obj
          num += parseInt(members)
          return {
            text: `${project_name}${fc_info}(${members})`,
            value: house_id
          }
        })
        data.unshift({
          text: `全部(${num})`,
          value: ''
        })
        this.houselist = data
        if (!type) {
          this.selectedHouseId = ''
        }
      })
    },
    /* 获取成员列表 */
    getMemberList () {
      getMemberList({
        house_id: this.selectedHouseId
      }).then(res => {
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
      this.$router.push('/address/list')
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
      this.mtjEvent({
        eventId: 75
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
      this.mtjEvent({
        eventId: 76
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
        .catch(message => {
          Toast.clear()
          Toast.fail(message)
        })
    },
    /* 跳转房产成员信息 */
    toHouseMember (info) {
      this.selectedHouseId = info.house_id
      this.current = 2
    },
    goback () {
      this.$router.go(-1)
      // this.$router.replace('/personage')
    }
  },
  watch: {
    selectedHouseId (value) {
      this.getMemberList()
    },
    current (val) {
      if (val === 2) {
        !this.houselist.length && this.yzHouse()
      }
    }
  },
  filters: {
    sexText (value) {
      const text = {
        0: '-',
        1: '男',
        2: '女'
      }
      return text[value]
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
  .cell {
    background-color: #fff;
    margin-bottom: 30px;
    border-radius: 8px;
    height: 140px;
    .title {
      display: flex;
      align-items: center;
      .left {
        margin-right: 36px;
      }
      .right {
        display: flex;

        .l-left {
          margin-right: 20px;
          .t1 {
            font-size: 30px;
            font-weight: 600;
          }
          .t2 {
            font-size: 26px;
            color: #8f8f94;
            .nv {
              font-size: 26px;
              color: #e45487;
            }
            .nan {
              font-size: 26px;
              color: #448fe4;
            }
          }
        }
        .r-left {
          .name {
            color: #666666;
            display: flex;
            align-items: center;
            .n1 {
              margin-left: 10px;
              vertical-align: middle;
              font-size: 33px;
              color: #f77e64;
              margin-top: -2px;
            }
            .n2 {
              margin-left: 10px;
              vertical-align: middle;
              font-size: 33px;
              color: gray;
            }
          }
        }
      }
    }
  }
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

.attes {
  margin-bottom: 30px;
  background-color: #fff;
  padding: 0 30px;
  border-radius: 8px;
  /deep/ .tf-text {
    text-align: left !important;
    margin-left: -50px !important;
    color: #666666;
  }
  .van-cell {
    padding-left: 0px;
    padding-right: 0px;
  }
  .nameCell {
    border-bottom: 1px solid #f0f0f0;
    padding: 20px 0;
    &:last-child {
      border: none;
    }
    .title {
      display: flex;
      align-items: center;
      .txt {
        width: 120px;
        margin-right: 68px;
      }
      .name {
        color: #666666;
        display: flex;
        align-items: center;
        .n1 {
          margin-left: 10px;
          vertical-align: middle;
          font-size: 33px;
          color: #f77e64;
        }
        .n2 {
          margin-left: 10px;
          vertical-align: middle;
          font-size: 33px;
          color: gray;
        }
      }
    }
  }
  /deep/ .tf-clist-box {
    padding-left: 0;
    padding-right: 0;
  }
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
/deep/ .van-dropdown-menu__item {
  padding-right: 20px;
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
.mermber-info {
  padding-bottom: 108px !important;
}
/deep/ .van-cell__right-icon {
  font-size: 26px;
}
.tf-avatar-m {
  vertical-align: middle;
}
</style>
