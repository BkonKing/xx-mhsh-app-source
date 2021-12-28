<template>
  <div>
    <van-field
      v-model="data"
      right-icon="notes-o"
      class="prefix-input tf-mb-lg"
      :class="fieldClassName"
      :disabled="true"
      :placeholder="placeholder"
      @click="setFFFTime"
    />
    <date-picker
      v-model="dateVisible"
      ref="date-picker"
      title="选择时间"
      :data="data"
      @dateSure="dateSure"
    >
    </date-picker>
  </div>
</template>

<script>
import DatePicker from './DatePicker'
export default {
  name: 'FormDatePicker',
  components: {
    DatePicker
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    fieldClassName: {
      type: [String, Object, Array],
      default: ''
    },
    placeholder: [String]
  },
  data () {
    return {
      dateVisible: false,
      data: this.value
    }
  },
  watch: {
    data (newValue) {
      this.$emit('input', newValue)
    },
    value (newValue) {
      this.data = newValue
    }
  },
  methods: {
    setFFFTime () {
      this.dateVisible = true
    },
    dateSure (data) {
      const { startTime, endTime } = data
      this.data = `${startTime ? `${startTime}~` : ''}${endTime}`
    }
  }
}
</script>

<style lang="less" scoped>
.error-field {
  border-color: #ff6555 !important;
    /deep/ .van-field__control::placeholder {
    font-weight: 400;
    color: #ff6555 !important;
  }
}
.prefix-input {
  padding: 0;
  border: 1px solid #cccccc;
  border-radius: 10px;
  /deep/ .van-field__label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    min-width: 80px;
    height: 80px;
    padding: 0 15px;
    margin-right: 0;
    font-size: 24px;
    background: #f7f7f7;
    border-radius: 10px 0px 0px 10px;
    box-sizing: border-box;
    > span {
      line-height: 1;
    }
  }
  /deep/ .van-field__control {
    padding-left: 30px;
    line-height: 80px;
    color: #222;
  }
  /deep/ .van-field__right-icon {
    margin-right: 20px;
    .van-icon {
      font-size: 36px;
      font-weight: bold;
      color: #222;
    }
  }
}
</style>
