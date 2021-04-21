<template>
  <div class="tf-bg-white tf-body">
    <div
      class="home-header"
      :style="[
        { background: headerColor },
        { 'padding-top': `${$store.state.paddingTop}px` }
      ]"
    >
      <page-nav-bar
        :class="{ 'black-page-nav': scrollStatus }"
        search
      ></page-nav-bar>
    </div>
    <div
      class="tf-body-container"
      id="home-body-container"
      @scroll.passive="onScroll"
    >
      <div
        v-if="noticeList.length"
        class="home-notice-box"
        id="home-notice-box"
        :style="{ background: headerColor }"
      >
        <van-notice-bar
          class="home-notice"
          left-icon="volume-o"
          :scrollable="false"
        >
          <van-swipe
            class="notice-swipe"
            vertical
            :autoplay="3000"
            :show-indicators="false"
          >
            <van-swipe-item
              v-for="item in noticeList"
              :key="item.id"
              @click="goNotice(item)"
              >{{ item.title }}</van-swipe-item
            >
          </van-swipe>
        </van-notice-bar>
      </div>
      <van-swipe
        v-if="swipeImages && swipeImages.length"
        class="home-swipe"
        :autoplay="6000"
        :lazy-render="false"
        indicator-color="#fff"
        @change="swipeChange"
      >
        <van-swipe-item
          v-for="(item, i) in swipeImages"
          :key="i"
          @click="$router.push(item.url)"
        >
          <van-image class="swipe-item__image" :src="item.img" />
        </van-swipe-item>
      </van-swipe>
      <van-grid class="app-box" :border="false" :column-num="5">
        <van-grid-item
          v-for="(item, index) in myAppList"
          :key="index"
          @click="goApp(item)"
        >
          <img class="app-box__image" :src="item.icon_image" />
          <span class="app-box__text">{{ item.application }}</span>
        </van-grid-item>
        <van-grid-item key="all" to="/applist">
          <img class="app-box__image" src="@/assets/imgs/home_all.svg" />
          <span class="app-box__text">全部</span>
        </van-grid-item>
      </van-grid>
      <!-- 幸福币专区 -->
      <div class="coin-box">
        <div class="coin-box__header">
          <div ref="sign" class="coin-box__title" @click="goHappiness">
            <img
              class="coin-box__header-logo"
              src="@/assets/imgs/home-credits.png"
            />
            <van-button
              v-if="userInfo.signin_status === 0"
              v-preventReClick
              :loading="signLoading"
              class="sign-btn"
              @click.stop="sign"
              >签到</van-button
            >
            <div class="coin-number-box" v-else>
              <div class="coin-number">{{ userInfo.credits }}</div>
            </div>
          </div>
        </div>
        <div class="coin-box__content">
          <div class="coin-image-box">
            <van-image
              class="coin-image"
              v-for="(item, i) in creditsGoods"
              :key="i"
              :src="item.thumb"
              v-imageCach="item.thumb"
              @click="goCoinCommodity(item)"
            >
              <div class="coin-tag">
                <span class="tf-icon tf-icon-xingfubi"></span>
                <span>{{ item.credits }}</span>
              </div>
            </van-image>
          </div>
        </div>
      </div>
      <div class="goods-container" v-if="bargainVisible || ollageGoodsVisible">
        <!-- 9.9特卖 -->
        <div
          v-if="bargainVisible"
          class="life-box bargain-sale"
          :class="{ 'bargain-sale-cover': !ollageGoodsVisible }"
        >
          <div class="life-box__title" @click="goSpecialSale">9.9特卖</div>
          <div class="life-box__description" @click="goSpecialSale">
            省钱好机会
            <span class="tf-icon tf-icon-right"></span>
          </div>
          <van-swipe
            ref="bargainSwipe"
            :autoplay="3000"
            :show-indicators="false"
          >
            <van-swipe-item
              v-for="(item, i) in bargainSwipeList"
              :lazy-render="true"
              :key="i"
            >
              <tf-image-list
                :data="item"
                :column="ollageGoodsVisible ? 1 : 3"
                srcKey="thumb"
                @click="clickSpecialSale"
              >
                <template v-slot:tag="{ img }">
                  <div class="price-tag">￥{{ img.te_price / 100 }}</div>
                </template>
              </tf-image-list>
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- 限时闪购 -->
        <div
          v-if="ollageGoodsVisible"
          class="life-box ollage-goods"
          :class="{ 'life-box-cover': !bargainVisible }"
          :style="{ flex: bargainVisible ? '2' : '1' }"
        >
          <div class="life-box__title" @click="goTimeLimit">限时闪购</div>
          <div class="life-box__description" @click="goTimeLimit">
            惊喜折扣限时抢
            <span class="tf-icon tf-icon-right"></span>
          </div>
          <van-swipe
            ref="ollageGoods"
            :autoplay="3000"
            :show-indicators="false"
          >
            <van-swipe-item v-for="(item, i) in ollageSwipeList" :key="i">
              <tf-image-list
                :data="item"
                :column="bargainVisible ? 2 : 3"
                srcKey="thumb"
                @click="clickTimeLimit"
              >
                <template v-slot:tag="{ img }">
                  <div class="price-tag">￥{{ img.s_price }}</div>
                </template>
              </tf-image-list>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <!-- 热映电影 -->
      <div class="community-box" v-if="filmlist && filmlist.length">
        <div class="community-box__title" @click="goMovie">
          热映电影
          <span class="tf-icon tf-icon-right"></span>
        </div>
        <div class="film-list">
          <film-box
            v-for="(film, i) in filmlist"
            :key="i"
            :data="film"
            :type="3"
          ></film-box>
        </div>
      </div>
      <!-- 社区活动 -->
      <div class="community-box" v-if="activityList && activityList.length">
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
            <van-image
              class="activity-item__image"
              :src="item.thumbnail"
              v-imageCach="item.thumbnail"
            >
            </van-image>
            <div class="activity-info">
              <div class="activity-info__date">
                <span class="activity-info__date-day">{{
                  new Date(item.stime.replace(/-/g, "/")).getDate()
                }}</span>
                <span class="activity-info__date-month">{{
                  new Date(item.stime.replace(/-/g, "/")).getMonth() | monthText
                }}</span>
              </div>
              <div class="activity-info__right">
                <div class="activity-info__title">{{ item.title }}</div>
                <div class="activity-info__time">
                  报名截止：{{ item.jtime.substr(0, 10) }}
                  <template v-if="item.joins != '0'">
                    |
                    <span
                      v-if="item.joins != '0'"
                      class="activity-item__description"
                    >
                      {{ item.joins }}人已报名
                    </span></template
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 美好头条 -->
      <div class="front-page-container">
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
              >
                {{ item.title }}
              </div>
            </van-swipe-item>
          </van-swipe>
        </van-notice-bar>
      </div>
    </div>
    <!-- 新手引导 -->
    <div
      v-if="guideShow"
      @click="guideStep"
      :class="[
        guideIndex > 1 ? 'end-bottom' : '',
        guideIndex == 1 ? 'guide-sign' : '',
        'mask-bg'
      ]"
      :style="{
        'padding-top':
          guideIndex == 1 ? guideTop + 'px' : $store.state.paddingTop + 'px'
      }"
    >
      <img
        v-show="index == guideIndex"
        v-for="(item, index) in guideList"
        :src="item"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import pageNavBar from '@/components/page-nav-bar/index'
