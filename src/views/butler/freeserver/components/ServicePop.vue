<template>
  <div v-show="false">
    <van-popup
      v-model="visible"
      get-container="body"
      class="free-server-dialog"
      :class="[
        isManualServer ? 'free-server-dialog-blue' : 'free-server-dialog-green'
      ]"
    >
      <div class="free-server-header">
        <div class="free-server-title">{{ data.category }}</div>
        <span class="tf-icon tf-icon-guanbi" @click="visible = false"></span>
      </div>
      <div v-if="success" class="success-box">
        <img class="success-img" src="@/assets/imgs/server-success.png" alt="" />
        <div class="success-info">{{isManualServer ? '服务' : '归还'}}成功</div>
      </div>
      <!-- 预约 -->
      <div
        v-else-if="serverStatus === 0 || serverStatus === 5"
        class="reservation"
      >
        <div class="free-server-info">
          <div v-if="!isManualServer" class="free-server-row">
            <span class="free-server-label">剩余可借：</span>
            <span class="free-server-value free-server-alert-red"
              >{{ data.remaining_count }}个</span
            >
          </div>
          <div class="free-server-row">
            <span class="free-server-label">当前预约：</span>
            <span class="free-server-value">{{ data.appointment_count }}人</span>
          </div>
          <div v-if="data.service_time" class="free-server-row">
            <span class="free-server-label">服务时间：</span>
            <span class="free-server-value">{{ data.service_time }}</span>
          </div>
          <div v-if="data.location" class="free-server-row">
            <span class="free-server-label">服务地点：</span>
            <span class="free-server-value">{{ data.location }}</span>
          </div>
        </div>
        <van-button
          class="free-server-btn free-server-btn-able"
          @click="generateReservation"
          >我要预约</van-button
        >
      </div>
      <!-- 排队 -->
      <div v-else-if="[1, 2, 3].includes(serverStatus)" class="in-service">
        <div v-if="!success" class="free-server-alert">
          <span class="free-server-alert-red" v-if="serverStatus === 2"
            >排队中：第{{ data.service_queue }}位</span
          >
          <template v-else>(请前往服务地点，出示给工作人员）</template>
        </div>
        <div class="qr-box">
          <van-loading v-if="!qrImg" type="spinner" size="30px" color="#00A0E9" />
          <div
            v-show="qrImg"
            class="qr-status"
            :class="{ 'qr-status-return': serverStatus === 3 }"
          >
            {{ statusText }}
          </div>
          <img v-show="qrImg" class="qr-img" :src="qrImg" />
        </div>
        <div v-if="codeType === 2" class="return-info">
          请<span class="free-server-alert-red">{{ data.return_time }}</span
          >前归还
        </div>
        <div v-if="serverInfo" class="server-info">
          <img
            v-if="data.location"
            class="icon-img"
            src="@/assets/butler/freeserver-address.png"
            alt=""
          /><img
            v-else
            class="icon-img"
            src="@/assets/butler/freeserver-time.png"
            alt=""
          /><div class="server-info-text">{{ serverInfo }}</div>
        </div>
        <van-button v-if="serverStatus !== 3" class="free-server-btn" @click="cancelReservation"
          >取消预约</van-button
        >
      </div>
      <cancel-server
        v-model="cancelVisible"
        :data="data"
        @success="cancelSuccess"
      ></cancel-server
    ></van-popup>
  </div>
</template>

<script>
import CancelServer from './CancelServer'
import { mapGetters } from 'vuex'
import {
  getServerInfo,
  getServerCode,
  serverCodeStatus,
  generateReservation
} from '@/api/butler.js'
export default {
  name: 'ServicePop',
  components: {
    CancelServer
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    // data: {
    //   type: Object,
    //   default: () => ({})
    // },
    id: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      data: {},
      success: false,
      timer: null,
      qrImg: '',
      qrCodeId: '',
      visible: this.value,
      cancelVisible: false,
      codeId: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'currentProject']),
    // 是否人工服务，否则为借用服务
    isManualServer () {
      return this.data.category_type === 1
    },
    projectId () {
      return (this.currentProject && this.currentProject.project_id) || this.userInfo.enter_project_id
    },
    serverStatus () {
      return +this.data.server_status
    },
    statusText () {
      const text = {
        1: '借用',
        2: '归还',
        3: '排队',
        4: '服务'
      }
      return text[this.codeType]
    },
    codeType () {
      let codeType = 0
      // categoryType: 1-人工 2-借用
      const categoryType = +this.data.category_type
      const isLineup = +this.data.is_lineup
      if (categoryType === 1) {
        if (this.serverStatus === 1 && isLineup === 1) {
          codeType = 3
        } else {
          codeType = 4
        }
      } else if (categoryType === 2) {
        if (this.serverStatus === 1) {
          codeType = 1
        } else {
          codeType = 2
        }
      }
      return codeType
    },
    serverInfo () {
      const { location, service_time: serviceTime } = this.data
      if (location && serviceTime) {
        return `${location}（${serviceTime}）`
      }
      if (location || serviceTime) {
        return location || serviceTime
      }
      return ''
    }
  },
  watch: {
    async value (newValue) {
      if (newValue && !this.visible) {
        this.qrImg = ''
        await this.getServerInfo()
      }
      this.visible = newValue
    },
    visible (newValue) {
      this.$emit('input', newValue)
      if (!newValue) {
        this.timer && clearTimeout(this.timer)
        if (this.success) {
          this.getServerInfo(true)
          setTimeout(() => {
            this.success = false
          }, 500)
        }
      }
    }
  },
  created () {
    // this.FNScanner = api.require('FNScanner')
  },
  beforeDestroy () {
    this.timer && clearTimeout(this.timer)
  },
  methods: {
    // 获取服务信息
    async getServerInfo (isChange, isLoading = true) {
      isLoading && this.$toast.loading('加载中')
      const { data } = await getServerInfo({
        enter_project_id: this.projectId,
        id: this.id
      })
      this.data = data
      isChange && this.$emit('change', data)
      if ([1, 2, 3].includes(+this.data.server_status)) {
        this.getServerCode()
      }
      isLoading && this.$toast.clear()
    },
    // 获取服务二维码
    async getServerCode () {
      const res = await getServerCode({
        enter_project_id: this.projectId,
        server_id: this.data.server_id
      })
      this.qrImg = res.data.url
      this.codeId = res.data.code_id
      this.serverCodeStatus()
    },
    // 预约
    generateReservation () {
      generateReservation({
        enter_project_id: this.projectId,
        category_id: this.data.id
      }).then(success => {
        if (success) {
          this.getServerInfo(true)
        }
      })
    },
    // 轮询当前状态
    pollingServer () {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.serverCodeStatus()
      }, 1300)
    },
    // 出示二维码用户监听状态
    async serverCodeStatus () {
      const res = await serverCodeStatus({
        enter_project_id: this.projectId,
        code_id: this.codeId
      })
      if (res.status === '1') {
        const { server_id: serverId } = this.data
        this.$emit('success', serverId)
        if ([1, 3].includes(this.codeType)) {
          this.getServerInfo(true)
        } else {
          this.success = true
        }
        this.timer = null
      } else {
        this.pollingServer()
      }
    },
    cancelReservation () {
      this.cancelVisible = true
    },
    cancelSuccess () {
      this.visible = false
      this.$emit('cancelSuccess', this.data.server_id)
      this.getServerInfo(true, false)
      this.timer && clearTimeout(this.timer)
    }
  }
}
</script>

