<template>
  <div class="tf-bg tf-screen tf-column">
    <div class="header-bg"></div>
    <page-nav-bar :status="1" name="123"></page-nav-bar>
    <van-notice-bar class="swiper-nav" left-icon="volume-o" :scrollable="false">
      <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
        <van-swipe-item v-for="item in noticeList" :key="item.id" @click="goNotice">{{item.content}}</van-swipe-item>
      </van-swipe>
    </van-notice-bar>
    <appList :list="appList"></appList>
    <div class="tf-flex-center tf-flex-item">
      <div class="key-box" @click="goEntrance">
        <span class="tf-icon tf-icon-key"></span>
      </div>
    </div>
  </div>
</template>

<script>
import pageNavBar from '@/components/page-nav-bar/index.vue'
import appList from './components/app-list.vue'
import { NoticeBar, swipe, SwipeItem } from 'vant'
import { queryAllApp } from '@/api/butler.js'
export default {
  name: 'butler',
  components: {
    pageNavBar,
    appList,
    [NoticeBar.name]: NoticeBar,
    [swipe.name]: swipe,
    [SwipeItem.name]: SwipeItem
  },
  created () {
    // queryAllApp().then(res => {
    //   if (res.success) {
    //     this.appList = res.data.records
    //   }
    // })
  },
  data () {
    return {
      noticeList: [
        {
          id: 1,
          content: 123123123
        },
        {
          id: 2,
          content: 'ffffffffffffffffff'
        }
      ],
      appList: [
        {
          icon_image: '/static/logo.png',
          application: '公告通知',
          url: '/pages/butler/notice/index'
        },
        {
          icon_image: '/static/logo.png',
          application: '报事报修',
          url: '/pages/butler/repairs/index'
        },
        {
          icon_image: '/static/logo.png',
          application: '免费服务',
          url: '/pages/butler/freeserver/index'
        },
        {
          icon_image: '/static/logo.png',
          application: '访客邀约',
          url: '/pages/butler/visitor/index'
        },
        {
          icon_image: '/static/logo.png',
          application: '投诉表扬',
          url: '/pages/butler/compraise/index'
        },
        {
          icon_image: '/static/logo.png',
          application: '小区活动',
          url: '/neighbours'
        },
        {
          icon_image: '/static/logo.png',
          application: '问卷投票',
          url: '/pages/butler/questionnaire/index'
        },
        {
          icon_image: '/static/logo.png',
          application: '呼叫物业',
          url: '/pages/butler/call-property/index'
        },
        {
          icon_image: '/static/logo.png',
          application: '便民电话',
          url: '/pages/butler/convenience-phone/index'
        }
      ]
    }
  },
  methods: {
    goNotice (item) {
      const url = `/pages/butler/notice/details?id=${item.id}`
      this.$router.push(url)
    },
    goEntrance () {
      this.$router.push('/pages/butler/entrance/index')
    }
  }
}
</script>

<style lang="less" scoped>
.header-bg {
  position: absolute;
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
