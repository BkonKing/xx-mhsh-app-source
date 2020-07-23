<template>
  <view class="tf-bg tf-padding-base">
    <!-- <recycle-list for="(item, i) in list">
      <cell-slot :key="i"> -->
        <view v-for="(item, i) in list" :key="i">
        <view>
          <text class="tf-list-content tf-mb-base tf-center">{{item.ctime}}</text>
          <view class="tf-list" @click="jump(item)">
            <template v-if="item.type === 0">
              <view class="tf-row-vertical-center tf-mb-lg">
                <text class="tf-icon like-icon">{{icon_like_fill}}</text>
                <text class="tf-text-sm">我收到了点赞</text>
              </view>
              <view class="tf-row message-box">
               <text class="tf-icon tf-text-orange">{{icon_like_fill}}</text>
               <text class="tf-text-sm tf-text-grey like-number">233</text>
               <text class="tf-text-sm tf-text-grey">关于美好生活家园2020年中秋佳节社区活动</text>
              </view>
            </template>
            <template v-else>
              <view class="tf-row-space-between">
                <view class="tf-row-vertical-center">
                  <image class="tf-avatar-sm tf-mr-base" src="/static/app-icon.png" mode="aspectFit"></image>
                  <text class="tf-text-sm">蔡文姬</text>
                  <text class="tf-circle-tag--warning"></text>
                </view>
                <view class="tf-row-vertical-center">
                  <text class="tf-icon reply-icon">{{icon_comment}}</text>
                  <text class="tf-text-sm tf-text-grey">回复</text>
                </view>
              </view>
              <text class="content-box">中秋佳节活动策划方案的实施需要物业的全力以赴和广大业主的支持，美好生活家园为了更好地服务于社区业区业区业区业区业</text>
              <view class="tf-row message-box">
               <text class="tf-text-sm tf-text-primary">233</text>
               <text class="tf-text-sm tf-text-grey">：关于美好生活家园2020年中秋佳节社区活动</text>
              </view>
            </template>
          </view>
        </view>
        </view>
      <!-- </cell-slot>
    </recycle-list> -->
  </view>
</template>

<script>
  import { icon_like_fill, icon_comment } from '@/pages/const/icon.js'
  export default {
    data() {
      return {
        icon_like_fill,
        icon_comment,
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
    background-color: #F0F0F0;
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
    color: #AAAAAA;
  }
  .like-number {
    padding-right: 10px;
    margin-right: 10px;
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: #AAAAAA;
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
