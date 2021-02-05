<template>
  <div class="tf-bg tf-body">
    <div class="theme-container"></div>
    <van-nav-bar :fixed="true" :border="false" placeholder>
      <template #right>
        <span class="tf-icon tf-icon-shezhi" @click="goSetting"></span>
        <span class="tf-icon tf-icon-xiaoxi" @click="goMessage">
          <span v-if="userInfo.message_mum != 0" class="van-info">{{
            userInfo.message_mum
          }}</span>
        </span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container tf-overflow-auto">
      <div class="theme-header">
        <div class="tf-bg-white">
          <div class="tf-row tf-padding-lg" @click="goInformation">
            <img
              v-if="userInfo.avatar"
              class="personage-info__avatar"
              :src="userInfo.avatar"
            />
            <img
              v-else
              class="personage-info__avatar"
              src="@/assets/imgs/touxiang.png"
            />
            <div class="personage-info--base">
              <div class="user-info-box">
                <div class="user-name">{{ userInfo.nickname }}</div>
                <van-tag
                  v-if="userType != '0'"
                  class="user-role"
                  plain
                  :color="userType | houseRoleColor"
                  :text-color="userType | houseRoleColor"
                  :inverted="true"
                  size="small"
                  >{{ userType | houseRoleText }}</van-tag
                >
                <van-tag
                  v-if="userInfo.role_dep"
                  class="user-role"
                  plain
                  :color="5 | houseRoleColor"
                  :text-color="5 | houseRoleColor"
                  :inverted="true"
                  size="small"
                  >{{ userInfo.position }}</van-tag
                >
              </div>
              <div
                v-if="currentProject && currentProject.fc_info"
                class="user-address"
              >
                {{ currentProject.fc_info }}
              </div>
              <div
                v-else-if="
                  userInfo.bsbx_allots === '1' && userInfo.project_name
                "
                class="user-address"
              >
                {{ userInfo.project_name }}
              </div>
            </div>
          </div>
        </div>
        <div class="tf-row tf-bg-white coin-box">
          <div class="tf-flex-item tf-column" @click="goHappiness">
            <div class="user-text--lg">{{ userInfo.credits || 0 }}</div>
            <div class="user-text--grey">幸福币</div>
          </div>
          <div
            class="tf-flex-item tf-column"
            @click="$router.push('/coupon/list')"
          >
            <div class="user-text--lg">{{ orderData.yhq_count || 0 }}</div>
            <div class="user-text--grey">优惠券</div>
          </div>
          <div class="tf-flex-item tf-column tf-flex-center">
            <van-button
              v-preventReClick
              class="user-btn__text"
              :class="[
                'user-btn',
                userInfo.signin_today === '1'
                  ? 'user-btn--unsign'
                  : 'user-btn--signin'
              ]"
              :loading="signLoading"
              @click="sign"
            >
              <img v-if="userInfo.signin_today == '0'" class="sign-img" src="@/assets/imgs/my-sign.png" />{{
                userInfo.signin_today | signText
              }}
            </van-button>
          </div>
        </div>
      </div>
      <div class="functional-box">
        <div v-if="isSwRole || isSdcbRole" class="tansaction-box">
          <div class="tansaction-header" @click="handleTransaction">
            <div class="tansaction-title">
              {{ isSwRole ? "报事报修" : "水电抄表" }}
            </div>
            <div class="tansaction-btn">事务处理 ></div>
          </div>
          <div
            class="tf-row"
            :style="{
              'justify-content': isService ? 'space-between' : 'space-around'
            }"
          >
            <template v-if="isSwRole">
              <template v-if="isService">
                <div class="manage-box" @click="goTransaction(1)">
                  <img
                    class="manage-image"
                    src="@/assets/imgs/personage_daichuli.svg"
                  />
                  <div class="text-sm">待处理</div>
                  <span v-if="userInfo.dcl_num" class="personage-badge">{{
                    userInfo.dcl_num
                  }}</span>
                </div>
                <div class="manage-box" @click="goTransaction(2)">
                  <img
                    class="manage-image"
                    src="@/assets/imgs/personage_daifenpai.svg"
                  />
                  <div class="text-sm">待分派</div>
                  <span v-if="userInfo.dfp_num" class="personage-badge">{{
                    userInfo.dfp_num
                  }}</span>
                </div>
              </template>
              <div class="manage-box" @click="goTransaction(3)">
                <img
                  class="manage-image"
                  src="@/assets/imgs/personage_daijiean.svg"
                />
                <div class="text-sm">待结案</div>
                <span v-if="userInfo.dja_num" class="personage-badge">{{
                  userInfo.dja_num
                }}</span>
              </div>
              <div class="manage-box" @click="goTransaction(4)">
                <img
                  class="manage-image"
                  src="@/assets/imgs/personage_yijiean.svg"
                />
                <div class="text-sm">已结案</div>
              </div>
            </template>
            <template v-else-if="isSdcbRole">
              <div class="manage-box" @click="goTransaction(6)">
                <img
                  class="manage-image"
                  src="@/assets/imgs/personage_weichaodianbiao.svg"
                />
                <div class="text-sm">未抄电表</div>
                <span v-if="userInfo.wcdb_num" class="personage-badge">{{
                  userInfo.wcdb_num
                }}</span>
              </div>
              <div class="manage-box" @click="goTransaction(7)">
                <img
                  class="manage-image"
                  src="@/assets/imgs/personage_weichaoshuibiao.svg"
                />
                <div class="text-sm">未抄水表</div>
                <span v-if="userInfo.wcsb_num" class="personage-badge">{{
                  userInfo.wcsb_num
                }}</span>
              </div>
            </template>
          </div>
        </div>
        <div class="module-box">
          <div class="module-title">我的订单</div>
          <div class="tf-row">
            <div class="order-box" @click="goOrderList(1)">
              <img
                class="manage-image"
                src="@/assets/imgs/personage_daifukuan.png"
              />
              <div class="text-sm">待付款</div>
              <span
                v-if="orderData.dfk_count && orderData.dfk_count != 0"
                class="personage-badge"
                >{{ orderData.dfk_count }}</span
              >
            </div>
            <div class="order-box" @click="goOrderList(2)">
              <img
                class="manage-image"
                src="@/assets/imgs/personage_daifahuo.png"
              />
              <div class="text-sm">待发货</div>
              <span
                v-if="orderData.dfk_count && orderData.dfh_count != 0"
                class="personage-badge"
                >{{ orderData.dfh_count }}</span
              >
            </div>
            <div class="order-box" @click="goOrderList(3)">
              <img
                class="manage-image"
                src="@/assets/imgs/personage_shouhuo.png"
              />
              <div class="text-sm">待收货</div>
              <span
                v-if="orderData.dfk_count && orderData.dsh_count != 0"
                class="personage-badge"
                >{{ orderData.dsh_count }}</span
              >
            </div>
            <div class="order-box" @click="goOrderList(4)">
              <img
                class="manage-image"
                src="@/assets/imgs/personage_tuihuan.png"
              />
              <div class="text-sm">退换</div>
              <span
                v-if="orderData.dfk_count && orderData.thz_count != 0"
                class="personage-badge"
                >{{ orderData.thz_count }}</span
              >
            </div>
            <div class="order-box" @click="goOrderList(undefined)">
              <img
                class="manage-image"
                src="@/assets/imgs/personage_quanbu.png"
              />
              <div class="text-sm">全部</div>
            </div>
          </div>
        </div>
        <tf-list class="personage-list tf-mb-lg">
          <tf-list-item border title="我的订单" @click="goOrderList(undefined)">
            <template v-slot:image>
              <img
                class="tf-clist-cell__image"
                src="@/assets/imgs/personage_dingdan.png"
              />
            </template>
          </tf-list-item>
          <tf-list-item border title="我的互动" @click="goInteraction">
            <template v-slot:image>
              <img
                class="tf-clist-cell__image"
                src="@/assets/imgs/personage_hudong.png"
              />
            </template>
          </tf-list-item>
          <tf-list-item border title="我的资料" @click="goInformation">
            <template v-slot:image>
              <img
                class="tf-clist-cell__image"
                src="@/assets/imgs/personage_ziliao.png"
              />
            </template>
          </tf-list-item>
          <!-- <tf-list-item title="幸福基金">
            <template v-slot:image>
              <img class="tf-clist-cell__image" src="@/assets/imgs/personage_jijin.png" />
            </template>
          </tf-list-item>-->
        </tf-list>
        <tf-list class="personage-list">
          <tf-list-item border title="常见问题" @click="goQuestion">
            <template v-slot:image>
              <img
                class="tf-clist-cell__image"
                src="@/assets/imgs/personage_wenti.png"
              />
            </template>
          </tf-list-item>
          <tf-list-item title="意见反馈" @click="goFeedback">
            <template v-slot:image>
              <img
                class="tf-clist-cell__image"
                src="@/assets/imgs/personage_fankui.png"
              />
            </template>
          </tf-list-item>
        </tf-list>
      </div>
    </div>
    <tf-calendar v-model="showCalendar"></tf-calendar>
  </div>
