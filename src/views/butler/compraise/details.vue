<template>
  <view class="tf-bg">
    <view class="tf-bg-white tf-padding-base">
      <userInfo name="园博园他" avatar="/static/app-icon.png" :time="ctime"></userInfo>
      <text class="tf-auxiliary-content tf-mt-lg">{{content}}</text>
      <view class="tf-image-box tf-mt-base"><image class="image" v-for="(item, i) in images" :key="i" :src="item.src" mode="aspectFill"></image></view>
    </view>
    <view v-if="reply" class="tf-card tf-mt-lg">
      <text class="tf-card-header">社区回复</text>
      <text class="tf-card-content">{{reply}}</text>
    </view>
  </view>
</template>

<script>
import userInfo from '../../components/user-info/index.nvue';
import { getComPraiseInfo } from '@/api/butler/butler.js';
export default {
  components: {
    userInfo
  },
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
  onLoad(params) {
    const { id, type } = params;
    this.id = id
    uni.setNavigationBarTitle({
      title: type == 2 ? '表扬' : '投诉'
    });
    this.getComPraiseInfo()
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
  line-height: 56px;
}
</style>
