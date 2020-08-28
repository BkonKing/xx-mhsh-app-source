<template>
  <div class="tf-bg-white reply-container" :class="{'gray': grayTheme}">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell class="reply-cell" v-for="(cell, i) in list" :key="cell.id" @click.stop="operate(cell, i)">
        <userInfo :avatar="cell.avatar" :name="cell.nickname" :time="cell.ctime" size="m">
          <template v-if="!grayTheme" v-slot:right>
            <span class="thumbsups-number">{{cell.thumbsups | numberText}}</span>
            <span
              class="tf-icon tf-icon-zan"
              :class="{'like-active': cell.is_thumbsup}"
              @click.stop="thumbsUp(cell)"
            ></span>
          </template>
        </userInfo>
        <div class="reply-cell-content">
          <div class="reply-cell-content__text">{{cell.content}}</div>
          <div v-if="cell.images && cell.images.length > 0" class="reply-cell-content__img-box">
            <img class="reply-cell-content__img" :src="cell.images[0]" />
          </div>
          <div
            v-if="parseInt(cell.reply_num) > 0"
            class="reply-cell-content__reply"
            @click.stop="goReply(cell)"
          >
            <div
              class="reply-cell-content__reply__text van-multi-ellipsis--l3"
              v-for="(item, i) in cell.child"
              :key="item.id"
              v-show="i < 2"
            >
              <span style="color: #222;">{{item.nickname}}</span>：
              <span>
                {{item.content}}
                <span
                  class="tf-text-blue"
                  v-if="item.images"
                  @click.stop="lookImg(item.images)"
                >
                  <span class="tf-icon tf-icon-tupian"></span>查看图片
                </span>
              </span>
            </div>
            <div v-if="parseInt(cell.reply_num) > 2" class="more-btn">
              共{{cell.reply_num}}条回复
              <span class="tf-icon tf-icon-right"></span>
            </div>
          </div>
        </div>
      </van-cell>
    </van-list>
    <more-popup
      :moreShow.sync="moreShow"
      :comment="true"
      :complain="!oneself && articleType == 3"
      :deleteProp="oneself"
      :complainInfo="active"
      :complainType="2"
      @comment="comment"
      @delete="deleteComment"
    ></more-popup>
    <div class="comment-box">
      <span class="tf-icon tf-icon-zan"></span>
      <van-field placeholder="写评论" @click="showPopup" />
    </div>
    <comment
      ref="comment"
      v-model="commentShow"
      :parentId="parentId"
      :articleId="articleId"
      :thumbsupStatus="thumbsupStatus"
      :thumbsupshow="true"
      @thumbsup="$emit('thumbsup')"
      @commentSuccess="commentSuccess"
    ></comment>
  </div>
</template>

<script>
import { List, Cell, ImagePreview, Field, Toast } from 'vant'
import UserInfo from '@/components/user-info/index.vue'
import comment from './comment'
import morePopup from './morePopup'
import { thumbsUp, getCommentList, deleteComment } from '@/api/neighbours'
import { mapGetters } from 'vuex'

export default {
  props: {
    grayTheme: {
      type: Boolean,
      default: false
    },
    articleType: {
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
      isEndNum: false,
      commentShow: false,
      path: '',
      parentId: '',
      uid: '',
      oneself: false,
      active: {},
      index: undefined // 点击操作框的评论数据
    }
  },
  created () {
    this.path = this.$route.path
    // this.getCommentList()
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    /* 长列表加载 */
    onLoad () {
      if (!this.isEndNum) {
        this.getCommentList()
      } else {
        this.finished = true
      }
    },
    /* 跳转到评论详情页 */
    goReply (data) {
      if (this.path.indexOf('reply') === -1) {
        this.$router.push({
          path: '/pages/neighbours/reply',
          query: {
            category: this.articleType,
            articleId: this.articleId,
            id: data.id
          }
        })
      }
    },
    /* 查看图片 */
    lookImg (images) {
      ImagePreview({
        images,
        closeable: true
      })
    },
    /* 打开操作框 */
    operate (item, i) {
      const { id, uid, is_mine } = item
      this.active = item
      // 打开操作框保存parentId，用以接下来的操作
      this.parentId = id
      this.uid = uid
      this.index = i
      this.oneself = is_mine
      this.moreShow = true
    },
    /* 操作框回复回调打开评论框 */
    comment () {
      this.commentShow = true
    },
    /* 打开评论框 */
    showPopup () {
      this.parentId = ''
      this.commentShow = true
    },
    /* 点赞 */
    thumbsUp (item) {
      // 判断是否点过赞，点过赞无法取消
      if (item.is_thumbsup) {
        return
      }
      thumbsUp({
        id: item.id,
        t_type: 2
      }).then((res) => {
        // 点赞图标点亮
        item.thumbsups++
        item.is_thumbsup = 1
      })
    },
    /* 删除评论 */
    deleteComment () {
      deleteComment({
        id: this.parentId
      }).then(res => {
        this.list.splice(this.index, 1)
        Toast.success('删除成功')
        this.moreShow = false
      })
    },
    /* 获取回复列表 */
    getCommentList () {
      getCommentList({
        articleId: this.articleId,
        parentId: this.parentId
      }).then(({ data }) => {
        this.loading = false
        if (data.length > 0) {
          this.list.push(...data)
          if (data.length >= 10) {
            this.isEndNum = 0
          } else {
            this.isEndNum = 1
          }
        } else {
          this.finished = true
        }
      })
    },
    /* 评论成功回调 */
    commentSuccess (data) {
      this.commentShow = false
      if (this.moreShow) {
        this.list[this.index].child.unshift(data)
        this.moreShow = false
      } else {
        this.list.unshift(data)
        // console.table(this.list)
      }
    },
    /* 刷新回复列表 */
    reload () {
      this.list = []
      this.parentId = ''
      this.getCommentList()
    }
  },
  watch: {
    moreShow (value) {
      if (!value) {
        this.parentId = ''
      }
    }
  },
  filters: {
    numberText (value) {
      let text = ''
      if (value < 10000 && value > 0) {
        text = value
      } else if (value >= 10000) {
        text = `${Math.floor(value / 10000)}万+`
      }
      return text
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
  .tf-icon-zan {
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
  border-top: 2px solid @gray-2;
  .tf-icon-zan {
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
