<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar
      :border="false"
      :fixed="true"
      placeholder
      :left-arrow="true"
      @click-left="$router.go(-1)"
    >
      <template #title>
        <div
          class="nav-tab film-tab"
          :class="{ 'nav-tab-active': type === '1' }"
          @click="switchFilm"
        >
          电影
        </div>
        <div
          class="nav-tab cinema-tab"
          :class="{ 'nav-tab-active': type === '2' }"
          @click="type = '2'"
        >
          影院
        </div>
      </template>
      <template #right>
        <span class="tf-icon tf-icon-sousuo1" @click="goSearch"></span>
      </template>
    </van-nav-bar>
    <!-- 电影 -->
    <div class="film-container tf-body-container" v-show="type === '1'">
      <van-tabs
        class="list-tabs"
        v-model="movieActive"
        sticky
        offset-top="1.17333rem"
      >
        <van-tab title="正在热映">
          <film-list
            id="nowMovieList"
            ref="nowMovieList"
            key="1"
            v-model="nowMovieList"
            :type="1"
            :load="params => getfilmlist(params, 1)"
          ></film-list>
        </van-tab>
        <van-tab title="即将上映">
          <film-list
            id="startMovieList"
            class="start-movie-list"
            ref="startMovieList"
            key="2"
            v-model="startMovieList"
            :type="2"
            :load="params => getfilmlist(params, 2)"
          ></film-list>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 影院 -->
    <div class="tf-body-container" v-show="type === '2'">
      <filter-cinema-list
        id="cinemaList"
        ref="cinemaList"
        :cityId="cityId"
        :lon="lon"
        :lat="lat"
      ></filter-cinema-list>
    </div>
  </div>
</template>

