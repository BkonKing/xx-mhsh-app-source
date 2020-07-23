<template>
  <view class="tf-bg">
    <view class="address-list">
      <view class="address-item">
        <view class="address-label">
          <!-- <text class="font-24 color-fff">家</text> -->
          <image class="label-icon" src="https://bht.liwushijian.com/library/img/xcx_img/address_05.png"></image>
        </view>
        <view class="address-info">
          <view class="address-user">
            <view class="address-name"><text class="color-222 font-30 p-ellipsis">旅途旅途旅途旅途旅途旅途</text></view>
            <view class="address-tel"><text class="color-222 font-30">15860069682</text></view>
          </view>
          <view class="address-detail">
            <text class="address-default">默认</text>
            <text class="default-detail-text color-8f8f94 font-24 p-ellipsis">福建省福州市仓山区下渡街道三盛滨江国三盛滨江国</text>
          </view>
        </view>
        <view class="address-link" data-eventid="10" data-url="">
          <image class="address-edit-icon" src="edit_01.png"></image>
        </view>
        <view class="address-line"></view>
      </view>
			<view class="address-item">
			  <view class="address-label">
			    <text class="font-24 color-fff">公司</text>
			    <!-- <image class="label-icon" src="https://bht.liwushijian.com/library/img/xcx_img/address_05.png"></image> -->
			  </view>
			  <view class="address-info">
			    <view class="address-user">
			      <view class="address-name"><text class="color-222 font-30 p-ellipsis">旅途</text></view>
			      <view class="address-tel"><text class="color-222 font-30">15860069682</text></view>
			    </view>
			    <view class="address-detail">
			      <text class="address-detail-text color-8f8f94 font-24 p-ellipsis">福建省福州市仓山区下渡街道三盛滨江国三盛滨江国</text>
			    </view>
			  </view>
			  <view class="address-link" data-eventid="10" data-url="">
			    <image class="address-edit-icon" src="edit_01.png"></image>
			  </view>
			  <view class="address-line"></view>
			</view>
    </view>
		<view class="fixed-submit-empty"></view>
		<view class="submit-fixed-buttom">
			<navigator class="submit-btn" hover-class="none">
				<text class="color-fff font-30">添加新地址</text>
			</navigator>
		</view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../styles/life.less';
  .address-list {
    background-color: #fff;
  }
  .address-item {
    height: 162px;
    @extend %fx-row;
    position: relative;
  }
  .address-label {
    width: 80px;
    height: 80px;
    background-color: @gray-6;
    padding: 0 10px;
    margin: 40px 0 0 30px;
    @extend %fx-flex-center;
    justify-content: center;
  }
  .label-icon {
    width: 25px;
    height: 32px;
  }
  .address-info {
    margin-left: 20px;
    width: 526px;
    height: 80px;
    justify-content: space-between;
    margin-top: 40px;
  }
  .address-user {
		@extend %fx-flex-center;
    height: 36px;
  }
  .address-name {
    max-width: 300px;
    margin-right: 20px;
  }
  .address-detail {
    height: 38px;
    @extend %fx-flex-center;
  }
  .address-default {
    width: 60px;
    height: 30px;
    font-size: 24px;
    color: #ffffff;
    line-height: 30px;
    @include border-radius(2);
    text-align: center;
    margin-right: 10px;
    background-image: -webkit-linear-gradient(to right, @red , @red-dark);
    background-image: linear-gradient(to right, @red , @red-dark);
  }
	.address-detail-text {
		max-width: 526px;
	}
	.default-detail-text {
		max-width: 455px;
	}
  .address-link {
    width: 94px;
    padding-right: 30px;
    @extend %fx-flex-center;
    justify-content: flex-end;
  }
  .address-edit-icon {
    width: 44px;
    height: 44px;
  }
  .address-line {
    height: 1px;
    background-color: @divider-color;
    position: absolute;
    bottom: 0;
    left: 30px;
    right: 30px;
  }
</style>
