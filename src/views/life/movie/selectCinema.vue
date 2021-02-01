<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-zhuanfa"></span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <film-details :info="info"></film-details>
      <van-tabs
        v-if="scheduList"
        v-model="activeDate"
        title-active-color="#EB5841"
        sticky
        @change="changeSchedu"
      >
        <filter-cinema
          v-if="info.film_id"
          :cityId="cityId"
          :filmNo="info.film_code"
          @change="getSelectCinema"
        ></filter-cinema>
        <van-tab
          v-for="(schedu, i) in scheduList"
          :key="i"
          :name="schedu.year_date"
          :title="`${schedu.week} ${schedu.date}`"
        >
        </van-tab>
        <div class="cinema-list">
          <cinema-box
            v-for="(item, i) in cinemaList"
            :key="i"
            :data="item"
            :tag="false"
            :filmNo="filmNo"
            :scheduDate="activeScheduDate"
          ></cinema-box>
        </div>
      </van-tabs>
      <van-loading v-else type="spinner" color="#eb5841" size="24px" />
    </div>
  </div>
</template>

<script>
import filmDetails from './components/FilmDetails'
import FilterCinema from './components/FilterCinema'
import CinemaBox from './components/CinemaBox'
import { getfilminfo, selectCinema, getSelectCinemaDate } from '@/api/movie'
export default {
  name: 'movieSelectCinema',
  data () {
    return {
      id: '', // 影片id
      filmNo: '', // 影片编码
      title: '',
      info: {
        score: 0,
        want_view: 0
      },
      scheduList: null, // 排期
      cinemaList: [], // 影院列表
      activeDate: '', // 选中日期
      activeScheduDate: '', // 用来跳转到影院详情排期所需的参数
      cityId: 500100,
      lon: 119.33887,
      lat: 26.05312
    }
  },
  components: {
    filmDetails,
    FilterCinema,
    CinemaBox
  },
  created () {
    this.id = this.$route.query.id
    this.filmNo = this.$route.query.code
    this.getfilminfo()
    this.getSelectCinemaDate()
  },
  methods: {
    // 获取影片详情
    getfilminfo () {
      getfilminfo({
        film_id: this.id
      }).then(({ data }) => {
        this.info = data
      })
    },
    // 获取影片排期
    getSelectCinemaDate () {
      getSelectCinemaDate({
        film_no: this.filmNo,
        city_id: this.cityId
      }).then(({ data }) => {
        this.scheduList = data
        const { date, year_date, week } = this.scheduList[0]
        this.activeDate = year_date
        this.activeScheduDate = `${week} ${date}`
        this.getSelectCinema({})
      })
    },
    // 排期切换
    changeSchedu (name, title) {
      this.activeScheduDate = title
      this.getSelectCinema({})
    },
    // 获取影院
    getSelectCinema ({ countyId, hallNo, sortType }) {
      selectCinema({
        city_id: this.cityId,
        lng: this.lon,
        lat: this.lat,
        film_no: this.filmNo,
        county_id: countyId,
        hall_no: hallNo,
        sort_type: sortType,
        date: this.activeDate
      }).then(({ data }) => {
        this.cinemaList = data
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    const names = ['movieFilmDetails']
    if (names.includes(to.name)) {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar {
  background: #000c;
  .van-icon,
  .tf-icon {
    color: #fff;
  }
}
.cinema-list {
  padding: 0;
  /deep/ .cinema-box {
    padding: 40px 30px 30px;
    border-bottom: 2px solid #f0f0f0;
  }
}
/deep/.van-tab {
  padding: 0 20px;
  flex-basis: 195px !important;
  .van-tab__text {
    font-size: 30px;
  }
}
/deep/ .van-loading--spinner {
  margin-top: 50px;
  text-align: center;
}
</style>
