<template>
  <div class="alert-box" :class="`alert-box--${type}`" @click="onClick">
    <div class="alert-bg"></div>
    <div class="tf-row-vertical-center">
      <span class="tf-icon alert-box__icon" :class="[`tf-icon-${type}-circle`]"></span>
    <span class="alert-box__content">{{content}}</span>
    </div>
    <span v-if="showRight" class="tf-icon tf-icon-doubleright"></span>
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
    },
    showRight: {
      type: Boolean,
      default: true
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
  @flex();
  position: relative;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  height: 88px;
  padding: 26px 30px;
  border-radius: @border-radius-md;
  color: #fff;
}

.alert-bg {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  left: 0;
  opacity: 0.2;
  border-radius: @border-radius-md;
}

.alert-box__icon {
  width: 36px;
  font-size: 36px;
  margin-right: 20px;
}

.alert-box__content {
  font-size: 26px;
}

.alert-box--success {
  .alert-bg {
    background-color: @green-dark;
  }
  .alert-box__content, .tf-icon {
    color: @green-dark;
  }
}

.alert-box--warning {
  .alert-bg {
    background-color: @red;
  }
  .alert-box__content, .tf-icon {
    color: @red-dark;
  }
}

.alert-box--error {
  .alert-bg {
    background-color: @red;
  }
  .alert-box__content, .tf-icon {
    color: @red-dark;
  }
}

.alert-box--info {
  .alert-bg {
    background-color: @gray-1;
  }
  .alert-box__content, .tf-icon {
    color: @gray-7;
  }
}
</style>
