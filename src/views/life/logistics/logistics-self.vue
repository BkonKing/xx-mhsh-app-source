<template>
	<div class="app-body tf-bg">
    <div class="order-bar bar-white">
      <van-nav-bar
        title="物流详情"
        fixed
        :border="false"
        placeholder
        left-arrow
        @click-left="$router.go(-1)"
      ></van-nav-bar>
    </div>
    <template v-if="infoData">
      <div class="block-session logistics-goods">
        <div class="logistics-goods-pic">
          <div class="goods-num">共{{infoData.count}}件</div>
          <img class="img-100" :src="infoData.img_arr[0]" />
        </div>
        <div class="logistics-tip">
          <div>配送方式：{{infoData.name}}</div>
          <div>提货地点：{{infoData.take_address}}</div>
        </div>
      </div>
      <div v-if="infoData.l_status == 1" class="block-session logistics-code logistics-success">
        <img class="logistics-tick" src="@/assets/img/tick4.png" />
        <div class="logistics-status">
          <div>{{infoData.s_txt}}</div>
          <div class="color-999 font-24">{{infoData.s_time}}</div>
        </div>
      </div>
      <div v-else class="block-session logistics-code">
        <div class="code-tip">提货时请出示二维码给商家</div>
        <div class="code-pic">
          <img class="img-100" :src="infoData.qrCode" />
        </div>
      </div>
    </template>
	</div>
</template>

<script>
import { NavBar } from 'vant'
import { getLogisticsInfo } from '@/api/life.js'
export default {
  components: {
    [NavBar.name]: NavBar
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      infoData: '',
      timer: ''
    }
  },
  created () {
    this.order_id = this.$route.query.id
    this.index = this.$route.query.index ? this.$route.query.index : 0
    this.getData()
    const that = this
    this.timer = setInterval(() => {
      that.getData()
    }, 2000)
  },
  methods: {
    getData () {
      getLogisticsInfo({
        order_project_id: this.order_id
      }).then(res => {
        if (res.success) {
          this.infoData = res.data[this.index]
        }
      })
    }
  },
  beforeDestroy () {
    // 清除定时器
    clearInterval(this.timer)
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
  width: 100%;
  text-align: center;
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
