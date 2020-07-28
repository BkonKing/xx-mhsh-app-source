<template>
  <div class="app-body tf-bg" :style="{ 'min-height': windowHeight+'px'}">
    <div class="address-list">
      <div class="address-item">
        <div class="address-label flex-center">
          <!-- <div class="font-24 color-fff">家</div> -->
          <!-- <van-icon class="van-icon" name="location-o" size="36px" color="#fff" /> -->
          <img class="label-icon" src="https://bht.liwushijian.com/library/img/xcx_img/address_05.png" />
        </div>
        <div class="address-info">
          <div class="address-user flex-align-center">
            <div class="address-name"><div class="color-222 font-30 p-nowrap">旅途旅途旅途旅途旅途旅途</div></div>
            <div class="address-tel"><div class="color-222 font-30">15860069682</div></div>
          </div>
          <div class="address-detail flex-align-center">
            <div class="address-default">默认</div>
            <div class="default-detail-text color-8f8f94 font-24 p-nowrap">福建省福州市仓山区下渡街道三盛滨江国三盛滨江国</div>
          </div>
        </div>
        <div class="address-link flex-align-center" data-eventid="10" data-url="">
          <img class="address-edit-icon" src="edit_01.png" />
        </div>
        <div class="address-line"></div>
      </div>
			<div class="address-item">
			  <div class="address-label flex-center">
			    <div class="font-24 color-fff">公司</div>
			    <!-- <img class="label-icon" src="https://bht.liwushijian.com/library/img/xcx_img/address_05.png" /> -->
			  </div>
			  <div class="address-info">
			    <div class="address-user flex-align-center">
			      <div class="address-name"><div class="color-222 font-30 p-nowrap">旅途</div></div>
			      <div class="address-tel"><div class="color-222 font-30">15860069682</div></div>
			    </div>
			    <div class="address-detail flex-align-center">
			      <div class="address-detail-text color-8f8f94 font-24 p-nowrap">福建省福州市仓山区下渡街道三盛滨江国三盛滨江国</div>
			    </div>
			  </div>
			  <div class="address-link flex-align-center" data-eventid="10" data-url="">
			    <img class="address-edit-icon" src="edit_01.png" />
			  </div>
			  <div class="address-line"></div>
			</div>
    </div>
		<div class="fixed-submit-empty"></div>
		<div class="submit-fixed-buttom">
			<div class="submit-btn" hover-class="none">
				<div class="color-fff font-30">添加新地址</div>
			</div>
		</div>
  </div>
</template>

<script>
// import '@/styles/life.css'
export default {
  data () {
    return {
      windowHeight: document.documentElement.clientHeight
    }
  },
  onLoad () {

  },
  methods: {

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
  .address-list {
    background-color: #fff;
  }
  .address-item {
    height: 162px;
    display: flex;
    position: relative;
  }
  .address-label {
    width: 80px;
    height: 80px;
    background-color: #aaa;
    padding: 0 10px;
    margin: 40px 0 0 30px;
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
		display: flex;
    align-items: center;
    height: 36px;
  }
  .address-name {
    max-width: 300px;
    margin-right: 20px;
  }
  .address-detail {
    height: 38px;
  }
  .address-default {
    width: 60px;
    height: 30px;
    font-size: 24px;
    color: #ffffff;
    line-height: 30px;
    border-radius: 2px;
    text-align: center;
    margin-right: 10px;
    background-image: -webkit-linear-gradient(to right, #f9866b , #eb5942);
    background-image: linear-gradient(to right, #f9866b , #eb5942);
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
    justify-content: flex-end;
  }
  .address-edit-icon {
    width: 44px;
    height: 44px;
  }
  .address-line {
    height: 1px;
    background-color: #f0f0f0;
    position: absolute;
    bottom: 0;
    left: 30px;
    right: 30px;
  }
</style>
