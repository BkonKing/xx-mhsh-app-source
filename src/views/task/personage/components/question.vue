<template>
  <refreshList :list.sync="list" :load="getList">
    <template v-slot="{ item }">
      <div class="complaint-wrapper" @click="goQuiz(item)">
        <div class="complaint-header">
          <span class="complaint-title">提问时间：{{ item.ctime }}</span>
        </div>
        <div class="complaint-body">
          <span class="complaint-summary">{{ item.content }}</span>
          <div v-if="item.hf_content" class="complaint-group-2">
            <div class="complaint-group-div">
              <span class="complaint-text">回复：</span>{{ item.hf_content }}
            </div>
          </div>
          <div class="complaint-group-1" @click.stop="goDetails(item)">
            <span class="complaint-caption-1">任务：{{ item.task_title }}</span>
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
import { getMyQuestionList } from '@/api/task'
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
    // 获取我的提问
    getList (params) {
      return getMyQuestionList(params)
    },
    // 跳转到任务提问
    goQuiz ({ task_id }) {
      this.$router.push({
        name: 'operateQuiz',
        query: {
          taskId: task_id
        }
      })
    },
    // 邻里-任务详情
    goDetails ({ task_id }) {
      this.$router.push({
        name: 'taskDetail',
        query: {
          taskId: task_id
        }
      })
    }
  }
}
</script>

<style lang="less" src="./complaint.less" scoped>
</style>