</template>

<script>
import { NavBar, Tag, Toast, Button } from 'vant'
import tfCalendar from '@/components/tf-calendar'
import tfList from '@/components/tf-list/index.vue'
import tfListItem from '@/components/tf-list/item.vue'
import { signin } from '@/api/personage'
import { mapGetters } from 'vuex'
import { handlePermission } from '@/utils/permission'
export default {
  name: 'personage',
  components: {
    [NavBar.name]: NavBar,
    [Tag.name]: Tag,
    [Button.name]: Button,
    tfList,
    tfListItem,
    tfCalendar
  },
  data () {
    return {
      signStatus: true, // 签到状态
      showCalendar: false, // 签到日历是否隐藏
      orderData: {}, // 订单数据
      signLoading: false // 签到loading
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userType', 'currentProject']),
    // 用户是否是客服部人员
    isService () {
      return this.userInfo.role_dep == 1
    },
    // 用户是否有报事报修事务处理权限
    isSwRole () {
      return this.userInfo.swrole
    },
    // 用户是否有水电抄表事务处理权限
    isSdcbRole () {
      return this.userInfo.sdcbrole
    }
  },
  activated () {
    // 重新获取用户信息
    this.$store.dispatch('getMyAccount').then(({ order_data }) => {
      this.orderData = order_data
    })
  },
  methods: {
    /* 签到 */
    sign () {
      if (this.userInfo.signin_today === '0') {
        // 签到一定要开启定位
        handlePermission({
          name: 'location',
          title: '定位服务未开启',
          message: '为了提供更好服务，需要您开启定位'
        }).then(() => {
          this.signLoading = true
          signin()
            .then(res => {
              this.signLoading = false
              Toast({
                message: res.message
              })
              this.$store.dispatch('getMyAccount')
              this.mtjEvent({
                eventId: 4
              })
            })
            .catch(() => {
              this.signLoading = false
            })
        })
      } else {
        // 已签到，弹出签到日历
        this.showCalendar = true
      }
    },
    /* 设置 */
    goSetting () {
      this.$router.push('/pages/personage/setting/index')
    },
    /* 消息 */
    goMessage () {
      this.$router.push('/pages/personage/message/index')
    },
    /* 我的资料 */
    goInformation () {
      this.$router.push('/pages/personage/information/index')
    },
    /* 点击事务处理 */
    handleTransaction () {
      let type
      if (this.isSwRole) {
        type = this.isService ? 1 : 3
      } else if (this.isSdcbRole) {
        type = 8
      }
      type && this.goTransaction(type)
    },
    /**
     * 事务处理
     * @param type {number}  1：待处理，2：待分派，3：待结案，4：已结案，5：已取消，6：未抄电表 7：未抄水表 8:水电抄表全部
     */
    goTransaction (type) {
      const url = `/pages/personage/transaction/index?type=${type}`
      this.$router.push(url)
    },
    /**
     * 我的订单
     * @param type {number} 无全部 1待付款 2待发货 3待收货 4退换
     */
    goOrderList (type) {
      this.$router.push({
        path: '/order/list',
        query: {
          type
        }
      })
    },
    /* 意见反馈 */
    goFeedback () {
      this.$router.push('/pages/personage/feedback/index')
    },
    /* 幸福币 */
    goHappiness () {
      this.$router.push('/pages/personage/happiness-coin/index')
    },
    /* 我的互动 */
    goInteraction () {
      this.$router.push('/pages/personage/interaction/index')
    },
    /* 常见问题 */
    goQuestion () {
      this.$router.push('/pages/personage/question/index')
    }
  },
  filters: {
    signText (value) {
      return value === '1' ? '已签到' : '签到'
    }
  }
}
</script>

<style lang="less" scoped>
.theme-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 750px;
  height: 260px;
  background-image: linear-gradient(to right, @red, @red-dark);
}
.tf-body {
  .functional-box {
    background: #f2f2f4;
  }
  .coin-box {
    .tf-column:first-child {
      border-right: 1px solid #f0f0f0;
    }
    .user-btn--signin {
      height: 84px;
      border-radius: 8px;
    }
  }
  /deep/ .van-nav-bar {
    background: initial;
    .tf-icon {
      color: #fff;
    }
    .van-info {
      background: #fff;
      color: #eb5841;
    }
  }
}
.theme-header {
  position: relative;
  z-index: 9;
  margin: 0 20px;
  border-radius: 10px;
  overflow: hidden;
}

