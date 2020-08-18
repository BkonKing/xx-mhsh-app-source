<template>
	<div class="app-body" :style="{ 'min-height': windowHeight+'px'}">
		<div class="order-bar bar-white"><van-nav-bar title="申请换货" :border="false" fixed @click-left="$router.go(-1)" left-arrow></van-nav-bar></div>
    <div class="bar-empty"></div>
    <div class="apply-tip">如有多件商品需要换货，请一并提交申请</div>
		<div class="order-session">
			<div class="cont-session goods-session">
				<div class="can-apply">
					<div class="apply-goods">
						<div class="cart-checkbox flex-center cur" bindtap="checkboxOne" data-index="">
		          <div class="checkbox-session"></div>
		        </div>
						<div class="order-goods-info">
							<div class="order-pic-block">
								<img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg">
							</div>
							<div class="order-info">
								<div class="order-name-price">
									<div class="order-name order-name-text p-nowrap">yeah jewelry U形项链</div>
									<div class="order-price">￥20000.00</div>
								</div>
								<div class="order-sku-num">
									<div class="order-sku order-sku-text p-nowrap">规格：银色</div>
									<div class="order-buy-num">x1</div>
								</div>
								<div class="order-action-session">
									<div class="order-action-text">换货中</div>
								</div>
							</div>
						</div>
					</div>
					<div class="apply-goods">
						<div class="cart-checkbox flex-center cur" bindtap="checkboxOne" data-index="">
		          <div class="checkbox-session"></div>
		        </div>
						<div class="order-goods-info">
							<div class="order-pic-block">
								<img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg">
							</div>
							<div class="order-info">
								<div class="order-name-price">
									<div class="order-name order-name-text p-nowrap">yeah jewelry U形项链</div>
									<div class="order-price">￥20000.00</div>
								</div>
								<div class="order-sku-num">
									<div class="order-sku order-sku-text p-nowrap">规格：银色</div>
									<div class="order-buy-num">x1</div>
								</div>
								<div class="order-action-session">
									<div class="order-action-text">换货中</div>
								</div>
							</div>
							<div class="apply-select flex-between">
								<div class="select-left">
									<div>换货原因：商品质量问题</div>
									<div class="color-eb5841">换成：黑色</div>
								</div>
								<div class="select-right">
									<img class="img-100" src="@/assets/img/right.png" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="not-apply">
					<div class="apply-toggle">部分商品不支持换货(2)</div>
					<div class="order-goods-info">
						<div class="order-pic-block">
							<img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg"></img>
						</div>
						<div class="order-info">
							<div class="order-name-price">
								<div class="order-name p-nowrap">yeah jewelry U形项链</div>
								<div class="order-price">￥20000.00</div>
							</div>
							<div class="order-sku-num">
								<div class="order-sku p-nowrap">规格：银色</div>
								<div class="order-buy-num">x1</div>
							</div>
							<div class="order-action-session">
								<div class="order-action-text">不支持退货
									<div class="order-action-btn">
										<img class="img-100" src="@/assets/img/question_01.png" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="order-goods-info">
						<div class="order-pic-block">
							<img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg"></img>
						</div>
						<div class="order-info">
							<div class="order-name-price">
								<div class="order-name p-nowrap">yeah jewelry U形项链</div>
								<div class="order-price">￥20000.00</div>
							</div>
							<div class="order-sku-num">
								<div class="order-sku p-nowrap">规格：银色</div>
								<div class="order-buy-num">x1</div>
							</div>
							<div class="order-action-session">
								<div class="order-action-text">退货中</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="cont-session common-list common-list-pic">
				<div class="common-item common-item-first">
					<div class="common-item-left color-222 font-28">
						<div class="item-first-left">换货说明</div>
						<input class="item-first-right" type="text" placeholder="填写换货理由" />
					</div>
				</div>
				<div class="common-item common-item-second">
					<div class="common-item-left">
						<div class="color-222 font-28">上传凭证</div>
						<div class="color-8f8f94 font-28">(最多5张)</div>
					</div>
				</div>
				<div class="common-item pic-list no-top-border">
					<div class="pic-item">
						<img class="pic-url" src="https://bht.liwushijian.com/library/barter/2020-07/21/3_15952989190.jpg" mode="aspectFill"/>
						<div class="pic-del">
							<div class="del-bg">
								<div class="del-line"></div>
							</div>
						</div>
					</div>
					<div class="pic-item">
						<img class="pic-url" src="https://bht.liwushijian.com/library/barter/2020-07/21/3_15952989190.jpg" mode="aspectFill"/>
						<div class="pic-del">
							<div class="del-bg">
								<div class="del-line"></div>
							</div>
						</div>
					</div>
					<div class="pic-item">
						<img class="pic-url" src="https://bht.liwushijian.com/library/barter/2020-07/21/3_15952989190.jpg" mode="aspectFill"/>
						<div class="pic-del">
							<div class="del-bg">
								<div class="del-line"></div>
							</div>
						</div>
					</div>
					<div class="pic-item">
						<img class="pic-url" src="https://bht.liwushijian.com/library/barter/2020-07/21/3_15952989190.jpg" mode="aspectFill"/>
						<div class="pic-del">
							<div class="del-bg">
								<div class="del-line"></div>
							</div>
						</div>
					</div>
					<div class="pic-item">
						<div class="upload-pic">
							<!-- <van-icon class="van-icon" name="plus" size="0.52px" color="#aaa" /> -->
							<van-uploader :after-read="onRead">
							  <van-icon class="van-icon" name="plus" size="26px" color="#aaa" />
							</van-uploader>
						</div>
					</div>
				</div>
			</div>
			<div class="cont-session address-logistics">
				<div class="shipping-address">
					<div class="shipping-address-item">
						<div class="shipping-address-item-left color-222 font-28">收货地址:</div>
						<div class="shipping-address-item-right">
							<div class="shipping-address-username p-nowrap">安琪拉安琪拉安琪拉安琪拉</div>
							<div class="color-222 font-28">15000112233</div>
						</div>
					</div>
					<div class="shipping-address-item">
						<div class="shipping-address-item-left"></div>
						<div class="shipping-address-item-right">
							<div class="shipping-address-text p-nowrap">福建省福州市仓山区下渡街道三盛滨江国际三盛滨江国</div>
						</div>
					</div>
				</div>
			</div>

		</div>
		<div class="fixed-submit-empty"></div>
		<div class="submit-fixed-buttom">
			<div class="submit-btn">
				<div class="color-fff font-30">提交</div>
			</div>
		</div>
		<explain-swal 
    :show-swal="showExplainSwal"
    :swal-cont="swalCont"
    @closeSwal="closeExplainSwal"
    ></explain-swal>
    <reason-swal 
    :show-swal="showSwal"
    :swal-list="swalList"
    @closeSwal="closeSwal"
    @sureSwal="sureSwal"
    ></reason-swal>
	</div>
