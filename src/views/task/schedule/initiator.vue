<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar
      title="任务进度"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <a :href="'tel: ' + maskTel" class="tel-btn"
          ><img src="@/assets/img/task_10.png"
        /></a>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <div class="status-block tf-row-space-between">
        <div class="status-list tf-row-vertical-center">
          <div
            v-for="(item, index) in statusNumList"
            :key="index"
            class="status-item"
          >
            {{ item.text }}({{ item.value }})
          </div>
        </div>
        <van-dropdown-menu active-color="#8F8F94">
          <van-dropdown-item :title="statusName" ref="item">
            <div class="status-option">
              <div
                @click="statusChange(index)"
                v-for="(item, index) in statusList"
                :key="index"
                class="option-item"
                :class="{ active: statusIndex == index }"
              >
                <div>{{ item.value }}</div>
                <div>{{ item.text }}</div>
              </div>
            </div>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
      <div v-if="userList.length > 1" class="user-list">
        <div
          v-for="(item, index) in userList"
          :key="index"
          class="user-item tf-column"
          :class="{ active: userIndex == index }"
          @click="userSelect(index)"
        >
          <img v-if="item.avatar" :src="item.avatar" />
          <img v-else src="@/assets/imgs/touxiang.png" />
          <div class="van-ellipsis user-name">{{ item.nickname }}</div>
          <div
            class="user-status"
            :class="{
              'color-FF5240': item.is_stop == 1,
              'opacity-gray': item.progress_status > 1
            }"
          >
            {{ item.progress_status_name }}
          </div>
        </div>
      </div>
      <div v-if="userList.length == 1" class="release-header">
        <div class="release-user tf-row">
          <img v-if="infoData.avatar" :src="infoData.avatar" />
          <img v-else src="@/assets/imgs/touxiang.png" />
          <div class="tf-row-space-between">
            <div class="release-name van-ellipsis">
              {{ userList[0].nickname }}
            </div>
            <div
              class="release-time color-ccc"
              :class="{
                'color-FF5240': userList[0].is_stop == 1,
                'color-ccc': userList[0].progress_status > 1
              }"
            >
              {{ userList[0].progress_status_name }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="infoData && infoData.taskflow_list" class="list-cont">
        <schedule-list :listData="infoData.taskflow_list"></schedule-list>
      </div>
      <template v-else>
        <div v-if="!isLoading" class="empty-session">
          <img src="@/assets/img/empty_quiz.png" />
        </div>
      </template>
      <div class="op-block">
        <div class="bottom-fiex tf-row">
          <div class="op-left tf-row">
            <div @click="quiz" class="tf-column">
              <span v-if="infoData.question_num > 0" class="num tf-flex-center"
                ><i>{{ infoData.question_num }}</i></span
              >
              <img src="@/assets/img/task_05.png" />
              <div>提问</div>
            </div>
            <a :href="'tel: ' + infoData.contact_number" class="tf-column">
              <img src="@/assets/img/task_06.png" />
              <div>联系</div>
            </a>
            <div
              v-if="infoData.is_show_complain == 1"
              @click="infoData.is_can_complain == 1 && complaint()"
              class="tf-column"
              :class="{ 'opacity-gray': infoData.is_can_complain == 0 }"
            >
              <img src="@/assets/img/task_18.png" />
              <div>投诉</div>
            </div>
            <div
              v-if="infoData.is_show_eliminate == 1"
              @click="infoData.is_can_eliminate == 1 && endTask()"
              class="tf-column"
              :class="{ 'opacity-gray': infoData.is_can_eliminate == 0 }"
            >
              <img src="@/assets/img/task_19.png" />
              <div>淘汰</div>
            </div>
            <div
              v-if="infoData.is_can_evaluate == 1"
              @click="evaluate"
              class="tf-column"
              :class="{ 'opacity-gray': infoData.is_can_abandon == 0 }"
            >
              <img src="@/assets/img/task_20.png" />
              <div>评价</div>
            </div>
          </div>
          <div
            v-if="infoData.is_can_confirm == 1"
            class="op-right"
            @click="completeTask()"
          >
            确认完成
          </div>
          <div
            v-if="infoData.is_can_delay == 1"
            class="op-right"
            @click="overtimeTask"
          >
            是否延期
          </div>
        </div>
      </div>
    </div>
    <!-- 延期弹窗 -->
    <task-popup v-model="popupShow" :titName="overTit" :subTitName="overSubTit">
      <div slot="content" class="popup-cont">
        <div class="form-label">是否延长期限<span>*</span></div>
        <div class="radio-block tf-row">
          <div
            v-for="(item, index) in overList"
            :key="index"
            @click="overIndex = index"
            class="popup-radio tf-row-vertical-center"
            :class="{ active: index == overIndex }"
          >
            <div></div>
            <div>{{ item }}</div>
          </div>
        </div>
        <div v-show="overIndex == 1">
          <div class="form-label">是否奖励幸福币<span>*</span></div>
          <div class="radio-block tf-row">
            <div
              v-for="(item, index) in coinList"
              :key="index"
              @click="coinIndex = item.value"
              class="popup-radio tf-row-vertical-center"
              :class="{ active: item.value == coinIndex }"
            >
              <div></div>
              <div>{{ item.label }}</div>
            </div>
          </div>
          <div class="coin-tip">
            <div v-show="coinIndex == 0" class="all-tip">
              奖励每人{{ overtimeInfo.reward_happiness }}幸福币
            </div>
            <van-field
              v-show="coinIndex == 1"
              v-model="formData2.new_reward_happiness"
              type="digit"
              :placeholder="
                `奖励每人数量，需小于${overtimeInfo.reward_happiness}幸福币`
              "
            >
              <div slot="extra" class="coin-unit">币</div>
            </van-field>
          </div>
        </div>
        <div v-show="overIndex == 0" class="select-block tf-row">
          <div @click="timeSelect(1)" class="popup-select tf-row-space-between">
            {{ formData2.day_num ? this.formData2.day_num + "天" : "请选择" }}
            <img src="@/assets/img/task_14.png" />
          </div>
          <div class="select-lable">天</div>
          <div @click="timeSelect(2)" class="popup-select tf-row-space-between">
            {{
              formData2.hour_num ? this.formData2.hour_num + "小时" : "请选择"
            }}
            <img src="@/assets/img/task_14.png" />
          </div>
          <div class="select-lable">小时</div>
        </div>
        <van-button
          v-preventReClick
          @click="ableClick || delayTask()"
          :class="[{ 'unable-btn': ableClick }, 'task-btn']"
          :disabled="ableClick"
          >确定</van-button
        >
      </div>
    </task-popup>
    <task-picker
      v-model="pcikerShow"
      :list="pickerList"
      @pickerCall="pickerCall"
    ></task-picker>
    <task-popup v-model="endShow" :titName="endTit" :subTitName="endSubTit">
      <div slot="content" class="popup-cont end-cont">
        <div class="form-label">淘汰原因<span>*</span></div>
        <div @click="reasonShow = true" class="select-block tf-row">
          <div class="popup-select tf-row-space-between" >
            {{ formData.reason || "请选择" }}
            <img src="@/assets/img/task_09.png" />
          </div>
        </div>
        <div class="form-label">补充说明</div>
        <graphic
          phTxt="请输入"
          :maxNum="200"
          :autosize="{ maxHeight: 96 }"
          @getForm="getForm"
          ref="graphic"
        ></graphic>
        <van-button
          v-preventReClick
          @click="submitEliminate"
          :class="[
            { 'unable-btn': !formData.reason || formData.content.length > 200 },
            'task-btn'
          ]"
          :disabled="!formData.reason || formData.content.length > 200"
          >确定</van-button
        >
      </div>
    </task-popup>
    <list-select
      v-model="reasonShow"
      @selectCall="selectCall"
      :selectList="reasonList"
    ></list-select>
  </div>
