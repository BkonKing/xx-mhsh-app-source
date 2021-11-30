<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar
      title=""
      :fixed="true"
      placeholder
      :border="false"
      :left-arrow="true"
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="tf-body-container">
      <img class="poster" :src="poster" alt="">
      <!-- <img class="img1" src="@/assets/invite/qr-bg-5.png" />
      <img class="img2" src="@/assets/invite/qr-title.png" />
      <div class="qr-box">
        <div class="qr-text">扫码领取首次下载登录 888 幸福币奖励</div>
        <img class="img3" src="@/assets/invite/qr-border.png" />
      </div> -->
      <div class="btn-box" @click="saveImage">保存图片</div>
    </div>
  </div>
</template>

<script>
// /personage/invite/QRCode
import { mapGetters } from 'vuex'
import { getPoster } from '@/api/personage'
import { handlePermission } from '@/utils/permission'
export default {
  name: 'inviteQRCode',
  data () {
    return {
      poster: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    uid () {
      return this.userInfo.id
    }
  },
  created () {
    this.getPoster()
  },
  methods: {
    getPoster () {
      getPoster({
        uid: this.uid
      }).then(({ user_fx_pic: poster }) => {
        this.poster = poster
      })
    },
    saveImage () {
      handlePermission({
        name: 'storage',
        message: '请开启数据存储权限，才能保存图片到相册哦！'
      }).then(() => {
        if (api.systemType === 'android') {
          this.downloadPic()
        } else {
          this.saveMediaToAlbum(this.poster)
        }
      })
    },
    // 安卓需要将图片先下载到本地
    downloadPic () {
      api.download({
        url: this.poster,
        report: false,
        cache: true,
        allowResume: false
      }, (ret, err) => {
        if (ret.state == 1) {
          this.saveMediaToAlbum(ret.savePath)
        } else {
          this.$toast.fail('保存失败')
        }
      })
    },
    // 保存图片到本地
    saveMediaToAlbum (path) {
      api.saveMediaToAlbum(
        {
          path,
          groupName: '美好生活'
        },
        (ret, err) => {
          if (ret && ret.status) {
            this.$toast.success('保存成功')
          } else {
            this.$toast.fail('保存失败')
          }
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
.tf-body-container {
  position: relative;
  overflow: initial;
  background: #febf00;
  // background: linear-gradient(0deg, #fe9b00 0%, #febf00 50%);
}
.img1 {
  position: absolute;
  top: 0;
  width: 100%;
}
.img2 {
  position: absolute;
  top: 71px;
  left: 94px;
  width: 571px;
  height: 162px;
}
.img3 {
  position: absolute;
  top: 274px;
  left: 40px;
  width: 671px;
  height: 750px;
}
.btn-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 80px;
  position: absolute;
  top: 1024px;
  // bottom: 110px;
  left: 216px;
  background-image: url("~@/assets/invite/qr-btn.png");
  background-size: cover;
  font-size: 28px;
  font-weight: bold;
  color: #ffffff;
}
.qr-box {
  position: absolute;
  top: 274px;
  left: 40px;
  width: 671px;
  height: 750px;
  background-image: url("~@/assets/invite/qr-border.png");
  background-size: cover;
  .qr-text {
    line-height: 94px;
    text-align: center;
    font-size: 28px;
    color: #ffd09b;
    background-image: linear-gradient(to bottom, #ffd09b, #ffffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 1px 4px 6px #c1440c94;
  }
}
.poster {
  width: 100%;
  // height: 100%;
  object-fit: contain;
}
</style>
