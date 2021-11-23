<template>
  <div class="shade">
    <div class="server-confirm-box">
      <div class="free-server-header">
        <div class="free-server-title">请确认服务信息</div>
        <span class="tf-icon tf-icon-guanbi" @click="$router.go(-1)"></span>
      </div>
      <div class="server-container">
        <div class="server-box">
          <div class="free-server-row">
            <span class="free-server-label">服务项目：</span
            ><span class="free-server-value free-server-alert-red">{{
              info.server_category
            }}</span>
          </div>
          <div class="free-server-row">
            <span class="free-server-label">申请：</span
            ><span class="free-server-value"
              >{{ info.server_type
              }}<span class="free-server-alert-grey">{{
                info | serverInfo
              }}</span></span
            >
          </div>
        </div>
        <div class="pd30">
          <div class="free-server-row">
            <span class="free-server-label">申请人：</span
            ><span class="free-server-value"
              >{{ info.realname }}（{{ info.user_type | houseRoleText }}）</span
            >
          </div>
          <div class="free-server-row">
            <span class="free-server-label">手机号：</span
            ><span class="free-server-value">{{ info.mobile }}</span>
          </div>
          <div v-if="info.fc_info" class="free-server-row">
            <span class="free-server-label">房屋：</span
            ><span class="free-server-value">{{ info.fc_info }}</span>
          </div>
        </div>
      </div>
      <van-button
        class="free-server-btn"
        :class="{ 'free-server-btn-blue': isManualServer }"
        @click="confirm"
        >确认</van-button
      >
    </div>
  </div>
</template>

<script>
// /pages/butler/freeserver/confirm
import { confirmServer, serverClose } from '@/api/butler'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      info: {},
      code_id: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    isManualServer () {
      return [3, 4].includes(+this.info.code_type)
    }
  },
  created () {
    const { info, code_id: codeId } = this.$route.query
    this.info = JSON.parse(info)
    this.codeId = codeId
    this.codeId = this.info.code_id
  },
  methods: {
    confirm () {
      if (this.info.code_type == 1 || this.info.code_type == 3) {
        this.confirmServer()
      } else {
        this.serverClose()
      }
    },
    // 确认用户预约
    confirmServer () {
      confirmServer({
        code_id: this.info.code_id,
        uid: this.info.uid,
        enter_project_id: this.info.project_id,
        category_id: this.info.category_id
      }).then(({ success }) => {
        if (success) {
          this.$toast('确认成功')
          setTimeout(() => {
            this.$router.go(-1)
          }, 500)
        }
      })
    },
    // 服务预约结束
    serverClose () {
      serverClose({
        code_id: this.info.code_id,
        uid: this.info.uid,
        enter_project_id: this.info.project_id,
        server_id: this.info.server_id
      }).then(({ success }) => {
        if (success) {
          this.$toast('确认成功')
          setTimeout(() => {
            this.$router.go(-1)
          }, 500)
        }
      })
    }
  },
  filters: {
    serverText (value) {
      const text = {
        1: '借用',
        2: '归还',
        3: '排队',
        4: '享受服务'
      }
      return text[value]
    },
    serverInfo (value) {
      switch (value.code_type) {
        case '1':
          return `（可借${value.duration / 3600}小时）`
        case '2':
          return value.yj_time ? `（${value.yj_time}）` : ''
        case '3':
          return `（预计第${parseInt(value.pd_num) + 1}位）`
        case '4':
          return value.pd_time ? `（${value.pd_time}）` : ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.shade {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #1b1b1b99;
}

.server-confirm-box {
  @flex-column();
  align-items: center;
  width: 560px;
  padding: 30px;
  border-radius: 10px;
  background: #fff;
}

.free-server-header {
  width: 100%;
  position: relative;
  .free-server-title {
    font-size: 32px;
    font-weight: bold;
    color: #000000;
    text-align: center;
  }
  .tf-icon-guanbi {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 30px;
    color: #000;
  }
}

.server-container {
  position: relative;
  width: 100%;
  margin-top: 40px;
}

.free-server-btn {
  width: 100%;
  margin-top: 30px;
  background: #6bc572;
  border-radius: 10px;
  border: none;
  font-size: 26px;
  color: #fff;
}

.free-server-btn-blue {
  background: #00a0e9;
}

.free-server-row {
  display: flex;
  padding: 20px 0;
  + .free-server-row {
    border-top: 1px solid #eeeeee;
  }
}
.free-server-label {
  width: 144px;
  font-size: 26px;
  color: #8f8f94;
}
.free-server-value {
  font-size: 26px;
  color: #222222;
}

.server-box {
  padding: 0 30px;
  background: #f7f7f7;
  border-radius: 10px;
}

.free-server-alert-red {
  color: #ff6555;
}
.free-server-alert-grey {
  color: #8f8f94;
}

.pd30 {
  padding: 0 30px;
}
</style>