<style lang="less" scoped>
.free-server-dialog-blue {
  .free-server-btn-able {
    background: #00a0e9;
    color: #fff;
  }
  .qr-status {
    background: #00a0e9;
  }
}
.free-server-dialog-green {
  .free-server-btn-able {
    background: #6bc572;
    color: #fff;
  }
  .qr-status {
    background: #6bc572;
  }
  .qr-status-return {
    background: #febf00;
  }
}

.free-server-header {
  position: relative;
  padding-top: 40px;
  .free-server-title {
    font-size: 32px;
    font-weight: bold;
    color: #000000;
    text-align: center;
  }
  .tf-icon-guanbi {
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 30px;
    color: #aaa;
  }
}
.reservation {
  padding: 40px 30px 30px;
}
.free-server-info {
  margin-bottom: 40px;
}
.free-server-row {
  display: flex;
  padding: 20px 0;
  + .free-server-row {
    border-top: 1px solid #eeeeee;
  }
}
.free-server-label {
  width: 142px;
  font-size: 26px;
  line-height: 36px;
  color: #8f8f94;
}
.free-server-value {
  flex:1;
  width: 0;
  margin-left: 20px;
  font-size: 26px;
  line-height: 36px;
  color: #222222;
  word-break: break-all;
}
.free-server-btn {
  width: 100%;
  background: #f7f7f7;
  border-radius: 10px;
  border: none;
  font-size: 26px;
  color: #8f8f94;
}
.server-info + .free-server-btn {
  margin-top: 24px;
}
.free-server-alert {
  margin-top: 30px;
  font-size: 24px;
  color: #8f8f94;
  text-align: center;
}
.free-server-alert-red {
  color: #ff6555;
}

.in-service {
  padding: 0 30px 30px;
}

.qr-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 360px;
  margin: 40px;
  position: relative;
  .qr-img {
    width: 360px;
    height: 360px;
  }
  .qr-status {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 76px;
    height: 76px;
    position: absolute;
    left: calc(50% - 38px);
    top: calc(50% - 38px);
    border-radius: 50%;
    font-size: 28px;
    font-weight: bold;
    color: #ffffff;
  }
}

.return-info {
  padding-bottom: 30px;
  font-size: 26px;
  color: #222222;
  text-align: center;
}

.server-info {
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 24px;
  font-size: 26px;
  color: #222222;
  border-top: 1px solid #eeeeee;
  .icon-img {
    // width: 22px;
    height: 28px;
    flex-shrink: 0;
    margin-top: 6px;
    margin-right: 20px;
  }
  .server-info-text {
    line-height: 38px;
    word-break: break-all;
  }
}

.success-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;
  .success-img {
    width: 240px;
    height: 240px;
  }
  .success-info {
    margin-top: 60px;
    font-size: 26px;
    font-weight: 500;
    color: #222222;
  }
}
</style>

<style lang="less">
.free-server-dialog {
  width: 560px;
  border-radius: 10px;
  background-size: 560px 160px;
  background-repeat: no-repeat;
  * {
    line-height: 1;
  }
}
.free-server-dialog-blue {
  background-image: linear-gradient(0deg, #ffffff 0%, #effaff 100%);
}
.free-server-dialog-green {
  background-image: linear-gradient(0deg, #ffffff 0%, #f4fff5 100%);
}
</style>
