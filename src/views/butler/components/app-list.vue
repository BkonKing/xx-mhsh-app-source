<template>
  <van-grid class="tf-bg-white" :border="false" :column-num="column" square>
    <van-grid-item v-for="(item, index) in list"
      :key="index" :to="item.url">
      <van-image class="grid-item__image" :src="item.icon_image" />
      <span class="grid-item__text">{{item.application}}</span>
    </van-grid-item>
  </van-grid>
</template>

<script>
import { appPages } from '@/const/butler.js'
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
  },
  data () {
    return {
      appPages
    }
  }
}
</script>

<style lang="less" scoped>
.tf-bg-white {
  position: relative;
  margin: 20px;
  display: flex;
  padding: 40px 20px;
  z-index: 1;
  border-radius: @border-radius-md;
}
.grid-item__image {
    width: 60px;
  height: 60px;
  margin-bottom: @padding-md;
}
.grid-item__text {
  font-size: 24px;
  color: @text-color;
}
</style>
