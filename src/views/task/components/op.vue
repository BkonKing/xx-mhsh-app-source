<template>
  <div class="op-block">
    <div class="bottom-fiex tf-row">
      <div class="op-left tf-row">
        <div @click="quiz" class="tf-column">
          <img src="@/assets/img/task_05.png" />
          <div>提问</div>
        </div>
        <div class="tf-column">
          <img src="@/assets/img/task_06.png" />
          <div>联系</div>
        </div>
        <div class="tf-column">
          <img src="@/assets/img/task_07.png" />
          <div>分享</div>
        </div>
        <div @click="schedule" class="tf-column">
          <img src="@/assets/img/task_08.png" />
          <div>进度</div>
        </div>
      </div>
      <div v-if="rightShow" class="op-right" @click="opCall()">{{ rightTxt }}</div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    taskId: {
      type: String,
      default: ''
    },
    rightTxt: {
      type: String,
      default: ''
    },
    rightShow: {
      type: Boolean,
      default: false
    },
    isOwn: {
      type: [Boolean, Number],
      default: false
    }
  },
  data () {
    return {
      selectIndex: this.value
    }
  },
  created () {
  },
  methods: {
    opCall () {
      this.$emit('opCall')
    },
    // 提问
    quiz () {
      this.$router.push({
        name: 'operateQuiz',
        query: {
          isOwn: this.isOwn,
          taskId: this.taskId
        }
      })
    },
    schedule () {
      const routerName = this.isOwn ? 'scheduleInitiator' : 'scheduleReceiver'
      this.$router.push({
        name: routerName,
        query: {
          isOwn: this.isOwn
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.op-block {
  height: 98px;
  .bottom-fiex {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 98px;
    background: #FFFFFF;
    z-index: 12;
  }
  .op-left {
    height: 100%;
    padding-left: 10px;
    & > div {
      height: 100%;
      width: 116px;
      align-items: center;
      padding-top: 20px;
      img {
        height: 36px;
        width: 36px;
      }
      div {
        text-align: center;
        color: #8F8F94;
        font-size: 24px;
        line-height: 40px;
      }
    }
  }
  .op-right {
    width: 300px;
    height: 100%;
    background: #FF5240;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 98px;
    text-align: center;
  }
}
</style>
