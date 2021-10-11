<template>
  <van-popup
    v-model="agreePopup"
    safe-area-inset-bottom
    get-container="body"
    :close-on-click-overlay="closeOnClickOverlay"
    class="agree-popup"
  >
    <div class="agree-popup-title">
      {{ title }}
    </div>
    <div class="agree-popup-content">
      <slot name="content">
        {{ content }}
      </slot>
    </div>
    <van-button
      v-if="showConfirmButton"
      class="agree-popup-btn"
      type="danger"
      size="large"
      @click="confirm"
      >{{ confirmButtonText }}</van-button
    >
    <div v-if="showCancelButton" class="agree-popup-text" @click="cancel">
      {{ cancelButtonText }}
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'agree-popup',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    confirmButtonText: {
      type: String,
      default: ''
    },
    cancelButtonText: {
      type: String,
      default: ''
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      agreePopup: this.value
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
  created () {},
  methods: {
    confirm () {
      this.$emit('confirm')
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="less" scoped>
.agree-popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 560px;
  padding: 60px 40px 40px;
  z-index: 9999 !important;
  background: #ffffff;
  border-radius: 10px;
  &-title {
    font-size: 28px;
    font-weight: bold;
    color: #333;
    line-height: 1;
  }
  &-content {
    padding: 0;
    margin-top: 27px;
    font-size: 24px;
    color: #333;
    line-height: 44px;
    a {
      color: #00a0e9;
    }
  }
  &-btn {
    height: 88px;
    font-size: 28px;
    margin-top: 30px;
  }
  &-text {
    margin-top: 30px;
    font-size: 24px;
    color: #8f8f94;
  }
}
</style>
