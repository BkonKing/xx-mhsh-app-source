<template>
  <div class="tf-bg-white reply-container" :class="{'gray': grayTheme}">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell class="reply-cell" v-for="cell in list" :key="cell.id">
        <userInfo :avatar="cell.avatar || ''" :name="cell.account" :time="cell.ctime" size="m">
          <template v-if="!grayTheme" v-slot:right>
            <span class="thumbsups-number">{{cell.thumbsups}}</span>
            <span
              class="tf-icon tf-icon-like"
              :class="{'like-active': cell.thumbsupStatus}"
              @click="thumbsUp(cell)"
            ></span>
          </template>
        </userInfo>
        <div class="reply-cell-content">
          <div class="reply-cell-content__text" @click="operate">{{cell.content}}</div>
          <div v-if="cell.images && cell.images.length > 0" class="reply-cell-content__img-box">
            <img class="reply-cell-content__img" :src="cell.images[0]" />
          </div>
          <div
            v-if="cell.child && cell.child.length"
            class="reply-cell-content__reply"
            @click="goReply(cell)"
          >
            <div
              class="reply-cell-content__reply__text van-multi-ellipsis--l3"
              v-for="(item, i) in cell.child"
              :key="item.id"
              v-show="i < 2"
            >
              <span style="color: #222;">{{item.name}}</span>：
              <span>
                {{item.content}}
                <span
                  class="tf-text-blue"
                  v-if="item.images"
                  @click="lookImg(item.images)"
                >
                  <span class="tf-icon tf-icon-image"></span>查看图片
                </span>
              </span>
            </div>
            <div v-if="cell.child.length > 2" class="more-btn">
              共{{cell.child.length}}条回复
              <span class="tf-icon tf-icon-right"></span>
            </div>
          </div>
        </div>
      </van-cell>
    </van-list>
    <more-popup
      :moreShow.sync="moreShow"
      :comment="!oneself"
      :complain="!oneself && category == 2"
      :deleteProp="oneself"
      @comment="comment"
    ></more-popup>
    <div class="comment-box">
      <span class="tf-icon tf-icon-like"></span>
      <van-field placeholder="写评论" @click="showPopup" />
    </div>
    <comment
      ref="comment"
      v-model="show"
      :thumbsupStatus="thumbsupStatus"
      @thumbsup="$emit('thumbsup')"
    ></comment>
  </div>
</template>

<script>
import { List, Cell, ImagePreview, Field } from 'vant'
import UserInfo from '@/components/user-info/index.vue'
import comment from './comment'
import morePopup from './morePopup'
import { thumbsUp, getCommentList } from '@/api/neighbours'

export default {
  props: {
    grayTheme: {
      type: Boolean,
      default: false
    },
    category: {
      type: [String, Number],
      default: ''
    },
    thumbsupStatus: {
      type: [Boolean, Number],
      default: false
    },
    articleId: {
      type: String,
      default: ''
    },
    parentId: {
      type: String,
      default: ''
    }
  },
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [ImagePreview.name]: ImagePreview,
    [Field.name]: Field,
    UserInfo,
    morePopup,
    comment
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      moreShow: false,
      oneself: false,
      show: false,
      path: ''
    }
  },
  created () {
    this.path = this.$route.path
    this.getCommentList()
  },
  methods: {
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 20000)
    },
    goReply (data) {
      if (this.path.indexOf('reply') === -1) {
        const params = JSON.parse(JSON.stringify(data))
        delete params.child
        this.$router.push({
          path: '/pages/neighbours/reply',
          query: {
            category: this.category,
            articleId: this.articleId,
            data: JSON.stringify(params)
          }
        })
      }
    },
    lookImg (images) {
      ImagePreview({
        images,
        closeable: true
      })
    },
    operate () {
      this.moreShow = true
    },
    comment () {
      this.show = true
    },
    showPopup () {
      this.show = true
    },
    thumbsUp (item) {
      // 判断是否点过赞，点过赞无法取消
      if (item.thumbsupStatus) {
        return
      }
      thumbsUp({
        id: item.id,
        t_type: 1
      }).then((res) => {
        // 点赞图标点亮
        item.thumbsups++
        item.thumbsupStatus = 1
      })
    },
    getCommentList () {
      getCommentList({
        articleId: this.articleId,
        parentId: this.parentId
      }).then((res) => {
        this.list = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.reply-container {
  padding: 0 30px;
  .thumbsups-number {
    font-size: 24px;
    color: @gray-7;
  }
  .tf-icon-like {
    font-size: 36px;
    margin-left: 10px;
    color: #8f8f94;
  }
  .like-active::before {
    color: @orange-dark;
  }
  .reply-cell {
    padding: 30px 0;
    .reply-cell-content {
      padding-bottom: 30px;
      margin-left: 84px;
      margin-top: 30px;
      border-bottom: 1px solid @divider-color;
      &__text {
        margin-top: 30px;
        font-size: 26px;
        line-height: 1.8;
      }
      &__img-box {
        margin-top: 30px;
      }
      &__img {
        width: 203px;
        height: 203px;
      }
      &__reply {
        margin-top: 30px;
        padding: 30px 20px 20px;
        background: @background-color;
        &__text {
          font-size: 24px;
          color: #666;
          margin-bottom: 10px;
          line-height: 1.8;
        }
      }
    }
  }
}
.gray {
  background: @background-color;
  padding: 20px;
  .reply-cell {
    padding: 30px 20px;
    margin-bottom: 30px;
    border-radius: 10px;
    .reply-cell-content {
      padding-bottom: 0;
      border-bottom: none;
    }
  }
}
.more-btn {
  font-size: 24px;
  color: @blue-dark;
}
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
</style>
