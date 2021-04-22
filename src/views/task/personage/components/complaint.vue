<template>
  <refreshList :list.sync="list" :load="getList">
    <template v-slot="{ item }">
      <div class="complaint-wrapper" @click="goDetails">
        <div class="complaint-header">
          <span class="complaint-title">投诉时间：2021-03-10 12:00:00</span>
          <span class="complaint-caption">已处理</span>
        </div>
        <div class="complaint-body">
          <span class="complaint-title-1">投诉类型：不合理要求</span>
          <span class="complaint-summary"
            >投诉描述内容内容投诉描述内容内容投诉描述内容内容投诉描述内容内容投诉描述内容内容投诉描述内容内容诉描述内容内容投诉描述内容内容投诉描述内容内容</span
          >
          <div class="complaint-group-1">
            <div class="complaint-view">
              <img
                class="complaint-large-icon"
                src="https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/ceb195f0a30911eb87dd518891254080.png"
              />
            </div>
            <div class="complaint-view-1">
              <span class="complaint-nick-name">王晓红</span>
              <span class="complaint-caption-1"
                >五凤兰庭小区清洁志愿者招募</span
              >
            </div>
          </div>
          <div class="complaint-group-2">
            <span class="complaint-text">处理回复：</span
            >投诉描述内容内容投诉描述内容内容投诉描述内容内容投诉描述内容内容投诉描述内容内投诉描述内容内容投诉描述内容内容投诉描述内投诉描述内容内容投诉描述内容内容投诉描述
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
    goDetails () {
      this.$router.push({
        name: 'TaskComplaintDetails'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./complaint.less');
</style>
