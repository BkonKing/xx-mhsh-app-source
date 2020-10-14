<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="访客邀约"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goback"
    >
      <template #right>
        <span class="tf-icon tf-icon-tongxunlu" @click="goVisitorList(1)"></span>
        <span class="tf-icon tf-icon-shijian" @click="goInviteList"></span>
      </template>
    </van-nav-bar>
    <div class="tf-padding tf-body-container tf-flex-column">
      <div class="tf-item-auto">
        <tf-list>
          <div class="list-title">邀约设置</div>
          <tf-list-item border title="来访日期" :required="true">
            <template v-slot:right>
              <tf-date-time-picker
                v-model="form.lfday"
                type="date"
                title="选择日期"
                :min-date="startDate"
                :max-date="endDate"
              >
                <template>
                  <div class="tf-text text-right">{{form.lfday || '选择日期'}}</div>
                </template>
              </tf-date-time-picker>
            </template>
          </tf-list-item>
          <tf-list-item border title="来访时间">
            <template v-slot:right>
              <tf-picker v-model="form.time" title="选择时间" :columns="timeArray">
                <template v-slot="{valueText}">
                  <div class="tf-text text-right">{{valueText || '选择时间'}}</div>
                </template>
              </tf-picker>
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
          <span class="tf-icon tf-icon-tongxunlu"></span>
          <div class="visitor-btn__text">选择访客</div>
        </div>
        <tf-list>
          <div class="list-title">访客信息</div>
          <template v-if="visitorList.length > 0">
            <div v-for="(item, i) in visitorList" :key="i" class="visitor-info">
              <div class="tf-row">
                <div
                  class="visitor-info__text tf-mr-base"
                >{{item.realname}} {{item.gender == '1' ? '男' : '女'}}</div>
                <div class="visitor-info__text tf-text-grey">{{item.mobile}} {{item.car_number}}</div>
              </div>
              <div class="tf-icon tf-icon-delete" @click="deleteVisitor(i)"></div>
            </div>
          </template>
          <visitor-form v-else ref="form"></visitor-form>
        </tf-list>
      </div>
      <van-checkbox class="agreement-checkbox" v-model="agreeValue" shape="square">
        阅读并同意
        <span
          class="tf-text-blue"
          @click.stop="$router.push('/agreement?type=1')"
        >《{{otherAgreement.title}}》</span>
      </van-checkbox>
      <van-button v-preventReClick class="tf-mt-lg" size="large" type="danger" @click="addVisitorLog">发起邀约</van-button>
    </div>
  </div>
</template>