<script>
import FilmList from './components/FilmList'
import FilterCinemaList from './components/FilterCinemaList'
import { getfilmlist, setviewwatch } from '@/api/movie'
export default {
  name: 'movieList',
  components: {
    FilmList,
    FilterCinemaList
  },
  data () {
    return {
      type: 0, // 1：影片，2：影院
      // 影片tab，默认为即将上映，因为当影院进入，再切换到电影，默认为0的话，tab隐藏的情况下，默认选中第一个，选中下划线位置会出错，所以默认为1，第一次切换到影片后再设置为0
      movieActive: 1,
      nowMovieList: [], // 正在上映的电影
      startMovieList: [], // 即将上映上映的电影
      cityId: '', // 城市id
      lon: '', // 经度
      lat: '', // 纬度
      firstCinema: true, // 是否从影院模块第一次进入页面
      scrollTop: 0, // 影院滚动位置
      nowFilmTop: 0, // 热映滚动位置
      startFilmTop: 0 // 待映滚动位置
    }
  },
  created () {
    const { type, cityId, lon, lat } = this.$route.query
    this.type = type
    this.cityId = cityId
    this.lon = lon
    this.lat = lat
  },
  mounted () {
    if (this.type === '1') {
      // 影片
      this.firstCinema = false
      this.movieActive = this.$route.query.filmType ? 1 : 0
      // 影院没有做点击后再初始化加载，所以从电影进入页面需要手动刷新影院列表
      this.$refs.cinemaList && this.$refs.cinemaList.reload()
    } else {
      this.$refs.cinemaList && this.$refs.cinemaList.reload()
      this.$nextTick(() => {
        this.filmReload('nowMovieList')
        this.filmReload('startMovieList')
      })
    }
  },
  activated () {
    this.setScollTop()
  },
  methods: {
    // 获取影片资料(列表) type:1执映2待映
    getfilmlist ({ pages }, type) {
      return getfilmlist({
        type,
        city_id: this.cityId,
        page_index: pages,
        page_size: 10
      })
    },
    // 影片列表刷新
    filmReload (ref) {
      this.$refs[ref] && this.$refs[ref].reload()
    },
    // 设置影片想看
    setviewwatch ({ id, is_shown }) {
      setviewwatch({
        film_id: id
      }).then(() => {
        // 没有重新请求列表，只是手动变为已设置
        is_shown = true
      })
    },
    // 切换到电影tab
    switchFilm () {
      this.type = '1'
      // 第一次切换到电影手动从即将上映切换到热映，才修复选中下划线位置错位
      if (this.firstCinema) {
        this.movieActive = 0
        this.firstCinema = false
      }
    },
    // 跳转到搜索页
    goSearch () {
      this.$router.push({
        name: 'search'
      })
    },
    // 获取当前选中tab的滚动位置
    getScollTop (type = this.type, movieActive = this.movieActive) {
      if (type === '1') {
        if (movieActive === 1) {
          const startel = document.getElementById('startMovieList')
          this.startFilmTop = (startel && startel.scrollTop) || 0
        } else {
          const nowel = document.getElementById('nowMovieList')
          this.nowFilmTop = (nowel && nowel.scrollTop) || 0
        }
      } else {
        const cinemael = document
          .getElementById('cinemaList')
          .getElementsByClassName('cinema-list')[0]
        this.scrollTop = (cinemael && cinemael.scrollTop) || 0
      }
    },
    // 设置当前选中tab的滚动位置
    setScollTop (type = this.type, movieActive = this.movieActive) {
      if (type === '1') {
        if (movieActive === 1) {
          this.startFilmTop &&
            (document.getElementById(
              'startMovieList'
            ).scrollTop = this.startFilmTop)
        } else {
          this.nowFilmTop &&
            (document.getElementById(
              'nowMovieList'
            ).scrollTop = this.nowFilmTop)
        }
      } else {
        this.scrollTop &&
          (document
            .getElementById('cinemaList')
            .getElementsByClassName(
              'cinema-list'
            )[0].scrollTop = this.scrollTop)
      }
    }
  },
  watch: {
    // 电影影院切换时，先获取旧的滚动位置，这时页面还没重新渲染，重新渲染后再设置新的滚动位置
    type (val, oldVal) {
      this.getScollTop(oldVal)
      this.$nextTick(() => {
        this.setScollTop(val)
      })
    },
    // 同上原理
    movieActive (val, oldVal) {
      this.getScollTop(this.type, oldVal)
      this.$nextTick(() => {
        this.setScollTop(this.type, val)
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    const names = ['movieIndex']
    this.getScollTop()
    if (names.includes(to.name)) {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  }
}
</script>

<style lang="less" scoped>
// 头部nav的tabs
/deep/ .van-nav-bar {
  background: #ef664e;
  .van-nav-bar__title {
    display: flex;
  }
  .van-icon,
  .tf-icon {
    color: #fff;
  }
}
.nav-tab {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 190px;
  height: 60px;
  border: 2px solid #ffffff;
  font-size: 30px;
  font-weight: 500;
  color: #fff;
}
.film-tab {
  border-radius: 30px 0px 0px 30px;
}
.cinema-tab {
  border-radius: 0px 30px 30px 0px;
}
.nav-tab-active {
  background: #ffffff;
  border: none;
  color: #eb5841;
}
// 电影
.film-container {
  /deep/ .van-tabs__wrap {
    height: 90px;
    border-bottom: 1px solid #f0f0f0;
    margin: 0 30px;
  }
  /deep/ .van-tabs__line {
    width: 66px !important;
  }
  /deep/ .van-tab--active .van-tab__text {
    font-size: 34px;
  }
  /deep/ .van-tab__text {
    font-size: 30px;
  }
  /deep/ .tf-list-refresh {
    padding: 30px;
  }
  .start-movie-list {
    padding: 0 30px;
    /deep/ .van-list__loading .van-loading {
      padding-top: 30px;
    }
  }
}
/deep/ .cinema-list .van-list__loading .van-loading {
  padding-top: 30px;
}
/deep/ .cinema-list .tf-van-cell {
  margin-bottom: 0;
}
/deep/ .van-sticky {
  background-image: url("~@/assets/imgs/movie_list-header.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  .van-tabs__nav,
  .van-dropdown-menu__bar {
    background: initial;
    box-shadow: initial;
  }
  .van-dropdown-menu__bar::after {
    content: "";
    display: block;
    width: 690px;
    height: 2px;
    position: absolute;
    bottom: 0;
    left: 30px;
    background: #f0f0f0;
  }
}
</style>
