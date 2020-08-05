<template>
  <div>
    <tf-list-item border title="访客姓名" :showArrow="false" :required="true">
      <template v-slot:right>
        <input v-model="realname" class="tf-input" />
      </template>
    </tf-list-item>
    <tf-list-item border title="性别" :required="true">
      <template v-slot:right>
        <tf-picker
          v-model="gender"
          title="性别"
          value-key="label"
          selected-key="value"
          :columns="sexArray"
        >
          <template v-slot="{valueText}">
            <div class="tf-text">{{valueText}}</div>
          </template>
        </tf-picker>
      </template>
    </tf-list-item>
    <tf-list-item border title="手机号" :showArrow="false">
      <template v-slot:right>
        <input v-model="mobile" type="number" class="tf-input" />
      </template>
    </tf-list-item>
    <tf-list-item title="车牌号" :showArrow="false">
      <template v-slot:right>
        <input v-model="car_number" class="tf-input" />
      </template>
    </tf-list-item>
  </div>
</template>

<script>
import tfListItem from '@/components/tf-list/item.vue'
import tfPicker from '@/components/tf-picker/index'
export default {
  components: {
    tfPicker,
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
      gender: 1,
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
