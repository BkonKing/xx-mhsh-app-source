<template>
  <van-collapse v-model="activeNames">
    <van-collapse-item v-for="(item, i) in data" :key="item.id" :name="i">
      <template #title>
        <div class="tf-van-collapse-item__title">
          <div class="question-index-box">Q{{i + 1}}</div>
          {{item.question}}
        </div>
      </template>
      <div class="question-content" v-html="item.answer.replace(/\r\n/g, '<br/>')"></div>
    </van-collapse-item>
  </van-collapse>
</template>

<script>
import { Collapse, CollapseItem } from 'vant'

export default {
  name: 'FAQ',
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeNames: []
    }
  }
}
</script>

<style lang="less" scoped>
.question-index-box {
  width: 72px;
  height: 45px;
  line-height: 45px;
  font-size: 24px;
  margin-right: @padding-md;
  color: #fff;
  background-color: @gray-8;
  text-align: center;
}
.question-content {
  font-size: 26px;
  color: #666;
  line-height: 54px;
  padding: 0 30px 30px;
}

/deep/ .van-collapse-item__title {
  display: flex;
  align-items: center;
  padding: 0 30px;
}
.tf-van-collapse-item__title {
  display: flex;
  padding: 30px 30px 30px 0;
  align-items: center;
}
</style>
