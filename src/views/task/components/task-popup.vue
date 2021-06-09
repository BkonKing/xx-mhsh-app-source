<template>
  <div>
    <van-popup v-model="popupShow">
      <div class="popup-header">
        {{ titName }}
        <div @click="close" class="popup-close">
          <img src="@/assets/img/task_13.png" />
        </div>
      </div>
      <div class="sub-tit" v-if="subTitName">{{ subTitName }}</div>
      <slot name="content"></slot>
    </van-popup>
  </div>
</template>

<script>
import {
  Popup
} from 'vant'
export default {
  components: {
    [Popup.name]: Popup
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    titName: {
      type: String,
      default: ''
    },
    subTitName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      popupShow: this.value
    }
  },
  created () {
  },
  methods: {
    close () {
      this.popupShow = false
    }
  },
  watch: {
    value (val) {
      this.popupShow = val
    },
    popupShow (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-popup {
  border-radius: 10px;
  width: 560px;
  font-size: 24px;
  color: #000000;
  .popup-cont {
    padding: 0 30px 30px;
    margin-top: 10px;
    .form-label {
      height: 82px;
      line-height: 82px;
      span {
        color: #FF6555;
      }
    }
  }
  .task-btn {
    width: 500px;
    border-radius: 10px;
  }
}
.popup-header {
  height: 106px;
  line-height: 106px;
  text-align: center;
  font-size: 28px;
  position: relative;
  z-index: 9;
  .popup-close {
    padding: 10px;
    position: absolute;
    right: 20px;
    top: 50%;
    margin-top: -25px;
    display: flex;
    img {
      width: 30px;
      height: 30px;
    }
  }
}
.sub-tit {
  width: 500px;
  height: 64px;
  background: #FFEDEB;
  border-radius: 10px;
  margin: 0 auto;
  text-align: center;
  line-height: 64px;
  color: #FF6555;
}
</style>
