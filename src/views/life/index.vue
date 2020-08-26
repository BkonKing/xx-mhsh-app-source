<template>
	<div class="app-body">
		<!-- <div class="status-box"></div> -->
		<div class="fixed-top" :style="{'top':$store.state.paddingTop+'px'}">
			<div class="life-header">
				<div class="header-tit flex-between">
					<div class="font-34 font-weight">美好生活</div>
					<div class="header-right flex-align-center">
						<div class="header-link" @click="linkFunc(6)"><img class="img-100" src="@/assets/img/icon_16.png" /></div>
						<div class="header-link" @click="linkFunc(1)"><img class="img-100" src="@/assets/img/icon_17.png" /></div>
					</div>
				</div>
			</div>
			<div class="public-nav">
	      <scrollBar direction="x" :activeIndex="activeIndex">
	        <div
	          class="scroll-barItem"
	          v-for="(item, index) in navList"
	          :key="index"
	          @click="changeNav(item, index)"
	          :class="index === activeIndex ? 'active' : null"
	        >
	          <div>{{item.category_name}}</div>
	        </div>
	      </scrollBar>
	    </div>
	    <div v-if="activeIndex > 0 && navList2.length" class="seconds-nav">
	    	<scrollBar direction="x" :activeIndex="activeIndex2">
	        <div
	          class="seconds-scroll-barItem"
	          v-for="(item, index) in navList2"
	          :key="index"
	          @click="changeNav2(index, item.id)"
	          :class="index === activeIndex2 ? 'active' : null"
	        >
	          <div>{{item.category_name}}</div>
	        </div>
	      </scrollBar>
	    </div>
	    <div v-else class="seconds-nav-empty"></div>
		</div>
		<div :class="[activeIndex > 0 && navList2.length ? 'seconds-nav-show' : '','fixed-empty']"></div>
		
		<template v-if="activeIndex==0">
			<div v-if="bannerList.length > 0" class="life-swipe">
				<van-swipe :autoplay="3000" indicator-color="white">
				  <van-swipe-item v-for="(item,index) in bannerList"  @click="goLink(item.url)">
				  	<img class="img-100" :src="item.img" />
				  </van-swipe-item>
				  <!-- <van-swipe-item>
				  	<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
				  </van-swipe-item> -->
				</van-swipe>
			</div>
			<template v-for="(item, index) in lifeData">
				<template v-if="item.type == 2">
					<div v-if="item.child && item.child.length > 0" class="life-session">
						<div class="life-tit life-special-tit flex-between" @click="linkFunc(3)">
							<div class="font-34 color-fff font-weight flex-align-center">
								<span>{{item.bargain_name}}</span>
							</div>
							<div class="life-arrow-right"><img class="img-100" src="@/assets/img/right_02.png" /></div>
						</div>
						<div class="special-goods-list">
							<div v-for="(val, key) in item.child" @click="linkFunc(5,{id: val.goods_id})" class="life-goods-item">
								<div class="life-goods-pic">
									<img class="img-100" :src="val.thumb" />
								</div>
								<div class="life-goods-name color-222 font-24 p-nowrap">{{val.goods_name}}</div>
								<div class="life-goods-price">￥{{val.te_price/100}} <span>￥{{val.s_price/100}}</span></div>
							</div>
							<!-- <div class="life-goods-item">
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
							</div> -->
						</div>
					</div>
				</template>
				<template v-else-if="item.type == 1">
					<div v-if="item.child && item.child.length > 0" class="life-session">
						<div class="life-tit life-flash-tit flex-between" @click="linkFunc(2)">
							<div class="font-34 color-fff font-weight flex-align-center">
								<span>限时闪购</span>
								<van-count-down v-if="item.ollage_info && item.ollage_info.is_start==1" class="life-countdown flex-align-center" ref="countDown" :auto-start="true" :time="item.ollage_info.end_time*1000-newTime" @finish="finish">
					        <template v-slot="timeData">
					          <span class="countdown-time">{{ timeData.hours<10 ? '0'+timeData.hours : timeData.hours }}</span>
					          <div class="countdown-point">:</div>
					          <span class="countdown-time">{{ timeData.minutes<10 ? '0'+timeData.minutes : timeData.minutes }}</span>
					          <div class="countdown-point">:</div>
					          <span class="countdown-time">{{ timeData.seconds<10 ? '0'+timeData.seconds : timeData.seconds }}</span>
					        </template>
					      </van-count-down>
							</div>
							<div class="life-arrow-right"><img class="img-100" src="@/assets/img/right_02.png" /></div>
						</div>
						<div class="flash-goods-list">
							<div v-for="(val, key) in item.child" @click="linkFunc(5,{id: val.goods_id})" class="life-goods-item flex-between">
								<div class="life-goods-pic">
									<img class="img-100" :src="val.thumb" />
								</div>
								<div class="flash-goods-info">
									<div class="life-goods-name color-222 font-24 p-nowrap">{{val.goods_name}}</div>
									<div class="life-goods-price">￥{{val.o_price/100}} <span>￥{{val.s_price/100}}</span></div>
								</div>
								<div class="item-btn">
									<template v-if="item.ollage_info.is_start==1">
	                  <template v-if="val.is_over == 0">
	                    <div class="btn-collage" v-if="val.is_collage && val.order_project_id!=0">邀请拼单</div>
	                    <div class="btn-flash" v-else>马上抢</div>
	                  </template>
	                  <div v-else class="btn-over">已抢光</div>
	                </template>
	                <template v-else>
	                  <div v-if="!val.is_set" class="btn-remind flex-center" @click.stop="remindFunc(index,key,val.goods_id)"><img src="@/assets/img/icon_01.png" />提醒</div>
	                  <div v-else class="btn-remind-isset flex-center">已设提醒</div>
	                </template>
									<!-- <div class="btn-flash">马上抢</div> -->
			            <!-- <div class="btn-collage">邀请拼单</div> -->
			            <!-- <div class="btn-remind flex-center"><img src="@/assets/img/icon_01.png" />提醒</div> -->
			            <!-- <div class="btn-remind-isset flex-center">已设提醒</div> -->
			            <!-- <div class="btn-over">已抢光</div> -->
		            </div>
							</div>
							<!-- <div class="life-goods-item flex-between">
								<div class="life-goods-pic">
									<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
								</div>
								<div class="flash-goods-info">
									<div class="life-goods-name color-222 font-24 p-nowrap">宠物调节安全趾甲剪</div>
									<div class="life-goods-price">￥2200 <span>￥2400</span></div>
								</div>
							</div>
							<div class="life-goods-item flex-between">
								<div class="life-goods-pic">
									<img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
								</div>
								<div class="flash-goods-info">
									<div class="life-goods-name color-222 font-24 p-nowrap">宠物调节安全趾甲剪</div>
									<div class="life-goods-price">￥2200 <span>￥2400</span></div>
								</div>
							</div> -->
						</div>
					</div>
				</template>
				<template v-else>
					<template  v-if="item.special_type == 2">
						<div v-if="item.child && item.child.length > 0" class="special-session flex-between">
							<div class="special-list">
								<template v-if="item.child.length < 4" v-for="(val, key) in item.child">
									<div @click="linkFunc(4,{id: val.special_id})" class="height-345">
										<img class="img-100" :src="val.special_thumb" />
										<div class="special-tip">
											<div>{{val.special_name}}</div>
											<div>{{val.special_text}}</div>
										</div>
									</div>
								</template>
								<template v-else>
									<div v-if="key==0" class="height-440" @click="linkFunc(4,{id: val.special_id})">
										<img class="img-100" :src="val.special_thumb" />
										<div class="special-tip">
											<div>{{val.special_name}}</div>
											<div>{{val.special_text}}</div>
										</div>
									</div>
									<div v-if="key==2" class="height-345" @click="linkFunc(4,{id: val.special_id})">
										<img class="img-100" :src="val.special_thumb" />
										<div class="special-tip">
											<div>{{val.special_name}}</div>
											<div>{{val.special_text}}</div>
										</div>
									</div>
									<div v-if="key==1" class="height-345" @click="linkFunc(4,{id: val.special_id})">
										<img class="img-100" :src="val.special_thumb" />
										<div class="special-tip">
											<div>{{val.special_name}}</div>
											<div>{{val.special_text}}</div>
										</div>
									</div>
									<div v-if="key==3" class="height-440" @click="linkFunc(4,{id: val.special_id})">
										<img class="img-100" :src="val.special_thumb" />
										<div class="special-tip">
											<div>{{val.special_name}}</div>
											<div>{{val.special_text}}</div>
										</div>
									</div>
								</template>
							</div>
						</div>
					</template>
					<template v-else-if="item.special_type == 1">
						<div v-if="item.child && item.child.length > 0" class="life-session">
							<div class="life-tit life-area-tit flex-between" @click="linkFunc(4,{id:item.special_id})">
								<div class="font-34 font-weight flex-column-center">
									<div class="area-text-tit">{{item.special_name}}</div>
									<div class="area-text-detail">{{item.special_text}}</div>
								</div>
								<div class="life-arrow-right"><img class="img-100" src="@/assets/img/right_03.png" /></div>
							</div>
							<div class="life-goods-list flex-align-center">
								<div v-for="(val, key) in item.child" @click="linkFunc(5,{id: val.goods_id})" class="life-goods-item">
									<div class="life-goods-pic">
										<img class="img-100" :src="val.thumb" />
									</div>
									<div class="life-goods-name color-222 font-24 p-nowrap">{{val.goods_name}}</div>
									<div class="life-goods-price">￥{{val.s_price/100}} <span v-if="val.original_price && val.original_price!='0'">￥{{val.original_price/100}}</span></div>
								</div>
								<!-- <div class="life-goods-item">
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
								</div> -->
							</div>
						</div>
					</template>
					<template v-else>
						<div v-if="item.special_thumb" @click="linkFunc(4,{id:item.special_id})" class="banner-session">
							<img class="img-100" :src="item.special_thumb" />
						</div>
					</template>
				</template>
			</template>
		</template>
		<template v-else>
			<van-list
          v-model="loading"
          :finished="finished"
          finished-text=""
          @load="onLoad"
        >
        <div v-if="listData.length > 0" class="life-seconds-list">
          <div v-for="(item,index) in listData" class="life-goods-item" @click="linkFunc(5,{id:item.id})">
          	<div class="life-goods-pic">
          		<img v-if="item.sign_url" class="img-100 goods-pic-icon" :src="item.sign_url" alt="">
							<img class="img-100" :src="item.thumb" />
						</div>
						<div class="life-goods-name color-222 font-24 p-nowrap">{{item.goods_name}}</div>
						<div class="life-goods-price">￥{{item.s_price/100}} <span v-if="item.y_price && item.y_price!='0'">￥{{item.y_price/100}}</span></div>
          </div>
        </div>
        <div v-else class="empty-session">
          <img src="@/assets/img/empty_goods.png" />
          <div>暂无商品</div>
        </div>
      </van-list>
		</template>
		<div @click="linkFunc(7)" class="cart-fixed"><img src="@/assets/img/icon_18.png" /><div class="cart-num" v-if="cart_num > 0">{{cart_num}}</div></div>
		<remind-swal 
    :show-swal="showSwal"
    @closeSwal="closeSwal"
    @sureSwal="sureSwal()"></remind-swal>
	</div>
