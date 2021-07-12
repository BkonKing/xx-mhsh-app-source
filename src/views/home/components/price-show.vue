<template>
  <div class="price-show-tag">
    <span v-if="+money || (+money === 0 && +credit === 0)"><span class="price-icon">￥</span>{{ money }}</span>
    <span class="plus-span" v-if="+money && +credit">+</span>
    <template v-if="+credit">
      <span class="price-icon tf-icon tf-icon-xingfubi1"></span>
      <span>{{ credit }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'price-show',
  props: {
    money: {
      type: [String, Number],
      default: 0
    },
    credit: {
      type: [String, Number],
      default: 0
    }
  }
}
</script>

<style lang="less" scoped>
.price-show-tag {
  display: flex;
  justify-content: center;
  align-items: center;
  /* font-size: 24px; */
  line-height: 1;
  color: #ff6555;
  span {
    line-height: 1;
  }
}
.plus-span {
  margin: 0 2px;
}
.tf-icon-xingfubi1 {
  margin-right: 2px;
}
</style>
