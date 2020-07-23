<template>
  <view><tfList :data="list"></tfList></view>
</template>

<script>
import tfList from './components/list.nvue';
import { getWjtpList } from '@/api/butler/butler.js';
export default {
  components: {
    tfList
  },
  data() {
    return {
      list: [
        {
          id: '1',
          title: '小区门禁更换投票',
          remarks: '小区门禁已使用多年部门功能已损坏需要更换',
          wjtp_type: '2',
          virtual_coin: 10,
          joins: '300',
          stime: '2020-06-03 16:35:26'
        },
        {
          id: '2',
          title: '疫情防范问卷调查',
          remarks: '小区开展疫情防范问卷调查',
          wjtp_type: '1',
          virtual_coin: 0,
          joins: '300',
          stime: '2020-06-03 16:35:26'
        }
      ]
    };
  },
  onNavigationBarButtonTap({ index }) {
    if (index === 0) {
      uni.navigateTo({
        url: '/pages/butler/questionnaire/my'
      });
    }
  },
  onLoad() {
    this.getWjtpList();
  },
  methods: {
    getWjtpList() {
      getWjtpList().then(res => {
        if (res.success) {
          this.list = res.data;
        }
      });
    }
  }
};
</script>
