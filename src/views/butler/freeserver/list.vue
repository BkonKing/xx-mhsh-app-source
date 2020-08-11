<template>
  <div class="tf-bg tf-padding-base">
    <van-nav-bar title="我的免费预约" :fixed="true" left-arrow @click-left="$router.go(-1)" />
    <div class="tf-main-container">
      <refreshList :list.sync="data" :load="getMyFreeServerList">
        <template v-slot="{item}">
          <div class="tf-card tf-mb-base">
            <div class="tf-card-header">
              <div class="tf-card-header__title">{{ item.category }}</div>
              <div v-if="item.status == 1" class="tf-icon tf-icon-qrcode" @click="showQrcode(item)"></div>
            </div>
            <div class="tf-card-content">
              <template v-if="item.category_type == 1">
                <div class="mb10">排队时间：{{item.stime}}</div>
                <div v-if="item.status == 1">
                  排队中：
                  <span class="tf-text-primary">第 {{item.pd_num}} 位</span>
                </div>
                <div v-else-if="item.status == 2">服务时间：{{item.etime}}</div>
              </template>
              <template v-else>
                <div class="mb10">借用时间：{{item.stime}}</div>
                <div v-if="item.status == 1">
                  归还时间：
                  <span class="tf-text-primary">请于 {{item.gh_time}} 前归还</span>
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
        <img class="qr-img" src="@/assets/app-icon.png" />
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
import { getMyFreeServerList } from '@/api/butler.js'
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
      active: {}
    }
  },
  created () {
    // this.getMyFreeServerList()
  },
  methods: {
    getMyFreeServerList (params) {
      return getMyFreeServerList(params)
    },
    /* 二维码显示 */
    showQrcode (item) {
      this.active = item
      this.dialog = true
    }
  }
}
</script>

<style lang="less" scoped>
.tf-bg {
  height: 100%;
}
.tf-flex-item {
  height: 100%;
  padding-top: 88px;
}
.tf-card-content {
  color: @gray-7;
}
.mb10 {
  margin-bottom: 10px;
}
.tf-icon-qrcode {
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
