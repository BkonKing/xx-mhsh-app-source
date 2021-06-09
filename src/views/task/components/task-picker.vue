<template>
  <div>
    <van-popup v-model="pcikerShow" position="bottom">
      <van-picker
        :title="title"
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
      type: [Boolean],
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    list: {
      type: Array,
      default: () => []
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
    onConfirm (value) {
      this.$emit('pickerCall', value)
      this.pcikerShow = false
    },
    onCancel () {
      this.pcikerShow = false
    },
    onChange () {}
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
