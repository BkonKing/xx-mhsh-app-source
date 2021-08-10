<template>
  <van-popup
    v-model="agreePopup"
    safe-area-inset-bottom
    get-container="body"
    :close-on-click-overlay="false"
    class="agree-popup"
  >
    <div class="agree-popup-title">
      请阅读并同意以下协议
    </div>
    <div class="agree-popup-content">
      为保障您的个人信息安全，使用登录功能需要您先仔细阅读并同意<router-link
        class="agreement-link"
        to="/agreement?articleType=1"
        >《{{ userAgreementTitle }}》</router-link
      >
      <router-link class="agreement-link" to="/agreement?articleType=6"
        >《{{ privacyAgreementTitle }}》</router-link
      >
    </div>
    <van-button
      class="agree-popup-btn"
      type="danger"
      size="large"
      @click="handleAgree"
      >同意</van-button
    >
    <div class="agree-popup-text" @click="closeAPP">
      不同意并退出APP <span class="tf-icon tf-icon-right"></span>
    </div>
  </van-popup>
</template>

<script>
import { getAllAgreement } from '@/api/home'
export default {
  name: 'agree-popup',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      agreePopup: this.value,
      userAgreementTitle: '用户协议', // 用户协议标题
      privacyAgreementTitle: '隐私协议' // 隐私协议标题
    }
  },
  watch: {
    agreePopup (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.agreePopup = val
    }
  },
  created () {
    this.getAllAgreement()
  },
  methods: {
    // 获取协议名称
    getAllAgreement () {
      getAllAgreement().then(({ data }) => {
        data.forEach(obj => {
          obj.article_type === '1' && (this.userAgreementTitle = obj.title)
          obj.article_type === '6' && (this.privacyAgreementTitle = obj.title)
        })
      })
    },
    // 同意协议
    handleAgree () {
      this.$emit('handleAgree')
      this.agreePopup = false
    },
    // 关闭APP
    closeAPP () {
      api.closeWidget({ silent: true })
    }
  }
}
</script>

<style lang="less" src="./agree-popup.less"></style>
