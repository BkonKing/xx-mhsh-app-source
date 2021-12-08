<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="tf-body-container">
      <div class="form-card">
        <div class="form-card-label">
          券名称<span class="form-card-label-required">*</span>
        </div>
        <div class="area-block bottom-line uniline-textarea">
          <van-field
            v-model.trim="formData.aaa"
            maxlength="10"
            show-word-limit
            rows="1"
            :border="false"
            type="textarea"
          />
        </div>
      </div>
      <div class="form-card">
        <div class="form-card-label">
          使用时间<span class="form-card-label-required">*</span>
        </div>
        <van-radio-group
          v-model="formData.bbb"
          direction="horizontal"
          checked-color="#FF6555"
          class="tf-radio-group"
          :disabled="isLook"
        >
          <van-radio name="1">固定日期</van-radio>
          <van-radio name="2">固定天数</van-radio>
          <van-radio name="3">领取当月</van-radio>
        </van-radio-group>
        <template v-if="formData.bbb === '1'">
          <form-date-picker v-model="formData.fff"></form-date-picker>
        </template>
        <template v-if="formData.bbb === '2'">
          <div class="suffix-input tf-mb-lg">
            <van-field
              v-model="formData.ggg"
              type="number"
              class="prefix-input"
            />
            <span class="suffix-text">天</span>
          </div>
        </template>
        <div class="form-card-label">
          使用时间<span class="form-card-label-required">*</span>
        </div>
        <van-radio-group
          v-model="formData.ccc"
          direction="horizontal"
          checked-color="#FF6555"
          class="tf-radio-group"
          :disabled="isLook"
        >
          <van-radio name="1">满减券</van-radio>
          <van-radio name="2">折扣券</van-radio>
        </van-radio-group>
        <van-row class="gutter-row" type="flex">
          <van-col span="12"
            ><van-field
              v-model="formData.zzz"
              label="满"
              type="number"
              class="prefix-input"
          /></van-col>
          <van-col span="12"
            ><van-field
              v-if="formData.ccc === '1'"
              v-model="formData.yyy"
              label="减"
              type="number"
              maxlength="5"
              class="prefix-input"
            />
            <div v-if="formData.ccc === '2'" class="suffix-input">
              <van-field
                v-model="formData.xxx"
                type="number"
                maxlength="5"
                class="prefix-input"
                placeholder="9折输入9"
              />
              <span class="suffix-text">折</span>
            </div></van-col
          >
        </van-row>
        <div v-if="isEdit" class="add-coupon">
          <div class="form-card-label tf-mt-lg tf-mb-base">
            增加发行量(张)
          </div>
          <van-field
            v-model="formData.uuu"
            type="number"
            maxlength="5"
            class="prefix-input"
          />
          <span class="current-coupon-number">当前1000张</span>
        </div>
        <template v-else>
          <div class="form-card-label tf-mt-lg tf-mb-base">
            发行量（张）<span class="form-card-label-required">*</span>
          </div>
          <van-field
            v-model="formData.ddd"
            type="number"
            maxlength="5"
            class="prefix-input"
          />
        </template>
        <div class="form-card-label tf-mt-lg tf-mb-base">
          每人限领（张）<span class="form-card-label-required">*</span>
        </div>
        <select-popup
          v-model="formData.ddd"
          :options="getNumOptions"
        ></select-popup>
      </div>
      <div class="form-card" style="padding-bottom: 0;">
        <div class="form-card-label">
          使用场景<span class="form-card-label-required">*</span>
        </div>
        <van-checkbox-group
          v-model="checked"
          direction="horizontal"
          checked-color="#FEBF00"
          class="tf-checkbox-group"
        >
          <van-checkbox name="1" shape="square" :disabled="true"
            >线下使用</van-checkbox
          >
        </van-checkbox-group>
        <div class="form-card-label">
          领取方式<span class="form-card-label-required">*</span>
        </div>
        <van-radio-group
          v-model="formData.iii"
          direction="horizontal"
          checked-color="#FF6555"
          class="tf-radio-group"
          :disabled="isLook"
        >
          <van-radio name="1">免费领取</van-radio>
          <van-radio name="2">付费领取</van-radio>
        </van-radio-group>
        <van-row v-if="formData.iii === '2'" class="gutter-row" type="flex">
          <van-col span="12"
            ><van-field
              v-model="formData.jjj"
              label="幸福币"
              type="number"
              class="prefix-input"
              :disabled="!!formData.kkk"
          /></van-col>
          <van-col span="12"
            ><van-field
              v-model="formData.kkk"
              label="人民币"
              type="number"
              class="prefix-input"
              :disabled="!!formData.jjj"
          /></van-col>
        </van-row>
        <div
          class="alert-container"
          :class="{ 'tf-mt-lg': formData.iii === '2' }"
          @click="expanded = !expanded"
        >
          <div class="alert-text">
            <i class="tf-icon tf-icon-shuoming"></i>
            <span
              >特别提醒：用户在领取“付费领取”型优惠券时，所支付的幸福币平台直接回收，不归商户所有。</span
            >
          </div>
          <i
            class="van-icon van-icon-arrow"
            :class="{ 'van-icon-arrow--expanded': expanded }"
          ></i>
        </div>
        <div class="form-card-label tf-mt-lg">
          可领取用户
        </div>
        <van-radio-group
          v-model="formData.lll"
          direction="horizontal"
          checked-color="#FF6555"
          class="tf-radio-group"
          :disabled="isLook"
        >
          <van-radio name="1">全部用户</van-radio>
          <van-radio name="2">指定社区</van-radio>
          <van-radio name="3">指定类型</van-radio>
        </van-radio-group>
        <template v-if="formData.lll === '2'">
          <div class="form-select" @click="projectShow = true">
            <span class="form-text">{{ formData.vvv }}</span>
            <span class="van-icon van-icon-arrow-down"></span>
          </div>
        </template>
        <div class="userType-checkbox" v-if="formData.lll === '3'">
          <van-checkbox-group
            v-model="formData.nnn"
            direction="horizontal"
            checked-color="#FEBF00"
            class="tf-checkbox-group"
          >
            <van-checkbox
              v-for="item in userTypes"
              :name="item.value"
              :key="item.value"
              shape="square"
              >{{ item.label }}</van-checkbox
            >
          </van-checkbox-group>
        </div>
        <div class="form-card-label tf-mt-lg">
          可使用商品
        </div>
        <van-radio-group
          v-model="formData.ooo"
          direction="horizontal"
          checked-color="#FF6555"
          class="tf-radio-group"
          :disabled="isLook"
        >
          <van-radio name="1">全部商品</van-radio>
          <van-radio name="2">指定分类</van-radio>
          <van-radio name="3">指定专区</van-radio>
        </van-radio-group>
        <template v-if="formData.ooo === '2'">
          <van-field v-model="formData.ppp" class="prefix-input" />
        </template>
        <template v-if="formData.ooo === '3'">
          <van-field v-model="formData.qqq" class="prefix-input" />
        </template>
        <div class="form-card-label tf-mt-lg">
          发布时间
        </div>
        <van-radio-group
          v-model="formData.rrr"
          direction="horizontal"
          checked-color="#FF6555"
          class="tf-radio-group"
          :disabled="isLook"
        >
          <van-radio name="1">立即发布</van-radio>
          <van-radio name="2">定时发布</van-radio>
        </van-radio-group>
        <div v-if="formData.rrr === '2'" class="tf-pd-lg">
          <form-date-picker v-model="formData.sss"></form-date-picker>
        </div>
      </div>
      <van-button class="submit-btn" type="primary" size="large"
        >提交</van-button
      >
    </div>
    <select-project
      v-model="projectShow"
      title="指定社区"
      @projectSure="projectCall"
    ></select-project>
  </div>
