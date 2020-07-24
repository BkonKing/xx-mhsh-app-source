<template>
  <div class="tf-bg">
    <van-nav-bar :fixed="true" :border="false">
      <template #right>
        <span class="tf-icon tf-icon-setting" @click="goSetting"></span>
        <span class="tf-icon tf-icon-message" @click="goMessage">
          <span class="van-info">2</span>
        </span>
      </template>
    </van-nav-bar>
    <div class="tf-main-container">
      <div class="tf-bg-white">
        <div class="tf-row tf-padding-lg" @click="goInformation">
          <img class="personage-info__avatar" src="/static/app-icon.png" mode="aspectFit" />
          <div class="personage-info--base">
            <div class="user-info-box">
              <div class="user-name">这是一个默认昵</div>
              <van-tag class="user-role" plain type="danger" :inverted="true" size="small">业主</van-tag>
              <van-tag class="user-role" plain type="success" :inverted="true" size="small">管理员</van-tag>
              <van-tag class="user-role" plain type="primary" :inverted="true" size="small">维修员</van-tag>
            </div>
            <div class="user-address">5座7B单元-1001</div>
          </div>
        </div>
        <div class="tf-row coin-box">
          <div class="tf-flex-item tf-column" @click="goHappiness">
            <div class="user-text--lg">90000</div>
            <div class="user-text--grey">幸福币</div>
          </div>
          <div class="tf-flex-item tf-column">
            <div class="user-text--lg">26</div>
            <div class="user-text--grey">优惠券</div>
          </div>
          <div class="tf-flex-item tf-column tf-flex-center">
            <button
              :class="['user-btn', signStatus ? 'user-btn--unsign' : 'user-btn--signin']"
              @click="sign"
            >
              <div class="user-btn__text" :style="{ color: signStatus ? '#8F8F94' : '#fff' }">签到</div>
            </button>
          </div>
        </div>
      </div>
      <div class="functional-box">
        <div class="module-box">
          <div class="module-title">事务处理</div>
          <div class="tf-padding-base">
            <div class="tf-row manage-border-bottom">
              <div class="manage-box manage-border-right" @click="goTransaction(1)">
                <img class="manage-image" src="/static/tabbar/me.png" mode="aspectFit" />
                <div class="text-sm">待处理</div>
                <span class="van-info personage-badge">3</span>
              </div>
              <div class="manage-box" @click="goTransaction(2)">
                <img class="manage-image" src="/static/tabbar/me.png" mode="aspectFit" />
                <div class="text-sm">待分派</div>
              </div>
            </div>
            <div class="tf-row">
              <div class="manage-box manage-border-right" @click="goTransaction(3)">
                <img class="manage-image" src="/static/tabbar/me.png" mode="aspectFit" />
                <div class="text-sm">待结案</div>
              </div>
              <div class="manage-box" @click="goTransaction(4)">
                <img class="manage-image" src="/static/tabbar/me.png" mode="aspectFit" />
                <div class="text-sm">已结案</div>
              </div>
            </div>
          </div>
        </div>
        <div class="module-box" @click="goOrder">
          <div class="module-title">我的订单</div>
          <div class="tf-row">
            <div class="order-box">
              <img class="manage-image" src="/static/tabbar/me.png" mode="aspectFit" />
              <div class="text-sm">待付款</div>
            </div>
            <div class="order-box">
              <img class="manage-image" src="/static/tabbar/me.png" mode="aspectFit" />
              <div class="text-sm">待发货</div>
            </div>
            <div class="order-box">
              <img class="manage-image" src="/static/tabbar/me.png" mode="aspectFit" />
              <div class="text-sm">待收货</div>
            </div>
            <div class="order-box">
              <img class="manage-image" src="/static/tabbar/me.png" mode="aspectFit" />
              <div class="text-sm">退换</div>
            </div>
            <div class="order-box">
              <img class="manage-image" src="/static/tabbar/me.png" mode="aspectFit" />
              <div class="text-sm">全部</div>
            </div>
          </div>
        </div>
        <tf-list class="personage-list tf-mb-lg">
          <tf-list-item title="我的订单" image="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png">
          </tf-list-item>
          <tf-list-item title="我的互动" image="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png">
          </tf-list-item>
          <tf-list-item title="我的资料" image="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png" @click="goInformation">
          </tf-list-item>
          <tf-list-item title="幸福基金" image="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png">
          </tf-list-item>
        </tf-list>
        <tf-list class="personage-list">
          <tf-list-item title="常见问题" image="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png">
          </tf-list-item>
          <tf-list-item title="意见反馈" image="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png" @click="goFeedback">
          </tf-list-item>
        </tf-list>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Tag, Toast } from 'vant'
import tfList from '@/components/tf-list/index.vue'
import tfListItem from '@/components/tf-list/item.vue'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tag.name]: Tag,
    tfList,
    tfListItem
  },
  data () {
    return {
      signStatus: false
    }
  },
  methods: {
    sign () {
      if (!this.signStatus) {
        Toast({
          message: '签到成功   幸福币+10'
        })
      } else {
        // 已签到，弹出签到日历
      }
    },
    goSetting () {
      this.$router.push('/pages/personage/setting/index')
    },
    goMessage () {
      this.$router.push('/pages/personage/message/index')
    },
    goInformation () {
      this.$router.push('/pages/personage/information/index')
    },
    goOrder () {
      this.$router.push('/pages/personage/order-form/index')
    },
    goTransaction (type) {
      const url = `/pages/personage/transaction/index?type=${type}`
      this.$router.push(url)
    },
    // 意见反馈
    goFeedback () {
      this.$router.push('/pages/personage/feedback/index')
    },
    // 幸福币
    goHappiness () {
      this.$router.push('/pages/personage/happiness-coin/index')
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
}
.user-btn--signin {
  background-image: linear-gradient(to right, #f9866b, #eb5841);
}
.user-btn--unsign {
  background-image: none;
  background-color: #f2f2f4;
  color: @gray-7;
}
.user-btn__text {
  font-size: 30px;
  line-height: 66px;
}
.manage-box {
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
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 174px;
}
.text-sm {
  font-size: 24px;
}
.margin-left {
  margin-left: 32px;
}
.manage-image {
  width: 60px;
  height: 35px;
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
  height: 34px;
  line-height: 32px;
  border-width: 1px;
  border-style: solid;
  border-color: @red-dark;
  border-radius: 50%;
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
}
.tf-icon-message {
  @relative();
}
</style>
