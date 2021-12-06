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
              </div>
              <div class="user-role-box">
                <img v-if="isShop" class="user-img" src="@/assets/personage/shangjia.png" alt="">
                <img v-if="false" class="user-img" src="@/assets/personage/zhiyuanzhe.png" alt="">
                <img v-if="false" class="user-img" src="@/assets/personage/yuangong.png" alt="">
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
                  v-if="userInfo.position"
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
                userInfo.signin_status === 0
                  ? 'user-btn--signin'
                  : 'user-btn--unsign'
              ]"
              :loading="signLoading"
              @click="sign"
            >
              <img
                v-if="userInfo.signin_status === 0"
                class="sign-img"
                src="@/assets/imgs/my-sign.png"
              />{{ userInfo.signin_status | signText }}
            </van-button>
          </div>
        </div>
      </div>
      <div class="functional-box">
        <!-- 商户入口 -->
        <div class="shop-box" @click="goShopCentre">
          <div class="shop-header">
            <img class="shop-icon" src="@/assets/personage/shop.png" alt="" />
            <span class="shop-name">美好生活家园新乡店</span>
          </div>
          <div class="shop-content">
            <div class="shop-item">
              <div class="shop-num">50</div>
              <div class="shop-text">今日核销优惠券</div>
            </div>
            <div class="shop-item">
              <div class="shop-num">3</div>
              <div class="shop-text">领取中优惠券</div>
            </div>
          </div>
        </div>
        <!-- 事务处理 -->
        <div v-if="isSwRole || isSdcbRole" class="tansaction-box">
          <div class="tansaction-header" @click="handleTransaction">
            <div class="tansaction-title">
              {{ isSwRole ? "报事报修" : "水电抄表" }}
            </div>
            <div class="tansaction-btn">事务处理 <i class="van-icon van-icon-arrow"></i></div>
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
        <!-- 我的订单 -->
        <div v-if="!isShop" class="module-box">
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
        <!-- 积分活动 -->
        <div v-if="isOpenActivity" class="activity-banner" @click="goActivity">
          {{ activityTitle }}
        </div>
        <!-- 红包活动 -->
        <div v-if="isInvite" class="invite-banner" @click="goInvite">
          <img class="invite-banner-img" :src="inviteBanner" alt="" />
        </div>
        <template v-if="!isShop">
          <tf-list class="personage-list tf-mb-lg">
            <tf-list-item
              v-if="isShowTask"
              border
              title="我的任务"
              @click="goMyTask"
            >
              <template v-slot:image>
                <img
                  class="tf-clist-cell__image"
                  src="@/assets/imgs/personage_task.png"
                />
              </template>
              <template v-slot:right>
                <span v-if="taskNum" class="num-tag">{{ taskNum }}</span>
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
        </template>
        <template v-else>
          <div class="model-tow">
            <div class="model-tow-title">我的服务</div>
            <div class="model-grid">
              <van-grid :border="false" :column-num="4">
                <van-grid-item text="我的订单" @click="goOrderList(undefined)">
                  <template slot="icon"
                    ><img
                      class="grid-item-icon"
                      src="@/assets/personage/personage_order.png"
                  /></template>
                </van-grid-item>
                <van-grid-item text="我的互动" @click="goInteraction">
                  <template slot="icon"
                    ><img
                      class="grid-item-icon"
                      src="@/assets/personage/personage_hudong.png"
                  /></template>
                </van-grid-item>
                <van-grid-item text="我的资料" @click="goInformation">
                  <template slot="icon"
                    ><img
                      class="grid-item-icon"
                      src="@/assets/personage/personage_ziliao.png"
                  /></template>
                </van-grid-item>
                <van-grid-item
                  v-if="isShowTask"
                  text="我的任务"
                  @click="goMyTask"
                >
                  <template slot="icon"
                    ><img
                      class="grid-item-icon"
                      src="@/assets/personage/personage_wenti.png"
                  /></template>
                </van-grid-item>

                <van-grid-item text="常见问题" @click="goQuestion">
                  <template slot="icon"
                    ><img
                      class="grid-item-icon"
                      src="@/assets/personage/personage_hudong.png"
                  /></template>
                </van-grid-item>
                <van-grid-item text="意见反馈" @click="goFeedback">
                  <template slot="icon"
                    ><img
                      class="grid-item-icon"
                      src="@/assets/personage/personage_fankui.png"
                  /></template>
                </van-grid-item>
              </van-grid>
            </div>
          </div>
        </template>
      </div>
    </div>
    <tf-calendar v-model="showCalendar"></tf-calendar>
    <sign-rule-dialog v-model="signRuledialog"></sign-rule-dialog>
    <sign-alert
      v-model="signAlertVisible"
      :message="signMessage"
      :credits="signOwnerCredits"
    ></sign-alert>
  </div>
