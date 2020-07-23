<template>
  <view class="tf-bg tf-padding-base">
    <!-- <recycle-list for="(item, i) in list">
      <cell-slot :key="i"> -->
        <view v-for="(item, i) in list" :key="i">
        <view>
          <text class="tf-list-content tf-mb-base tf-center">{{item.ctime}}</text>
          <view class="tf-list" @click="jump(item)">
            <image v-if="type !== 'system'" class="tf-list-image" :src="item.image" :class="[`list-image__${type}`]" mode="aspectFit"></image>
            <view class="tf-vertical-center">
              <view class="tf-row-vertical-center">
                <text class="tf-list-title">{{item.title}}</text>
                <text class="tf-circle-tag--warning"></text>
              </view>
              <text class="tf-list-content">{{item.content}}</text>
            </view>
          </view>
        </view>
        </view>
      <!-- </cell-slot>
    </recycle-list> -->
  </view>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        list: [
          {
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
  .list-image__butler,
  .list-image__activity,
  .list-image__work{
    width: 80px;
  }
  .tf-circle-tag--warning {
    width: 14px;
    height: 14px;
    margin-left: 8px;
  }
  .tf-list-content {
    lines: 1;
    text-overflow: ellipsis;
  }
</style>
