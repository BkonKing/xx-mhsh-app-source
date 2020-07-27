<template>
  <div class="shade">
    <van-nav-bar
      class="invite-nav-bar"
      title="访客通行证"
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />
    <div class="invite-box">
      <div class="share-box">
        <div class="share-name">
          <div class="share-name__text">河南美好生活家园</div>
        </div>
        <div class="tf-text-lg">5栋-1单元-1001</div>
        <div class="qr-box">
          <img class="qr-box__image" src="@/assets/app-icon.png" />
        </div>
        <div class="tf-text-grey">有效次数 1</div>
        <div class="tf-text-grey">有效日期：2020-06-15 12:00 ~ 14:00</div>
        <div class="tf-divider-dashed" style="width: 100%;"></div>
        <div class="tf-text-lg">彭生生(10人) 女 15050505050</div>
      </div>
      <button class="share-btn" type="warn">分享给访客</button>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  components: {
    [NavBar.name]: NavBar
  },
  data () {
    return {
      height: 'auto'
    }
  }
}
</script>

<style lang="less" scoped>
.shade {
  width: 100%;
  height: 100%;
  background-color: #1b1b1b;
}

.share-box {
  position: relative;
  width: 620px;
  margin: 80px 65px;
  padding: 60px 66px;
  @flex-column();
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 6px #f1c7c5;
  // border:6px solid rgba(235, 88, 65, 0.3);
}

.share-name {
  position: absolute;
  z-index: 999;
  top: -38px;
  left: 92px;
  width: 436px;
  height: 76px;
  background-image: linear-gradient(
    -45deg,
    rgba(235, 88, 65, 1),
    rgba(249, 134, 107, 1)
  );
}

.share-name__text {
  text-align: center;
  line-height: 76px;
  font-size: 30px;
  color: #fff;
}

.qr-box {
  width: 480px;
  height: 480px;
  margin: 40px 0;
}

.qr-box__image {
  width: 480px;
  height: 480px;
}

.tf-text-grey {
  font-size: 24px;
}

.share-btn {
  border: none;
  color: #fff;
  width: 620px;
  height: 88px;
  font-size:30px;
  background-image: linear-gradient(to right, @red, @red-dark);
  border-radius: 10px;
}

.invite-box {
  @flex-column();
  align-items: center;
}

.tf-divider-dashed {
  margin: 30px 0;
}

.invite-nav-bar {
  background-color: #1b1b1b;
  /deep/ .van-icon {
    color: #fff;
  }
  /deep/ .van-nav-bar__title {
    color: #fff;
  }
}
</style>
