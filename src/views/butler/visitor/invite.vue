<template>
  <view :style="{ height: height }">
    <view class="shade"></view>
    <view style="align-items: center;">
      <view class="share-box">
        <text class="tf-text-lg">5栋-1单元-1001</text>
        <view class="qr-box">
          <image class="qr-box__image" src="../../../static/app-icon.png"></image>
        </view>
        <text class="tf-text-grey">有效次数 1</text>
        <text class="tf-text-grey">有效日期：2020-06-15 12:00 ~ 14:00</text>
        <view class="tf-divider-dashed" style="width: 480px;"></view>
        <text class="tf-text-lg">彭生生(10人) 女 15050505050</text>
      </view>
      <view class="share-name">
        <text class="share-name__text">河南美好生活家园</text>
      </view>
      <button class="share-btn" type="warn">分享给访客</button>
    </view>
  </view>
</template>

<script>
  export default {
    onLoad() {
    	const res = uni.getSystemInfoSync();
    	this.height = `${res.windowHeight}px`;
    },
    data() {
      return {
        height: 'auto'
      };
    }
  }
</script>

<style lang="less" scoped>
  .shade {
    position: absolute;
    z-index: -999;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #1b1b1b;
  }

  .share-box {
    width: 620px;
    margin: 80px 65px;
    padding: 60px 0;
    align-items: center;
    background-color: #fff;
    // box-shadow: 0 0 6px #f1c7c5;
    border-width: 6px;
    border-style: solid;
    border-color: #f1c7c5;
  }

  .share-name {
    position: absolute;
    z-index: 999;
    top: 38px;
    left: 151px;
    width: 436px;
    height: 76px;
    background-image: linear-gradient(-45deg, rgba(235, 88, 65, 1), rgba(249, 134, 107, 1));
  }
  
  .share-name__text {
    text-align: center;
    line-height: 76px;
    font-size: 30px;
    color: #fff;
  }
  
  .qr-box {
    width: 480px; 
    height: 480px;
    margin: 40px 0;
  }
  
  .qr-box__image {
    width: 480px;
    height: 480px;
  }
  
  .tf-text-grey {
    font-size: 24px;
  }

  .share-btn {
    width: 620px;
    background-image: linear-gradient(to right, @red, @red-dark);
    border-radius: 10px;
  }
</style>
