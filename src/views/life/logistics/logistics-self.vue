<template>
	<div class="app-body tf-bg" :style="{ 'min-height': windowHeight+'px'}">
    <div class="order-bar bar-white"><van-nav-bar title="物流详情" :border="false" fixed left-text="" left-arrow></van-nav-bar></div>
    <div class="bar-empty"></div>
    <div class="block-session logistics-goods">
      <div class="logistics-goods-pic">
        <div class="goods-num">共2件</div>
        <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
      </div>
      <div class="logistics-tip">
        <div>配送方式：上门自提</div>
        <div>提货地点：小区活动中心</div>
      </div>
    </div>
    <div class="block-session logistics-code logistics-success">
      <img class="logistics-tick" src="@/assets/img/tick4.png" />
      <div class="logistics-status">
        <div>提货成功</div>
        <div class="color-999 font-24">2018-11-11 11:11:11</div>
      </div>
    </div>
    <div class="block-session logistics-code">
      <div class="code-tip">提货时请出示二维码给商家</div>
      <div class="code-pic">
        <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
      </div>
    </div>
	</div>
</template>

<script>
import { NavBar } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar,
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
.block-session {
  margin-bottom: 30px;
}
.logistics-goods {
  margin-top: 30px;
}
.logistics-goods {
  padding: 30px 0 30px 30px;
  display: flex;
  position: relative;
}
.logistics-goods-pic {
  width: 114px;
  height: 114px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}
.goods-num {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: rgba(0,0,0,0.5);
  color: #fff;
  font-size: 22px;
}
.logistics-tip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  color: #222;
}
.logistics-tip div {
  line-height: 57px;
}
.logistics-code {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.logistics-success {
  align-items: center;
  height: 147px;
}
.code-tip {
  color: #8f8f94;
  line-height: 86px;
  margin-top: 50px;
}
.code-pic {
  width: 380px;
  height: 380px;
  margin-bottom: 82px;
}
.logistics-tick {
  width: 36px;
  height: 36px;
  margin: 0 30px;
}
.logistics-status {
  width: 614px;
  line-height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.logistics-status div {
  line-height: 46px;
}

</style>
