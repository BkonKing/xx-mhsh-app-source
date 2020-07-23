<template>
  <tfList :data="list"></tfList>
</template>

<script>
import tfList from './components/list.nvue';
import { getMyWjtpList } from '@/api/butler/butler.js';
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
          virtual_coin: '10',
          joins: '300',
          stime: '2020-06-03 16:35:26'
        }
      ]
    };
  },
  onLoad() {
    this.getMyWjtpList();
  },
  methods: {
    getMyWjtpList() {
      getMyWjtpList().then(res => {
        if (res.success) {
          this.list = res.data;
        }
      });
    }
  }
};
</script>
