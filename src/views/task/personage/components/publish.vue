<template>
  <div class="publist-task-list">
    <refreshList ref="list" :list.sync="list" :load="getList">
      <template v-slot="{ item, index }">
        <div class="order-wrapper" @click="goTask(item, index)">
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
              <div class="order-view-1" @click.stop="openMoreDialog(item, index)">
                <span class="tf-icon tf-icon-gengduo1 order-icon-1"></span>
                <span class="order-tag">更多</span>
              </div>
              <div
                v-if="+item.is_schedule"
                class="order-view-1"
                @click.stop="goSchedule(item, index)"
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
                  @finish="countDownFinish(item, index)"
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
      :taskId="moreTaskId"
      :shareObj="shareObj"
      @updateTask="reload"
    ></task-op>
  </div>
</template>

<script>
// /pages/task/personage/index
import refreshList from '@/components/tf-refresh-list'
import taskOp from '../../components/task-op'
import { getMyTaskList, reMyTask } from '@/api/task'
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
      moreTaskId: '', // 更多的任务id
      shareObj: {},
      activeIndex: '',
      modelSubTit: '下架后其他用户将看不见'
    }
  },
  created () {},
  methods: {
    // 获取我的发布任务
    getList (params) {
      return getMyTaskList(params)
    },
    // 刷新单条数据
    reSingleTask () {
      if (this.activeIndex !== '' && this.taskId !== '') {
        reMyTask({
          task_id: this.taskId
        }).then(({ data }) => {
          if (Array.isArray(data)) {
            this.list.splice(this.activeIndex, 1)
            return
          }
          this.$set(this.list, this.activeIndex, data)
        })
      }
    },
    countDownFinish ({ task_id }, index) {
      this.taskId = task_id
      this.activeIndex = index
      this.reSingleTask()
    },
    countDownTime (endTime) {
      const time = +endTime * 1000 - new Date().getTime()
      return time < 0 ? 0 : time
    },
    // 打开更多
    openMoreDialog ({ task_id, task_title, task_desc }, index) {
      if (this.moreTaskId === task_id) {
        this.selectShow = true
      }
      this.taskId = task_id
      this.moreTaskId = task_id
      this.activeIndex = index
      this.shareObj = {
        title: task_title,
        description: task_desc,
        pyqTitle: task_title
      }
    },
    // 任务进度
    goSchedule ({ task_id }, index) {
      this.taskId = task_id
      this.activeIndex = index
      this.$router.push({
        name: 'scheduleInitiator',
        query: {
          taskId: task_id
        }
      })
    },
    // 我的任务详情
    goTask ({ task_id }, index) {
      this.taskId = task_id
      this.activeIndex = index
      this.$router.push({
        name: 'PersonageTaskDetails',
        query: {
          taskId: task_id
        }
      })
    },
    reload (type) {
      if (type === 'delete') {
        this.list.splice(this.activeIndex, 1)
      } else {
        this.reSingleTask()
      }
    },
    reloadList () {
      this.$refs.list.reload()
    }
  }
}
</script>

<style lang="less" src="./order.less" scoped>
</style>
<style lang="less" scoped>
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
