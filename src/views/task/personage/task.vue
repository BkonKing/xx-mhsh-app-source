<template>
  <div class="tf-bg">
    <van-nav-bar
      title="任务订单"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="tf-main-container">
      <div class="task-wrapper">
        <div class="task-header">
          <span class="task-caption">五凤兰庭清洁志愿者招募</span>
          <span class="task-title">进行中</span>
        </div>
        <div class="task-body">
          <div class="task-view">
            <img
              class="task-icon"
              src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/ac2d12f0a28411eb91bf2b62ae51e7f0.png"
            />
            <span class="task-num">1000</span>
            <span class="task-text">(100幸福币/人)</span>
          </div>
          <span class="task-title-1">需要人数：10人（1人已接单）</span>
          <span class="task-title-1">完成时间：截止2021-03-10 12:00</span>
          <span class="task-title-1">完成地点：三盛滨江国际1号楼 线下科技</span>
        </div>
      </div>
      <div class="task-schedule">
        <div class="task-schedule-caption">任务进度</div>
        <div class="task-schedule-info">
          <span class="task-schedule-text">2人待确认完成</span>
          <span class="tf-icon tf-icon-right"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// pages/task/personage/task
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.tf-main-container {
  padding: 30px 20px;
}

.task-wrapper {
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  border-radius: 10px;
  background-color: #ffffff;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 92px;
  border-bottom: 1px solid #eeeeee;
}

.task-view {
  display: flex;
  align-items: center;
  margin-top: 30px;
}

.task-icon {
  margin-right: 20px;
  width: 32px;
  height: 32px;
}

.task-num {
  margin-top: -1px;
  text-align: left;
  line-height: 1;
  color: #febf00;
  font-size: 32px;
}

.task-text {
  margin-left: 20px;
  font-size: 28px;
  color: #8f8f94;
  line-height: 1;
}

.task-title {
  text-align: left;
  line-height: 26px;
  color: #ff6555;
  font-size: 26px;
}

.task-body {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  padding-bottom: 40px;
  border-bottom: 1px solid #eeeeee;
}

.task-caption {
  display: flex;
  align-items: center;
  line-height: 1;
  color: #000;
  font-size: 32px;
}

.task-title-1 {
  margin-top: 29px;
  max-width: 649px;
  height: 25px;
  text-align: left;
  text-overflow: ellipsis;
  line-height: 26px;
  white-space: pre;
  color: #8f8f94;
  font-size: 26px;
}

.task-schedule {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 710px;
  height: 88px;
  padding: 0 30px;
  margin-top: 30px;
  background: #ffffff;
  border-radius: 10px;
  .task-schedule-caption {
    font-size: 28px;
    color: #000000;
  }
  .task-schedule-info {
    display: flex;
    align-items: center;
    .task-schedule-text {
      font-size: 28px;
      color: #ff6555;
      line-height: 1;
    }
    .tf-icon-right {
      margin-left: 12px;
      font-size: 28px;
      line-height: 1;
      color: #8F8F94;
    }
  }
}
</style>
