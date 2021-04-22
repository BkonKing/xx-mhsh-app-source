<template>
  <refreshList :list.sync="list" :load="getList">
    <template v-slot="{ item }">
      <div class="order-wrapper" @click="goTask">
        <div class="order-header">
          <div class="order-view">
            <img
              class="order-icon"
              src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/ac2d12f0a28411eb91bf2b62ae51e7f0.png"
            />
            <span class="order-num">{{ item.id }}</span>
          </div>
          <span class="order-title">进行中</span>
        </div>
        <div class="order-body">
          <span class="order-caption">五凤兰庭清洁志愿者招募</span>
          <span class="order-title-1">完成时间：截止2021-03-10 12:00</span>
          <span class="order-title-1">完成地点：三盛滨江国际1号楼 线下科技</span>
        </div>
        <div class="order-footer">
          <div class="order-footer-item">
            <div class="order-view-1">
              <img
                class="order-icon-1"
                src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/abe90510a28411eb87dd518891254080.png"
              />
              <span class="order-tag">联系</span>
            </div>
            <div class="order-view-1">
              <img
                class="order-icon-1"
                src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/abe90510a28411eb87dd518891254080.png"
              />
              <span class="order-tag">进度</span>
            </div>
          </div>
          <div class="order-footer-item">
            <span class="order-caption-1">剩余<van-count-down :time="30 * 60 * 60 * parseInt(item.id)"/></span>
            <van-button class="order-button-wrapper">交付任务</van-button>
          </div>
        </div>
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
    goTask () {
      this.$router.push({
        name: 'PersonageTaskDetails'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.order-wrapper {
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  border-radius: 10px;
  background-color: #ffffff;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 92px;
  border-bottom: 1px solid #eeeeee;
}

.order-view {
  display: flex;
  align-items: center;
}

.order-icon {
  margin-right: 20px;
  width: 32px;
  height: 32px;
}

.order-num {
  margin-top: -1px;
  text-align: left;
  line-height: 32px;
  color: #febf00;
  font-size: 32px;
}

.order-title {
  text-align: left;
  line-height: 26px;
  color: #ff6555;
  font-size: 26px;
}

.order-body {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  padding-bottom: 40px;
  border-bottom: 1px solid #eeeeee;
}

.order-caption {
  margin-top: 40px;
  max-width: 649px;
  height: 31px;
  text-align: left;
  text-overflow: ellipsis;
  line-height: 32px;
  color: #222222;
  font-size: 32px;
}

.order-title-1 {
  position: relative;
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

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 127px;
}

.order-footer-item {
  display: flex;
  align-items: center;
}

.order-view-1 {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 39px;
}

.order-icon-1 {
  width: 36px;
  height: 36px;
}

.order-tag {
  margin-top: 10px;
  line-height: 22px;
  color: #bbbbbb;
  font-size: 22px;
}

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