</template>

<script>
import FormDatePicker from './components/FormDatePicker'
import SelectPopup from './components/SelectPopup'
import SelectProject from './components/SelectProject'

export default {
  name: 'shopCreateCoupon',
  components: {
    FormDatePicker,
    SelectPopup,
    SelectProject
  },
  data () {
    return {
      id: '',
      expanded: false,
      projectShow: false,
      getNumOptions: [
        {
          label: '1张',
          value: '1'
        },
        {
          label: '2张',
          value: '2'
        },
        {
          label: '3张',
          value: '3'
        },
        {
          label: '4张',
          value: '4'
        },
        {
          label: '5张',
          value: '5'
        },
        {
          label: '无限',
          value: '0'
        }
      ],
      checked: ['1'],
      userTypes: [
        {
          label: '业主',
          value: '1'
        },
        {
          label: '业主成员',
          value: '2'
        },
        {
          label: '租户',
          value: '3'
        },
        {
          label: '租户成员',
          value: '4'
        },
        {
          label: '游客',
          value: '0'
        }
      ],
      formData: {
        aaa: '',
        bbb: '1',
        ccc: '1',
        ddd: '',
        eee: '',
        fff: '',
        ggg: '',
        hhh: '',
        iii: '1',
        jjj: '',
        kkk: '',
        lll: '1',
        mmm: '',
        nnn: [],
        ooo: '',
        ppp: '',
        qqq: '',
        rrr: '',
        sss: '',
        ttt: '',
        uuu: '',
        vvv: '',
        xxx: '',
        yyy: '',
        zzz: ''
      }
    }
  },
  computed: {
    title () {
      return this.id ? '优惠券修改' : '创建优惠券'
    },
    isEdit () {
      return !!this.id
    },
    isLook () {
      return false
    }
  },
  created () {
    this.id = this.$route.query.id
    this.id && this.getData()
  },
  methods: {
    getData () {
      this.formData = {
        aaa: '22222',
        bbb: '1',
        ccc: '1',
        ddd: '',
        eee: '',
        fff: '',
        ggg: '',
        hhh: '',
        iii: '1',
        jjj: '',
        kkk: '',
        lll: '1',
        mmm: '',
        nnn: [],
        ooo: '',
        ppp: '',
        qqq: '',
        rrr: '',
        sss: '',
        ttt: '',
        uuu: '',
        vvv: '',
        xxx: '',
        yyy: '',
        zzz: ''
      }
    },
    // 项目选择(小区)
    projectCall (projectData) {
      const { id, project_name: projectName } = projectData
      this.formData.vvv = projectName
      this.formData.ttt = id
    }
  }
}
</script>

