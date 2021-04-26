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
      <div class="evaluate-info-name">接单方：{{ designee }}</div>
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
        <tf-radio-btn
          class="evaluate-list"
          v-model="evaluate_reason"
          :radius="5"
          :data="items"
          multiple
        ></tf-radio-btn>
        <van-field
          v-model="evaluate_content"
          autosize
          rows="4"
          type="textarea"
          :maxlength="200"
          placeholder="其他补充"
          show-word-limit
          class="evaluate-form-textarea"
        />
      </div>
      <van-button
        class="confirm-btn"
        v-preventReClick
        type="primary"
        size="large"
        :disabled="!evaluate_stars"
        @click="submit"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
// /pages/task/operate/evaluate
import tfRadioBtn from '@/components/tf-radio-btn'
import { validForm } from '@/utils/util'
import { evaluate, launchEvaluate } from '@/api/butler.js'
export default {
  components: {
    tfRadioBtn
  },
  data () {
    return {
      repairId: '',
      evaluate_stars: undefined, // 评分
      evaluate_reason: [],
      evaluate_content: '',
      designee: '',
      items: [
        {
          value: '不够专业',
          name: '不够专业'
        },
        {
          value: '专业',
          name: '专业'
        },
        {
          value: '速度慢',
          name: '速度慢'
        },
        {
          value: '速度快',
          name: '速度快'
        },
        {
          value: '服务态度恶劣',
          name: '服务态度恶劣'
        },
        {
          value: '态度友好',
          name: '态度友好'
        },
        {
          value: '脏乱不卫生',
          name: '脏乱不卫生'
        },
        {
          value: '干净整洁',
          name: '干净整洁'
        },
        {
          value: '不诚信',
          name: '不诚信'
        },
        {
          value: '诚信',
          name: '诚信'
        },
        {
          value: '价格不合理',
          name: '价格不合理'
        },
        {
          value: '价格合理',
          name: '价格合理'
        }
      ],
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
  created () {
    this.repairId = this.$route.query.repairId
    this.launchEvaluate()
  },
  methods: {
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
      evaluate({
        repair_id: this.repairId,
        evaluate_stars: this.evaluate_stars,
        evaluate_content: this.evaluate_content,
        evaluate_reason: this.evaluate_reason.join(',')
      }).then(res => {
        this.$router.go(-1)
      })
    },
    // 获取相关信息
    launchEvaluate () {
      launchEvaluate({
        repairId: this.repairId
      }).then(res => {
        this.designee = res.data.designee
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar {
  background: #FEBF00;
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
    font-weight: 600;
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
  width: 710px;
  padding: 30px 10px 0 30px;
  margin-top: 30px;
  background: #ffffff;
  border-radius: 10px;
}
/deep/ .radio-btn-group {
  justify-content: space-between;
  .radio-btn__item {
    @flex-center();
    width: 300px;
    height: 64px;
    text-align: center;
    background: #f7f7f7;
    border: none;
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
  background-color: #FF6555;
  border-color:  #FF6555;
}
/deep/ .van-button--disabled {
  background-color: #F9CBC6;
  border-color: #F9CBC6;
  opacity: 1;
}
</style>
