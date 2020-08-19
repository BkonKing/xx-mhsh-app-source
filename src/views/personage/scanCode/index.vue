<template>
  <div class="tf-bg">
    <div class="tf-bg main">
      <div class="tf-icon tf-icon-close-circle-fill" @click="goBack"></div>
      <div class="tab-content">
        <template v-if="current === 1"></template>
        <template v-if="current === 2">
          <div class="tab-title">付款码</div>
          <div class="tab-content__box">
            <div class="qrcode-box">
              <img class="qrcode-image" :src="paymentCodeImg" />
            </div>
          </div>
        </template>
        <template v-if="current === 3">
          <div class="tab-title">收款码</div>
          <div class="tab-content__box">
            <div class="qrcode-box">
              <img class="qrcode-image" :src="collectCodeImg" />
            </div>
          </div>
        </template>
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
import {
  paymentScan,
  collectScan,
  getPaymentCode,
  getCollectCode,
  paymentStatus,
  collectStatus
} from '@/api/personage'
import { serverCodeScan } from '@/api/butler'
import { Dialog, Toast } from 'vant'
export default {
  data () {
    return {
      codeId: '',
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
      ],
      paymentCodeImg: '',
      collectCodeImg: '',
      FNScanner: null,
      timer: null
    }
  },
  mounted () {
    // this.scanSuccess()
    this.FNScanner = api.require('FNScanner')
  },
  methods: {
    switchTab (value) {
      this.current = value
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (value === 2) {
        this.getPaymentCode()
      } else if (value === 3) {
        this.getCollectCode()
      }
    },
    /* 获取付款码二维码 */
    getPaymentCode () {
      getPaymentCode().then((res) => {
        const { url, code_id } = res.data
        this.paymentCodeImg = url
        this.codeId = code_id
        this.pollingPayment()
      })
    },
    /* 获取收款码二维码 */
    getCollectCode () {
      getCollectCode().then((res) => {
        const { url, code_id } = res.data
        this.collectCodeImg = url
        this.codeId = code_id
        // this.pollingCollect()
      })
    },
    /* 轮询付款码当前状态 */
    pollingPayment () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.paymentStatus()
      }, 3000)
    },
    /* 轮询收款码当前状态 */
    pollingCollect () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.collectStatus()
      }, 3000)
    },
    /* 出示付款码请求获取码当前状态 */
    paymentStatus () {
      paymentStatus({
        code_id: this.codeId
      }).then(({ data }) => {
        const { is_pay, credits, avatar, realname, mobile, remarks } = data
        if (is_pay != '1') {
          if (credits && credits != '0') {
            this.$router.push({
              name: 'happinessCoinPayment',
              query: {
                type: '3',
                value: this.codeId,
                avatar,
                realname,
                mobile,
                credits,
                remarks
              }
            })
          } else {
            this.pollingPayment()
          }
        } else {
          Dialog.alert({
            title: '支付成功'
          })
        }
      })
    },
    /* 出示收款码请求获取码当前状态 */
    collectStatus () {
      collectStatus({
        code_id: this.codeId
      }).then(({ data }) => {
        if (data.is_pay != '1') {
          this.pollingCollect()
        } else {
          Dialog.alert({
            title: '对方已经支付成功'
          })
        }
      })
    },
    /* 扫码成功 */
    scanSuccess (content) {
      const value = content
      const values = value.split('|')
      switch (values[0]) {
        case 'shoukuan':
          this.collectScan(value, values)
          break
        case 'fukuan':
          this.paymentScan(value, values)
          break
        case 'yuyuefuwu':
          this.serverCodeScan(value, values)
          break
        default:
          break
      }
    },
    /* 扫了收款码 */
    collectScan (value, values) {
      collectScan({
        code_info: value
      }).then((res) => {
        const { check_status, is_pay, avatar, realname, mobile } = res.data
        if (check_status) {
          if (is_pay === '0') {
            this.$router.push({
              name: 'happinessCoinPayment',
              query: {
                type: '1',
                value: values[1],
                avatar,
                realname,
                mobile
              }
            })
          } else {
            Toast('您已经支付过')
          }
        }
      })
    },
    /* 扫了付款码 */
    paymentScan (value, values) {
      paymentScan({
        code_info: value
      }).then((res) => {
        const { check_status, is_pay, avatar, realname, mobile } = res.data
        if (check_status) {
          if (is_pay == '0') {
            this.$router.push({
              name: 'happinessCoinPayment',
              query: {
                type: '2',
                value: values[1],
                avatar,
                realname,
                mobile
              }
            })
          } else {
            Toast('对方已付款')
          }
        }
      })
    },
    /* 扫了免费服务码 */
    serverCodeScan (value, values) {
      serverCodeScan({
        code_info: value
      }).then(({ data }) => {
        if (data.check_status == 1) {
          this.$router.push({
            name: 'freeserverConfirm',
            query: {
              info: JSON.stringify(data),
              code_id: values[1]
            }
          })
        }
      })
    },
    /* 打开扫码frame */
    openFrame () {
      api.openFrame({
        name: 'scan',
        url: './scan.html',
        rect: {
          x: 0,
          y: 0,
          w: 'auto',
          h: 'auto',
          marginLeft: 37.5,
          marginRight: 37.5,
          marginTop: 124,
          marginBottom: 163
        },
        pageParam: {
          name: 'test'
        }
      })
      this.scan()
    },
    /* 关闭扫码frame */
    closeFrame () {
      this.FNScanner.closeView()
      api.closeFrame({
        name: 'scan'
      })
    },
    /* 打开扫码 */
    scan () {
      this.FNScanner.openView(
        {
          fixedOn: 'scan',
          autorotation: true
        },
        (ret, err) => {
          if (ret) {
            const { eventType, content } = ret
            switch (eventType) {
              case 'success':
                this.scanSuccess(content)
                break
              default:
                break
            }
          } else {
            alert(JSON.stringify(err))
          }
        }
      )
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  watch: {
    current (value) {
      if (value === 1) {
        if (!api.frames().length) {
          this.openFrame()
        }
      } else {
        this.closeFrame()
      }
    }
  },
  beforeDestroy () {
    this.closeFrame()
    if (this.timer) {
      clearTimeout(this.timer)
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
  background-image: linear-gradient(
    -90deg,
    rgba(235, 88, 65, 1),
    rgba(249, 134, 107, 1)
  );
}
.tab-content__box {
  width: 600px;
  // height: 320px;
  padding: 70px 50px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
}
.qrcode-box {
  width: 500px;
  height: 500px;
  padding: 14px;
  border: 2px solid @red-dark;
}
.qrcode-image {
  width: 472px;
  height: 472px;
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
