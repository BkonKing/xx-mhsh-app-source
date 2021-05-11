<template>
  <div class="task-box">
    <div class="task-bg2"></div>
    <div class="task-box__header">
      <div ref="sign" class="task-box__title" @click="goTask">
        <img class="task-box__header-logo" src="@/assets/imgs/home_task.png" />
        <span class="tf-icon tf-icon-right"></span>
      </div>
    </div>
    <template>
      <van-swipe
        v-if="0"
        class="task-swipe"
        vertical
        :autoplay="6000"
        :show-indicators="false"
      >
        <van-swipe-item v-for="(item, i) in data" :key="i">
          <ul class="task-ul">
            <li
              class="task-item"
              v-for="i in 4"
              :key="i"
              @click="goTaskDetail()"
            >
              <span class="tf-icon tf-icon-xingfubi1"></span>
              <span class="task-num">+{{ i }}000</span>
              <span class="task-text task-username">王小明王小明</span>
              <span class="task-text">发布了</span>
              <span class="task-title"
                >任务标题任务标题任务任标题任务任题任务任</span
              >
            </li>
          </ul>
        </van-swipe-item>
      </van-swipe>
      <ul class="task-swipe" style="height: auto;" v-else>
        <li class="task-item" v-for="i in 4" :key="i" @click="goTask">
          <span class="tf-icon tf-icon-xingfubi1"></span>
          <span class="task-num">+{{ i }}000</span>
          <span class="task-text task-username">王小明王小明</span>
          <span class="task-text">发布了</span>
          <span class="task-title"
            >任务标题任务标题任务任标题任务任题任务任</span
          >
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  name: 'homeTask',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 跳转任务
    goTask () {
      this.$router.push({
        path: '/neighbours',
        query: {
          active: 4
        }
      })
    },
    // 跳转任务详情
    goTaskDetail ({ id }) {
      this.$router.push({
        name: 'taskDetail',
        query: {
          active: 4
        }
      })
    }
  }
}
</script>

<style lang="less">
// 任务专区
.task-box {
  padding: 0 30px;
  margin: 0 20px 40px;
  padding-bottom: 30px;
  background: #ffefc0;
  background-image: url("~@/assets/imgs/home_task_bg.png");
  background-size: 100% 160px;
  background-repeat: no-repeat;
  border-radius: 10px;
  overflow: hidden;
  &__header {
    padding: 38px 0 40px;
    &-logo {
      height: 36px;
    }
  }
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tf-icon-right {
      font-size: 24px;
      color: #38383866;
    }
  }
  .task-swipe {
    height: 320px;
    padding: 30px 30px 0;
    background: #ffffff;
    border-radius: 10px;
    .task-ul {
      display: flex;
      flex-direction: column;
      height: 290px;
    }
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
      width: 126px;
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
  }
}
</style>
