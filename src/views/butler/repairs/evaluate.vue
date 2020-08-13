<template>
  <div class="tf-bg-white" style="height: 100%">
    <van-nav-bar title="评价" :fixed="true" :border="false" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="tf-main-container">
      <div class="tf-form-box">
        <div class="evaluate-title">
          对处理人员
          <span class="tf-text-grey">（李师傅）</span>还满意吗？
        </div>
        <div class="rate-box">
          <van-rate v-model="evaluate_stars" :size="33" color="#FFA110" void-icon="star" void-color="#aaa" />
          <div class="rate-text" v-if="evaluate_stars">{{rateText[evaluate_stars]}}</div>
        </div>
        <tf-radio-btn v-model="evaluate_reason" :radius="2" :data="items"></tf-radio-btn>
        <div class="tf-form-label">其他补充：</div>
        <van-field
          v-model="evaluate_content"
          class="tf-form-item__textarea"
          rows="2"
          autosize
          type="textarea"
          maxlength="300"
          placeholder="请输入"
          show-word-limit
        />
      </div>
      <van-button type="primary" size="large" @click="submit">匿名提交</van-button>
    </div>
  </div>
</template>

<script>
import { NavBar, Rate, Field, Button } from 'vant'
import tfRadioBtn from '@/components/tf-radio-btn'
import { validForm } from '@/utils/util'
import { evaluate } from '@/api/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Rate.name]: Rate,
    [Field.name]: Field,
    [Button.name]: Button,
    tfRadioBtn
  },
  data () {
    return {
      repairId: '',
      evaluate_stars: undefined, // 评分
      evaluate_reason: '',
      evaluate_content: '',
      items: [
        {
          value: 'USA',
          name: '美国'
        },
        {
          value: 'CHN',
          name: '中国',
          checked: 'true'
        },
        {
          value: 'BRA',
          name: '巴西'
        },
        {
          value: 'JPN',
          name: '日本'
        },
        {
          value: 'ENG',
          name: '英国'
        },
        {
          value: 'FRA',
          name: '法国'
        }
      ],
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
  created () {
    this.repairId = this.$router.query.repairId
  },
  methods: {
    /* 提交 */
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
    /* 提交评价请求 */
    evaluate () {
      evaluate({
        repair_id: this.repairId,
        evaluate_stars: this.evaluate_stars,
        evaluate_content: this.evaluate_content,
        evaluate_reason: this.evaluate_reason
      }).then(res => {
        this.$router.go(-1)
      })
    }
  }

}
</script>

<style lang='less' scoped>
.tf-main-container {
  padding-left: 50px;
  padding-right: 50px;
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
  font-size: 34px;
}
.rate-box {
  margin: 40px auto;
  text-align: center;
  /deep/ .van-rate__item {
    padding-right: 40px;
    &:last-child {
      padding-right: 0;
    }
  }
}
/deep/ .radio-btn-group {
  justify-content: space-between;
  .radio-btn__item {
    width: 45%;
    height: 66px;
    text-align: center;
    background: #fff;
    border-width: 1px;
    border-color: #aaa;
    .radio-btn__text {
      font-size: 26px;
      line-height: 66px;
    }
  }
  .radio-btn--active {
    background: #fff9e7;
    border: 2px solid #ffa110;
  }
  .radio-btn__text--active {
    font-size: 26px;
    color: #ffa110;
  }
}
.tf-form-item__textarea {
  background: @background-color;
}
.rate-text {
  text-align: center;
  font-size: 28px;
  color: #eb5841;
  margin-top: 20px;
  margin-bottom: 40px;
}
</style>
