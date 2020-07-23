<template>
  <view class="tf-bg">
    <!-- <recycle-list for="(item, i) in list">
      <cell-slot :key="i"> -->
    <view v-for="(item, i) in list" :key="i">
      <view class="tf-list" @click="jump(item)">
        <view class="tf-row">
          <image class="tf-list-image" :src="item.image" mode="aspectFit"></image>
          <view class="tf-space-between">
            <text class="tf-list-title">{{ item.title }}</text>
            <view class="tf-row-vertical-center">
              <text class="tf-gradient-tag--main">默认</text>
              <text class="tf-list-content">{{ item.content }}</text>
            </view>
          </view>
        </view>
        <text class="tf-icon">{{ icon_edit_square }}</text>
      </view>
    </view>
    <!-- </cell-slot>
    </recycle-list> -->
    <view class="tf-padding-base"><button type="warn" @click="add">添加新地址</button></view>
  </view>
</template>

<script>
import {icon_edit_square} from '@/pages/const/icon.js';
export default {
  data() {
    return {
      icon_edit_square,
      list: [
        {
          title: '交易退款成功',
          content: '您的订单已成功退款，点击查看详情',
          image: '/static/app-icon.png',
          ctime: '07-06 12:00'
        }
      ]
    };
  },
  methods: {
    add() {
      uni.navigateTo({
        url: '/pages/personage/information/add-address'
      })
    }
  }
};
</script>

<style lang="less" scoped>
.tf-list {
  justify-content: space-between;
  align-items: center;
  margin: 0;
}
.tf-list-image {
  width: 80px;
  height: 80px;
  border-radius: 4px;
}
.tf-list-title {
  line-height: 30px;
}
.tf-list-content {
  lines: 1;
  text-overflow: ellipsis;
}
.tf-icon {
  font-size: 42px;
  color: #b8babf;
}
.tf-gradient-tag--main {
  height: 30px;
  line-height: 30px;
  border-radius: 2px;
  margin-right: 10px;
}
</style>
