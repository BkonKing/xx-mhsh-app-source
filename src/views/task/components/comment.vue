<template>
  <div class="comment-container">
    <div v-if="replyType == 'quiz'" class="comment-box">
      <van-field placeholder="我要提问" @click="showPopup" />
    </div>
    <van-popup v-model="show" position="bottom">
      <div class="comment-popup">
        <div class="comment-popup-left">
          <van-field
            ref="input"
            type="textarea"
            rows="3"
            maxlength="100"
            show-word-limit
            v-model="content"
            :placeholder="'回复TA'"
          />
        </div>
        <div class="comment-popup-right">
          <div v-preventReClick class="send-btn" :class="{'able-send': content}" @click="submit">发送</div>
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
      images: ''
    }
  },
  methods: {
    /* 图片上传 */
    afterRead (file) {
      const formData = new FormData()
      formData.append('imgFile', file.file)
      uImages(formData)
        .then((res) => {
          this.images = res.data
        })
        .catch((message) => {
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
      if (this.replyType === 'quiz') {
        submitQuiz({ content: this.content, linli_task_id: this.parentId }).then(res => {
          this.initData()
          this.$emit('quizCall', res.data)
        })
      } else if (this.replyType === 'reply') {
        replyQuiz({ content: this.content, question_id: this.parentId }).then(res => {
          this.initData()
          this.$emit('quizCall', res.data)
        })
      }
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
  border: 1PX solid #EEEEEE;
  margin-bottom: env(safe-area-inset-bottom);
  margin-bottom: constant(safe-area-inset-bottom);
  background: #fff;
  /deep/ .van-field {
    height: 72px;
    background: #F7F7F7;
    border-radius: 36px;
    padding: 20px 30px;
    background: #F7F7F7;
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
    background: #F7F7F7;
    border-radius: 10px;
    padding: 20px 30px;
    /deep/ .van-cell {
      background: #F7F7F7;
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
      background: #CCCCCC;
      &.able-send {
        background-color: #FF6555;
      }
    }
  }
}
// .like-active::before {
//   color: @orange-dark;
// }
</style>