.tf-icon {
  width: 44px;
  font-size: 44px;
  color: @gray-8;
  margin-left: 10px;
}

.badge {
  width: 34px;
  height: 24px;
  line-height: 24px;
  font-size: 18px;
  left: -20px;
  top: 0;
}

.personage-info--base {
  @flex-column();
  justify-content: space-around;
}

.personage-info__avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  margin-right: @padding-md;
}

.user-info-box {
  @flex();
  align-items: center;
}

.user-name {
  font-size: 34px;
  font-weight: 500;
  color: @text-color;
}

.user-role {
  margin-left: 10px;
  padding: 7px 8px;
}

.user-address {
  font-size: 26px;
  color: @gray-7;
}

.user-text--lg {
  text-align: center;
  font-size: 54px;
  line-height: 54px;
  margin-bottom: 20px;
}

.user-text--grey {
  text-align: center;
  line-height: 24px;
  font-size: 24px;
  color: @gray-7;
}
.coin-box {
  padding: 40px 20px;
}

.module-box {
  width: 710px;
  padding: 0 30px;
  margin-bottom: 30px;
  border-radius: 8px;
  background-color: #fff;
}
.module-title {
  font-size: 30px;
  font-weight: 500;
  height: 90px;
  line-height: 90px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: @divider-color;
}

