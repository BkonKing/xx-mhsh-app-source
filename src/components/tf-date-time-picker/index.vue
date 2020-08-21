<template>
  <div style="height: 100%;">
    <div style="height: 100%;" @click="showDatePicker = true">
      <slot :valueText="valueText"></slot>
    </div>
    <van-popup v-model="showDatePicker" round position="bottom" get-container="body">
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
import { formatDateTime, formatDate } from '@/utils/util'
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
      dateValue: new Date()
    }
  },
  created () {

  },
  methods: {
    confirm (time) {
      let value
      if (this.$attrs.type === 'date') {
        value = formatDate(time.getTime())
      } else {
        value = formatDateTime(time.getTime())
      }
      this.$emit('input', value)
      this.$emit('confirm', value)
      this.showDatePicker = false
    }
  },
  watch: {
    value (val) {
      if (val) {
        this.dateValue = new Date(val.replace(/-/g, '/'))
      }
    }
  }
}
</script>

<style>
</style>
