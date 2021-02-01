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
        <span class="tf-icon tf-icon-sousuo1"></span>
      </template>
    </van-nav-bar>
    <!-- 电影 -->
    <div class="film-container tf-body-container" v-show="type === '1'">
      <van-tabs class="list-tabs" v-model="movieActive" sticky offset-top="44">
        <van-tab title="正在热映">
          <film-list
            ref="nowMovieList"
            key="1"
            v-model="nowMovieList"
            :type="1"
            :load="params => getfilmlist(params, 1)"
          ></film-list>
        </van-tab>
        <van-tab title="即将上映">
          <film-list
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
      movieActive: 1, // 影片tab
      nowMovieList: [], // 正在上映的电影
      startMovieList: [], // 即将上映上映的电影
      cityId: '', // 城市id
      lon: '', // 经度
      lat: '', // 纬度
      first: true // 是否从影院模块第一次进入页面
    }
  },
  created () {
    this.type = this.$route.query.type
    this.cityId = this.$route.query.cityId
    this.lon = this.$route.query.lon
    this.lat = this.$route.query.lat
  },
  mounted () {
    if (this.type === '1') {
      this.first = false
      this.movieActive = this.$route.query.filmType ? 1 : 0
      this.$nextTick(() => {
        this.$refs.cinemaList && this.$refs.cinemaList.reload({})
      })
    } else {
      this.$nextTick(() => {
        this.filmReload('nowMovieList')
        this.filmReload('startMovieList')
      })
    }
  },
  methods: {
    // 获取影片资料(列表) type:1执映2待映
    getfilmlist ({ pages }, type) {
      return getfilmlist({
        type,
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
        // 变为已设置
        is_shown = true
      })
    },
    // 切换到电影tab
    switchFilm () {
      this.type = '1'
      if (this.first) {
        this.movieActive = 0
        this.first = false
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    const names = ['movieIndex']
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
  }
}
</style>
