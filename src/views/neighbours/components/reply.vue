<template>
  <div class="reply-container" :class="{ gray: grayTheme }">
    <van-list
      class="reply-list"
      v-model="loading"
      :finished="finished"
      @load="onLoad"
    >
      <van-cell
        class="reply-cell"
        v-for="(cell, i) in list"
        :key="cell.id"
        @click.stop="operate(cell, i)"
      >
        <userInfo
          :avatar="cell.avatar"
          :name="cell.nickname"
          :time="cell.ctime"
          size="m"
        >
          <template v-if="!grayTheme" v-slot:right>
            <span class="thumbsups-number">{{
              cell.thumbsups | numberText
            }}</span>
            <span
              class="tf-icon tf-icon-zan"
              :class="{ 'like-active': cell.is_thumbsup }"
              @click.stop="thumbsUp(cell)"
            ></span>
          </template>
        </userInfo>
        <div class="reply-cell-content" :class="{'no-border-bottom': list.length === i + 1}">
          <div class="reply-cell-content__text">{{ cell.content }}</div>
          <div
            v-if="cell.images && cell.images.length > 0"
            class="reply-cell-content__img-box"
          >
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
              <span style="color: #222;">{{ item.nickname }}</span
              >：
              <span>
                {{ item.content }}
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
              共{{ cell.reply_num }}条回复
              <span class="tf-icon tf-icon-right"></span>
            </div>
          </div>
        </div>
      </van-cell>
    </van-list>
    <div class="no-comments" v-if="list.length === 0 && finished">暂无评论</div>
    <more-popup
      v-model="moreShow"
      :comment="true"
      :complain="!oneself"
      :complainType="2"
      :complainInfo="active"
      :deleteProp="oneself"
      @comment="comment"
      @delete="deleteComment"
    ></more-popup>
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
import { List, Cell, Field, Toast } from 'vant'
import UserInfo from '@/components/user-info/index.vue'
import comment from './comment'
import morePopup from './morePopup'
import { thumbsUp, getCommentList, deleteComment } from '@/api/neighbours'
import { mapGetters } from 'vuex'
import { imagePreview } from '@/utils/util'

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
    },
    isMine: {
      type: [Boolean, Number],
      default: 0
    }
  },
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
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
      isReply: false,
      path: '',
      parentId: '',
      uid: '',
      oneself: false,
      active: {},
      index: undefined, // 点击操作框的评论数据
      pages: 1
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
            id: data.id,
            isMine: this.isMine
          }
        })
      }
    },
    /* 查看图片 */
    lookImg (images) {
      imagePreview({
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
      this.isReply = true
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
        this.mtjEvent({
          eventId: 40
        })
      })
    },
    /* 删除评论 */
    deleteComment () {
      deleteComment({
        id: this.parentId
      }).then((res) => {
        this.list.splice(this.index, 1)
        Toast.success('删除成功')
        this.moreShow = false
      })
    },
    /* 获取回复列表 */
    getCommentList () {
      getCommentList({
        articleId: this.articleId,
        parentId: this.parentId,
        pages: this.pages
      }).then(({ data }) => {
        if (data && data.length > 0) {
          this.list.push(...data)
          if (data.length >= 5) {
            this.pages++
            this.isEndNum = 0
          } else {
            this.isEndNum = 1
          }
        } else {
          this.finished = true
        }
        this.loading = false
      })
    },
    /* 评论成功回调 */
    commentSuccess (data) {
      this.commentShow = false
      if (this.isReply) {
        // this.list[this.index].child.unshift(data)
        this.moreShow = false
      } else {
        // this.list.unshift(data)
        // console.table(this.list)
      }
      Toast.success('评论成功')
      this.mtjEvent({
        eventId: 41
      })
    },
    /* 刷新回复列表 */
    reload () {
      this.list = []
      this.pages = 1
      this.parentId = ''
      this.getCommentList()
    }
  },
  watch: {
    moreShow (value) {
      if (!value) {
        this.parentId = ''
      }
    },
    commentShow (value) {
      if (!value) {
        this.isReply = false
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
  padding-bottom: 100px;
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
    padding: 30px;
    .reply-cell-content {
      padding-bottom: 30px;
      margin-left: 84px;
      margin-top: 30px;
      border-bottom: 1px solid @divider-color;
      &__text {
        margin-top: 30px;
        font-size: 26px;
        line-height: 1.8;
        word-break: break-all;
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
    .no-border-bottom {
      border-bottom: none !important;
    }
  }
  /deep/ .van-list__finished-text {
    padding: 20px 0;
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
.no-comments {
  font-size: 26px;
  color: #8f8f94;
  text-align: center;
  margin: 10px 0 30px;
}
</style>
