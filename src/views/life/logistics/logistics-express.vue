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
        <div>物流配送：顺丰快递</div>
        <div>运单编号：46461654640154</div>
      </div>
      <div class="copy-btn">
        <div class="copy-text">复制</div>
      </div>
    </div>

    <div v-show="false" class="no-logistics color-8f8f94">暂无物流进度</div>
    <div class="block-session logistics-body">
      <div class="logistics-list">
        <div class="logistics-item">
          <div class="item-icon-box"><div class="item-icon"></div></div>
          <div class="item-msg">哈个我哥玩歌王鹅王哈个我哥玩歌王鹅王哈个我哥玩歌王鹅王</div>
          <div class="item-time">2020.1.2 10:11:11</div>
        </div>
        <div class="logistics-item">
          <div class="item-icon-box"><div class="item-icon"></div></div>
          <div class="item-msg">哈个我哥玩歌王鹅王哈个我哥玩歌王鹅王哈个我哥玩歌王鹅王</div>
          <div class="item-time">2020.1.2 10:11:11</div>
        </div>
      </div>
      <div class="logistics-line"></div>
    </div>
	</div>
</template>

<script>
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
.copy-btn {
  position: absolute;
  right: 0.2rem;
  bottom: 0.27rem;
  padding: 0.1rem;
}
.copy-text {
  height: 0.32rem;
  line-height: 0.28rem;
  width: 0.58rem;
  color: #ffa110;
  font-size: 0.22rem;
  text-align: center;
  border: 0.02rem solid #ffa110;
}
.no-logistics {
  line-height: 1.26rem;
  text-align: center;
}
.logistics-body {
  position: relative;
  padding: 0.3rem 0.4rem 0 0.42rem;
  overflow: hidden;
}
.logistics-list {
  color: #8f8f94;
  position: relative;
  z-index: 8;
}
.logistics-item {
  position: relative;
  padding: 0 0 0.44rem 0.5rem;
}
.item-msg {
  line-height: 0.46rem;
}
.logistics-item:first-child .item-msg {
  color: #222;
}
.item-time {
  font-size: 0.24rem;
  line-height: 0.38rem;
  color: #999;
}
.item-icon-box {
  position: absolute;
  left: 0;
  top: 0.06rem;
  width: 0.16rem;
  height: 0.36rem;
  background-color: #fff;
  padding: 0.1rem 0;
}
.item-icon {
  width: 0.16rem;
  height: 0.16rem;
  background-color: #aaa;
  border-radius: 50%;
}
.logistics-item:nth-last-child(1) .item-icon-box {
  height: 100%;
}
.logistics-item:first-child .item-icon-box .item-icon {
  background-color: #eb5841;
}
.logistics-line {
  position: absolute;
  top: 0.42rem;
  bottom: 0.40rem;
  left: 0.5rem;
  width: 1px;
  background-color: #aaa;
}
</style>