</template>

<script>
import { Swipe, SwipeItem, Icon, CountDown, List } from 'vant'
import scrollBar from '@/components/scroll-bar'
import remindSwal from './components/remind-swal'
import { getLifeInfo, getBanner, getClassifyGoods, remindSend} from '@/api/life.js'
export default {
  components: {
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [CountDown.name]: CountDown,
    [List.name]: List,
    scrollBar,
    remindSwal
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      lifeData: [],      //生活
      activeIndex: 0,    //一级菜单选中项
      activeIndex2: 0,   //二级菜单选中项
      navList: [],       //一级菜单
      navList2: [],      //二级菜单
      newTime: '',       //当前时间
      bannerList: [],    //轮播图
      cart_num: 0,
      showSwal: false,       //提醒弹窗

      category_id: '',  //分类id
      listData: [],     //分类商品
      loading: false,
      finished: true
    }
  },
	// beforeRouteEnter(to, form, next) {
	// 	var txAnalysis = api.require('txAnalysis');
	// 	txAnalysis.trackPageBegin({
	// 	    page : 'life'
	// 	});
 //    next()
 //  },
  deactivated(){
  	// console.log('leave')
  // 	var txAnalysis = api.require('txAnalysis');
		// txAnalysis.trackPageEnd({
		//     page : 'life'
		// });
  },
  created () {
  	var cartList = api.getPrefs({sync: true, key: 'cart' }) || [];
  	var cart_num = 0;
  	if(cartList && cartList.length > 0){
  		cartList = JSON.parse(cartList);
  		for(var i=0;i<cartList.length;i++){
  			cart_num+=parseInt(cartList[i].count);
  		}
  	}
  	this.cart_num = cart_num;
    this.getData();
  },
  methods:{
  	onLoad() {
      this.getGoodsData();
    },
  	getData () {
  		getLifeInfo().then(res => {
        if (res.success) {
          this.lifeData = res.data;
          this.newTime = parseInt(new Date().getTime());
        }
      });
      getBanner().then(res => {
        if (res.success) {
          this.bannerList = res.data;
        }
      });
      this.getGoodsData();
    },
    getGoodsData () {
      getClassifyGoods({
        page: this.page,
        category_id: this.category_id,
      }).then(res => {
        if (res.success) {
        	this.flag = true;
          if(this.navList.length == 0){
          	this.navList = [{'category_name': '推荐'}];
          	this.navList = this.navList.concat(res.data.category_list);
            console.log(this.navList);
            if(res.data.category_list[this.activeIndex].children){
              this.navList2 = res.data.category_list[this.activeIndex].children
            }
          }else {
          	this.listData = this.page == 1 ? res.data.goods_list : this.listData.concat(res.data.goods_list);
	          this.isEmpty = this.page == 1 && res.data.goods_list.length ==0 ? true : false;
	          if(res.data.goods_list.length < res.pageSize){
	            this.finished = true;
	            this.flag = true;
	          }else {
	          	this.flag = false;
	            this.page = this.page+1;
	          }
	          this.loading = false;
          }
        }
      })
    },
    goLink(url){
    	this.$router.push(url);
    },
    changeNav(item, index) {
      this.activeIndex = index;
      if(index > 0){
      	this.category_id = this.navList[index].id;
	      if(this.navList[index].children){
	        this.navList2 = this.navList[index].children;
	        this.category_id = this.navList[index].children[0].id
	      }else {
	        this.navList2 = [];
	      }
	      this.listInit();
      }else {
      	this.page = 1;
      	this.finished = true;
      }
    },
    changeNav2(index, id) {
      this.activeIndex2 = index;
      this.category_id = id;
      this.listInit();
    },
    listInit(){
    	this.page = 1;
      this.loading = false;
      this.finished = false;
      this.listData = [];
      if(!this.flag){
      	this.getGoodsData();
      }
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
    closeSwal(data){
      this.showSwal = data == 1 ? true : false;
    },
    /**
     * 提醒
    */
    remindFunc(index,key, id) {
      const that = this;
      this.set_id = id;
      this.set_index = key;
      this.set_item_index = index;
      let newTime = parseInt(new Date().getTime()/1000);
      let overTime = this.listData[this.set_index].ollage_info.start_time;
      if(newTime >=overTime){   //当前时间大于等于活动开始时间
        Toast('该商品已开抢');
        setTimeout(() => {
          that.listData[that.set_index].ollage_info.is_start = true;
        }, 1500);
      }else {
        this.showSwal = true;
      }
    },
    /**
     * 提醒回调
    */
    sureSwal: function (e) {
      const that = this;
      this.closeSwal(0);
      remindSend({
        goods_id: this.set_id,
        ollage_id: this.listData[this.set_item_index].ollage_info.id
      }).then(res => {
        if (res.success) {
          Toast(res.message);
          this.listData[this.set_item_index].ollage_info.child[this.set_index].is_set = true;
        }
      })
    },
    linkFunc (type,obj={}) {
    	switch (type){
    		case 1:
    		// this.$router.push('/address/list');
    		this.$router.push('/store/goods-classify');
    		break;
    		case 2:
    		this.$router.push('/store/flash-purchase');
    		break;
    		case 3:
    		this.$router.push('/store/special-sale');
    		break;
    		case 4:
    		this.$router.push({
	      	path: '/store/special-area',
	      	query: {
	      		id: obj.id
	      	}
	      });
    		break;
    		case 5:
    		this.$router.push({
	      	path: '/store/goods-detail',
	      	query: {
	      		id: obj.id
	      	}
	      })
    		break;
    		case 6:
    		this.$router.push('/store/search');
    		break;
    		case 7:
    		this.$router.push('/life/cart');
    		break;
    	}
    },
  }
}
</script>