</template>

<script>
import tfCalendar from '@/components/tf-calendar'
import tfList from '@/components/tf-list/index.vue'
import tfListItem from '@/components/tf-list/item.vue'
import SignRule from './happiness-coin/components/SignRule'
import { signin } from '@/api/personage'
import { getUserActivity } from '@/api/activity'
import { getMyTaskNum } from '@/api/task'
import { mapGetters } from 'vuex'
import { handlePermission } from '@/utils/permission'
import SignAlert from '@/views/home/components/SignAlert'
export default {
  name: 'personage',
  components: {
    [SignRule.name]: SignRule,
    tfList,
    tfListItem,
    tfCalendar,
    SignAlert
  },
  data () {
    return {
      signStatus: true, // 签到状态
      showCalendar: false, // 签到日历是否隐藏
      orderData: {}, // 订单数据
      hbBannerData: {}, // 美好红包数据
      signLoading: false, // 签到loading
      signRuledialog: false, // 签到规则弹窗
      isOpenActivity: false, // 是否开启积分活动
      isShowTask: false, // 是否显示任务
      taskNum: '', // 任务数量
      activityTitle: '参与活动领积分',
      signAlertVisible: false, // 游客认证提醒弹窗
      signMessage: '', // 签到成功提醒
      signOwnerCredits: '' // 业主签到幸福币
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
    },
    // 是否有邀请活动
    isInvite () {
      return this.hbBannerData && this.hbBannerData.is_open_hb_banner
    },
    // 美好红包banner图
    inviteBanner () {
      return this.hbBannerData.hb_banner_url || ''
    },
    // 是否为商户
    isShop () {
      return true
    }
  },
  activated () {
    // 重新获取用户信息
    this.$store
      .dispatch('getMyAccount')
      .then(({ order_data, hb_banner_data }) => {
        this.orderData = order_data
        this.hbBannerData = hb_banner_data
      })
    this.getActivityInfo()
    this.getMyTaskNum()
  },
  methods: {
    // 获取积分活动信息
    getActivityInfo () {
      getUserActivity({
        uid: this.userInfo.id
      }).then(({ activity_name: title, is_flag: isFlag }) => {
        this.isOpenActivity = isFlag
        isFlag && title && (this.activityTitle = title)
      })
    },
    // 获取我的任务数量
    getMyTaskNum () {
      getMyTaskNum().then(({ data }) => {
        this.isShowTask = data.is_show_task
        this.taskNum = data.num
      })
    },
    // 签到
    sign () {
      if (this.userInfo.signin_status === 0) {
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
              if (+res.open_box) {
                this.signMessage = res.message
                this.signOwnerCredits = res.owner_credits
                this.signAlertVisible = true
              } else {
                this.$toast({
                  message: res.message
                })
              }
              this.$store.dispatch('getMyAccount')
              this.mtjEvent({
                eventId: 4
              })
            })
            .catch(() => {
              this.signLoading = false
            })
        })
      } else if (this.userInfo.signin_status === 2) {
        // 不可签到，打开签到规则弹窗
        this.signRuledialog = true
      } else {
        // 已签到，弹出签到日历
        this.showCalendar = true
      }
    },
    // 设置
    goSetting () {
      this.$router.push('/pages/personage/setting/index')
    },
    // 消息
    goMessage () {
      this.$router.push('/pages/personage/message/index')
    },
    // 我的资料
    goInformation () {
      this.$router.push('/pages/personage/information/index')
    },
    // 点击事务处理
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
    // 商户中心
    goShopCentre () {
      this.$router.push({
        name: 'shopIndex'
      })
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
    // 意见反馈
    goFeedback () {
      this.$router.push('/pages/personage/feedback/index')
    },
    // 幸福币
    goHappiness () {
      this.$router.push('/pages/personage/happiness-coin/index')
    },
    // 我的互动
    goInteraction () {
      this.$router.push('/pages/personage/interaction/index')
    },
    // 常见问题
    goQuestion () {
      this.$router.push('/pages/personage/question/index')
    },
    // 用户积分活动专区
    goActivity () {
      this.$router.push({ name: 'activity' })
    },
    // 美好红包专区
    goInvite () {
      this.$router.push({ name: 'inviteIndex' })
    },
    // 我的任务
    goMyTask () {
      this.$router.push({ name: 'PersonageTaskIndex' })
    }
  },
  filters: {
    signText (value) {
      return value === 1 ? '已签到' : '签到'
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

// .personage-info--base {
//   @flex-column();
//   justify-content: space-around;
// }

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
  line-height: 1;
}

.user-role-box {
  display: flex;
  align-items: center;
  margin-top: 20px;
  line-height: 1;
  .user-img {
    width: 36px;
    height: 36px;
    margin-right: 10px;
  }
}
.user-role {
  min-height: 36px;
  padding: 0 8px;
  margin-right: 10px;
  line-height: 1;
}

.user-address {
  margin-top: 12px;
  font-size: 26px;
  color: #8F8F94;
  line-height: 42px;
  letter-spacing: 2px;
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
  padding: 10px 20px 40px;
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
}
.tf-icon-pinglun1 {
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
.shop-box {
  width: 710px;
  min-height: 250px;
  padding: 34px 30px 48px;
  margin-bottom: 30px;
  background: #ffffff;
  border-radius: 10px;
  z-index: 1;
  .shop-header {
    display: flex;
    align-items: center;
    .shop-icon {
      width: 32px;
      height: 30px;
      margin-right: 20px;
    }
    .shop-name {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
    }
  }
  .shop-content {
    display: flex;
    width: 100%;
    margin-top: 40px;
  }
  .shop-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    .shop-num {
      margin-bottom: 30px;
      font-size: 48px;
      font-weight: bold;
      color: #222222;
      line-height: 1;
    }
    .shop-text {
      font-size: 24px;
      color: #8f8f94;
      line-height: 1;
    }
  }
  .shop-item + .shop-item {
    border-left: 1px solid #eee;
  }
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
    min-width: 140px;
    height: 40px;
    padding: 0 14px 0 20px;
    border: 1px solid #ff5240;
    border-radius: 20px;
    font-size: 22px;
    color: #ff5240;
    line-height: 1;
    .van-icon-arrow {
      margin-right: -6px;
    }
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
.activity-banner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px;
  margin-bottom: 30px;
  font-size: 36px;
  font-weight: 500;
  line-height: 1;
  color: #000000;
  background: url("~@/assets/imgs/personage_activity_banner.png");
  background-size: contain;
}
.invite-banner {
  width: 100%;
  height: 140px;
  margin-bottom: 30px;
  line-height: 1;
}
.invite-banner-img {
  width: 100%;
  height: 100%;
  line-height: 1;
  object-fit: cover;
}
.num-tag {
  @flex-center();
  min-width: 40px;
  height: 40px;
  padding: 0 12px;
  background: #ff6555;
  border-radius: 20px;
  font-size: 26px;
  font-weight: 500;
  color: #ffffff;
}
.model-tow {
  width: 710px;
  height: 408px;
  background: #ffffff;
  border-radius: 10px;
  .model-tow-title {
    padding-top: 30px;
    padding-left: 30px;
    font-size: 30px;
    font-weight: bold;
    color: #021214;
  }
  .model-grid {
    padding: 20px 0;
  }
  .grid-item-icon {
    width: 56px;
    height: 56px;
  }
  /deep/ .van-grid-item__text {
    color: #222222;
  }
}
</style>
