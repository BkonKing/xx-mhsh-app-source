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
    <div class="about-contariner">
      <div class="logo-container">
        <img class="logo-img" src="@/assets/imgs/logo.png" />
        <div class="tf-text-lg">版本号：{{ appVersion }}</div>
      </div>
      <tf-list class="about-list">
        <tf-list-item
          title="检查更新"
          @click="openDialog"
          v-txAnalysis="{ eventId: 81 }"
          border
        >
          <template v-if="updateStatus" v-slot:right>
            <div class="right-text tf-text-primary">发现新版本</div>
          </template>
        </tf-list-item>
        <tf-list-item
          title="协议及声明"
          @click="goAgreementList"
        ></tf-list-item>
      </tf-list>
      <div class="copyright-box">
        copyright ©2020 河南美好生活家园运营服务集团有限公司<br />
        All Rights Reserved
      </div>
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
      checkUpdate(false).then(result => {
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
.about-contariner {
  padding: 0 20px;
}
.about-list {
  width: 100%;
  border-radius: 10px;
  color: #222;
  /deep/ .tf-clist-box {
    height: 100px;
  }
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
  padding-top: 96px;
  .logo-img {
    width: 228px;
    height: 228px;
  }
  .tf-text-lg {
    color: #222;
    margin-bottom: 80px;
  }
}
.copyright-box {
  width: 710px;
  text-align: center;
  position: absolute;
  bottom: 26px;
  font-size: 22px;
  line-height: 42px;
  color: #8f8f94;
}
</style>
