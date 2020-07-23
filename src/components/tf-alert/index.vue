<template>
  <div class="alert-box" @click="onClick">
    <div class="alert-bg" :class="`alert-box--${type}`"></div>
    <span class="tf-icon alert-box__icon" :class="`alert-box__content--${type}`">{{icon[type]}}</span>
    <span class="alert-box__content" :class="`alert-box__content--${type}`">{{content}}</span>
  </div>
</template>

<script>
import { success, error, warningFill, info } from '../../const/icon.js'
export default {
  props: {
    type: {
      type: String,
      default: 'info',
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'error', 'info'].indexOf(value) !== -1
      }
    },
    content: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      icon: {
        success,
        error,
        warning: warningFill,
        info
      }
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.alert-box {
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  height: 88px;
  padding: 26px 30px;
  border-radius: @border-radius-sm;
}

.alert-bg {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  left: 0;
  opacity: 0.2;
  border-radius: @border-radius-sm;
}

.alert-box__icon {
  width: 36px;
  font-size: 36px;
}

.alert-box__content {
  font-size: 26px;
}

.alert-box--success {
  background-color: @green-dark;
}

.alert-box--warning {
  background-color: @red;
}

.alert-box--error {
  background-color: @red;
}

.alert-box--info {
  background-color: @gray-1;
}

.alert-box__content--success {
  color: @green-dark;
}

.alert-box__content--warning {
  color: @red-dark;
}

.alert-box__content--error {
  color: @red-dark;
}

.alert-box__content--info {
  color: @gray-7;
}
</style>
