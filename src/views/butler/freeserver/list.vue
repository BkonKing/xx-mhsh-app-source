<template>
  <div class="tf-bg tf-body">
    <van-nav-bar title="我的免费服务" :fixed="true" placeholder left-arrow @click-left="$router.go(-1)" />
    <div class="tf-body-container">
      <refreshList :list.sync="data" :load="getMyFreeServerList">
        <template v-slot="{item}">
          <div class="tf-card">
            <div class="tf-card-header">
              <div class="tf-card-header__title">{{ item.category }}</div>
              <div v-if="item.status == 1" class="tf-icon tf-icon-erweima" @click="showService(item)"></div>
            </div>
            <div class="tf-card-content">
              <template v-if="item.category_type == 1">
                <div>排队时间：{{item.stime}}</div>
                <div class="mt10" v-if="item.status == 1">
                  排队中：
                  <span top="tf-text-primary">第 {{item.pd_num}} 位</span>
                </div>
                <div v-else-if="item.status == 2">服务时间：{{item.etime}}</div>
              </template>
              <template v-else>
                <div>借用时间：{{item.stime}}</div>
                <div class="mt10" v-if="item.status == 1">
                  归还时间：
                  <span top="tf-text-primary">请于 {{item.gh_time}} 前归还</span>
                </div>
                <div v-if="item.status == 2">归还时间：{{item.etime}}</div>
              </template>
            </div>
          </div>
        </template>
      </refreshList>
    </div>
    <tfDialog v-model="dialog" :title="active.category">
      <div class="qr-box">
        <img class="qr-img" :src="qrImg" />
        <div class="qr-status-box">
          <div class="qr-triangle"></div>
          <div class="qr-status">{{active.categoryType == 1 ? '开始享受服务' : '归还'}}</div>
        </div>
      </div>
    </tfDialog>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import tfDialog from '@/components/tf-dialog/index.vue'
import { getMyFreeServerList, getServerCode, serverCodeStatus } from '@/api/butler.js'
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
    getMyFreeServerList (params) {
      return getMyFreeServerList(params)
    },
    /* 点击服务显示二维码 */
    showService (item) {
      const {
        category_type: categoryType,
        id,
        category_id
      } = item
      const codeType = categoryType === '1' ? 4 : 2
      this.dialog = true
      this.getServerCode(category_id, codeType, id)
    },
    /* 获取服务二维码 */
    getServerCode (id, code_type, server_id) {
      getServerCode({
        id,
        server_id,
        code_type
      }).then((res) => {
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
      }).then((res) => {
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
.tf-card-content {
  color: @gray-7;
  margin-bottom: 10px;
}
.mt10 {
  margin-top: 10px;
}
.tf-icon-erweima {
  font-size: 42px;
  line-height: 1;
}
.qr-box {
  padding: 40px 70px;
}

.qr-img {
  width: 320px;
  height: 320px;
}

.qr-status-box {
  @flex-column();
  align-items: center;
  margin-top: 26px;
}

.qr-status {
  width: 320px;
  height: 66px;
  line-height: 66px;
  font-size: 30px;
  border-radius: 33px;
  color: #fff;
  background-color: @red-dark;
  text-align: center;
}

.qr-triangle {
  .triangle();
}
</style>
