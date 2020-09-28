<template>
  <div class="tf-bg tf-column tf-screen">
    <div class="header-bg"></div>
    <page-nav-bar></page-nav-bar>
    <van-notice-bar v-if="noticeList.length" class="swiper-nav" left-icon="volume-o" :scrollable="false">
      <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
        <van-swipe-item
          v-for="item in noticeList"
          :key="item.id"
          @click="goNotice(item)"
        >{{item.title}}</van-swipe-item>
      </van-swipe>
    </van-notice-bar>
    <appList :list="mainAppList"></appList>
    <div class="tf-flex-center tf-flex-item">
      <div class="key-box" @click="goEntrance">
        <span class="tf-icon tf-icon-kaisuo"></span>
      </div>
    </div>
  </div>
</template>

<script>
import pageNavBar from '@/components/page-nav-bar/index.vue'
import appList from './components/app-list.vue'
import { NoticeBar, swipe, SwipeItem, Toast, Dialog } from 'vant'
import { queryAllApp, getNoticeLbList } from '@/api/butler.js'
import { mapGetters } from 'vuex'
export default {
  name: 'butler',
  components: {
    pageNavBar,
    appList,
    [NoticeBar.name]: NoticeBar,
    [swipe.name]: swipe,
    [SwipeItem.name]: SwipeItem
  },
  data () {
    return {
      noticeList: [],
      appList: [],
      ymjObj: {}
    }
  },
  computed: {
    ...mapGetters(['userType', 'userInfo']),
    mainAppList () {
      return this.appList.filter(obj => {
        if (obj.id === '1') {
          this.ymjObj = obj
          return false
        }
        return true
      })
    }
  },
  // created () {
  //   this.queryAllApp()
  //   // this.getNoticeLbList()
  // },
  activated () {
    this.queryAllApp()
    this.getNoticeLbList()
  },
  methods: {
    /* 获取管家全部应用 */
    queryAllApp () {
      queryAllApp().then((res) => {
        this.appList = res.data
      })
    },
    /* 获取通知轮播列表 */
    getNoticeLbList () {
      getNoticeLbList().then(({ data }) => {
        this.noticeList = data
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
      this.mtjEvent({
        eventId: 27
      })
    },
    /* 跳转云门禁 */
    goEntrance () {
      this.$router.push('/pages/butler/entrance/index')
    }
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
      if (this.userInfo.bsbx_allots === '1' && to.name === 'repairsIndex') {
        next()
        return
      }
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
    } else if (to.name === 'entranceIndex' && this.ymjObj.mj_status == '0') {
      Toast('小区暂未开放此功能')
      next(false)
    } else {
      next()
    }
  }
}
</script>

<style lang="less" scoped>
.header-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 750px;
  height: 344px;
  background-image: linear-gradient(to right, @red, @red-dark);
}
.swiper-nav {
  margin: 10px 20px 0;
  height: 88px;
  border-radius: @border-radius-sm;
  background-color: #fff;
  opacity: 0.6;
  /deep/ .van-notice-bar__content {
    width: 100%;
  }
}
.notice-swipe {
  height: 88px;
  /deep/ .van-swipe-item {
    line-height: 88px;
  }
}
.key-box {
  width: 280px;
  height: 280px;
  text-align: center;
  border: 10px solid #ffdbd9;
  border-radius: 140px;
  background-image: linear-gradient(to bottom right, @red, @red-dark);
}
.tf-icon {
  line-height: 260px;
  font-size: 160px;
  text-align: center;
  color: #fff;
}
</style>
