<template>
  <div>
    <div class="comment-box">
      <span class="tf-icon tf-icon-like"></span>
      <van-field placeholder="写评论" @click="showPopup" />
    </div>
    <van-popup v-model="show" position="bottom">
      <div class="comment-popup">
        <div class="comment-popup-left">
          <van-field
            type="textarea"
            rows="3"
            maxlength="100"
            show-word-limit
            v-model="content"
            placeholder="写评论"
          />
          <div v-if="images" class="comment-image-box">
            <img class="comment-image" :src="images" />
          </div>
        </div>
        <div class="comment-popup-right">
          <van-uploader :max-count="1">
            <span class="tf-icon tf-icon-image"></span>
          </van-uploader>
          <div class="send-btn" :class="{'tf-text-primary': content}" @click="addComment">发送</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Field, Popup, Uploader } from 'vant'
import { addComment } from '@/api/neighbours'
export default {
  components: {
    [Field.name]: Field,
    [Uploader.name]: Uploader,
    [Popup.name]: Popup
  },
  props: {
    value: {
      type: [Boolean, Number],
      default: false
    }
  },
  data () {
    return {
      content: '',
      show: this.value,
      images: ''
    }
  },
  methods: {
    showPopup () {
      this.show = true
    },
    addComment () {
      if (!this.content) {
        return
      }
      addComment().then(res => {

      })
    }
  },
  watch: {
    show (value) {
      this.$emit('input', value)
    },
    value (value) {
      this.show = value
    }
  }
}
</script>

<style lang="less" scoped>
.comment-box {
  position: fixed;
  left: 0;
  bottom: 0;
  @flex();
  width: 100%;
  height: 98px;
  padding: 15px 30px;
  background: #fff;
  box-shadow: 0px 1px 0px 0px @gray-2;
  .tf-icon-like {
    font-size: 44px;
    margin-right: 30px;
  }
  /deep/ .van-field {
    border-radius: 4px;
    background: @background-color;
    .van-field__body {
      height: 48px;
    }
  }
}
.comment-popup {
  @flex();
  padding: 30px;
  .comment-image-box {
    margin-top: 20px;
    line-height: 1;
    .comment-image {
      width: 114px;
      height: 114px;
    }
  }
  &-left {
    flex: 1;
    background: @background-color;
    border-radius: 4px;
    padding: 20px;
    /deep/ .van-cell {
      background: @background-color;
      padding: 0;
    }
  }
  &-right {
    @flex-column();
    justify-content: flex-end;
    width: 48px;
    text-align: center;
    margin-left: 20px;
    .tf-icon-image {
      font-size: 44px;
      color: #383838;
    }
    .send-btn {
      color: @gray-7;
      font-size: 24px;
    }
  }
}
</style>
