<template>
  <ul class="task-ul">
    <li
      class="task-item"
      v-for="task in data"
      :key="task.task_id"
      @click="goTaskDetail(task)"
    >
      <span class="tf-icon tf-icon-xingfubi1"></span>
      <span class="task-num">+{{ task.reward_happiness }}</span>
      <span class="task-text task-username">{{ task.nickname }}</span>
      <span class="task-text">发布了</span>
      <span class="task-title">{{ task.task_title }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'taskUl',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 跳转任务详情
    goTaskDetail ({ task_id }) {
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

<style lang="less" scoped>
.task-item {
  display: flex;
  align-items: center;
  padding-bottom: 30px;
}
.tf-icon-xingfubi1 {
  font-size: 28px;
  line-height: 1;
  color: #febf00;
}
.task-num {
  min-width: 91px;
  margin-left: 10px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
  color: #febf00;
}
.task-text {
  font-size: 24px;
  line-height: 1;
  color: #8f8f94;
}
.task-username {
  max-width: 126px;
  @text-ellipsis();
}
.task-title {
  flex: 1;
  margin-left: 10px;
  font-size: 24px;
  line-height: 1;
  color: #333;
  @text-ellipsis();
}
</style>
