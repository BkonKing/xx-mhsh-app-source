<template>
  <view class="tf-bg tf-padding-base">
    <list>
      <cell v-for="(item, i) in data" :key="item.id" @click="jump(item)">
        <text class="list-item--time">{{item.ctime}}</text>
        <view class="tf-card">
          <view class="tf-card-header">
            <text class="tf-card-header__title">{{item.type}}</text>
          </view>
          <text class="tf-card-content">{{ item.content }}</text>
          <view v-if="item.reply" class="reply-box">
            <text class="reply-title">回复:</text>
            <text class="reply-content">{{ item.reply }}</text>
          </view>
        </view>
      </cell>
    </list>
  </view>
</template>

<script>
import { getComPraiseList } from '@/api/butler/butler.js';
export default {
  data() {
    return {
      data: [
        {
          id: '1',
          type: '产品建议',
          ctime: '07-03',
          content: '厨房下水道堵了都没有及时来处理',
          info_type: 1,
          ctime: '2020-06-03 16:35:26',
          reply: '已经分派相关工作人员去处理了',
        },
        {
          id: '2',
          type: '其他',
          ctime: '07-03',
          content: '厨房下水道堵了都没有及时来处理2',
          info_type: 2,
          ctime: '2020-06-03 16:35:26',
          reply: '已经分派相关工作人员去处理了',
        }
      ]
    };
  },
  onLoad() {
    // this.getComPraiseList()
  },
  methods: {
    getComPraiseList() {
      getComPraiseList().then(res => {
        if (res.success) {
          this.data = res.data;
        }
      });
    },
    jump(item) {
      const url = `/pages/personage/feedback/details?id=${item.id}`;
      uni.navigateTo({
        url
      });
    }
  }
};
</script>

<style lang="less" scoped>
.tf-card {
  margin-bottom: @padding-md;
}
.tf-card-header {
  font-size: 30px;
  color: #333;
  font-weight:500;
}
.tf-card-content {
  color: #666;
}
.list-item--time {
  font-size: 24px;
  text-align: center;
  color: @gray-7;
  margin: @padding-md;
}
.reply-box {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: @divider-color;
  padding-bottom: 40px;
}

.reply-title {
  font-size: 24px;
  margin: 30px 0;
  color: #666;
}

.reply-content {
  padding: 20px 30px;
  background-color: #f0f0f0;
  color: #666;
  font-size: 24px;
  line-height: 52px;
  border-radius:10px;
}

</style>
