<template>
  <div class="tf-bg">
    <van-nav-bar :fixed="true" left-arrow @click-left="$router.go(-1)" />
    <div class="tf-main-container">
    </div>
    <tf-dialog class="negotiate-dialog" v-model="negotiateShow" title="协商信息">
      <div class="padding40">
        <div class="tf-text">
          <span class="lp112">费</span>
          <span>用：预计</span>
          <span>120</span>
          元
        </div>
        <div class="tf-text">预约处理时间：2020-07-08 12:00</div>
        <div v-if="!negotiateStatus" class="tf-text tf-row">
          <div>
            <span class="lp18">拒绝原</span>
            因：
          </div>
          <div class="tf-flex-item">{{refuseArray[refuseReason].label}}({{refuseExplain}})</div>
        </div>
        <div class="confirm-btn">{{negotiateStatus ? '已确认' : '已拒绝'}}</div>
      </div>
    </tf-dialog>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import tfDialog from '@/components/tf-dialog/index.vue'
export default {
  components: {
    [NavBar.name]: NavBar,
    tfDialog
  },
  data () {
    return {
      type: '',
      server_id: '',
      project_id: '',
      uid: ''
    }
  },
  created () {
    const { type, server_id, project_id, uid } = this.$route.query
    this.type = type
    this.server_id = server_id
    this.project_id = project_id
    this.uid = uid
  }
}
</script>

<style lang="less" scoped>

</style>
