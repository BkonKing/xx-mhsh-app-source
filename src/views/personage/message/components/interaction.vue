<template>
  <refreshList :list.sync="list" @load="onLoad">
    <template v-slot="{item}">
      <div class="tf-list-content tf-mb-base tf-center">{{item.ctime}}</div>
      <div class="tf-list" @click="jump(item)">
        <template v-if="item.type === 0">
          <div class="tf-row-vertical-center tf-mb-lg">
            <div class="tf-icon tf-icon-like-fill like-icon"></div>
            <div class="tf-text-sm">我收到了点赞</div>
          </div>
          <div class="tf-row message-box">
            <div class="tf-icon tf-icon-like-fill tf-text-orange"></div>
            <div class="tf-text-sm tf-text-grey like-number">233</div>
            <div class="tf-text-sm tf-text-grey">关于美好生活家园2020年中秋佳节社区活动</div>
          </div>
        </template>
        <template v-else>
          <div class="tf-row-space-between">
            <div class="tf-row-vertical-center">
              <img class="tf-avatar-sm tf-mr-base" src="/static/app-icon.png" mode="aspectFit" />
              <div class="tf-text-sm">蔡文姬</div>
              <div class="tf-circle-tag--warning"></div>
            </div>
            <div class="tf-row-vertical-center">
              <div class="tf-icon tf-icon-comment reply-icon"></div>
              <div class="tf-text-sm tf-text-grey">回复</div>
            </div>
          </div>
          <div class="content-box">中秋佳节活动策划方案的实施需要物业的全力以赴和广大业主的支持，美好生活家园为了更好地服务于社区业区业区业区业区业</div>
          <div class="tf-row message-box">
            <div class="tf-text-sm tf-text-primary">233</div>
            <div class="tf-text-sm tf-text-grey">：关于美好生活家园2020年中秋佳节社区活动</div>
          </div>
        </template>
      </div>
    </template>
  </refreshList>
</template>

<script>
import refreshList from '@/components/tf-refresh-list'
export default {
  components: {
    refreshList
  },
  data () {
    return {
      list: [
        {
          type: 0,
          title: '交易退款成功',
          content: '您的订单已成功退款，点击查看详情',
          image: '/static/app-icon.png',
          ctime: '07-06 12:00'
        },
        {
          type: 1,
          title: '交易退款成功',
          content: '您的订单已成功退款，点击查看详情',
          image: '/static/app-icon.png',
          ctime: '07-06 12:00'
        }
      ]
    }
  },
  methods: {
    onLoad () {

    }
  }
}
</script>

<style lang="less" scoped>
.tf-list {
  flex-direction: column !important;
}
.tf-circle-tag--warning {
  width: 14px;
  height: 14px;
  margin-left: 8px;
}
.message-box {
  align-items: center;
  padding: 20px;
  border-radius: 4px;
  background-color: #f0f0f0;
}
.tf-text-orange {
  margin-right: 10px;
}
.like-icon {
  width: 48px;
  height: 48px;
  line-height: 48px;
  border-radius: 50%;
  margin-right: 20px;
  font-size: 28px;
  text-align: center;
  background-color: @background-color;
  color: #aaaaaa;
}
.like-number {
  padding-right: 10px;
  margin-right: 10px;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: #aaaaaa;
}
.content-box {
  margin: 20px 0;
  font-size: 26px;
  lines: 2;
  text-overflow: ellipsis;
}
.reply-icon {
  color: @orange-dark;
  margin-right: 9px;
}
</style>
