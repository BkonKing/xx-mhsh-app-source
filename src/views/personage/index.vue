<template>
  <div class="tf-bg tf-body">
    <van-nav-bar :fixed="true" :border="false" placeholder>
      <template #right>
        <span class="tf-icon tf-icon-shezhi" @click="goSetting"></span>
        <span class="tf-icon tf-icon-xiaoxi" @click="goMessage">
          <span v-if="userInfo.message_mum != 0" class="van-info">{{userInfo.message_mum}}</span>
        </span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container tf-overflow-auto">
      <div class="tf-bg-white">
        <div class="tf-row tf-padding-lg" @click="goInformation">
          <img v-if="userInfo.avatar" class="personage-info__avatar" :src="userInfo.avatar" />
          <img v-else class="personage-info__avatar" src="@/assets/imgs/touxiang.png" />
          <div class="personage-info--base">
            <div class="user-info-box">
              <div class="user-name">{{userInfo.nickname}}</div>
              <van-tag
                v-if="userType != '0'"
                class="user-role"
                plain
                :color="userType | houseRoleColor"
                :text-color="userType | houseRoleColor"
                :inverted="true"
                size="small"
              >{{userType | houseRoleText}}</van-tag>
              <van-tag
                v-if="userInfo.role_dep"
                class="user-role"
                plain
                :color="5 | houseRoleColor"
                :text-color="5 | houseRoleColor"
                :inverted="true"
                size="small"
              >{{userInfo.position}}</van-tag>
            </div>
            <div class="user-address">{{(currentProject && currentProject.fc_info)}}</div>
          </div>
        </div>
      </div>
      <div class="tf-row tf-bg-white coin-box">
        <div class="tf-flex-item tf-column" @click="goHappiness">
          <div class="user-text--lg">{{userInfo.credits}}</div>
          <div class="user-text--grey">幸福币</div>
        </div>
        <div class="tf-flex-item tf-column" @click="$router.push('/coupon/list')">
          <div class="user-text--lg">{{orderData.yhq_count}}</div>
          <div class="user-text--grey">优惠券</div>
        </div>
        <div class="tf-flex-item tf-column tf-flex-center">
          <button
            class="user-btn__text"
            :class="['user-btn', userInfo.signin_today === '1' ? 'user-btn--unsign' : 'user-btn--signin']"
            @click="sign"
          >{{userInfo.signin_today | signText}}</button>
        </div>
      </div>
      <div class="functional-box">
        <div v-if="userInfo.swrole == 1" class="module-box">
          <div class="module-title">事务处理</div>
          <div class="tf-padding-base">
            <div v-if="userInfo.role_dep == 1" class="tf-row manage-border-bottom">
              <div class="manage-box manage-border-right" @click="goTransaction(1)">
                <img class="manage-image" src="@/assets/imgs/personage_daichuli.png" />
                <div class="text-sm">待处理</div>
                <span v-if="userInfo.dcl_num" class="personage-badge">{{userInfo.dcl_num}}</span>
              </div>
              <div class="manage-box" @click="goTransaction(2)">
                <img class="manage-image" src="@/assets/imgs/personage_daifenpai.png" />
                <div class="text-sm">待分派</div>
                <span v-if="userInfo.dfp_num" class="personage-badge">{{userInfo.dfp_num}}</span>
              </div>
            </div>
            <div class="tf-row">
              <div class="manage-box manage-border-right" @click="goTransaction(3)">
                <img class="manage-image" src="@/assets/imgs/personage_daijiean.png" />
                <div class="text-sm">待结案</div>
                <span v-if="userInfo.dja_num" class="personage-badge">{{userInfo.dja_num}}</span>
              </div>
              <div class="manage-box" @click="goTransaction(4)">
                <img class="manage-image" src="@/assets/imgs/personage_yijiean.png" />
                <div class="text-sm">已结案</div>
              </div>
            </div>
          </div>
        </div>
        <div class="module-box">
          <div class="module-title">我的订单</div>
          <div class="tf-row">
            <div class="order-box" @click="goOrderList(1)">
              <img class="manage-image" src="@/assets/imgs/personage_daifukuan.png" />
              <div class="text-sm">待付款</div>
              <span
                v-if="orderData.dfk_count && orderData.dfk_count != 0"
                class="personage-badge"
              >{{orderData.dfk_count}}</span>
            </div>
            <div class="order-box" @click="goOrderList(2)">
              <img class="manage-image" src="@/assets/imgs/personage_daifahuo.png" />
              <div class="text-sm">待发货</div>
              <span
                v-if="orderData.dfk_count && orderData.dfh_count != 0"
                class="personage-badge"
              >{{orderData.dfh_count}}</span>
            </div>
            <div class="order-box" @click="goOrderList(3)">
              <img class="manage-image" src="@/assets/imgs/personage_shouhuo.png" />
              <div class="text-sm">待收货</div>
              <span
                v-if="orderData.dfk_count && orderData.dsh_count != 0"
                class="personage-badge"
              >{{orderData.dsh_count}}</span>
            </div>
            <div class="order-box" @click="goOrderList(4)">
              <img class="manage-image" src="@/assets/imgs/personage_tuihuan.png" />
              <div class="text-sm">退换</div>
              <span
                v-if="orderData.dfk_count && orderData.thz_count != 0"
                class="personage-badge"
              >{{orderData.thz_count}}</span>
            </div>
            <div class="order-box" @click="goOrderList(undefined)">
              <img class="manage-image" src="@/assets/imgs/personage_quanbu.png" />
              <div class="text-sm">全部</div>
            </div>
          </div>
        </div>
        <tf-list class="personage-list tf-mb-lg">
          <tf-list-item border title="我的订单" @click="goOrderList(undefined)">
            <template v-slot:image>
              <img class="tf-clist-cell__image" src="@/assets/imgs/personage_dingdan.png" />
            </template>
          </tf-list-item>
          <tf-list-item border title="我的互动" @click="goInteraction">
            <template v-slot:image>
              <img class="tf-clist-cell__image" src="@/assets/imgs/personage_hudong.png" />
            </template>
          </tf-list-item>
          <tf-list-item border title="我的资料" @click="goInformation">
            <template v-slot:image>
              <img class="tf-clist-cell__image" src="@/assets/imgs/personage_ziliao.png" />
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
              <img class="tf-clist-cell__image" src="@/assets/imgs/personage_wenti.png" />
            </template>
          </tf-list-item>
          <tf-list-item title="意见反馈" @click="goFeedback">
            <template v-slot:image>
              <img class="tf-clist-cell__image" src="@/assets/imgs/personage_fankui.png" />
            </template>
          </tf-list-item>
        </tf-list>
      </div>
    </div>
    <tf-calendar v-model="showCalendar"></tf-calendar>
  </div>
