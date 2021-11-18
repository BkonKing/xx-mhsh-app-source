<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar
      title="邀请有礼"
      :fixed="true"
      placeholder
      :border="false"
      :left-arrow="true"
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="tf-body-container" id="invite-content">
      <van-notice-bar
        v-if="noticeList.length"
        class="swiper-nav"
        :scrollable="false"
      >
        <van-swipe
          vertical
          class="notice-swipe"
          :autoplay="3000"
          :show-indicators="false"
        >
          <van-swipe-item v-for="(item, index) in noticeList" :key="index">{{
            item
          }}</van-swipe-item>
        </van-swipe>
      </van-notice-bar>
      <img v-if="haveDownload" class="img1" src="@/assets/invite/bg-1.png" />
      <img
        v-if="haveAuthentication"
        class="img2"
        src="@/assets/invite/title.png"
      />
      <div class="box1">
        <div v-if="haveDownload" class="left">{{ downloadCredits }}</div>
        <div v-if="haveAuthentication" class="right">
          {{ authenticationCredits }}
        </div>
      </div>
      <img class="img3" src="@/assets/invite/bg-4.png" />
      <div class="card steps" :class="[`step-num-${stepLen}`]">
        <div class="card-header">
          <img class="header-bg-1" src="@/assets/invite/point-2.png" />
          <img class="card-title-image" src="@/assets/invite/steps.png" />
        </div>
        <div class="steps-info">
          <div class="steps-items">
            <img class="step-img" src="@/assets/invite/step-1.png" alt="" />
            <div class="step-text">
              <div>分享活动</div>
              <div>给好友</div>
            </div>
          </div>
          <div v-if="haveDownload" class="steps-items">
            <img class="step-img" src="@/assets/invite/step-2.png" alt="" />
            <div class="step-text">
              <div>好友</div>
              <div>下载登录</div>
            </div>
          </div>
          <div v-if="haveAuthentication" class="steps-items">
            <img class="step-img" src="@/assets/invite/step-3.png" alt="" />
            <div class="step-text">
              <div>好友</div>
              <div>认证房间</div>
            </div>
          </div>
          <div class="steps-items">
            <img class="step-img" src="@/assets/invite/step-4.png" alt="" />
            <div class="step-text">
              <div>完成邀请</div>
              <div>获得奖励</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card invite">
        <div class="card-header">
          <img class="header-bg-2" src="@/assets/invite/point-1.png" />
          <img class="card-title-image" src="@/assets/invite/my-title.png" />
        </div>
        <div class="invite-content">
          <div class="invite-tabs">
            <div
              v-if="haveDownload"
              class="invite-tab"
              :class="{ 'invite-active': activeTab === 1 }"
              @click="activeTab = 1"
            >
              下载登录{{ downloadNum ? `（${downloadNum}）` : "" }}
            </div>
            <div
              v-if="haveAuthentication"
              class="invite-tab"
              :class="{ 'invite-active': activeTab === 2 }"
              @click="activeTab = 2"
            >
              房间认证{{ authenticationNum ? `（${authenticationNum}）` : "" }}
            </div>
            <div
              class="invite-tab"
              :class="{ 'invite-active': activeTab === 0 }"
              @click="activeTab = 0"
            >
              我的奖励
            </div>
          </div>
          <div class="invite-tab-content" :class="tabHeaderClass">
            <div v-if="loading" class="no-data-box">
              <div class="boxLoading"></div>
            </div>
            <div
              class="invite-tab-page"
              v-if="inviteUserList && inviteUserList.length"
              v-show="!loading"
            >
              <user-item
                v-for="(item, index) in inviteUserList"
                :user-info="item"
                :key="index"
                :type="activeTab"
              ></user-item>
            </div>
            <div v-else v-show="!loading" class="no-data-box">
              <img
                class="no-data-img"
                src="@/assets/invite/no-data.png"
                alt=""
              />
              <div class="no-data-text">暂无数据</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card rules-box">
        <div class="card-header">
          <img class="card-title-image" src="@/assets/invite/rules.png" />
        </div>
        <div class="rules-content">
          <div>
            1、打开美好生活家园APP，在我的频道，可以看到“邀请邻居，奖励幸福币”活动入口；
          </div>
          <div>
            2、进入此活动页面的用户，可以通过邀请链接，邀请新用户，完成下载登录、房屋认证等任务，即可获得相应奖励。
          </div>
          <div>3、邀请奖励不设上限，具体奖励金额活动页面展示为准；</div>
          <div>4、新用户指：未在美好生活家园APP注册登录过的手机号。</div>
        </div>
      </div>
      <div class="footer-text">—— 美好生活家园 ——</div>
      <img
        class="btn"
        src="@/assets/invite/btn.png"
        alt=""
        @click="goInviteQRCode"
      />
    </div>
  </div>
