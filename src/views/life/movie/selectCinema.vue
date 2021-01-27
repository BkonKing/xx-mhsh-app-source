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
      <van-tabs v-model="activeDate" title-active-color="#EB5841" sticky>
        <filter-cinema
          :cityId="cityId"
          @change="getSelectCinema"
        ></filter-cinema>
        <van-tab v-for="(obj, key) in scheduList" :key="key" :title="key">
          <div class="cinema-list">
            <cinema-box
              v-for="(item, i) in obj"
              :key="i"
              :data="item"
              :tag="false"
            ></cinema-box>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import filmDetails from './components/FilmDetails'
import FilterCinema from './components/FilterCinema'
import CinemaBox from './components/CinemaBox'
import { getfilminfo, selectCinema } from '@/api/movie'
export default {
  name: 'movieSelectCinema',
  data () {
    return {
      id: '',
      code: '',
      title: '',
      info: {},
      scheduList: [],
      activeDate: 0,
      cityId: 350100,
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
    this.code = this.$route.query.code
    this.getfilminfo()
    this.getSelectCinema({})
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
    // 获取影院
    getSelectCinema ({ countyId, hallNo, sortType }) {
      selectCinema({
        city_id: this.cityId,
        lng: this.lon,
        lat: this.lat,
        film_no: this.code,
        county_id: countyId,
        hall_no: hallNo,
        sort_type: sortType
      }).then(({ data }) => {
        this.scheduList = data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cinema-list {
  padding: 0;
  /deep/ .cinema-box {
    padding: 40px 30px;
    border-bottom: 2px solid #F0F0F0;
  }
}
</style>
