<template>
  <div class="tf-white-bg">
    <van-nav-bar :border="false" :fixed="true" placeholder>
      <template #left>
        <i class="van-icon van-icon-arrow-left van-nav-bar__arrow" @click="goBack"></i>
        电影
      </template>
      <template #right>
        <van-field></van-field>
      </template>
    </van-nav-bar>
    <van-swipe
      v-if="swipeImages && swipeImages.length"
      :autoplay="6000"
      :lazy-render="true"
      @change="swipeChange"
      class="home-swipe"
      indicator-color="#fff"
    >
      <van-swipe-item
        v-for="(item, i) in swipeImages"
        :key="i"
        @click="$router.push(item.url)"
      >
        <van-image
          :src="item.img"
          v-imageCach="item.img"
          class="swipe-item__image"
        />
      </van-swipe-item>
    </van-swipe>
    <!-- 功能列表 -->
    <div>
      <div @click="goList(1)"><div></div><div>电影</div></div>
      <div @click="goList(2)"><div></div><div>影院</div></div>
      <div @click="goOrder"><div></div><div>订单</div></div>
    </div>
    <!-- 附近影院 -->
  </div>
</template>

<script>
import { handlePermission } from '@/utils/permission'
import { getfilmlist, getcinemanearby } from '@/api/movie'
import { bMapGetLocationInfo } from '@/utils/util'
export default {
  name: 'movieIndex',
  data () {
    return {
      swipeImages: []
    }
  },
  created () {
    // 若是未开启，进入此页面弹出。必须强制授权定位，不授权则退出此页面
    if (process.env.VUE_APP_IS_APP === '1') {
      handlePermission({
        name: 'location',
        title: '定位服务未开启',
        message: '此功能需要授权定位权限才能更好为您提供服务，请授权',
        confirmButtonText: '开启'
      })
        .then(() => {
          this.pageInit()
        })
        .catch(() => {
          this.goBack()
        })
    }
  },
  methods: {
    // 页面初始化获取
    pageInit () {
      this.getfilmlist(1)
      this.getfilmlist(2)
    },
    // 获取影片资料(列表) type:1执映2待映
    getfilmlist (type) {
      getfilmlist({
        type
      }).then(({ data }) => {

      })
    },
    // 获取附近影院
    // 显示/不显示：若是没有开启位置定位，用户有小区则以小区为定位；若是也没小区，则不显示这个板块(页面一定要开启位置定位)
    getcinemanearby () {
      // 获取当前地址信息 adCode:行政区编码
      bMapGetLocationInfo().then(({ adCode, lon, lat }) => {
        getcinemanearby({
          lat,
          type: 2, // type=1城市ID，type=2区域ID
          id: adCode,
          lng: lon // 经度
        }).then(({ data }) => {})
      })
    },
    // 跳转影片/影院，1：影片，2：影院
    goList (type) {
      this.$router.push({
        name: 'movieList',
        query: {
          type
        }
      })
    },
    // 跳转电影票订单
    goOrder () {
      this.$router.push({
        name: ''
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style></style>
