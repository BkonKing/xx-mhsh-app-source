<template>
  <refreshList :list.sync="list" :load="getList">
    <template v-slot="{ item }">
      <div class="order-wrapper" @click="goTask">
        <div class="order-header">
          <div class="order-view">
            <span class="tf-icon tf-icon-xingfubi1 order-icon"></span>
            <span class="order-num">{{ item.z_reward_happiness }}</span>
            <span class="order-text"
              >({{ item.reward_happiness }}幸福币/人)</span
            >
          </div>
          <span class="order-title">{{ item.task_status_name }}</span>
        </div>
        <div class="order-body">
          <span class="order-caption">{{ item.task_title }}</span>
          <span class="order-title-1"
            >需要人数：{{ item.need_people_text }}人（1人已接单）</span
          >
          <span v-if="item.task_time" class="order-title-1"
            >完成时间：{{ item.task_time }}</span
          >
          <span v-if="item.address_text" class="order-title-1">{{
            item.address_text
          }}</span>
        </div>
        <div class="order-footer">
          <div class="order-footer-item">
            <div class="order-view-1" @click.stop="openMoreDialog">
              <span class="tf-icon tf-icon-gengduo1 order-icon-1"></span>
              <span class="order-tag">更多</span>
            </div>
            <div v-if="+item.is_schedule" class="order-view-1" @click.stop="goSchedule(item)">
              <span class="tf-icon tf-icon-zhiyuan2 order-icon-1"></span>
              <span class="order-tag">进度</span>
            </div>
          </div>
          <div v-if="item.text" class="order-footer-item">
            <span class="order-caption-1"
              >剩余<van-count-down :time="item.task_etime" @finish="reload"
            /></span>
            <span class="order-title">{{item.text}}</span>
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
</template>

<script>
// /pages/task/personage/index
import refreshList from '@/components/tf-refresh-list'
import { getMyTaskList } from '@/api/task'
export default {
  components: {
    refreshList
  },
  data () {
    return {
      list: []
    }
  },
  created () {},
  methods: {
    // 获取我的发布任务
    getList (params) {
      return getMyTaskList(params)
    },
    // 打开更多
    openMoreDialog () {},
    // 任务进度
    goSchedule () {
      this.$router.push({
        name: 'scheduleReceiver'
      })
    },
    // 邻里-任务详情
    goDetails () {
      this.$router.push({
        name: 'taskDetail'
      })
    },
    // 我的任务详情
    goTask () {
      this.$router.push({
        name: 'PersonageTaskDetails'
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

.order-text {
  margin-left: 20px;
  font-size: 28px;
  color: #8f8f94;
}
</style>
