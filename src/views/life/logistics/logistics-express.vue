<template>
	<div class="app-body" :style="{ 'min-height': windowHeight+'px'}">
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
.copy-btn {
  position: absolute;
  right: 20px;
  bottom: 27px;
  padding: 10px;
}
.copy-text {
  height: 32px;
  line-height: 28px;
  width: 58px;
  color: #ffa110;
  font-size: 22px;
  text-align: center;
  border: 2px solid #ffa110;
}
.no-logistics {
  line-height: 126px;
  text-align: center;
}
.logistics-body {
  position: relative;
  padding: 30px 40px 0 42px;
  overflow: hidden;
}
.logistics-list {
  color: #8f8f94;
  position: relative;
  z-index: 8;
}
.logistics-item {
  position: relative;
  padding: 0 0 44px 50px;
}
.item-msg {
  line-height: 46px;
}
.logistics-item:first-child .item-msg {
  color: #222;
}
.item-time {
  font-size: 24px;
  line-height: 38px;
  color: #999;
}
.item-icon-box {
  position: absolute;
  left: 0;
  top: 6px;
  width: 16px;
  height: 36px;
  background-color: #fff;
  padding: 10px 0;
}
.item-icon {
  width: 16px;
  height: 16px;
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
  top: 42px;
  bottom: 40px;
  left: 50px;
  width: 1.3px;
  background-color: #aaa;
}
</style>
