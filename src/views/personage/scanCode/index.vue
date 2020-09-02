<template>
  <div class="tf-bg">
    <span class="tf-icon tf-icon-close-circle-fill" @click="goBack"></span>
    <div class="tab-content">
      <template v-if="current === 1"></template>
      <div class="tab-container" v-if="current === 2">
        <div class="tab-title">付款码</div>
        <div class="tab-content__box">
          <div class="qrcode-box">
            <img class="qrcode-image" :src="paymentCodeImg" />
          </div>
        </div>
      </div>
      <div class="tab-container" v-if="current === 3">
        <div class="tab-title">收款码</div>
        <div class="tab-content__box">
          <div class="qrcode-box">
            <img class="qrcode-image" :src="collectCodeImg" />
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
import {
  paymentScan,
  collectScan,
  getPaymentCode,
  getCollectCode,
  paymentStatus,
  collectStatus
} from '@/api/personage'
import { serverCodeScan, visitorCodeScan, takeCodeScan } from '@/api/butler'
import { Dialog, Toast } from 'vant'
import { hasPermission, reqPermission } from '@/utils/permission'
export default {
  data () {
    return {
      codeId: '',
      current: 0,
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
  created () {
    this.current = parseInt(this.$route.query.current) || 1
  },
  mounted () {
    // this.scanSuccess('shoukuan|360|100024|1|1598600092|77095a01f3ad8d818297f253d2b66abd')
    this.FNScanner = api.require('FNScanner')
  },
  methods: {
    /* 切换tab */
    switchTab (value) {
      this.current = value
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
        this.pollingCollect()
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
            title: `获得${data.credits}幸福币`
          }).then(() => {
            this.getCollectCode()
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
        case 'yuyuefangke':
          this.visitorCodeScan(value, values)
          break
        case 'smzt':
          this.takeCodeScan(value, values)
          break
        default:
          break
      }
    },
    /* 付款人扫了收款码 */
    collectScan (value, values) {
      collectScan({
        code_info: value
      }).then((res) => {
        const { check_status, is_pay, avatar, realname, mobile } = res.data
        if (check_status) {
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
        }
      })
    },
    /* 收款人扫了付款码 */
    paymentScan (value, values) {
      paymentScan({
        code_info: value
      }).then((res) => {
        const { check_status, is_pay, avatar, realname, mobile } = res.data
        if (check_status) {
          if (is_pay == 0) {
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
            api.toast({
              msg: '对方已付款'
            })
          }
        } else {
          Toast('扫码失败，二维码可能过期')
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
      }).catch((message) => {
        api.alert({
          title: message
        })
      })
    },
    /* 扫了邀约码 */
    visitorCodeScan (value) {
      visitorCodeScan({
        code_info: value
      }).then((res) => {
        api.alert({
          title: res.message
        })
      }).catch(err => {
        api.alert({
          title: err
        })
      })
    },
    /* 扫了提货码 */
    takeCodeScan (value) {
      takeCodeScan({
        code_info: value
      }).then((res) => {
        api.alert({
          title: res.message
        })
      }).catch(err => {
        api.alert({
          title: err
        })
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
      const len = api.frames().length
      if (value === 1) {
        const perms = hasPermission('camera')
        if (!perms[0].granted) {
          reqPermission('camera', ({ list }) => {
            if (list[0].granted) {
              !len && this.openFrame()
            }
          })
        } else {
          !len && this.openFrame()
        }
      } else {
        len && this.closeFrame()
        this.timer && clearTimeout(this.timer)
        if (value === 2) {
          this.getPaymentCode()
        } else if (value === 3) {
          this.getCollectCode()
        }
      }
    }
  },
  beforeDestroy () {
    this.closeFrame()
    this.timer && clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped>
.tf-icon {
  position: relative;
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
.tab-container {
  width: 600px;
  height: 760px;
  margin-top: 142px;
  @flex-column();
  align-items: center;
  background-image: url('../../../assets/imgs/fukuan_bg.png');
  background-size: contain;
}
.tab-title {
  width: 100%;
  height: 120px;
  line-height: 120px;
  text-align: center;
  color: #fff;
  font-size: 38px;
}
.tab-content__box {
  width: 100%;
  padding: 70px 50px;
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
  padding-bottom: env(safe-area-inset-bottom);
  padding-bottom: constant(safe-area-inset-bottom);
  background-color: #383838;
  display: flex;
}
.tab {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  height: 98px;
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
