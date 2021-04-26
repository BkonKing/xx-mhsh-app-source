<template>
  <refreshList ref="list" :list.sync="list" :load="getList">
    <template v-slot="{ item }">
      <div class="order-wrapper" @click="goTask">
        <div class="order-header">
          <div class="order-view">
            <span class="tf-icon tf-icon-xingfubi1 order-icon"></span>
            <span class="order-num">{{ item.id }}</span>
          </div>
          <span class="order-title">进行中</span>
        </div>
        <div class="order-body">
          <span class="order-caption">五凤兰庭清洁志愿者招募</span>
          <span class="order-title-1">完成时间：截止2021-03-10 12:00</span>
          <span class="order-title-1"
            >完成地点：三盛滨江国际1号楼 线下科技</span
          >
        </div>
        <div class="order-footer">
          <div class="order-footer-item">
            <div class="order-view-1" @click.stop="makePhoneCall(item)">
              <span class="tf-icon tf-icon-lianxi order-icon-1"></span>
              <span class="order-tag">联系</span>
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
            <span class="order-caption-1"
              >剩余<van-count-down
                :time="30 * 60 * 60 * parseInt(item.id)"
                @finish="reload"
            /></span>
            <van-button
              class="order-button-wrapper"
              @click.stop="goDetails(item)"
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
    // 联系
    makePhoneCall (phoneNumber) {
      api.call({
        type: 'tel_prompt',
        number: phoneNumber
      })
    },
    // 任务进度
    goSchedule (item) {
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

.order-caption-1 {
  display: flex;
  align-items: center;
  margin-top: -2px;
  margin-right: 20px;
  line-height: 28px;
  color: #000000;
  font-size: 28px;
}

.order-button-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -1px;
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
