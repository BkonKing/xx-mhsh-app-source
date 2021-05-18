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
        v-if="data.length > 1"
        class="task-swipe"
        vertical
        :autoplay="6000"
        :show-indicators="false"
      >
        <van-swipe-item v-for="(item, i) in data" :key="i">
          <task-ul class="task-ul" :data="item"></task-ul>
        </van-swipe-item>
      </van-swipe>
      <task-ul v-else class="task-swipe" :data="data[0]" style="height: auto;"></task-ul>
    </template>
  </div>
</template>

<script>
import taskUl from './task-ul'

export default {
  name: 'homeTask',
  components: {
    taskUl
  },
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
  }
}
</style>
