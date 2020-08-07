<template>
  <div class="tf-bg">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-customerservice"></span>
      </template>
    </van-nav-bar>
    <div class="tf-main-container">
      <div class="tf-card">
        <div class="tf-card-header">
          <div class="tf-card-header__title">内容描述</div>
          <div
            class="tf-text-lg"
            :class="{'tf-text-primary': status == 5 || status == 1}"
          >{{statusText[status]}}</div>
        </div>
        <div class="tf-card-content">{{content}}</div>
        <tf-image-list v-if="images.length" :data="images" :column="5" mode="show"></tf-image-list>
      </div>
      <div class="time-line-box">
        <tfTimeline class="tf-bg-white tf-mt-base tf-padding-base" :options="timelineList"></tfTimeline>
        <div class="transaction-btn-box">
          <div
            v-if="status == 6"
            class="tf-icon tf-icon-star transaction-btn"
            @click="evaluateDialog = true"
          ></div>
          <div v-if="status == 6" class="tf-icon tf-icon-image transaction-btn">
            <span class="van-info">2</span>
          </div>
          <div
            v-if="status == 6"
            class="tf-icon tf-icon-filedone transaction-btn"
            @click="negotiateShow = true"
          ></div>
        </div>
      </div>
      <div class="operation-box">
        <div v-if="status < 6" class="tf-btn" @click="cancelRepair">撤销提报</div>
        <div
          v-if="status === 5"
          class="tf-btn tf-btn-primary"
          @click="negotiateConfirm = true"
        >确认协商信息</div>
        <div v-if="status === 6" class="tf-btn tf-btn-primary" @click="finishShow = true">确认完成</div>
      </div>
    </div>
    <tf-dialog class="negotiate-dialog" v-model="negotiateConfirm" title="请确认协商信息">
      <template>
        <div class="plan-alert">若与处理人员协商不一致，可拒绝</div>
        <div class="tf-text tf-mt-lg tf-mb-lg">
          <span class="lp112">费</span>
          <span>用：预计</span>
          <span>120</span>
          元
        </div>
        <div class="tf-text tf-mb-lg">预约处理时间：2020-07-08 12:00</div>
        <div class="dialog-footer">
          <van-button size="small" style="width: 48%;" @click="refuseDialog = true">拒绝</van-button>
          <van-button size="small" type="danger" style="width: 48%;" @click="confirmNegotiate">确认</van-button>
        </div>
      </template>
    </tf-dialog>
    <!-- 协商信息确认结果 -->
    <tf-dialog class="negotiate-dialog" v-model="negotiateShow" title="协商信息">
      <div class="padding40">
        <div class="tf-text">
          <span class="lp112">费</span>
          <span>用：预计</span>
          <span>120</span>
          元
        </div>
        <div class="tf-text">预约处理时间：2020-07-08 12:00</div>
        <div v-if="!negotiateStatus" class="tf-text tf-row">
          <div>
            <span class="lp18">拒绝原</span>
            因：
          </div>
          <div class="tf-flex-item">{{refuseArray[refuseReason].label}}({{refuseExplain}})</div>
        </div>
        <div class="confirm-btn">{{negotiateStatus ? '已确认' : '已拒绝'}}</div>
      </div>
    </tf-dialog>
    <!-- 确认完场弹窗 -->
    <tf-dialog v-model="finishShow">
      <div class="padding40">
        <div class="finish-title">处理人员是否处理完成？</div>
        <div class="finish-description">(若有其他问题，请联系客服)</div>
        <van-button size="small" type="primary" style="width: 100%;" @click="goEvaluate">确定完成</van-button>
      </div>
    </tf-dialog>
    <!-- 拒绝协商信息原因 -->
    <tf-dialog
      v-model="refuseDialog"
      :showFotter="true"
      :hiddenOff="true"
      title="拒绝原因"
      @confirm="refuse"
    >
      <template>
        <div class="tf-form-box">
          <div class="tf-form-label required">拒绝原因：</div>
          <div class="tf-form-item">
            <tf-picker
              class="tf-form-item__input"
              v-model="refuseReason"
              title="拒绝原因"
              value-key="label"
              selected-key="value"
              :columns="refuseArray"
            >
              <template v-slot="{valueText}">
                <div class="reason-text">{{valueText}}</div>
              </template>
            </tf-picker>
            <div class="tf-icon tf-icon-caret-down tf-form-item__icon"></div>
          </div>
        </div>
        <div class="tf-form-box">
          <div class="tf-form-label">拒绝说明：</div>
          <van-field
            v-model="refuseExplain"
            class="tf-form-item__textarea"
            rows="2"
            autosize
            type="textarea"
            maxlength="300"
            placeholder="请输入"
            show-word-limit
          />
        </div>
      </template>
    </tf-dialog>
    <!-- 评价信息 -->
    <tf-dialog v-model="evaluateDialog" title="评价">
      <template>
        <div class="tf-form-box">
          <div class="evaluate-title">
            对处理人员
            <span class="tf-text-grey">(李师傅)</span>比较满意
          </div>
          <div class="rate-box">
            <van-rate
              v-model="value"
              :size="26"
              color="#FFA110"
              void-icon="star"
              void-color="#aaa"
              readonly
            />
          </div>
          <div class="rate-tag-box">
            <div class="rate-tag">专业</div>
            <div class="rate-tag">速度快</div>
            <div class="rate-tag">速度快</div>
            <div class="rate-tag">速度快</div>
            <div class="rate-tag">速度快</div>
          </div>
          <div class="tf-form-label">其他补充：</div>
          <div class="textarea-box">师傅态度很好，还很热心地帮忙购买需要 替换的水管</div>
        </div>
      </template>
    </tf-dialog>
  </div>
</template>

