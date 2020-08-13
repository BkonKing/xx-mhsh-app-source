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
              class="tf-text-lg"
              :class="{'tf-text-primary': [1,3,5].indexOf(status) > -1}"
            >{{statusText[status]}}</div>
          </div>
          <div class="tf-card-content">{{content}}</div>
          <tf-image-list v-if="images.length" :data="images" :column="5" mode="show"></tf-image-list>
        </div>
        <div class="time-line-box">
          <div v-if="sub_status == 8" class="plan-btn-box">
            <van-button class="plan-btn" @click="planShow = true">
              <span class="tf-icon tf-icon-plus"></span>
              添加任务进度
            </van-button>
          </div>
          <tfTimeline class="tf-bg-white tf-mt-base tf-padding-base" :options="timelineList"></tfTimeline>
          <div class="transaction-btn-box">
            <div
              v-if="sub_status == 10"
              class="tf-icon tf-icon-pingfenwancheng transaction-btn"
              @click="evaluateDialog = true"
            ></div>
            <div
              v-if="sub_status == 11"
              class="tf-icon tf-icon-tupian transaction-btn"
              @click="showImage"
            >
              <span class="van-info">2</span>
            </div>
            <div
              v-if="sub_status == 6"
              class="tf-icon tf-icon-xiangmuwancheng transaction-btn"
              @click="negotiateShow = true"
            ></div>
          </div>
        </div>
      </div>
      <div v-if="parseInt(status) < 4" class="operation-box">
        <div class="operation-content">
          等待
          <span class="tf-text-orange">鲁班</span>
          {{status | statusFilter}}
          <span class="tf-text-primary">(剩余时间00:12:12)</span>
        </div>
        <template v-if="userInfo.role_dep == 1">
          <div v-if="status == 1 || status == 2" class="tf-row-space-between">
            <div class="tf-btn tf-mr-lg" @click="cancelRepair">撤销提报</div>
            <div v-if="status == 1" class="tf-btn tf-btn-primary" @click="acceptCase">确认受理</div>
            <div v-if="status == 2" class="tf-btn tf-btn-primary" @click="showAssign">分派人员</div>
          </div>
          <div v-if="sub_status == 3" class="tf-btn" @click="cancelAssign">取消分派</div>
        </template>
        <template v-else>
          <div v-if="['3'].indexOf(sub_status) > -1" class="tf-row-space-between">
            <div class="tf-btn tf-mr-lg" @click="toRefuseTask">取消任务</div>
            <div
              v-if="sub_status == 3"
              class="tf-btn tf-btn-primary"
              @click="acceptPlanShow = true"
            >接受任务</div>
            <div v-if="status === 6" class="tf-btn tf-btn-primary" @click="settleShow = true">上传照片</div>
            <div v-if="status === 5" class="tf-btn tf-btn-primary" @click="showAssign">确认结案</div>
          </div>
        </template>
      </div>
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
        <div class="plan-alert tf-mt-base">撤销后将不再进行处理解决</div>
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
              <template v-slot="{valueText}">
                <div class="reason-text">{{valueText}}</div>
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
            show-word-limit
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
          <div class="tf-form-label">处理部门：</div>
          <div class="tf-form-item">
            <tf-picker
              class="tf-form-item__input"
              v-model="departmentValue"
              title="处理部门"
              value-key="label"
              selected-key="value"
              :columns="departmentList"
            >
              <template v-slot="{valueText}">
                <div class="reason-text">{{valueText}}</div>
              </template>
            </tf-picker>
            <div class="tf-icon tf-icon-caret-down tf-form-item__icon"></div>
          </div>
        </div>
        <div class="tf-form-box">
          <div class="tf-form-label">处理人员：</div>
          <div class="tf-form-item">
            <tf-picker
              class="tf-form-item__input"
              v-model="designee_uid"
              title="处理人员"
              value-key="label"
              selected-key="uid"
              :columns="personnelList[departmentValue]"
            >
              <template v-slot="{valueText}">
                <div class="reason-text">{{valueText}}</div>
              </template>
            </tf-picker>
            <div class="tf-icon tf-icon-caret-down tf-form-item__icon"></div>
          </div>
        </div>
        <div class="tf-form-box">
          <div class="tf-form-label">任务完成时限：</div>
          <div class="time-limit-box">
            <tf-picker class="tf-form-item__input" v-model="dayNum" title="天数" :columns="[0,1,2,3]">
              <template v-slot="{valueText}">
                <div class="reason-text">{{valueText}}</div>
              </template>
            </tf-picker>
            <span class="tf-text tf-mr-base">天</span>
            <tf-picker
              class="tf-form-item__input"
              v-model="hourNum"
              title="小时"
              :columns="[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]"
            >
              <template v-slot="{valueText}">
                <div class="reason-text">{{valueText}}</div>
              </template>
            </tf-picker>
            <span class="tf-text">小时</span>
          </div>
        </div>
      </template>
    </tf-dialog>
    <!-- 取消任务 -->
    <tf-dialog
      v-model="refuseTaskShow"
      :showFotter="true"
      :hiddenOff="true"
      title="取消任务"
      @confirm="cancelSubmit"
    >
      <div class="tf-form-box">
        <div class="tf-form-label">取消原因：</div>
        <div class="tf-form-item">
          <tf-picker
            class="tf-form-item__input"
            v-model="cancelReason"
            title="取消原因"
            value-key="content"
            selected-key="content"
            :columns="cancelReasonList"
          >
            <template v-slot="{valueText}">
              <div class="reason-text">{{valueText}}</div>
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
          show-word-limit
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
        <div class="plan-alert">任务完成时限：3天</div>
        <div class="tf-form-box">
          <div class="tf-form-label">
            是否收费：
            <span class="tf-text-grey">(请提前告知用户相关收费信息)</span>
          </div>
          <div class="tf-row-space-between">
            <van-radio-group v-model="isCharge">
              <van-radio name="1" checked-color="#EB5841">收费</van-radio>
              <van-radio name="0" checked-color="#EB5841">免费</van-radio>
            </van-radio-group>
            <div class="money-input">
              <van-field v-model="negotiation_costs" label="预计" placeholder="钱">
                <template #button>元</template>
              </van-field>
            </div>
          </div>
        </div>
        <div class="tf-form-box">
          <div class="tf-form-label">
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
                <div class="tf-text text-right">{{negotiation_time || '选择日期时间'}}</div>
              </template>
            </tf-date-time-picker>
            <div class="tf-icon tf-icon-shijian tf-form-item__icon"></div>
          </div>
        </div>
      </template>
    </tf-dialog>
    <!-- 添加任务进度 -->
    <tf-dialog v-model="planShow" :showFotter="true" :hiddenOff="true" title="添加任务进度">
      <div class="tf-form-box">
        <div class="tf-form-label">进度内容：</div>
        <van-field
          v-model="refuse_reason"
          class="tf-form-item__textarea"
          rows="2"
          autosize
          type="textarea"
          maxlength="300"
          placeholder="请输入"
          show-word-limit
        />
      </div>
    </tf-dialog>
    <!-- 协商信息 -->
    <tf-dialog v-model="negotiateShow" title="协商信息">
      <div class="padding40">
        <div class="plan-alert">任务完成时限：3天</div>
        <div class="tf-text tf-mt-lg tf-mb-lg">
          <span>收 费：预计</span>
          <span>120</span>
          元
        </div>
        <div class="tf-text tf-mb-lg">预约处理时间：2020-07-08 12:00</div>
        <div class="confirm-btn">用户已确认</div>
      </div>
    </tf-dialog>
    <!-- 确认结案 -->
    <tf-dialog v-model="settleShow" :showFotter="true" :hiddenOff="true" title="确定结案">
      <template>
        <div class="tf-form-box">
          <div class="tf-form-label">上传照片：</div>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="1" checked-color="#EB5841">立即上传</van-radio>
            <van-radio name="2" checked-color="#EB5841">
              延迟上传
              <span class="tf-text-grey">(24小时内)</span>
            </van-radio>
          </van-radio-group>
          <van-uploader class="upload-img-box" v-model="fileList" multiple :max-count="2" />
        </div>
        <div class="tf-form-box">
          <div class="tf-form-label">补充说明：</div>
          <van-field
            v-model="refuse_reason"
            class="tf-form-item__textarea"
            rows="2"
            autosize
            type="textarea"
            maxlength="300"
            placeholder="请输入原因"
            show-word-limit
          />
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
  ImagePreview,
  Toast,
  Dialog
} from 'vant'
import userInfo from '@/components/user-info/index.vue'
import tfTimeline from '@/components/tf-timeline/index.vue'
import tfPicker from '@/components/tf-picker/index'
import tfDateTimePicker from '@/components/tf-date-time-picker/index'
import tfDialog from '@/components/tf-dialog/index.vue'
import tfImageList from '@/components/tf-image-list'
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
  negotiation
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
    [ImagePreview.Component.name]: ImagePreview.Component,
    tfTimeline,
    tfImageList,
    tfDialog,
    tfPicker,
    tfDateTimePicker,
    userInfo
  },
  data () {
    return {
      statusText,
      repairId: '', // 当前报事报修id
      projectId: '', // 管理人员单独id
      status: 0,
      sub_status: 0,
      revocationShow: false,
      assignShow: false,
      refuseTaskShow: false,
      planShow: false,
      acceptPlanShow: false,
      negotiateShow: false,
      settleShow: false,
      title: '',
      content: '',
      images: [],
      ctime: '',
      timelineList: [],
      array: ['中国', '美国', '巴西', '日本'],
      index: undefined,
      reasonList: [], // 撤销原因数组
      refuse_reason: undefined, // 撤销原因值
      other_reason: '', // 撤销补充说明
      // 部门列表
      departmentList: [
        {
          label: '工程部',
          value: 'gcb'
        },
        {
          label: '安保部',
          value: 'abb'
        },
        {
          label: '保洁部',
          value: 'bjb'
        }
      ],
      departmentValue: '', // 部门选中的值
      personnelList: {}, // 三个处理人员的列表
      designee_uid: '', // 处理人员id
      dayNum: '', // 分派人员完成时限天数
      hourNum: '', // 分派人员完成时限小时数
      cancelReason: undefined, // 取消任务原因值
      // 取消任务原因数组
      cancelReasonList: [
        {
          label: '没时间',
          value: 1
        },
        {
          label: '价格不合适',
          value: 2
        }
      ],
      cancelExplain: '', // 取消任务补充说明
      isCharge: '1', // 协商-是否收取费用
      negotiation_costs: '', // 协商-费用
      negotiation_time: '', // 协商 - 预约时间
      fileList: []
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    const { id, title, type } = this.$route.query
    this.title = title
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
      ).then(res => {
        if (res.success) {
          const { content, images, status, records, sub_status } = res.data
          this.status = status
          this.sub_status = sub_status
          this.imgList = images
          this.timelineList = records
          this.content = content
        }
      })
    },
    /* 获取撤消提报原因 */
    getUndoReasonList () {
      getUndoReasonList(this.projectId).then(res => {
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
        cancelRepair(params, this.projectId).then(res => {
          this.getRepairInfo()
          Toast('已经撤销提报')
          this.revocationShow = false
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
      ).then(res => {
        this.showAssign()
      })
    },
    // 分派人员
    showAssign () {
      this.getDesigneeList()
      this.assignShow = true
    },
    /* 获取事务处理人员列表 */
    getDesigneeList () {
      getDesigneeList(this.projectId).then(({ data }) => {
        const newData = {}
        // 格式转换 姓名-电话号码-工作日期-擅长
        Object.keys(data).forEach(key => {
          if (data[key].length) {
            newData[key] = data[key].map(obj => {
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
    /* 分派人员 */
    assignTasks () {
      assignTasks(
        {
          repair_id: this.repairId,
          designee_uid: this.designee_uid
        },
        this.projectId
      ).then(res => {
        this.getRepairInfo()
        Toast.success('分派人员成功')
        this.assignShow = false
      })
    },
    /* 取消分派 */
    cancelAssign () {
      this.refuseTaskShow = true
    },
    /* 打开取消任务 */
    toRefuseTask () {
      this.getCancelReasonList()
      this.refuseTaskShow = true
    },
    /* 获取取消任务原因 */
    getCancelReasonList () {
      getCancelReasonList(this.projectId).then(res => {
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
        refuseTasks(params, this.projectId).then(res => {
          Dialog.alert({
            title: '已取消任务'
          }).then(res => {
            this.$router.go(-1)
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
        negotiation(params, this.projectId).then(res => {
          Toast.success('您已接受该任务')
          this.getRepairInfo()
          this.acceptPlanShow = false
        })
      })
    },
    showImage () {
      ImagePreview({
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg'
        ],
        startPosition: 0,
        onClose () {
          // do something
        }
      })
    }
  },
  filters: {
    statusFilter (value) {
      const text = {
        1: '处理',
        2: '分派',
        3: '接受任务',
        4: '结案'
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
  color: #222;
}
.alert-text {
  font-size: 28px;
  padding: 30px 50px 20px;
  text-align: center;
}
.tf-form-item__textarea {
  padding: 0;
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
.plan-btn-box {
  padding: 40px 30px;
  .plan-btn {
    width: 100%;
    height: 66px;
    background: #383838;
    color: #fff;
  }
}
.tf-row-space-between /deep/ .van-radio + .van-radio {
  margin-top: 50px;
}
.money-input {
  flex: 1;
  padding-left: 50px;
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
  margin-top: 40px;
  /deep/ .van-uploader__upload {
    width: 113px;
    height: 113px;
  }
}
.padding40 {
  padding: 40px 0;
}
.reason-text {
  font-size: 28px;
  line-height: 66px;
  color: #8f8f94;
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
    line-height: 66px;
  }
}
</style>
