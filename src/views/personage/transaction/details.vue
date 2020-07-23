<template>
  <scroll-view class="tf-bg tf-screen" :scroll-y="true">
    <scroll-view class="tf-padding-base " :scroll-y="true">
      <view class="tf-card">
        <view class="tf-card-header">
          <text class="tf-card-header__title">内容描述</text>
          <text class="tf-card-header__status" :class="{ 'tf-card-header__status--complete': status > 5 }">{{ statusText[status] }}</text>
        </view>
        <text class="tf-card-content">{{ content }}</text>
        <view class="tf-image-box"><image class="tf-image" v-for="(item, i) in images" :src="item.src" :key="i" mode="widthFix"></image></view>
      </view>
      <tfTimeline class="tf-bg-white tf-mt-base tf-padding-base" :options="timelineList"></tfTimeline>
    </scroll-view>
    <view class="operation-box">
      <text class="operation-content">等待鲁班分派</text>
      <view v-if="status === 3" class="tf-row-space-between">
        <text class="tf-btn tf-mr-lg" @click="cancelRepair">撤销提报</text>
        <text class="tf-btn tf-btn-primary" @click="showAssign">分派人员</text>
      </view>
      <text v-if="status === 4" class="tf-btn" @click="cancelAssign">取消分派</text>
    </view>
    <tf-dialog ref="revocation" :showFotter="true"><text class="alert-text">撤销后将不再进行处理解决 确定撤销提报？</text></tf-dialog>
    <tf-dialog ref="assign" :showFotter="true" :hiddenOff="true" title="分派人员">
      <view>
        <view class="tf-form-box">
          <text class="tf-form-label">工作人员：</text>
          <view class="tf-form-item">
            <picker class="tf-form-item__input" @change="bindPickerChange" :value="index" :range="array">
              <text v-if="array[index]" class="tf-form-item__input">{{ array[index] }}</text>
              <text v-else class="tf-form-item__input--placeholder">请选择工作人员</text>
            </picker>
            <text class="tf-icon tf-form-item__icon">&#xe7ce;</text>
          </view>
        </view>
        <view class="tf-form-box">
          <text class="tf-form-label">预约处理时间：</text>
          <view class="tf-form-item">
            <date-time-picker class="tf-form-item__input" placeholder="请选择时间" fields="minute"></date-time-picker>
            <text class="tf-icon tf-form-item__icon">&#xe791;</text>
          </view>
        </view>
      </view>
    </tf-dialog>
    <tf-dialog ref="cancelAssign" :showFotter="true" :hiddenOff="true" title="取消任务">
      <view class="tf-form-box">
        <text class="tf-form-label">取消说明：</text>
        <textarea class="tf-form-item__textarea" placeholder="请输入原因"></textarea>
      </view>
    </tf-dialog>
  </scroll-view>
</template>

<script>
import dateTimePicker from '@/components/datetime-picker/datetime-picker.vue'
import tfTimeline from '@/pages/components/tf-timeline/index.nvue';
import tfDialog from '@/pages/components/tf-dialog/index.vue';
import { statusText } from '@/pages/const/butler.js';
import { getRepairInfo, cancelRepair } from '@/api/butler/butler.js';
export default {
  components: {
    dateTimePicker,
    tfTimeline,
    tfDialog
  },
  data() {
    return {
      statusText,
      content: '厨房下水道堵了',
      images: ['https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'],
      status: 4,
      ctime: '2020-06-03 16:35:26',
      timelineList: [
        {
          id: '1',
          remark: '已提交，等待物业人员受理。',
          designee: '',
          mobile: '',
          ctime: '2020-06-03 16:35:26'
        }
      ],
      array: ['中国', '美国', '巴西', '日本'],
      index: undefined
    };
  },
  onLoad({ id, title }) {
    // this.getRepairInfo(id)
    uni.setNavigationBarTitle({
      title: title || '报事报修'
    });
  },
  methods: {
    getRepairInfo(repairId) {
      getRepairInfo({
        projectId: '',
        repairId
      }).then(res => {
        if (res.success) {
          const { category, content, images, status, records } = res.data;
          this.status = status;
          this.imgList = images;
          this.timelineList = records;
          this.content = content;
        }
      });
    },
    // 撤销提报
    cancelRepair() {
      this.$refs.revocation.open();
    },
    // 分派人员
    showAssign() {
      this.$refs.assign.open();
    },
    bindPickerChange: function(e) {
      this.index = e.target.value;
    },
    cancelAssign() {
      this.$refs.cancelAssign.open();
    }
  }
};
</script>

<style lang="less" scoped>
.tf-card {
  padding-right: 0 !important;
}

.tf-card-content {
  color: @text-color;
  padding-right: 30px;
}

.tf-image-box {
  padding: 20px 30px 20px 0;
}
.operation-box {
  width: 750px;
  padding: 20px 20px 40px;
  background-color: #fff;
}
.operation-content {
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
  color: @orange-dark;
}
.alert-text {
  font-size: 30px;
  padding: 50px 50px 30px;
  line-height: 60px;
  text-align: center;
}
</style>
