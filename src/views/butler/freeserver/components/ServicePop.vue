<template>
  <van-popup
    v-model="visible"
    class="free-server-dialog"
    :class="[
      isManualServer ? 'free-server-dialog-blue' : 'free-server-dialog-green'
    ]"
  >
    <div class="free-server-header">
      <div class="free-server-title">{{ data.category }}</div>
      <span class="tf-icon tf-icon-guanbi" @click="visible = false"></span>
    </div>
    <!-- 预约 -->
    <!-- v-if="serverStatus === 0" -->
    <div v-if="true" class="reservation">
      <div v-if="!isManualServer" class="free-server-row">
        <span class="free-server-label">剩余可借：</span>
        <span class="free-server-value free-server-alert-red">5个</span>
      </div>
      <div class="free-server-row">
        <span class="free-server-label">当前预约：</span>
        <span class="free-server-value">5人</span>
      </div>
      <div class="free-server-row">
        <span class="free-server-label">服务时间：</span>
        <span class="free-server-value">周一至周五 9:00~18:00</span>
      </div>
      <div class="free-server-row">
        <span class="free-server-label">服务地点：</span>
        <span class="free-server-value">5人</span>
      </div>
      <van-button
        class="free-server-btn free-server-btn-able"
        @click="generateReservation"
        >我要预约</van-button
      >
    </div>
    <!-- 排队 -->
    <!-- v-else-if="serverStatus === 2" -->
    <div v-if="false" class="in-service">
      <div v-if="!success" class="free-server-alert">
        (请前往服务地点，出示给工作人员）
        <!-- 排队中：第{{ data.pd_num + 1 }}位 -->
      </div>
      <div class="qr-box">
        <div class="qr-status" :class="{ 'qr-status-return': true }">
          {{ statusText }}
        </div>
        <img class="qr-img" :src="qrImg" />
      </div>
      <div class="return-info">
        请<span class="free-server-alert-red">2021-10-01 12:00</span>前归还
      </div>
      <div class="server-info">
        <img class="icon-img" src="" alt="" />周一至周五 9:00~18:00周一至周五
        9:00~18:00
      </div>
      <van-button class="free-server-btn">取消预约</van-button>
    </div>
    <div v-if="false" class="success-box">
      <img class="success-img" src="@/assets/imgs/server-success.png" alt="" />
      <div class="success-info">服务成功</div>
    </div>
    <cancel-server v-model="cancelVisible"></cancel-server
  ></van-popup>
</template>

<script>
import CancelServer from './CancelServer'
import { mapGetters } from 'vuex'
import {
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
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      success: false,
      timer: null,
      qrImg: '',
      visible: this.value,
      cancelVisible: false,
      codeId: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'currentProject']),
    // 是否人工服务，否则为借用服务
    isManualServer () {
      return this.data.category_type === '1'
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
      const serverStatus = +this.data.server_status
      const isLineup = +this.data.is_lineup
      if (categoryType === 1) {
        if ((serverStatus === 0 || !serverStatus) && isLineup === 1) {
          codeType = 3
        } else {
          codeType = 4
        }
      } else if (categoryType === 2) {
        if (serverStatus === 0 || !serverStatus) {
          codeType = 1
        } else {
          codeType = 2
        }
      }
      return codeType
    }
  },
  watch: {
    value (newValue) {
      if (newValue && !this.visible) {
        this.$nextTick(() => {
          this.getServerCode()
        })
      }
      this.visible = newValue
    },
    visible (newValue) {
      this.$emit('input', newValue)
      if (!newValue) {
        this.timer && clearTimeout(this.timer)
        if (this.success) {
          this.$emit('reload')
          this.$nextTick(() => {
            setTimeout(() => {
              this.success = false
            }, 500)
          })
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
    // 获取服务二维码
    async getServerCode () {
      const res = await getServerCode({
        id: this.data.id,
        server_id: this.data.server_id,
        code_type: this.codeType
      })
      this.qrImg = res.data.url
      this.codeId = res.data.code_id
      this.serverCodeStatus()
    },
    // 预约
    generateReservation () {
      generateReservation({
        enter_project_id: this.currentProject.project_id,
        category_id: this.data.id
      }).then(() => {})
    },
    // 轮询当前状态
    pollingServer () {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.serverCodeStatus()
      }, 3000)
    },
    // 出示二维码用户监听状态
    async serverCodeStatus () {
      const res = await serverCodeStatus({
        code_id: this.codeId
      })
      if (res.status === '1') {
        this.success = true
        this.timer = null
      } else {
        this.pollingServer()
      }
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
    color: #000;
  }
}
.reservation {
  padding: 40px 30px 30px;
}
.free-server-row {
  display: flex;
  padding: 20px 0;
  + .free-server-row {
    border-top: 1px solid #eeeeee;
  }
}
.free-server-label {
  font-size: 26px;
  color: #8f8f94;
}
.free-server-value {
  margin-left: 40px;
  font-size: 26px;
  color: #222222;
}
.free-server-btn {
  width: 100%;
  margin-top: 30px;
  background: #f7f7f7;
  border-radius: 10px;
  border: none;
  font-size: 26px;
  color: #8f8f94;
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
    width: 88px;
    height: 88px;
    position: absolute;
    left: calc(50% - 44px);
    top: calc(50% - 44px);
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
  text-align: center;
  padding-top: 24px;
  font-size: 26px;
  color: #222222;
  line-height: 38px;
  border-top: 1px solid #eeeeee;
  .icon-img {
    width: 28px;
    height: 28px;
    margin-right: 20px;
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
