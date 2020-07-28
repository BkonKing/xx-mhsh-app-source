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
  font-size: 28px;
  overflow: hidden;
}

.area-header {
  height: 381px;
  background: url('../../../assets/img/area_01.png') center top /100% 100%;
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
  width: 160px;
  height: 160px;
  display: flex;
  border-radius: 4px;
  overflow: hidden;
}
.special-goods-info {
  width: 472px;
}
.special-goods-name {
  font-size: 30px;
  color: #222;
  line-height: 44px;
  margin-bottom: ;
  margin-top: 40px;
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
