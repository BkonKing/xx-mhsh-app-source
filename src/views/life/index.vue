<template>
	<div class="app-body" :style="{ 'min-height': windowHeight+'px'}">
		<div class="fixed-top">
			<div class="life-header">
				<div class="header-tit flex-between">
					<div class="font-34 font-weight">美好生活</div>
					<div class="header-right flex-align-center">
						<div class="header-link" @click="linkFunc(6)"><img class="img-100" src="@/assets/img/icon_16.png" /></div>
						<div class="header-link" @click="linkFunc(1)"><img class="img-100" src="@/assets/img/icon_17.png" /></div>
					</div>
				</div>
			</div>
			<div v-if="1==1" class="public-nav">
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
		</div>
		<div class="fixed-empty"></div>
		
		<div class="life-swipe">
			<van-swipe :autoplay="3000" indicator-color="white">
			  <van-swipe-item>
			  	<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622112505_52991.png" />
			  </van-swipe-item>
			  <van-swipe-item>
			  	<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
			  </van-swipe-item>
			</van-swipe>
		</div>
		<div class="life-session">
			<div class="life-tit life-special-tit flex-between" @click="linkFunc(3)">
				<div class="font-34 font-weight flex-align-center">
					<span>9.9特卖</span>
				</div>
				<div class="life-arrow-right"><img class="img-100" src="@/assets/img/right_03.png" /></div>
			</div>
			<div class="life-goods-list flex-align-center" @click="linkFunc(5)">
				<div class="life-goods-item">
					<div class="life-goods-pic">
						<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
					</div>
					<div class="life-goods-name color-222 font-24 p-nowrap">宠物调节安全趾甲剪</div>
					<div class="life-goods-price">￥2200 <span>￥2400</span></div>
				</div>
				<div class="life-goods-item">
					<div class="life-goods-pic">
						<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
					</div>
					<div class="life-goods-name color-222 font-24 p-nowrap">宠物调节安全趾甲剪</div>
					<div class="life-goods-price">￥2200 <span>￥2400</span></div>
				</div>
				<div class="life-goods-item">
					<div class="life-goods-pic">
						<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
					</div>
					<div class="life-goods-name color-222 font-24 p-nowrap">宠物调节安全趾甲剪</div>
					<div class="life-goods-price">￥2200 <span>￥2400</span></div>
				</div>
				<div class="life-goods-item">
					<div class="life-goods-pic">
						<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
					</div>
					<div class="life-goods-name color-222 font-24 p-nowrap">宠物调节安全趾甲剪</div>
					<div class="life-goods-price">￥2200 <span>￥2400</span></div>
				</div>
			</div>
		</div>
		<div class="life-session">
			<div class="life-tit flex-between" @click="linkFunc(2)">
				<div class="font-34 font-weight flex-align-center">
					<span>限时闪购</span>
					<van-count-down class="life-countdown flex-align-center" ref="countDown" :auto-start="false" :time="time" @finish="finish">
		        <template v-slot="timeData">
		          <span class="countdown-time">{{ timeData.hours }}</span>
		          <div class="countdown-point"></div>
		          <span class="countdown-time">{{ timeData.minutes }}</span>
		          <div class="countdown-point"></div>
		          <span class="countdown-time">{{ timeData.seconds }}</span>
		        </template>
		      </van-count-down>
				</div>
				<div class="life-arrow-right"><img class="img-100" src="@/assets/img/right_03.png" /></div>
			</div>
			<div class="life-goods-list flex-align-center" @click="linkFunc(5)">
				<div class="life-goods-item">
					<div class="life-goods-pic">
						<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
					</div>
					<div class="life-goods-name color-222 font-24 p-nowrap">宠物调节安全趾甲剪</div>
					<div class="life-goods-price">￥2200 <span>￥2400</span></div>
				</div>
				<div class="life-goods-item">
					<div class="life-goods-pic">
						<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
					</div>
					<div class="life-goods-name color-222 font-24 p-nowrap">宠物调节安全趾甲剪</div>
					<div class="life-goods-price">￥2200 <span>￥2400</span></div>
				</div>
				<div class="life-goods-item">
					<div class="life-goods-pic">
						<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
					</div>
					<div class="life-goods-name color-222 font-24 p-nowrap">宠物调节安全趾甲剪</div>
					<div class="life-goods-price">￥2200 <span>￥2400</span></div>
				</div>
			</div>
		</div>
		<div class="special-session flex-between">
			<div class="flex-between special-list">
				<div class="height-440">
					<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
					<div class="special-tip">
						<div>湿热的梅雨季</div>
						<div>如何在家干爽舒适如晴天？</div>
					</div>
				</div>
				<div class="height-345">
					<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
					<div class="special-tip">
						<div>百变酷炫蓝牙音箱</div>
						<div>要的就是这个范</div>
					</div>
				</div>
			</div>
			<div class="flex-between special-list">
				<div class="height-345">
					<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
					<div class="special-tip">
						<div>百变酷炫蓝牙音箱</div>
						<div>要的就是这个范</div>
					</div>
				</div>
				<div class="height-440">
					<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
					<div class="special-tip">
						<div>湿热的梅雨季</div>
						<div>如何在家干爽舒适如晴天？</div>
					</div>
				</div>
			</div>
		</div>
		<div class="life-session">
			<div class="life-tit life-area-tit flex-between" @click="linkFunc(4)">
				<div class="font-34 font-weight flex-column-center">
					<div class="area-text-tit">夏天的幸福感</div>
					<div class="area-text-detail">来自于这些清凉神器</div>
				</div>
				<div class="life-arrow-right"><img class="img-100" src="@/assets/img/right_03.png" /></div>
			</div>
			<div class="life-goods-list flex-align-center" @click="linkFunc(5)">
				<div class="life-goods-item">
					<div class="life-goods-pic">
						<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
					</div>
					<div class="life-goods-name color-222 font-24 p-nowrap">宠物调节安全趾甲剪</div>
					<div class="life-goods-price">￥2200 <span>￥2400</span></div>
				</div>
				<div class="life-goods-item">
					<div class="life-goods-pic">
						<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
					</div>
					<div class="life-goods-name color-222 font-24 p-nowrap">宠物调节安全趾甲剪</div>
					<div class="life-goods-price">￥2200 <span>￥2400</span></div>
				</div>
				<div class="life-goods-item">
					<div class="life-goods-pic">
						<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
					</div>
					<div class="life-goods-name color-222 font-24 p-nowrap">宠物调节安全趾甲剪</div>
					<div class="life-goods-price">￥2200 <span>￥2400</span></div>
				</div>
				<div class="life-goods-item">
					<div class="life-goods-pic">
						<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
					</div>
					<div class="life-goods-name color-222 font-24 p-nowrap">宠物调节安全趾甲剪</div>
					<div class="life-goods-price">￥2200 <span>￥2400</span></div>
				</div>
			</div>
		</div>
		<div class="banner-session">
			<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
		</div>
		<div class="cart-fixed"><img src="@/assets/img/icon_18.png" /><div class="cart-num">19</div></div>
	</div>
