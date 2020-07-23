<template>
  <view class="tf-bg">
    <view class="tf-bg-white padding">
      <view class="tf-row-space-between tf-divider">
        <text class="tf-text-lg">产品反馈</text>
        <text class="tf-text tf-text-grey">2020-07-07 12:00</text>
      </view>
    </view>
    <view class="tf-bg-white tf-padding-lg">
      <text class="tf-auxiliary-content">{{ content }}</text>
      <view class="tf-image-box tf-mt-base"><image class="image" v-for="(item, i) in images" :key="i" :src="item.src" mode="aspectFill"></image></view>
    </view>
    <view v-if="reply" class="tf-card tf-mt-lg">
      <view class="tf-card-header"><text class="tf-card-header__title">回复</text></view>
      <text class="tf-card-content">{{ reply }}</text>
    </view>
  </view>
</template>

<script>
import { getComPraiseInfo } from '@/api/butler/butler.js';
export default {
  data() {
    return {
      id: '',
      content: '厨房下水道堵了都没有及时来处理',
      info_type: '2',
      ctime: '2020-06-03 16:35:26',
      reply: '已经分派相关工作人员去处理了',
      images: [{ src: '/static/app-icon.png' }, { src: '/static/app-icon.png' }, { src: '/static/app-icon.png' }, { src: '/static/app-icon.png' }]
    };
  },
  onLoad({ id }) {
    this.id = id;
    this.getComPraiseInfo();
  },
  methods: {
    getComPraiseInfo() {
      getComPraiseInfo({
        compraiseId: this.id
      }).then(res => {
        if (res.success) {
          const { content } = res.data;
          this.content = content;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.padding {
  padding: 10px 30px 0;
}
.tf-row-space-between {
  padding-bottom: 30px;
}
.tf-text-lg {
  font-weight: 500;
}
.tf-card {
  width: 750px;
}
.tf-card-header {
  font-size: 30px;
}
.image {
  width: 210px;
  height: 210px;
  margin-bottom: 20px;
}
.tf-auxiliary-content {
  line-height: 52px;
}
</style>
