<template>
  <div class="tf-bg-white tf-body">
    <div class="home-header" :style="{'background': headerColor}">
      <page-nav-bar :class="{'black-page-nav': scrollStatus}" search></page-nav-bar>
      <van-notice-bar
        v-if="noticeList.length"
        v-show="!scrollStatus"
        class="home-notice"
        left-icon="volume-o"
        :scrollable="false"
      >
        <van-swipe class="notice-swipe" vertical :autoplay="3000" :show-indicators="false">
          <van-swipe-item
            v-for="item in noticeList"
            :key="item.id"
            @click="goNotice(item)"
          >{{item.title}}</van-swipe-item>
        </van-swipe>
      </van-notice-bar>
    </div>
    <div class="tf-body-container" :class="{'no-notice': !noticeList.length}" @scroll.passive="onScroll">
      <van-swipe
        class="home-swipe"
        :autoplay="6000"
        :lazy-render="true"
        indicator-color="#fff"
        @change="swipeChange"
      >
        <van-swipe-item v-for="(item, i) in swipeImages" :key="i" @click="$router.push(item.url)">
          <van-image class="swipe-item__image" :src="item.img" />
        </van-swipe-item>
      </van-swipe>
      <van-grid class="app-box" :border="false" :column-num="5">
        <van-grid-item v-for="(item, index) in myAppList" :key="index" :to="item.url">
          <img class="app-box__image" :src="item.icon_image" />
          <span class="app-box__text">{{item.application}}</span>
        </van-grid-item>
        <van-grid-item key="all" to="/applist">
          <img class="app-box__image" src="@/assets/imgs/home_all.png" />
          <span class="app-box__text">全部</span>
        </van-grid-item>
      </van-grid>
      <div class="coin-box">
        <div class="coin-box__header">
          <div class="coin-box__title" @click="goHappiness">
            幸福币专区
            <span v-if="userInfo.signin_today == '0'" class="sign-btn" @click.stop="sign">签到</span>
            <span class="coin-number" v-else>
              <span class="tf-icon tf-icon-xingfubi"></span>
              <span>{{userInfo.credits}}</span>
            </span>
          </div>
          <!-- <van-notice-bar
            v-if="1"
            class="coin-message"
            :scrollable="false"
            color="#8F8F94"
            background="#fff"
            @click="goHappiness"
          >
            <van-swipe class="notice-swipe" vertical :autoplay="3000" :show-indicators="false">
              <van-swipe-item v-for="(item, i) in 6" :key="i">
                <div class="coin-message-name">关于中秋节活动方式投票</div>
                <div class="coin-message-number">+10</div>
              </van-swipe-item>
            </van-swipe>
          </van-notice-bar>-->
        </div>
        <div class="coin-box__content">
          <div class="coin-image-box">
            <van-image
              class="coin-image"
              v-for="(item, i) in creditsGoods"
              :key="i"
              :src="item.thumb"
              @click="goCoinCommodity(item)"
            >
              <div class="coin-tag">
                <span class="tf-icon tf-icon-xingfubi"></span>
                <span>{{item.credits}}</span>
              </div>
            </van-image>
          </div>
        </div>
      </div>
      <div class="life-box" v-if="bargainList && bargainList.length">
        <div class="life-box__title" @click="goSpecialSale">9.9特卖</div>
        <div class="life-box__description" @click="goSpecialSale">
          省钱好机会
          <span class="tf-icon tf-icon-right"></span>
        </div>
        <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
          <van-swipe-item v-for="(item, i) in bargainList" :lazy-render="true" :key="i">
            <tf-image-list :data="item" :column="3" srcKey="thumb" @click="clickSpecialSale"></tf-image-list>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="life-box tf-mt-base" v-if="ollageGoods && ollageGoods.length">
        <div class="life-box__title" @click="goTimeLimit">限时闪购</div>
        <div class="life-box__description" @click="goTimeLimit">
          惊喜折扣限时抢
          <span class="tf-icon tf-icon-right"></span>
        </div>
        <van-swipe class="my-swipe" :autoplay="3000" :lazy-render="true" :show-indicators="false">
          <van-swipe-item v-for="(item, i) in ollageGoods" :key="i">
            <tf-image-list :data="item" :column="2" srcKey="thumb" @click="clickTimeLimit">
              <template v-slot:tag="{img}">
                <div class="price-tag">{{img.s_price}}</div>
              </template>
            </tf-image-list>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="community-box">
        <div class="community-box__title" @click="goCommunity">
          社区活动
          <span class="tf-icon tf-icon-right"></span>
        </div>
        <div class="activity-list">
          <div
            v-for="(item, i) in activityList"
            :key="i"
            class="activity-item"
            @click="goActivity(item)"
          >
            <van-image class="activity-item__image" :src="item.thumbnail">
              <template v-slot>
                <div class="activity-item__description">{{item.joins}}人已报名</div>
              </template>
            </van-image>
            <div class="activity-info">
              <div class="activity-info__day">
                <span class="tf-text">{{new Date(item.stime.replace(/-/g, '/')).getDate()}}</span>
                <span
                  class="font20"
                >{{new Date(item.stime.replace(/-/g, '/')).getMonth() | monthText}}</span>
              </div>
              <div class="activity-info__right">
                <div class="activity-info__title">{{item.title}}</div>
                <div class="activity-info__time">报名截止：{{item.etime}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <van-notice-bar class="front-page" :scrollable="false">
        <template v-slot:left-icon>
          <img
            class="front-page__tag"
            src="@/assets/imgs/home_toutiao.png"
            @click="$router.push('/neighbours?active=3')"
          />
        </template>
        <van-swipe
          v-if="frontList.length"
          class="notice-swipe"
          vertical
          :autoplay="3000"
          :show-indicators="false"
        >
          <van-swipe-item v-for="(item, i) in frontList" :key="i">
            <div
              class="front-page__text van-multi-ellipsis--l2"
              @click="clickFront(item)"
            >{{item.title}}</div>
          </van-swipe-item>
        </van-swipe>
      </van-notice-bar>
    </div>
    <!-- 新手引导 -->
    <div v-if="guideShow" @click="guideStep" :class="[guideIndex > 1 ? 'end-bottom' : '', 'mask-bg']" :style="{'padding-top': $store.state.paddingTop+'px'}">
      <img :src="guideList[guideIndex]">
    </div>
  </div>
</template>

<script>
import {
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Image,
  NoticeBar,
  Toast,
  Dialog
} from 'vant'
import pageNavBar from '@/components/page-nav-bar/index'
import tfImageList from '@/components/tf-image-list'
import {
  getMyApp,
  getBannerIndex,
  getBargainGoods,
  getOllageGoods,
  getCreditsGoodsList,
  getMhttList
} from '@/api/home'
import { getNoticeLbList } from '@/api/butler.js'
import { getActivityList } from '@/api/neighbours'
import { signin } from '@/api/personage'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image,
    [NoticeBar.name]: NoticeBar,
    pageNavBar,
    tfImageList
  },
  data () {
    return {
      activeIndex: undefined,
      scrollStatus: false,
      headerColor: '#fff', // 头部颜色
      swipeImages: [], // 轮播图
      myAppList: [], // 我的应用
      noticeList: [], // 通知列表
      bargainList: [], // 特价商品
      ollageGoods: [], // 闪购商品
      creditsGoods: [], // 幸福币商品
      frontList: [],
      activityList: [],
      guideShow: false, //是否显示新手引导图
      guideIndex: 0,
      guideList: [process.env.VUE_APP_DOMAIN_NAME+'/library/img/app_img/guide_01.png',process.env.VUE_APP_DOMAIN_NAME+'/library/img/app_img/guide_02.png',process.env.VUE_APP_DOMAIN_NAME+'/library/img/app_img/guide_03.png',process.env.VUE_APP_DOMAIN_NAME+'/library/img/app_img/guide_04.png',process.env.VUE_APP_DOMAIN_NAME+'/library/img/app_img/guide_05.png']
    }
  },
  computed: {
    ...mapGetters(['userType', 'userInfo'])
  },
  created () {
    var guidetype = api.getPrefs({ sync: true, key: 'guidetype' });
    if(!guidetype){
      this.guideShow = true;
    }

    this.$store.dispatch('getMyAccount')
    this.getBannerIndex()
    this.getNoticeLbList()
    this.getMyApp()
    this.getCreditsGoodsList()
    this.getBargainGoods()
    this.getActivityList()
    this.getOllageGoods()
    this.getMhttList()
  },
  activated () {
    this.swipeChange(0)
  },
  methods: {
    /* 新手引导步骤 */
    guideStep(){
      this.guideIndex = this.guideIndex + 1;
      if(this.guideIndex > 4){
        this.guideShow = false;
        api.setPrefs({ key: 'guidetype', value: 1 });
      }
    },
    /* 获取通知轮播列表 */
    getNoticeLbList () {
      getNoticeLbList().then(({ data }) => {
        this.noticeList = data
      })
    },
    /* 获取轮播图 */
    getBannerIndex () {
      getBannerIndex().then((res) => {
        this.swipeImages = res.data
        this.swipeChange(0)
      })
    },
    /* 获取我的app列表，并手动打入一个全部 */
    getMyApp () {
      getMyApp().then((res) => {
        this.myAppList = res.data
      })
    },
    /* 轮播图change事件 */
    swipeChange (index) {
      this.activeIndex = index
      if (!this.scrollStatus) {
        this.headerColor =
        (this.swipeImages[index] && this.swipeImages[index].color_value) ||
        '#eb5841'
      }
    },
    /* 签到 */
    sign () {
      signin().then((res) => {
        Toast({
          message: '签到成功   幸福币+10'
        })
        this.$store.dispatch('getMyAccount')
      })
    },
    /* 获取幸福币专区 */
    getCreditsGoodsList () {
      getCreditsGoodsList().then((res) => {
        this.creditsGoods = res.data
      })
    },
    /* 跳转幸福币 */
    goHappiness () {
      this.$router.push('/pages/personage/happiness-coin/index')
    },
    /* 幸福币专区商品详情 */
    goCoinCommodity () {
      console.log('幸福币专区')
    },
    /* 获取9.9特卖区 */
    getBargainGoods () {
      getBargainGoods().then((res) => {
        this.bargainList = res.data
      })
    },
    /* 跳转9.9特卖专区 */
    goSpecialSale () {
      this.$router.push('/store/special-sale')
    },
    /* 9.9特卖专区图片点击 */
    clickSpecialSale ({ goods_id }) {
      this.$router.push(`/store/goods-detail?id=${goods_id}`)
    },
    /* 获取闪购专区 */
    getOllageGoods () {
      getOllageGoods().then((res) => {
        this.ollageGoods = res.data
      })
    },
    /* 跳转限时闪购列表 */
    goTimeLimit () {
      this.$router.push('/store/flash-purchase')
    },
    /* 跳转限时闪购详情 */
    clickTimeLimit ({ goods_id }) {
      this.$router.push(`/store/goods-detail?id=${goods_id}`)
    },
    /* 获取活动列表 */
    getActivityList () {
      getActivityList().then((res) => {
        this.activityList = res.data
      })
    },
    /* 跳转活动详情 */
    goActivity ({ id }) {
      this.$router.push(`/pages/neighbours/details?articleType=2&id=${id}`)
    },
    /* 跳转社区活动 */
    goCommunity () {
      this.$router.push({
        path: '/neighbours',
        query: {
          active: 2
        }
      })
    },
    /* 跳转公告详情页 */
    goNotice ({ id }) {
      this.$router.push({
        name: 'noticeDetails',
        query: {
          noticeId: id
        }
      })
    },
    /* 点击头条跳转相应内容 */
    clickFront ({ id }) {
      this.$router.push(`/pages/neighbours/details?articleType=1&id=${id}`)
    },
    /* 获取美好头条 */
    getMhttList () {
      getMhttList().then((res) => {
        this.frontList = res.data || []
      })
    },
    /* 滚动行为 */
    onScroll ({ target }) {
      if (target.scrollTop > 0) {
        this.scrollStatus = true
        this.headerColor = '#fff'
      } else {
        this.scrollStatus = false
        this.swipeChange(this.activeIndex)
      }
    }
  },
  filters: {
    monthText (value) {
      const numText = [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一',
        '十二'
      ]
      return numText[value]
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (from.name === 'applist') {
        vm.getMyApp()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    const butlerList = [
      'entranceIndex',
      'noticeIndex',
      'repairsIndex',
      'freeserverIndex',
      'visitorIndex',
      'compraiseIndex',
      'questionnaireIndex',
      'propertyIndex',
      'convenienceIndex',
      'noticeDetails'
    ]
    if (this.userType == 0 && butlerList.indexOf(to.name) !== -1) {
      Dialog.confirm({
        title: '提示',
        message: '您尚未认证房间，是否去认证？',
        confirmButtonText: '去认证'
      }).then((res) => {
        this.$router.push(
          '/pages/personage/house/attestation?type=1&mode=0&select=1'
        )
      })
      next(false)
    } else {
      next()
    }
  }
}
</script>

<style lang='less' scoped>
.mask-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  background-color: rgba(0,0,0,0.6);
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  img {
    width: 100%;
    object-fit: contain;
  }
}
.mask-bg.end-bottom {
  align-items: flex-end;
}
.tf-bg-white {
  height: 100%;
  /deep/ .tf-image-grid .van-grid-item__content--square {
    background: #f4f4f4;
    border-radius: 10px;
  }
}
.black-page-nav {
  /deep/ .tf-icon {
    color: #222;
  }
  /deep/ .tf-text {
    color: #222;
  }
  /deep/ .van-info {
    background: #eb5841;
    color: #fff;
  }
}
.home-notice {
  height: 96px;
  margin: 0 20px 30px;
  background: #fff;
  /deep/ .notice-swipe {
    height: 66px;
    .van-swipe-item {
      line-height: 66px;
      color: #222;
    }
  }
  /deep/ .van-notice-bar__content {
    color: #222;
  }
  /deep/ .van-notice-bar__left-icon {
    color: #ffa110;
  }
}
.home-header {
  position: fixed;
  // top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}
.tf-body-container {
  padding-top: 184px;
}
.home-swipe {
  height: 344.4px;
}
.swipe-item__image {
  width: 100%;
  height: 344.4px;
}
.no-notice {
  padding-top: 88px;
}
/* app列表 */
.app-box {
  padding: 30px 20px;
  &__image {
    width: 60px;
    height: 60px;
  }
  &__text {
    margin-top: 20px;
    font-size: 24px;
    line-height: 1;
  }
  /deep/ .van-grid-item__content {
    padding-top: 30px;
    padding-bottom: 30px;
  }
}
/* 幸福币专区 */
.coin-box {
  margin: 0 20px 40px;
  padding-bottom: 30px;
  box-shadow: 0px 0px 12px 1px rgba(99, 99, 99, 0.2);
  border-radius: 10px;
  &__header {
    padding: 30px;
    border-radius: 10px;
    background: linear-gradient(0deg, #ffffff, #ffdec8);
  }
  &__title {
    display: flex;
    justify-content: space-between;
    font-size: 34px;
    font-weight: 500;
    color: #ca864e;
    .sign-btn {
      padding: 0 30px;
      height: 44px;
      background: linear-gradient(90deg, @red, @red-dark);
      border-radius: 22px;
      font-size: 24px;
      color: #fff;
      display: flex;
      align-items: center;
    }
  }
  &__content {
    padding: 0 30px;
  }
  .coin-image-box {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    height: 160px;
    .coin-image {
      height: 100%;
      flex: 0 0 160px;
      /deep/ .van-image__img {
        border-radius: 4px;
      }
    }
    .coin-image + .coin-image {
      margin-left: 20px;
    }
  }
  /deep/ .van-notice-bar__content.van-ellipsis {
    width: 100%;
  }
}
/* 专区 */
.life-box {
  padding: 30px 20px;
  &__title {
    font-size: 34px;
    font-weight: 500;
    line-height: 1;
    margin-bottom: 20px;
  }
  &__description {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    line-height: 1;
    margin-bottom: 30px;
  }
  /deep/ .van-image__img {
    border-radius: 10px;
  }
  /deep/ .van-image__error {
    border-radius: 10px;
  }
}
.community-box {
  padding-left: 20px;
  margin-bottom: 60px;
  &__title {
    font-size: 34px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;
    margin-bottom: 20px;
  }
  .activity-list {
    display: flex;
    padding-right: 20px;
    overflow-x: auto;
    overflow-y: hidden;
    .activity-item {
      width: 480px;
      flex-shrink: 0;
    }
    .activity-item + .activity-item {
      margin-left: 20px;
    }
    .activity-item__image {
      width: 100%;
      height: 270px;
      background: #f0f0f0;
      border-radius: 10px 10px 0px 0px;
    }
    /deep/ .activity-item__description {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 66px;
      line-height: 66px;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 0px 0px 10px 10px;
      font-size: 24px;
      color: #fff;
      text-align: center;
    }
    .activity-info {
      display: flex;
      margin-top: 10px;
      width: 100%;
      .activity-info__right {
        width: calc(100% - 94px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      &__day {
        width: 74px;
        height: 74px;
        background: #f2f2f4;
        border-radius: 4px;
        margin-right: 20px;
        color: #8f8f94;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
      }
      &__title {
        width: 100%;
        font-size: 28px;
        @text-ellipsis();
      }
      &__time {
        font-size: 24px;
        color: @gray-7;
      }
    }
  }
}
.front-page {
  margin: 20px 20px 80px;
  padding: 24px 30px 30px;
  height: 142px;
  background: url("../../assets/imgs/toutiao_bg.png") no-repeat;
  background-size: contain;
  border-radius: 10px;
  .notice-swipe {
    height: 80px;
    /deep/ .van-swipe-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  &__tag {
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }
  &__text {
    height: 100%;
    font-size: 26px;
    line-height: 40px;
    color: #222;
    display: flex;
    align-items: center;
    white-space: normal;
  }
}
.tf-mt-base {
  margin-top: 0 !important;
}
.tf-icon-right {
  font-size: 26px;
  color: #383838;
  line-height: 1;
}
.price-tag {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 140px;
  height: 60px;
  line-height: 60px;
  background: linear-gradient(-90deg, @orange-dark, @orange);
  border-radius: 30px 30px 0px 30px;
  color: #fff;
  text-align: center;
  font-size: 24px;
}
/deep/ .van-notice-bar__content {
  width: 100%;
}
/deep/ .coin-tag {
  position: absolute;
  left: 20px;
  bottom: 10px;
  padding: 0 23px;
  height: 36px;
  line-height: 36px;
  font-size: 24px;
  color: #fff;
  background: @orange-dark;
  opacity: 0.8;
  border-radius: 18px;
  .tf-icon {
    margin-right: 6px;
  }
}
.coin-number {
  font-size: 36px;
  font-weight: 500;
  color: @orange-dark;
  .tf-icon {
    font-size: 28px;
  }
}
.coin-message {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  font-size: 24px;
  padding: 0 20px;
  border: 1px dashed #ca864e;
  border-radius: 4px;
  margin-top: 30px;
  color: #ca864e;
  background: none !important;
  .notice-swipe {
    height: 60px;
    /deep/ .van-swipe-item {
      flex: 1;
      display: flex;
      justify-content: space-between;
      line-height: 60px;
      color: #ca864e;
    }
  }
  &-name {
    line-height: 66px;
    display: flex;
    align-items: center;
    &::before {
      content: "";
      display: block;
      width: 8px;
      height: 8px;
      background: #ca864e;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  &-number {
    line-height: 60px;
  }
}
.font20 {
  font-size: 20px;
}
</style>