</template>

<script>
import { NavBar, DropdownMenu, DropdownItem, Picker, Toast } from 'vant'
import taskPopup from '../components/task-popup'
import taskPicker from '../components/task-picker'
import graphic from '../components/graphic'
import scheduleList from './schedule-list'
import listSelect from '../components/list-select'
import {
  getTaskSchedule,
  getReasonList,
  submitEliminate,
  getOvertimeTask,
  submitDelayTash
} from '@/api/task'
export default {
  name: 'scheduleInitiator',
  components: {
    [NavBar.name]: NavBar,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Picker.name]: Picker,
    taskPopup,
    taskPicker,
    graphic,
    scheduleList,
    listSelect
  },
  data () {
    return {
      taskId: '',
      isLoading: true,
      userList: [], // 接单者
      userIndex: 0, // 选中的接单者
      infoData: '', // 当前选中的接单者信息
      endShow: false, // 淘汰弹窗
      endTit: '淘汰接单者', // 淘汰标题
      endSubTit: '请先与对方沟通协商', // 淘汰标题
      popupShow: false, // 超时弹窗
      statusNumList: [],
      status: 0,
      statusName: '状态',
      statusIndex: -1,
      statusList: [],
      overTit: '任务超时', // 超时标题
      overSubTit: '超时1小时10分钟 剩余3人未交付', // 超时标题
      pcikerShow: false, // 超时延迟时间选择
      overList: ['延期', '终止任务'],
      overIndex: 0, // 0延期 1终止任务
      overtimeInfo: '',
      timeType: 1, // 1 天 2 小时
      pickerList: [],
      coinIndex: 0, // 0奖励全部 1奖励部分 2不奖励
      maskTel: '', // 联系电话
      reasonList: [], // 淘汰原因
      reasonShow: false,
      formData2: {
        type: 1,
        day_num: '',
        hour_num: '',
        reward_type: 2,
        new_reward_happiness: null
      },
      formData: {
        reason: '',
        content: ''
      },
      first: true
    }
  },
  computed: {
    ableClick () {
      if (
        (this.overIndex == 0 &&
          !this.formData2.day_num &&
          !this.formData2.hour_num) ||
        (this.overIndex == 1 &&
          this.coinIndex == 1 &&
          !this.formData2.new_reward_happiness)
      ) {
        return true
      } else {
        return false
      }
    },
    // 如果任务奖励是1或0幸福币的话，不显示“奖励部分”这个选项
    coinList () {
      const coinList = [
        {
          label: '奖励全部',
          value: 0
        },
        {
          label: '奖励部分',
          value: 1
        },
        {
          label: '不奖励',
          value: 2
        }
      ]
      if (this.overtimeInfo.reward_happiness == '1' || this.overtimeInfo.reward_happiness == '0') {
        coinList.splice(1, 1)
        return coinList
      }
      return coinList
    }
  },
  created () {
    this.taskId = this.$route.query.taskId
    this.formData2.task_id = this.taskId
    // this.getData()
  },
  activated () {
    this.getData()
  },
  methods: {
    getData () {
      const params = {
        linli_task_id: this.taskId
      }
      if (this.statusIndex > -1) {
        Object.assign(params, {
          select_type: this.statusList[this.statusIndex].text
        })
      }
      getTaskSchedule(params).then(res => {
        this.isLoading = false
        if (this.first) {
          this.first = false
          this.userIndex = 0
        } else {
          this.userIndex = res.data.findIndex(obj => {
            return obj.id === this.infoData.id
          })
        }
        this.statusNumList = []
        this.statusList = []
        // 任务超时则打开延期弹窗
        if (res.is_cen_yq == 1 && this.statusIndex < 0) {
          this.overtimeTask()
        }
        for (const key in res.data_tab) {
          if (res.data_tab[key] > 0) {
            const obj = {
              text: key,
              value: res.data_tab[key]
            }
            this.statusNumList.push(obj)
          }
        }
        for (const key in res.select_data) {
          const obj = {
            text: key,
            value: res.select_data[key]
          }
          this.statusList.push(obj)
        }
        this.userList = res.data
        if (res.data.length) {
          if (!this.maskTel) {
            this.maskTel = this.userList[this.userIndex].customer_service
          }
          this.infoData = this.userList[this.userIndex]
        } else {
          this.infoData = []
        }
      })
    },
    statusChange (index) {
      this.statusIndex = index
      this.statusName = `${this.statusList[this.statusIndex].text} (${
        this.statusList[this.statusIndex].value
      })`
      this.$refs.item.toggle()
      this.getData()
    },
    // 选择接单者
    userSelect (index) {
      this.userIndex = index
      this.infoData = this.userList[index]
    },
    // 选择原因
    selectCall (obj) {
      this.formData.reason = obj.text
      console.log(obj)
    },
    getForm (val) {
      this.formData.content = val.content
      this.formData.image_url = val.images
    },
    // 淘汰
    endTask () {
      this.formData.reason = ''
      this.formData.content = ''
      this.formData.image_url = []
      if (!this.reasonList.length) {
        getReasonList({ type: 1 }).then(res => {
          this.reasonList = res.data.map(item => {
            return {
              value: item.id,
              text: item.reason
            }
          })
          this.endShow = true
        })
      } else {
        this.endShow = true
        this.$refs.graphic.setVal({ content: '', images: [] })
      }
    },
    // 淘汰提交
    submitEliminate () {
      if (!this.formData.reason) return
      this.formData.user_task_id = this.infoData.id
      submitEliminate(this.formData).then(res => {
        this.endShow = false
        this.getData()
      })
    },
    // 打开延期窗口
    overtimeTask () {
      // 获取任务超时信息
      getOvertimeTask({ task_id: this.taskId }).then(res => {
        this.resetOverTimeForm()
        this.overtimeInfo = res.data
        this.overSubTit = res.data.tab_text
        this.popupShow = true
      })
    },
    // 延期弹窗重置表单
    resetOverTimeForm () {
      this.overIndex = 0
      this.coinIndex = 0
      this.formData2 = {
        type: 1,
        day_num: '',
        hour_num: '',
        reward_type: 2,
        new_reward_happiness: null,
        task_id: this.taskId
      }
    },
    // 延期时间
    timeSelect (type) {
      this.timeType = type
      let listLength = 0
      this.pickerList = []
      if (type == 1) {
        listLength = 11
        this.pickerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      } else {
        listLength = 24
      }
      for (let i = 1; i < listLength; i++) {
        this.pickerList.push(i)
      }
      this.pcikerShow = true
    },
    pickerCall (value) {
      if (this.timeType == 1) {
        this.formData2.day_num = value
      } else {
        this.formData2.hour_num = value
      }
    },
    // 延期
    delayTask () {
      if (
        this.overIndex == 1 &&
        this.coinIndex == 1 &&
        this.formData2.new_reward_happiness -
          this.overtimeInfo.reward_happiness >=
          0
      ) {
        Toast(`奖励必须小于${this.overtimeInfo.reward_happiness}幸福币`)
      } else {
        this.formData2.type = this.overIndex + 1
        this.formData2.reward_type = this.coinIndex + 1
        submitDelayTash(this.formData2).then(res => {
          this.popupShow = false
          this.getData()
        })
      }
    },
    // 确认完成
    completeTask () {
      this.$router.push({
        name: 'operateFinish',
        query: {
          userTaskId: this.infoData.id
        }
      })
    },
    // 提问
    quiz () {
      this.$router.push({
        name: 'operateQuiz',
        query: {
          isUp: 1,
          taskId: this.taskId
        }
      })
    },
    // 投诉
    complaint () {
      this.$router.push({
        name: 'operateComplaint',
        query: {
          taskId: this.taskId,
          complaintUid: this.infoData.uid
        }
      })
    },
    // 评价
    evaluate () {
      this.$router.push({
        name: 'operateEvaluate',
        query: {
          userTaskId: this.infoData.id
        }
      })
    },
    // 查看任务
    taskDetail () {
      if (this.prevName == 'taskDetail') {
        this.$router.go(-1)
      } else {
        this.$router.push({
          name: 'taskDetail',
          query: {
            taskId: this.taskId
          }
        })
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    const names = [
      'operateEvaluate',
      'operateComplaint',
      'operateQuiz',
      'operateFinish'
    ]
    if (!names.includes(to.name)) {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  }
}
</script>
<style lang="less" scoped>
@import url(../../../styles/task.less);
.tf-body-container {
  font-size: 28px;
  color: #333;
  background-color: #f7f7f7;
}
/deep/ .van-nav-bar__right {
  padding: 0;
  .tel-btn {
    padding: 16px 20px;
    display: flex;
    img {
      width: 36px;
      height: 36px;
    }
  }
}
.status-block {
  height: 88px;
  align-items: center;
  background-color: #fff;
  padding: 0 20px;
  margin-bottom: 30px;
  .status-list {
    .status-item {
      font-size: 26px;
      color: #000000;
      margin-right: 40px;
    }
  }
  .status-select {
    width: 200px;
    height: 64px;
    background: #f7f7f7;
    border-radius: 32px;
    position: relative;
    padding-right: 64px;
    text-align: right;
    line-height: 64px;
    color: #8f8f94;
    font-size: 24px;
  }
  /deep/.van-dropdown-menu {
    .van-dropdown-menu__bar {
      width: 200px;
      height: 64px;
      background: #f7f7f7;
      border-radius: 32px;
    }
    .van-dropdown-menu__title {
      width: 100%;
      padding: 0 34px 0 0;
      text-align: center;
      font-size: 24px;
      &.van-dropdown-menu__title--active::after {
        border-width: 0 7px 12px 7px;
        border-color: transparent transparent #8f8f94 transparent;
      }
      &::after {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 12px 7px 0 7px;
        border-color: #8f8f94 transparent transparent transparent;
        margin-top: 0;
        transform: translate(0, -50%);
        right: 20px;
      }
    }
    .status-option {
      height: 351px;
      padding: 40px 20px 10px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .option-item {
        width: 155px;
        height: 120px;
        background: #f7f7f7;
        border: 1px solid #f7f7f7;
        border-radius: 10px;
        margin-bottom: 30px;
        display: flex;
        @flex-column();
        justify-content: center;
        align-items: center;
        &.active {
          border: 1px solid #000000;
        }
        div {
          line-height: 44px;
        }
        div:nth-child(1) {
          font-size: 32px;
          font-weight: 500;
          color: #000000;
        }
        div:nth-child(2) {
          font-size: 24px;
          font-weight: 500;
          color: #8f8f94;
        }
      }
    }
  }
}
.user-list {
  padding-left: 20px;
  margin-bottom: 30px;
  @flex();
  overflow-x: auto;
  .user-item {
    width: 200px;
    height: 240px;
    background: #ffffff;
    border-radius: 10px;
    margin-right: 20px;
    align-items: center;
    flex-shrink: 0;
    &.active {
      background: linear-gradient(45deg, #ffd34d 0%, #febf00 100%);
      box-shadow: 0px 10px 20px 0px rgba(232, 174, 0, 0.3);
    }
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: fill;
      margin: 30px 0 10px;
    }
    .user-name,
    .user-status {
      color: #000000;
      line-height: 44px;
      font-size: 24px;
      max-width: 152px;
      margin-bottom: 10px;
    }
    .user-status {
      &.color-FF5240 {
        color: #ff5240;
      }
      &.opacity-gray {
        opacity: 0.6;
      }
    }
  }
}
.list-cont {
  padding: 30px 20px 60px;
}
.radio-block {
  // margin-bottom: 40px;
}
.popup-radio {
  height: 50px;
  font-size: 28px;
  div:first-child {
    width: 30px;
    height: 30px;
    border: 1px solid #000000;
    border-radius: 15px;
    margin-right: 10px;
    position: relative;
  }
  div:nth-child(2) {
    line-height: 50px;
  }
  &:nth-child(1) {
    width: 180px;
  }
  &:nth-child(2) {
    width: 194px;
  }
  &.active div:first-child {
    border-color: #ff5240;
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      background: #ff6555;
      border-radius: 50%;
    }
  }
}
.select-block {
  margin: 40px 0 60px;
  .popup-select {
    width: 180px;
    height: 80px;
    border: 1px solid #cccccc;
    border-radius: 10px;
    color: #8f8f94;
    padding-left: 20px;
    line-height: 76px;

    align-items: center;
    img {
      width: 21px;
      height: 12px;
      margin-right: 15px;
    }
  }
  .select-lable {
    padding-left: 20px;
    min-width: 73px;
    line-height: 80px;
  }
}
.coin-tip {
  margin: 20px 0 60px;
  .all-tip {
    color: #8f8f94;
    padding-left: 39px;
    line-height: 24px;
  }
  /deep/.van-cell {
    padding: 0 0 0 20px;
    height: 80px;
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 10px;
    .van-field__body {
      height: 100%;
      input {
        font-size: 24px;
      }
    }
  }
  .coin-unit {
    line-height: 76px;
    font-weight: 500;
    font-size: 28px;
    padding-right: 30px;
    color: #000000;
  }
}

.end-cont {
  .select-block {
    margin: 0;
    .popup-select {

      flex: 1;
      img {
        width: 36px;
        height: 36px;
        margin-right: 18px;
      }
    }
  }
  /deep/.task-card {
    width: 100%;
    margin-bottom: 10px;
    .text-block {
      width: 500px;
      min-height: 260px;
      border: 1px solid #cccccc;
      border-radius: 10px;
      margin-bottom: 30px;
      overflow: hidden;
      textarea {
        min-height: 192px;
      }
    }
    .van-cell {
      height: 210px;
      padding: 16px 20px 0 30px;
    }
    .text-num {
      margin-bottom: 0;
      padding-right: 20px;
    }
    .divider-line {
      display: none;
    }
    .pic-block {
      padding-left: 0;
      padding-bottom: 0;
      .van-uploader__upload,
      .van-uploader__preview,
      /deep/ .van-uploader__upload,
      /deep/ .van-uploader__preview {
        width: 104px !important;
        height: 104px !important;
        margin: 0 16px 20px 0;
      }
    }
  }
}

.release-header {
  height: 160px;
  width: 710px;
  background: linear-gradient(90deg, #ffd34d 0%, #febf00 100%);
  border-radius: 10px 10px 0 0;
  padding: 30px;
  margin: 0 auto;
  & + .list-cont {
    padding-top: 0;
  }
}
.release-user {
  height: 80px;
  align-items: center;
  color: #000000;
  & > img {
    width: 80px;
    height: 100%;
    border-radius: 50%;
    margin-right: 30px;
  }
  & > div.tf-row-space-between {
    max-width: 398px;
    height: 100%;
    flex-grow: 1;
    flex-direction: column;
  }
  .release-name {
    font-weight: 500;
    line-height: 36px;
  }
  .release-time {
    font-size: 24px;
    line-height: 30px;
    &.color-FF5240 {
      color: #ff5240;
    }
    &.color-ccc {
      opacity: 0.6;
    }
  }
}

.empty-session {
  padding-top: 300px;
  align-items: center;
  img {
    width: 209px;
    height: 240px;
  }
}
</style>
