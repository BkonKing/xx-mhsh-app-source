<template>
  <div
    class="complaint-form-select"
    :class="{ 'complaint-form-select--disabled': disabled }"
    @click="handleOpen"
  >
    <span
      class="complaint-form-text"
      :class="[
        { 'complain-type': valueText },
        { 'complain-form-placeholder': placeholder }
      ]"
      >{{ valueText || placeholder }}</span
    >
    <span v-if="!this.disabled" class="van-icon van-icon-arrow-down"></span>
    <van-popup
      v-model="visible"
      safe-area-inset-bottom
      get-container="body"
      class="type-dialog"
    >
      <div
        v-for="item in options"
        :key="item.id"
        class="type-item van-ellipsis"
        @click="select(item)"
      >
        {{ item[labelKey] }}
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'SelectPopup',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    placeholder: {
      type: String,
      default: ''
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      data: '',
      valueText: '',
      visible: false
    }
  },
  watch: {
    data (newValue) {
      this.$emit('input', newValue)
    },
    value: {
      handler (newValue) {
        if (this.data !== newValue) {
          const option = this.options.find(
            obj => obj[this.valueKey] === newValue
          )
          option && (this.valueText = option[this.labelKey])
          this.data = newValue
        }
      },
      immediate: true
    }
  },
  methods: {
    handleOpen () {
      !this.disabled && (this.visible = true)
    },
    select (item) {
      this.data = item[this.valueKey]
      this.valueText = item[this.labelKey]
      this.$nextTick(() => {
        this.$emit('select')
        this.autoClose && this.close()
      })
    },
    close () {
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
.complaint-form-select {
  box-sizing: border-box;
  display: flex;
  position: relative;
  align-items: center;
  align-self: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 31px;
  border: 1px solid #cbcbcb;
  border-radius: 10px;
  padding-right: 19px;
  padding-left: 30px;
  width: 650px;
  height: 80px;
  line-height: 28px;
  letter-spacing: 0px;
  white-space: nowrap;
  color: #8f8f94;
  font-size: 28px;
  &--disabled {
    .complain-type {
      color: #c8c7cc;
    }
  }
}
.complaint-form-text {
  margin-right: 1px;
  font-size: 28px;
  color: #000000;
}
.complain-type {
  color: #000000;
}

.type-dialog {
  width: 550px;
  padding: 0 30px;
  border-radius: 10px;
  .type-item {
    width: 100%;
    height: 109px;
    line-height: 109px;
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    color: #333333;
  }
  .type-item + .type-item {
    border-top: 1px solid #eeeeee;
  }
}
</style>
