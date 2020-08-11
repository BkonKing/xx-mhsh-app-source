<template>
  <div class="tf-bg">
    <div class="tf-bg main">
      <div class="tf-icon" @click="goBack">&#xe89d;</div>
      <!-- <barcode
        v-if="current === 1"
        class="barcode"
        autostart="true"
        ref="barcode"
        background="#c0c2c4"
        frameColor="#1C86EE"
        scanbarColor="#1C86EE"
        :filters="[0]"
        @marked="success1"
        @error="fail1"
      ></barcode> -->
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
export default {
  data () {
    return {
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
  mounted () {
    // this.toStart()
  },
  onHide () {
    this.tocancel()
  },
  methods: {
    switchTab (value) {
      if (value !== 1) {
        // this.tocancel()
        this.current = value
        this.$router.replace({
          path: '/pages/personage/scanCode/qrcode?current=' + this.current
        })
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    success1 (e) {
      console.log('success1:' + JSON.stringify(e))
    },
    fail1 (e) {
      console.log('fail1:' + JSON.stringify(e))
    },
    toStart () {
      this.$refs.barcode.start({
        conserve: true,
        filename: '_doc/barcode/'
      })
    },
    tocancel () {
      this.$refs.barcode.cancel()
    },
    toFlash () {
      this.$refs.barcode.setFlash(true)
    },
    toscan () {
      console.log('scan:')
      const barcodeModule = uni.requireNativePlugin('barcodeScan')
      barcodeModule.scan('/static/barcode1.png', e => {
        console.log('scan_error:' + JSON.stringify(e))
      })
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
.barcode {
  width: 750px;
  flex: 1;
  background-color: #808080;
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
  flex: 1;
  flex-direction: column;
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
