<template>
  <div>
    <div class="meter-number-container">
      <div class="meter-number-text">
        <span class="meter-text-point"></span>
        上次表读数（{{ old_record_time }}）
      </div>
      <div class="meter-number-input">
        <van-password-input
          :value="old_record"
          :length="meterLength"
          :mask="false"
        />
      </div>
    </div>
    <div class="meter-number-container">
      <div class="meter-number-text" style="justify-content: space-between;">
        <span class="meter-text-point">本次读表数</span>
        <span
          v-if="status && !editStatus"
          class="tf-icon tf-icon-bianxie"
          @click="editStatus = true"
        ></span>
      </div>
      <div class="meter-number-input">
        <van-password-input
          ref="meter"
          :class="{
            'tf-text-primary': meterError
          }"
          :value="meterNum"
          :length="meterLength"
          :mask="false"
          :focused="showKeyboard"
          @focus="focusMeter"
        />
      </div>
    </div>
    <div class="meter-number-container">
      <div class="meter-number-text">提供照片</div>
      <tf-uploader
        v-if="editStatus"
        class="upload-image"
        v-model="images"
        max-count="6"
      ></tf-uploader>
      <tf-image-list
        v-else-if="images && images.length > 0"
        class="upload-image"
        :data="images"
        :column="3"
        mode="show"
      ></tf-image-list>
      <div class="no-image" v-else>无</div>
    </div>
    <div v-if="editStatus" class="tf-padding">
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
      @close="handleConfirm"
    />
  </div>
</template>

<script>
import { PasswordInput, NumberKeyboard, Button, Dialog } from 'vant'
import tfUploader from '@/components/tf-uploader/index'
import tfImageList from '@/components/tf-image-list'
export default {
  components: {
    [PasswordInput.name]: PasswordInput,
    [NumberKeyboard.name]: NumberKeyboard,
    [Button.name]: Button,
    tfUploader,
    tfImageList
  },
  props: {
    status: {
      type: [Boolean, Number],
      default: 1
    },
    errors_digit: {
      type: Number,
      default: 100
    },
    old_record_time: {
      type: String,
      default: ''
    },
    old_record: {
      type: String,
      default: ''
    },
    record: {
      type: String,
      default: ''
    },
    pic: {
      type: [Array, String],
      default: ''
    },
    meterLength: {
      type: Number,
      default: 6
    }
  },
  data () {
    return {
      showKeyboard: false,
      editStatus: !this.status,
      meterNum: this.record || '',
      images: this.pic || []
    }
  },
  computed: {
    meterError () {
      return (
        parseInt(this.meterNum) - parseInt(this.old_record) >
        parseInt(this.errors_digit)
      )
    }
  },
  mounted () {
    this.focusMeter()
  },
  methods: {
    // 数字键盘焦点事件
    focusMeter () {
      if (this.editStatus) {
        this.showKeyboard = true
      }
    },
    // 数字键盘输入事件
    handleInput (key) {
      this.meterNum = (this.meterNum + key).slice(0, this.meterLength)
    },
    // 数字键盘删除事件
    handleDelete () {
      this.meterNum = this.meterNum.slice(0, this.meterNum.length - 1)
    },
    // 数字键盘确定事件
    handleConfirm () {
      const difference = this.meterLength - this.meterNum.length
      if (difference > 0) {
        this.meterNum = '0'.repeat(difference) + this.meterNum
      }
    },
    save () {
      if (this.meterError) {
        Dialog.confirm({
          title: '表读数有误，确定保存？'
        })
          .then(() => {
            this.emitSave()
          })
          .catch(() => {
            // on cancel
          })
      } else if (this.status) {
        Dialog.confirm({
          title: '是否覆盖之前保存过的数据？'
        })
          .then(() => {
            this.emitSave()
          })
          .catch(() => {
            // on cancel
          })
      } else {
        this.emitSave()
      }
    },
    emitSave () {
      this.$emit('save', {
        record: this.meterNum,
        pic_url: this.images
      })
    },
    switchEdit (status) {
      this.editStatus = status
    }
  },
  watch: {
    record (val) {
      this.meterNum = val
    },
    pic (val) {
      this.images = val
    },
    status (val) {
      this.editStatus = !val
    }
  }
}
</script>

<style lang="less" scoped>
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
.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 120px;
  margin-top: 30px;
  background: #f2f2f4;
  border-radius: 10px;
  font-size: 28px;
  color: #8f8f94;
}
</style>
