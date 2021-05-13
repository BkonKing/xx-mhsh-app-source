<template>
  <refreshList ref="list" :list.sync="list" :load="getList">
    <template v-slot="{ item }">
      <div class="order-wrapper" @click="goTask(item)">
        <div class="order-header">
          <div class="order-view">
            <span class="tf-icon tf-icon-xingfubi1 order-icon"></span>
            <span class="order-num">{{ item.reward_happiness }}</span>
          </div>
          <span
            class="order-title"
            :class="{ 'order-title-grey': +item.progress_status < 2 }"
            >{{ item.progress_status_name }}</span
          >
        </div>
        <div class="order-body">
          <span class="order-caption">{{ item.task_title }}</span>
          <span v-if="item.task_time" class="order-title-1"
            >完成时间：{{ item.task_time }}</span
          >
          <span v-if="item.address_text" class="order-title-1"
            >完成地点：{{ item.item.address_text }}</span
          >
        </div>
        <div class="order-footer">
          <div class="order-footer-item">
            <div class="order-view-1" @click.stop="makePhoneCall(item.task_mobile)">
              <span class="tf-icon tf-icon-lianxi order-icon-1"></span>
              <span class="order-tag">联系</span>
            </div>
            <div class="order-view-1" @click.stop="goSchedule(item)">
              <span class="tf-icon tf-icon-ziyuan2 order-icon-1"></span>
              <span class="order-tag">进度</span>
            </div>
          </div>
          <div class="order-footer-item">
            <span v-if="item.task_etime" class="order-caption-1"
              >剩余<van-count-down :time="item.task_etime" @finish="reload"
            /></span>
            <span class="order-caption-text" v-else>{{item.text}}</span>
            <van-button
              v-if="+item.is_can_submit"
              class="order-button-wrapper"
              @click.stop="goTask(item)"
              >交付任务</van-button
            >
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
import { getUserTaskList } from '@/api/task'
export default {
  components: {
    refreshList
  },
  data () {
    return {
      // 0已接单、1进行中、2已完成、3已淘汰、4已放弃、5已终止
      list: []
    }
  },
  created () {},
  methods: {
    // 获取我的报事报修
    getList (params) {
      return getUserTaskList(params)
    },
    // 联系
    makePhoneCall (phoneNumber) {
      api.call({
        type: 'tel_prompt',
        number: phoneNumber
      })
    },
    // 任务进度
    goSchedule ({ task_id }) {
      this.$router.push({
        name: 'scheduleReceiver',
        query: {
          taskId: task_id
        }
      })
    },
    // 任务详情
    goTask ({ task_id }) {
      this.$router.push({
        name: 'taskDetail',
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

.order-button-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -1px;
  margin-left: 20px;
  border-radius: 10px;
  border: none;
  background-color: #ff6555;
  min-width: 140px;
  height: 64px;
  padding: 0 19px;
  color: #ffffff;
  line-height: 26px;
  font-size: 26px;
}
</style>
