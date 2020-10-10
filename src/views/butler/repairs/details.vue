<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goBack"
    >
      <template #right>
        <span class="tf-icon tf-icon-customerservice"></span>
      </template>
    </van-nav-bar>
    <van-pull-refresh class="tf-body-container tf-padding" v-model="isLoading" @refresh="onRefresh">
      <div class="tf-card">
        <div class="tf-card-header">
          <div class="tf-card-header__title">内容描述</div>
          <div
            class="tf-text-lg"
            :class="{'tf-text-primary': status == 3 || status == 1}"
          >{{statusText[status]}}</div>
        </div>
        <div class="tf-card-content">{{content}}</div>
        <tf-image-list v-if="images.length" :data="images" :column="5" mode="show"></tf-image-list>
      </div>
      <div class="time-line-box">
        <tfTimeline
          class="tf-bg-white tf-mt-base tf-padding-lg"
          :options="timelineList"
          @negotiate="viewNegotiate"
          @evaluate="viewEvaluate"
        ></tfTimeline>
      </div>
    </van-pull-refresh>
    <div v-if="sub_status < 12 && (is_confirm == 0 || is_evaluate == 0)" class="operation-box">
      <!-- 不是已结案和已取消 -->
      <div v-if="sub_status < 8" class="tf-btn" @click="cancelRepair">撤销提报</div>
      <!-- 待结案和发起协商 -->
      <div v-if="sub_status == 5" class="tf-btn tf-btn-primary" @click="toNegotiateConfirm">确认协商信息</div>
      <!-- 预结案 -->
      <div
        v-if="sub_status >= 8 && is_confirm == 0"
        class="tf-btn tf-btn-primary"
        @click="finishShow = true"
      >确认完成</div>
      <!-- 评价 -->
      <div
        v-if="sub_status >= 8 && is_confirm == 1 && is_evaluate == 0"
        class="tf-btn tf-btn-primary"
        @click="goEvaluate"
      >评价</div>
    </div>
    <!-- 撤销 -->
    <tf-dialog
      v-model="revocationShow"
      title="撤销提报"
      :showFotter="true"
      :hiddenOff="true"
      @confirm="revocationSubmit"
    >
      <template>
        <div class="plan-alert tf-mt-base tf-mb-lg">
          撤销后将不再进行处理解决
        </div>
        <div class="tf-form-box">
          <div class="tf-form-label required">撤销原因：</div>
          <div class="tf-form-item">
            <tf-picker
              class="tf-form-item__input"
              v-model="repealRefuseReason"
              title="撤销原因"
              value-key="content"
              selected-key="content"
              :columns="reasonList"
            >
              <template v-slot="{ valueText }">
                <div
                  class="reason-text"
                  :class="{ 'picker-active': repealRefuseReason }"
                >
                  {{ valueText }}
                </div>
              </template>
            </tf-picker>
            <div class="tf-icon tf-icon-caret-down tf-form-item__icon"></div>
          </div>
        </div>
        <div class="tf-form-box">
          <div class="tf-form-label">补充说明：</div>
          <van-field
            v-model="repealOtherReason"
            class="tf-form-item__textarea"
            rows="2"
            autosize
            type="textarea"
            maxlength="300"
            placeholder="请输入"
          />
        </div>
      </template>
    </tf-dialog>
    <!-- 确认协商信息 -->
    <tf-dialog class="negotiate-dialog" v-model="negotiateConfirm" title="请确认协商信息">
      <template>
        <div class="plan-alert">若与处理人员协商不一致，可拒绝</div>
        <div class="tf-text tf-mt-lg tf-mb-lg">
          <span class="lp112">费</span>
          <template v-if="parseInt(negotiateInfo.negotiation_costs) > 0">
            <span>用：预计</span>
            <span>{{negotiateInfo.negotiation_costs}}</span>
            元
          </template>
          <template v-else>
            <span>用：{{negotiateInfo.negotiation_costs}}元</span>
          </template>
        </div>
        <div class="tf-text tf-mb-lg">预约处理时间：{{negotiateInfo.negotiation_time}}</div>
        <div class="dialog-footer">
          <van-button size="small" style="width: 48%;" @click="toRefuse">拒绝</van-button>
          <van-button size="small" type="danger" style="width: 48%;" @click="confirmNegotiate">确认</van-button>
        </div>
      </template>
    </tf-dialog>
    <!-- 协商信息确认结果 -->
    <tf-dialog class="negotiate-dialog" v-model="negotiateShow" title="协商信息">
      <!-- <div class="padding40"> -->
      <div class="tf-text tf-mb-lg">
        <span class="lp112">费</span>
        <span>用：预计</span>
        <span>{{negotiateInfo.negotiation_costs}}</span>
        元
      </div>
      <div class="tf-text tf-mb-lg">预约处理时间：{{negotiateInfo.negotiation_time}}</div>
      <div v-if="sub_status == 7" class="tf-text tf-row tf-mb-lg">
        <div>
          <span class="lp18">拒绝原</span>
          因：
        </div>
        <div class="tf-flex-item">
          {{negotiateInfo.refuse_reason}}
          <span v-if="other_reason">({{other_reason}})</span>
        </div>
      </div>
      <div class="confirm-btn">{{sub_status == 6 ? '已确认' : '已拒绝'}}</div>
      <!-- </div> -->
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
              v-model="refuse_reason"
              title="拒绝原因"
              value-key="content"
              selected-key="content"
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
            v-model="other_reason"
            class="tf-form-item__textarea"
            rows="2"
            autosize
            type="textarea"
            maxlength="300"
            placeholder="请输入"
          />
        </div>
      </template>
    </tf-dialog>
    <!-- 确认完成报事报修弹窗 -->
    <tf-dialog v-model="finishShow">
      <div class="padding40">
        <div class="finish-title">处理人员是否处理完成？</div>
        <div class="finish-description">(若有其他问题，请联系客服)</div>
        <van-button size="small" type="primary" style="width: 100%;" @click="caseOverAffirm">确定完成</van-button>
      </div>
    </tf-dialog>
    <!-- 评价信息 -->
    <tf-dialog v-model="evaluateDialog" title="评价">
      <template>
        <div class="tf-form-box">
          <div class="evaluate-title">
            对处理人员
            <span class="tf-text-grey">({{evaluateInfo.nickname}})</span>
            {{rateText[evaluateInfo.evaluate_stars]}}
          </div>
          <div class="rate-box">
            <van-rate
              v-model="evaluateInfo.evaluate_stars"
              :size="26"
              color="#FFA110"
              void-icon="star"
              void-color="#aaa"
              readonly
            />
          </div>
          <div class="rate-tag-box">
            <div v-for="(item, i) in evaluateReasonList" :key="i" class="rate-tag">{{item}}</div>
          </div>
          <template v-if="evaluateInfo.evaluate_content">
            <div class="tf-form-label">其他补充：</div>
            <div class="textarea-box tf-text">{{evaluateInfo.evaluate_content}}</div>
          </template>
        </div>
      </template>
    </tf-dialog>
  </div>
