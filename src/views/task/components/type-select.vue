<template>
  <task-card cardTit="小组类型">
    <div slot="content">
      <div class="label-block">
        <div @click="radioToggle" class="lable-tit tf-row-space-between">
          <div>知识分享</div>
          <div :class="[radioShow ? 'arrow-rorate' : '', 'right-arrow van-icon van-icon-arrow']"></div>
        </div>
        <div v-show="radioShow" class="radio-block">
          <radio-list v-model="radioIndex"></radio-list>
        </div>
      </div>
    </div>
  </task-card>
</template>

<script>
import taskCard from './task-card'
import radioList from './radio-list'
export default {
  components: {
    taskCard,
    radioList
  },
  props: {
    cardTit: {
      type: String,
      default: ''
    },
    phTxt: {
      type: String,
      default: ''
    },
    maxNum: {
      type: Number,
      default: 500
    }
  },
  data () {
    return {
      radioShow: false, // 小组类型显示
      radioIndex: 0 // 类型选中项
    }
  },
  created () {
  },
  methods: {
    // 小组类型消失隐藏
    radioToggle () {
      this.radioShow = !this.radioShow
    }
  }
}
</script>

<style lang="less" scoped>
.lable-tit {
  height: 36px;
  align-items: center;
  font-size: 32px;
  padding: 0 30px;
  margin-top: 26px;
  margin-bottom: 37px;
  .right-arrow {
    width: 36px;
    height: 100%;
    line-height: 36px;
    text-align: center;
    color: #aaa;
    transition: all 0.3s;
    &.arrow-rorate {
      transform: rotate(-90deg);
    }
  }
}
.radio-block {
  margin-top: 47px;
  padding-left: 20px;
}
</style>
