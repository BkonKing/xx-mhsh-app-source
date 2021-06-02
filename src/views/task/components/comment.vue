<template>
  <div class="comment-container">
    <div v-if="replyType == 'quiz'" class="comment-box">
      <van-field placeholder="我要提问" @click="showPopup" />
    </div>
    <van-popup v-model="show" position="bottom" :duration="show ? 0.3 : 0">
      <div class="comment-popup">
        <div class="comment-popup-left">
          <van-field
            ref="input"
            type="textarea"
            rows="3"
            maxlength="100"
            show-word-limit
            v-model="content"
            :autosize="true"
            :placeholder="placeholder"
          />
        </div>
        <div class="comment-popup-right">
          <van-button
            :loading="isLoading"
            v-preventReClick
            class="send-btn"
            :class="{ 'able-send': content }"
            @click="submit"
            >发送</van-button
          >
        </div>
      </div>
    </van-popup>
    <van-popup class="errorPopup" v-model="isShow">
      <div class="errorinfo">
        <div class="txt">
          {{ errorInfo }}
        </div>
        <div class="btn">
          <van-button color="#ff6555" @click="close">我知道了</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Field, Popup, Toast } from 'vant'
import { submitQuiz, replyQuiz } from '@/api/task'
import { uImages } from '@/api/user'
export default {
  components: {
    [Field.name]: Field,
    [Popup.name]: Popup
  },
  props: {
    value: {
      type: [Boolean, Number],
      default: false
    },
    replyType: {
      type: [String],
      default: ''
    },
    parentId: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      content: '',
      show: this.value,
      images: '',
      isLoading: false,
      placeholder: '',
      isShow: false,
      errorInfo: ''
    }
  },
  methods: {
    // 关闭违规信息弹窗
    close () {
      this.content = ''
      this.show = false
      this.isLoading = false
      this.isShow = false
    },
    /* 图片上传 */
    afterRead (file) {
      const formData = new FormData()
      formData.append('imgFile', file.file)
      uImages(formData)
        .then(res => {
          this.images = res.data
        })
        .catch(message => {
          Toast.fail(message)
        })
    },
    showPopup () {
      this.show = true
    },
    /* 新增提问 */
    submit () {
      if (!this.content) {
        return
      }
      this.isLoading = true
      let reqAPI
      if (this.replyType === 'quiz') {
        reqAPI = submitQuiz({
          content: this.content,
          linli_task_id: this.parentId
        })
      } else if (this.replyType === 'reply') {
        reqAPI = replyQuiz({
          content: this.content,
          question_id: this.parentId
        })
      }
      reqAPI
        .then(res => {
          // 提问是否开启审核0未开启1开启
          if (+res.ask_check) {
            Toast('提交成功，审核通过后自动发布')
          } else {
            Toast('发送成功')
          }
          this.initData()
          this.isLoading = false
          this.$emit('quizCall', res.data)
        })
        .catch(res => {
          if (res.code === '444') {
            this.errorInfo = res.message
            this.isShow = true
          } else {
            if (+res.ask_check) {
              Toast('提交失败，请重试')
            } else {
              Toast('发送失败 请重试')
            }
          }
          this.isLoading = false
        })
    },
    initData () {
      this.show = false
      this.content = ''
      this.images = ''
    }
  },
  watch: {
    show (value) {
      this.$emit('input', value)
      if (value) {
        this.$nextTick(() => {
          this.$refs.input && this.$refs.input.focus()
        })
      }
    },
    value (value) {
      this.show = value
      if (value) {
        if (this.replyType === 'quiz') {
          this.placeholder = '我要提问'
        } else {
          this.placeholder = '回复TA'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment-box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 14px 20px;
  border: 1px solid #eeeeee;
  margin-bottom: env(safe-area-inset-bottom);
  margin-bottom: constant(safe-area-inset-bottom);
  background: #fff;
  /deep/ .van-field {
    height: 72px;
    background: #f7f7f7;
    border-radius: 36px;
    padding: 20px 30px;
    background: #f7f7f7;
    .van-field__body {
      height: 32px;
    }
  }
}
.comment-popup {
  @flex();
  justify-content: space-between;
  padding: 20px;
  // .comment-image-box {
  //   margin-top: 20px;
  //   line-height: 1;
  //   .comment-image {
  //     width: 114px;
  //     height: 114px;
  //   }
  // }
  &-left {
    width: 620px;
    background: #f7f7f7;
    border-radius: 10px;
    padding: 20px 30px;
    /deep/ .van-cell {
      background: #f7f7f7;
      padding: 0;
    }
  }
  &-right {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 72px;
    text-align: center;
    // margin-left: 20px;
    .send-btn {
      color: @white;
      height: 56px;
      line-height: 56px;
      font-size: 24px;
      border-radius: 10px;
      background: #cccccc;
      width: 72px;
      padding: 0;
      border: 0;
      &.able-send {
        background-color: #ff6555;
      }
    }
  }
}
// .like-active::before {
//   color: @orange-dark;
// }
.errorPopup {
  border-radius: 20px;
}
.errorinfo {
  width: 560px;
  height: 300px;
  text-align: center;
  .txt {
    padding: 50px 30px;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 48px;
  }
  .btn {
    margin-top: -20px;
  }
}
</style>
