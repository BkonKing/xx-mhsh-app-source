<template>
  <div class="body">
    <van-popup v-model="areaShow" position="bottom">
      <van-area
        title="标题"
        @change="areaChange"
        @confirm="getArea"
        :area-list="areaList"
        value="110101"
        :columns-placeholder="['不限', '不限', '不限']"
      >
        <div slot="columns-top">222333</div>
        <div slot="columns-bottom">2222</div>
      </van-area>
    </van-popup>
  </div>
</template>

<script>
import {
  Popup,
  Area
} from 'vant'
import { areaList } from '@vant/area-data'
export default {
  components: {
    [Popup.name]: Popup,
    [Area.name]: Area
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      areaList,
      areaShow: this.value
    }
  },
  created () {
  },
  methods: {
    areaChange (picker, value, index) {
      // console.log(`当前值：${value}, 当前索引：${index}`)
      console.log(picker, value, index)
    },
    getArea (v) {
      console.log(v)
    }
  },
  watch: {
    value (val) {
      this.areaShow = val
    },
    areaShow (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