<style scoped  src="../../styles/life.css"></style>
<style  scoped>
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
	/*height: 176px;*/
	height: 206px;
}
.seconds-nav-show.fixed-empty {
	height: 300px;
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
  display: inline-block;
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
.seconds-nav {
	height: 114px;
  background-color: #fff;
  padding: 30px 0;
}
.seconds-scroll-barItem {
	display: inline-block;
}
.seconds-scroll-barItem:first-child {
	margin-left: 30px;
}
.seconds-scroll-barItem div {
  height: 54px;
  line-height: 54px;
  padding: 0 30px;
  color: #222;
  border-radius: 4px;
  border: 1.2px solid #f0f0f0;
  position: relative;
  margin-right: 20px;
}
.seconds-scroll-barItem.active div {
  color: #eb5841;
  background-color: #fdeeec;
  border: 1.2px solid #fdeeec;
}


/*轮播*/
.life-swipe {
	height: 326px;
	width: 710px;
	border-radius: 10px;
	overflow: hidden;
	margin: 30px auto 80px;
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
	margin-bottom: 80px;
}
.life-tit {
	width: 710px;
	padding: 10px 30px 60px;
	height: 162px;
	margin: 0 auto;
}
.life-arrow-right {
	width: 15px;
	height: 26px;
}
.life-special-tit {
	background: url('../../assets/img/bg_01.png') center top /100% 100%;
}
.life-flash-tit {
	background: url('../../assets/img/bg_02.png') center top /100% 100%;
}
.life-goods-list {
	/*width: 720px;
	margin-left: 30px;*/
	padding-left: 30px;
	height: 367px;
	overflow-x: auto;
	white-space: nowrap;
}
.special-goods-list,.flash-goods-list {
	width: 690px;
	margin: -60px auto 0;
	background-color: #fff;
	padding: 20px 0 0 20px;
	border-radius: 10px;
	box-shadow: 0 4px 13px rgba(99,99,99,0.2);
	display: flex;
	flex-wrap: wrap;
}
.flash-goods-list {
	padding-right: 20px;
}
.life-goods-list::-webkit-scrollbar {
  display: none;
}
.life-goods-item {
	width: 230px;
	height: 100%;
	margin-right: 20px;
	flex-shrink: 0;
	position: relative;
}
.special-goods-list .life-goods-item {
	width: 203px;
	height: 348px;
}
.flash-goods-list .life-goods-item {
	width: 100%;
	height: 203px;
	margin: 0 0 20px 0;
}
.special-goods-list .life-goods-item:nth-child(3n) {
	margin-right: 0;
}
.life-goods-pic {
	display: flex;
	width: 100%;
	height: 230px;
	border-radius: 10px;
	overflow: hidden;
	background-color: #f4f4f4;
	position: relative;
}
.goods-pic-icon {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 5;
}
.special-goods-list .life-goods-pic,
.flash-goods-list .life-goods-pic {
	height: 203px;
	border-radius: 4px;
}
.flash-goods-list .life-goods-pic {
	width: 203px;
}
.flash-goods-info {
	flex-grow: 1;
	margin-left: 20px;
	height: 100%;
}
.life-goods-name {
	line-height: 42px;
	margin-top: 10px;
	font-size: 24px;
}
.flash-goods-info .life-goods-name {
	font-size: 28px;
	line-height: 46px;
	margin-top: 8px;
}
.life-goods-price {
	font-size: 30px;
	color: #eb5841;
	font-weight: bold;
	line-height: 44px;
}
.flash-goods-info .life-goods-price {
	font-size: 42px;
	line-height: 52px;
}
.life-goods-price span {
	font-weight: normal;
	font-size: 24px;
	color: #8f8f94;
	text-decoration: line-through;
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
	background-color: #fff;
	color: #448fe4;
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
	position: relative;
}
.countdown-point::before,.countdown-point::after {
	content: '';
	position: absolute;
	width: 4px;
	height: 4px;
	background-color: #fff;
	border-radius: 50%;
	left: 8px;
}
.countdown-point::before {
	top: 16px;
}
.countdown-point::after {
	bottom: 16px;
}

.special-session {
	margin: 34px auto 28px;
	width: 710px;
	/*height: 805px;*/
}
.special-list {
	/*height: 100%;*/
	width: 100%;
	-moz-column-count: 2;
	/* Firefox */
  -webkit-column-count: 2;
	/* Safari 和 Chrome */
  column-count: 2;
	-moz-column-gap: 20px;
	-webkit-column-gap: 20px;
	column-gap: 20px;
}
.special-list > div {
	width: 345px;
	position: relative;
	/*padding-bottom: 20px;*/
	break-inside: avoid;
	margin-bottom: 20px;
}
.special-list > div img {
	border-radius: 10px;
}
.height-440 {
	height: 440px;
	overflow: hidden;
}
.height-345 {
	height: 345px;
	overflow: hidden;
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
	padding: 0 30px 0 10px;
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
  /*闪购*/
.item-btn {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 140px;
  height: 66px;
}
.item-btn div {
  height: 100%;
  line-height: 66px;
  color: #ffffff;
  text-align: center;
  border-radius: 10px;
  font-size: 26px;
}
.btn-flash {
  background: #2da0fb;
}
.btn-collage {
  background: linear-gradient(to right, #eb5842 , #f9856a);
}
.item-btn .btn-remind {
  border: 2px solid #2da0fb;
  color: #2da0fb;
}
.item-btn .btn-remind-isset {
  border: 2px solid #aaa;
  color: #8f8f94;
}
.item-btn .btn-over {
  color: #8f8f94;
}
.item-small .btn-over {
  text-align: right;
}
.btn-remind img {
  width: 36px;
  height: 38px;
  margin-right: 10px;
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

/*二级菜单商品*/
.life-seconds-list {
	padding-left: 30px;
	display: flex;
	flex-wrap: wrap;
	/*padding-bottom: 100px;*/
}
.life-seconds-list .life-goods-item {
	width: 330px;
	height: 492px;
	margin-right: 30px;
	flex-shrink: 0;
}
.life-seconds-list .life-goods-pic {
	height: 330px;
}
.life-seconds-list .life-goods-name {
	line-height: 46px;
	margin-top: 20px;
	font-size: 28px;
}
.life-goods-price {
	font-size: 34px;
	line-height: 46px;
}
div.empty-session {
	padding-top: 100px;
}
</style>
