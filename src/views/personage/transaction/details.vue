<template>
  <div class="tf-bg">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="tf-main-container">
      <div class="user-info-box">
        <user-info avatar="@/assets/app-icon.png" name="用户昵称" time="2020.05.30"></user-info>
      </div>
      <div class="tf-padding">
        <div class="tf-card">
          <div class="tf-card-header">
            <div class="tf-card-header__title">内容描述</div>
            <div
              class="tf-card-header__status"
              :class="{ 'tf-card-header__status--complete': status > 5 }"
            >{{ statusText[status] }}</div>
          </div>
          <div class="tf-card-content">{{ content }}</div>
          <div class="tf-image-box">
            <img
              class="tf-image"
              v-for="(item, i) in images"
              :src="item.src"
              :key="i"
              mode="widthFix"
            />
          </div>
        </div>
        <tfTimeline class="tf-bg-white tf-mt-base tf-padding-base" :options="timelineList"></tfTimeline>
      </div>
      <div v-if="status < 6" class="operation-box">
        <div class="operation-content">等待鲁班分派</div>
        <div v-if="status === 3" class="tf-row-space-between">
          <div class="tf-btn tf-mr-lg" @click="cancelRepair">撤销提报</div>
          <div class="tf-btn tf-btn-primary" @click="showAssign">分派人员</div>
        </div>
        <div v-if="status === 4" class="tf-btn" @click="cancelAssign">取消分派</div>
      </div>
    </div>
    <tf-dialog v-model="revocationShow" :showFotter="true">
      <div class="alert-text">撤销后将不再进行处理解决 确定撤销提报？</div>
    </tf-dialog>
    <tf-dialog v-model="assignShow" :showFotter="true" :hiddenOff="true" title="分派人员">
      <div>
        <div class="tf-form-box">
          <div class="tf-form-label">工作人员：</div>
          <div class="tf-form-item">
            <picker
              class="tf-form-item__input"
              @change="bindPickerChange"
              :value="index"
              :range="array"
            >
              <div v-if="array[index]" class="tf-form-item__input">{{ array[index] }}</div>
              <div v-else class="tf-form-item__input--placeholder">请选择工作人员</div>
            </picker>
            <div class="tf-icon tf-form-item__icon">&#xe7ce;</div>
          </div>
        </div>
        <div class="tf-form-box">
          <div class="tf-form-label">预约处理时间：</div>
          <div class="tf-form-item">
            <date-time-picker class="tf-form-item__input" placeholder="请选择时间" fields="minute"></date-time-picker>
            <div class="tf-icon tf-icon-time-circle tf-form-item__icon"></div>
          </div>
        </div>
      </div>
    </tf-dialog>
    <tf-dialog v-model="cancelAssignShow" :showFotter="true" :hiddenOff="true" title="取消任务">
      <div class="tf-form-box">
        <div class="tf-form-label">取消说明：</div>
        <van-field
          v-model="reason"
          class="tf-form-item__textarea"
          rows="2"
          autosize
          type="textarea"
          maxlength="300"
          placeholder="请输入原因"
          show-word-limit
        />
      </div>
    </tf-dialog>
  </div>
</template>

<script>
import { NavBar, Picker, DatetimePicker, Field } from 'vant'
import userInfo from '@/components/user-info/index.vue'
import tfTimeline from '@/components/tf-timeline/index.vue'
import tfDialog from '@/components/tf-dialog/index.vue'
import { statusText } from '@/const/butler.js'
import { getRepairInfo, cancelRepair } from '@/api/butler/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Picker.name]: Picker,
    [DatetimePicker.name]: DatetimePicker,
    [Field.name]: Field,
    tfTimeline,
    tfDialog,
    userInfo
  },
  data () {
    return {
      statusText,
      revocationShow: false,
      assignShow: false,
      cancelAssignShow: false,
      title: '报事报修',
      content: '厨房下水道堵了',
      images: ['https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'],
      status: 3,
      ctime: '2020-06-03 16:35:26',
      timelineList: [
        {
          id: '1',
          remark: '已提交，等待物业人员受理。',
          designee: '',
          mobile: '',
          ctime: '2020-06-03 16:35:26'
        },
        {
          id: '1',
          remark: '已提交，等待物业人员受理。',
          designee: '',
          mobile: '',
          ctime: '2020-06-03 16:35:26'
        }
      ],
      array: ['中国', '美国', '巴西', '日本'],
      index: undefined,
      reason: ''
    }
  },
  created () {
    const { id, title } = this.$route.query
    this.title = title
    // this.getRepairInfo(id)
  },
  methods: {
    getRepairInfo (repairId) {
      getRepairInfo({
        projectId: '',
        repairId
      }).then((res) => {
        if (res.success) {
          const { category, content, images, status, records } = res.data
          this.status = status
          this.imgList = images
          this.timelineList = records
          this.content = content
        }
      })
    },
    // 撤销提报
    cancelRepair () {
      this.revocationShow = true
    },
    // 分派人员
    showAssign () {
      this.assignShow = true
    },
    bindPickerChange: function (e) {
      this.index = e.target.value
    },
    cancelAssign () {
      this.cancelAssignShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.tf-card-content {
  color: @text-color;
  padding-right: 30px;
}
.tf-image-box {
  padding: 20px 30px 20px 0;
}
.tf-main-container {
  padding-bottom: 217px;
}
.operation-box {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 20px 20px 40px;
  background-color: #fff;
}
.operation-content {
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
  color: @orange-dark;
}
.alert-text {
  font-size: 30px;
  padding: 50px 50px 30px;
  line-height: 60px;
  text-align: center;
}
.tf-form-item__textarea {
  padding: 0;
  /deep/ .van-field__control {
    padding: 20px;
    background:@gray-2;
  }
}
.user-info-box {
  margin: 30px 20px 0;
  padding: 30px;
  border-radius:10px;
  background: #fff;
}
</style>