.user-btn {
  width: 200px;
  height: 66px;
  border-radius: 33px;
  border-width: 0;
  font-size: 30px;
  padding: 0;
  /deep/ .van-button__text {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sign-img {
    width: 36px;
    height: 36px;
    margin-right: 10px;
  }
}
.user-btn--signin {
  background-image: linear-gradient(to right, #f9866b, #eb5841);
  color: #fff;
}
.user-btn--unsign {
  background-image: none;
  background-color: #f2f2f4;
  color: #8f8f94;
}
.personage-list {
  width: 710px;
  background-color: #fff;
  border-radius: 8px;
}
.order-box {
  position: relative;
  @flex-column();
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 174px;
  .personage-badge {
    top: 16px;
    right: 16px;
  }
}
.text-sm {
  font-size: 24px;
}
.margin-left {
  margin-left: 32px;
}
.manage-image {
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
}
.manage-border-right {
  border-right-width: 2px;
  border-right-style: dashed;
  border-right-color: @divider-color;
}
.manage-border-bottom {
  border-bottom-width: 2px;
  border-bottom-style: dashed;
  border-bottom-color: @divider-color;
}
.personage-badge {
  position: absolute;
  top: 0;
  right: 20px;
  min-width: 34px;
  height: 34px;
  border: 1px solid @red-dark;
  border-radius: 50%;
  font-size: 24px;
  color: @red-dark;
  display: flex;
  justify-content: center;
  justify-items: center;
}
.tf-main-container {
  overflow: hidden;
  @flex-column();
}
.functional-box {
  @flex-column();
  flex: 1;
  padding: 30px 20px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.tf-icon-pinglun {
  @relative();
}
.tf-icon-xiaoxi {
  position: relative;
}
/deep/ .van-nav-bar__right {
  padding-right: 0;
}
.van-info {
  top: 24px;
  right: 22px;
}
.tansaction-box {
  padding: 30px 30px 40px;
  margin-bottom: 30px;
  background: url("~@/assets/imgs/transaction-bg.png");
  background-size: cover;
  border-radius: 10px;
  z-index: 1;
  .tansaction-header {
    display: flex;
    justify-content: space-between;
  }
  .tansaction-title {
    font-size: 30px;
    font-weight: 600;
    color: #021214;
  }
  .tansaction-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    padding: 0 20px;
    border: 1px solid #ff5240;
    border-radius: 20px;
    font-size: 24px;
    color: #ff5240;
  }
  .tf-row {
    margin-top: 30px;
    .manage-box {
      position: relative;
      width: 138px;
      height: 144px;
      @flex-column();
      justify-content: center;
      align-items: center;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 8px 8px #ffc97499;
    }
    .personage-badge {
      top: -10px;
      right: -10px;
      background: #eb5841;
      color: #fff;
    }
  }
}
</style>
