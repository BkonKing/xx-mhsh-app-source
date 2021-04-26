<template>
  <refreshList :list.sync="list" :load="getList">
    <template v-slot="{ item }">
      <div class="complaint-wrapper" @click="goTask(item)">
        <div class="complaint-header">
          <span class="complaint-title">投诉时间：2021-03-10 12:00:00</span>
          <span
            class="complaint-caption"
            :class="{ 'complaint-caption-ing': item.id == 78 }"
            >已处理</span
          >
        </div>
        <div class="complaint-body">
          <span class="complaint-title-1">投诉类型：不合理要求</span>
          <span class="complaint-summary">{{ item.content }}</span>
          <div class="complaint-group-1">
            <div class="complaint-view">
              <img
                class="complaint-large-icon"
                src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/ceb195f0a30911eb87dd518891254080.png"
              />
            </div>
            <div class="complaint-view-1" @click.stop="goDetails(item)">
              <span class="complaint-nick-name">王晓红</span>
              <span class="complaint-caption-1"
                >五凤兰庭小区清洁志愿者招募</span
              >
            </div>
          </div>
          <div v-if="item.content" class="complaint-group-2">
            <span class="complaint-text">处理回复：</span>{{ item.content }}
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
    // 邻里-任务详情
    goDetails () {
      this.$router.push({
        name: 'taskDetail'
      })
    },
    // 任务投诉详情
    goTask () {
      this.$router.push({
        name: 'TaskComplaintDetails'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url("./complaint.less");

.complaint-caption {
  font-size: 26px;
  line-height: 1;
}

.complaint-caption-ing {
  color: #ff6555;
}
</style>
