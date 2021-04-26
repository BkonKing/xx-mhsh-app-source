<template>
  <refreshList :list.sync="list" :load="getList">
    <template v-slot="{ item }">
      <div class="order-wrapper" @click="goTask">
        <div class="order-header">
          <div class="order-view">
            <span class="tf-icon tf-icon-xingfubi1 order-icon"></span>
            <span class="order-num">{{ item.id }}</span>
            <span class="order-text">(100幸福币/人)</span>
          </div>
          <span class="order-title">进行中</span>
        </div>
        <div class="order-body">
          <span class="order-caption">五凤兰庭清洁志愿者招募</span>
          <span class="order-title-1">需要人数：10人（1人已接单）</span>
          <span class="order-title-1">完成时间：截止2021-03-10 12:00</span>
          <span class="order-title-1"
            >完成地点：三盛滨江国际1号楼 线下科技</span
          >
        </div>
        <div class="order-footer">
          <div class="order-footer-item">
            <div class="order-view-1" @click.stop="openMoreDialog">
              <span class="tf-icon tf-icon-gengduo1 order-icon-1"></span>
              <span class="order-tag">更多</span>
            </div>
            <div class="order-view-1" @click.stop="goSchedule(item)">
              <img
                class="order-icon-1"
                src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/abe90510a28411eb87dd518891254080.png"
              />
              <span class="order-tag">进度</span>
            </div>
          </div>
          <div class="order-footer-item">
            <span class="order-title">2人待确认完成</span>
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
import { getRepairList } from '@/api/butler.js'
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
    // 获取我的报事报修
    getList (params) {
      const len = this.list.length
      const id = len && params.pages !== 1 ? this.list[len - 1].id : ''
      return getRepairList({
        repairId: id
      })
    },
    // 打开更多
    openMoreDialog () {

    },
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
