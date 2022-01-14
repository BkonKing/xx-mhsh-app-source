<template>
  <div class="tf-bg">
    <van-nav-bar
      :fixed="true"
      :border="false"
      :title="title"
      placeholder
      left-arrow
      @click-left="goBack"
    >
      <template #right>
        <div class="rightIcon" @click="shareShow = true">
          <i class="tf-icon tf-icon-fenxiang2"></i>
        </div>
      </template>
    </van-nav-bar>
    <div class="content">
      <img class="img1" src="@/assets/activity/20220115.jpg" />
      <van-button
        class="sign-btn"
        v-preventReClick
        :loading="signLoading"
        @click="handleSign"
      ></van-button>
    </div>
    <tf-share
      :share-show="shareShow"
      :share-obj="shareObj"
      @closeSwal="closeShare"
    >
    </tf-share>
  </div>
</template>

<script>
// /pages/activity/20220115activity
import tfShare from '@/components/tf-share'
import { signin } from '@/api/personage'
import { downloadPic } from '@/utils/util'
import { handlePermission } from '@/utils/permission'
export default {
  name: '20220115activity',
  components: {
    tfShare
  },
  data () {
    return {
      title: '打卡赢幸福币  到访兑好礼',
      shareShow: false,
      signLoading: false,
      shareObj: {}
    }
  },
  created () {
    this.downloadSharePic()
  },
  methods: {
    downloadSharePic () {
      const urlName = '20220115activity'
      downloadPic(
        `${process.env.VUE_APP_DOMAIN_NAME}/library/img/app_img/20220115activityicon.png`,
        urlName
      )
        .then(data => {
          this.sendShareParam(data)
        })
        .catch(() => {
          this.sendShareParam('')
        })
    },
    sendShareParam (data) {
      this.shareObj = {
        title: this.title,
        description: '海丝文创广场丨双地铁 公园里 智享文创社区',
        pyqTitle: this.title,
        thumb: data ? 'fs://' + data + '.png' : '',
        contentUrl:
          `${process.env.VUE_APP_DOMAIN_NAME}/wap/#/20220115activity`
      }
    },
    // 签到
    handleSign () {
      handlePermission({
        name: 'location',
        title: '定位服务未开启',
        message: '为了提供更好服务，需要您开启定位'
      }).then(() => {
        this.signLoading = true
        signin()
          .then(res => {
            this.$toast({
              message: res.message
            })
            this.$store.dispatch('getMyAccount')
          })
          .finally(() => {
            this.signLoading = false
          })
      })
    },
    closeShare (data) {
      this.shareShow = data == 1
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  position: relative;
}
.img1 {
  display: block;
  width: 100%;
}
.sign-btn {
  position: absolute;
  width: 510px;
  height: 130px;
  left: 120px;
  bottom: 370px;
  opacity: 0;
}
</style>
