<template>
  <div class="radio-btn-group">
    <div
      class="radio-btn__item"
      v-for="(item, i) in data"
      :key="i"
      :class="{'radio-btn--active': multiple ? valueChild.indexOf(item[valueKey]) !== -1 : valueChild == item[valueKey]}"
      @click="change(item[valueKey])"
      :style="{'border-radius': `${radius}px`}"
    >
      <div class="radio-btn__text">{{item[labelKey]}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    radius: {
      type: Number,
      default: 6
    },
    labelKey: {
      type: String,
      default: 'name'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      valueChild: this.value
    }
  },
  methods: {
    change (value) {
      if (this.multiple) {
        const index = this.valueChild.indexOf(value)
        if (index === -1) {
          this.valueChild.push(value)
        } else {
          this.valueChild.splice(index, 1)
        }
      } else {
        this.valueChild = value
      }
      this.$emit('change', this.valueChild)
    }
  },
  watch: {
    valueChild (value) {
      this.$emit('input', value)
    },
    value (value) {
      this.valueChild = value
    }
  }
}
</script>

<style lang="less" scoped>
.radio-btn-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.radio-btn__item {
  height: 88px;
  margin-right: 20px;
  padding: 0 20px;
  background-color: @background-color;
  margin-bottom: @padding-lg;
  border-width: 3px;
  border-style: solid;
  border-color: @background-color;
}
.radio-btn__text {
  font-size: @font-size-md;
  color: #666;
  line-height: 88px;
}
.radio-btn--active {
  border-width: 3px;
  border-style: solid;
  border-color: @red-dark;
  background-color: #fff;
  .radio-btn__text {
    color: @red-dark;
  }
}
</style>
