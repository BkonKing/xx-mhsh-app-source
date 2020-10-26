<template>
  <van-grid class="app-box" :border="false" :column-num="column" square>
    <van-grid-item v-for="(item, index) in list" :key="index" :to="item.url">
      <van-image
        class="app-box__image"
        :src="item.icon_image"
        v-imageCach="item.icon_image"
      />
      <span class="app-box__text">{{ item.application }}</span>
    </van-grid-item>
  </van-grid>
</template>

<script>
import { Grid, GridItem, Image } from 'vant'
export default {
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image
  },
  props: {
    column: {
      type: Number,
      default: 5
    },
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
.app-box {
  display: flex;
  position: relative;
  z-index: 1;
  margin: 20px;
  padding: 40px 20px;
  border-radius: @border-radius-md;
  background: #fff;
  &__image {
    width: 60px;
    height: 60px;
    margin-bottom: @padding-md;
  }
  &__text {
    font-size: 24px;
    color: @text-color;
  }
  /deep/ .van-grid-item__content {
    padding: 0;
  }
}
</style>
