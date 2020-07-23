<template>
  <div>
    <tf-list-item title="访客姓名" :showArrow="false">
      <template v-slot:right>
        <input v-model="realname" class="tf-input" />
      </template>
    </tf-list-item>
    <tf-list-item title="性别">
      <template v-slot:right>
        <div class="tf-text" @click="showPicker = true">{{ sexText }}</div>
      </template>
    </tf-list-item>
    <tf-list-item title="手机号" :showArrow="false">
      <template v-slot:right>
        <input v-model="mobile" type="number" class="tf-input" />
      </template>
    </tf-list-item>
    <tf-list-item title="车牌号" :showArrow="false">
      <template v-slot:right>
        <input v-model="car_number" class="tf-input" />
      </template>
    </tf-list-item>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="sexArray"
        value-key="label"
        @cancel="showPicker = false"
        @confirm="bindSexChange"
      />
    </van-popup>
  </div>
</template>

<script>
import { Picker, Popup } from 'vant'
import tfListItem from '@/components/tf-list/item.vue'
export default {
  components: {
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    tfListItem
  },
  data () {
    return {
      showPicker: false,
      sexArray: [
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 2
        }
      ],
      gender: 0,
      realname: '',
      mobile: '',
      car_number: ''
    }
  },
  computed: {
    sexText () {
      return this.sexArray[this.gender].label
    }
  },
  methods: {
    bindSexChange: function (value) {
      this.gender = parseInt(value)
      this.showPicker = false
    },
    setData (formData) {
      const { gender, realname, mobile, car_number } = formData
      this.gender = gender - 1
      this.realname = realname
      this.mobile = mobile
      this.car_number = car_number
    },
    getData () {
      return {
        gender: this.sexArray[this.gender].value,
        realname: this.realname,
        mobile: this.mobile,
        car_number: this.car_number
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tf-text {
  text-align: right;
}
.tf-input {
  flex: 1;
  font-size: 30px;
  text-align: right;
}
</style>
