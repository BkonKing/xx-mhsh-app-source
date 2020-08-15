<template>
  <div class="tf-screen">
    <div class="tf-bg main">
      <div class="tf-icon" @click="goBack">&#xe89d;</div>
      <div class="tab-content">
        <div v-if="current === 2">
          <div class="tab-title">付款码</div>
          <div class="tab-content__box">
            <div class="qrcode-box"><canvas id="qrcode2" canvas-id="qrcode2" class="qrcode-image" /></div>
          </div>
        </div>
        <div v-if="current === 3">
          <div class="tab-title">收款码</div>
          <div class="tab-content__box">
            <div class="qrcode-box"><canvas id="qrcode3" canvas-id="qrcode3" class="qrcode-image" /></div>
          </div>
        </div>
      </div>
    </div>
    <div class="tabs">
      <div class="tab" v-for="(item, i) in tabs" :key="i" @click="switchTab(item.value)">
        <div class="tab-text">{{ item.name }}</div>
        <div v-if="item.value === current" class="tab-active"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import uQRCode from '@/js_sdk/Sansnn-uQRCode/uqrcode.js'
export default {
  data () {
    return {
      qrHeight: 240,
      current: 1,
      tabs: [
        {
          value: 1,
          name: '扫一扫'
        },
        {
          value: 2,
          name: '付款码'
        },
        {
          value: 3,
          name: '收款码'
        }
      ]
    }
  },
  created ({ current }) {
    this.current = parseInt(current)
  },
  methods: {
    switchTab (value) {
      if (value === 1) {
        // uni.navigateTo()
        this.$router.replace({
          path: '/pages/personage/scanCode/index'
        })
      } else {
        this.current = value
        this.$nextTick(() => {
          setTimeout(() => {
            this.makeQRCode('sdfsdfdf', `qrcode${value}`)
          }, 1000)
        })
      }
    },
    makeQRCode (text, id) {
      uQRCode.make({
        canvasId: id,
        // componentInstance: this,
        text,
        size: this.qrHeight,
        margin: 10,
        backgroundColor: '#ffffff',
        foregroundColor: '#000000',
        fileType: 'jpg',
        correctLevel: uQRCode.defaults.correctLevel,
        success: res => {}
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 98px;
}
.tf-icon {
  position: fixed;
  top: 62px;
  left: 32px;
  font-size: 44px;
}
.tab-content {
  @flex-column();
  align-items: center;
}
.tab-title {
  width: 600px;
  height: 120px;
  line-height: 120px;
  margin-top: 248px;
  text-align: center;
  color: #fff;
  font-size: 38px;
  background-image: linear-gradient(-90deg, rgba(235, 88, 65, 1), rgba(249, 134, 107, 1));
}
.tab-content__box {
  width: 300px;
  height: 320px;
  padding: 35px 25px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
}
.qrcode-box {
  width: 250px;
  height: 250px;
}
.qrcode-image {
  width: 250px;
  height: 250px;
  border-width: 2px;
  border-style: solid;
  border-color: @red-dark;
}
.tabs {
  position: fixed;
  bottom: 0;
  width: 750px;
  height: 98px;
  background-color: #383838;
  display: flex;
}
.tab {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
}
.tab-text {
  height: 76px;
  line-height: 98px;
  text-align: center;
  color: #fff;
  font-size: 30px;
  font-weight: 500;
}
.tab-active {
  width: 66px;
  height: 3px;
  background-color: @red-dark;
  border-radius: 2px;
}
</style>