<script>
import {
  NavBar,
  Toast,
  Picker,
  DatetimePicker,
  Popup,
  Button,
  Checkbox
} from 'vant'
import visitorForm from './components/form.vue'
import tfList from '@/components/tf-list/index.vue'
import tfListItem from '@/components/tf-list/item.vue'
import tfPicker from '@/components/tf-picker/index'
import tfDateTimePicker from '@/components/tf-date-time-picker/index'
import { mapGetters } from 'vuex'
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
    [Checkbox.name]: Checkbox,
    tfList,
    tfListItem,
    tfPicker,
    tfDateTimePicker,
    visitorForm
  },
  data () {
    return {
      title: 'picker',
      timeArray: [
        '0:00~2:00',
        '2:00~4:00',
        '4:00~6:00',
        '6:00~8:00',
        '8:00~10:00',
        '10:00~12:00',
        '12:00~14:00',
        '14:00~16:00',
        '16:00~18:00',
        '18:00~20:00',
        '20:00~22:00',
        '22:00~24:00'
      ],
      form: {
        lfday: '',
        time: '',
        vtimes: 1,
        num: '',
        remark: ''
      },
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 2592000000),
      showDatePicker: false,
      showPicker: false,
      agreeValue: false,
      visitorList: [],
      invitedStatus: true
    }
  },
  computed: {
    ...mapGetters(['otherAgreement']),
    array () {
      const status = !this.form.time
      return [
        {
          label: '当日一次',
          value: 1
        },
        {
          label: '当日二次',
          value: 2,
          disabled: status
        },
        {
          label: '当日三次及以上',
          value: 3,
          disabled: status
        }
      ]
    }
  },
  created () {
    // 未发起邀约时不默认选中协议
    this.invitedStatus = api.getPrefs({
      sync: true,
      key: 'invited-status'
    })
    this.agreeValue = Boolean(this.invitedStatus)
    const index = Math.floor(new Date().getHours() / 2)
    this.timeArray.splice(0, index)
  },
  activated () {
    const visitorInfo = this.$store.state.visitorList
    if (visitorInfo) {
      this.visitorList = [visitorInfo]
      this.$store.commit('setVisitorList', null)
    }
  },
  methods: {
    /* 发起邀约 */
    addVisitorLog () {
      if (!this.agreeValue) {
        Toast({
          message: '请阅读并同意用户协议'
        })
        return
      }
      let visitorData = {}
      if (this.visitorList.length === 0) {
        visitorData = this.$refs.form.getData()
      } else {
        visitorData = this.visitorList[0]
      }
      const params = JSON.parse(
        JSON.stringify(Object.assign({}, visitorData, this.form))
      )
      if (!this.form.lfday) {
        Toast({
          message: '请选择来访日期'
        })
        return
      } else if (this.visitorList.length === 0) {
        if (!visitorData.realname) {
          Toast({
            message: '请填写访客姓名'
          })
          return
        } else if (!visitorData.gender) {
          Toast({
            message: '请选择访客性别'
          })
          return
        }
      }
      if (params.time) {
        const time = params.time.split('~')
        params.stime = time[0]
        params.etime = time[1]
      }
      addVisitorLog(params).then((res) => {
        if (res.success) {
          this.sendInvite(res.data.id)
        }
      })
    },
    /* 发起邀约成功跳转邀约页面 */
    sendInvite (id) {
      if (!this.invitedStatus) {
        api.setPrefs({
          key: 'invited-status',
          value: 1
        })
      }
      this.$router.replace({
        path: '/pages/butler/visitor/invite',
        query: {
          id
        }
      })
      this.mtjEvent({
        eventId: 31
      })
    },
    /* 删除访客 */
    deleteVisitor (index) {
      this.visitorList.splice(index, 1)
    },
    /* 跳转访客列表 1：访客列表 2：选择访客 */
    goVisitorList (type) {
      this.$router.push({
        path: '/pages/butler/visitor/visitor-list',
        query: {
          type
        }
      })
    },
    /* 跳转我的邀约 */
    goInviteList () {
      this.$router.push('/pages/butler/visitor/invite-list')
    },
    goback () {
      this.$router.go(-1)
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'butler' || to.name === 'visitorInvite') {
      this.$store.commit('deleteKeepAlive', from.name)
      this.$destroy()
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.tf-body-container {
  margin-bottom: env(safe-area-inset-bottom);
  margin-bottom: constant(safe-area-inset-bottom);
}

.tf-input {
  flex: 1;
  font-size: 30px;
  text-align: right;
}

.tf-picker,
.tf-date-time-picker {
  width: 100%;
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
  display: flex;
  justify-content: space-between;
  padding: 35px 30px;
}

.visitor-info__text {
  font-size: 30px;
  line-height: 50px;
}

.text-right {
  text-align: right;
}

.tf-icon-delete {
  font-size: 36px;
}

.agreement-checkbox {
  font-size: 24px;
  color: #8f8f94;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  /deep/ .van-checkbox__icon--checked .van-icon {
    color: @red-dark;
    background: none;
    border-color: @red-dark;
  }
  /deep/ .van-checkbox__icon {
    height: 28px;
    line-height: 28px;
    .van-icon {
      width: 28px;
      height: 28px;
      line-height: 28px;
    }
  }
}
</style>
