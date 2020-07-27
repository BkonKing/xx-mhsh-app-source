<template>
  <div class="tf-clist-box" @click="onClick">
    <div class="tf-clist-cell" :class="{'tf-clist-border': border}">
      <div class="tf-clist-cell-left">
      <img v-if="image" class="tf-clist-cell__image" :src="image" />
      <div>{{ title }}</div>
    </div>
    <div class="tf-clist-cell-right">
      <slot name="right">
        <div class="tf-text" v-if="rightText">{{rightText}}</div>
      </slot>
      <div v-if="showArrow" class="tf-icon tf-icon-right"></div>
    </div>
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
    },
    image: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    },
    rightText: {
      type: String,
      default: ''
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
.tf-clist-box {
  width: 100%;
  height: 90px;
  padding: 0 30px;
}
.tf-clist-cell {
  @flex();
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  // width: 710px;
}

.tf-clist-cell-left {
  // height: 50px;
  // line-height: 50px;
  display: flex;
  align-items: center;
  font-size: 28px;
  flex: 1;
  .tf-clist-cell__image {
    width: 44px;
    height: 44px;
    margin-right: 20px;
  }
}

.tf-clist-cell-right {
  @flex();
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  .tf-text {
    flex: 1;
    max-width: 450px;
    text-align: right;
    @text-ellipsis();
  }
  // padding-right: 40px;
  // height: 50px;
  // line-height: 50px;
}

.tf-clist-border {
  border-bottom: 1px solid @divider-color;
}

.tf-icon-right {
  width: 26px;
  font-size: 26px;
  color: #aaa;
  margin-left: 10px;
}
</style>