import tfImageList from '@/components/tf-image-list'
import FilmBox from '@/views/life/movie/components/FilmBox'
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
import { getfilmlist } from '@/api/movie'
import { mapGetters } from 'vuex'
import { bulterPermission } from '@/utils/business'
import { handlePermission } from '@/utils/permission'
import { bMapGetLocationInfo } from '@/utils/util'
export default {
  name: 'home',
  components: {
    pageNavBar,
    tfImageList,
    FilmBox
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
      filmlist: [], // 热映电影列表
      activityList: [],
      signLoading: false,
      guideShow: false, // 是否显示新手引导图
      guideIndex: 0,
      guideList: [
        process.env.VUE_APP_DOMAIN_NAME + '/library/img/app_img/guide_01.png',
        process.env.VUE_APP_DOMAIN_NAME + '/library/img/app_img/guide_021.png',
        process.env.VUE_APP_DOMAIN_NAME + '/library/img/app_img/guide_03.png',
        process.env.VUE_APP_DOMAIN_NAME + '/library/img/app_img/guide_04.png',
        process.env.VUE_APP_DOMAIN_NAME + '/library/img/app_img/guide_05.png'
      ],
      guideTop: 0
    }
  },
  computed: {
    ...mapGetters(['userType', 'userInfo']),
    // 9.9特卖显示
    bargainVisible () {
      return this.bargainList && this.bargainList.length
    },
    // 限时闪购显示
    ollageGoodsVisible () {
      return this.ollageGoods && this.ollageGoods.length
    },
    // 限时抢购轮播列表，如果存在9.9特卖，一次轮播三个商品
    ollageSwipeList () {
      if (!this.bargainVisible) {
        const arr = [].concat(
          ...this.ollageGoods.map(obj => {
            return obj.map(item => item)
          })
        )
        const newArr = [] // 声明数组
        arr.forEach((item, index) => {
          const page = Math.floor(index / 3) // 计算该元素为第几个素组内
          if (!newArr[page]) {
            // 判断是否存在
            newArr[page] = []
          }
          newArr[page].push(item)
        })
        return newArr
      }
      return this.ollageGoods
    },
    // 9.9特卖轮播列表，如果存在限时抢购，一次轮播一个商品，将二维数组转换为一维数组
    bargainSwipeList () {
      if (this.ollageGoodsVisible) {
        return [].concat(
          ...this.bargainList.map(obj => {
            return obj.map(item => [item])
          })
        )
      }
      return this.bargainList
    }
  },
  created () {
    var guidetype = api.getPrefs({ sync: true, key: 'guidetype' })
    if (!guidetype) {
      this.guideShow = true
    }
    this.$store.dispatch('getMyAccount')
  },
  activated () {
    if (this.scrollTop) {
      document.getElementById('home-body-container').scrollTop = this.scrollTop
    } else {
      this.scrollStatus = false
    }
    this.getMyApp()
    this.getBannerIndex()
    this.getNoticeLbList()
    this.getCreditsGoodsList()
    this.getBargainGoods()
    this.getLocationInfo()
    this.getActivityList()
    this.getOllageGoods()
    this.getMhttList()
    this.swipeChange(0)
  },
  methods: {
    /* 新手引导步骤 */
    guideStep () {
      this.guideIndex = this.guideIndex + 1
      this.guideTop = this.guideIndex == 1 ? this.$refs.sign.offsetTop : 0
      if (this.guideIndex > 4) {
        this.guideShow = false
        api.setPrefs({ key: 'guidetype', value: 1 })
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
      getBannerIndex().then(res => {
        this.swipeImages = res.data
        this.swipeChange(0)
      })
    },
    /* 获取我的app列表，并手动打入一个全部 */
    getMyApp () {
      getMyApp().then(res => {
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
    },
    /* 获取幸福币专区 */
    getCreditsGoodsList () {
      getCreditsGoodsList().then(res => {
        this.creditsGoods = res.data
      })
    },
    /* 跳转幸福币 */
    goHappiness () {
      this.$router.push('/pages/personage/happiness-coin/index')
    },
    /* 幸福币专区商品详情 */
    goCoinCommodity (item) {
      this.$router.push(`/store/goods-detail?id=${item.id}`)
    },
    /* 获取9.9特卖区 */
    getBargainGoods () {
      getBargainGoods().then(res => {
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
      getOllageGoods().then(res => {
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
    // 获取热映影片资料(列表)
    getfilmlist (cityId = '') {
      getfilmlist({
        type: 1,
        page_index: 1,
        page_size: 3,
        city_id: cityId
      }).then(({ data }) => {
        this.filmlist = data
      })
    },
    // 获取当前地址信息
    getLocationInfo () {
      // adCode:行政区编码
      bMapGetLocationInfo()
        .then(data => {
          const { adCode } = data
          this.getfilmlist(String(adCode).substring(0, 4) + '00')
        })
        .catch(() => {
          this.getfilmlist()
        })
    },
    // 跳转电影页面
    goMovie () {
      this.$router.push({
        name: 'movieIndex'
      })
    },
    /* 获取活动列表 */
    getActivityList () {
      getActivityList().then(res => {
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
          id
        }
      })
    },
    /* 点击头条跳转相应内容 */
    clickFront ({ id }) {
      this.$router.push(`/pages/neighbours/details?articleType=1&id=${id}`)
    },
    /* 获取美好头条 */
    getMhttList () {
      getMhttList().then(res => {
        this.frontList = res.data || []
      })
    },
    /* 滚动行为 */
    onScroll ({ target }) {
      const el = document.getElementById('home-notice-box')
      const height = (el && el.clientHeight) || 0
      if (target.scrollTop > height + 15) {
        this.scrollStatus = true
        this.headerColor = '#fff'
      } else if (this.scrollStatus) {
        this.scrollStatus = false
        this.swipeChange(this.activeIndex)
      }
    },
    // 跳转到应用
    goApp ({ url, mj_status }) {
      if (url === '/pages/butler/entrance/index' && mj_status == '0') {
        Toast('小区暂未开放此功能')
      } else {
        this.$router.push(url)
      }
    },
    // 当9.9或者抢购显示隐藏状态有更改，比如从显示两个变为显示一个,触发重绘专区的轮播组件
    resizeSwipeGoods () {
      this.$nextTick(() => {
        this.$refs.bragainSwipe && this.$refs.bragainSwipe.resize()
        this.$refs.ollageGoods && this.$refs.ollageGoods.resize()
      })
    }
  },
  watch: {
    ollageGoodsVisible () {
      this.resizeSwipeGoods()
    },
    bargainVisible () {
      this.resizeSwipeGoods()
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
  beforeRouteLeave (to, from, next) {
    bulterPermission(to, from, next, this.userType, this.userInfo, () => {
      // 如果未匹配到路由
      if (to.matched.length === 0) {
        next(false)
      } else {
        const el = document.getElementById('home-body-container')
        this.scrollTop = (el && el.scrollTop) || 0
        next()
      }
    })
  }
}
</script>

<style lang="less" scoped>
.mask-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.6);
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
.guide-sign img {
  margin-top: -280px;
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
.home-notice-box {
  padding: 0 20px 30px;
}
.home-notice {
  height: 96px;
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
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}
.tf-body-container {
  padding-top: 88px;
}
.home-swipe {
  width: 100%;
  height: 345.4px;
}
.swipe-item__image {
  width: 100%;
  height: 345.4px;
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
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  &__header {
    padding: 30px;
    border-radius: 10px;
    background: linear-gradient(0deg, #ffffff, #ffe5d3);
    &-logo {
      height: 40px;
    }
  }
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 34px;
    font-weight: 500;
    color: #ca864e;
    .sign-btn {
      padding: 0 30px;
      height: 44px;
      background: linear-gradient(90deg, @red, @red-dark);
      border-radius: 22px;
      border-width: 0;
      font-size: 24px;
      color: #fff;
      display: flex;
      align-items: center;
    }
    .coin-number-box {
      display: flex;
      align-items: center;
      width: 154px;
      height: 58px;
      font-size: 28px;
      color: #fff;
      background: url("~@/assets/imgs/home-credits-num.png");
      background-size: cover;
    }
    .coin-number {
      width: 100%;
      padding-left: 50px;
      padding-right: 10px;
      text-align: center;
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
      background: #f4f4f4;
      border-radius: 10px;
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
/* 专区容器 */
.goods-container {
  display: flex;
  padding: 0 20px;
  margin-bottom: 40px;
}
/* 9.9特卖 */
.bargain-sale {
  border-radius: 10px;
  background-image: url("~@/assets/imgs/home-sale.png");
  background-size: cover;
}
.bargain-sale-cover {
  background-image: url("~@/assets/imgs/home-sale-cover.png");
}
/* 限时闪购 */
.ollage-goods {
  border-radius: 10px;
  background-image: url("~@/assets/imgs/home-limit.png");
  background-size: cover;
}
.ollage-goods-cover {
  background-image: url("~@/assets/imgs/home-limit-cover.png");
}
.bargain-sale + .ollage-goods {
  margin-left: 20px;
}
/* 专区 */
.life-box {
  flex: 1;
  width: 0;
  padding: 30px 0 0;
  /deep/ .tf-image-grid {
    height: 260px;
  }
  &__title {
    font-size: 34px;
    font-weight: 500;
    line-height: 1;
    padding-left: 20px;
    margin-bottom: 10px;
  }
  &__description {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 20px;
    font-size: 24px;
    line-height: 1;
    color: #22222280;
  }
  .tf-icon-right {
    color: #38383866;
  }
  /deep/ .van-swipe-item {
    padding: 0 10px;
  }
  /deep/ .tf-image-item {
    background: #ffffff;
    border: 4px solid #ffffff;
    border-radius: 10px;
  }
  /deep/ .van-image__error {
    border-radius: 10px;
  }
  .price-tag {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 44px;
    position: absolute;
    bottom: -19px;
    left: 50%;
    margin-left: -65px;
    background: #eb5841;
    box-shadow: 0px 4px 10px 0px rgba(209, 58, 33, 0.45);
    border-radius: 22px;
    font-size: 26px;
    line-height: 1;
    color: #fff;
  }
}
// 电影专区
.film-list {
  display: flex;
  /deep/ .film-box {
    flex: 1;
    padding-right: 20px;
    .film-info {
      flex: 1;
      width: auto;
      height: 310px;
    }
    .film-name {
      width: auto;
      font-size: 30px;
      text-align: center;
    }
    .tf-text-lg {
      font-size: 28px;
      margin: 0 2px;
    }
    .ticket-btn .tf-icon-right {
      margin-left: 4px;
    }
    .ticket-btn {
      margin-top: 14px;
    }
  }
}
/* 社区活动 */
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
      display: flex;
      flex-direction: column;
      width: 600px;
      flex-shrink: 0;
    }
    .activity-item + .activity-item {
      margin-left: 20px;
    }
    .activity-item__image {
      width: 100%;
      height: 276px;
      background: #f0f0f0;
      border-radius: 10px 10px 0px 0px;
      /deep/ .van-image__img {
        border-radius: 10px 10px 0px 0px;
        object-fit: cover;
      }
    }
    .activity-info {
      display: flex;
      width: 100%;
      height: 120px;
      background: #f2f2f4;
      border-radius: 0px 0px 10px 10px;
      &__right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 20px;
        width: 0;
      }
      &__date {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        width: 58px;
        height: calc(100% - 20px);
        margin-left: 20px;
        background: url("~@/assets/imgs/home-activity-tag.png");
        background-size: cover;
        color: #8f8f94;
        font-size: 20px;
        &-day {
          font-size: 30px;
          font-weight: 500;
          color: #ffffff;
          border-bottom: 2px solid #fff;
        }
        &-month {
          font-size: 24px;
          font-weight: 500;
          color: #ffffff;
        }
      }
      .activity-item__description {
        font-size: 24px;
        color: @red-dark;
      }
      &__title {
        width: 100%;
        font-size: 30px;
        @text-ellipsis();
      }
      &__time {
        font-size: 24px;
        color: @gray-7;
      }
    }
  }
}
.front-page-container {
  padding: 20px 20px 76px;
}
.front-page {
  padding: 30px;
  height: 146px;
  border-radius: 10px;
  border: 3px solid #222222;
  background: #fff;
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
/deep/ .van-notice-bar__content {
  width: 100%;
}
/deep/ .coin-tag {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 10px;
  padding: 0 23px;
  height: 36px;
  line-height: 36px;
  font-size: 24px;
  text-align: center;
  color: #fff;
  background: @orange-dark;
  opacity: 0.8;
  border-radius: 18px;
  .tf-icon {
    margin-right: 6px;
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
.mr10 {
  margin-right: 10px;
}
</style>
