<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar
      :class="{'unfixed-background': !isFixedTabs}"
      :title="isFixedTabs ? filmInfo.film_name : ''"
      :border="false"
      :fixed="true"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-zhuanfa" @click="shareShow = true"></span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <!-- 影片信息 -->
      <film-details :info="filmInfo"></film-details>
      <van-loading v-if="loading" type="spinner" color="#eb5841" size="24px" />
      <!-- 排期tabs -->
      <van-tabs
        v-else-if="scheduList.length"
        v-model="activeDate"
        title-active-color="#EB5841"
        sticky
        :offset-top="`${offsetTop}rem`"
        @scroll="scrollTabs"
        @change="changeSchedu"
      >
        <!-- 影院筛选 -->
        <filter-cinema
          v-if="filmInfo.film_id"
          :cityId="cityId"
          :filmNo="filmInfo.film_code"
          :offset-top="`${offsetTop + 1.30667}rem`"
          @change="getSelectCinema"
        ></filter-cinema>
        <!-- 排期渲染选择 -->
        <van-tab
          v-for="(schedu, i) in scheduList"
          :key="i"
          :name="schedu.year_date"
          :title="`${schedu.week} ${schedu.date}`"
        >
        </van-tab>
        <!-- 当前排期影院列表 -->
        <div class="cinema-list">
          <!-- 切换排期loading -->
          <van-loading v-if="cinemaLoading" type="spinner" color="#eb5841" size="20px" />
          <cinema-box
            v-show="!cinemaLoading"
            v-for="(item, i) in cinemaList"
            :key="i"
            :data="item"
            :tag="false"
            :filmNo="filmNo"
            :scheduDate="activeScheduDate"
          ></cinema-box>
        </div>
      </van-tabs>
      <van-empty v-else-if="!loading" image="error" description="暂无排期" />
    </div>
    <tf-share
      :share-show="shareShow"
      :share-obj="shareObj"
      @closeSwal="closeShare">
    </tf-share>
  </div>
</template>

