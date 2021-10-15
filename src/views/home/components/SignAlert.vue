<template>
  <div class="sign-alert">
    <van-popup
      safe-area-inset-bottom
      get-container="body"
      class="tf-van-popup"
      v-model="valueChild"
      @click-overlay="close"
      :close-on-click-overlay="false"
      :style="{ top: '50%' }"
    >
      <div class="sign-alert-container">
        <div class="sign-alert-header">
          <span class="tf-icon tf-icon-guanbi" @click="close"></span>
        </div>
        <div class="sign-alert-content">
          <div class="sign-alert-message">{{ message }}</div>
          <div class="sign-alert-text sign-mt">完成房屋认证</div>
          <div class="sign-alert-text">每天签到可得{{credits}}幸福币</div>
          <div class="sign-alert-btn" @click="cancel">
            去认证
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: '签到成功，获得1幸福币'
    },
    credits: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      valueChild: this.value
    }
  },
  methods: {
    cancel () {
      this.close()
      this.$router.push({
        name: 'houseAttestation',
        query: {
          type: 1,
          mode: 0,
          select: 1
        }
      })
    },
    close () {
      this.valueChild = false
    }
  },
  watch: {
    value (val) {
      this.valueChild = val
    },
    valueChild (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
.tf-van-popup {
  background: none;
}

.sign-alert-container {
  width: 498px;
  height: 480px;
  border-radius: 12px;
  background-color: #fff;
}

.sign-alert-header {
  position: relative;
  width: 498px;
  height: 133px;
  background: url("~@/assets/imgs/sign-alert-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  .tf-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px;
    line-height: 1;
    font-size: 30px;
    color: #fff;
  }
}

.sign-alert-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  .sign-alert-message {
    margin-top: 52px;
    font-size: 28px;
    font-weight: bold;
    line-height: 1;
    color: #ff6555;
  }
  .sign-alert-text.sign-mt {
    margin-top: 43px;
  }
  .sign-alert-text {
    margin-top: 20px;
    font-size: 28px;
    font-weight: 500;
    line-height: 1;
    color: #000000;
  }
}

.sign-alert-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 72px;
  margin-top: 45px;
  border-radius: 36px;
  font-size: 28px;
  color: #fff;
  background-color: #FF6555;
}
</style>
