<template>
  <div class="activity-footer">
    <div class="operation-container">
      <div class="operation-left">
        <div class="operation-item" @click="share">
          <img class="operation-icon" src="@/assets/neighbours/share.png" />
          <span class="operation-text">分享</span>
        </div>
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
      </div>
      <div class="more-container">
        <img
          class="operation-icon"
          src="@/assets/neighbours/more.png"
          @click="onPostOperation"
        />
        <div
          v-if="postMoreShow"
          v-click-out-side="closeOperation"
          class="more-popup"
        >
          <template v-if="status">
            <span class="more-btn" @click="deleteArticle">删除</span>
          </template>
          <template v-else>
            <span class="more-btn" @click="shieldShow = true">屏蔽</span>
            <span class="more-btn" @click="complainShow = true">投诉</span>
          </template>
        </div>
      </div>
    </div>
    <!-- 投诉 -->
    <complain-popup
      v-model="complainShow"
      :complainInfo="item"
      :complainType="articleType"
    ></complain-popup>
    <!-- 屏蔽 -->
    <shield-popup
      v-model="shieldShow"
      :shieldInfo="item"
      :shieldType="articleType"
    ></shield-popup>
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
import ClickOutSide from '@/directive/ClickOutSide'
import tfShare from '@/components/tf-share'
import ComplainPopup from './complainPopup'
import ShieldPopup from './shieldPopup'
export default {
  components: {
    tfShare,
    ComplainPopup,
    ShieldPopup
  },
  directives: {
    ClickOutSide
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
      activeIndex: undefined,
      postMoreShow: false,
      complainShow: false,
      shieldShow: false,
      shareObj: {},
      systemType: api.systemType || '',
      status: this.item.is_mine, // 是否是本人发的帖
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
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否确认删除该贴？'
        })
        .then(() => {
          deleteArticle({
            id: this.item.id
          }).then(res => {
            this.$emit('delete')
            this.$toast.success('删除成功')
            this.mtjEvent({
              eventId: 44
            })
          })
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
    }
    .operation-text {
      margin-left: 10px;
      font-size: 24px;
      color: #8f8f94;
    }
  }
  .tf-icon,
  .van-icon {
    width: 33.3%;
    font-size: 36px;
    color: #aaa;
    display: flex;
    justify-content: center;
    align-items: center;
    .tf-text-sm {
      margin-left: 10px;
    }
  }
}
.more-container {
  position: relative;
}
.more-popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: -256px;
  top: -16px;
  z-index: 2;
  width: 235px;
  height: 72px;
  padding-right: 10px;
  background: url("~@/assets/neighbours/dialog.png");
  background-size: contain;
  .more-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    font-size: 28px;
    color: #ffffff;
    line-height: 1;
  }
  .more-btn + .more-btn {
    border-left: 1px solid #8f8f94;
  }
}
.like-active::before {
  color: @orange-dark;
}
</style>
