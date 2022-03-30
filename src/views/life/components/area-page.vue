<template>
  <div class="area-page-component">
    <div
      class="area-header"
      :style="{
        backgroundImage:
          'url(' + (infoData.bj_thumb ? infoData.bj_thumb : '') + ')'
      }"
    >
      <div v-if="navBarShow" class="order-bar bar-nobg">
        <van-nav-bar
          title=""
          :border="false"
          fixed
          @click-left="$router.go(-1)"
          left-arrow
        ></van-nav-bar>
      </div>
      <!-- <div class="header-session">
        <div class="area-tit">{{ infoData.special_name }}</div>
        <div class="area-subtit">{{ infoData.special_text }}</div>
      </div> -->
    </div>
    <van-list
      v-model="loading"
      class="special-van-list"
      finished-text=""
      :finished="finished"
      @load="onLoad"
    >
        <div
          v-for="(item, index) in listData"
          :key="index"
          @click="linkFunc(5, { id: item.goods_id })"
          class="special-item flex-between"
        >
          <div class="special-goods-pic">
            <img class="img-100" :src="item.thumb" />
          </div>
          <div class="special-goods-info">
            <div class="special-goods-name p-nowrap">{{ item.goods_name }}</div>
            <div class="flex-align-center">
              <div
                v-for="(val, j) in item.tag"
                :key="j"
                class="label-item-block label-item-tip"
                :style="{ 'border-color': val.tag_color, color: val.tag_color }"
              >
                {{ val.tag_name }}
              </div>
              <!-- <div class="label-item-block flex-center label-item-tip">顺丰</div> -->
            </div>
            <div class="special-goods-price">
              <price-show
                class="price-tag-1"
                :money="item.rmb_price"
                :credit="item.xfb_num"
              ></price-show>
              <div
                v-if="item.y_price && item.y_price != '0'"
                class="special-price-span2"
              >
                ￥{{ item.y_price / 100 }}
              </div>
            </div>
          </div>
        </div>
    </van-list>
  </div>
</template>

<script>
import { NavBar, List } from 'vant'
import PriceShow from '../../home/components/price-show'
import { getAreaGoods, getAreaTypesGoods } from '@/api/life.js'
export default {
  name: 'area-page',
  components: {
    [NavBar.name]: NavBar,
    [List.name]: List,
    PriceShow
  },
  props: {
    special_id: {
      // 专区id
      type: String,
      default: ''
    },
    navBarShow: {
      type: Boolean,
      default: false
    },
    isClassification: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      listData: [], // 数据列表
      infoData: {}, // 其他信息
      page: 1, // 页码
      pageSize: 10, // 分页条数
      isEmpty: false, // 是否为空
      loading: false,
      finished: true,
      bgImg: require('@/assets/img/area_01.png')
    }
  },
  created () {
    this.finished = false
    // this.onLoad()
  },
  methods: {
    onLoad () {
      console.log('load')
      // 异步更新数据
      this.getGoodsData()
    },
    getGoodsData () {
      this.isClassification ? this.getAreaTypesGoods() : this.getAreaData()
    },
    getAreaData () {
      const page = this.page
      const isFirst = page == 1
      getAreaGoods({
        page,
        special_id: this.special_id
      })
        .then(res => {
          if (res.success) {
            this.listData = isFirst
              ? res.data.special_goods_list
              : this.listData.concat(res.data.special_goods_list)
            this.isEmpty = !!(
              isFirst && res.data.special_goods_list.length == 0
            )
            if (res.data.special_goods_list.length < res.pageSize) {
              this.finished = true
            } else {
              this.page = page + 1
            }
            this.infoData = res.data.special_info || {}
            this.loading = false
          }
        })
        .finally(() => {
          this.pageLoading = false
        })
    },
    getAreaTypesGoods () {
      const page = this.page
      const isFirst = page == 1
      getAreaTypesGoods({
        page,
        category_id: this.special_id
      })
        .then(res => {
          if (res.success) {
            const { goods_list: goodsList, bj_thumb: bjThumb } = res.data
            this.listData = isFirst
              ? goodsList
              : this.listData.concat(goodsList)
            this.isEmpty = !!(
              isFirst && goodsList.length == 0
            )
            if (goodsList.length < res.pageSize) {
              this.finished = true
            } else {
              this.page = page + 1
            }
            this.infoData = {
              bj_thumb: bjThumb
            }
            this.loading = false
          }
        })
        .finally(() => {
          this.pageLoading = false
        })
    },
    listInit () {
      console.log('init', this.loading, this.finished)
      this.listData = []
      this.page = 1
      if (!this.loading && !this.finished) {
        this.loading = true
        this.getGoodsData()
      } else {
        this.loading = false
        this.finished = false
      }
    },
    linkFunc (type, obj = {}) {
      switch (type) {
        case 5:
          this.$router.push({
            path: '/store/goods-detail',
            query: {
              id: obj.id
            }
          })
          break
      }
    }
  }
}
</script>

<style scoped src="../../../styles/life.css"></style>
<style lang="less" scoped>
.area-page-component {
  background: #f7f7f7;
}
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
}

.area-header {
  background-position: center top;
  background-size: 100% 100%;
  background-color: #d7d7d7;
  height: 381px;
  position: relative;
  z-index: 2;
  position: relative;
}
.header-session {
  position: absolute;
  left: 50px;
  bottom: 80px;
  height: 173px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #ffffff;
}
.area-tit {
  font-size: 38px;
  line-height: 68px;
}
.area-subtit {
  font-size: 28px;
  line-height: 58px;
}
.special-van-list {
  width: 710px;
  margin: -80px auto 0;
  padding: 40px 30px;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  z-index: 6;
}
.special-item {
  padding-bottom: 30px;
  border-bottom: 1px solid #f0f0f0;
}
.special-item + .special-item {
  margin-top: 30px;
}
.special-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}
.special-goods-pic {
  width: 200px;
  height: 200px;
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f4f4f4;
}
.special-goods-info {
  width: 430px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}
.special-goods-name {
  font-size: 30px;
  color: #222;
  line-height: 68px;
}
.special-goods-price {
  height: 66px;
  line-height: 66px;
  font-size: 42px;
  color: #eb5841;
  font-weight: bold;
}
.special-goods-price span {
  font-weight: normal;
  font-size: 24px;
}
.special-price-span2 {
  margin-top: 8px;
  font-size: 24px;
  color: #999999;
  text-decoration: line-through;
}
.label-item-block {
  margin-right: 10px;
}
.price-tag-1 {
  justify-content: flex-start !important;
  font-size: 32px;
  /deep/ .price-icon {
    font-size: 24px;
  }
}
</style>
