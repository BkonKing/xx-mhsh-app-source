<template>
  <div class="page">
    <van-swipe
      class="opening-swipe"
      :show-indicators="false"
      :loop="false"
      @change="onChange"
    >
      <van-swipe-item v-for="(image, index) in images[key]" :key="index">
        <img class="opening-img" :src="image" />
      </van-swipe-item>
    </van-swipe>
    <div
      v-if="index === 3"
      :class="`opening-btn-${key}`"
      @click="goLogin"
    ></div>
    <van-popup
      v-model="agreePopup"
      safe-area-inset-bottom
      get-container="body"
      :close-on-click-overlay="false"
      class="agree-popup"
    >
      <div class="agree-popup-header">
        用户协议和隐私政策
      </div>
      <div class="agree-popup-content">
        欢迎使用美好生活家园！在您使用之前，请您认真阅读并了解<router-link
          class="agreement-link"
          to="/agreement?articleType=1"
          >《{{ userAgreementTitle }}》</router-link
        >和
        <router-link class="agreement-link" to="/agreement?articleType=6"
          >《{{ privacyAgreementTitle }}》</router-link
        >。我们可能会根据您所使用服务功能的需要收集和使用您的相关信息。通过前述协议和政策，向您说明在使用服务时我们如何收集、使用、存储和分享这些信息，以及我们为您提供的访问、更新和保护这些信息的方式。
        <div>
          如果您同意我们的前述协议和政策内容，请同意并继续使用本软件。我们会不断完善技术和安全管理，保护您的个人信息。
        </div>
      </div>
      <van-button
        class="agree-popup-btn"
        type="danger"
        size="large"
        @click="handleAgree"
        >同意</van-button
      >
      <div class="agree-popup-text" @click="disagree">
        不同意
      </div>
    </van-popup>
    <van-popup
      v-model="agreeAgainPopup"
      safe-area-inset-bottom
      get-container="body"
      :close-on-click-overlay="false"
      class="agree-popup"
    >
      <div class="agree-popup-title">
        您需要同意协议和政策，才能继续使用
      </div>
      <div class="agree-popup-content">
        您可再次查看<router-link
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
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
import { sendSaveDownload } from '@/api/user'
import { getAllAgreement } from '@/api/home'
import { handlePermission } from '@/utils/permission'
export default {
  name: 'openingPage',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data () {
    return {
      agreePopup: true,
      agreeAgainPopup: false,
      userAgreementTitle: '用户协议', // 用户协议标题
      privacyAgreementTitle: '隐私协议', // 隐私协议标题
      key: 0,
      images: {
        0: [
          require('./opening/1080_01.png'),
          require('./opening/1080_02.png'),
          require('./opening/1080_03.png'),
          require('./opening/1080_04.png')
        ],
        1: [
          require('./opening/1125_01.png'),
          require('./opening/1125_02.png'),
          require('./opening/1125_03.png'),
          require('./opening/1125_04.png')
        ],
        2: [
          require('./opening/1536_01.png'),
          require('./opening/1536_02.png'),
          require('./opening/1536_03.png'),
          require('./opening/1536_04.png')
        ]
      },
      index: 0
    }
  },
  created () {
    const status = api.getPrefs({
      sync: true,
      key: 'downloadCountStatus'
    })
    if (!status) {
      sendSaveDownload({
        mobile_type: api.systemType,
        app_system: api.systemVersion
      })
        .then(() => {})
        .catch(() => {})
    }
    api.setPrefs({
      key: 'downloadCountStatus',
      value: 1
    })
    this.getAllAgreement()
  },
  mounted () {
    const screenWidth = api.winWidth
    const screenHeight = api.winHeight
    if (screenWidth < 450 && screenHeight <= 756) {
      this.key = 0
    } else if (screenWidth < 450 && screenHeight > 756) {
      this.key = 1
    } else if (screenWidth >= 450) {
      this.key = 2
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'agreement') {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
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
    // 同意
    handleAgree () {
      this.agreePopup = false
      this.agreeAgainPopup = false
      this.setLocation()
    },
    // 不同意
    disagree () {
      this.agreePopup = false
      this.agreeAgainPopup = true
    },
    // 存储权限
    setStorage () {
      handlePermission({
        name: 'storage',
        message: '没有开启数据存储权限，可能会影响部分功能哦！'
      })
    },
    // 定位权限
    setLocation () {
      handlePermission({
        name: 'location',
        message: '没有开启定位，可能会影响部分功能哦！'
      }).finally(() => {
        this.setStorage()
      })
    },
    // 关闭APP
    closeAPP () {
      api.closeWidget({ silent: true })
    },
    goLogin () {
      api.setPrefs({
        key: 'first-open',
        value: 1
      })
      this.$router.replace('/login')
    },
    onChange (index) {
      this.index = index
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.opening-swipe {
  width: 100%;
  height: 100%;
  .opening-img {
    width: 100%;
    height: 100%;
  }
}
.opening-btn-0 {
  position: fixed;
  width: 500px;
  height: 140px;
  left: 125px;
  bottom: 130px;
  z-index: 2;
}
.opening-btn-1 {
  position: fixed;
  width: 500px;
  height: 150px;
  left: 125px;
  bottom: 270px;
  z-index: 2;
}
.opening-btn-2 {
  position: fixed;
  width: 460px;
  height: 120px;
  left: 145px;
  bottom: 110px;
  z-index: 2;
}
</style>

<style lang="less" src="@/components/Business/agree-popup.less"></style>

<style lang="less">
.agree-popup {
  width: 580px;
  .agree-popup-header {
    font-size: 36px;
    font-weight: bold;
  }
}
</style>
