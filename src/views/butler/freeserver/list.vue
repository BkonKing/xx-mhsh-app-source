<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="免费服务"
      :fixed="true"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="tf-body-container">
      <refreshList :list.sync="data" :load="getMyFreeServerList">
        <template v-slot="{ item }">
          <div class="tf-card">
            <div class="tf-card-header">
              <div class="tf-card-header__title">
                <div class="header-name">
                  {{ item.category
                  }}<span class="status-tag">{{ item.status }}</span>
                </div>
                <div class="header-time">
                  预约服务：<span>2021-09-20 12:00</span>
                </div>
                <template v-if="item.category_type == 1">
                  <div class="header-time">
                    排队时间：<span v-if="item.status == 1" class="alert-text"
                      >第 {{ parseInt(item.pd_num || 0) + 1 }} 位</span
                    ><span v-if="item.status == 2">{{ item.stime }}</span>
                  </div>
                  <div v-if="item.status == 2" class="header-time">
                    服务时间：<span>{{ item.etime }}</span>
                  </div>
                </template>
                <template v-else>
                  <div class="header-time">
                    借用时间：<span>{{ item.stime }}</span>
                  </div>
                  <div class="header-time">
                    归还时间：<span v-if="item.status == 1" class="alert-text"
                      >请于 {{ item.gh_time }} 前归还</span
                    ><span v-if="item.status == 2">{{ item.stime }}</span>
                  </div>
                </template>
                <div v-if="item.status == 3" class="header-time">
                  取消时间：<span>{{ item.etime }}</span>
                </div>
              </div>
              <div
                v-if="item.status == 1"
                class="tf-icon tf-icon-erweima"
                @click="showService(item)"
              ></div>
            </div>
            <div class="tf-card-content">
              <span
                class="tf-icon"
                :class="[true ? 'tf-icon-shijian' : 'tf-icon-dingwei']"
              ></span
              ><span class="info-text"
                >小区服务中心二楼（周一至周五 9:00-18:00）</span
              >
            </div>
          </div>
        </template>
      </refreshList>
    </div>
    <tfDialog
      v-model="dialog"
      :title="active.category"
      popup-class="free-server-dialog"
    >
      <div class="qr-box">
        <div class="qr-status-box">
          <div class="qr-status">
            {{ active.category_type == 1 ? "开始享受服务" : "归还" }}
          </div>
          <div class="qr-triangle"></div>
        </div>
        <img class="qr-img" :src="qrImg" />
      </div>
      <div class="qr-alert">（请前往物业，出示给工作人员）</div>
    </tfDialog>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import tfDialog from '@/components/tf-dialog/index.vue'
import {
  getMyFreeServerList,
  getServerCode,
  serverCodeStatus
} from '@/api/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    refreshList,
    tfDialog
  },
  data () {
    return {
      data: [],
      dialog: false,
      active: {},
      qrImg: ''
    }
  },
  created () {
    // this.getMyFreeServerList()
  },
  methods: {
    getMyFreeServerList ({ pages }) {
      const len = this.data.length
      return getMyFreeServerList({
        serverId: (len && pages !== 1 && this.data[len - 1].id) || ''
      })
    },
    /* 点击服务显示二维码 */
    showService (item) {
      const { category_type: categoryType, id, category_id } = item
      this.active = item
      const codeType = categoryType == '1' ? 4 : 2
      this.dialog = true
      this.getServerCode(category_id, codeType, id)
    },
    /* 获取服务二维码 */
    getServerCode (id, code_type, server_id) {
      getServerCode({
        id,
        server_id,
        code_type
      }).then(res => {
        this.qrImg = res.data.url
        this.codeId = res.data.code_id
        this.serverCodeStatus()
      })
    },
    /* 轮询收款码当前状态 */
    pollingServer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.serverCodeStatus()
      }, 3000)
    },
    /* 出示二维码用户监听状态 */
    serverCodeStatus () {
      serverCodeStatus({
        code_id: this.codeId
      }).then(res => {
        if (res.status == '1') {
          this.success = true
          this.timer = null
        } else {
          this.pollingServer()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tf-body-container {
  padding-top: 10px;
}
.tf-card-header__title {
  width: 100%;
  font-size: 32px;
  font-weight: bold;
}
.header-name {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  line-height: 1;
  .status-tag {
    font-size: 24px;
    color: #8f8f94;
  }
}
.header-time {
  margin-top: 19px;
  font-size: 26px;
  font-weight: 500;
  line-height: 1;
  color: #8f8f94;
  span {
    color: #222222;
  }
}
.alert-success-text {
  color: #6bc572 !important;
}
.alert-info-text {
  color: #00A0E9 !important;
}
.alert-text {
  color: #ff6555 !important;
}
.tf-card-content {
  .tf-icon {
    margin-right: 10px;
    font-size: 28px;
    font-weight: bold;
    color: #000;
  }
  .info-text {
    font-size: 26px;
    color: #8f8f94;
  }
}
.tf-icon-erweima {
  position: absolute;
  top: 84px;
  right: 30px;
  font-size: 40px;
  line-height: 1;
}

.qr-box {
  padding: 0 70px;
}

.qr-img {
  width: 320px;
  height: 320px;
}

.qr-status-box {
  @flex-column();
  align-items: center;
  margin-bottom: 6px;
}

.qr-status {
  width: 320px;
  height: 66px;
  line-height: 66px;
  font-size: 30px;
  font-weight: 500;
  border-radius: 33px;
  color: #ff6555;
  background-color: #ff65551a;
  text-align: center;
}

.qr-triangle {
  .triangle-bottom(12px, 15px, #ff65551a);
}

.qr-alert {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  font-size: 26px;
  font-weight: 500;
  color: #8f8f94;
}
</style>

<style lang="less">
.free-server-dialog {
  .tf-dialog-header {
    height: 148px;
    .tf-dialog-header__title {
      line-height: 148px;
    }
  }
  .tf-dialog-content {
    padding-top: 30px;
  }
}
</style>
