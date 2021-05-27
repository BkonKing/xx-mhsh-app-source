<template>
  <div class="comment-container">
    <div class="comment-box">
      <span v-if="thumbsupshow" class="like-thumbsup" :class="{'like-active': thumbsupStatus}" @click="thumbsup"></span>
      <van-field placeholder="写评论" @click="showPopup" />
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
            :placeholder="reply_nickname ? `回复${reply_nickname}：` : '写评论'"
          />
          <div v-if="images" class="comment-image-box">
            <img class="comment-image" :src="images" />
          </div>
        </div>
        <div class="comment-popup-right">
          <van-uploader :after-read="afterRead" :max-count="1">
            <span class="tf-icon tf-icon-tupian"></span>
          </van-uploader>
          <div v-preventReClick class="send-btn" :class="{'tf-text-orange': content}" @click="addComment">发送</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Field, Popup, Uploader, Toast } from 'vant'
import { addComment } from '@/api/neighbours'
import { uImages } from '@/api/user'
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
    },
    articleId: {
      type: String,
      default: ''
    },
    parentId: {
      type: [String, Number],
      default: ''
    },
    thumbsupStatus: {
      type: [Boolean, Number],
      default: false
    },
    thumbsupshow: {
      type: Boolean,
      default: false
    },
    reply_nickname: {
      type: String,
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
    thumbsup () {
      this.$emit('thumbsup')
    },
    /* 新增评论 */
    addComment () {
      if (!this.content) {
        return
      }
      const params = {
        article_id: this.articleId,
        content: this.content,
        images: this.images,
        parent_id: this.parentId
      }
      if (this.reply_nickname) {
        params.reply_nickname = this.reply_nickname
      }
      addComment(params).then(res => {
        this.content = ''
        this.images = ''
        this.$emit('commentSuccess', res.data)
      })
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
  bottom: 0;
  @flex();
  align-items: center;
  width: 100%;
  padding: 15px 30px;
  margin-bottom: env(safe-area-inset-bottom);
  margin-bottom: constant(safe-area-inset-bottom);
  background: #fff;
  border-top: 2px solid @gray-2;
  .like-thumbsup {
    margin-right: 30px;
    &::before {
      width: 44px;
      height: 44px;
    }
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
    justify-content: space-between;
    width: 48px;
    text-align: center;
    margin-left: 20px;
    .tf-icon-tupian {
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
