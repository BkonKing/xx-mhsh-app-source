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
.block-session {
  margin-bottom: 0.3rem;
}
.logistics-goods {
  margin-top: 0.3rem;
}
.logistics-goods {
  padding: 0.3rem 0 0.3rem 0.3rem;
  display: flex;
  position: relative;
}
.logistics-goods-pic {
  width: 1.14rem;
  height: 1.14rem;
  border-radius: 0.04rem;
  overflow: hidden;
  position: relative;
}
.goods-num {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.4rem;
  text-align: center;
  line-height: 0.4rem;
  background-color: rgba(0,0,0,0.5);
  color: #fff;
  font-size: 0.22rem;
}
.logistics-tip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.2rem;
  color: #222;
}
.logistics-tip div {
  line-height: 0.57rem;
}
.logistics-code {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.logistics-success {
  align-items: center;
  height: 1.47rem;
}
.code-tip {
  color: #8f8f94;
  line-height: 0.86rem;
  margin-top: 0.5rem;
}
.code-pic {
  width: 3.8rem;
  height: 3.8rem;
  margin-bottom: 0.82rem;
}
.logistics-tick {
  width: 0.36rem;
  height: 0.36rem;
  margin: 0 0.3rem;
}
.logistics-status {
  width: 6.14rem;
  line-height: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.logistics-status div {
  line-height: 0.46rem;
}

</style>
