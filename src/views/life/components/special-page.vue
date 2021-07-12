<template>
  <van-list
    class="van-special-list"
    v-model="loading"
    :finished="finished"
    finished-text=""
    @load="onLoad"
    :immediate-check="false"
  >
    <div v-if="listData.length" class="special-list flex-between">
      <div
        v-for="(item, index) in listData"
        :key="index"
        class="special-item"
        @click="linkFunc(5, { id: item.goods_id })"
      >
        <div class="special-goods-pic">
          <img class="img-100" :src="item.thumb" />
        </div>
        <div class="special-goods-name p-nowrap">{{ item.goods_name }}</div>
        <div class="special-goods-price">
          <price-show
            class="price-tag-2"
            :money="item.rmb_price"
            :credit="item.xfb_num"
          ></price-show>
          <div class="goods-old-price">￥{{ item.s_price / 100 }}</div>
        </div>
        <span class="special-tag">特价</span>
      </div>
    </div>
    <div v-else style="height: 1px"></div>
  </van-list>
</template>

<script>
import { NavBar, List } from 'vant'
import PriceShow from '../../home/components/price-show'
import { getSaleGoods } from '@/api/life.js'
export default {
  name: 'special-page',
  components: {
    [NavBar.name]: NavBar,
    [List.name]: List,
    PriceShow
  },
  props: {
    bargain_id: {
      // 特价id
      type: String,
      default: ''
    }
  },
  data () {
    return {
      listData: [], // 数据列表
      page: 1, // 页码
      pageSize: 10, // 分页条数
      isEmpty: false, // 是否为空
      loading: false,
      finished: true
    }
  },
  created () {
    this.finished = false
    this.onLoad()
  },
  methods: {
    onLoad () {
      // 异步更新数据
      this.getGoodsData()
    },
    getGoodsData () {
      getSaleGoods({
        page: this.page,
        bargain_id: this.bargain_id
      }).then(res => {
        if (res.success) {
          this.flag = true
          this.listData =
            this.page == 1 ? res.data : this.listData.concat(res.data)
          this.isEmpty = !!(this.page == 1 && res.data.length == 0)
          if (res.data.length < res.pageSize) {
            this.finished = true
            this.flag = true
          } else {
            this.page = this.page + 1
            this.flag = false
          }
          this.loading = false
        }
      })
    },
    listInit () {
      this.listData = []
      this.page = 1
      if (!this.loading && !this.finished) {
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
.scroll-body {
  height: calc(100% - 186px);
  overflow-y: auto;
  position: relative;
}

.van-special-list {
  background-color: #f7f7f7;
}

.special-list {
  width: 710px;
  margin: 30px auto 0;
  flex-wrap: wrap;
}
.special-item {
  position: relative;
  width: 345px;
  min-height: 514px;
  background-color: #fff;
  margin-bottom: 30px;
  border-radius: 10px;
  overflow: hidden;
}
.special-goods-pic {
  width: 100%;
  height: 345px;
  display: flex;
  /*background-color: #f4f4f4;*/
}
.special-goods-name {
  font-size: 28px;
  color: #222;
  line-height: 1;
  padding: 0 20px;
  margin-top: 30px;
  margin-bottom: 10px;
}
.special-goods-price {
  padding-left: 20px;
}
.price-tag-2 {
  justify-content: flex-start;
  height: 66px;
  font-size: 32px;
  /deep/ .price-icon {
    font-size: 24px;
  }
}
.goods-price-bg div span {
  font-weight: normal;
  font-size: 24px;
}
.goods-old-price {
  color: #8f8f94;
  font-size: 24px;
  line-height: 1;
  text-decoration: line-through;
  margin-left: 8px;
}
.special-tag {
  position: absolute;
  top: 0;
  left: 20px;
  width: 60px;
  height: 50px;
  padding-top: 5px;
  background-image: url("~@/assets/img/special-tag.png");
  background-repeat: no-repeat;
  background-size: contain;
  font-size: 24px;
  color: #ffffff;
  text-align: center;
}
</style>
