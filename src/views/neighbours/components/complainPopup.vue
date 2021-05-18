<template>
  <!-- 投诉 -->
  <van-popup
    class="complain-dialog"
    safe-area-inset-bottom
    get-container="body"
    v-model="complainShow"
    position="bottom"
    @closed="com_type = ''"
    style="-webkit-overflow-scrolling: auto;overflow: initial;"
  >
    <i
      class="tf-icon tf-icon-guanbi van-popup__close-icon van-popup__close-icon--top-right"
      @click="complainShow = false"
    ></i>
    <div class="complain-title">投诉</div>
    <div class="complain-content">
      <div class="van-multi-ellipsis--l2">
        投诉
        <span class="tf-text-blue">@{{ complainInfo.nickname }}</span>
        ：{{
          complainInfo[contentKey] && complainInfo[contentKey].replace(/<.*?>/gi, "")
        }}
      </div>
    </div>
    <tf-radio-btn
      class="complain-radio"
      v-model="com_type"
      :data="types"
      :radius="2"
      :labelKey="labelKey"
      :valueKey="valueKey"
    ></tf-radio-btn>
    <div
      v-preventReClick
      class="task-btn"
      :class="{ 'unable-btn': !com_type }"
      @click="submitComplain"
    >
      投诉
    </div>
  </van-popup>
</template>

<script>
import tfRadioBtn from '@/components/tf-radio-btn/index'
import { addComplaint } from '@/api/neighbours'
import { complaintTaskQuestions } from '@/api/task'
export default {
  components: {
    tfRadioBtn
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    // 当前需要投诉的信息
    complainInfo: {
      type: Object,
      default: () => ({})
    },
    // 如果是投诉，类型 1贴子、2评论、3回复、4任务提问
    complainType: {
      type: [Number, String],
      default: 0
    },
    // 投诉类型
    types: {
      type: Array,
      default: () => [
        {
          value: '1',
          name: '垃圾营销'
        },
        {
          value: '2',
          name: '涉黄信息'
        },
        {
          value: '3',
          name: '不实信息'
        },
        {
          value: '4',
          name: '有害信息'
        },
        {
          value: '5',
          name: '人身攻击'
        },
        {
          value: '6',
          name: '违法信息'
        },
        {
          value: '7',
          name: '诈骗信息'
        },
        {
          value: '8',
          name: '泄露隐私'
        }
      ]
    },
    labelKey: {
      type: String,
      default: 'name'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    contentKey: {
      type: String,
      default: 'content'
    }
  },
  data () {
    return {
      complainShow: this.value,
      com_type: ''
    }
  },
  methods: {
    // 提交投诉
    submitComplain () {
      if (this.com_type) {
        // 1贴子、2评论、3回复投诉
        const complainType = {
          1: '4',
          2: '5',
          3: '1'
        }
        const complaintReq =
          this.complainType == 6
            ? complaintTaskQuestions({
              task_id: this.complainInfo.task_id,
              task_question_id: this.complainInfo.id,
              complaint_type: this.com_type
            }) // 任务提问投诉
            : addComplaint({
              com_type: this.com_type,
              info_type:
                  this.complainType == '1'
                    ? complainType[this.complainInfo.article_type]
                    : this.complainType,
              info_id: this.complainInfo.id
            })
        complaintReq.then(resr => {
          this.$toast.success('投诉成功')
          this.complainShow = false
          this.valueChild = false
          this.mtjEvent({
            eventId: 43
          })
        })
      } else {
        this.$toast('请选择类型')
      }
    }
  },
  watch: {
    complainShow (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.complainShow = val
    }
  }
}
</script>

<style lang="less" scoped>
/* 投诉弹窗 */
.complain-dialog {
  .complain-title {
    height: 90px;
    line-height: 90px;
    font-size: 32px;
    text-align: center;
    font-weight: 500;
    color: #000;
  }
  .complain-content {
    padding: 27px 35px 27px 26px;
    font-size: 26px;
    color: #8f8f94;
    background: #f7f7f7;
    margin-bottom: 40px;
  }
  .task-btn {
    margin: 30px auto;
  }
  .primary-btn {
    color: @red-dark;
  }
  /deep/ .radio-btn-group {
    padding-left: 25px;
    margin-right: -4px;
    .radio-btn__item {
      height: 64px;
      line-height: 64px;
      padding: 0 26px;
      margin: 0 34px 30px 0;
      border: 0;
      .radio-btn__text {
        color: #333333;
      }
    }
    .radio-btn--active {
      background: #ffedeb;
      .radio-btn__text {
        color: #ff5240;
      }
    }
    .radio-btn__text {
      font-size: 24px;
      line-height: 60px;
    }
  }
}
</style>
