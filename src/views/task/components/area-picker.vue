<template>
  <div class="area-cont">
    <van-popup v-model="areaShow" position="bottom">
      <van-area
        title="选择地区"
        @change="areaChange"
        @confirm="getArea"
        :area-list="areaList"
        item-height="38"
        visible-item-count="8"
        :value="defaultVal"
        :columns-placeholder="['不限', '不限', '不限']"
      >
        <div slot="columns-top" class="area-header tf-row-vertical-center">
          <div class="area-tit">选择地区</div>
          <div @click="close" class="area-close tf-row-vertical-center van-icon van-icon-cross">
          </div>
        </div>
        <div slot="columns-bottom" class="area-sure">
          <div @click="areaSure" class="task-btn">确定</div>
        </div>
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
    },
    defaultVal: {
      type: String,
      default: ''
    },
    province: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      areaList,
      areaShow: this.value,
      selectVal: []
    }
  },
  created () {
  },
  methods: {
    areaChange (picker, value, index) {
      // console.log(`当前值：${value}, 当前索引：${index}`)
      console.log(picker, value, index)
      this.selectVal = value
    },
    getArea (v) {
      console.log(v)
    },
    close () {
      this.areaShow = false
    },
    areaSure () {
      this.$emit('areaSure', this.selectVal)
      this.close()
    }
  },
  watch: {
    value (val) {
      this.areaShow = val
    },
    areaShow (val) {
      this.$emit('input', val)
    },
    province (val) {
      const provinceList = this.areaList.province_list
      for (const key in provinceList) {
        if (provinceList[key] === this.province) {
          this.defaultVal = key
          this.selectVal.push({ code: key, name: this.province })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-popup {
  border-radius: 20px 20px 0px 0px;
  .van-picker__toolbar {
    display: none;
  }
  .van-picker__frame {
    border-top: 1PX solid #CCCCCC;
    border-bottom: 1PX solid #CCCCCC;
    left: 20px;
    right: 20px;
  }
  .van-picker__columns {
    .van-picker-column {
      flex: auto;
    }
    .van-picker-column li {
      justify-content: flex-start;
      font-size: 28px;
      color: #000000;
      font-weight: 500;
    }
    .van-picker-column:nth-child(1) {
      width: 320px;
      li {
        padding-left: 50px;
      }
    }
    .van-picker-column:nth-child(2) {
      width: 220px;
      li {
        padding-left: 0;
      }
    }
    .van-picker-column:nth-child(3) {
      width: 210px;
      li {
        padding-left: 0;
      }
    }
  }
}
.area-header {
  height: 96px;
  line-height: 96px;
  .area-tit {
    font-size: 32px;
    font-weight: 500;
    color: #000000;
    flex-grow: 1;
    text-align: center;
    padding-left: 76px;
  }
  .area-close {
    width: 50px;
    height: 50px;
    padding: 10px;
    margin-right: 26px;
    font-size: 40px;
    justify-content: center;
    color: #AAAAAA;
  }
}
.area-sure {
  padding: 30px 20px;
}
</style>