<style src="./style/form.less" lang="less" scoped></style>

<style lang="less" scoped>
.tf-body-container {
  padding-bottom: 30px;
}
.form-card-label {
  font-size: 24px;
}
.tf-radio-group {
  display: flex;
  padding: 30px 0;
  /deep/ .van-radio {
    width: 30%;
    overflow: initial;
    .van-radio__icon--checked + .van-radio__label {
      color: #000000;
    }
    .van-icon {
      width: 36px;
      height: 36px;
      line-height: 1;
    }
    .van-radio__icon {
      height: 36px;
    }
    .van-radio__label {
      color: #8f8f94;
      line-height: 1;
    }
  }
}
.tf-checkbox-group {
  padding: 30px 0;
  /deep/ .van-checkbox__label {
    font-size: 28px;
    color: #000000;
  }
  /deep/ .van-checkbox__icon--disabled .van-icon {
    background-color: #febf00;
    border-color: #febf00;
  }
  /deep/ .van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon {
    color: #fff;
  }
}
.gutter-row {
  /deep/ .van-col + .van-col {
    margin-left: 30px;
  }
}
.prefix-input {
  padding: 0;
  border: 1px solid #cccccc;
  border-radius: 10px;
  /deep/ .van-field__label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    min-width: 80px;
    height: 80px;
    padding: 0 15px;
    margin-right: 0;
    font-size: 24px;
    background: #f7f7f7;
    border-radius: 10px 0px 0px 10px;
    box-sizing: border-box;
    > span {
      line-height: 1;
    }
  }
  /deep/ .van-field__control {
    padding-left: 30px;
    line-height: 80px;
  }
  /deep/ .van-field__right-icon {
    margin-right: 20px;
    .van-icon {
      font-size: 36px;
      font-weight: bold;
      color: #222;
    }
  }
}
.suffix-input {
  display: flex;
  padding: 0;
  border: 1px solid #cccccc;
  border-radius: 10px;
  .prefix-input {
    border: none;
  }
  .suffix-text {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    min-width: 80px;
    height: 80px;
    padding: 0 15px;
    margin-right: 0;
    font-size: 24px;
    background: #f7f7f7;
    border-radius: 0px 10px 10px 0px;
    box-sizing: border-box;
  }
}
.add-coupon {
  position: relative;
  .prefix-input {
    padding-right: 210px;
  }
  .current-coupon-number {
    position: absolute;
    top: 82px;
    right: 30px;
    font-size: 24px;
    color: #000000;
  }
}
.userType-checkbox {
  width: 650px;
  height: 162px;
  padding: 30px 30px 0;
  background: #f7f7f7;
  border-radius: 10px;
  .tf-checkbox-group {
    padding: 0;
  }
  /deep/ .van-checkbox {
    width: 33.3%;
    margin-right: 0;
    margin-bottom: 30px;
  }
}
.alert-container {
  width: 650px;
  min-height: 106px;
  padding: 20px 24px;
  position: relative;
  background: #ff68570d;
  border-radius: 10px;
  .tf-icon {
    margin-right: 14px;
    font-size: 28px;
  }
  .alert-text {
    font-size: 24px;
    color: #ff6555;
  }
  .van-icon-arrow {
    position: absolute;
    right: 24px;
    bottom: 20px;
    font-size: 24px;
    color: #ff6555;
    &::before {
      transform: rotate(90deg) translateZ(0);
      transition: transform 0.3s;
    }
    &--expanded::before {
      transform: rotate(-90deg);
    }
  }
}
.submit-btn {
  width: 710px;
  height: 80px;
  margin: 60px 20px 0;
  background: #ff6555;
  border: none;
  border-radius: 40px !important;
}
.tf-pd-lg {
  padding-bottom: 30px;
}
</style>
