<template>
	<div class="app-body" :style="{ 'min-height': windowHeight+'px'}">
    <div class="order-bar bar-white"><van-nav-bar title="特卖" :border="false" fixed left-text="" left-arrow></van-nav-bar></div>
    <div class="bar-empty"></div>
		<div class="special-nav">
      <scrollBar direction="x" :activeIndex="activeIndex">
        <div
          class="scroll-barItem"
          v-for="(item, index) in options"
          :key="index"
          @click="changeNav(item, index)"
          :class="index === activeIndex ? 'active' : null"
        >
          <div>{{item.name}}</div>
        </div>
      </scrollBar>
    </div>
    <div class="special-list flex-between">
      <div class="special-item">
        <div class="special-goods-pic">
          <img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
        </div>
        <div class="special-goods-name p-nowrapm">creamy blue动物毛眼部化妆刷</div>
        <div class="special-goods-price flex-align-center">
          <div class="goods-price-icon flex-align-center">
            <div class="goods-price-bg flex-align-center">特卖￥<span>19.9</span></div>
            <img class="goods-price-triangle" src="@/assets/img/special_01.png" />
          </div>
          <div class="goods-old-price">￥46</div>
        </div>
      </div>
      <div class="special-item">
        <div class="special-goods-pic">
          <img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
        </div>
        <div class="special-goods-name p-nowrapm">creamy blue动物毛眼部化妆刷</div>
        <div class="special-goods-price flex-align-center">
          <div class="goods-price-icon flex-align-center">
            <div class="goods-price-bg flex-align-center">特卖￥<span>19.9</span></div>
            <img class="goods-price-triangle" src="@/assets/img/special_01.png" />
          </div>
          <div class="goods-old-price">￥46</div>
        </div>
      </div>
      <div class="special-item">
        <div class="special-goods-pic">
          <img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
        </div>
        <div class="special-goods-name p-nowrapm">creamy blue动物毛眼部化妆刷</div>
        <div class="special-goods-price flex-align-center">
          <div class="goods-price-icon flex-align-center">
            <div class="goods-price-bg flex-align-center">特卖￥<span>19.9</span></div>
            <img class="goods-price-triangle" src="@/assets/img/special_01.png" />
          </div>
          <div class="goods-old-price">￥46</div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import { NavBar } from 'vant'
import scrollBar from '@/components/scroll-bar'
export default {
  components: {
    [NavBar.name]: NavBar,
    scrollBar
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      activeIndex: 0,
      options: [
        {id: 1, name: '全部'},
        {id: 2, name: '9.9封顶'},
        {id: 3, name: '19.9封顶'},
        {id: 4, name: '29.9封顶'},
      ]
    }
  },
  methods: {
    onSubmit: function () {

    },
    changeNav(item, index) {
      this.activeIndex = index;
    }
  }
}
</script>

<style scoped>
@import '../../../styles/life.css';
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
  overflow: hidden;
}

.special-nav {
  height: 98px;
  background-color: #fff;
  padding: 0 30px;
}
.scroll-barItem {
  font-size: 30px;
}
.scroll-barItem div {
  height: 98px;
  line-height: 98px;
  padding: 0 30px;
  color: #8f8f94;
  position: relative;
}
.scroll-barItem.active div {
  color: #222;
  font-size: 34px;
  font-weight: bold;
}
.scroll-barItem.active div:after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: -33px;
  width: 66px;
  height: 4px;
  border-radius: 2px;
  background-color: #eb5841;
}
.special-list {
  width: 710px;
  margin: 30px auto;
  flex-wrap: wrap;
}
.special-item {
  width: 345px;
  min-height: 533px;
  background-color: #fff;
  margin-bottom: 30px;
  border-radius: 10px;
  overflow: hidden;
}
.special-goods-pic {
  width: 100%;
  height: 345px;
  display: flex;
}
.special-goods-name {
  font-size: 26px;
  color: #222;
  line-height: 44px;
  height: 88px;
  padding: 0 20px;
  margin: 11px 0;
}
.special-goods-price {
  height: 48px;
}
.goods-price-bg {
  height: 48px;
  min-width: 178px;
  padding-right: 12px;
  padding-left: 20px;
  color: #fff;
  font-size: 24px;
  background-image: linear-gradient(to right, #eb5841, #f88469);
}
.goods-price-bg span {
  font-size: 34px;
}
.goods-price-triangle {
  width: 14px;
  height: 48px;
}
.goods-old-price {
  color: #8f8f94;
  font-size: 24px;
  text-decoration: line-through;
  margin-left: 8px;
}
</style>
