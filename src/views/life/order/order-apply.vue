<template>
	<div class="app-body tf-bg" :style="{ 'min-height': windowHeight+'px'}">
		<div class="order-bar bar-white"><van-nav-bar title="申请退换" :border="false" fixed left-text="" left-arrow></van-nav-bar></div>
		<div class="bar-empty"></div>
		<div class="apply-tit">请选择退换</div>
		<div class="block-session">
			<div class="common-list">
				<div class="common-item" @click="linkFunc(1)">
					<div class="item-left flex-column-center">
						<div class="font-30 color-222">我要换货</div>
						<div class="font-24 color-8f8f94">自行寄回退货商品</div>
				  </div>
					<div class="link-icon">
            <img class="img-100" src="@/assets/img/right.png" mode=""/>
          </div>
				</div>
				<div class="common-item" @click="linkFunc(2)">
					<div class="item-left flex-column-center">
						<div class="font-30 color-222">我要退货退款</div>
						<div class="font-24 color-8f8f94">自行寄回退货商品</div>
				  </div>
					<div class="link-icon">
            <img class="img-100" src="@/assets/img/right.png" mode=""/>
          </div>
				</div>
				<div class="common-item" @click="linkFunc(3)">
					<div class="item-left flex-column-center">
						<div class="font-30 color-222">我要退款</div>
						<div class="font-24 color-8f8f94">无需退货</div>
				  </div>
					<div class="link-icon">
            <img class="img-100" src="@/assets/img/right.png" mode=""/>
          </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import '@/styles/life.css'
// import '@/styles/order.css'
export default {
  data () {
    return {
      windowHeight: document.documentElement.clientHeight
    }
  },
  methods: {
    linkFunc: function (num) {
      switch (num) {
        case 1:

					  break
        case 2:

					  break
        case 3:

					  break
      }
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
.apply-tit {
	padding: 10px 0 0 50px;
	line-height: 82px;
	color: #222;
	font-size: 24px;
}
.common-list {
	padding: 10px 30px;
}
.common-item {
	height: 132px;
}
.common-item:first-child {
	border-top: 0;
}
.link-icon {
	width: 15px;
	height: 26px;
}
.item-left div {
	line-height: 46px;
}
</style>