</template>

<script>
import { NavBar, Tag, Toast } from 'vant'
import tfCalendar from '@/components/tf-calendar'
import tfList from '@/components/tf-list/index.vue'
import tfListItem from '@/components/tf-list/item.vue'
import { signin } from '@/api/personage'
import { mapGetters } from 'vuex'
export default {
  name: 'personage',
  components: {
    [NavBar.name]: NavBar,
    [Tag.name]: Tag,
    tfList,
    tfListItem,
    tfCalendar
  },
  data () {
    return {
      signStatus: true,
      showCalendar: false, // 签到日历是否隐藏
      orderData: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userType', 'currentProject'])
  },
  activated () {
    this.$store.dispatch('getMyAccount').then(({ order_data }) => {
      this.orderData = order_data
    })
  },
  methods: {
    /* 签到 */
    sign () {
      if (this.userInfo.signin_today === '0') {
        signin().then((res) => {
          Toast({
            message: '签到成功   幸福币+10'
          })
          this.$store.dispatch('getMyAccount')
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
    /**
     * 事务处理
     * @param type {number} 1: 待处理 2:：待分派 3：待结案 4：已结案
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
  line-height: 66px;
  border-radius: 33px;
  border-width: 0;
  font-size: 30px;
  padding: 0;
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
.manage-box {
  position: relative;
  flex: 1;
  height: 144px;
  @flex-column();
  justify-content: center;
  align-items: center;
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
</style>
