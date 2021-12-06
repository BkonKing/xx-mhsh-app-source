<template>
  <div class="statistics-info">
    <div class="statistics-info-num">{{ num }}</div>
    <div class="statistics-info-title">{{ title }}</div>
    <div class="statistics-info-text">
      昨日<span :class="{ 'is-have': +yNum }">{{ yNum }}</span>
    </div>
    <div v-if="border" class="right-line"></div>
  </div>
</template>

<script>
export default {
  name: 'StatisticsInfo',
  props: {
    num: {
      type: [Number, String],
      default: ''
    },
    yNum: {
      type: [Number, String],
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.statistics-info {
  width: 100%;
  position: relative;
  text-align: center;
  > div {
    line-height: 1;
  }
  &-num {
    margin-bottom: 18px;
    font-size: 36px;
    font-weight: bold;
    color: #222222;
  }
  &-title {
    margin-bottom: 14px;
    font-size: 24px;
    color: #222222;
  }
  &-text {
    font-size: 24px;
    color: #8f8f94;
    .is-have {
      color: #ef4a37;
    }
  }
  .right-line {
    width: 1px;
    height: 48px;
    margin-top: -24px;
    position: absolute;
    top: 50%;
    right: 0;
    background: #eeeeee;
  }
}
</style>
