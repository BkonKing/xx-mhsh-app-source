<template>
  <div class="type-list tf-row-wrap">
    <div @click="radioSelect(index)" v-for="(item, index) in radioList" :key="index" :class="[selectIndex === index ? 'cur': '', 'type-item']">{{ item.text }}</div>
    <!-- <div class="type-item">生活分享</div>
    <div class="type-item">知识分享</div>
    <div class="type-item">生活分享</div> -->
  </div>
</template>

<script>
import {
  Popup
} from 'vant'
export default {
  components: {
    [Popup.name]: Popup
  },
  props: {
    value: {
      type: Number,
      default: -1
    },
    radioList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selectIndex: this.value
    }
  },
  created () {
  },
  methods: {
    radioSelect (index) {
      this.selectIndex = index
      this.$emit('selectCall', index)
    }
  },
  watch: {
    value (val) {
      this.selectIndex = val
    },
    selectIndex (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
.type-list {
  margin-right: -6px;
}
.type-item {
  height: 64px;
  line-height: 64px;
  background: #F7F7F7;
  border-radius: 10px;
  font-size: 24px;
  padding: 0 28px;
  margin-right: 22px;
  margin-bottom: 20px;
  &.cur {
    background: #FFEDEB;
    color: #FF5240;
  }
}
</style>
