<template>
	<div class="app-body">
		<div class="order-bar bar-white">
			<van-nav-bar
        title="申请退换"
        fixed
        :border="false"
        placeholder
        left-arrow
        @click-left="$router.go(-1)"
      ></van-nav-bar>
		</div>
		<div class="apply-tit">请选择退换</div>
		<div class="block-session">
			<div class="common-list">
				<div v-if="infoData.is_barter" class="common-item" @click="linkFunc(15,{id:2})">
					<div class="item-left flex-column-center">
						<div class="font-30 color-222">我要换货</div>
						<div class="font-24 color-8f8f94">自行寄回退货商品</div>
				  </div>
					<div class="link-icon">
            <img class="img-100" src="@/assets/img/right.png" mode=""/>
          </div>
				</div>
				<div v-if="infoData.is_returnfund" class="common-item" @click="linkFunc(17,{id:3,type:2})">
					<div class="item-left flex-column-center">
						<div class="font-30 color-222">我要退货退款</div>
						<div class="font-24 color-8f8f94">自行寄回退货商品</div>
				  </div>
					<div class="link-icon">
            <img class="img-100" src="@/assets/img/right.png" mode=""/>
          </div>
				</div>
				<div v-if="infoData.is_refund" class="common-item" @click="linkFunc(17,{id:3,type:1})">
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
import { NavBar } from 'vant'
import { getApplyType} from '@/api/life.js'
export default {
  components: {
    [NavBar.name]: NavBar,
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      id: '',
      infoData: ''
    }
  },
  created(){
    this.order_id = this.$route.query.id;
    this.logistice_id = this.$route.query.logistice_id;
    this.getData();
  },
  methods: {
  	getData () {
      getApplyType({
        logistice_id: this.logistice_id
      }).then(res => {
        if (res.success) {
        	this.infoData = res.data;
        }
      })
    },
    linkFunc (type,obj={}) {
    	switch (type){
    		case 15:
    		this.$router.push({
	      	path: '/order/apply-barter',
	      	query: {
	      		logistice_id: this.logistice_id,
	      		order_id: this.order_id,
	      	}
	      })
    		break;
    		case 17:
    		this.$router.push({
	      	path: '/order/apply-refund',
	      	query: {
	      		id: obj.id,
	      		type: obj.type,
	      		logistice_id: this.logistice_id,
	      		order_id: this.order_id,
	      	}
	      })
    		break;
    	}
    },
  }
}
</script>

<style scoped  src="../../../styles/life.css"></style>
<style scoped>
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
