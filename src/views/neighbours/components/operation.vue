<template>
  <div class="activity-footer">
    <div class="operation-container">
      <div class="operation-left">
        <div class="operation-item" @click="share">
          <img class="operation-icon" src="@/assets/neighbours/share.png" />
          <span class="operation-text">分享</span>
        </div>
        <!-- 任务 -->
        <template v-if="articleType == 4">
          <div class="operation-item" @click="goQuiz()">
            <img
              class="operation-icon"
              src="@/assets/neighbours/question.png"
            />
            <span class="operation-text">{{
              item.question_num | numberText("提问")
            }}</span>
          </div>
        </template>
        <template v-else>
          <div class="operation-item" @click="goDetails">
            <img class="operation-icon" src="@/assets/neighbours/comment.png" />
            <span class="operation-text">{{
              item.comments | numberText("评论")
            }}</span>
          </div>
          <div class="operation-item" @click="thumbsUp(item)">
            <img
              v-if="item.is_thumbsup"
              class="operation-icon"
              src="@/assets/neighbours/dianzan.png"
            />
            <img
              v-else
              class="operation-icon"
              src="@/assets/neighbours/weidianzan.png"
            />
            <span class="operation-text">{{
              item.thumbsups | numberText("点赞")
            }}</span>
          </div>
        </template>
      </div>
      <more-btn
        :item="item"
        :type="articleType"
        @delete="deleteArticle"
      ></more-btn>
    </div>
    <tf-share
      :class="{ 'ios-share': systemType === 'ios' }"
      :share-show="showShare"
      :share-obj="shareObj"
      @closeSwal="onSelect"
    ></tf-share>
  </div>
</template>

<script>
import { thumbsUp, deleteArticle } from '@/api/neighbours'
import { downloadPic } from '@/utils/util'
import tfShare from '@/components/tf-share'
import MoreBtn from './moreBtn'
export default {
  components: {
    tfShare,
    MoreBtn
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    articleType: {
      default: ''
    }
  },
  data () {
    return {
      shareObj: {},
      systemType: api.systemType || '',
      showShare: false
    }
  },
  methods: {
    // 帖子操作
    onPostOperation () {
      this.postMoreShow = !this.postMoreShow
    },
    // 关闭更多操作
    closeOperation () {
      this.postMoreShow = false
    },
    // 分享
    share () {
      this.downloadSharePic(this.item)
      this.showShare = true
    },
    // 保存分享图片
    downloadSharePic (item) {
      const { article_type, id, share_img } = item
      const urlName = 'detail_' + article_type + '_' + id
      downloadPic(share_img, urlName)
        .then(data => {
          this.sendShareParam(item, data)
        })
        .catch(() => {
          this.sendShareParam(item, '')
        })
    },
    // 设置分享参数
    sendShareParam (data, img) {
      const content =
        data.article_type == 3 || this.article_type == 3
          ? data.content
          : data.title
      this.shareObj = {
        title: content,
        description: content,
        pyqTitle: content,
        thumb: img ? 'fs://' + img + '.png' : '',
        contentUrl:
          'http://live.tosolomo.com/wap/#/neighbours?articleType=' +
          data.article_type +
          '&id=' +
          data.id
      }
    },
    // 点赞
    thumbsUp (item) {
      // 判断是否点过赞，点过赞无法取消
      if (item.is_thumbsup) {
        return
      }
      thumbsUp({
        id: item.id,
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
    // 删除帖子
    deleteArticle () {
      deleteArticle({
        id: this.item.id
      }).then(res => {
        this.$emit('delete')
        this.$toast.success('删除成功')
        this.mtjEvent({
          eventId: 44
        })
      })
    },
    // 跳转到任务提问
    goQuiz () {
      this.$router.push({
        name: 'operateQuiz',
        query: {
          id: this.item.id
        }
      })
    },
    goDetails () {
      this.$router.push({
        path: '/pages/neighbours/details',
        query: {
          articleType: this.articleType,
          id: this.item.id
        }
      })
    },
    onSelect (data) {
      this.showShare = data == 1
    }
  },
  filters: {
    numberText (value, t) {
      let text = t
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
.activity-footer {
  margin-top: 6px;
  padding: 26px 30px;
  .operation-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .operation-left {
      display: flex;
    }
    .operation-item {
      display: flex;
      align-items: center;
      width: 156px;
    }
    .operation-icon {
      width: 36px;
      height: 36px;
      font-size: 36px;
      line-height: 1;
      color: #8F8F94;
    }
    .operation-text {
      margin-left: 10px;
      font-size: 24px;
      color: #8f8f94;
    }
  }
}
.like-active::before {
  color: @orange-dark;
}
</style>