<script>
import { NavBar, Dialog, Button, Picker, Field, Rate, Toast } from 'vant'
import tfTimeline from '@/components/tf-timeline/index.vue'
import tfDialog from '@/components/tf-dialog/index.vue'
import { statusText } from '@/const/butler.js'
import { getRepairInfo, cancelRepair } from '@/api/butler.js'
import tfImageList from '@/components/tf-image-list'
import tfPicker from '@/components/tf-picker/index'
import { validForm } from '@/utils/util'
export default {
  components: {
    tfTimeline,
    tfDialog,
    tfImageList,
    tfPicker,
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Rate.name]: Rate,
    [Button.name]: Button
  },
  data () {
    return {
      statusText,
      title: '',
      content: '',
      images: [],
      status: 0,
      ctime: '',
      timelineList: [],
      negotiateConfirm: false,
      negotiateShow: false,
      finishShow: false,
      refuseDialog: false,
      evaluateDialog: false,
      index: undefined,
      array: [],
      value: 3,
      negotiateStatus: 0, // 协商状态 0：拒绝 1：确认
      refuseExplain: '', // 拒绝说明
      refuseReason: 0, // 拒绝原因值
      // 拒绝原因数组
      refuseArray: [
        {
          label: '没时间',
          value: 1
        },
        {
          label: '价格不合适',
          value: 2
        }
      ]
    }
  },
  created () {
    const { id, title, type } = this.$route.query
    this.getRepairInfo(id)
    this.title = title
    if (type) {
      this[type] = true
    }
  },
  methods: {
    /* 获取报事报修详情 */
    getRepairInfo (repairId) {
      getRepairInfo({
        repairId
      }).then((res) => {
        if (res.success) {
          const { content, images, status, records } = res.data
          this.status = status
          this.images = images
          this.timelineList = records
          this.content = content
        }
      })
    },
    // 撤销提报
    cancelRepair () {
      Dialog.confirm({
        title: '确定撤销吗'
      }).then(() => {
        cancelRepair().then((res) => {
          if (res.success) {
            this.$router.go(-1)
          }
        })
      })
    },
    /* 拒绝协商信息 */
    refuse () {
      const validator = [
        {
          value: this.refuseReason,
          message: '请选择拒绝原因'
        }
      ]
      validForm(validator).then(() => {
        const params = {
          refuseExplain: this.refuseExplain,
          refuseReason: this.refuseReason
        }
        // 请求成功后
        Toast('已拒绝该协商信息')
        this.refuseDialog = false
        this.negotiateConfirm = false
        this.negotiateStatus = 0
        this.negotiateShow = true
      })
    },
    /* 确认协商信息 */
    confirmNegotiate () {
      // 请求成功后
      this.negotiateStatus = 1
      this.negotiateConfirm = false
      this.negotiateShow = true
    },
    bindPickerChange () {},
    goEvaluate () {
      this.$router.push('/pages/butler/repairs/evaluate')
    }
  }
}
</script>

<style lang="less" scoped>
.tf-main-container {
  padding: 118px 20px 217px;
}

.reason-text {
  font-size: 28px;
  line-height: 66px;
  color: #8f8f94;
}

.operation-box {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 20px 20px;
  background-color: #fff;
  .tf-btn + .tf-btn {
    margin-left: 30px;
  }
}

.tf-card-content {
  color: @text-color;
  padding-right: 30px;
}

.tf-image-box {
  padding: 20px 30px 20px 0;
}

.time-line-box {
  position: relative;
  background: #fff;
  margin-top: 30px;
}

.transaction-btn-box {
  position: absolute;
  top: 50px;
  right: 50px;
  .transaction-btn {
    position: relative;
    width: 88px;
    height: 88px;
    line-height: 88px;
    text-align: center;
    border: 1px solid #383838;
    border-radius: 50%;
    color: #383838;
    font-size: 55px;
    background: #fff;
    .van-info {
      background: #383838;
    }
  }
  .transaction-btn + .transaction-btn {
    margin-top: 30px;
  }
}

.plan-alert {
  width: 100%;
  height: 66px;
  line-height: 66px;
  background: rgba(235, 88, 65, 0.1);
  border-radius: 4px;
  text-align: center;
  font-size: 24px;
  color: #eb5841;
}

.confirm-btn {
  width: 100%;
  height: 66px;
  line-height: 66px;
  border-radius: 4px;
  text-align: center;
  font-size: 30px;
  color: #666;
  border: 2px solid #aaa;
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
}

.finish-title {
  color: #000000;
  font-size: 34px;
  text-align: center;
}
.finish-description {
  font-size: 24px;
  color: #8f8f94;
  text-align: center;
  margin: 10px 0 60px;
}
.tf-form-item__textarea {
  padding: 0;
  /deep/ .van-field__control {
    padding: 20px;
    background: @gray-2;
  }
}
.textarea-box {
  background: #f2f2f4;
  border-radius: 4px;
  font-size: 26px;
  padding: 25px 20px;
  line-height: 40px;
}
.evaluate-title {
  text-align: center;
  font-size: 30px;
}
.rate-box {
  margin: 40px auto;
  text-align: center;
}
.padding40 {
  padding: 40px 0;
}
.lp112 {
  letter-spacing: 113px;
}
.lp18 {
  letter-spacing: 18px;
}
.negotiate-dialog {
  .tf-text {
    margin-bottom: 60px;
    line-height: 1;
  }
}
.rate-tag-box {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 60px;
  padding: 0 50px;
  .rate-tag {
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
    background: rgba(255, 192, 23, 0.1);
    border-radius: 4px;
    color: #FFA110;
    font-size: 24px;
    margin-bottom: 20px;
  }
  .rate-tag + .rate-tag  {
    margin-left: 20px;
  }
}
</style>
