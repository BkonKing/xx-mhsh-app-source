<template>
  <van-sticky v-bind="$attrs">
    <van-dropdown-menu>
      <van-dropdown-item v-model="countyId" ref="countyId" :title-class="countyTitleClass">
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
              >{{ item.value }}{{ item.total ? `（${item.total}）` : "" }}</span
            >
          </template>
        </van-cell>
        <template #title>
          {{ countyText }}
        </template>
      </van-dropdown-item>
      <!-- <van-dropdown-item v-model="hallNo" ref="hallNo">
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
      </van-dropdown-item> -->
      <van-dropdown-item v-model="sortType" ref="sortType" :title-class="sortTypeTitleClass">
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
  </van-sticky>
</template>

<script>
import { gethall, getcinematotalbycity } from '@/api/movie'
export default {
  name: 'FilterCinema',
  props: {
    cityId: {
      type: [String, Number],
      default: ''
    },
    filmNo: {
      type: [String, Number],
      default: ''
    },
    search: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      countyId: '', // 区县id
      countyText: '全城', // 区县名称
      countyOptions: [],
      hallNo: '', // 影厅编码
      hallText: '影厅', // 影厅名称
      hallOptions: [],
      sortType: 2, // 影厅排序
      sortTypeText: '距离近', // 影厅排序显示
      sortOptions: [
        { text: '距离近', value: 2 },
        { text: '价格低', value: 1 }
      ]
    }
  },
  computed: {
    countyTitleClass () {
      return this.countyId !== '' ? 'van-dropdown-menu-active' : ''
    },
    sortTypeTitleClass () {
      return this.sortType !== 2 ? 'van-dropdown-menu-active' : ''
    }
  },
  created () {
    this.reload()
  },
  methods: {
    reload (params) {
      // this.gethall()
      this.getcinematotalbycity(params)
    },
    // 获取所有的影厅
    gethall () {
      gethall({
        type: 1,
        id: this.cityId,
        film_no: this.filmNo, // 选择影院使用
        search: this.search // 搜索页使用
      }).then(({ data }) => {
        this.hallOptions = data
        this.hallOptions.unshift({
          value: '全部',
          text: ''
        })
      })
    },
    // 获取所有及各区域县影院数量
    getcinematotalbycity (params = {}) {
      getcinematotalbycity({
        city_id: this.cityId,
        film_no: this.filmNo, // 选择影院使用
        search: this.search, // 搜索页使用
        ...params
      }).then(({ data, total }) => {
        this.countyOptions = data
        this.countyOptions.unshift({
          value: '全城',
          text: '',
          total
        })
      })
    },
    // 区域点击事件
    handleClickCounty ({ text, value }) {
      this.countyText = value
      this.countyId = text
      this.handleChange('countyId')
    },
    // 影厅点击事件
    handleClickHall ({ text, value }) {
      this.hallText = value
      this.hallNo = text
      this.handleChange('hallNo')
    },
    // 排序点击事件
    handleClickSort ({ text, value }) {
      this.sortTypeText = text
      this.sortType = value
      this.handleChange('sortType')
    },
    // 触发父组件change事件
    handleChange (menuRef) {
      // 选中后就关闭当前menu
      this.$refs[menuRef].toggle(false)
      this.$emit('change', {
        countyId: this.countyId,
        hallNo: this.hallNo,
        sortType: this.sortType
      })
    }
  }
}
</script>

<style lang="less" scoped>
//影院
/deep/ .van-dropdown-menu__bar {
  height: 90px;
}
/deep/ .van-dropdown-menu__title::after {
  border: 6px solid;
  border-color: transparent transparent #aaaaaa #aaaaaa;
  opacity: 1;
  margin-top: -8px;
}
/deep/ .van-dropdown-menu__title--active::after {
  border-color: transparent transparent #eb5841 #eb5841;
  margin-top: -2px;
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
    line-height: 1;
    color: #8f8f94;
  }
  .hall-tag-active {
    border-color: #eb5841;
    color: #eb5841;
  }
}
/deep/ .van-dropdown-menu-active {
  color: #eb5841;
  &.van-dropdown-menu__title::after {
    border-color: transparent transparent #eb5841 #eb5841;
  }
}
</style>
