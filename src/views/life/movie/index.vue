<template>
  <div class="tf-bg-white" @scroll="pageScroll">
    <div v-if="!scrollStatus" class="header-bg"></div>
    <van-nav-bar :border="false" :fixed="true" placeholder>
      <template #left>
        <i
          class="van-icon van-icon-arrow-left van-nav-bar__arrow"
          @click="goBack"
        ></i>
        <span>电影</span>
        <van-field class="tf-flex-item" placeholder="电影、影院" @click="goSearch"></van-field>
      </template>
    </van-nav-bar>
    <!-- 热映轮播 -->
    <van-swipe
      v-if="swipeImages && swipeImages.length"
      :autoplay="6000"
      :lazy-render="true"
      class="movie-swipe"
      indicator-color="#fff"
    >
      <van-swipe-item
        v-for="(item, i) in swipeImages"
        :key="i"
        @click="$router.push(item.url)"
      >
        <van-image
          :src="item.cover"
          v-imageCach="item.cover"
          class="swipe-item__image"
        />
      </van-swipe-item>
    </van-swipe>
    <!-- 功能列表 -->
    <div class="feature-container">
      <div class="feature-box" @click="goList('1')">
        <img class="feature-img" src="@/assets/imgs/movie_film.png" />
        <div class="tf-text">电影</div>
      </div>
      <div class="feature-box" @click="goList('2')">
        <img class="feature-img" src="@/assets/imgs/movie_cinema.png" />
        <div class="tf-text">影院</div>
      </div>
      <div class="feature-box" @click="goOrder">
        <img class="feature-img" src="@/assets/imgs/movie_order.png" />
        <div class="tf-text">订单</div>
      </div>
    </div>
    <!-- 正在热映 -->
    <div class="film-container">
      <div class="film-header" @click="goList('1')">
        <div class="film-title">正在热映</div>
        <div class="film-total">
          全部{{ nowMovieTotal }}部 <span class="tf-icon tf-icon-right"></span>
        </div>
      </div>
      <div class="film-content">
        <film-box
          v-for="(film, i) in nowMovieList"
          :key="i"
          :data="film"
          :type="1"
        ></film-box>
      </div>
    </div>
    <!-- 即将上映 -->
    <div class="film-container">
      <div class="film-header" @click="goList('1', '1')">
        <div class="film-title">即将上映</div>
        <div class="film-total">
          全部{{ startMovieTotal }}部
          <span class="tf-icon tf-icon-right"></span>
        </div>
      </div>
      <div class="film-content">
        <film-box
          v-for="(film, i) in startMovieList"
          :key="i"
          :data="film"
          :type="2"
        ></film-box>
      </div>
    </div>
    <!-- 附近影院 -->
    <div class="film-container">
      <div class="film-header" @click="goList('2')">
        <div class="film-title">附近影院</div>
        <div class="film-total">
          查看全部
          <span class="tf-icon tf-icon-right"></span>
        </div>
      </div>
      <cinema-list v-model="cinemaList" :load="getcinemanearby"></cinema-list>
    </div>
  </div>
</template>

