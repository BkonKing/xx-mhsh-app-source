<template>
  <div class="app-body tf-bg" :style="{ 'min-height': windowHeight+'px'}">
    <div class="address-list">
      <div class="address-item">
        <div class="address-label flex-center">
          <!-- <div class="font-24 color-fff">家</div> -->
          <!-- <van-icon class="van-icon" name="location-o" size="0.36rem" color="#fff" /> -->
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
    font-size: 0.28rem;
    overflow: hidden;
  }
  .address-list {
    background-color: #fff;
  }
  .address-item {
    height: 1.62rem;
    display: flex;
    position: relative;
  }
  .address-label {
    width: 0.8rem;
    height: 0.8rem;
    background-color: #aaa;
    padding: 0 0.1rem;
    margin: 0.4rem 0 0 0.3rem;
  }
  .label-icon {
    width: 0.25rem;
    height: 0.32rem;
  }
  .address-info {
    margin-left: 0.2rem;
    width: 5.26rem;
    height: 0.8rem;
    justify-content: space-between;
    margin-top: 0.4rem;
  }
  .address-user {
		display: flex;
    align-items: center;
    height: 0.36rem;
  }
  .address-name {
    max-width: 3rem;
    margin-right: 0.2rem;
  }
  .address-detail {
    height: 0.38rem;
  }
  .address-default {
    width: 0.6rem;
    height: 0.3rem;
    font-size: 0.24rem;
    color: #ffffff;
    line-height: 0.3rem;
    border-radius: 0.02rem;
    text-align: center;
    margin-right: 0.1rem;
    background-image: -webkit-linear-gradient(to right, #f9866b , #eb5942);
    background-image: linear-gradient(to right, #f9866b , #eb5942);
  }
	.address-detail-text {
		max-width: 5.26rem;
	}
	.default-detail-text {
		max-width: 4.55rem;
	}
  .address-link {
    width: 0.94rem;
    padding-right: 0.3rem;
    justify-content: flex-end;
  }
  .address-edit-icon {
    width: 0.44rem;
    height: 0.44rem;
  }
  .address-line {
    height: 1px;
    background-color: #f0f0f0;
    position: absolute;
    bottom: 0;
    left: 0.3rem;
    right: 0.3rem;
  }
</style>
