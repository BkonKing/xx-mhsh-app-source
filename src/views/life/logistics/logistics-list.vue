<template>
	<div class="app-body tf-bg" :style="{ 'min-height': windowHeight+'px'}">
    <div class="order-bar bar-white"><van-nav-bar title="物流详情" :border="false" fixed left-text="" left-arrow></van-nav-bar></div>
    <div class="bar-empty"></div>
    <div class="logistics-list">
      <div class="logistics-item block-session">
        <div class="item-header">
          <div class="logistics-name">顺丰速运<span class="color-8f8f94">（已签收）</span></div>
          <div class="logistics-info">
            <div class="logistics-icon-circular"></div>
            <div class="logistics-icon-line"></div>
            <div class="logistics-text">仓库已接单</div>
            <div class="logistics-time">2018-11-11 11:11:11</div>
          </div>
        </div>
        <div class="item-pic-list">
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
        </div>
      </div>
      <div class="logistics-item block-session">
        <div class="item-header">
          <div class="logistics-name">顺丰速运<span class="color-8f8f94">（SF123456789）</span></div>
          <div class="logistics-info">
            <div class="logistics-icon-circular"></div>
            <div class="logistics-icon-line"></div>
            <div class="logistics-text">仓库已接单</div>
            <div class="logistics-time">2018-11-11 11:11:11</div>
          </div>
        </div>
        <div class="item-pic-list">
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
        </div>
      </div>
      <div class="logistics-item block-session">
        <div class="item-header">
          <img class="wxchart-code" src="@/assets/img/code_01.png" />
          <div class="logistics-name">上门自提<span class="color-eb5841">（未提货）</span></div>
        </div>
        <div class="item-pic-list">
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
        </div>
      </div>
      <div class="logistics-item block-session">
        <div class="item-header">
          <img class="wxchart-code" src="@/assets/img/code_01.png" />
          <div class="logistics-name">上门自提<span class="color-8f8f94">（已提货）</span></div>
        </div>
        <div class="item-pic-list">
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
        </div>
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
  font-size: 28px;
  overflow: hidden;
}

.logistics-list {
  margin-top: 30px;
}
.logistics-item {
  overflow: hidden;
  margin-bottom: 30px;
}
.item-header {
  width: 650px;
  margin: 0 auto;
  min-height: 90px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}
.wxchart-code {
  position: absolute;
  top: 23px;
  right: 5px;
  width: 44px;
  height: 44px;
}
.logistics-name {
  height: 80px;
  line-height: 90px;
  color: #222;
  overflow: hidden;
}
.logistics-info {
  position: relative;
  color: #999999;
  padding: 0 0 20px 60px;
}
.logistics-icon-circular {
  position: absolute;
  top: 14px;
  left: 12px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #383838;
}
.logistics-icon-line {
  position: absolute;
  top: 41px;
  bottom: 30px;
  left: 20px;
  width: 100px;
  border-radius: 50%;
  background-color: #aaa;
}
.logistics-text {
  line-height: 44px;
}
.logistics-time {
  font-size: 24px;
  line-height: 40px;
}
.item-pic-list {
  width: 670px;
  display: flex;
  padding: 30px 0 10px;
  margin: 0 auto;
  flex-wrap: wrap;
}
.item-pic-item {
  width: 114px;
  height: 114px;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  margin: 0 10px 20px;
} 
</style>
