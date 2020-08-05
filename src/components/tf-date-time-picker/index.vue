<template>
  <div>
    <div @click="showDatePicker = true">
      <slot :valueText="valueText"></slot>
    </div>
    <van-popup v-model="showDatePicker" round position="bottom">
      <van-datetime-picker
        v-bind="$attrs"
        v-model="dateValue"
        @cancel="showDatePicker = false"
        @confirm="confirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { DatetimePicker, Popup } from 'vant'
import { formatDateTime } from '@/utils/util'
export default {
  name: 'tf-date-time-picker',
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup
  },
  props: {
    value: {
      type: [String, Number, Date],
      default: ''
    }
  },
  data () {
    return {
      showDatePicker: false,
      valueText: '',
      dateValue: new Date(this.value.replace(/-/g, '/'))
    }
  },
  created () {

  },
  methods: {
    confirm (time) {
      const value = formatDateTime(time.getTime())
      this.$emit('input', value)
      this.showDatePicker = false
    }
  }
}
</script>

<style>
</style>
