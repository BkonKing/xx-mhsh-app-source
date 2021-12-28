<template>
  <van-popup
    v-model="visible"
    safe-area-inset-bottom
    get-container="body"
    :close-on-click-overlay="closeOnClickOverlay"
    class="tf3-popup"
  >
    <div class="tf3-popup-title">
      {{ title }}
      <span class="van-icon van-icon-cross" @click="close"></span>
    </div>
    <div class="tf3-popup-content">
      <slot name="content">
        {{ content }}
      </slot>
    </div>
    <div v-if="showConfirmButton || showCancelButton" class="tf3-popup-footer">
      <van-button
        v-if="showCancelButton"
        class="tf3-popup-btn tf3-popup-btn2"
        size="large"
        @click="cancel"
      >
        {{ cancelButtonText }}
      </van-button>
      <van-button
        v-if="showConfirmButton"
        class="tf3-popup-btn"
        size="large"
        @click="confirm"
        >{{ confirmButtonText }}</van-button
      >
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'TfDialogV3',
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
      default: '确定'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: this.value
    }
  },
  watch: {
    visible (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.visible = val
    }
  },
  created () {},
  methods: {
    close () {
      this.visible = false
    },
    confirm () {
      this.$emit('confirm')
    },
    cancel () {
      this.visible = false
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="less" scoped>
span {
  line-height: 1;
}
.tf3-popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 560px;
  min-height: 360px;
  padding: 0 40px 40px;
  z-index: 9999 !important;
  background: #ffffff;
  border-radius: 10px;
  &-title {
    width: 100%;
    height: 94px;
    padding-top: 32px;
    padding-bottom: 32px;
    position: relative;
    font-size: 30px;
    font-weight: bold;
    color: #333;
    text-align: center;
    line-height: 1;
    .van-icon-cross {
      position: absolute;
      top: 28px;
      right: -12px;
      font-size: 40px;
      color: #AAAAAA;
      line-height: 1;
    }
  }
  &-content {
    flex: 1;
    padding-top: 20px;
    font-size: 26px;
    color: #333;
    text-align: center;
    line-height: 44px;
  }
  &-footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 40px;
  }
  &-btn {
    height: 88px;
    background: #ff6555;
    border-radius: 10px;
    border: none;
    color: #fff;
  }
  &-btn + &-btn {
    margin-left: 40px;
  }
  &-btn2 {
    background: #f7f7f7;
    color: #8f8f94;
  }
}
</style>
