<template>
  <div class="filter-cinema-list">
    <filter-cinema :cityId="cityId" @change="reload"></filter-cinema>
    <cinema-list
      ref="cinemaList"
      class="cinema-list"
      v-model="cinemaList"
      :load="getcinemainfobycity"
      :tag="false"
    ></cinema-list>
  </div>
</template>

<script>
import CinemaList from './CinemaList'
import FilterCinema from './FilterCinema'
import { getcinemainfobycity } from '@/api/movie'
export default {
  name: 'FilterCinemaList',
  components: {
    CinemaList,
    FilterCinema
  },
  props: {
    cityId: {
      type: [String, Number],
      default: ''
    },
    lon: {
      type: [String, Number],
      default: ''
    },
    lat: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      countyId: '', // 区县id
      hallNo: '', // 影厅编码
      sortType: 1, // 影厅排序
      cinemaList: [] // 影院列表
    }
  },
  methods: {
    reload (data) {
      if (data) {
        const { countyId = '', hallNo = '', sortType = 1 } = data
        this.countyId = countyId
        this.hallNo = hallNo
        this.sortType = sortType
      }
      this.$refs.cinemaList && this.$refs.cinemaList.reload()
    },
    // 获取影院地址列表
    getcinemainfobycity ({ pages }) {
      return getcinemainfobycity({
        city_id: this.cityId,
        county_id: this.countyId,
        hall_no: this.hallNo,
        sort_type: this.sortType,
        lng: this.lon,
        lat: this.lat,
        page_index: pages,
        page_size: 10
      })
    }
  }
}
</script>

<style lang="less" scoped>
.filter-cinema-list {
  height: 100%;
  .cinema-list {
    height: calc(100% - 90px);
    padding: 0 30px;
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
</style>
