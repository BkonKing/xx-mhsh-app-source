<template>
  <task-card :cardTit="cardTit">
    <div slot="content">
      <div v-if="radioIndex > -1" class="label-block">
        <div @click="radioToggle" class="lable-tit tf-row-space-between">
          <div>{{ radioList[radioIndex].text }}</div>
          <div :class="[radioShow ? 'arrow-rorate' : '', 'right-arrow van-icon van-icon-arrow']"></div>
        </div>
        <div v-show="radioShow" class="radio-block">
          <radio-list v-model="radioIndex" :radioList="radioList" @selectCall="postCall"></radio-list>
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
      default: '小组类型'
    },
    radioList: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      radioShow: false, // 小组类型显示
      radioIndex: -1 // 类型选中项
    }
  },
  created () {
    // console.log('this.typeIndex', this.typeIndex)
  },
  methods: {
    // 设置选中项
    setType (val) {
      this.radioIndex = val
    },
    // 选择小组类型
    postCall (index) {
      this.$emit('selectCall', index)
      this.radioToggle()
    },
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
