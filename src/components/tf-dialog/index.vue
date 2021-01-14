<template>
  <div class="tf-dialog-container">
    <van-popup
      safe-area-inset-bottom
      :get-container="getContainer"
      class="tf-van-popup"
      v-model="valueChild"
      @click-overlay="close"
      :close-on-click-overlay="false"
      :style="{'top': top}"
    >
      <div class="tf-dialog__wrapper-box">
        <span class="tf-icon tf-icon-guanbi1" @click="close"></span>
        <div class="tf-dialog">
          <div v-if="title" class="tf-dialog-header">
            <div class="tf-dialog-header__title">{{ title }}</div>
          </div>
          <div class="tf-dialog-content">
            <slot></slot>
          </div>
          <div v-if="showFotter" class="tf-dialog-footer">
            <div
              v-if="!hiddenOff"
              class="tf-dialog-footer__btn tf-dialog-footer__btn--grey"
              style="margin-right: 30px;"
              @click="cancel"
            >{{cancleText}}</div>
            <div
              v-preventReClick
              class="tf-dialog-footer__btn tf-dialog-footer__btn--orange"
              @click="confirm"
            >{{okText}}</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup } from 'vant'
export default {
  components: {
    [Popup.name]: Popup
  },
  props: {
    type: {
      type: String,
      default: 'dialog'
    },
    title: {
      type: String,
      default: ''
    },
    okText: {
      type: String,
      default: '确定'
    },
    cancleText: {
      type: String,
      default: '取消'
    },
    showFotter: {
      type: Boolean,
      default: false
    },
    hiddenOff: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    },
    top: {
      type: String,
      default: '50%'
    },
    getContainer: {
      type: String,
      default: 'body'
    }
  },
  data () {
    return {
      valueChild: this.value
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
      this.close()
    },
    close () {
      this.valueChild = false
      this.$emit('closed')
    },
    confirm () {
      this.$emit('confirm')
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
.tf-dialog__wrapper-box {
  width: 560px;
}

.tf-icon {
  display: block;
  text-align: right;
  font-size: 50px;
  color: #fff;
  margin: 0 30px 30px 0;
}

.tf-dialog {
  width: 100%;
  padding: 0 50px;
  border-radius: 10px;
  background-color: #fff;
}

.tf-dialog-header {
  height: 115px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: @divider-color;
}

.tf-dialog-header__title {
  line-height: 115px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: #000;
}

.tf-dialog-content {
  padding: 60px 0;
}

.tf-dialog-footer {
  @flex();
  padding-bottom: 60px;
}
.tf-dialog-footer__btn {
  flex: 1;
  height: 66px;
  line-height: 62px;
  border-radius: 4px;
  font-size: 30px;
  text-align: center;
}
.tf-dialog-footer__btn--grey {
  border-width: 2px;
  border-style: solid;
  border-color: #aaa;
  color: @gray-7;
}
.tf-dialog-footer__btn--orange {
  border-width: 2px;
  border-style: solid;
  border-color: @red-dark;
  color: #fff;
  background-color: @red-dark;
}
</style>
