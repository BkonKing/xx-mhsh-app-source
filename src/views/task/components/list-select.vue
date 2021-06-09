<template>
  <div class="body">
    <van-popup v-model="selectShow">
      <div class="select-list">
        <div @click="onSelect(index)" v-for="(item ,index) in selectList" :key="index" class="select-item tf-vertical-center" :class="{'item-big': item.detail}">
          <div :class="{'color-FF5240': item.name == 'delete'}">{{ item.text }}</div>
          <span v-if="item.detail">{{ item.detail }}</span>
        </div>
      </div>
    </van-popup>
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
      type: Boolean,
      default: false
    },
    selectList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selectShow: this.value
    }
  },
  created () {
  },
  methods: {
    onSelect (index) {
      this.selectShow = false
      this.$emit('selectCall', this.selectList[index])
    }
  },
  watch: {
    value (val) {
      this.selectShow = val
    },
    selectShow (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-popup {
  border-radius: 10px;
}
.select-list {
  .select-item {
    // line-height: 108px;
    min-height: 108px;
    align-items: center;
    width: 560px;
    text-align: center;
    position: relative;
    font-weight: 500;
    color: #333333;
    font-size: 30px;
    &::after {
      content: '';
      position: absolute;
      width: 500px;
      left: 30px;
      right: 30px;
      bottom: 0;
      height: 1PX;
      background-color: #EEEEEE;
    }
    &.item-big {
      min-height: 160px;
    }
    div {
      line-height: 48px;
    }
    .color-FF5240 {
      color: #FF5240;
    }
    span {
      line-height: 44px;
      margin-top: 10px;
      font-size: 24px;
      color: #8F8F94;
    }
  }
}
</style>
