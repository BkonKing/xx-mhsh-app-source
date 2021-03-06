<template>
  <div class="tf-bg">
    <van-nav-bar
      title="评价"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="evaluate-info">
      <div class="evaluate-info-name">接单方：{{ nickname }}</div>
      <div class="evaluate-info-text">对接单方还满意吗?</div>
    </div>
    <div class="tf-main-container">
      <div class="evaluate-box">
        <div class="rate-box">
          <van-rate
            v-model="evaluate_stars"
            :size="28"
            color="#FEBF00"
            void-icon="star"
            void-color="#CCCCCC"
          />
          <div class="rate-text" v-if="evaluate_stars">
            {{ rateText[evaluate_stars] }}
          </div>
        </div>
        <div class="evaluate-list">
          <template v-for="(item, i) in evaluateTagList">
            <div
              class="radio-btn__item"
              :key="i"
              :class="{
                'radio-btn--active':
                  evaluateIdList.findIndex(obj => {
                    return obj && obj.id === item.id && obj.type === 'bad';
                  }) !== -1
              }"
              @click="handleSelectType(item.id, 'bad')"
            >
              <div class="radio-btn__text">{{ item.bad_tag_name }}</div>
            </div>
            <div
              class="radio-btn__item"
              :key="`good${i}`"
              :class="{
                'radio-btn--active':
                  evaluateIdList.findIndex(obj => {
                    return obj && obj.id === item.id && obj.type === 'good';
                  }) !== -1
              }"
              @click="handleSelectType(item.id, 'good')"
            >
              <div class="radio-btn__text">{{ item.good_tag_name }}</div>
            </div>
          </template>
        </div>
        <van-field
          v-model="evaluate_supplement"
          autosize
          rows="4"
          type="textarea"
          :maxlength="200"
          placeholder="其他补充"
          show-word-limit
          class="evaluate-form-textarea"
        />
      </div>
    </div>
    <div class="task-btn-block">
      <van-button
        class="task-btn"
        :class="{ 'no-fixed-btn': winResize }"
        v-preventReClick
        type="primary"
        :disabled="!evaluate_stars"
        @click="submit"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
// /pages/task/operate/evaluate
import { getEvaluateData, evaluateTask } from '@/api/task'
import { validForm } from '@/utils/util'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      userTaskId: '',
      evaluate_stars: undefined, // 评分
      evaluate_reason: [],
      evaluateIdList: [],
      evaluate_supplement: '',
      nickname: '',
      evaluateTagList: [],
      // 评分对应内容
      rateText: {
        1: '非常不满意',
        2: '不满意',
        3: '一般',
        4: '比较满意',
        5: '非常满意'
      }
    }
  },
  computed: {
    ...mapState(['winResize'])
  },
  created () {
    this.userTaskId = this.$route.query.userTaskId
    this.getEvaluateData()
  },
  methods: {
    // 获取任务方对接单方评价页面数据
    getEvaluateData () {
      getEvaluateData({
        user_task_id: this.userTaskId
      }).then(({ data }) => {
        const { nickname, evaluate_tag_list } = data
        this.nickname = nickname
        this.evaluateTagList = evaluate_tag_list
      })
    },
    // 评价
    handleSelectType (id, type) {
      // 加入type是为了排除同组标签内容一模一样
      const index = this.evaluateIdList.findIndex(obj => {
        return obj && obj.id === id
      })
      // 好：1，坏：2
      const newValue = `${id}-${type === 'good' ? '1' : '2'}`
      // 当前组合没有任何选择，则插入所有
      if (index === -1) {
        this.evaluateIdList.push({
          id,
          type
        })
        this.evaluate_reason.push(newValue)
      } else {
        if (
          this.evaluate_reason[index] === newValue &&
          this.evaluateIdList[index].type === type
        ) {
          // 取消选中的选项
          this.evaluateIdList.splice(index, 1)
          this.evaluate_reason.splice(index, 1)
        } else {
          // 切换选项
          this.$set(this.evaluateIdList[index], 'type', type)
          this.$set(this.evaluate_reason, index, newValue)
        }
      }
    },
    // 提交
    submit () {
      const validator = [
        {
          value: this.evaluate_stars,
          message: '请评分'
        }
      ]
      validForm(validator).then(() => {
        this.evaluate()
      })
    },
    // 提交评价请求
    evaluate () {
      evaluateTask({
        user_task_id: this.userTaskId,
        evaluate_stars: this.evaluate_stars,
        evaluate_supplement: this.evaluate_supplement,
        evaluate_tags: this.evaluate_reason
      }).then(res => {
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tf-bg {
  padding-bottom: 30px;
}
/deep/ .van-nav-bar {
  background: #febf00;
}
.evaluate-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 750px;
  height: 300px;
  background-image: url("~@/assets/neighbours/evaluate-header.png");
  background-repeat: no-repeat;
  background-size: 100% 300px;
  .evaluate-info-name {
    margin-top: 64px;
    font-size: 32px;
    font-weight: bold;
    color: #000000;
    line-height: 1;
  }
  .evaluate-info-text {
    margin-top: 40px;
    font-size: 28px;
    font-weight: 400;
    color: #000000;
    line-height: 1;
  }
}
.tf-main-container {
  padding-left: 20px;
  padding-right: 20px;
  margin-top: -80px;
  margin-bottom: 30px;
}
// 评分
.rate-box {
  @flex-center();
  flex-direction: column;
  width: 710px;
  height: 200px;
  margin: auto;
  background: #ffffff;
  border-radius: 20px;
  text-align: center;
  /deep/ .van-rate__item {
    padding-right: 40px;
    &:last-child {
      padding-right: 0;
    }
  }
  .rate-text {
    margin-top: 35px;
    font-size: 24px;
    color: #8f8f94;
    text-align: center;
  }
}
// 评价标签
.evaluate-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 710px;
  padding: 30px 10px 0 30px;
  margin-top: 30px;
  background: #ffffff;
  border-radius: 10px;
  .radio-btn__item {
    @flex-center();
    width: 300px;
    height: 64px;
    margin-right: 20px;
    margin-bottom: 30px;
    padding: 0 20px;
    background: #f7f7f7;
    border: none;
    border-radius: 10px;
    .radio-btn__text {
      font-size: 28px;
      color: #8f8f94;
      line-height: 1;
    }
  }
  .radio-btn--active {
    background: #ffedeb;
    .radio-btn__text {
      color: #ff5240;
    }
  }
}
// 其他补充
.evaluate-form-textarea {
  width: 710px;
  padding: 30px 30px 20px;
  margin-top: 30px;
  border: none;
  background: #ffffff;
  border-radius: 10px;
  /deep/ .van-field__control {
    font-size: 28px;
    color: #000000;
    line-height: 44px;
  }
  /deep/ .van-field__word-limit {
    color: #8f8f94;
  }
}

.confirm-btn {
  margin-top: 60px;
  margin-bottom: 30px;
  border-radius: 44px !important;
}
/deep/ .van-button--primary {
  background-color: #ff6555;
  border-color: #ff6555;
}
/deep/ .van-button--disabled {
  background-color: #f9cbc6;
  border-color: #f9cbc6;
  opacity: 1;
}
.no-fixed-btn {
  margin-left: 20px;
}
</style>