<script>
import FilmBox from './components/FilmBox'
import CinemaList from './components/CinemaList'
import { handlePermission } from '@/utils/permission'
import { getHitMovies, getfilmlist, getcinemanearby } from '@/api/movie'
import { bMapGetLocationInfo } from '@/utils/util'
import { bulterPermission } from '@/utils/business'
export default {
  name: 'movieIndex',
  components: {
    FilmBox,
    CinemaList
  },
  data () {
    return {
      swipeImages: [],
      cityId: 0,
      adCode: 0, // 行政区编码
      lon: 0, // 经度
      lat: 0, // 纬度
      nowMovieList: [], // 正在上映的电影
      nowMovieTotal: 0, // 正在上映电影总数
      startMovieList: [], // 即将上映上映的电影
      startMovieTotal: 0, // 即将上映电影总数
      cinemaList: [], // 附近影院
      scrollStatus: false // 页面是否滚动了
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
          this.getLocationInfo()
          this.pageInit()
        })
        .catch(() => {
          this.goBack()
        })
    }
    // todo：测试使用
    this.cityId = 350100
    this.adCode = 350103
    this.lon = 119.33887
    this.lat = 26.05312
    this.pageInit()
  },
  methods: {
    // 页面初始化获取
    pageInit () {
      this.getHitMovies()
      this.getfilmlist(1)
      this.getfilmlist(2)
      this.getcinemanearby()
    },
    // 获取热映轮播图
    getHitMovies () {
      getHitMovies().then(({ data }) => {
        this.swipeImages = data
      })
    },
    // 获取影片资料(列表) type:1执映2待映
    getfilmlist (type) {
      getfilmlist({
        type,
        page_index: 1,
        page_size: 10
      }).then(({ data, total }) => {
        if (type === 1) {
          // 热映
          this.nowMovieTotal = total
          this.nowMovieList = data
        } else {
          // 待映
          this.startMovieTotal = total
          this.startMovieList = data
        }
      })
    },
    // 获取当前地址信息
    getLocationInfo () {
      // adCode:行政区编码
      bMapGetLocationInfo().then(({ adCode, lon, lat }) => {
        // 百度获取的cityCode不同，需要将行政区编码的后两位转为0才是当前城市编码
        this.cityId = adCode.substring(0, 4) + '00'
        this.adCode = adCode
        this.lon = lon
        this.lat = lat
      })
    },
    // 获取附近影院
    getcinemanearby () {
      return getcinemanearby({
        type: 2, // type=1城市ID，type=2区域ID
        id: this.adCode,
        lng: this.lon, // 经度
        lat: this.lat
      })
    },
    // 页面滚动，页面滚动则头部背景图隐藏
    pageScroll (e) {
      this.scrollStatus = e.target.scrollTop > 0
    },
    // 跳转影片/影院，1：影片，2：影院 filmType 不传为热映，1为即将上映
    goList (type, filmType) {
      this.$router.push({
        name: 'movieList',
        query: {
          type,
          filmType: filmType,
          cityId: this.cityId,
          lon: this.lon,
          lat: this.lat
        }
      })
    },
    // 跳转电影票订单
    goOrder () {
      this.$router.push({
        name: 'movieOrder'
      })
    },
    // 跳转到搜索页
    goSearch () {
      this.$router.push({
        name: 'search'
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  beforeRouteLeave (to, from, next) {
    // 轮播图支持跳转到各个页面，所以需要判断是否有权限跳转到管家页面等
    bulterPermission(to, from, next, this.userType, this.userInfo, () => {
      // 如果未匹配到路由
      if (to.matched.length === 0) {
        next(false)
      } else {
        const names = ['home', 'life']
        if (names.includes(to.name)) {
          this.$destroy()
          this.$store.commit('deleteKeepAlive', from.name)
        }
        next()
      }
    })
  }
}
</script>

<style lang="less" scoped>
// 头部背景
.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 750px;
  height: 262px;
  background: linear-gradient(-90deg, #f9866b, #eb5841);
  border-bottom-left-radius: 22px;
  border-bottom-right-radius: 22px;
}
// 头部导航
/deep/ .van-nav-bar {
  background: linear-gradient(-90deg, #f9866b, #eb5841);
  .van-nav-bar__left,
  .van-icon {
    font-size: 34px;
    color: #fff;
  }
  .van-nav-bar__left {
    right: 0;
  }
  .van-nav-bar__arrow {
    margin-right: 20px;
  }
  .tf-flex-item {
    height: 66px;
    margin-left: 30px;
    border-radius: 10px;
  }
  .van-field__body {
    height: 100%;
  }
}
// 轮播图
.movie-swipe {
  height: 190px;
  margin: 40px 20px 0;
  /deep/ .van-image {
    width: 100%;
    height: 100%;
    .van-image__img {
      border-radius: 10px;
      object-fit: cover;
    }
  }
}
// 功能专区
.feature-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  margin: 33px 105px 0;
  .feature-box {
    .feature-img {
      width: 133px;
      height: 133px;
    }
    .tf-text {
      text-align: center;
      line-height: 1;
      color: #222;
    }
  }
}
.feature-container + .film-container {
  margin-top: 40px;
}
// 正在热映
.film-container {
  margin: 60px 20px 0;
  .film-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    .film-title {
      font-size: 34px;
      color: #222;
    }
    .film-total {
      display: flex;
      align-items: center;
      font-size: 26px;
      line-height: 1;
      color: #8f8f94;
      .tf-icon {
        margin-left: 10px;
        line-height: 1;
      }
    }
  }
  .film-content {
    display: flex;
    margin-top: 30px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    /deep/ .film-box + .film-box {
      margin-left: 20px;
    }
  }
}
// 附近影院
/deep/ .cinema-list {
  margin-top: 30px;
}
</style>