</template>

<script>
import { Swipe, SwipeItem, Icon, CountDown } from 'vant'
import scrollBar from '@/components/scroll-bar'
export default {
  components: {
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [CountDown.name]: CountDown,
    scrollBar
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      time: 11 * 60 * 60 * 1000,
      activeIndex: 0,
      options: [
        {id: 1, name: '首页'},
        {id: 2, name: '精选'},
        {id: 3, name: '限时抢购'},
        {id: 4, name: '热门推荐'},
        {id: 5, name: '聚划算'},
        {id: 6, name: '热门推荐'}, 
      ],
    }
  },
  methods:{
    linkFunc (type) {
    	switch (type){
    		case 1:
    		this.$router.push('/store/goods-classify');
    		break;
    		case 2:
    		this.$router.push('/store/flash-purchase');
    		break;
    		case 3:
    		this.$router.push('/store/special-sale');
    		break;
    		case 4:
    		this.$router.push('/store/special-area');
    		break;
    		case 5:
    		this.$router.push({
	      	path: '/store/goods-detail',
	      	query: {
	      		id: 1
	      	}
	      })
    		break;
    		case 6:
    		this.$router.push('/store/search');
    		break;
    	}
    },
    changeNav(item, index) {
      this.activeIndex = index;
    },
    //倒计时开始
    start() {
      this.$refs.countDown.start();
    },
    //倒计时暂停
    pause() {
      this.$refs.countDown.pause();
    },
    //倒计时结束
    finish() {
      Toast('倒计时结束');
    },
  }
}
</script>
<style  scoped>
@import '../../styles/life.css';
.app-body {
  background-color: #fff;
  font-size: 0.28rem;
  color: #222;
}
.fixed-top {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 20;
}
.fixed-empty {
	height: 196px;
}
.life-header {
	background-color: #fff;
}
.header-tit {
	height: 88px;
	padding-left: 0.3rem;
}
.header-right {
	height: 100%;
}
.header-link {
	height: 100%;
	width: 72px;
	height: 72px;
	padding: 14px;
}
.header-link:last-child {
	margin-right: 16px;
}

