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
      <div v-if="data.length > 5" class="task-swipe">
        <swiper class="task-ul" ref="mySwiper" :options="swiperOptions">
          <swiper-slide v-for="(task, i) in data" :key="i">
            <div class="task-item" @click="goTaskDetail(task)">
              <span class="tf-icon tf-icon-xingfubi1"></span>
              <span class="task-num">+{{ task.reward_happiness }}</span>
              <span class="task-text task-username">{{ task.nickname }}</span>
              <span class="task-text">发布了</span>
              <span class="task-title">{{ task.task_title }}</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <ul v-else class="task-swipe task-ul" style="height: auto;">
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
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'

export default {
  name: 'homeTask',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      swipeTime: 6000,
      swiperOptions: {
        direction: 'vertical',
        slidesPerView: 5,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      }
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
