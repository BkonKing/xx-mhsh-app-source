<template>
  <div class="tf-white-bg tf-body">
    <van-nav-bar
      title="人脸采集"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="tf-body-container">
      <div v-if="complete" class="success-tag">
        <span class="tf-icon tf-icon-gou"></span>
      </div>
      <img v-else class="face-img" src="@/assets/imgs/faceCollect.png" />
      <div class="tf-text-lg">
        {{
          complete === 2
            ? "采集成功！"
            : "拍摄您本人人脸，请保证正对手机，光线充足"
        }}
      </div>
      <div class="btn-box">
        <van-button type="info" size="large" @click="getCameraPermission">{{
          complete === 2 ? "重新采集" : "开始采集本人人脸"
        }}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { handlePermission } from '@/utils/permission'
export default {
  data () {
    return {
      FNPhotograph: null,
      complete: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    this.complete = this.userInfo.have_faceimg == 1 ? 2 : 0
  },
  methods: {
    // 获取摄像头权限
    getCameraPermission () {
      this.$router.push({
        name: 'faceCollectCamera'
      })
      handlePermission({
        name: 'camera'
      }).then(() => {
        this.$router.push({
          name: 'faceCollectCamera'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tf-body-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .btn-box {
    width: 100%;
    padding: 0 50px;
    position: fixed;
    bottom: 311px;
  }
  .tf-text-lg {
    margin-top: 56px;
  }
}
/deep/ .van-button--info {
  background: #448fe4;
}
.success-tag {
  width: 240px;
  height: 240px;
  margin-top: 137px;
  background: linear-gradient(-45deg, @red-dark, @red);
  text-align: center;
  color: #fff;
  border-radius: 50%;
  .tf-icon-gou {
    font-size: 240px;
    line-height: 240px;
  }
}
.face-img {
  width: 650px;
  height: 480px;
  margin: 80px 50px 134px;
}
</style>
