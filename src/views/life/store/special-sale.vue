<template>
	<div class="app-body tf-bg" :style="{ 'min-height': windowHeight+'px'}">
    <div class="order-bar bar-white"><van-nav-bar title="特卖" :border="false" fixed left-text="" left-arrow></van-nav-bar></div>
    <div class="bar-empty"></div>
		<div class="special-nav">
      <!-- <van-tabs>
        <van-tab v-for="(item,index) in navList" :title="item">
          {{ item }}
        </van-tab>
      </van-tabs> -->

      <!-- <van-tabs v-model="active" swipeable>
        <van-tab v-for="(item,index) in navList" :title="item">
          内容 {{ index }}
        </van-tab>
      </van-tabs> -->
      <!-- <van-tabs v-model="active">
        <van-tab v-for="index in 5">
          <div slot="title">
            <div>dgewgaw</div>
          </div>
          内容 {{ index }}
        </van-tab>
      </van-tabs> -->

    </div>
    <div class="special-list flex-between">
      <div class="special-item">
        <div class="special-goods-pic"><img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" alt=""></div>
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
        <div class="special-goods-pic"><img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" alt=""></div>
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
        <div class="special-goods-pic"><img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" alt=""></div>
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
// import '@/styles/life.css'
export default {
  components: {
    [NavBar.name]: NavBar
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      navList: ['全部全部全部', '9.9封顶', '19.9封顶', '29.9封顶', '1929.9封顶']
    }
  },
  methods: {
    onSubmit: function () {

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
