<template>
  <div class="body">
    <van-popup v-model="selectShow">
      <div class="select-list">
        <div v-for="(item ,index) in selectList" :key="index" class="select-item">{{ item.text }}</div>
        <!-- <div class="select-item">bb</div> -->
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
    console.log(21212)
  },
  methods: {

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
    line-height: 80px;
    font-size: 28px;
    width: 600px;
    text-align: center;
    border-bottom: 1PX solid #ccc;
  }
}
</style>
