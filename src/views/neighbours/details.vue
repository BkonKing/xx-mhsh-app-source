<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="正文"
      :fixed="true"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span
          class="van-icon van-icon-ellipsis"
          @click="openArticleDialog"
        ></span>
      </template>
    </van-nav-bar>
    <van-pull-refresh
      class="tf-body-container"
      success-text="刷新成功"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <div class="tf-card">
        <div
          class="tf-card-header"
          style="border-bottom:none"
          :class="{ 'border-none': articleType == 2 || articleType == 3 }"
        >
          <userInfo
            :avatar="info.avatar"
            :name="info.nickname"
            :time="info.ctime"
          >
            <template v-if="articleType == 3" v-slot:right>
              <div class="group-tag">{{ info.category }}</div>
            </template>
          </userInfo>
        </div>
        <!-- 资讯 -->
        <template v-if="articleType == 1">
          <div class="article-title">{{ info.title }}</div>
          <div class="article-content-box">
            <div class="article-content" v-html="info.content"></div>
            <!-- 播放视屏  -->
            <videoChild
              v-if="info.video_url"
              :url="info.video_url"
              :poster="poster"
              :style="{ order: info.video_site === '1' ? -1 : 2 }"
            ></videoChild>
          </div>
          <!-- <img class="activity-image" :src="info.thumbnail" /> -->
        </template>
        <!-- 话题帖子 -->
        <template v-else-if="articleType == 3">
          <tf-alert
            v-if="info.status == 2"
            type="warning"
            content="该内容含有违规信息。"
            :showRight="false"
            :showIcon="false"
            size="sm"
          ></tf-alert>
          <div class="tf-card-content" v-html="info.content.replace(/\r\n|\n/g, '<br/>')"></div>
          <template v-if="info.images && info.images.length">
            <img
              width="33%"
              :src="info.images[0]"
              v-if="info.images.length === 1"
            />
            <tf-image-list
              v-else
              :data="info.images"
              mode="show"
            ></tf-image-list>
          </template>
        </template>
        <!-- 活动 -->
        <template v-else-if="articleType == 2">
          <div class="article-title">{{ info.title }}</div>
          <div class="activity-content">
            <div class="activity-content-box tf-text tf-mb-lg">
              <div v-html="info.content"></div>
              <!-- <img class="activity-image" :src="info.thumbnail" /> -->
              <!-- 播放视屏  -->
              <videoChild
                v-if="info.video_url"
                :url="info.video_url"
                :poster="poster"
                :style="{ order: info.video_site === '1' ? -1 : 2 }"
              ></videoChild>
            </div>
            <div class="apply-box" v-if="parseInt(info.joins) > 0">
              <div class="apply-title">
                <strong>报名人员</strong>
                <span class="tf-text-grey">({{ info.joins }}人)</span>
                <span v-if="info.is_join" class="tf-status-tag">我已报名</span>
              </div>
              <div class="apply-user">
                <template v-for="(item, i) in info.join_uids">
                  <img
                    v-if="item.avatar"
                    class="apply-user__avatar"
                    :src="item.avatar"
                    :key="i"
                  />
                  <img
                    v-else
                    class="apply-user__avatar"
                    src="@/assets/imgs/touxiang.png"
                    :key="i"
                  />
                </template>
              </div>
            </div>
            <div
              v-if="!info.is_join"
              v-preventReClick
              class="apply-btn"
              @click="joinActivity"
            >
              报名
            </div>
          </div>
        </template>
        <div class="activity-footer">
          <div
            class="tf-icon like-thumbsup"
            :class="{ 'like-active': info.is_thumbsup }"
            @click="thumbsUp(info)"
          >
            <span class="tf-text-sm">{{
              info.thumbsups | numberText("点赞")
            }}</span>
          </div>
          <div class="tf-icon tf-icon-pinglun1" @click="$refs.reply.comment()">
            <span class="tf-text-sm">{{
              info.comments | numberText("评论")
            }}</span>
          </div>
        </div>
      </div>
      <reply
        ref="reply"
        class="tf-mt-lg activity-reply"
        :is-mine="info.is_mine"
        :articleId="id"
        :articleType="articleType"
        :thumbsupStatus="info.is_thumbsup"
        @thumbsup="thumbsUp(info)"
      ></reply>
    </van-pull-refresh>
    <more-popup
      v-model="moreShow"
      :complain="!info.is_mine"
      :complainType="1"
      :complainInfo="info"
      :shield="!info.is_mine"
      :deleteProp="info.is_mine"
      :share="true"
      :share-obj="shareObj"
      @delete="deleteArticle"
    ></more-popup>
  </div>
