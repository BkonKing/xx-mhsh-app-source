<template>
  <div class="tf-bg">
    <van-nav-bar
      title="关于"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="logo-container">
      <img class="logo-img" src="@/assets/imgs/logo.png" />
      <div class="tf-text tf-mt-base">版本号：{{ appVersion }}</div>
    </div>
    <tf-list>
      <tf-list-item
        title="检查更新"
        @click="openDialog"
        v-txAnalysis="{ eventId: 81 }"
        border
      >
        <template v-if="updateStatus" v-slot:right>
          <div class="right-text tf-text-primary">发现更新版本</div>
        </template>
      </tf-list-item>
      <tf-list-item title="协议及声明" @click="goAgreementList"></tf-list-item>
    </tf-list>
    <div class="copyright-box">
      copyright ©2020 河南美好生活家园运营服务集团有限公司<br />
      All Rights Reserved
    </div>
  </div>
</template>

<script>
import tfList from '@/components/tf-list/index'
import tfListItem from '@/components/tf-list/item'
import { checkUpdate, confirmUpdate } from '@/utils/apicloud_util'
export default {
  name: 'settingAbout',
  components: {
    tfList,
    tfListItem
  },
  data () {
    return {
      appVersion: '',
      updateStatus: false, // 是否有版本更新
      updateInfo: null
    }
  },
  created () {
    this.checkUpdate()
    this.appVersion = api.appVersion
  },
  methods: {
    /* 检查版本更新 */
    checkUpdate () {
      checkUpdate(false).then((result) => {
        this.updateInfo = result
        this.updateStatus = result.update
      })
    },
    /* 更新说明提醒 */
    openDialog () {
      if (this.updateStatus) {
        confirmUpdate(this.updateInfo)
      } else {
        this.$toast('当前已是最新版本')
      }
    },
    /* 跳转协议 */
    goAgreementList () {
      this.$router.push('/pages/personage/agreement/list')
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .tf-clist {
  border-radius: 0;
}
.right-text {
  font-size: 24px;
  text-align: right;
}
.dialog-content {
  font-size: 24px;
  line-height: 46px;
  color: #666;
}
.logo-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
  .logo-img {
    width: 200px;
    height: 200px;
  }
}
.copyright-box {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 60px;
  font-size: 24px;
  color: #999;
}
</style>
