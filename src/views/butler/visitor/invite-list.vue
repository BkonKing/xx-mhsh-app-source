<template>
  <view>
    <uni-segmented-control :current="isVisit" :values="items" @clickItem="onClickItem" style-type="text" active-color="#eb5841" class="tf-bg-white"></uni-segmented-control>
    <list :scrollable="true" class="tf-padding-base tf-bg">
      <cell v-for="(item, i) in data" :key="i">
        <view class="list-item">
          <text class="tf-status-tag">已过期</text>
          <view class="tf-row tf-mb-base">
            <text class="tf-text-lg tf-text-grey">来访日期：</text>
            <text class="tf-text-lg">{{ item.stime }}<!-- - {{ item.etime }} --></text>
          </view>
          <view class="tf-row tf-mb-base">
            <text class="tf-text-lg tf-text-grey">进出次数：</text>
            <text class="tf-text-lg">{{ item.vtimes | vtimes }}</text>
          </view>
          <view class="tf-row tf-mb-base">
            <text class="tf-text-lg tf-text-grey">同行人数：</text>
            <text class="tf-text-lg">{{ item.num }}人</text>
          </view>
          <view class="tf-row tf-mb-base">
            <text class="tf-text-lg tf-text-grey">访客信息：</text>
            <view>
              <text class="tf-text-lg tf-mb-base">{{ item.realname }} {{ item.gender | sex }}</text>
              <text class="tf-text-lg tf-text-grey">{{ item.mobile }} {{ item.car_number }}</text>
            </view>
          </view>
        </view>
      </cell>
    </list>
  </view>
</template>

<script>
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
import { getVisitorLogList } from '@/api/butler/butler.js';
export default {
  components: {
    uniSegmentedControl
  },
  data() {
    return {
      items: ['待来访', '已过期', '已到访'],
      isVisit: 0,
      data: [
        {
          id: '1',
          realname: '陈小东',
          mobile: '13699466258',
          gender: '1',
          stime: '2020-05-12 10:00:00',
          etime: '2020-05-12 15:00:00',
          vtimes: '1',
          vlogs: ['2020-05-12 10:11:36'],
          car_number: '闽A88888',
          num: '1',
          is_visit: '1',
          ctime: '2020-05-12 09:55:21'
        },
        {
          id: '2',
          realname: '许岩',
          mobile: '13793636398',
          gender: '2',
          stime: '2020-05-12 10:00:00',
          etime: '2020-05-12 15:00:00',
          vtimes: '1',
          vlogs: '',
          car_number: '闽A88866',
          num: '1',
          is_visit: '2',
          ctime: '2020-05-12 10:31:15'
        }
      ]
    };
  },
  onLoad() {
    this.getVisitorLogList();
  },
  methods: {
    getVisitorLogList() {
      getVisitorLogList({
        isVisit: this.isVisit
      }).then(res => {
        if (res.success) {
          this.data = res.data;
        }
      });
    },
    onClickItem(e) {
      if (this.isVisit !== e.currentIndex) {
        this.isVisit = e.currentIndex;
        this.getVisitorLogList();
      }
    }
  },
  filters: {
    sex(value) {
      const sexText = {
        1: '男',
        2: '女'
      };
      return sexText[value];
    },
    vtimes(value) {
      const vtime = {
        1: '当日一次',
        2: '当日两次',
        3: '当日三次及以上'
      };
      return vtime[value];
    }
  }
};
</script>

<style lang="less" scoped>
.list-item {
  position: relative;
  background-color: #fff;
  border-radius: @border-radius-md;
  margin-bottom: @padding-md;
  padding: 20px 0 20px 20px;
}

.visit-status {
  position: absolute;
  right: 20px;
}
</style>
