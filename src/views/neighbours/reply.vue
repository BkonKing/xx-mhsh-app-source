<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      :title="`${replyNum}条回复`"
      :fixed="true"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <van-pull-refresh
      class="tf-body-container"
      success-text="刷新成功"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <div class="reply-cell-content">
        <userInfo
          :avatar="replyInfo.avatar"
          :name="replyInfo.nickname"
          :time="replyInfo.ctime"
          size="m"
        >
          <template v-slot:right>
            <span class="thumbsups-number">{{
              replyInfo.thumbsups | numberText
            }}</span>
            <span
              class="tf-icon tf-icon-zan"
              :class="{ 'like-active': replyInfo.is_thumbsup }"
              @click.stop="thumbsUp(replyInfo)"
            ></span>
          </template>
        </userInfo>
        <div class="reply-cell-content__text">
          {{ replyInfo.content }}
        </div>
        <div
          v-if="replyInfo.images && replyInfo.images.length > 0"
          class="reply-cell-content__img-box"
        >
          <img class="reply-cell-content__img" :src="replyInfo.images[0]" />
        </div>
      </div>
      <van-list
        class="reply-list"
        v-model="loading"
        :finished="finished"
        @load="onLoad"
      >
        <van-cell
          class="reply-cell"
          v-for="(item, i) in replyList"
          :key="i"
          @click="operate(item, i)"
        >
          <userInfo
            class="user-info"
            :avatar="item.avatar"
            :name="item.nickname"
            :time="item.ctime"
            size="m"
          >
            <template v-slot:right>
              <span class="thumbsups-number">{{ item.thumbsups }}</span>
              <span
                class="tf-icon tf-icon-zan"
                :class="{ 'like-active': item.is_thumbsup }"
                @click.stop="thumbsUp(item)"
              ></span>
            </template>
          </userInfo>
          <div
            class="reply-cell-content__text"
            :class="{ 'no-border-bottom': replyList.length === i + 1 }"
          >
            <span class="tf-text" v-if="item.reply_nickname">
              回复
              <span class="tf-text-blue">@{{ item.reply_nickname }}</span
              >：
            </span>
            {{ item.content }}
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <more-popup
      v-model="moreShow"
      :comment="true"
      :complain="!oneself"
      :deleteProp="oneself"
      :complainInfo="active"
      :complainType="3"
      @comment="comment"
      @delete="deleteComment"
    ></more-popup>
    <comment
      ref="comment"
      v-model="commentShow"
      :articleId="articleId"
      :parentId="id"
      :thumbsupshow="false"
      :reply_nickname="reply_nickname"
      @commentSuccess="commentSuccess"
    ></comment>
  </div>
</template>

<script>
import { NavBar, List, Cell, PullRefresh, Toast } from 'vant'
import UserInfo from '@/components/user-info/index.vue'
import {
  thumbsUp,
  getCommentList,
  getCommentInfo,
  deleteComment
} from '@/api/neighbours'
import morePopup from './components/morePopup'
import comment from './components/comment'
import { mapGetters } from 'vuex'
export default {
  components: {
    [NavBar.name]: NavBar,
    [List.name]: List,
    [Cell.name]: Cell,
    [PullRefresh.name]: PullRefresh,
    UserInfo,
    morePopup,
    comment
  },
  data () {
    return {
      replyNum: 1,
      id: '',
      parentId: '',
      uid: '',
      category: '',
      articleId: '',
      replyInfo: {},
      replyList: [],
      isLoading: false,
      loading: false,
      finished: false,
      isEndNum: false,
      moreShow: false,
      commentShow: false,
      active: {},
      oneself: 0,
      reply_nickname: '', // 回复人昵称
      isMine: 0,
      pages: 1
    }
  },
  created () {
    const { category, articleId, id, isMine } = this.$route.query
    this.category = category
    this.articleId = articleId
    this.id = id
    this.isMine = isMine
    this.getCommentInfo()
    // this.getCommentList()
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
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
    /* 获取评论详情 */
    getCommentInfo () {
      getCommentInfo({
        id: this.id
      }).then((res) => {
        this.replyInfo = res.data
        this.replyNum = parseInt(res.data.reply_num)
      })
    },
    /* 长列表加载 */
    onLoad () {
      if (!this.isEndNum) {
        this.getCommentList()
      } else {
        this.finished = true
      }
    },
    /* 删除评论 */
    deleteComment () {
      deleteComment({
        id: this.currentId
      }).then((res) => {
        this.replyList.splice(this.index, 1)
        Toast.success('删除成功')
        this.replyNum--
        this.moreShow = false
      })
    },
    /* 获取回复列表 */
    getCommentList () {
      getCommentList({
        articleId: this.articleId,
        parentId: this.id,
        pages: this.pages
      }).then(({ data }) => {
        this.isLoading = false
        if (data && data.length > 0) {
          this.replyList.push(...data)
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
    /* 下拉刷新 */
    onRefresh () {
      this.pages = 1
      this.replyList = []
      this.getCommentInfo()
      this.getCommentList()
    },
    /* 打开操作框 */
    operate (item, i) {
      const { id, uid, nickname, is_mine } = item
      this.active = item
      this.reply_nickname = nickname || ''
      this.uid = uid
      this.currentId = id
      this.index = i
      this.oneself = is_mine
      this.moreShow = true
    },
    /* 操作框回复回调打开评论框 */
    comment () {
      // this.moreShow = false
      this.commentShow = true
    },
    /* 评论成功回调 */
    commentSuccess (data) {
      this.replyNum++
      this.commentShow = false
      if (this.moreShow) {
        // this.replyList.unshift(data)
        this.moreShow = false
      } else {
        // this.replyList.unshift(data)
      }
      Toast.success('评论成功')
      this.mtjEvent({
        eventId: 41
      })
    }
  },
  watch: {
    moreShow (value) {
      if (!value) {
        this.reply_nickname = ''
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
.tf-body-container {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  /deep/ .van-pull-refresh__track {
    @flex-column();
  }
  /deep/ .van-list__finished-text {
    padding: 20px 0;
  }
}
.reply-cell-content {
  padding: 30px;
  margin-bottom: 30px;
  background: #fff;
  &__text {
    margin-top: 30px;
    margin-left: 86px;
    font-size: 26px;
    line-height: 1.8;
  }
  &__img-box {
    margin-top: 30px;
    padding-left: 86px;
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
.reply-list {
  flex: 1;
  background: #fff;
  height: auto !important;
  padding-bottom: 100px;
  .user-info {
    padding-top: 20px;
  }
  .reply-cell-content__text {
    padding-bottom: 30px;
    border-bottom: 1px solid #f0f0f0;
  }
  .no-border-bottom {
    border-bottom: none !important;
  }
}
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
</style>
