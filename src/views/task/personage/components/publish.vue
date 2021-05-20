<template>
  <div class="publist-task-list">
    <refreshList :list.sync="list" :load="getList">
      <template v-slot="{ item }">
        <div class="order-wrapper" @click="goTask(item)">
          <div class="order-header">
            <div class="order-view">
              <span class="tf-icon tf-icon-xingfubi1 order-icon"></span>
              <span class="order-num">{{ item.z_reward_happiness }}</span>
              <span class="order-text"
                >({{ item.reward_happiness }}幸福币/人)</span
              >
            </div>
            <span
              class="order-title"
              :class="{ 'order-title-grey': +item.task_status > 2 }"
              >{{ item.task_status_name }}</span
            >
          </div>
          <div class="order-body">
            <span class="order-caption">{{ item.task_title }}</span>
            <span class="order-title-1"
              >需要人数：{{ item.need_people_text }}</span
            >
            <span v-if="item.task_time" class="order-title-1"
              >完成时间：{{ item.task_time }}</span
            >
            <span v-if="item.address_text" class="order-title-1"
              >完成地点：{{ item.address_text }}</span
            >
          </div>
          <div class="order-footer">
            <div class="order-footer-item">
              <div class="order-view-1" @click.stop="openMoreDialog(item)">
                <span class="tf-icon tf-icon-gengduo1 order-icon-1"></span>
                <span class="order-tag">更多</span>
              </div>
              <div
                v-if="+item.is_schedule"
                class="order-view-1"
                @click.stop="goSchedule(item)"
              >
                <span class="tf-icon tf-icon-ziyuan2 order-icon-1"></span>
                <span class="order-tag">进度</span>
              </div>
            </div>
            <div class="order-footer-item">
              <span
                v-if="item.task_etime && countDownTime(item.task_etime)"
                class="order-caption-1"
                >剩余<van-count-down
                  :time="countDownTime(item.task_etime)"
                  @finish="reload"
              /></span>
              <span v-else class="order-title">{{ item.text }}</span>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:nodata>
        <div class="no-data-box">
          <img class="no-data-img" src="@/assets/neighbours/notask.png" />
          <div class="no-data-text">暂无内容</div>
        </div>
      </template>
    </refreshList>
    <task-op
      v-model="selectShow"
      :taskId="taskId"
      :shareObj="shareObj"
      @updateTask="reload"
    ></task-op>
  </div>
</template>

<script>
// /pages/task/personage/index
import refreshList from '@/components/tf-refresh-list'
import taskOp from '../../components/task-op'
import { getMyTaskList } from '@/api/task'
export default {
  components: {
    refreshList,
    taskOp
  },
  data () {
    return {
      // 0待审核 1待接单 2待交付 3已完成 4未通过 5已终止 6已失效
      list: [],
      selectShow: false,
      taskId: '',
      shareObj: {},
      modelSubTit: '下架后其他用户将看不见'
    }
  },
  created () {},
  methods: {
    // 获取我的发布任务
    getList (params) {
      return getMyTaskList(params)
    },
    countDownTime (endTime) {
      const time = +endTime * 1000 - new Date().getTime()
      return time < 0 ? 0 : time
    },
    // 打开更多
    openMoreDialog ({ task_id, task_title, task_desc }) {
      this.taskId = task_id
      this.shareObj = {
        title: task_title,
        description: task_desc,
        pyqTitle: task_title
      }
      this.selectShow = true
    },
    // 任务进度
    goSchedule ({ task_id }) {
      this.$router.push({
        name: 'scheduleInitiator',
        query: {
          taskId: task_id
        }
      })
    },
    // 邻里-任务详情
    goDetails ({ task_id }) {
      this.$router.push({
        name: 'taskDetail',
        query: {
          taskId: task_id
        }
      })
    },
    // 我的任务详情
    goTask ({ task_id }) {
      this.$router.push({
        name: 'PersonageTaskDetails',
        query: {
          taskId: task_id
        }
      })
    },
    reload () {
      this.$refs.list.reload()
    }
  }
}
</script>

<style lang="less" scoped>
@import url("./order.less");

.order-caption-1 {
  display: flex;
  align-items: center;
  margin-top: -2px;
  line-height: 28px;
  color: #000000;
  font-size: 28px;
}

.order-text {
  margin-left: 20px;
  line-height: 1;
  font-size: 28px;
  color: #8f8f94;
}

.publist-task-list {
  width: 100%;
  height: 100%;
}
</style>