/*导航*/
.public-nav {
  height: 89px;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
}
.scroll-barItem {
  font-size: 30px;
}
.scroll-barItem div {
  height: 88px;
  line-height: 88px;
  padding: 0 30px;
  color: #222;
  position: relative;
}
.scroll-barItem.active div {
  color: #eb5841;
  font-size: 34px;
  font-weight: bold;
}
.scroll-barItem.active div:after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: -30px;
  width: 60px;
  height: 4px;
  border-radius: 2px;
  background-color: #eb5841;
}

/*轮播*/
.life-swipe {
	height: 326px;
	width: 710px;
	border-radius: 10px;
	overflow: hidden;
	margin: 30px auto 40px;
}
.life-swipe .van-swipe {
	height: 100%;
}
.life-swipe .van-swipe-item img {
	width: 100%;
	height: 100%;
}
/*特卖、闪购、专区*/
.life-session {
	/*margin-top: 0.3rem;*/
}
.life-tit {
	padding: 0 30px;
	height: 104px;
}
.life-arrow-right {
	width: 15px;
	height: 26px;
}
.life-special-tit {
	padding-top: 12px;
}
.life-goods-list {
	/*width: 720px;
	margin-left: 30px;*/
	padding-left: 30px;
	height: 367px;
	overflow-x: auto;
	white-space: nowrap;
}
.life-goods-list::-webkit-scrollbar {
  display: none;
}
.life-goods-item {
	width: 230px;
	height: 100%;
	margin-right: 20px;
	flex-shrink: 0;
}
.life-goods-pic {
	display: flex;
	width: 100%;
	height: 230px;
}
.life-goods-name {
	line-height: 42px;
	margin-top: 10px;
	font-size: 24px;
}
.life-goods-price {
	font-size: 30px;
	color: #eb5841;
	font-weight: bold;
	line-height: 44px;
}
.life-goods-price span {
	font-weight: normal;
	font-size: 24px;
	color: #8f8f94;
}
.life-countdown {
	height: 44px;
	margin-left: 20px;
}
.life-countdown div {
	height: 100%;
	line-height: 44px;
	text-align: center;
}
.countdown-time {
	width: 66px;
	text-align: center;
	background-color: #ffa110;
	color: #fff;
	font-size: 26px;
}
.countdown-time:nth-of-type(1) {
	border-radius: 22px 0 0 22px;
}
.countdown-time:nth-child(5) {
	border-radius: 0 22px 22px 0;
}
.countdown-point {
	width: 20px;
	font-size: 26px;
	color: #ffa110;
	font-weight: bold;
}

.special-session {
	margin: 34px auto 48px;
	width: 710px;
	height: 805px;
}
.special-list {
	height: 100%;
	width: 345px;
	flex-direction: column;
}
.special-list > div {
	width: 100%;
	position: relative;
}
.height-440 {
	height: 440px;
}
.height-345 {
	height: 345px;
}
.special-tip {
	position: absolute;
	top: 20px;
	left: 20px;
	color: #fff;
}
.special-tip div:nth-child(1) {
	font-size: 30px;
	font-weight: bold;
	line-height: 46px
}
.special-tip div:nth-child(2) {
	font-size: 24px;
	line-height: 40px
}
.life-area-tit {
	height: 138px;
}
.life-area-tit .life-arrow-right {
	margin-top: 52px;
	height: 86px;
	padding: 30px 0;
}
.area-text-tit {
	line-height: 52px;
}
.area-text-detail {
	line-height: 42px;
	font-weight: normal;
	font-size: 24px;
	color: #8f8f94;
}
.banner-session {
	margin: 34px auto 74px;
	width: 710px;
	height: 326px;
	border-radius: 10px;
	overflow: hidden;
}

/*购物车*/
.cart-fixed {
	position: fixed;
	right: 20px;
	bottom: 138px;
	width: 110px;
	height: 110px;
	border-radius: 50%;
	background-color: #fff;
	box-shadow: 0 4px 13px rgba(160,160,160,0.4);
	z-index: 55;
	display: flex;
}
.cart-fixed img {
	width: 60px;
	height: 60px;
	margin: 25px 0 0 25px;
}
.cart-num {
	position: absolute;
	top: 0;
	right: 0;
	min-width: 34px;
	height: 34px;
	background-color: #eb5841;
	border-radius: 17px;
	padding: 0 8px;
	text-align: center;
	font-size: 24px;
	color: #fff;
}
</style>
