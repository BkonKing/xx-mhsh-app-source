<template>
  <div class="tf-bg">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="tf-main-container">
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
      <refreshList class="reply-list" :list.sync="replyList" @load="onLoad">
        <template v-slot="{item}">
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
          <div class="reply-cell-content__text" @click="operate">
            <span class="tf-text" v-if="item.reply">
              回复<span class="tf-text-blue">@{{item.reply}}</span>：
            </span>
            {{item.content}}
          </div>
        </template>
      </refreshList>
    </div>
    <more-popup
      :moreShow.sync="moreShow"
      :comment="!oneself"
      :complain="!oneself && category == 2"
      :deleteProp="oneself"
      @comment="comment"
    ></more-popup>
    <comment ref="comment" v-model="show" :thumbsupshow="false" @thumbsup="$emit('thumbsup')"></comment>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import UserInfo from '@/components/user-info/index.vue'
import { thumbsUp, getCommentList } from '@/api/neighbours'
import morePopup from './components/morePopup'
import comment from './components/comment'
export default {
  components: {
    [NavBar.name]: NavBar,
    refreshList,
    UserInfo,
    morePopup,
    comment
  },
  data () {
    return {
      title: '3条回复',
      category: '',
      articleId: '',
      replyInfo: '',
      replyList: [],
      moreShow: false,
      show: false,
      oneself: false
    }
  },
  created () {
    this.category = this.$route.query.category
    this.articleId = this.$route.query.articleId
    this.replyInfo = JSON.parse(this.$route.query.data)
    this.getCommentList()
  },
  methods: {
    onLoad () {},
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
        parentId: this.replyInfo.id
      }).then((res) => {
        this.replyList = res.data
      })
    },
    operate () {
      this.moreShow = true
    },
    comment () {
      this.moreShow = false
      this.show = true
    }
  }
}
</script>

<style lang='less' scoped>
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
