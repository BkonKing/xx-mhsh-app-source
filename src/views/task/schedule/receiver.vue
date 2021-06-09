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
        <a :href="'tel: ' + maskTel" class="tel-btn"><img src="@/assets/img/task_10.png" /></a>
      </template>
    </van-nav-bar>
    <div v-if="infoData" class="tf-body-container">
      <div class="release-header">
        <div class="release-user tf-row">
          <img v-if="infoData.avatar" :src="infoData.avatar" />
          <img v-else src="@/assets/imgs/touxiang.png" />
          <div class="tf-row-space-between">
            <div class="release-name van-ellipsis">{{ infoData.nickname }}</div>
            <div class="release-time color-ccc" :class="{ 'color-FF5240': infoData.is_stop == 1, 'color-ccc': infoData.progress_status > 1 }">{{ infoData.progress_status_name }}</div>
          </div>
          <div @click="taskDetail" class="finish-btn tf-flex-center">查看任务<img src="@/assets/img/task_17.png" /></div>
        </div>
      </div>
      <schedule-list :listData="infoData.taskflow_list"></schedule-list>

      <div class="op-block">
        <div class="bottom-fiex tf-row">
          <div class="op-left tf-row">
            <div @click="quiz" class="tf-column">
              <img src="@/assets/img/task_05.png" />
              <div>提问</div>
            </div>
            <a :href="'tel: ' + infoData.contact_number" class="tf-column">
              <img src="@/assets/img/task_06.png" />
              <div>联系</div>
            </a>
            <div @click="infoData.is_can_complain == 1 && complaint()" class="tf-column" :class="{'opacity-gray': infoData.is_can_complain == 0}">
              <img src="@/assets/img/task_18.png" />
              <div>投诉</div>
            </div>
            <div v-if="infoData.is_show_abandon == 1" @click="infoData.is_can_abandon == 1 && endTask()" class="tf-column" :class="{'opacity-gray': infoData.is_can_abandon == 0}">
              <img src="@/assets/img/task_19.png" />
              <div>放弃</div>
            </div>
          </div>
          <div v-if="infoData.is_can_submit == 1" class="op-right" @click="deliverTask()">交付任务</div>
        </div>
      </div>
    </div>
    <task-popup v-model="endShow" :titName="endTit" :subTitName="endSubTit">
      <div slot="content" class="popup-cont end-cont">
        <div class="form-label">取消原因<span>*</span></div>
        <div @click="reasonShow = true" class="select-block tf-row">
          <div class="popup-select tf-row-space-between">
            {{ formData.reason || '请选择' }}
            <img src="@/assets/img/task_09.png" />
          </div>
        </div>
        <div class="form-label">补充说明</div>
        <graphic
          phTxt="请输入"
          :maxNum="200"
          @getForm="getForm"
        ></graphic>
        <van-button
          v-preventReClick
          @click="submit"
          :class="[ formData.reason && formData.content.length < 201 ? '' : 'unable-btn', 'task-btn']"
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
    <!-- <task-popup v-model="evaluateShow" :titName="evaluateTit">
      <div slot="content" class="evaluate-cont">
        <div class="evaluate-header tf-row-vertical-center">
          <img src="@/assets/img/task_15.png" />
          <img src="@/assets/img/task_16.png" />
          <div class="evaluate-user van-ellipsis">对接单方<span>旅途</span></div>
          <div class="evaluate-score">一般</div>
        </div>
        <div class="score-star tf-row-space-between">
          <div class="van-icon van-icon-star active"></div>
          <div class="van-icon van-icon-star active"></div>
          <div class="van-icon van-icon-star active"></div>
          <div class="van-icon van-icon-star"></div>
          <div class="van-icon van-icon-star"></div>
        </div>
        <div class="evaluate-label tf-row-space-between">
          <div>专业</div>
          <div>专业</div>
          <div>专业</div>
        </div>
        <div class="evaluate-cont">其他补充：噢噢噢噢噢噢噢噢哦哦哦哦哦哦哦哦哦</div>
      </div>
    </task-popup> -->

  </div>
