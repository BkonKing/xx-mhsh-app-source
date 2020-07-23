<template>
  <view class="tf-bg">
    <view class="transaction-header">
      <text class="transaction-title">报事报修</text>
      <text class="transaction-underline"></text>
    </view>
    <view class="transaction-tab-box">
      <text v-for="(item, i) in typeList" :key="i" class="transaction-tab" :class="{ 'transaction-tab--active': type === item.value }" @click="type = item.value">{{ item.name }}()</text>
    </view>
    <list class="transaction-list" :scrollable="true">
      <cell v-for="item in transactionList" :key="item.id" @click="jump(item)">
        <text class="transaction-list-item--time">提交时间：{{ item.ctime }}</text>
        <view class="tf-card" style="padding-right: 0 !important;">
          <view class="tf-card-header">
            <text class="tf-card-header__title">{{ item.category }}</text>
            <text class="tf-card-header__status" :class="{ 'tf-card-header__status--complete': item.status > 5 }">{{ statusText[item.status] }}</text>
          </view>
          <text class="tf-card-content">{{ item.content }}</text>
          <text class="tf-card-footer">{{ item.content }}</text>
        </view>
      </cell>
    </list>
  </view>
</template>

<script>
import { statusText } from '../../const/butler.js';
export default {
  data() {
    return {
      statusText,
      typeList: [
        {
          name: '待处理',
          value: 1
        },
        {
          name: '待分派',
          value: 2
        },
        {
          name: '待结案',
          value: 3
        },
        {
          name: '已结案',
          value: 4
        }
      ],
      type: undefined,
      transactionList: [
        {
          id: '1',
          category: '居家报修',
          content: '厨房下水道堵了',
          images: ['https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg', 'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'],
          status: 6,
          ctime: '2020-06-03 16:35:26'
        }
      ]
    };
  },
  onLoad({ type }) {
    this.type = parseInt(type);
  },
  methods: {
    jump(item) {
      const url = `/pages/personage/transaction/details?id=${item.id}&title=${item.category}`;
      uni.navigateTo({
        url
      });
    }
  }
};
</script>

<style lang="less" scoped>
.transaction-header {
  align-items: center;
  width: 750px;
  height: 98px;
  background-color: #fff;
}
.transaction-title {
  width: 750px;
  line-height: 94px;
  text-align: center;
  font-size: 34px;
  font-weight: 500;
}
.transaction-underline {
  width: 92px;
  height: 4px;
  background-color: @red-dark;
  border-radius: 2px;
}
.transaction-tab-box {
  flex-direction: row;
  justify-content: space-between;
  padding: 30px;
}
.transaction-tab {
  width: 155px;
  height: 66px;
  line-height: 66px;
  border-radius: 33px;
  font-size: 24px;
  text-align: center;
  color: @gray-7;
  border-width: 2px;
  border-style: solid;
  border-color: #aaa;
}
.transaction-tab--active {
  color: #fff;
  border-color: @red-dark;
  background-color: @red-dark;
}
.transaction-list {
  padding: 20px;
}
.transaction-list-item--time {
  text-align: center;
  font-size: 24px;
  color: @gray-7;
  margin-bottom: 20px;
}
.tf-card-header__title {
  padding: 12px;
  border-width: 2px;
  border-style: solid;
  border-color: #383838;
  font-weight: 400;
  font-size: 24px;
}
.tf-card-content {
  color: #666;
}
</style>
