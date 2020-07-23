<template>
  <div class="tf-row-space-between tf-flex-item">
    <div class="user-info__left-box">
      <img class="tf-avatar tf-mr-base" :src="avatar" mode="aspectFit">
      <slot name="left">
        <div class="tf-space-around">
          <div class="user-info--name">{{name}}</div>
          <div class="user-info-time">{{time}}</div>
        </div>
      </slot>
    </div>
    <div class="user-info__right-box">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
const stringProp = {
  type: String,
  default: ''
}
export default {
  props: {
    avatar: stringProp,
    name: stringProp,
    time: stringProp
  }
}
</script>

<style lang="less" scoped>
  .user-info--name {
    font-size: 30px;
    font-weight: 500;
    color: @text-color;
  }
  .user-info-time {
    font-size: 24px;
    color: @gray-7
  }
  .user-info__left-box {
    @flex();
    flex: 1;
    height: 88px;
  }
  .user-info__right-box {
    flex-direction: row;
    align-items: center;
  }
</style>
