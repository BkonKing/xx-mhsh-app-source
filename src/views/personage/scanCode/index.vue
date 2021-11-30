<template>
  <div class="tf-bg">
    <span
      v-if="current !== 1"
      class="tf-icon tf-icon-close-circle-fill"
      style="top: 31px;left: 16px;"
      @click="goBack"
    ></span>
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
    <div class="tabs" id="scan-tabs">
      <div
        class="tab"
        v-for="(item, i) in tabs"
        :key="i"
        @click="switchTab(item.value)"
      >
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
import { queryActive, getActivityPermission, getActivityUserInfo } from '@/api/activity'
import { handlePermission } from '@/utils/permission'
import { mapGetters } from 'vuex'
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
      timer: null,
      footerHeight: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    this.current = parseInt(this.$route.query.current) || 1
    // 绑定frame关闭事件
    window.closeFrame = new CustomEvent('closeFrame')
    document.addEventListener('closeFrame', this.goBack)
  },
  mounted () {
    // this.scanSuccess('fukuan|526|100000|2|1599105402|78d219b889cd7887fa695da9bbf8d988')
    this.FNScanner = api.require('FNScanner')
    this.footerHeight = document.getElementById('scan-tabs').clientHeight
  },
  methods: {
    // 切换tab
    switchTab (value) {
      this.current = value
    },
    // 获取付款码二维码
    getPaymentCode () {
      getPaymentCode().then(res => {
        const { url, code_id } = res.data
        this.paymentCodeImg = url
        this.codeId = code_id
        this.pollingPayment()
      })
    },
    // 获取收款码二维码
    getCollectCode () {
      getCollectCode().then(res => {
        const { url, old_code_id } = res.data
        this.collectCodeImg = url
        this.codeId = old_code_id
        this.pollingCollect()
      })
    },
    // 轮询付款码当前状态
    pollingPayment () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.paymentStatus()
      }, 3000)
    },
    // 轮询收款码当前状态
    pollingCollect () {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.collectStatus()
      }, 3000)
    },
    // 出示付款码请求获取码当前状态
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
          this.$dialog.alert({
            title: '支付成功'
          })
          this.mtjEvent({
            eventId: 46
          })
        }
      })
    },
    // 出示收款码请求获取码当前状态
    collectStatus () {
      collectStatus({
        old_code_id: this.codeId
      }).then(({ data }) => {
        if (!data || data.is_pay != '1') {
          this.pollingCollect()
        } else {
          this.$dialog
            .alert({
              title: `获得${data.credits}幸福币`
            })
            .then(() => {
              this.getCollectCode()
              this.mtjEvent({
                eventId: 47
              })
            })
        }
      })
    },
    // 扫码成功
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
        case 'queryActive':
          // queryActive|1|5第一个表示接口名称，第二个表示项目ID,第三个表示活动ID
          this.joinActivity(values[1], values[2])
          break
        case 'jfhd_uid':
          // 'jfhd_uid|100001'
          this.goActivity(value)
          break
        case 'task':
          // 'jfhd_uid|100001'
          this.goTask(values[1])
          break
        default:
          break
      }
    },
    // 付款人扫了收款码
    collectScan (value, values) {
      collectScan({
        code_info: value
      })
        .then(res => {
          const { check_status, is_pay, avatar, realname, mobile, code_id } = res.data
          if (check_status) {
            this.$router.push({
              name: 'happinessCoinPayment',
              query: {
                type: '1',
                value: code_id,
                avatar,
                realname,
                mobile
              }
            })
          }
        })
        .catch(err => {
          api.alert({
            title: err.message
          })
        })
    },
    // 收款人扫了付款码
    paymentScan (value, values) {
      paymentScan({
        code_info: value
      })
        .then(res => {
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
            api.toast('扫码失败，二维码可能过期')
          }
        })
        .catch(err => {
          api.alert({
            title: err.message
          })
        })
    },
    // 扫了免费服务码
    serverCodeScan (value, values) {
      serverCodeScan({
        code_info: value
      })
        .then(({ data }) => {
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
        .catch(err => {
          api.alert({
            title: err.message
          })
        })
    },
    // 扫了邀约码
    visitorCodeScan (value) {
      visitorCodeScan({
        code_info: value
      })
        .then(res => {
          api.alert({
            title: res.message
          })
        })
        .catch(err => {
          api.alert({
            title: err.message
          })
        })
    },
    // 扫了提货码
    takeCodeScan (value) {
      takeCodeScan({
        code_info: value
      })
        .then(res => {
          this.$router.push({
            name: 'orderVerification',
            query: {
              code_info: value
            }
          })
          // api.alert({
          //   title: res.message
          // })
        })
        .catch(err => {
          api.alert({
            title: err.message
          })
        })
    },
    // 扫了项目方积分活动码，参与活动，跳转活动页面（项目id保存到本地）
    joinActivity (projectId, activityId) {
      // 判断积分活动是否开启
      queryActive({
        activity_id: activityId,
        project_id: projectId,
        uid: this.userInfo.id
      })
        .then(() => {
          this.$router.push({
            name: 'activity',
            query: {
              projectId
            }
          })
        })
        .catch(err => {
          api.alert({
            title: err.message
          })
        })
    },
    // 扫了用户积分活动码,跳转积分发放核销页面
    goActivity (userId) {
      // 有没有权限
      getActivityPermission({
        project_id: this.userInfo.xm_project_id
      }).then((success) => {
        getActivityUserInfo({
          project_id: this.userInfo.xm_project_id,
          code_info: userId
        }).then(({ data }) => {
          this.$router.push({
            name: 'activityService',
            query: {
              userId
            }
          })
        }).catch((e) => {
          api.alert({
            title: e.message
          })
        })
      }).catch((err) => {
        api.alert({
          title: err.message
        })
      })
    },
    // 扫了任务码
    goTask (taskId) {
      this.$router.push({
        name: 'taskDetail',
        query: {
          taskId
        }
      })
    },
    // 打开扫码frame
    openFrame () {
      api.openFrame({
        name: 'scan',
        url: './scan.html',
        useWKWebView: true,
        bgColor: 'rgba(0, 0, 0, 0)',
        rect: {
          x: 0,
          y: 0,
          w: 'auto',
          h: 'auto',
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          marginBottom: this.footerHeight
        }
      })
      this.scan()
    },
    // 关闭扫码frame
    closeFrame () {
      api.closeFrame({
        name: 'closebtn'
      })
      this.FNScanner.closeView()
      api.closeFrame({
        name: 'scan'
      })
    },
    // 打开扫码
    scan () {
      this.FNScanner.openView(
        {
          fixedOn: 'scan',
          autorotation: true,
          rect: {
            x: 0,
            y: 0,
            w: api.frameWidth,
            h: api.frameHeight - this.footerHeight
          }
        },
        (ret, err) => {
          if (ret) {
            const { eventType, content } = ret
            switch (eventType) {
              case 'success':
                this.scanSuccess(content)
                break
              case 'show':
                this.showClose()
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
    // 嵌入相机页面的关闭按钮
    showClose () {
      api.openFrame({
        name: 'closebtn',
        url: './closebtn.html',
        useWKWebView: true,
        bgColor: 'rgba(0, 0, 0, 0)',
        rect: {
          x: 0,
          y: 0,
          w: 'auto',
          h: 'auto',
          marginLeft: 0,
          marginRight: 0,
          marginTop: api.safeArea.top,
          marginBottom: this.footerHeight
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  watch: {
    current (value) {
      const len = api.frames().length
      if (value === 1) {
        handlePermission({
          name: 'camera'
        }).then(() => {
          !len && this.openFrame()
        })
        this.mtjEvent({
          eventId: 6
        })
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
    document.removeEventListener('closeFrame', this.goBack)
    window.closeFrame = ''
  }
}
</script>

<style lang="less" scoped>
.tf-icon {
  position: relative;
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
  background-image: url("../../../assets/imgs/fukuan_bg.png");
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
