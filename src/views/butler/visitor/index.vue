<template>
  <div class="tf-bg tf-padding-base">
    <van-nav-bar title="访客邀约" :fixed="true" :border="false" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <span class="tf-icon tf-icon-solution" @click="goVisitorList(1)"></span>
        <span class="tf-icon tf-icon-time-circle" @click="goInviteList"></span>
      </template>
    </van-nav-bar>
    <div class="tf-main-container">
      <tf-list>
        <div class="list-title">邀约设置</div>
        <tf-list-item border title="来访日期" :required="true">
          <template v-slot:right>
            <tf-date-time-picker v-model="form.stime" title="选择时间">
              <template>
                <div class="tf-text text-right">{{form.stime || 选择时间}}</div>
              </template>
            </tf-date-time-picker>
          </template>
        </tf-list-item>
        <tf-list-item border title="进出次数">
          <template v-slot:right>
            <tf-picker
              v-model="form.vtimes"
              title="进出次数"
              value-key="label"
              selected-key="value"
              :columns="array"
            >
              <template v-slot="{valueText}">
                <div class="tf-text text-right">{{valueText}}</div>
              </template>
            </tf-picker>
          </template>
        </tf-list-item>
        <tf-list-item border title="同行人数" :showArrow="false">
          <template v-slot:right>
            <input v-model="form.num" type="number" class="tf-input" />
          </template>
        </tf-list-item>
        <tf-list-item title="来访目的" :showArrow="false">
          <template v-slot:right>
            <input v-model="form.remark" class="tf-input" />
          </template>
        </tf-list-item>
      </tf-list>
      <div class="visitor-btn" @click="goVisitorList(2)">
        <span class="tf-icon tf-icon-solution"></span>
        <div class="visitor-btn__text">选择访客</div>
      </div>
      <tf-list>
        <div class="list-title">访客信息</div>
        <visitor-form v-if="1" ref="form"></visitor-form>
        <div v-else class="visitor-info">
          <div class="tf-row">
            <div class="visitor-info__text tf-mr-base">鲁班七号 男</div>
            <div class="visitor-info__text tf-text-grey">15066668888 闽A23333</div>
          </div>
          <div class="tf-icon tf-icon-delete"></div>
        </div>
      </tf-list>
      <van-button class="tf-mt-lg" size="large" type="danger" @click="addVisitorLog">发起邀约</van-button>
    </div>
  </div>
</template>

<script>
import { NavBar, Toast, Picker, DatetimePicker, Popup, Button } from 'vant'
import visitorForm from './components/form.vue'
import tfList from '@/components/tf-list/index.vue'
import tfListItem from '@/components/tf-list/item.vue'
import tfPicker from '@/components/tf-picker/index'
import tfDateTimePicker from '@/components/tf-date-time-picker/index'
import { addVisitorLog } from '@/api/butler.js'
import { getTime } from '@/utils/util.js'
export default {
  name: 'visitorIndex',
  components: {
    [NavBar.name]: NavBar,
    [Picker.name]: Picker,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Button.name]: Button,
    tfList,
    tfListItem,
    tfPicker,
    tfDateTimePicker,
    visitorForm
  },
  data () {
    return {
      title: 'picker',
      array: [
        {
          label: '当日一次',
          value: 1
        },
        {
          label: '当日二次',
          value: 2
        },
        {
          label: '当日三次及以上',
          value: 3
        }
      ],
      form: {
        stime: getTime(),
        time: '12:01',
        vtimes: 1,
        num: '',
        remark: ''
      },
      showDatePicker: false,
      showPicker: false
    }
  },
  computed: {
    startDate () {
      return getTime('start')
    },
    endDate () {
      return getTime('end')
    }
  },
  methods: {
    addVisitorLog () {
      this.sendInvite()
      const visitorData = this.$refs.form.getData()
      const params = Object.assign({}, visitorData, this.form)
      if (!this.form.stime) {
        Toast({
          message: '请选择来访日期'
        })
      } else if (!visitorData.realname) {
        Toast({
          message: '请填写访客姓名'
        })
      } else if (!visitorData.gender) {
        Toast({
          message: '请选择访客性别'
        })
      }
      addVisitorLog().then((res) => {
        if (res.success) {
          this.sendInvite()
        }
      })
    },
    goVisitorList (type) {
      this.$router.push({
        path: '/pages/butler/visitor/visitor-list',
        query: {
          type
        }
      })
    },
    goInviteList () {
      this.$router.push('/pages/butler/visitor/invite-list')
    },
    sendInvite () {
      this.$router.push('/pages/butler/visitor/invite')
    }
  }
}
</script>

<style lang="less" scoped>
.tf-input {
  flex: 1;
  font-size: 30px;
  text-align: right;
}

.visitor-btn {
  @flex();
  justify-content: flex-end;
  align-items: center;

  margin: 30px 0;
  .tf-icon {
    font-size: 44px;
  }
}

.visitor-btn__text {
  font-size: 26px;
  margin-left: 10px;
}

.list-title {
  font-size: 30px;
  padding: 20px 30px;
  font-weight: bold;
  text-align: center;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: @divider-color;
}

.visitor-info {
  flex-direction: row;
  justify-content: space-between;
  padding: 35px 30px;
}

.visitor-info__text {
  font-size: 30px;
}

.text-right {
  text-align: right;
}
</style>
