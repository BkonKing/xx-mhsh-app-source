<template>
  <div
    class="tf-white-bg tf-body"
    :class="[meterActive ? 'electricity-active' : 'water-active']"
  >
    <van-nav-bar
      title="水电抄表"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="house-switch">
      <div class="tf-icon tf-icon-doubleleft"></div>
      <div class="house-selected">5栋-1单元-1001</div>
      <div class="tf-icon tf-icon-doubleright"></div>
    </div>
    <div class="tf-body-container">
      <div class="meter-switch">
        <div class="meter-item water-meter" @click="meterActive = 0">
          <span class="tf-icon tf-icon-shuibiao"></span>水表
        </div>
        <div
          class="meter-item electricity-meter"
          :class="{ 'meter-active': meterActive }"
          @click="meterActive = 1"
        >
          <span class="tf-icon tf-icon-dianbiao"></span>电表
        </div>
      </div>
      <div class="meter-number-container">
        <div class="meter-number-text">
          <span class="meter-text-point"></span>
          上次表读数（11.10）
        </div>
        <div class="meter-number-input">
          <van-password-input
            :value="lastMeterNum"
            :length="meterLength"
            :mask="false"
          />
        </div>
      </div>
      <div class="meter-number-container">
        <div class="meter-number-text" style="justify-content: space-between;">
          <span class="meter-text-point">本次读表数</span
          ><span class="tf-icon tf-icon-bianxie"></span>
        </div>
        <div class="meter-number-input">
          <van-password-input
            :value="meterNum"
            :length="meterLength"
            :mask="false"
            :focused="showKeyboard"
            @focus="showKeyboard = true"
          />
        </div>
      </div>
      <div class="meter-number-container">
        <div class="meter-number-text">提供照片</div>
        <tf-uploader
          class="upload-image"
          v-model="images"
          max-count="6"
        ></tf-uploader>
      </div>
    </div>
    <div class="tf-padding">
      <van-button v-preventReClick size="large" type="danger" @click="save"
        >保存</van-button
      >
    </div>
    <van-number-keyboard
      :show="showKeyboard"
      safe-area-inset-bottom
      get-container="body"
      key="password"
      z-index="9999"
      theme="custom"
      close-button-text="完成"
      @input="handleInput"
      @delete="handleDelete"
      @blur="showKeyboard = false"
      @close="handleClose"
    />
  </div>
</template>

<script>
import { NavBar, PasswordInput, NumberKeyboard, Button } from 'vant'
import tfUploader from '@/components/tf-uploader/index'
export default {
  components: {
    [NavBar.name]: NavBar,
    [PasswordInput.name]: PasswordInput,
    [NumberKeyboard.name]: NumberKeyboard,
    [Button.name]: Button,
    tfUploader
  },
  data () {
    return {
      meterActive: 0,
      showKeyboard: false,
      lastMeterNum: '1234',
      meterNum: '1234',
      meterLength: 4,
      images: []
    }
  },
  methods: {
    handleInput (key) {
      this.meterNum = (this.meterNum + key).slice(0, this.meterLength)
    },
    handleDelete () {
      this.meterNum = this.meterNum.slice(0, this.meterNum.length - 1)
    },
    handleClose () {},
    save () {}
  }
}
</script>

<style lang="less" scoped>
.house-switch {
  @flex();
  justify-content: space-between;
  align-items: center;
  height: 98px;
  background: #eb58411a;
  padding: 0 20px;
  .tf-icon {
    color: #eb5841;
    font-size: 28px;
  }
  .house-selected {
    font-size: 30px;
    font-weight: 500;
    color: #eb5841;
  }
}
.meter-switch {
  padding: 73px 0;
  position: relative;
  .meter-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 320px;
    height: 66px;
    background: #f2f2f4;
    border-radius: 33px;
    font-size: 30px;
    font-weight: 500;
    color: #8f8f94;
    position: absolute;
    top: 40px;
  }
  .water-meter {
    left: 85px;
  }
  .electricity-meter {
    right: 85px;
  }
  .tf-icon {
    font-size: 32px;
    margin-right: 20px;
  }
}
.meter-number-container {
  padding: 0 30px;
  margin-bottom: 40px;
  .meter-number-text {
    display: flex;
    align-items: center;
    font-size: 28px;
    color: #8f8f94;
    line-height: 1;
  }
  .meter-text-point::before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #599eed;
    border-radius: 50%;
    margin-right: 10px;
  }
  .meter-number-input {
    height: 120px;
    border: 2px solid #f0f0f0;
    border-radius: 10px;
    margin-top: 30px;
    /deep/ .van-password-input {
      height: 100%;
      margin: 0;
      /deep/ .van-password-input__security {
        height: 100%;
        li {
          background: #fff;
          &::after {
            border: none;
          }
        }
      }
      /deep/ .van-password-input__item {
        font-size: 42px;
      }
    }
  }
  .upload-image {
    margin-top: 30px;
    /deep/ .van-uploader__preview-image,
    /deep/ .van-uploader__upload {
      width: 216px;
      height: 216px;
    }
  }
  .tf-icon-bianxie {
    font-size: 40px;
    line-height: 1;
    margin-top: -4px;
  }
}
.electricity-active {
  .electricity-meter {
    background: #ffb915;
    color: #fff;
    z-index: 2;
  }
  /deep/ .van-button--danger {
    background: #ffb915;
    border-color: #ffb915;
  }
  .meter-text-point::before {
    background: #ffb915;
  }
}
.water-active {
  .water-meter {
    background: #599eed;
    color: #fff;
    z-index: 2;
  }
  /deep/ .van-button--danger {
    background: #599eed;
    border-color: #599eed;
  }
}
/deep/ .van-key {
  height: 120px;
  font-size: 36px;
}
/deep/ .van-key--large {
  height: 100%;
}
/deep/ .van-popup--center {
  top: 35%;
}
</style>
