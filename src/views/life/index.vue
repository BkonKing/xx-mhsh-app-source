<template>
	<div class="app-body tf-bg" :style="{ 'min-height': windowHeight+'px'}">
		<div class="life-header">
			<div class="header-tit flex-between">
				<div class="color-222 font-34 font-weight">美好生活</div>
				<div class="header-right flex-center"></div>
			</div>
			<div class="header-search">
				<div class="flex-center"><img src="" alt="">夏季防晒</div>
			</div>
		</div>
		<div class="life-swipe">
			<van-swipe :autoplay="3000" indicator-color="white">
			  <van-swipe-item><img src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622112505_52991.png" alt=""></van-swipe-item>
			  <van-swipe-item><img src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" alt=""></van-swipe-item>
			</van-swipe>
		</div>
		<div class="block-session life-session">
			<div class="life-tit flex-between">
				<div class="color-222 font-34 font-weight flex-align-center">
					<span>9.9特卖</span>
				</div>
				<div><van-icon class="van-icon" name="arrow" size="0.32rem" color="#aaa" /></div>
			</div>
			<div class="life-goods-list flex-align-center">
				<div class="life-goods-item">
					<div class="life-goods-pic"><img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" alt=""></div>
					<div class="life-goods-name color-222 font-24 p-nowrap">宠物调节安全趾甲剪</div>
					<div class="life-goods-price"><span>￥2200</span> <span>￥2400</span></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Swipe, SwipeItem, Icon } from 'vant'

// import '@/styles/life.css'
export default {
  components: {
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight
    }
  }
}
</script>

<style  scoped>
@import '../../styles/life.css';
.app-body {
  background-color: #f2f2f4;
  font-size: 0.28rem;
  overflow: hidden;
}
.life-header {
	background-color: #fff;
}
.header-tit {
	height: 0.88rem;
	padding-left: 0.3rem;
}
.header-right {
	width: 1.04rem;
	height: 100%;
}
.header-right img {
	width: 0.44rem;
	height: 0.44rem;
}
.header-search {
	height: 0.88rem;
	padding: 0 0.3rem 0.22rem;
}
.header-search div {
	height: 100%;
	color: #8f8f94;
	background-color: #f2f2f4;
}
.header-search div img {
	width: 0.32rem;
	height: 0.32rem;
	margin-right: 0.1rem;
}
/*轮播*/
.life-swipe {
	height: 2.4rem;
}
.life-swipe .van-swipe {
	height: 100%;
}
.life-swipe .van-swipe-item img {
	width: 100%;
	height: 100%;
}
/*特卖、专区*/
.life-session {
	margin-top: 0.3rem;
}
.life-tit {
	height: 1.02rem;
	padding: 0.1rem 0.3rem 0;
}
.life-goods-list {
	width: 6.5rem;
	margin: 0 auto;
	height: 3.42rem;
	overflow-x: auto;
}
.life-goods-item {
	width: 2.2rem;
	height: 100%;
	margin-right: 0.2rem;
	border: 1px solid #000;
}
.life-goods-pic {
	display: flex;
	width: 100%;
	height: 2.2rem;
}
.life-goods-name {
	line-height: 0.62rem;
}
</style>
