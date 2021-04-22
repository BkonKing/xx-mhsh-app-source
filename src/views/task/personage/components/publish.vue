<template>
  <refreshList :list.sync="list" :load="getList">
    <template v-slot="{ item }">
      <div class="publish-wrapper">
        <div class="publish-header">
          <div class="publish-view">
            <img
              class="publish-icon"
              src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/ac2d12f0a28411eb91bf2b62ae51e7f0.png"
            />
            <span class="publish-num">{{ item.id }}</span>
            <span class="publish-text">(100幸福币/人)</span>
          </div>
          <span class="publish-title">进行中</span>
        </div>
        <div class="publish-body">
          <span class="publish-caption">五凤兰庭清洁志愿者招募</span>
          <span class="publish-title-1">需要人数：10人（1人已接单）</span>
          <span class="publish-title-1">完成时间：截止2021-03-10 12:00</span>
          <span class="publish-title-1">完成地点：三盛滨江国际1号楼 线下科技</span>
        </div>
        <div class="publish-footer">
          <div class="publish-footer-item">
            <div class="publish-view-1">
              <img
                class="publish-icon-1"
                src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/abe90510a28411eb87dd518891254080.png"
              />
              <span class="publish-tag">联系</span>
            </div>
            <div class="publish-view-1">
              <img
                class="publish-icon-1"
                src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/abe90510a28411eb87dd518891254080.png"
              />
              <span class="publish-tag">进度</span>
            </div>
          </div>
          <div class="publish-footer-item">
            <span class="publish-title">2人待确认完成</span>
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
    }
  }
}
</script>

<style lang="less" scoped>
.publish-wrapper {
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  border-radius: 10px;
  background-color: #ffffff;
}

.publish-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 92px;
  border-bottom: 1px solid #eeeeee;
}

.publish-view {
  display: flex;
  align-items: center;
}

.publish-icon {
  margin-right: 20px;
  width: 32px;
  height: 32px;
}

.publish-num {
  margin-top: -1px;
  text-align: left;
  line-height: 32px;
  color: #febf00;
  font-size: 32px;
}

.publish-text {
  margin-left: 20px;
  font-size: 28px;
color: #8F8F94;
}

.publish-title {
  text-align: left;
  line-height: 26px;
  color: #ff6555;
  font-size: 26px;
}

.publish-body {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  padding-bottom: 40px;
  border-bottom: 1px solid #eeeeee;
}

.publish-caption {
  margin-top: 40px;
  max-width: 649px;
  height: 31px;
  text-align: left;
  text-overflow: ellipsis;
  line-height: 32px;
  color: #222222;
  font-size: 32px;
}

.publish-title-1 {
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

.publish-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 127px;
}

.publish-footer-item {
  display: flex;
  align-items: center;
}

.publish-view-1 {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 39px;
}

.publish-icon-1 {
  width: 36px;
  height: 36px;
}

.publish-tag {
  margin-top: 10px;
  line-height: 22px;
  color: #bbbbbb;
  font-size: 22px;
}
</style>
