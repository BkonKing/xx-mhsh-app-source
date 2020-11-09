<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <van-pull-refresh
      class="tf-main-container"
      v-model="isLoading"
      @refresh="getRepairInfo"
    >
      <div class="user-info-box">
        <user-info :avatar="detailInfo.avatar">
          <template #left>
            <div class="tf-space-around">
              <div class="user-info--name">
                {{ detailInfo.realname }}
                <span
                  class="tf-text-blue"
                  @click="callPhoneNumber(detailInfo.mobile)"
                  >{{ detailInfo.mobile }}</span
                >
              </div>
              <div class="user-info-time">
                {{ detailInfo.project }} {{ detailInfo.fc_info }}
              </div>
            </div>
          </template>
        </user-info>
      </div>
      <div class="tf-padding">
        <div class="tf-card">
          <div class="tf-card-header">
            <div class="tf-card-header__title">内容描述</div>
            <div class="tf-text-lg" :class="{ 'tf-text-primary': status < 4 }">
              {{ statusText[status] }}
            </div>
          </div>
          <div class="tf-card-content">{{ detailInfo.content }}</div>
          <tf-image-list
            v-if="detailInfo.images && detailInfo.images.length"
            :data="detailInfo.images"
            :column="5"
            mode="show"
          ></tf-image-list>
        </div>
        <div class="time-line-box">
          <div
            v-if="userInfo.id === detailInfo.designee_uid && sub_status == 6"
            class="plan-btn-box"
          >
            <van-button class="plan-btn" @click="addPlan">
              <span class="tf-icon tf-icon-plus"></span>
              添加任务进度
            </van-button>
          </div>
          <tfTimeline
            class="tf-bg-white tf-mt-base tf-padding-lg"
            :evaluateBtn="this.userInfo.role_dep == 1"
            :options="detailInfo.records"
            @negotiate="viewNegotiate"
            @evaluate="viewEvaluate"
          ></tfTimeline>
        </div>
      </div>
    </van-pull-refresh>
    <template v-if="serviceOperateStatus || disposeStatus">
      <div class="operation-box">
        <div class="operation-content">
          等待
          <span class="tf-text-orange">{{ detailInfo.designee }}</span>
          {{ sub_status | statusFilter }}
          <template v-if="status == 4 && detailInfo.is_upload_images == 0"
            >上传照片</template
          >
          <span v-if="detailInfo.time_limit" class="tf-text-primary">
            ({{ detailInfo.time_limit }})
          </span>
        </div>
        <!-- 客服人员 -->
        <template v-if="serviceOperateStatus">
          <div v-if="status == 1 || status == 2" class="tf-row-space-between">
            <div class="tf-btn tf-mr-lg" @click="cancelRepair">撤销提报</div>
            <div
              v-if="status == 1"
              class="tf-btn tf-btn-primary"
              @click="acceptCase"
            >
              确认受理
            </div>
            <div
              v-if="status == 2"
              class="tf-btn tf-btn-primary"
              @click="showAssign"
            >
              分派人员
            </div>
          </div>
          <div v-if="status == 3" class="tf-btn" @click="toRefuseTask">
            取消分派
          </div>
        </template>
        <!-- 处理人员 -->
        <template v-if="disposeStatus">
          <div class="tf-row-space-between">
            <div
              v-if="[3, 6].includes(sub_status)"
              class="tf-btn tf-mr-lg"
              @click="toRefuseTask"
            >
              取消任务
            </div>
            <div
              v-if="sub_status == 3"
              class="tf-btn tf-btn-primary"
              @click="acceptPlanShow = true"
            >
              接受任务
            </div>
            <div
              v-if="sub_status == 6"
              class="tf-btn tf-btn-primary"
              @click="toCaseOver"
            >
              确认结案
            </div>
            <div
              v-if="status == 4 && detailInfo.is_upload_images == 0"
              class="tf-btn tf-btn-primary"
              @click="openUploadImg"
            >
              上传照片
            </div>
          </div>
        </template>
      </div>
    </template>
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
              v-model="refuse_reason"
              title="撤销原因"
              value-key="content"
              selected-key="content"
              :columns="reasonList"
            >
              <template v-slot="{ valueText }">
                <div
                  class="reason-text"
                  :class="{ 'picker-active': refuse_reason }"
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
    <!-- 分派人员 -->
    <tf-dialog
      v-model="assignShow"
      :showFotter="true"
      :hiddenOff="true"
      title="分派人员"
      @confirm="assignTasks"
    >
      <template>
        <div class="tf-form-box">
          <div class="tf-form-label required">处理部门：</div>
          <div class="tf-form-item">
            <tf-picker
              class="tf-form-item__input"
              v-model="departmentValue"
              title="处理部门"
              value-key="text"
              selected-key="value"
              :columns="departmentList"
              @confirm="departmentChange"
            >
              <template v-slot="{ valueText }">
                <div
                  class="reason-text"
                  :class="{ 'picker-active': departmentValue }"
                >
                  {{ valueText }}
                </div>
              </template>
            </tf-picker>
            <div class="tf-icon tf-icon-caret-down tf-form-item__icon"></div>
          </div>
        </div>
        <div class="tf-form-box">
          <div class="tf-form-label required">处理人员：</div>
          <div class="tf-form-item">
            <tf-picker
              class="tf-form-item__input"
              v-model="designee_uid"
              title="处理人员"
              value-key="label"
              selected-key="uid"
              :columns="personnelList[departmentValue]"
            >
              <template v-slot="{ valueText }">
                <div
                  class="reason-text"
                  :class="{ 'picker-active': designee_uid }"
                >
                  {{ valueText }}
                </div>
              </template>
            </tf-picker>
            <div class="tf-icon tf-icon-caret-down tf-form-item__icon"></div>
          </div>
        </div>
        <div class="tf-form-box">
          <div class="tf-form-label required">任务完成时限：</div>
          <div class="time-limit-box">
            <tf-picker
              class="tf-form-item__input"
              v-model="limit_day"
              title="天数"
              :columns="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
            >
              <template v-slot="{ valueText }">
                <div
                  class="reason-text"
                  :class="{ 'picker-active': limit_day }"
                >
                  {{ valueText }}
                </div>
              </template>
            </tf-picker>
            <span class="tf-text tf-mr-base">天</span>
            <tf-picker
              class="tf-form-item__input"
              v-model="limit_hours"
              title="小时"
              :columns="[
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23
              ]"
            >
              <template v-slot="{ valueText }">
                <div
                  class="reason-text"
                  :class="{ 'picker-active': limit_hours }"
                >
                  {{ valueText }}
                </div>
              </template>
            </tf-picker>
            <span class="tf-text">小时</span>
          </div>
        </div>
      </template>
    </tf-dialog>
    <!-- 取消任务/取消分派 -->
    <tf-dialog
      v-model="refuseTaskShow"
      :showFotter="true"
      :hiddenOff="true"
      :title="sub_status == 3 ? '取消分派' : '取消任务'"
      @confirm="cancelSubmit"
    >
      <div class="tf-form-box">
        <div class="tf-form-label required">取消原因：</div>
        <div class="tf-form-item">
          <tf-picker
            class="tf-form-item__input"
            v-model="cancelReason"
            title="取消原因"
            value-key="content"
            selected-key="content"
            :columns="cancelReasonList"
          >
            <template v-slot="{ valueText }">
              <div
                class="reason-text"
                :class="{ 'picker-active': cancelReason }"
              >
                {{ valueText }}
              </div>
            </template>
          </tf-picker>
          <div class="tf-icon tf-icon-caret-down tf-form-item__icon"></div>
        </div>
      </div>
      <div class="tf-form-box">
        <div class="tf-form-label">取消说明：</div>
        <van-field
          v-model="cancelExplain"
          class="tf-form-item__textarea"
          rows="2"
          autosize
          type="textarea"
          maxlength="300"
          placeholder="请输入"
        />
      </div>
    </tf-dialog>
    <!-- 接受任务 -->
    <tf-dialog
      v-model="acceptPlanShow"
      :showFotter="true"
      :hiddenOff="true"
      title="接受任务"
      @confirm="negotiation"
    >
      <template>
        <div class="plan-alert tf-mb-lg">
          任务完成时限：{{ detailInfo.time_rwlimit }}
        </div>
        <div class="tf-form-box">
          <div class="tf-form-label required">
            是否收费：
            <span class="tf-text-grey">(请提前告知用户相关收费信息)</span>
          </div>
          <div class="tf-row-space-between">
            <van-radio-group
              v-model="isCharge"
              @change="negotiation_costs = ''"
            >
              <van-radio name="1" checked-color="#EB5841">收费</van-radio>
              <van-radio name="0" checked-color="#EB5841">免费</van-radio>
            </van-radio-group>
            <div class="money-input">
              <van-field
                v-if="isCharge == '1'"
                type="number"
                v-model="negotiation_costs"
                label="预计"
              >
                <template #button>元</template>
              </van-field>
            </div>
          </div>
        </div>
        <div class="tf-form-box">
          <div class="tf-form-label required">
            预约处理时间：
            <span class="tf-text-grey">(请提前与用户协商确定）</span>
          </div>
          <div class="tf-form-item">
            <tf-date-time-picker
              class="date-time-box"
              v-model="negotiation_time"
              title="预约处理时间"
              :min-date="new Date()"
            >
              <template>
                <div
                  class="tf-text text-right"
                  :class="{ 'picker-active': negotiation_time }"
                >
                  {{ negotiation_time || '选择日期时间' }}
                </div>
              </template>
            </tf-date-time-picker>
            <div class="tf-icon tf-icon-shijian tf-form-item__icon"></div>
          </div>
        </div>
      </template>
    </tf-dialog>
    <!-- 添加任务进度 -->
    <tf-dialog
      v-model="planShow"
      :showFotter="true"
      :hiddenOff="true"
      title="添加任务进度"
      @confirm="timeaxis"
    >
      <div class="tf-form-box">
        <div class="tf-form-label required">进度内容：</div>
        <van-field
          v-model="planContent"
          class="tf-form-item__textarea"
          rows="2"
          autosize
          type="textarea"
          maxlength="300"
          placeholder="请输入"
        />
      </div>
    </tf-dialog>
    <!-- 协商信息 -->
    <tf-dialog
      class="negotiate-dialog"
      v-model="negotiateShow"
      title="协商信息"
    >
      <!-- <div class="padding40"> -->
      <div class="tf-text tf-mb-lg">
        <span class="lp112">费</span>
        <span>用：预计</span>
        <span>{{ negotiateInfo.negotiation_costs }}</span>
        元
      </div>
      <div class="tf-text tf-mb-lg">
        预约处理时间：{{ negotiateInfo.negotiation_time }}
      </div>
      <div v-if="sub_status == 7" class="tf-text tf-row tf-mb-lg">
        <div>
          <span class="lp16">拒绝原</span>
          因：
        </div>
        <div class="tf-flex-item">{{ negotiateInfo.refuse_reason }}</div>
      </div>
      <div class="confirm-btn">
        {{ sub_status == 6 ? '已确认' : '已拒绝' }}
      </div>
      <!-- </div> -->
    </tf-dialog>
    <!-- 确认结案 -->
    <tf-dialog
      v-model="settleShow"
      :showFotter="true"
      :hiddenOff="true"
      title="确定结案"
      @confirm="caseOver"
    >
      <template>
        <div class="tf-form-box">
          <div class="tf-form-label">上传照片：</div>
          <van-radio-group v-model="upload_type" direction="horizontal">
            <van-radio :name="1" checked-color="#EB5841">立即上传</van-radio>
            <van-radio :name="2" checked-color="#EB5841">
              延迟上传
              <span class="tf-text-grey">(24小时内)</span>
            </van-radio>
          </van-radio-group>
          <tf-uploader
            v-if="upload_type == 1"
            class="upload-img-box mb-40"
            v-model="imageFiles"
            max-count="9"
          ></tf-uploader>
        </div>
        <div class="tf-form-box">
          <div class="tf-form-label">补充说明：</div>
          <van-field
            v-model="remarks"
            class="tf-form-item__textarea"
            rows="2"
            autosize
            type="textarea"
            maxlength="300"
            placeholder="请输入原因"
          />
        </div>
      </template>
    </tf-dialog>
    <tf-dialog
      v-model="imgUploadShow"
      title="上传照片"
      :showFotter="true"
      :hiddenOff="true"
      @confirm="closingPicture"
    >
      <tf-uploader
        class="upload-img-box"
        v-model="imageFiles"
        max-count="9"
      ></tf-uploader>
    </tf-dialog>
    <!-- 评价信息 -->
    <tf-dialog v-model="evaluateDialog" title="评价">
      <template>
        <div class="tf-form-box">
          <div class="evaluate-title">
            对处理人员
            <span class="tf-text-grey">({{ evaluateInfo.nickname }})</span>
            {{ rateText[evaluateInfo.evaluate_stars] }}
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
            <div
              v-for="(item, i) in evaluateReasonList"
              :key="i"
              class="rate-tag"
            >
              {{ item }}
            </div>
          </div>
          <template v-if="evaluateInfo.evaluate_content">
            <div class="tf-form-label">其他补充：</div>
            <div class="textarea-box tf-text">
              {{ evaluateInfo.evaluate_content }}
            </div>
          </template>
        </div>
      </template>
    </tf-dialog>
  </div>
</template>

<script>
import {
  NavBar,
  Picker,
  DatetimePicker,
  Field,
  Button,
  RadioGroup,
  Radio,
  Uploader,
  Toast,
  Dialog,
  PullRefresh,
  Rate
} from 'vant'
import userInfo from '@/components/user-info/index.vue'
import tfTimeline from '@/components/tf-timeline/index.vue'
import tfPicker from '@/components/tf-picker/index'
import tfDateTimePicker from '@/components/tf-date-time-picker/index'
import tfDialog from '@/components/tf-dialog/index.vue'
import tfImageList from '@/components/tf-image-list'
import tfUploader from '@/components/tf-uploader/index'
import { statusText } from '@/const/butler.js'
import { validForm } from '@/utils/util'
import {
  getRepairInfo,
  getUndoReasonList,
  cancelRepair,
  acceptCase,
  assignTasks,
  getCancelReasonList,
  refuseTasks,
  negotiation,
  caseOver,
  closingPicture,
  timeaxis,
  queryNegotiationInfo,
  getEvaluateInfo
} from '@/api/butler.js'
import { getDesigneeList } from '@/api/personage'
import { mapGetters } from 'vuex'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Picker.name]: Picker,
    [DatetimePicker.name]: DatetimePicker,
    [Field.name]: Field,
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Uploader.name]: Uploader,
    [PullRefresh.name]: PullRefresh,
    [Rate.name]: Rate,
    tfTimeline,
    tfImageList,
    tfDialog,
    tfPicker,
    tfDateTimePicker,
    tfUploader,
    userInfo
  },
  data () {
    return {
      statusText,
      repairId: '', // 当前报事报修id
      projectId: '', // 管理人员单独id
      status: 0,
      sub_status: 0,
      isLoading: false,
      revocationShow: false,
      assignShow: false,
      refuseTaskShow: false,
      planShow: false,
      acceptPlanShow: false,
      negotiateShow: false,
      settleShow: false,
      imgUploadShow: false,
      detailInfo: {},
      title: '',
      reasonList: [], // 撤销原因数组
      refuse_reason: undefined, // 撤销原因值
      other_reason: '', // 撤销补充说明
      // 部门列表
      departmentList: [],
      departmentValue: '', // 部门选中的值
      personnelList: {}, // 处理人员的列表
      designee_uid: '', // 处理人员id
      limit_day: '', // 分派人员完成时限天数
      limit_hours: '', // 分派人员完成时限小时数
      cancelReason: undefined, // 取消任务原因值
      cancelReasonList: [], // 取消任务原因数组
      cancelExplain: '', // 取消任务补充说明
      isCharge: '1', // 协商-是否收取费用
      negotiation_costs: '', // 协商-费用
      negotiation_time: '', // 协商 - 预约时间
      planContent: '', // 任务进度
      negotiateInfo: {},
      upload_type: 0,
      remarks: '', // 预处理 - 补充说明
      imageFiles: [],
      evaluateDialog: false,
      evaluateInfo: {}, // 评价信息
      // 评分对应内容
      rateText: {
        1: '非常不满意，各方面都很差',
        2: '不满意，比较差',
        3: '一般，还需改善',
        4: '比较满意，仍可改善',
        5: '非常满意，无可挑剔'
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    // 客服人员操作状态
    serviceOperateStatus () {
      return this.userInfo.role_dep == 1 && this.status < 4
    },
    // 处理人员操作状态
    disposeStatus () {
      return (
        this.userInfo.id === this.detailInfo.designee_uid &&
        ([3, 6].indexOf(this.sub_status) > -1 ||
          (this.status == 4 && this.detailInfo.is_upload_images == 0))
      )
    },
    evaluateReasonList () {
      const { evaluate_reason } = this.evaluateInfo
      return evaluate_reason ? evaluate_reason.split(',') : []
    }
  },
  created () {
    const { id, type } = this.$route.query
    this.repairId = id
    this.projectId = this.userInfo.xm_project_id
    this.getRepairInfo()
    if (type) {
      this[type] = true
    }
  },
  methods: {
    /* 获取报事报修详情 */
    getRepairInfo () {
      getRepairInfo(
        {
          repairId: this.repairId
        },
        this.projectId
      ).then((res) => {
        this.isLoading = false
        const { status, sub_status, category } = res.data
        this.title = category
        this.detailInfo = res.data
        this.status = parseInt(status)
        this.sub_status = parseInt(sub_status)
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
          value: this.refuse_reason,
          message: '请选择撤销原因'
        }
      ]
      validForm(validator).then(() => {
        const params = {
          repair_id: this.repairId,
          other_reason: this.other_reason,
          refuse_reason: this.refuse_reason
        }
        cancelRepair(params, this.projectId).then((res) => {
          this.getRepairInfo()
          Toast('已经撤销提报')
          this.revocationShow = false
          this.mtjEvent({
            eventId: 70
          })
        })
      })
    },
    /* 客服受理 */
    acceptCase () {
      acceptCase(
        {
          repair_id: this.repairId
        },
        this.projectId
      ).then((res) => {
        this.getRepairInfo()
        this.showAssign()
        this.mtjEvent({
          eventId: 63
        })
      })
    },
    /* 打开分派人员 */
    showAssign () {
      this.getDesigneeList()
      this.departmentValue = ''
      this.designee_uid = ''
      this.limit_day = ''
      this.limit_hours = ''
      this.assignShow = true
    },
    /* 获取事务处理人员列表 */
    getDesigneeList () {
      getDesigneeList(this.projectId).then(({ data, bm }) => {
        this.departmentList = bm
        const newData = {}
        // 格式转换 姓名-电话号码-工作日期-擅长
        Object.keys(data).forEach((key) => {
          if (data[key].length) {
            newData[key] = data[key].map((obj) => {
              const { realname, mobile, weeks, skill, uid } = obj
              return {
                label: `${realname} ${mobile} ${weeks} ${skill}`,
                uid
              }
            })
          }
        })
        this.personnelList = newData
      })
    },
    // 处理部门变更
    departmentChange () {
      this.designee_uid = ''
    },
    /* 分派人员 */
    assignTasks () {
      assignTasks(
        {
          repair_id: this.repairId,
          designee_uid: this.designee_uid,
          limit_day: this.limit_day,
          limit_hours: this.limit_hours
        },
        this.projectId
      ).then((res) => {
        this.getRepairInfo()
        Toast.success('分派人员成功')
        this.assignShow = false
        this.mtjEvent({
          eventId: 64
        })
      })
    },
    /* 打开取消任务 */
    toRefuseTask () {
      this.getCancelReasonList()
      this.refuseTaskShow = true
    },
    /* 获取取消任务原因 */
    getCancelReasonList () {
      getCancelReasonList(this.projectId).then((res) => {
        this.cancelReasonList = res.data
      })
    },
    /* 取消任务提交 */
    cancelSubmit () {
      const validator = [
        {
          value: this.cancelReason,
          message: '请选择取消原因'
        }
      ]
      validForm(validator).then(() => {
        const params = {
          repair_id: this.repairId,
          other_reason: this.cancelExplain,
          refuse_reason: this.cancelReason
        }
        refuseTasks(params, this.projectId).then((res) => {
          Dialog.alert({
            title: '已取消任务'
          }).then((res) => {
            this.refuseTaskShow = false
            this.getRepairInfo()
            this.mtjEvent({
              eventId: 68
            })
          })
        })
      })
    },
    /* 接受任务发起协商 */
    negotiation () {
      const validator = [
        {
          value: this.negotiation_time,
          message: '请选择预约处理时间'
        }
      ]
      validForm(validator).then(() => {
        const params = {
          repair_id: this.repairId,
          negotiation_costs: this.isCharge == 1 ? this.negotiation_costs : '',
          negotiation_time: this.negotiation_time
        }
        negotiation(params, this.projectId).then((res) => {
          Toast.success('您已接受该任务')
          this.getRepairInfo()
          this.acceptPlanShow = false
          this.mtjEvent({
            eventId: 65
          })
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
      queryNegotiationInfo(
        {
          repairId: this.repairId,
          negotiationId
        },
        this.projectId
      ).then((res) => {
        this.negotiateInfo = res.data || {}
      })
    },
    /* 打开任务进度弹窗 */
    addPlan () {
      this.planContent = ''
      this.planShow = true
    },
    /* 添加事务处理进度 */
    timeaxis () {
      const validator = [
        {
          value: this.planContent,
          message: '请填写任务进度'
        }
      ]
      validForm(validator).then(() => {
        Toast.loading({
          duration: 0,
          forbidClick: true,
          message: '提交中...'
        })
        const params = {
          repair_id: this.repairId,
          content: this.planContent
        }
        timeaxis(params, this.projectId).then((res) => {
          this.planShow = false
          this.getRepairInfo()
          this.$nextTick(() => {
            setTimeout(() => {
              Toast.clear()
              Toast.success('进度添加成功')
            }, 500)
          })
          this.mtjEvent({
            eventId: 66
          })
        })
      })
    },
    /* 预结案 */
    toCaseOver () {
      this.settleShow = true
    },
    // 工作人员处理预结案
    caseOver () {
      const params = {
        upload_type: this.upload_type,
        repair_id: this.repairId,
        remarks: this.remarks
      }
      if (this.upload_type === 1) {
        if (this.imageFiles.length === 0) {
          Toast('请上传图片')
          return
        }
        params.images = this.imageFiles.join(',')
      }
      caseOver(params, this.projectId).then((res) => {
        Toast.success('您已结案成功')
        this.getRepairInfo()
        this.settleShow = false
        this.mtjEvent({
          eventId: 67
        })
      })
    },
    // 打开上传图片
    openUploadImg () {
      this.imageFiles = []
      this.imgUploadShow = true
    },
    /* 上传结案图片 */
    closingPicture () {
      closingPicture(
        {
          repair_id: this.repairId,
          images: this.imageFiles.join(',')
        },
        this.projectId
      ).then((res) => {
        Toast.success('结案图片上传成功')
        this.getRepairInfo()
        this.imgUploadShow = false
        this.mtjEvent({
          eventId: 69
        })
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
    /*  */
    callPhoneNumber (phoneNumber) {
      api.call({
        type: 'tel_prompt',
        number: phoneNumber
      })
    }
  },
  filters: {
    statusFilter (value) {
      const text = {
        1: '处理',
        2: '分派',
        3: '接受任务',
        4: '分派',
        5: '用户确认',
        6: '结案',
        7: '分派'
      }
      return text[value]
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
  flex: 1;
  overflow: auto !important;
  -webkit-overflow-scrolling: touch;
}
.operation-box {
  width: 100%;
  padding: 20px 20px 40px;
  background-color: #fff;
}
.operation-content {
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
  color: #222;
}
.alert-text {
  font-size: 28px;
  padding: 30px 50px 20px;
  text-align: center;
}
.tf-form-item__textarea {
  padding: 0;
  height: auto;
  /deep/ .van-field__control {
    padding: 20px;
    background: @gray-2;
  }
}
.user-info-box {
  margin: 30px 20px 0;
  padding: 30px;
  border-radius: 10px;
  background: #fff;
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
.plan-btn-box {
  padding: 40px 30px;
  .plan-btn {
    width: 100%;
    height: 66px;
    background: #383838;
    color: #fff;
    border: none;
  }
}
.tf-row-space-between /deep/ .van-radio + .van-radio {
  margin-top: 50px;
}
.money-input {
  flex: 1;
  padding-left: 50px;
  display: flex;
  align-items: center;
  /deep/ .van-field {
    align-items: center;
    .van-field__label {
      width: 60px;
      color: #222;
      font-size: 26px;
    }
    .van-field__body {
      height: 66px;
      border-radius: 4px;
      background: #f0f0f0;
      padding: 20px;
    }
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
  background: #f2f2f4;
  border-radius: 4px;
  text-align: center;
  font-size: 30px;
  color: #666;
}
.upload-img-box {
  /deep/ .van-uploader__upload,
  /deep/ .van-uploader__preview {
    width: 140px;
    height: 140px;
    /deep/ .van-image {
      width: 100%;
      height: 100%;
    }
  }
}
.tf-form-box {
  margin-top: 0;
}
.tf-form-box + .tf-form-box,
.mb-40 {
  margin-top: 40px;
}
.padding40 {
  padding: 40px 0;
}
.lp112 {
  letter-spacing: 113px;
}
.lp16 {
  letter-spacing: 16px;
}
.negotiate-dialog {
  .tf-text {
    margin-bottom: 60px;
    line-height: 1;
  }
}
.tf-form-item__input {
  width: 100%;
}
.reason-text {
  width: 100%;
  font-size: 28px;
  line-height: 66px;
  color: @gray-7;
  @text-ellipsis();
}
.picker-active {
  color: #222;
}
.time-limit-box {
  display: flex;
  align-items: center;
  height: 66px;
  .tf-form-item__input {
    background-color: #f0f0f0;
    border-radius: 4px;
    padding: 0 20px;
    margin-right: 20px;
  }
}
.date-time-box {
  flex: 1;
  /deep/ .tf-text.text-right {
    color: @gray-7;
    line-height: 66px;
  }
  /deep/ .tf-text.picker-active {
    color: #222;
  }
}
/deep/ .van-radio__label {
  font-size: 24px;
}
/deep/ .van-radio__icon {
  height: 32px;

  .van-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    line-height: 1;
    font-size: 24px;
  }
}
.evaluate-title {
  text-align: center;
  font-size: 30px;
}
.rate-box {
  margin: 40px auto;
  text-align: center;
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
