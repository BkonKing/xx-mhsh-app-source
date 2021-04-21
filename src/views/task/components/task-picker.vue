<template>
  <div>
    <van-popup v-model="pcikerShow" position="bottom">
      <van-picker
        title="标题"
        show-toolbar
        :columns="list"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
import {
  Picker
} from 'vant'
export default {
  components: {
    [Picker.name]: Picker
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    list: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      pcikerShow: this.value
    }
  },
  created () {
  },
  methods: {

  },
  watch: {
    value (val) {
      this.pcikerShow = val
    },
    pcikerShow (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-popup {

}

</style>
