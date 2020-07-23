<template>
  <scroll-view class="tf-bg tf-padding-base">
    <list>
      <cell v-for="item in data" :key="item.id">
        <view class="question-box" @click="jump(item)">
          <view class="question-status-box">
            <text class="question-type">{{ item.wjtp_type }}</text>
          </view>
          <view class="question-box__right">
            <text class="question-title">{{ item.title }}</text>
            <view class="question-info">
              <view class="tf-row-vertical-center">
                <text class="tf-gradient-tag--warning" v-if="item.virtual_coin > 0">+{{ item.virtual_coin }}</text>
                <text class="participate-status" :class="item.status ? 'participate-status--proceed' : 'participate-status--end'">{{ item.joins }}人参加</text>
              </view>
              <text class="question-info__time">{{ item.stime }}</text>
            </view>
          </view>
        </view>
      </cell>
    </list>
  </scroll-view>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    jump(item) {
      const url = `/pages/butler/questionnaire/details?id=${item.id}`;
      uni.navigateTo({
        url
      });
    }
  }
};
</script>

<style lang="less" scoped>
.question-box {
  width: 710px;
  flex-direction: row !important;
  background-color: #fff;
  border-radius: @border-radius-md;
  margin-bottom: 20px;
}

.question-status-box {
  width: 170px;
  // height: 170px;
  background-color: @background-color-grey;
  border-top-left-radius: @border-radius-md;
  border-bottom-left-radius: @border-radius-md;
}
.question-type {
  text-align: center;
  line-height: 170px;
}
.question-box__right {
  flex: 1;
  padding: 40px 20px;
}
.question-title {
  font-size: 30px;
  font-weight: 500;
  lines: 1;
  text-overflow: ellipsis;
  margin-bottom: @padding-lg;
}
.question-info {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.participate-status {
  font-size: 24px;
}
.participate-status--proceed {
  color: @red-dark;
}
.participate-status--end {
  color: @gray-7;
}
.tf-gradient-tag--warning {
  margin-right: 30px;
}
.question-info__time {
  font-size: 24px;
  color: @gray-7;
}
</style>