</template>

<script>
import UserInfo from '@/components/user-info/index.vue'
import TfAlert from '@/components/tf-alert'
import reply from './components/reply'
import morePopup from './components/morePopup'
import tfImageList from '@/components/tf-image-list'
import videoChild from '@/components/videoChild/videoChild'
import { downloadPic } from '@/utils/util.js'
import {
  getActivityInfo,
  joinActivity,
  getArticleInfo,
  getPostBarInfo,
  thumbsUp,
  deleteArticle
} from '@/api/neighbours'

export default {
  components: {
    UserInfo,
    TfAlert,
    reply,
    morePopup,
    tfImageList,
    videoChild
  },
  data () {
    return {
      poster: '', // 视屏封面
      articleType: 0, // 文章类型：1资讯，2活动，3话题
      id: '',
      moreShow: false, // 更多操作弹窗
      info: {
        content: ''
      },
      isLoading: false,
      shareObj: {}
    }
  },
  created () {
    const { articleType, id } = this.$route.query
    this.articleType = articleType
    this.id = id
    this.getInfo()
  },
  methods: {
    // 下拉刷新
    onRefresh () {
      this.getInfo()
      this.$refs.reply.reload()
    },
    // 根据类型获取对应的详情
    getInfo () {
      switch (this.articleType) {
        case '1':
          this.getArticleInfo()
          break
        case '2':
          this.getActivityInfo()
          break
        case '3':
          this.getPostBarInfo()
          break
      }
    },
    // 获取资讯详情
    getArticleInfo () {
      getArticleInfo({
        id: this.id
      }).then(({ data }) => {
        this.setInfo(data, '活动')
      })
    },
    // 获取小组帖子详情
    getPostBarInfo () {
      getPostBarInfo({
        id: this.id
      })
        .then(({ data }) => {
          this.setInfo(data, '贴')
          this.info.id = this.id
        })
        .catch(({ message }) => {
          this.$toast.clear()
          this.$dialog
            .alert({
              title: message || '该贴不存在'
            })
            .then(() => {
              this.$router.go(-1)
            })
        })
    },
    // 获取活动详情
    getActivityInfo () {
      getActivityInfo({
        id: this.id
      }).then(({ data }) => {
        this.setInfo(data, '活动')
      })
    },
    // 获取完文章成功后
    setInfo (data, text) {
      if (this.goBackByNonentity(data.is_del, text)) {
        return
      }
      this.info = data
      this.isLoading = false
      this.downloadSharePic()
    },
    // 文章不存在回退
    goBackByNonentity (del, text) {
      if (del === 1) {
        this.$dialog
          .alert({
            title: `该${text}已被删除`
          })
          .then(() => {
            this.$router.go(-1)
          })
        return true
      }
    },
    // 保存分享图片
    downloadSharePic () {
      const that = this
      const urlName = 'detail_' + this.articleType + '_' + this.id
      downloadPic(this.info.share_img, urlName)
        .then(data => {
          that.sendShareParam(data)
        })
        .catch(() => {
          that.sendShareParam('')
        })
    },
    // 设置分享配置
    sendShareParam (data) {
      this.shareObj = {
        title: this.articleType == 3 ? this.info.content : this.info.title,
        description:
          this.articleType == 3 ? this.info.content : this.info.title,
        pyqTitle: this.articleType == 3 ? this.info.content : this.info.title,
        thumb: data ? 'fs://' + data + '.png' : '',
        contentUrl:
          'http://live.tosolomo.com/wap/#/neighbours?articleType=' +
          this.articleType +
          '&id=' +
          this.id
      }
    },
    // 加入活动
    joinActivity () {
      joinActivity({
        id: this.id
      }).then(res => {
        this.$toast.success('活动报名成功')
        this.getInfo()
        this.mtjEvent({
          eventId: 8
        })
      })
    },
    // 点赞
    thumbsUp (item) {
      // 判断是否点过赞，点过赞无法取消
      if (item.is_thumbsup) {
        return
      }
      thumbsUp({
        id: this.id,
        t_type: 1
      }).then(res => {
        // 点赞图标点亮
        item.thumbsups++
        item.is_thumbsup = 1
        this.mtjEvent({
          eventId: 40
        })
      })
    },
    // 打开文章操作
    openArticleDialog () {
      this.moreShow = true
    },
    // 删除帖子
    deleteArticle () {
      deleteArticle({
        id: this.id
      }).then(res => {
        this.$dialog
          .alert({
            title: '删除成功'
          })
          .then(() => {
            this.$router.go(-1)
            this.mtjEvent({
              eventId: 44
            })
          })
        this.moreShow = false
      })
    }
  },
  filters: {
    numberText (value, txt) {
      let text = txt
      if (value < 10000 && value > 0) {
        text = value
      } else if (value >= 10000) {
        text = `${Math.floor(value / 10000)}万+`
      }
      return text
    }
  },
  watch: {
    // 监听 this.$route.query
    '$route.query' (newVal) {
      this.articleType = newVal.articleType
      this.id = newVal.id
      this.getInfo()
    }
  },
  beforeRouteLeave (to, from, next) {
    this.info = {}
    this.$nextTick(() => {
      next()
    })
  }
}
</script>