</template>

<script>
import {
  NavBar,
  Dialog,
  Button,
  Picker,
  Field,
  Rate,
  Toast,
  PullRefresh
} from 'vant'
import tfTimeline from '@/components/tf-timeline/index.vue'
import tfDialog from '@/components/tf-dialog/index.vue'
import { statusText } from '@/const/butler.js'
import {
  getRepairInfo,
  cancelRepair,
  negotiationAffirm,
  negotiationRefuse,
  caseOverAffirm,
  getRefuseReasonList,
  getNegotiationInfo,
  getUndoReasonList,
  getEvaluateInfo
} from '@/api/butler.js'
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
    [PullRefresh.name]: PullRefresh,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Rate.name]: Rate,
    [Button.name]: Button
  },
  data () {
    return {
      statusText,
      title: '',
      repairId: '',
      content: '',
      images: [],
      status: 0,
      sub_status: 0,
      ctime: '',
      negotiation_id: '',
      timelineList: [],
      isLoading: false,
      evaluateInfo: {}, // 评价信息
      negotiateInfo: {}, // 协商信息
      negotiateConfirm: false, // 是否确认协商信息弹窗
      negotiateShow: false, // 协商信息弹窗
      refuseDialog: false, // 拒绝协商弹窗
      finishShow: false, // 确认完成报事报修弹窗
      evaluateDialog: false,
      index: undefined,
      array: [],
      value: 3,
      refuseReason: '',
      other_reason: '', // 协商拒绝说明
      refuse_reason: undefined, // 协商拒绝原因值
      refuseArray: [], // 协商拒绝原因数组
      revocationShow: false, // 撤销提报弹窗
      // 评分对应内容
      rateText: {
        1: '非常不满意，各方面都很差',
        2: '不满意，比较差',
        3: '一般，还需改善',
        4: '比较满意，仍可改善',
        5: '非常满意，无可挑剔'
      },
      goBackStatus: 0, // 0：从列表来 1：从新增来
      is_confirm: 0,
      is_evaluate: 0,
      reasonList: [], // 撤销原因数组
      repealRefuseReason: undefined, // 撤销原因值
      repealOtherReason: '' // 撤销补充说明
    }
  },
  created () {
    const { id } = this.$route.query
    const { temporaryType } = this.$store.state
    this.repairId = id
    this.getRepairInfo().then(() => {
      if (temporaryType) {
        this[temporaryType] = true
        this.$store.commit('setTemporaryType', undefined)
        this.getNegotiationInfo(this.negotiation_id)
        this.getRefuseReasonList()
      }
    })
  },
  computed: {
    evaluateReasonList () {
      const { evaluate_reason } = this.evaluateInfo
      return evaluate_reason ? evaluate_reason.split(',') : []
    }
  },
  methods: {
    /* 下拉刷新 */
    onRefresh () {
      this.getRepairInfo()
    },
    /* 获取报事报修详情 */
    getRepairInfo () {
      return getRepairInfo({
        repairId: this.repairId
      }).then((res) => {
        this.isLoading = false
        const {
          content,
          images,
          status,
          records,
          sub_status,
          new_negotiation_id,
          category,
          is_confirm,
          is_evaluate
        } = res.data
        this.status = parseInt(status)
        this.sub_status = parseInt(sub_status)
        this.images = images
        this.timelineList = records
        this.content = content
        this.is_confirm = is_confirm
        this.is_evaluate = is_evaluate
        this.negotiation_id = new_negotiation_id
        this.title = this.title ? this.title : category
      })
    },
    /* 获取撤消提报原因 */
    getUndoReasonList () {
      getUndoReasonList(this.projectId).then((res) => {
        this.reasonList = res.data
      })
    },
    // 撤销提报
    cancelRepair () {
      this.getUndoReasonList()
      this.revocationShow = true
    },
    /* 撤销提报提交 */
    revocationSubmit () {
      const validator = [
        {
          value: this.repealRefuseReason,
          message: '请选择撤销原因'
        }
      ]
      validForm(validator).then(() => {
        const params = {
          repair_id: this.repairId,
          other_reason: this.repealRefuseReason,
          refuse_reason: this.repealOtherReason
        }
        cancelRepair(params, this.projectId).then((res) => {
          this.getRepairInfo()
          Toast('已经撤销提报')
          this.revocationShow = false
        })
      })
    },
    /* 查看协商信息 */
    viewNegotiate ({ negotiation_id }) {
      this.getNegotiationInfo(negotiation_id)
      this.negotiateShow = true
    },
    /* 获取协商详情 */
    getNegotiationInfo (negotiationId) {
      getNegotiationInfo({
        repairId: this.repairId,
        negotiationId
      }).then((res) => {
        this.negotiateInfo = res.data || {}
      })
    },
    /* 确认协商信息 */
    toNegotiateConfirm () {
      this.getNegotiationInfo(this.negotiation_id)
      this.negotiateConfirm = true
    },
    /* 打开拒绝协商弹窗 */
    toRefuse () {
      this.getNegotiationInfo(this.negotiation_id)
      this.getRefuseReasonList()
      this.refuse_reason = undefined
      this.other_reason = ''
      this.refuseDialog = true
    },
    /* 获取拒绝协商原因 */
    getRefuseReasonList () {
      getRefuseReasonList().then((res) => {
        this.refuseArray = res.data
      })
    },
    /* 拒绝协商信息 */
    refuse () {
      const validator = [
        {
          value: this.refuse_reason,
          message: '请选择拒绝原因'
        }
      ]
      validForm(validator).then(() => {
        const params = {
          repair_id: this.repairId,
          other_reason: this.other_reason,
          refuse_reason: this.refuse_reason
        }
        negotiationRefuse(params).then((res) => {
          Toast('已拒绝该协商信息')
          this.getRepairInfo()
          this.getNegotiationInfo(this.negotiation_id)
          this.refuseDialog = false
          this.negotiateConfirm = false
          this.negotiateShow = true
        })
      })
    },
    /* 确认协商信息 */
    confirmNegotiate () {
      negotiationAffirm({
        repair_id: this.repairId
      }).then((res) => {
        this.getRepairInfo()
        this.negotiateConfirm = false
        this.negotiateShow = true
      })
    },
    /* 确认结案 */
    caseOverAffirm () {
      caseOverAffirm({
        repair_id: this.repairId
      }).then((res) => {
        this.goEvaluate()
      })
    },
    /* 跳转评价 */
    goEvaluate () {
      this.$router.push({
        path: '/pages/butler/repairs/evaluate',
        query: {
          repairId: this.repairId
        }
      })
    },
    /* 查看评价 */
    viewEvaluate (item) {
      this.getEvaluateInfo(item)
      this.evaluateDialog = true
    },
    /* 获取评价信息 */
    getEvaluateInfo (item) {
      getEvaluateInfo({
        repair_id: this.repairId,
        evaluate_id: item.evaluate_id
      }).then((res) => {
        this.evaluateInfo = res.data || {}
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'repairsIndex') {
      next((vm) => {
        vm.goBackStatus = 1
      })
    }
    next()
  },
  beforeRouteLeave (to, from, next) {
    if (this.goBackStatus && to.name !== 'repairsList') {
      next({
        name: 'repairsList',
        replace: true
      })
    } else {
      next()
    }
  }
}
</script>

<style lang="less" scoped>
.tf-main-container {
  padding: 30px 20px 150px;
  /deep/ .van-pull-refresh__track {
    height: auto;
  }
}
.pb20 {
  padding-bottom: 30px;
}

/deep/ .van-pull-refresh {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

/deep/ .van-button--small {
  font-size: 30px;
}

.reason-text {
  font-size: 28px;
  line-height: 66px;
  color: #222;
}

.operation-box {
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
  padding: 20px 0 10px;
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
    color: #ffa110;
    font-size: 24px;
    margin-bottom: 20px;
  }
  .rate-tag + .rate-tag {
    margin-left: 20px;
  }
}
</style>
