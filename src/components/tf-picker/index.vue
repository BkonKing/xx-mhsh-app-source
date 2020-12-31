<template>
  <div class="tf-picker">
    <div style="width: 100%;" @click="showPicker = true">
      <slot :valueText="valueText" @click="showPicker = true"></slot>
    </div>
    <van-popup v-model="showPicker" round position="bottom" get-container="body">
      <van-picker
        show-toolbar
        :columns="columns"
        :default-index="index"
        v-bind="$attrs"
        @cancel="showPicker = false"
        @confirm="confirm"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'tf-picker',
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
      return valueKey
        ? this.columns[this.index][valueKey]
        : this.columns[this.index]
    }
  },
  created () {
    this.getIndex()
  },
  methods: {
    getIndex () {
      this.index = this.columns.findIndex((obj, index) => {
        const value = this.selectedKey ? obj[this.selectedKey] : obj
        return this.value === value
      })
    },
    confirm (value, index) {
      if (this.columns.length > 0) {
        this.index = index
        this.$emit('input', this.selectedKey ? value[this.selectedKey] : value)
        this.$emit('confirm', this.selectedKey ? value[this.selectedKey] : value)
      }
      this.showPicker = false
    }
  },
  watch: {
    value () {
      this.getIndex()
    }
  }
}
</script>

<style>
</style>