</template>

<script>
import { Swipe, SwipeItem, Icon, NavBar } from 'vant'
import reasonSwal from './../components/reason-swal'
import explainSwal from './../components/explain-swal'
export default {
  components: {
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NavBar.name]: NavBar,
    reasonSwal,
    explainSwal
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      showExplainSwal: false, //说明弹窗
      swalCont: '贵重物品、贴身衣物、肉类果蔬生鲜商品、定制商品、虚拟商品、报纸期刊等，处于信息安全或者卫生考虑，不支持无理由退货。跨境商品不支持换货。',
      showSwal: false,  //原因弹窗
      swalList: [
	      {id: 1,txt: '拍错/不喜欢'},
	      {id: 2,txt: '少件/破损/变形等'},
	      {id: 3,txt: '拍错尺码/规格/型号'}
      ]
    }
  },
  methods: {
  	// 打开弹窗
  	openExplainSwal(){
      this.showExplainSwal = true;
    },
    // 弹窗选择(回调)
    sureSwal(data){
    	console.log(data)
    	this.closeSwal(0);
    },
  	// 关闭弹窗(回调)
  	closeSwal(data){
      this.showSwal = data == 1 ? true : false;
    },
    // 关闭弹窗(回调)
  	closeExplainSwal(data){
      this.showExplainSwal = data == 1 ? true : false;
    },
  }
}
</script>
<style scoped  src="../../../styles/life.css"></style>
<style scoped  src="../../../styles/order.css"></style>
<style scoped  src="../../../styles/apply.css"></style>
<style scoped>
.goods-session {
	padding: 40px 0 0 0;
	flex-wrap: wrap;
}

</style>
