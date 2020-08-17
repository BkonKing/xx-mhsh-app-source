<template>
  <refreshList class="reply-list" :list.sync="commentList" :load="getMyCommentList">
    <template v-slot="{item}">
      <div class="reply-cell-content">
        <userInfo :avatar="item.avatar || ''" :name="item.account" :time="item.ctime" size="m"></userInfo>
        <div class="reply-cell-content__text">{{item.content}}</div>
        <div v-if="item.images && item.images.length > 0" class="reply-cell-content__img-box">
          <img class="reply-cell-content__img" :src="item.images[0]" />
        </div>
        <div v-if="item.reply" class="reply-cell-content__reply">
          <span class="tf-text">
            <strong style="color: #222">{{item.reply}}</strong>：
          </span>
          {{item.replyContent}}
        </div>
      </div>
    </template>
  </refreshList>
</template>

<script>
import UserInfo from '@/components/user-info/index.vue'
import refreshList from '@/components/tf-refresh-list'
import { getMyCommentList } from '@/api/personage.js'
export default {
  components: {
    UserInfo,
    refreshList
  },
  data () {
    return {
      commentList: []
    }
  },
  methods: {
    getMyCommentList (params) {
      return getMyCommentList(params)
    }
  }
}
</script>

<style lang="less" scoped>
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
  &__reply {
    margin-top: 30px;
    margin-left: 86px;
    font-size: 26px;
    line-height: 1.8;
    background: #f2f2f4;
    padding: 25px 20px;
    border-radius: 4px;
  }
  &__img-box {
    margin-top: 30px;
    padding-left: 86px;
    line-height: 1;
  }
  &__img {
    width: 203px;
    height: 203px;
  }
}
</style>
