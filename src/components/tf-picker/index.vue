<template>
  <div class="tf-picker">
    <div @click="showPicker = true">
      <slot :valueText="valueText" @click="showPicker = true"></slot>
    </div>
    <van-popup v-model="showPicker" round position="bottom" get-container="body">
      <van-picker
        show-toolbar
        :columns="columns"
        v-bind="$attrs"
        @cancel="showPicker = false"
        @confirm="confirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Picker, Popup } from 'vant'
export default {
  name: 'tf-picker',
  components: {
    [Picker.name]: Picker,
    [Popup.name]: Popup
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    columns: {
      type: Array,
      default: () => []
    },
    selectedKey: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showPicker: false,
      index: undefined
    }
  },
  computed: {
    valueText () {
      const valueKey = this.$attrs['value-key']
      if (this.index === -1) {
        return '请选择'
      }
      return valueKey ? this.columns[this.index][valueKey] : this.columns[this.index]
    }
  },
  created () {
    this.index = this.columns.findIndex((obj, index) => {
      const value = this.selectedKey ? obj[this.selectedKey] : obj
      return this.value === value
    })
  },
  methods: {
    confirm (value, index) {
      this.index = index
      this.$emit('input', this.selectedKey ? value[this.selectedKey] : value)
      this.showPicker = false
    }
  }
}
</script>

<style>
</style>
