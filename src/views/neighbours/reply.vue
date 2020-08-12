<template>
  <div class="tf-bg">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <van-pull-refresh
      class="tf-main-container"
      success-text="刷新成功"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <div class="reply-cell-content">
        <userInfo
          :avatar="replyInfo.avatar || ''"
          :name="replyInfo.account"
          :time="replyInfo.ctime"
          size="m"
        >
          <template v-slot:right>
            <span class="thumbsups-number">{{replyInfo.thumbsups}}</span>
            <span
              class="tf-icon tf-icon-like"
              :class="{'like-active': replyInfo.thumbsupStatus}"
              @click="thumbsUp(replyInfo)"
            ></span>
          </template>
        </userInfo>
        <div class="reply-cell-content__text">{{replyInfo.content}}</div>
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
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell class="reply-cell" v-for="(item, i) in replyList" :key="i">
          <userInfo
            class="user-info"
            :avatar="item.avatar || ''"
            :name="item.account"
            :time="item.ctime"
            size="m"
          >
            <template v-slot:right>
              <span class="thumbsups-number">{{item.thumbsups}}</span>
              <span
                class="tf-icon tf-icon-like"
                :class="{'like-active': item.thumbsupStatus}"
                @click="thumbsUp(item)"
              ></span>
            </template>
          </userInfo>
          <div class="reply-cell-content__text" @click="operate(item, i)">
            <span class="tf-text" v-if="item.reply">
              回复
              <span class="tf-text-blue">@{{item.reply}}</span>：
            </span>
            {{item.content}}
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <more-popup
      :moreShow.sync="moreShow"
      :comment="true"
      :complain="!oneself && category == 2"
      :deleteProp="oneself"
      @comment="comment"
    ></more-popup>
    <comment
      ref="comment"
      v-model="commentShow"
      :articleId="articleId"
      :parentId="parentId || id"
      :placeholder="placeholder"
      :thumbsupshow="false"
      @commentSuccess="commentSuccess"
    ></comment>
  </div>
</template>

<script>
import { NavBar, List, Cell, PullRefresh } from 'vant'
import UserInfo from '@/components/user-info/index.vue'
import { thumbsUp, getCommentList, getCommentInfo } from '@/api/neighbours'
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
      title: '',
      id: '',
      parentId: '',
      uid: '',
      category: '',
      articleId: '',
      replyInfo: '',
      placeholder: '',
      replyList: [],
      isLoading: false,
      loading: false,
      finished: false,
      isEndNum: false,
      moreShow: false,
      commentShow: false
    }
  },
  created () {
    const { category, articleId, id } = this.$route.query
    this.category = category
    this.articleId = articleId
    this.id = id
    this.getCommentInfo()
    // this.getCommentList()
  },
  computed: {
    ...mapGetters(['userInfo']),
    oneself () {
      return this.uid == this.userInfo.id
    }
  },
  methods: {
    /* 点赞 */
    thumbsUp (item) {
      // 判断是否点过赞，点过赞无法取消
      if (item.thumbsupStatus) {
        return
      }
      thumbsUp({
        id: item.id,
        t_type: 2
      }).then((res) => {
        // 点赞图标点亮
        item.thumbsups++
        item.thumbsupStatus = 1
      })
    },
    /* 获取评论详情 */
    getCommentInfo () {
      getCommentInfo({
        id: this.id
      }).then((res) => {
        this.replyInfo = res.data
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
    /* 获取回复列表 */
    getCommentList () {
      getCommentList({
        articleId: this.articleId,
        parentId: this.id
      }).then(({ data }) => {
        this.isLoading = false
        this.loading = false
        if (data.length > 0) {
          this.replyList.push(...data)
          this.title = data.length + '条回复'
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
    /* 下拉刷新 */
    onRefresh () {
      this.replyList = []
      this.getCommentInfo()
      this.getCommentList()
    },
    /* 打开操作框 */
    operate ({ id, uid, account }, i) {
      this.parentId = id
      this.placeholder = account ? `回复${account}` : ''
      this.uid = uid
      this.index = i
      this.moreShow = true
    },
    /* 操作框回复回调打开评论框 */
    comment () {
      // this.moreShow = false
      this.commentShow = true
    },
    /* 评论成功回调 */
    commentSuccess (data) {
      this.commentShow = false
      const info = {
        account: this.userInfo.account,
        avatar: this.userInfo.avatar,
        child: [],
        content: data.content,
        ctime: '2020-08-12 14:43:26',
        id: '123',
        images: data.images,
        thumbsups: data.thumbsups,
        uid: this.userInfo.uid
      }
      if (this.moreShow) {
        this.replyList[this.index].child.unshift(info)
        this.moreShow = false
      } else {
        this.replyList.unshift(info)
      }
    }
  },
  watch: {
    moreShow (value) {
      if (!value) {
        this.parentId = ''
        this.placeholder = ''
      }
    }
  }
}
</script>

<style lang='less' scoped>
.tf-main-container {
  overflow: auto;
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
  background: #fff;
  height: auto !important;
  .user-info {
    padding-top: 20px;
  }
  .reply-cell-content__text {
    padding-bottom: 30px;
    border-bottom: 1px solid #f0f0f0;
  }
}
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
</style>