<script>
import tfShare from '@/components/tf-share'
import filmDetails from './components/FilmDetails'
import FilterCinema from './components/FilterCinema'
import CinemaBox from './components/CinemaBox'
import { handlePermission } from '@/utils/permission'
import { bMapGetLocationInfo, downloadPic } from '@/utils/util'
import { getfilminfo, selectCinema, getSelectCinemaDate } from '@/api/movie'
export default {
  name: 'movieSelectCinemaItem',
  data () {
    return {
      filmId: '', // 影片id
      filmNo: '', // 影片编码
      title: '',
      filmInfo: {
        score: 0,
        want_view: 0
      },
      loading: true, // 排期loading
      cinemaLoading: false, // 影院loading
      scheduList: [], // 排期
      cinemaList: [], // 影院列表
      activeDate: '', // 选中日期
      activeScheduDate: '', // 用来跳转到影院详情排期所需的参数
      isFixedTabs: false, // tabs是否吸顶
      cityId: 0,
      lon: 0,
      lat: 0,
      offsetTop: 1.17333, // tab吸顶距离（单位rem）
      shareShow: false,
      shareObj: { pyqHide: true },
      first: true,
      countyId: '',
      hallNo: '',
      sortType: 2,
      layerNumber: 0 // 影片详情 => 选择影院 => 影院详情 => 影片详情，路由嵌套的层数
    }
  },
  components: {
    filmDetails,
    FilterCinema,
    CinemaBox,
    tfShare
  },
  created () {
    this.filmId = this.$route.query.id
    this.filmNo = this.$route.query.code
    // 若是未开启，进入此页面弹出。必须强制授权定位，不授权则退出此页面
    if (process.env.VUE_APP_IS_APP === '1') {
      handlePermission({
        name: 'location',
        title: '定位服务未开启',
        message: '此功能需要授权定位权限才能更好为您提供服务，请授权',
        confirmButtonText: '开启'
      })
        .then(() => {
          this.getLocationInfo().then(() => {
            this.getSelectCinemaDate()
          })
          this.getfilminfo()
        })
        .catch(() => {
          this.goBack()
        })
    } else {
      // todo：测试使用
      this.cityId = 350100
      this.lon = 119.33887
      this.lat = 26.05312
      this.getfilminfo()
      this.getSelectCinemaDate()
    }
  },
  mounted () {
    // 安卓下部分需要添加顶部安全距离
    if (process.env.VUE_APP_IS_APP === '1' && api.systemType === 'android') {
      this.offsetTop += api.safeArea.top / 37.5
    }
  },
  methods: {
    // 页面初始化，获取数据
    pageInit () {
      if (this.first) {
        this.first = false
        return
      }
      this.filmId = this.$route.query.id
      this.filmNo = this.$route.query.code
      this.getSelectCinemaDate()
      this.getfilminfo()
    },
    // 获取当前地址信息
    getLocationInfo () {
      return bMapGetLocationInfo().then(({ adCode, lon, lat }) => {
        // 百度获取的cityCode不同，需要将行政区编码的后两位转为0才是当前城市编码
        this.cityId = String(adCode).substring(0, 4) + '00'
        this.lon = lon
        this.lat = lat
      })
    },
    // 获取影片详情
    getfilminfo () {
      getfilminfo({
        film_id: this.filmId
      }).then(({ data }) => {
        this.filmInfo = data
        this.downloadSharePic()
      })
    },
    /* 保存分享图片 */
    downloadSharePic () {
      downloadPic(this.filmInfo.thumb, `film_${this.filmInfo.film_id}`)
        .then((data) => {
          this.setShareObj(data)
        })
        .catch(() => {
          this.setShareObj('')
        })
    },
    // 设置分享参数
    setShareObj (data) {
      this.shareObj = {
        title: `《${this.filmInfo.film_name}》${this.filmInfo.score && this.filmInfo.score !== '0' ? ' 评分' + parseFloat(this.filmInfo.score) / 10 : ''}`,
        description: this.filmInfo.introduction,
        thumb: data ? 'fs://' + data + '.png' : '',
        contentUrl: 'http://live.tosolomo.com/wap/#/filmDetails?id=' + this.filmId,
        pyqHide: false
      }
    },
    // 获取影片排期
    getSelectCinemaDate () {
      this.loading = true
      getSelectCinemaDate({
        film_no: this.filmNo,
        city_id: this.cityId
      }).then(({ data }) => {
        this.scheduList = data || []
        if (this.scheduList.length) {
          const { date, year_date, week } = this.scheduList[0]
          this.activeDate = year_date
          // 跳转到选择排期，那个页面tabs值（后台接口返回的值）用的是`${week} ${date}`
          this.activeScheduDate = `${week} ${date}`
          this.getSelectCinema({})
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 排期切换
    changeSchedu (name, title) {
      this.activeScheduDate = title
      this.getSelectCinema({})
    },
    // 获取影院
    getSelectCinema ({ countyId, hallNo, sortType }) {
      this.cinemaLoading = true
      countyId && (this.countyId = countyId)
      sortType && (this.sortType = sortType)
      selectCinema({
        city_id: this.cityId,
        lng: this.lon,
        lat: this.lat,
        film_no: this.filmNo,
        county_id: this.countyId,
        hall_no: hallNo,
        sort_type: this.sortType,
        date: this.activeDate
      }).then(({ data }) => {
        this.cinemaList = data
      }).finally(() => {
        this.cinemaLoading = false
      })
    },
    // tabs滚动
    scrollTabs ({ isFixed }) {
      // 滚动到tab固定到顶部，则头部导航栏背景色更改，title更改为影片名称
      this.isFixedTabs = isFixed
    },
    closeShare (data) {
      this.shareShow = data == 1
    }
  }
}
</script>

<style lang="less" scoped>
.unfixed-background /deep/ .van-nav-bar {
  background: #000000cc;
  color: #fff;
  .tf-icon,
  .van-icon,
  .van-nav-bar__title {
    color: #fff;
  }
}
.cinema-list {
  padding: 0;
  /deep/ .cinema-box {
    padding: 40px 30px 30px;
    // border-bottom: 2px solid #f0f0f0;
  }
}
/deep/.van-tab {
  padding: 0 18px;
  flex-basis: 187.5px !important;
  flex-shrink: 0;
  .van-tab__text {
    font-size: 30px;
  }
}
/deep/ .van-loading--spinner {
  margin-top: 50px;
  text-align: center;
}
</style>
