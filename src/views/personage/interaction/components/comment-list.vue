<template>
  <refreshList class="reply-list" :list.sync="commentList" @load="commentLoad">
    <template v-slot="{item}">
      <div class="reply-cell-content">
        <userInfo :avatar="item.avatar || ''" :name="item.account" :time="item.ctime" size="m"></userInfo>
        <div class="reply-cell-content__text">{{item.content}}</div>
        <div v-if="item.images && item.images.length > 0" class="reply-cell-content__img-box">
          <img class="reply-cell-content__img" :src="item.images[0]" />
        </div>
        <div class="reply-cell-content__reply">
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
export default {
  components: {
    UserInfo,
    refreshList
  },
  data () {
    return {
      commentList: [
        {
          avatar:
            'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2381468826,3029522659&fm=111&gp=0.jpg',
          account: '小雪',
          ctime: '2020-06-03 16:35:26',
          content:
            '在宏观调控不断深入与加强的背景下，房地产行业已经从过去的资源竞争，进入到产品竞争的阶段。对于房企而言，形成产品标准化管理体系，是快速提升房地产企业管理水平的有效捷径。',
          images: [
            '//bpic.588ku.com//back_origin_min_pic/19/04/12/a7c89ed2d90387fdfbb6daa651e2c674.jpg!/fw/750/quality/99/unsharp/true/compress/true'
          ],
          reply: '鲁班',
          replyContent: '你在说个啥子'
        }
      ]
    }
  },
  methods: {
    commentLoad () {}
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