</template>

<script>
// /personage/invite/index
import UserItem from './components/UserItem'
import {
  getUserInviteInfo,
  getInviteNotice,
  getUserInviteRecord
} from '@/api/personage'

export default {
  name: 'inviteIndex',
  components: {
    UserItem
  },
  data () {
    return {
      noticeList: [],
      activeTab: 0,
      haveDownload: false,
      downloadCredits: 0,
      downloadNum: 0,
      haveAuthentication: false,
      authenticationCredits: 0,
      authenticationNum: 0,
      stepLen: 3,
      inviteUserList: [],
      scrollTop: 0,
      loading: false
    }
  },
  computed: {
    tabHeaderClass () {
      const className = {
        3: {
          0: 'center-header-bg',
          1: 'left-header-bg',
          2: 'left-header-bg'
        },
        4: {
          0: 'right-header-bg',
          1: 'left-header-bg',
          2: 'center-header-bg'
        }
      }
      return ['tab-header-bg', className[this.stepLen][this.activeTab]]
    }
  },
  watch: {
    activeTab (value) {
      this.loading = true
      this.getUserInviteRecord()
    }
  },
  created () {
    this.getUserInviteInfo()
    this.getInviteNotice()
    this.getUserInviteRecord()
  },
  activated () {
    this.scrollTop &&
      (document.getElementById('invite-content').scrollTop = this.scrollTop)
  },
  beforeRouteLeave (to, from, next) {
    this.scrollTop = document.getElementById('invite-content').scrollTop
    if (to.name !== 'inviteQRCode') {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  },
  methods: {
    getInviteNotice () {
      getInviteNotice().then(({ data }) => {
        this.noticeList = data || []
      })
    },
    getUserInviteInfo () {
      getUserInviteInfo({
        i_type: this.activeTab
      }).then(({ invite_task_data: taskData, count_data: countData }) => {
        taskData.forEach(task => {
          if (task.task_type === '6') {
            this.haveDownload = true
            this.downloadCredits = task.credits
          } else if (task.task_type === '2') {
            this.haveAuthentication = true
            this.authenticationCredits = task.credits
          }
        })
        this.stepLen = taskData.length + 2
        this.downloadNum = countData.xz_num
        this.authenticationNum = countData.rz_num
      })
    },
    getUserInviteRecord () {
      getUserInviteRecord({
        i_type: this.activeTab
      })
        .then(({ invite_reward_log_list: list }) => {
          this.inviteUserList = list
        })
        .finally(() => {
          this.loading = false
        })
    },
    goInviteQRCode () {
      this.$router.push({
        name: 'inviteQRCode'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tf-body-container {
  position: relative;
  background: linear-gradient(0deg, #fe9b00 0%, #febf00 50%);
}
.swiper-nav {
  position: absolute;
  top: 0;
  width: 750px;
  height: 64px;
  background: #d081214d;
  z-index: 10;
  /deep/ .van-notice-bar__content {
    width: 100%;
  }
  .notice-swipe {
    height: 64px;
    /deep/ .van-swipe-item {
      display: flex;
      justify-content: center;
      line-height: 64px;
      font-size: 26px;
      font-weight: bold;
      color: #fff;
    }
  }
}
.img1 {
  width: 100%;
  position: absolute;
  top: 0;
}
.img2 {
  width: 413px;
  height: 256px;
  position: absolute;
  top: 93px;
  left: 195px;
}
.box1 {
  display: flex;
  justify-content: space-around;
  height: 360px;
  margin-top: 360px;
  padding-left: 76px;
  padding-right: 76px;
  position: relative;
  z-index: 2;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 260px;
    height: 360px;
    background-size: contain;
    font-size: 68px;
    font-weight: bold;
  }
  .left {
    color: #ffffff;
    background-image: url("~@/assets/invite/bg-2.png");
  }
  .right {
    color: #d08121;
    background-image: url("~@/assets/invite/bg-3.png");
  }
}
.img3 {
  width: 100%;
  position: absolute;
  top: 421px;
}
.steps {
  margin-top: 190px;
  .header-bg-1 {
    position: absolute;
    left: 0;
    top: 0;
    width: 209px;
    height: 98px;
  }
  .steps-info {
    display: flex;
    justify-content: space-around;
    padding: 0 30px 40px;
  }
  .steps-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .steps-items + .steps-items {
    &::before {
      content: "";
      display: block;
      width: 9px;
      height: 13px;
      position: absolute;
      top: 33px;
      // left: -37px;
      background-image: url("~@/assets/invite/left.png");
      background-size: cover;
    }
  }
  .step-img {
    width: 80px;
    height: 80px;
  }
  .step-text {
    margin-top: 19px;
    font-size: 22px;
    font-weight: 500;
    text-align: center;
    color: #222222;
  }
}
.step-num-3 .steps-items + .steps-items::before {
  left: -63.83px; // -(650 / 3 - 80) / 2 + 4.5px
}
.step-num-4 .steps-items + .steps-items::before {
  left: -36.75px; // -(650 / 4 - 80) / 2 + 4.5px
}
.card {
  position: relative;
  z-index: 3;
  width: 710px;
  min-height: 298px;
  margin-left: 20px;
  background: #ffffff;
  border-radius: 10px;
  .card-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 110px;
    position: relative;
  }
  .card-title-image {
    width: 209px;
    height: 31px;
  }
}
.invite {
  margin-top: 30px;
  .header-bg-2 {
    position: absolute;
    right: 0;
    top: 0;
    width: 209px;
    height: 98px;
  }
  .invite-content {
    .invite-tabs {
      display: flex;
      padding: 0 30px;
      .invite-tab {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 72px;
        margin-bottom: 30px;
        border-radius: 10px;
        font-size: 26px;
        font-weight: bold;
        line-height: 1;
        background: #f7f7f7;
        color: #8f8f94;
      }
      .invite-tab + .invite-tab {
        margin-left: 25px;
      }
      .invite-active {
        background: #ff6555;
        color: #fff;
      }
    }
  }
  .invite-tab-content {
    height: 504px;
    overflow-y: auto;
    padding: 10px 30px;
    .no-data-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    .no-data-img {
      width: 160px;
      height: 183px;
    }
    .no-data-text {
      margin-top: 40px;
      font-size: 28px;
      color: #8f8f94;
    }
  }
}
.rules-box {
  margin-top: 30px;
  .rules-content {
    padding: 0 30px 48px;
    font-size: 26px;
    letter-spacing: 4px;
    color: #81531b;
    > div {
      line-height: 48px;
    }
  }
}
.footer-text {
  margin-top: 60px;
  margin-bottom: 174px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  color: #81531b;
}
.btn {
  position: fixed;
  bottom: 25px;
  z-index: 10;
  width: 651px;
  height: 121px;
  margin-top: 53px;
  margin-left: 49px;
}
.boxLoading {
  .boxLoading(72px);
  margin-top: -40px;
}
.tab-header-bg {
  position: relative;
  &::after {
    content: "";
    display: block;
    width: 100px;
    height: 20px;
    position: absolute;
    top: -20px;
    box-shadow: 0 20px 40px -8px #81531b;
  }
}
.left-header-bg::after {
  left: 80px;
}
.right-header-bg::after {
  right: 80px;
}
.center-header-bg::after {
  right: calc(50% - 50px);
}
</style>
