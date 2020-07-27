<template>
	<div class="app-body tf-bg" :style="{ 'min-height': windowHeight+'px'}">
    <div class="area-header">
      <div class="order-bar bar-nobg">
        <van-nav-bar title="" :border="false" fixed left-text="" left-arrow></van-nav-bar>
      </div>
      <div class="header-session">
        <div class="area-tit">3C爱好者专区</div>
        <div class="area-subtit">玩转最新电子产品，体验前沿科技</div>
      </div>
    </div>
    <div class="special-list">
      <div class="special-item flex-between">
        <div class="special-goods-pic"><img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" alt=""></div>
        <div class="special-goods-info">
          <div class="special-goods-name p-nowrapm">creamy blue动物毛眼部化妆刷</div>
          <div class="special-goods-price">
            <span class="special-price-span1">￥</span>180
            <span class="special-price-span2">￥150</span>
          </div>
        </div>
      </div>
      <div class="special-item flex-between">
        <div class="special-goods-pic"><img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" alt=""></div>
        <div class="special-goods-info">
          <div class="special-goods-name p-nowrapm">creamy blue动物毛眼部化妆刷</div>
          <div class="special-goods-price">
            <span class="special-price-span1">￥</span>180
            <span class="special-price-span2">￥150</span>
          </div>
        </div>
      </div>
      <div class="special-item flex-between">
        <div class="special-goods-pic"><img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" alt=""></div>
        <div class="special-goods-info">
          <div class="special-goods-name p-nowrapm">creamy blue动物毛眼部化妆刷</div>
          <div class="special-goods-price">
            <span class="special-price-span1">￥</span>180
            <span class="special-price-span2">￥150</span>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
// import '@/styles/life.css'
export default {
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
  font-size: 0.28rem;
  overflow: hidden;
}

.area-header {
  height: 3.81rem;
  background: url('../../../assets/img/area_01.png') center top /100% 100%;
  position: relative;
  z-index: 2;
  position: relative;
}
.header-session {
  position: absolute;
  left: 0.5rem;
  bottom: 0.8rem;
  height: 1.73rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #ffffff;
}
.area-tit {
  font-size: 0.38rem;
  line-height: 0.68rem;
}
.area-subtit {
  font-size: 0.28rem;
  line-height: 0.58rem;
}
.special-list {
  width: 7.1rem;
  margin: -0.8rem auto 0;
  position: relative;
  z-index: 6;
  background-color: #fff;
  border-radius: 0.1rem;
  padding: 0.4rem 0.3rem;
}
.special-item {
  margin-bottom: 0.3rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #f0f0f0;
}
.special-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}
.special-goods-pic {
  width: 1.6rem;
  height: 1.6rem;
  display: flex;
  border-radius: 0.04rem;
  overflow: hidden;
}
.special-goods-info {
  width: 4.72rem;
}
.special-goods-name {
  font-size: 0.3rem;
  color: #222;
  line-height: 0.44rem;
  margin-bottom: ;
  margin-top: 0.4rem;
}
.special-goods-price {
  height: 0.66rem;
  line-height: 0.66rem;
  font-size: 0.42rem;
  color: #eb5841;
  font-weight: bold;
}
.special-goods-price span {
  font-weight: normal;
  font-size: 0.24rem;
}
.special-price-span2 {
  color: #999999;
  text-decoration: line-through;
}
</style>
