<template>
  <div class="radio-btn-group">
    <div class="radio-btn__item" v-for="(item, i) in data" :key="i" :class="{'radio-btn--active': value === item.value}" @click="change(item.value)" :style="{'border-radius': `${radius}px`}">
      <div class="radio-btn__text" :class="{'radio-btn__text--active': value === item.value}">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    radius: {
      type: Number,
      default: 6
    }
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    change (value) {
      this.value = value
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="less" scoped>
.radio-btn-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.radio-btn__item {
  height: 88px;
  margin-right: 20px;
  padding: 0 20px;
  background-color: @background-color;
  margin-bottom: @padding-lg;
  border-width: 3px;
  border-style: solid;
  border-color: @background-color;
}
.radio-btn__text {
  font-size: @font-size-md;
  color: #666;
  line-height: 88px;
}
.radio-btn--active {
  border-width: 3px;
  border-style: solid;
  border-color: @red-dark;
  background-color: #fff;
}
.radio-btn__text--active {
  color: @red-dark;
}
</style>
