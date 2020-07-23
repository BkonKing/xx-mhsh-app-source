<template>
  <div class="tf-clist-cell" @click="onClick">
    <div class="tf-clist-cell-left">{{ title }}</div>
    <div class="tf-clist-cell-right">
      <slot name="right"></slot>
      <span v-if="showArrow" class="tf-icon tf-icon-right uni-icon-wrapper"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    showArrow: {
      // 是否显示箭头
      type: [Boolean, Number],
      default: true
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.tf-clist-cell {
  @flex();
  justify-content: space-between;
  align-items: center;
  // width: 710px;
  height: 90px;
  padding: 20px;
}

.tf-clist-cell-left {
  // height: 50px;
  // line-height: 50px;
  font-size: 28px;
  width: 200px;
}

.tf-clist-cell-right {
  @flex();
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  // padding-right: 40px;
  // height: 50px;
  // line-height: 50px;
}
.uni-icon-wrapper {
  // position: absolute;
  // height: 40px;
  // top: 50%;
  // right: 10px;
  // transform: translateY(-20px);
}
</style>
