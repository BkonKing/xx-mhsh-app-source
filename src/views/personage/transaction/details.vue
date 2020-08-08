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
          <div v-if="status > 4" class="plan-btn-box">
            <van-button class="plan-btn" @click="planShow = true">
              <span class="tf-icon tf-icon-plus"></span>
              添加任务进度
            </van-button>
          </div>
          <tfTimeline class="tf-bg-white tf-mt-base tf-padding-base" :options="timelineList"></tfTimeline>
          <div class="transaction-btn-box">
            <div
              v-if="status == 6"
              class="tf-icon tf-icon-star transaction-btn"
              @click="evaluateDialog = true"
            ></div>
            <div
              v-if="status == 6"
              class="tf-icon tf-icon-image transaction-btn"
              @click="showImage"
            >
              <span class="van-info">2</span>
            </div>
            <div
              v-if="status == 6"
              class="tf-icon tf-icon-filedone transaction-btn"
              @click="negotiateShow = true"
            ></div>
          </div>
        </div>
      </div>
      <div v-if="status < 6" class="operation-box">
        <div class="operation-content">
          等待
          <span class="tf-text-orange">鲁班</span>
          {{statusText[status]}}
          <span class="tf-text-primary">(剩余时间00:12:12)</span>
        </div>
        <template v-if="role">
          <div v-if="status === 1 || status === 3" class="tf-row-space-between">
            <div class="tf-btn tf-mr-lg" @click="cancelRepair">撤销提报</div>
            <div v-if="status === 1" class="tf-btn tf-btn-primary" @click="showAssign">确认受理</div>
            <div v-if="status === 3" class="tf-btn tf-btn-primary" @click="showAssign">分派人员</div>
          </div>
          <div v-if="status === 4 || status === 5" class="tf-btn" @click="cancelAssign">取消分派</div>
        </template>
        <template v-else>
          <div v-if="[4,5,6].indexOf(status) > -1" class="tf-row-space-between">
            <div class="tf-btn tf-mr-lg" @click="cancelShow = true">取消任务</div>
            <div
              v-if="status === 4"
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
              v-model="revocationReason"
              title="撤销原因"
              value-key="label"
              selected-key="value"
              :columns="revocationArray"
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
            v-model="revocationExplain"
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
    <tf-dialog v-model="assignShow" :showFotter="true" :hiddenOff="true" title="分派人员">
      <template>
        <div class="tf-form-box">
          <div class="tf-form-label">处理部门：</div>
          <div class="tf-form-item">
            <tf-picker
              class="tf-form-item__input"
              v-model="revocationReason"
              title="撤销原因"
              value-key="label"
              selected-key="value"
              :columns="revocationArray"
            >
              <template v-slot="{valueText}">
                <div class="reason-text">{{valueText}}</div>
              </template>
            </tf-picker>
            <div class="tf-icon tf-icon-caret-down tf-form-item__icon"></div>
          </div>
        </div>
        <div class="tf-form-box">
          <div class="tf-form-label">{{ status === 0 ? '处理人员' : '工作人员'}}：</div>
          <div class="tf-form-item">
            <tf-picker
              class="tf-form-item__input"
              v-model="revocationReason"
              title="撤销原因"
              value-key="label"
              selected-key="value"
              :columns="revocationArray"
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
          <div class="tf-form-item">
            <!-- <date-time-picker class="tf-form-item__input" placeholder="请选择时间" fields="minute"></date-time-picker>
            <div class="tf-icon tf-icon-time-circle tf-form-item__icon"></div>-->
          </div>
        </div>
      </template>
    </tf-dialog>
    <!-- 取消分派 -->
    <tf-dialog
      v-model="cancelShow"
      :showFotter="true"
      :hiddenOff="true"
      title="取消分派"
      @confirm="cancelSubmit"
    >
      <div class="tf-form-box">
        <div class="tf-form-label">取消原因：</div>
        <div class="tf-form-item">
          <tf-picker
            class="tf-form-item__input"
            v-model="cancelReason"
            title="取消原因"
            value-key="label"
            selected-key="value"
            :columns="cancelArray"
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
    <tf-dialog v-model="acceptPlanShow" :showFotter="true" :hiddenOff="true" title="接受任务">
      <template>
        <div class="plan-alert">任务完成时限：3天</div>
        <div class="tf-form-box">
          <div class="tf-form-label">
            是否收费：
            <span class="tf-text-grey">(请提前告知用户相关收费信息)</span>
          </div>
          <div class="tf-row-space-between">
            <van-radio-group v-model="radio">
              <van-radio name="1" checked-color="#EB5841">收费</van-radio>
              <van-radio name="2" checked-color="#EB5841">免费</van-radio>
            </van-radio-group>
            <div class="money-input">
              <van-field v-model="money" label="预计" placeholder="钱">
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
            <date-time-picker class="tf-form-item__input" placeholder="请选择时间" fields="minute"></date-time-picker>
            <div class="tf-icon tf-icon-time-circle tf-form-item__icon"></div>
          </div>
        </div>
      </template>
    </tf-dialog>
    <!-- 添加任务进度 -->
    <tf-dialog v-model="planShow" :showFotter="true" :hiddenOff="true" title="添加任务进度">
      <div class="tf-form-box">
        <div class="tf-form-label">进度内容：</div>
        <van-field
          v-model="revocationReason"
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
            v-model="revocationReason"
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
  Toast
} from 'vant'
import userInfo from '@/components/user-info/index.vue'
import tfTimeline from '@/components/tf-timeline/index.vue'
import tfPicker from '@/components/tf-picker/index'
import tfDialog from '@/components/tf-dialog/index.vue'
import tfImageList from '@/components/tf-image-list'
import { statusText } from '@/const/butler.js'
import { validForm } from '@/utils/util'
import { getRepairInfo, cancelRepair } from '@/api/butler.js'
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
    userInfo
  },
  data () {
    return {
      statusText,
      revocationShow: false,
      assignShow: false,
      cancelShow: false,
      planShow: false,
      acceptPlanShow: false,
      negotiateShow: false,
      settleShow: false,
      title: '',
      content: '',
      images: [],
      status: 0,
      ctime: '',
      timelineList: [],
      array: ['中国', '美国', '巴西', '日本'],
      index: undefined,
      revocationExplain: '', // 撤销补充说明
      revocationReason: undefined, // 撤销原因值
      // 撤销原因数组
      revocationArray: [
        {
          label: '没时间',
          value: 1
        },
        {
          label: '价格不合适',
          value: 2
        }
      ],
      cancelExplain: '', // 取消补充说明
      cancelReason: undefined, // 取消原因值
      // 取消原因数组
      cancelArray: [
        {
          label: '没时间',
          value: 1
        },
        {
          label: '价格不合适',
          value: 2
        }
      ],
      radio: '1',
      fileList: [],
      money: '',
      role: 0 // 1：管理员 0：处理员
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
        projectId: '',
        repairId
      }).then((res) => {
        if (res.success) {
          const { content, images, status, records } = res.data
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
    /* 撤销提报提交 */
    revocationSubmit () {
      const validator = [
        {
          value: this.revocationReason,
          message: '请选择撤销原因'
        }
      ]
      validForm(validator).then(() => {
        const params = {
          revocationExplain: this.revocationExplain,
          revocationReason: this.revocationReason
        }
        // 请求成功后
        Toast('已拒绝该协商信息')
        this.revocationShow = false
      })
    },
    /* 取消分派提交 */
    cancelSubmit () {
      const validator = [
        {
          value: this.cancelReason,
          message: '请选择取消原因'
        }
      ]
      validForm(validator).then(() => {
        const params = {
          cancelExplain: this.cancelExplain,
          cancelReason: this.cancelReason
        }
        // 请求成功后
        Toast('已取消分派')
        this.cancelShow = false
      })
    },
    // 分派人员
    showAssign () {
      this.assignShow = true
    },
    bindPickerChange: function (e) {
      this.index = e.target.value
    },
    cancelAssign () {
      this.cancelShow = true
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
    statusText (value) {
      const text = {
        1: '处理',
        3: '分派',
        4: '接受任务',
        5: '结案'
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
</style>
