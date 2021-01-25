<template>
  <div class="tf-bg-white">
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
          @click="type = '1'"
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
    <div class="film-container" v-show="type === '1'">
      <van-tabs v-model="movieActive">
        <van-tab title="正在上映">
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
    <div v-show="type === '2'">
      <van-dropdown-menu>
        <van-dropdown-item v-model="countyId">
          <van-cell
            v-for="(item, i) in countyOptions"
            :key="i"
            @click="handleClickCounty(item)"
          >
            <template #title>
              <span
                v-if="countyId == item.text"
                class="tf-icon tf-icon-gouxuan"
              ></span>
              <span
                class="dropdown-menu-title"
                :class="{ 'dropdown-menu-title-active': countyId == item.text }"
                >{{ item.value
                }}{{ item.total ? `（${item.total}）` : "" }}</span
              >
            </template>
          </van-cell>
          <template #title>
            {{ countyText }}
          </template>
        </van-dropdown-item>
        <van-dropdown-item v-model="hallNo">
          <div class="hall-tags">
            <div
              class="hall-tag"
              :class="{ 'hall-tag-active': hallNo === item.text }"
              v-for="(item, i) in hallOptions"
              :key="i"
              @click="handleClickHall(item)"
            >
              {{ item.value }}
            </div>
          </div>
          <template #title>
            {{ hallText }}
          </template>
        </van-dropdown-item>
        <van-dropdown-item v-model="sortType">
          <van-cell
            v-for="(item, i) in sortOptions"
            :key="i"
            @click="handleClickSort(item)"
          >
            <template #title>
              <span
                v-if="sortType == item.value"
                class="tf-icon tf-icon-gouxuan"
              ></span>
              <span
                class="dropdown-menu-title"
                :class="{
                  'dropdown-menu-title-active': sortType == item.value
                }"
                >{{ item.text }}</span
              >
            </template>
          </van-cell>
          <template #title>
            {{ sortTypeText }}
          </template>
        </van-dropdown-item>
      </van-dropdown-menu>
      <cinema-list
        ref="cinemaList"
        class="cinema-list"
        v-model="cinemaList"
        :load="getcinemainfobycity"
        :tag="false"
      ></cinema-list>
    </div>
  </div>
</template>

<script>
import FilmList from './components/FilmList'
import CinemaList from './components/CinemaList'
import {
  getfilmlist,
  setviewwatch,
  getcinemainfobycity,
  gethall,
  getcinematotalbycity
} from '@/api/movie'
export default {
  name: 'movieList',
  components: {
    FilmList,
    CinemaList
  },
  data () {
    return {
      type: 0, // 1：影片，2：影院
      movieActive: 0, // 影片tab
      nowMovieList: [], // 正在上映的电影
      startMovieList: [], // 即将上映上映的电影
      cityId: '', // 城市id
      lon: '', // 经度
      lat: '', // 纬度
      countyId: '', // 区县id
      countyText: '全城', // 区县名称
      countyOptions: [],
      hallNo: '', // 影厅编码
      hallText: '影厅', // 影厅名称
      hallOptions: [],
      sortType: 1, // 影厅排序
      sortTypeText: '距离近', // 影厅排序显示
      sortOptions: [
        { text: '距离近', value: 1 },
        { text: '价格低', value: 2 }
      ],
      cinemaList: [] // 影院列表
    }
  },
  created () {
    this.type = this.$route.query.type
    this.cityId = this.$route.query.cityId
    this.lon = this.$route.query.lon
    this.lat = this.$route.query.lat
    this.gethall()
    this.getcinematotalbycity()
  },
  mounted () {
    this.$nextTick(() => {
      this.filmReload('cinemaList')
    })
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
    // 获取所有及各区域县影院数量
    getcinematotalbycity () {
      getcinematotalbycity({
        city_id: this.cityId
      }).then(({ data, total }) => {
        this.countyOptions = data
        this.countyOptions.unshift({
          value: '全城',
          text: '',
          total
        })
      })
    },
    // 获取影院地址列表
    getcinemainfobycity () {
      return getcinemainfobycity({
        city_id: this.cityId,
        county_id: this.countyId,
        hall_no: this.hallNo,
        sort_type: this.sortType,
        lng: this.lon,
        lat: this.lat
      })
    },
    // 获取所有的影厅
    gethall () {
      gethall({
        type: 1,
        id: this.cityId
      }).then(({ data }) => {
        this.hallOptions = data
        this.hallOptions.unshift({
          value: '全城',
          text: ''
        })
      })
    },
    // 区域点击事件
    handleClickCounty ({ text, value }) {
      this.countyText = value
      this.countyId = text
    },
    // 影厅点击事件
    handleClickHall ({ text, value }) {
      this.hallText = value
      this.hallNo = text
    },
    // 排序点击事件
    handleClickSort ({ text, value }) {
      this.sortTypeText = text
      this.sortType = value
    }
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
}
//影院
/deep/ .van-dropdown-menu__bar {
  height: 90px;
}
/deep/ .van-dropdown-menu__title::after {
  border: 6px solid;
  border-color: transparent transparent #aaaaaa #aaaaaa;
  opacity: 1;
}
/deep/ .van-dropdown-menu__title--active::after {
  border-color: transparent transparent #eb5841 #eb5841;
}
.dropdown-menu-title {
  line-height: 36px;
  font-size: 26px;
  color: #666;
}
.dropdown-menu-title-active {
  color: #eb5841;
}
/deep/ .van-dropdown-menu .van-popup {
  padding: 10px 0;
}
.van-dropdown-menu .van-cell {
  padding-left: 82px;
}
.van-dropdown-menu .tf-icon-gouxuan {
  position: absolute;
  top: 6px;
  left: 30px;
  font-size: 32px;
  color: #eb5841;
}
.hall-tags {
  display: flex;
  flex-wrap: wrap;
  padding: 34px 10px 20px 30px;
  .hall-tag {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 216px;
    height: 66px;
    padding: 0 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    border: 2px solid #f0f0f0;
    border-radius: 4px;
    font-size: 26px;
    color: #8f8f94;
  }
  .hall-tag-active {
    border-color: #eb5841;
    color: #eb5841;
  }
}
.cinema-list {
  padding: 0 30px;
}
</style>
