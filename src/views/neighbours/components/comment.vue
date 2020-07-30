<template>
  <div>
    <div class="comment-box">
      <span class="tf-icon tf-icon-like"></span>
      <van-field v-model="value" placeholder="写评论" @click="showPopup" />
    </div>
    <van-popup v-model="show" position="bottom">
      <div class="comment-popup">
        <div class="comment-popup-left">
          <van-field
            type="textarea"
            autosize
            maxlength="300"
            show-word-limit
            v-model="value"
            placeholder="写评论"
          />
          <div class="comment-image-box">
            <img class="comment-image" src="/src/assets/app-icon.png">
          </div>
        </div>
        <div class="comment-popup-right">
          <span class="tf-icon tf-icon-image"></span>
          <div class="send-btn">发送</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Field, Popup } from 'vant'
export default {
  components: {
    [Field.name]: Field,
    [Popup.name]: Popup
  },
  data () {
    return {
      value: '',
      show: false
    }
  },
  methods: {
    showPopup () {
      this.show = true
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
