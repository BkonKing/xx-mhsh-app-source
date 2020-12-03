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
      copyright ©2020 河南美好生活家园运营服务集团有限公司 All Rights Reserved
    </div>
    <tf-dialog
      v-model="showDialog"
      title="版本更新"
      :showFotter="true"
      okText="更新"
      @confirm="updateApp"
    >
      <div class="dialog-content">更新内容：{{ versionDes }}</div>
    </tf-dialog>
  </div>
</template>

<script>
import { NavBar, Toast } from 'vant'
import tfList from '@/components/tf-list/index.vue'
import tfListItem from '@/components/tf-list/item.vue'
import tfDialog from '@/components/tf-dialog/index.vue'
export default {
  name: 'settingAbout',
  components: {
    [NavBar.name]: NavBar,
    tfList,
    tfListItem,
    tfDialog
  },
  data () {
    return {
      showDialog: false,
      source: '', // 版本下载地址
      appVersion: '',
      versionDes: '', // 版本描述
      updateStatus: false // 是否有版本更新
    }
  },
  created () {
    this.checkUpdate()
    this.appVersion = api.appVersion
  },
  methods: {
    /* 检查版本更新 */
    checkUpdate () {
      var mam = this.$api.require('mam')
      mam.checkUpdate((ret, err) => {
        if (ret) {
          if (ret.status) {
            const data = ret.result
            const { update, source, versionDes } = data
            this.updateStatus = update
            this.source = source
            this.versionDes = versionDes
          }
        } else {
          console.error(err)
        }
      })
    },
    /* 更新说明提醒 */
    openDialog () {
      if (this.updateStatus) {
        this.showDialog = true
      } else {
        Toast('当前已是最新版本')
      }
    },
    // 更新app
    updateApp () {
      if (api.systemType == 'android') {
        api.download(
          {
            url: this.source,
            report: true
          },
          (ret, err) => {
            if (ret && ret.state == 0) {
              /* 下载进度 */
              api.toast({
                msg: '正在下载应用' + ret.percent + '%',
                duration: 2000
              })
            }
            if (ret && ret.state == 1) {
              /* 下载完成 */
              var savePath = ret.savePath
              api.installApp({
                appUri: savePath
              })
            }
          }
        )
      }
      if (api.systemType == 'ios') {
        api.installApp({
          appUri: this.source
        })
      }
      this.mtjEvent({
        eventId: 81
      })
    },
    /* 跳转协议 */
    goAgreementList () {
      this.$router.push('/pages/personage/agreement/list')
    }
  }
}
</script>

<style lang="less" scoped>
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
  text-align: center;
  position: absolute;
  bottom: 60px;
  font-size: 28px;
  color: #999;
}
</style>
