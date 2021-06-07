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
      <template #right>
        <span class="van-icon van-icon-ellipsis" @click="openMoreDialog"></span>
      </template>
    </van-nav-bar>
    <div class="tf-main-container">
      <div class="task-wrapper" @click="goDetails">
        <div class="task-header">
          <div class="task-caption">
            <span class="task-caption-text">{{ info.task_title }}</span>
          </div>
          <span class="task-title">{{ info.task_status_name }}</span>
        </div>
        <div class="task-body">
          <div class="task-view">
            <span class="tf-icon tf-icon-xingfubi1 task-icon"></span>
            <span class="task-num">{{ info.z_reward_happiness }}</span>
            <span class="task-text"
              >({{ info.reward_happiness }}幸福币/人)</span
            >
          </div>
          <span class="task-title-1">需要人数：{{ info.need_people }}</span>
          <span class="task-title-1">完成时间：{{ info.task_time }}</span>
          <span v-if="info.address_text" class="task-title-1"
            >完成地点：{{ info.address_text }}</span
          >
        </div>
      </div>
      <div v-if="info.is_schedule" class="task-schedule" @click="goSchedule">
        <div class="task-schedule-caption">任务进度</div>
        <div class="task-schedule-info">
          <span class="task-schedule-text">{{ info.text }}</span>
          <span class="tf-icon tf-icon-right"></span>
        </div>
      </div>
      <schedule-list
        class="schedule"
        :listData="info.tasksideflow_list"
      ></schedule-list>
    </div>
    <task-op
      v-model="selectShow"
      :taskId="taskId"
      :shareObj="shareObj"
      @updateTask="updateTask"
    ></task-op>
  </div>
</template>

<script>
// pages/task/personage/task
import scheduleList from '../schedule/schedule-list'
import taskOp from '../components/task-op'
import { getMyTaskInfo } from '@/api/task'

export default {
  components: {
    scheduleList,
    taskOp
  },
  data () {
    return {
      taskId: '',
      info: {},
      shareObj: {},
      selectShow: false
    }
  },
  created () {
    this.taskId = this.$route.query.taskId
    this.getMyTaskInfo()
  },
  methods: {
    getMyTaskInfo () {
      getMyTaskInfo({
        task_id: this.taskId
      }).then(({ data }) => {
        this.info = data
        this.shareObj = {
          title: data.task_title,
          description: data.task_desc,
          pyqTitle: data.task_title
        }
      })
    },
    updateTask (type) {
      if (type === 'delete') {
        this.$router.go(-1)
      } else {
        this.getMyTaskInfo()
      }
    },
    // 打开更多
    openMoreDialog () {
      this.selectShow = true
    },
    // 任务进度
    goSchedule () {
      this.$router.push({
        name: 'scheduleInitiator',
        query: {
          taskId: this.taskId
        }
      })
    },
    // 邻里-任务详情
    goDetails () {
      // 未提交（保存草稿）则不能跳转
      if (
        this.info.task_status === '0' &&
        this.info.task_status_name === '未提交'
      ) {
        return
      }
      this.$router.push({
        name: 'taskDetail',
        query: {
          taskId: this.taskId
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tf-main-container {
  padding: 30px 20px;
  font-size: 28px;
}

/deep/ .van-nav-bar .van-icon-ellipsis {
  font-size: 38px;
  color: #000;
  font-weight: bold;
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
  font-size: 32px;
  color: #febf00;
  line-height: 1;
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
  margin-left: 30px;
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
  // border-bottom: 1px solid #eeeeee;
}

.task-caption {
  display: flex;
  align-items: center;
  flex: 1;
  width: 0;
  > .task-caption-text {
    line-height: 1;
    color: #000;
    font-size: 32px;
    @text-ellipsis();
  }
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
      color: #8f8f94;
    }
  }
}
/deep/ .schedule-list {
  margin-top: 30px;
}
</style>