</template>

<script>
import {
  NavBar, Toast
} from 'vant'
import taskPopup from '../components/task-popup'
import listSelect from '../components/list-select'
import graphic from '../components/graphic'
import scheduleList from './schedule-list'
import { getTaskSchedule, getReasonList, submitGiveUp } from '@/api/task'
export default {
  components: {
    [NavBar.name]: NavBar,
    taskPopup,
    listSelect,
    graphic,
    scheduleList
  },
  data () {
    return {
      taskId: '',
      infoData: '',
      endShow: false, // 放弃弹窗
      reasonShow: false,
      endTit: '放弃任务', // 放弃标题
      endSubTit: '请先与对方沟通协商', // 放弃标题
      formData: {
        reason: '',
        content: ''
      },
      reasonList: [],
      prevName: '',
      maskTel: '', // 联系电话
      complaintUid: ''
    }
  },
  created () {
    this.taskId = this.$route.query.taskId
    this.getData()
  },
  mounted () {

  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.prevName = from.name
    })
  },
  methods: {
    getData () {
      getTaskSchedule({ linli_task_id: this.taskId }).then((res) => {
        this.complaintUid = res.uid
        this.infoData = res.data[0]
        if (!this.maskTel) {
          this.maskTel = this.infoData.customer_service
        }
      })
    },
    // 放弃
    endTask () {
      if (!this.reasonList.length) {
        getReasonList({ type: 2 }).then((res) => {
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
      }
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
    // 提交
    submit () {
      if (!this.formData.reason) {
        Toast('请选择放弃任务')
        return
      }
      this.formData.user_task_id = this.infoData.id
      submitGiveUp(this.formData).then((res) => {
        this.endShow = false
        this.getData()
      })
    },
    // 交付任务
    deliverTask () {
      this.$router.push({
        name: 'operateDeliver',
        query: {
          taskId: this.taskId,
          userTaskId: this.infoData.id
        }
      })
    },
    // 提问
    quiz () {
      this.$router.push({
        name: 'operateQuiz',
        query: {
          isUp: 0,
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
          complaintUid: this.complaintUid
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
  }
}
</script>
<style lang="less" scoped>
@import url(../../../styles/task.less);
.tf-body-container{
  padding: 30px 20px;
  font-size: 28px;
  color: #333;
  background-color: #F7F7F7;
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
.release-header {
  height: 160px;
  background: linear-gradient(90deg, #FFD34D 0%, #FEBF00 100%);
  border-radius: 10px 10px 0 0;
  padding: 30px;
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
      color: #FF5240;
    }
    &.color-ccc {
      opacity: 0.6;
    }
  }
  .finish-btn {
    width: 168px;
    height: 56px;
    background: #FFF6BA;
    border-radius: 28px;
    text-align: center;
    line-height: 56px;
    font-size: 24px;
    color: #816100;
    flex-shrink: 0;
    img {
      width: 10px;
      height: 18px;
      margin-left: 12px;
    }
  }
}

.end-cont {
  .select-block {
    margin: 0;
    .popup-select {
      width: 180px;
      height: 80px;
      border: 1PX solid #CCCCCC;
      border-radius: 10px;
      color: #8F8F94;
      padding-left: 20px;
      line-height: 76px;
      align-items: center;
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
      border: 1PX solid #CCCCCC;
      border-radius: 10px;
      margin-bottom: 30px;
      overflow: hidden;
      textarea {
        min-height: 200px;
      }
    }
    .van-cell {
      // height: 210px;
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
      .van-uploader__preview {
        width: 112px;
        height: 112px;
        margin: 0 16px 20px 0;
      }
    }
  }
}

.op-right {
  width: 200px !important;
}
</style>