<style lang="less" scoped>
/deep/ .user-info__left-box {
  .tf-space-around {
    flex: 1;
    width: 0;
    .user-info--name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.tf-body-container {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  /deep/ .van-pull-refresh__track {
    @flex-column();
  }
  .tf-icon {
    color: #8f8f94;
  }
}
.tf-image-box {
  justify-content: flex-start;
  .details-image {
    width: 200px;
    height: 200px;
    margin-right: 10px;
  }
}
.activity-footer {
  margin-top: 35px;
  @flex();
  padding: 20px 0;
  border-top: 1px solid @divider-color;
  .tf-icon {
    flex: 1;
    font-size: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    .tf-text-sm {
      margin-left: 10px;
    }
  }
}
.border-none {
  border-bottom: none;
}
.article-title {
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 34px;
  font-weight: bold;
  word-break: break-all;
}
.article-content-box {
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  border-top: 2px solid @divider-color;
}
.article-content {
  font-size: 28px;
  color: #666;
  word-break: break-all;
  /deep/ img {
    max-width: 100% !important;
  }
}
.activity-content {
  @flex-column();
  align-items: center;
  border-top: 1px solid @divider-color;
  padding-top: 30px;
  word-break: break-all;
  .activity-content-box {
    @flex-column();
    width: 100%;
  }
  /deep/ img {
    max-width: 100% !important;
  }
  .apply-box {
    width: 100%;
    background: #ffffff;
    padding: 0 20px;
    box-shadow: 0px 6px 18px 0px rgba(201, 28, 0, 0.25);
    border-radius: 4px;
    .apply-title {
      @relative();
      height: 100px;
      line-height: 100px;
      font-size: 30px;
      border-bottom: 3px solid @red;
      .tf-status-tag {
        display: flex;
        align-content: center;
        width: auto;
        top: 20px;
        padding: 0 28px;
        font-size: 30px;
        border-radius: 30px 30px 0px 30px;
        background: linear-gradient(90deg, #f9866b, #eb5841);
      }
    }
    .apply-user {
      padding: 38px 0 50px;
      display: flex;
      align-content: center;
      &__avatar {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        // background: @gray-7;
        margin-right: 10px;
      }
    }
  }
  .apply-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    background-image: linear-gradient(to bottom right, @red, @red-dark);
    border: 6px solid #ffdbd9;
    border-radius: 50%;
    margin-top: 45px;
    font-size: 30px;
    color: #fff;
  }
}
.group-tag {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  padding: 0 14px;
  text-align: center;
  font-size: 24px;
  color: #ff6555;
  background: #ffedeb;
  border-radius: 4px;
}
.activity-image {
  width: 100%;
  height: 365px;
  margin-bottom: 20px;
}
.activity-reply {
  flex: 1;
}
/deep/ .van-nav-bar__right .van-icon {
  font-size: 44px;
}
</style>
