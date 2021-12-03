<template>
  <refreshList ref="list" :list.sync="list" :load="getList">
    <template v-slot="{ item, index }">
      <coupon-item :data="item"></coupon-item>
    </template>
    <template v-slot:nodata>
      <div class="no-data-box">
        <img class="no-data-img" src="@/assets/neighbours/notask.png" />
        <div class="no-data-text">暂无内容</div>
      </div>
    </template>
  </refreshList>
</template>

<script>
import refreshList from '@/components/tf-refresh-list'
import CouponItem from './CouponItem'
import { getUserTaskList, reUserTask } from '@/api/task'
export default {
  components: {
    refreshList,
    CouponItem
  },
  data () {
    return {
      // 0已接单、1进行中、2已完成、3已淘汰、4已放弃、5已终止
      list: [],
      taskId: '',
      activeIndex: ''
    }
  },
  created () {},
  methods: {
    // 获取我的报事报修
    getList (params) {
      return getUserTaskList(params)
    },
    // 刷新单条数据
    reSingleTask () {
      if (this.activeIndex !== '' && this.taskId !== '') {
        reUserTask({
          user_task_id: this.taskId
        }).then(({ data }) => {
          this.$set(this.list, this.activeIndex, data)
        })
      }
    },
    // 联系
    makePhoneCall (phoneNumber) {
      api.call({
        type: 'tel_prompt',
        number: phoneNumber
      })
    },
    // 任务进度
    goSchedule ({ task_id, user_task_id }, index) {
      this.taskId = user_task_id
      this.activeIndex = index
      this.$router.push({
        name: 'scheduleReceiver',
        query: {
          taskId: task_id
        }
      })
    },
    // 任务详情
    goTask ({ task_id, user_task_id }, index) {
      this.taskId = user_task_id
      this.activeIndex = index
      this.$router.push({
        name: 'taskDetail',
        query: {
          taskId: task_id
        }
      })
    },
    // 交付任务
    goDeliverTask ({ task_id, user_task_id }, index) {
      this.taskId = user_task_id
      this.activeIndex = index
      this.$router.push({
        name: 'operateDeliver',
        query: {
          taskId: task_id,
          userTaskId: user_task_id
        }
      })
    },
    countDownFinish ({ user_task_id }, index) {
      this.taskId = user_task_id
      this.activeIndex = index
      this.reSingleTask()
    },
    countDownTime (endTime) {
      const time = +endTime * 1000 - new Date().getTime()
      return time < 0 ? 0 : time
    },
    reload () {
      this.$refs.list.reload()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
