<template>
  <div>
    <van-popup v-model="isShow">
      <div class="model-block">
        <div v-if="nameShow" class="model-name">{{ modelName }}</div>
        <div v-if="titShow" class="model-tit">{{ modelTit }}</div>
        <div class="model-subtit">提示</div>
        <div class="model-btn tf-row-space-between">
          <div class="cancel-btn">否</div>
          <div class="sure-btn">是</div>
        </div>
      </div>
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
    modelName: {
      type: String,
      default: '提示'
    },
    nameShow: {
      type: Boolean,
      default: true
    },
    modelTit: {
      type: String,
      default: ''
    },
    titShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShow: this.value
    }
  },
  created () {
    console.log(21212)
  },
  methods: {

  },
  watch: {
    value (val) {
      this.isShow = val
    },
    isShow (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-popup {
  border-radius: 10px;
}
.model-block {
  width: 560px;
  @flex-column();
  font-size: 30px;
  color: #333333;
  .model-name {
    font-weight: 500;
    line-height: 36px;
    padding: 26px 0;
    text-align: center;
  }
  .model-tit {

  }
  .model-btn {
    height: 88px;
    width: 480px;
    margin: 0 auto 40px;
    div {
      flex: 1;
      height: 100%;
      line-height: 88px;
      text-align: center;
      width: 220px;
      border-radius: 10px;
      font-size: 28px;
    }
    .cancel-btn {
      color: #AAAAAA;
      background: #F7F7F7;
    }
    .sure-btn {
      color: #FFFFFF;
      background: #FF6555;
    }
    div:nth-child(2) {
      margin-left: 40px;
    }
  }
}
</style>
