<template>
  <div class="tf-bg">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="tf-main-container">
      <div class="tf-bg-white" style="position:relative;overflow: hidden;">
        <userInfo :avatar="wjtp_info.avatar" :name="wjtp_info.nickname" :time="wjtp_info.ptime"></userInfo>
        <div class="finish-tag-box" v-if="wjtp_info.status == 3">
          <div class="finish-tag">
            <div class="finish-text">已结束</div>
          </div>
        </div>
        <div class="tf-article-title">
          {{wjtp_info.title}}
          <div v-if="wjtp_info.content" class="info-content">{{wjtp_info.content}}</div>
        </div>
        <div class="tf-row-space-between">
          <div
            class="tf-gradient-tag--warning"
            v-if="wjtp_info.virtual_coin > 0"
          >参与得{{wjtp_info.virtual_coin}}幸福币</div>
          <div class="people-number" :class="{'tf-text-grey': finishStatus}">{{wjtp_info.joins}}人参加</div>
        </div>
      </div>
      <div class="vote-padding">
        <!-- 问卷 -->
        <template v-if="wjtp_info.wjtp_type == 1">
          <div class="tf-text-grey tf-center tf-mb-lg">(共{{wjtp_info.item_num}}题)</div>
          <div class="question-container">
            <div class="question-box" v-for="(item,i) in voteList" :key="i">
              <div
                class="question__text"
                :class="{'required': item.is_required == 1}"
              >Q{{i + 1}}：{{item.question}}</div>
              <!-- 问卷-单选 -->
              <template v-if="item.item_type == 1">
                <van-radio-group v-model="item.answer" :disabled="Boolean(finishStatus)">
                  <van-radio v-for="(radio, i) in item.option" :key="i" :name="radio.id">
                    {{radio.content}}
                    <template #icon="props">
                      <!-- <div class="van-radio__icon van-radio__icon--round"></div> -->
                      <div class="van-icon" :class="{'radio-checked-box' : props.checked}" />
                    </template>
                  </van-radio>
                </van-radio-group>
              </template>
              <!-- 问卷-多选 -->
              <template v-else-if="item.item_type == 2">
                <van-checkbox-group v-model="item.answer" :disabled="Boolean(finishStatus)">
                  <van-checkbox
                    v-for="(checkbox, i) in item.option"
                    :key="i"
                    :name="checkbox.id"
                    shape="square"
                  >{{checkbox.content}}</van-checkbox>
                </van-checkbox-group>
              </template>
              <!-- 问卷-填写 -->
              <template v-else-if="item.item_type == 3">
                <van-field
                  class="question__textarea"
                  v-model="item.answer"
                  rows="1"
                  autosize
                  type="textarea"
                  :disabled="Boolean(finishStatus)"
                />
              </template>
            </div>
          </div>
          <div v-if="!finishStatus" class="confirm-btn-placeholder">
            <van-button class="tf-mt-lg confirm-btn" size="large" type="danger" @click="confirm">提交</van-button>
          </div>
        </template>
        <template v-else-if="wjtp_info.wjtp_type == 2">
          <div
            class="tf-text-grey tf-center tf-mb-lg"
          >投票选项({{wjtp_info.tp_type == 1 ? '单选' : '多选'}})</div>
          <div
            class="vote-box tf-row-space-between"
            v-for="(item, i) in voteList.option"
            :key="i"
            :class="{ 'vote-active': answer.indexOf(item.id) > -1 && wjtp_info.tp_type == 2 && !finishStatus}"
          >
            <!--  投票统计进度条-->
            <div class="vote-progress-placeholder">
              <div
                v-if="finishStatus && voteList.answer_count[i] && voteList.answer_count[i].num"
                class="vote-progress"
                :style="{width: `${(parseInt(voteList.answer_count[i].num) / parseInt(totalNum)) * 100}%`}"
              ></div>
            </div>
            <div class="vote-title">{{ item.content }}</div>
            <!-- 已答-->
            <div
              class="vote-result"
              v-if="finishStatus"
            >{{ (voteList.answer_count[i] && voteList.answer_count[i].num) || 0 }}票</div>
            <!-- 未答-->
            <template v-else>
              <!-- 单选 -->
              <button v-if="wjtp_info.tp_type == 1" class="vote-btn" @click="changeValue(item)">
                <span class="tf-text-white">投票</span>
              </button>
              <!-- 多选 -->
              <button v-else class="tf-icon vote-btn vote-btn--multiple" @click="changeValue(item)">
                <div
                  class="tf-text-white tf-icon"
                  :class="{'tf-icon-gou': answer.indexOf(item.id) > -1}"
                >{{ answer.indexOf(item.id) > -1 ? '' : '投票' }}</div>
              </button>
            </template>
          </div>
          <div v-if="!finishStatus && wjtp_info.tp_type == 2" class="confirm-btn-placeholder">
            <van-button class="confirm-btn" size="large" type="danger" @click="confirm">确定</van-button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {
  NavBar,
  Toast,
  Button,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Field
} from 'vant'
import userInfo from '@/components/user-info/index.vue'
import { addWjtp, getWjtpInfo } from '@/api/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Field.name]: Field,
    userInfo
  },
  data () {
    return {
      title: '',
      wjtpId: '',
      wjtp_info: {},
      voteList: [],
      answer: []
    }
  },
  created () {
    const { id } = this.$route.query
    this.wjtpId = id
    this.getWjtpInfo()
  },
  computed: {
    finishStatus () {
      return this.wjtp_info.is_answer || this.wjtp_info.status == 3
    },
    totalNum () {
      const list = this.voteList
      let num = 0
      list.answer_count.forEach((obj) => {
        num += parseInt(obj.num) || 0
      })
      return num
    }
  },
  methods: {
    /* 获取投票详情 */
    getWjtpInfo () {
      getWjtpInfo({
        wjtpId: this.wjtpId
      }).then((res) => {
        const { wjtp_info, item } = res.data
        this.wjtp_info = wjtp_info
        this.title = this.wjtp_info.wjtp_type == '1' ? '问卷' : '投票'
        // 遍历将答案为''转为[]
        this.voteList = item.map((obj) => {
          if (obj.item_type == 2) {
            obj.answer = obj.answer ? obj.answer : []
          } else {
            if (Array.isArray(obj.answer)) {
              obj.answer = obj.answer[0]
            }
          }
          return obj
        })
        // 如果是投票只需取第一个
        if (this.wjtp_info.wjtp_type == 2) {
          this.voteList = this.voteList[0]
        }
      })
    },
    /* 投票选中 */
    changeValue ({ id: value }) {
      if (this.wjtp_info.tp_type == 1) {
        this.addWjtp({
          [this.voteList.item_id]: value
        })
      } else {
        const index = this.answer.indexOf(value)
        if (index === -1) {
          this.answer.push(value)
        } else {
          this.answer.splice(index, 1)
        }
      }
    },
    /* 投票提交 */
    confirm () {
      const isEmpty = (val) =>
        typeof val === 'undefined' ||
        val === null ||
        val === '' ||
        val.length === 0
      // 问卷调查，判断必填项是否已经填写，填写完则提交
      if (this.wjtp_info.wjtp_type == 1) {
        const params = {}
        const status = this.voteList.every((obj) => {
          if (obj.is_required == '1' && isEmpty(obj.answer)) {
            console.log(obj)
            Toast('请填写未回答的问题')
            return false
          }
          if (obj.answer) {
            params[obj.item_id] =
              obj.item_type == 2
                ? (params[obj.item_id] = obj.answer.join(','))
                : obj.answer
          }
          return true
        })
        status && this.addWjtp(params)
      } else {
        // 投票多选
        if (this.answer.length > 0) {
          const params = {
            [this.voteList.item_id]: this.answer.join(',')
          }
          this.addWjtp(params)
        } else {
          Toast({
            message: '请选择要投票的选项'
          })
        }
      }
    },
    /* 上传问卷投票 */
    addWjtp (answer) {
      addWjtp({
        wjtp_id: this.wjtpId,
        answer
      }).then((res) => {
        if (res.success) {
          const message = this.wjtp_info.wjtp_type == 1 ? '问卷提交成功' : '投票成功'
          Toast.success({
            message
          })
          this.getWjtpInfo()
        } else {
          Toast.fail({
            message: '提交失败'
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tf-bg-white {
  padding: 30px;
}

.tf-article-title {
  margin-top: 60px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom-width: 2px;
  border-bottom-style: dashed;
  border-bottom-color: #aaa;
}

.info-content {
  font-size: 24px;
  color: @gray-7;
  margin-top: 20px;
}

.people-number {
  font-size: 24px;
  color: @red-dark;
}

.tf-text-grey {
  font-size: 24px;
}

.vote-box {
  position: relative;
  z-index: 1;
  padding: 10px;
  margin-bottom: 30px;
  background-color: #fff;
  border-radius: @border-radius-md;
}

.vote-progress-placeholder {
  width: calc(100% - 20px);
  position: absolute;
  top: 0.13333rem;
  bottom: 0.13333rem;
  z-index: 0;
}

.vote-progress {
  position: absolute;
  top: 10px;
  bottom: 10px;
  z-index: 0;
  // height: 120px;
  background-color: @red;
  opacity: 0.2;
  border-top-left-radius: @border-radius-md;
  border-bottom-left-radius: @border-radius-md;
}

.vote-title {
  flex: 1;
  justify-content: center;
  font-size: @font-size-lg;
  padding: 31px 30px;
  // height: 120px;
  line-height: 58px;
}

.vote-result {
  @flex-column();
  font-size: 30px;
  padding-right: 30px;
  color: @gray-7;
  justify-content: center;
  text-align: right;
}

.vote-btn {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 120px;
  justify-content: center;
  text-align: center;
  margin: 0;
  border-radius: 10px;
  border-width: 0px !important;
  font-size: 30px;
  color: #fff;
  background-image: linear-gradient(to bottom right, @red, @red-dark);
}

.vote-btn--multiple {
  background-image: linear-gradient(to bottom right, @orange, @orange-dark);
}

.vote-active {
  border-width: 2px;
  border-style: solid;
  border-color: @orange;
}

.vote-padding {
  padding: 30px 20px;
}

.question-container {
  width: 100%;
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  .question-box {
    margin-bottom: 40px;
    .question__text {
      font-size: 28px;
      margin-bottom: 20px;
    }
    .radio-checked-box {
      &::before {
        content: "";
        width: 14px;
        height: 14px;
        background: @red-dark;
        border-radius: 50%;
      }
    }
    /deep/ .van-radio {
      height: 46px;
      margin-bottom: 10px;
      .van-radio__icon {
        height: 22px;
        .van-icon {
          width: 22px;
          height: 22px;
        }
      }
      .van-radio__icon--checked .van-icon {
        background: none;
        border-color: #c8c7cc;
      }
      .van-radio__label {
        font-size: 24px;
        margin-left: 20px;
      }
    }
    /deep/ .van-checkbox {
      height: 46px;
      margin-bottom: 10px;
      .van-checkbox__icon {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        .van-icon {
          width: 30px;
          height: 30px;
        }
      }
      .van-checkbox__icon--checked .van-icon {
        background: none;
        color: @red-dark;
        border-color: #c8c7cc;
        font-size: 24px;
      }
      .van-checkbox__label {
        font-size: 24px;
        margin-left: 20px;
      }
    }
  }
}
.question__textarea {
  padding-left: 0;
  padding-right: 0;
  border-bottom: 1px solid #aaa;
}
.finish-tag-box {
  position: absolute;
  top: -44px;
  right: -44px;
  padding: 15px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 5px solid rgba(170, 170, 170, 1);
  text-align: center;
  .finish-tag {
    width: 100%;
    height: 100%;
    border: 2px solid rgba(170, 170, 170, 1);
    border-radius: 50%;
    color: #8f8f94;
    font-size: 38px;
    line-height: 170px;
    font-weight: 500;
    transform: rotate(-12deg);
  }
  .finish-text {
    position: absolute;
    top: 56px;
    right: 30px;
  }
}

.confirm-btn-placeholder {
  height: 110px;
  display: flex;
  .confirm-btn {
    position: fixed;
    left: 20px;
    right: 20px;
    bottom: 30px;
    width: calc(100% - 40px);
  }
}
</style>
