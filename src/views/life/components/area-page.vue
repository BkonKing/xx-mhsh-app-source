<template>
  <div>
    <div class="area-header" :style="{backgroundImage: 'url(' + (infoData.bj_thumb ? infoData.bj_thumb : bgImg) + ')'}">
      <div v-if="navBarShow" class="order-bar bar-nobg">
        <van-nav-bar title="" :border="false" fixed @click-left="$router.go(-1)" left-arrow></van-nav-bar>
      </div>
      <div class="header-session">
        <div class="area-tit">{{infoData.special_name}}</div>
        <div class="area-subtit">{{infoData.special_text}}</div>
      </div>
    </div>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
      >
      <div class="special-list">
        <div v-for="(item,index) in listData" @click="linkFunc(5,{id:item.goods_id})" class="special-item flex-between">
          <div class="special-goods-pic">
            <img class="img-100" :src="item.thumb" />
          </div>
          <div class="special-goods-info">
            <div class="special-goods-name p-nowrap">{{item.goods_name}}</div>
            <div class="flex-align-center">
              <div v-for="(val, j) in item.tag" :key="j" class="label-item-block label-item-tip" :style="{ 'border-color': val.tag_color, 'color': val.tag_color}">{{ val.tag_name }}</div>
              <!-- <div class="label-item-block flex-center label-item-tip">顺丰</div> -->
            </div>
            <div class="special-goods-price">
              <span class="special-price-span1">￥</span>{{item.s_price/100}}
              <span v-if="item.y_price && item.y_price!='0'" class="special-price-span2">￥{{item.y_price/100}}</span>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { NavBar, List } from 'vant'
import { getAreaGoods } from '@/api/life.js'
export default {
  name: 'area-page',
  components: {
    [NavBar.name]: NavBar,
    [List.name]: List
  },
  props: {
    special_id: { // 专区id
      type: String,
      default: ''
    },
    navBarShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      listData: [], // 数据列表
      infoData: '', // 其他信息
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
  },
  methods: {
    onLoad () {
      // 异步更新数据
      this.getGoodsData()
    },
    getGoodsData () {
      getAreaGoods({
        page: this.page,
        special_id: this.special_id
      }).then(res => {
        if (res.success) {
          this.listData = this.page == 1 ? res.data.special_goods_list : this.listData.concat(res.data.special_goods_list)
          this.isEmpty = !!(this.page == 1 && res.data.special_goods_list.length == 0)
          if (res.data.special_goods_list.length < res.pageSize) {
            this.finished = true
          } else {
            this.page = this.page + 1
          }
          if (!this.infoData) {
            this.infoData = res.data.special_info
          }
          this.loading = false
        }
      })
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

<style scoped  src="../../../styles/life.css"></style>
<style scoped>
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
}

.area-header {
  background-position: center top;
  background-size: 100% 100%;
  height: 381px;
  /*background: url('../../../assets/img/area_01.png') center top /100% 100%;*/
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
.special-list {
  width: 710px;
  margin: -80px auto 0;
  position: relative;
  z-index: 6;
  background-color: #fff;
  border-radius: 10px;
  padding: 40px 30px;
}
.special-item {
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #f0f0f0;
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
  color: #999999;
  text-decoration: line-through;
}
</style>
