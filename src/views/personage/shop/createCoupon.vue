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
        <div v-if="isLook" class="coupon-name">{{ formData.coupon_name }}</div>
        <div
          v-else
          class="area-block bottom-line uniline-textarea"
          :class="{ 'error-field': validProps.coupon_name }"
        >
          <van-field
            v-model.trim="formData.coupon_name"
            maxlength="10"
            show-word-limit
            rows="1"
            :border="false"
            type="textarea"
            @blur="validate('coupon_name')"
          />
        </div>
      </div>
      <div class="form-card">
        <div class="form-card-label">
          使用时间<span class="form-card-label-required">*</span>
        </div>
        <van-radio-group
          v-model="formData.e_type"
          direction="horizontal"
          checked-color="#FF6555"
          class="tf-radio-group"
          :disabled="isDisabled"
        >
          <van-radio name="2">固定日期</van-radio>
          <van-radio name="1">固定天数</van-radio>
          <van-radio name="3">领取当月</van-radio>
        </van-radio-group>
        <template v-if="formData.e_type === '2'">
          <template v-if="isDisabled">
            <van-field
              v-model="formData.validityTime"
              class="prefix-input"
              :class="{ 'prefix-input--disabled': isDisabled }"
              :disabled="isDisabled"
            />
          </template>
          <template v-else>
            <form-date-picker
              v-model="formData.validityTime"
            ></form-date-picker>
          </template>
        </template>
        <template v-if="formData.e_type === '1'">
          <div
            class="suffix-input tf-mb-lg"
            :class="[{ 'suffix-input--disabled': isDisabled },{ 'error-field': validProps.days_num }]"
          >
            <van-field
              v-model="formData.days_num"
              type="number"
              class="prefix-input"
              :class="[
                { 'prefix-input--disabled': isDisabled },

              ]"
              :disabled="isDisabled"
              @blur="validate('days_num')"
            />
            <span class="suffix-text">天</span>
          </div>
        </template>
        <div class="form-card-label">
          使用时间<span class="form-card-label-required">*</span>
        </div>
        <van-radio-group
          v-model="formData.coupon_type"
          direction="horizontal"
          checked-color="#FF6555"
          class="tf-radio-group"
          :disabled="isDisabled"
        >
          <van-radio
            v-for="item in couponTypes"
            :name="item.key"
            :key="item.key"
            >{{ item.text }}</van-radio
          >
        </van-radio-group>
        <van-row class="gutter-row" type="flex">
          <van-col span="12"
            ><van-field
              v-model="formData.threshold_price"
              label="满"
              type="number"
              class="prefix-input"
              :class="{ 'prefix-input--disabled': isDisabled }"
              :disabled="isDisabled"
          /></van-col>
          <van-col span="12"
            ><van-field
              v-if="formData.coupon_type === '1'"
              v-model="formData.reduce_price"
              label="减"
              type="number"
              maxlength="5"
              class="prefix-input"
              :class="{ 'prefix-input--disabled': isDisabled }"
              :disabled="isDisabled"
            />
            <div v-if="formData.coupon_type === '2'" class="suffix-input">
              <van-field
                v-model="formData.reduce_discount"
                type="number"
                maxlength="5"
                class="prefix-input"
                placeholder="9折输入9"
                :class="{ 'prefix-input--disabled': isDisabled }"
                :disabled="isDisabled"
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
            v-model="formData.stock"
            type="number"
            maxlength="5"
            class="prefix-input"
          />
          <span class="current-coupon-number"
            >当前{{ formData.stockShow }}张</span
          >
        </div>
        <template v-else>
          <div class="form-card-label tf-mt-lg tf-mb-base">
            发行量（张）<span class="form-card-label-required">*</span>
          </div>
          <van-field
            v-model="formData.stock"
            type="number"
            maxlength="5"
            class="prefix-input"
            :class="{ 'prefix-input--disabled': isLook }"
            :disabled="isLook"
          />
        </template>
        <div class="form-card-label tf-mt-lg tf-mb-base">
          每人限领（张）<span class="form-card-label-required">*</span>
        </div>
        <template v-if="isLook">
          <van-field
            v-model="formData.limit_num"
            class="prefix-input"
            :class="{ 'prefix-input--disabled': isLook }"
            :disabled="isLook"
          />
        </template>
        <select-popup
          v-else
          v-model="formData.limit_num"
          :options="getNumOptions"
          :class="{ 'prefix-input--disabled': isLook }"
          :disabled="isLook"
        ></select-popup>
      </div>
      <div class="form-card" style="padding-bottom: 0;">
        <div class="form-card-label">
          使用场景<span class="form-card-label-required">*</span>
        </div>
        <van-checkbox-group
          v-model="formData.coupon_scene"
          direction="horizontal"
          checked-color="#FEBF00"
          class="tf-checkbox-group"
        >
          <van-checkbox
            v-for="item in sceneData"
            :name="item.key"
            :key="item.key"
            shape="square"
            :disabled="true"
            >{{ item.text }}</van-checkbox
          >
        </van-checkbox-group>
        <div class="form-card-label">
          领取方式<span class="form-card-label-required">*</span>
        </div>
        <van-radio-group
          v-model="formData.coupon_mode"
          direction="horizontal"
          checked-color="#FF6555"
          class="tf-radio-group"
          :disabled="isDisabled"
        >
          <van-radio
            v-for="item in receiveModes"
            :name="item.key"
            :key="item.key"
            >{{ item.text }}</van-radio
          >
        </van-radio-group>
        <van-row
          v-if="formData.coupon_mode === '2'"
          class="gutter-row"
          type="flex"
        >
          <van-col span="12"
            ><van-field
              v-model="formData.pay_credit"
              label="幸福币"
              type="number"
              class="prefix-input"
              :class="{
                'prefix-input--disabled': !!formData.pay_money || isDisabled
              }"
              :disabled="!!formData.pay_money || isDisabled"
          /></van-col>
          <van-col span="12"
            ><van-field
              v-model="formData.pay_money"
              label="人民币"
              type="number"
              class="prefix-input"
              :class="{
                'prefix-input--disabled': !!formData.pay_credit || isDisabled
              }"
              :disabled="!!formData.pay_credit || isDisabled"
          /></van-col>
        </van-row>
        <div
          v-if="remind && formData.coupon_mode === '2'"
          class="alert-container tf-mt-lg"
          @click="expanded = !expanded"
        >
          <div class="alert-text">
            <i class="tf-icon tf-icon-shuoming"></i>
            <span v-html="remind.replace(/\r\n/g, '<br/>')"></span>
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
          v-model="formData.available_type"
          direction="horizontal"
          checked-color="#FF6555"
          class="tf-radio-group"
          :disabled="isDisabled"
        >
          <van-radio
            v-for="item in receiveUserType"
            :name="item.key"
            :key="item.key"
            >{{ item.text }}</van-radio
          >
        </van-radio-group>
        <template v-if="formData.available_type === '1'">
          <div class="form-select" @click="projectShow = true">
            <span class="form-text">{{ formData.available_project_name }}</span>
            <span class="van-icon van-icon-arrow-down"></span>
          </div>
        </template>
        <div class="userType-checkbox" v-if="formData.available_type === '2'">
          <van-checkbox-group
            v-model="formData.house_role_ids"
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
          v-model="formData.goods_type"
          direction="horizontal"
          checked-color="#FF6555"
          class="tf-radio-group"
          :disabled="isDisabled"
        >
          <van-radio
            v-for="item in goodsTypes"
            :name="item.key"
            :key="item.key"
            >{{ item.text }}</van-radio
          >
        </van-radio-group>
        <template v-if="formData.goods_type === '2'">
          <van-field
            v-model="formData.goods_type_name"
            class="prefix-input"
            :class="{ 'prefix-input--disabled': isDisabled }"
            :disabled="isDisabled"
          />
        </template>
        <template v-if="formData.goods_type === '3'">
          <van-field
            v-model="formData.goods_type_precinct"
            class="prefix-input"
            :class="{ 'prefix-input--disabled': isDisabled }"
            :disabled="isDisabled"
          />
        </template>
        <div class="form-card-label tf-mt-lg">
          发布时间
        </div>
        <van-radio-group
          v-model="formData.release_type"
          direction="horizontal"
          checked-color="#FF6555"
          class="tf-radio-group"
          :disabled="isDisabled"
        >
          <van-radio name="1">立即发布</van-radio>
          <van-radio name="2">定时发布</van-radio>
        </van-radio-group>
        <div v-if="formData.release_type === '2'" class="tf-pd-lg">
          <template v-if="isDisabled">
            <van-field
              v-model="formData.planTime"
              class="prefix-input"
              :class="{ 'prefix-input--disabled': isDisabled }"
              :disabled="isDisabled"
            />
          </template>
          <form-date-picker
            v-else
            v-model="formData.planTime"
          ></form-date-picker>
        </div>
      </div>
      <van-button
        class="submit-btn"
        type="primary"
        size="large"
        @click="handleSubmit"
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
import cloneDeep from 'lodash.clonedeep'
import FormDatePicker from './components/FormDatePicker'
import SelectPopup from './components/SelectPopup'
import SelectProject from './components/SelectProject'
import { getShopCouponInfo, saveCouponInfo } from '@/api/personage/shop'

export default {
  name: 'shopCreateCoupon',
  components: {
    FormDatePicker,
    SelectPopup,
    SelectProject
  },
  data () {
    return {
      type: '0', // 0：新增，1：修改，2：查看，3：复制
      shopId: '',
      couponId: '',
      remind: '',
      couponTypes: [],
      sceneData: [],
      receiveModes: [],
      isCreditInput: false,
      isMoneyInput: false,
      receiveUserType: [],
      goodsTypes: [],
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
          value: '5'
        }
      ],
      formData: {
        coupon_name: '',
        e_type: '2',
        coupon_type: '1',
        coupon_scene: ['1'],
        stock: '',
        stockShow: '',
        limit_num: '',
        validityTime: '',
        days_num: '',
        coupon_mode: '1',
        pay_money: '',
        pay_credit: '',
        available_type: '0',
        house_role_ids: [],
        goods_type: '',
        goods_type_name: '',
        goods_type_precinct: '',
        release_type: '',
        planTime: '',
        available_project_id: '',
        available_project_name: '',
        reduce_discount: '',
        reduce_price: '',
        threshold_price: ''
      },
      validProps: {
        coupon_name: false,
        days_num: false
      }
      // @blur="validate('coupon_name')"
      // :class="{'error-field': validProps.coupon_name}"
    }
  },
  computed: {
    title () {
      const title = {
        0: '创建优惠券',
        1: '优惠券修改',
        2: '查看',
        3: '创建优惠券'
      }
      return title[this.type]
    },
    isAdd () {
      return +this.type === 0
    },
    isEdit () {
      return +this.type === 1
    },
    // 修改（领取中状态）
    isEditReceiving () {
      return this.isEdit && +this.formData.coupon_status === 1
    },
    isLook () {
      return +this.type === 2
    },
    isCopy () {
      return +this.type === 3
    },
    isDisabled () {
      return this.isLook || this.isEditReceiving
    }
  },
  created () {
    const { shopId, couponId, type } = this.$route.query
    this.shopId = shopId
    this.couponId = couponId
    type && (this.type = type)
    this.getData()
  },
  methods: {
    async getData () {
      const {
        shops_coupon_info: couponInfo,
        json_data: jsonData
      } = await getShopCouponInfo({
        shops_id: this.shopId
      })
      const {
        remind,
        coupon_type_data: couponTypes,
        coupon_scene_data: sceneData,
        coupon_mode_data: receiveModes,
        coupon_mode_type_data: modeTypeData,
        receive_coupon_data: receiveUserType,
        coupon_goods_type_data: goodsTypes
      } = jsonData
      this.remind = remind
      this.couponTypes = couponTypes
      this.sceneData = sceneData
      this.receiveModes = receiveModes
      modeTypeData.forEach(obj => {
        +obj.key === 1 && (this.isCreditInput = true);
        +obj.key === 2 && (this.isMoneyInput = true)
      })
      this.receiveUserType = receiveUserType
      this.goodsTypes = goodsTypes
      // 数据回填
      if (this.isAdd) return
      if (this.isEdit) {
        couponInfo.stockShow = couponInfo.stock
        couponInfo.stock = ''
      }
      couponInfo.coupon_scene = ['1']
      if (this.isCopy) {
        couponInfo.e_type = '2'
        couponInfo.validityTime = ''
      } else if (couponInfo.g_stime || couponInfo.g_etime) {
        couponInfo.validityTime = `${couponInfo.g_stime}~${couponInfo.g_etime}`
        couponInfo.g_stime = ''
        couponInfo.g_etime = ''
      }
      if (this.isCopy) {
        couponInfo.planTime = ''
        couponInfo.release_type = '1'
      } else if (couponInfo.plan_stime || couponInfo.plan_etime) {
        couponInfo.planTime = `${couponInfo.plan_stime}~${couponInfo.plan_etime}`
        couponInfo.plan_stime = ''
        couponInfo.plan_etime = ''
      }
      // 付费方式 1幸福币 2人民币
      if (+couponInfo.pay_type === 1) {
        couponInfo.pay_credit = couponInfo.pay_money
        couponInfo.pay_money = ''
      }
      // 商品范围类型 1全场 2分类 3专区
      if (+couponInfo.goods_type === 3) {
        couponInfo.goods_type_precinct = couponInfo.goods_type_name
        couponInfo.goods_type_name = ''
      }
      couponInfo.shops_coupon_id = this.isCopy ? '' : couponInfo.id
      this.formData = couponInfo
    },
    // 项目选择(小区)
    projectCall (projectData) {
      const { id, project_name: projectName } = projectData
      this.formData.available_project_name = projectName
      this.formData.available_project_id = id
    },
    validate (key) {
      !this.isLook && this.formData[key] && (this.validProps[key] = false)
    },
    handleSubmit () {
      let validStatus = true
      Object.keys(this.validProps).forEach(key => {
        if (!this.formData[key]) {
          validStatus = false
          this.validProps[key] = true
        }
      })
      if (validStatus) {
        this.saveCouponInfo()
      }
    },
    async saveCouponInfo () {
      const params = cloneDeep(this.formData)
      const validityTime = params.validityTime
      if (validityTime) {
        params.g_stime = validityTime[0]
        params.g_etime = validityTime[1]
      }
      const planTime = params.planTime
      if (planTime) {
        params.plan_stime = planTime[0]
        params.plan_etime = planTime[1]
      }
      if (+params.coupon_mode === 2) {
        params.pay_type = params.pay_credit ? '1' : '2'
      }
      console.log(params)
      const { success } = await saveCouponInfo(params)
      if (success) {
        this.$toast('提交成功')
      }
    }
  }
}
</script>

<style src="./style/form.less" lang="less" scoped></style>

<style lang="less" scoped>
/deep/ .van-field__control {
  font-weight: bold;
}
.error-field {
  border-color: #FF6555 !important;
}
.coupon-name {
  margin-top: 24px;
  padding-bottom: 10px;
  font-size: 28px;
  font-weight: bold;
  color: #8f8f94;
  line-height: 1;
}
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
    .van-radio__icon--disabled .van-icon {
      background: #f7f7f7;
      border-color: #f7f7f7;
    }
    .van-radio__icon--disabled.van-radio__icon--checked .van-icon {
      background: #ff6555;
      border-color: #ff6555;
      color: #fff;
    }
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
      color: #000;
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
  &--disabled {
    background: #f7f7f7;
    border-color: #f7f7f7;
    // /deep/ .van-field__label {
    //   > span {
    //     color: #bbbbbb;
    //   }
    // }
    /deep/ .van-field__control {
      font-weight: 400;
    }
  }
}
.suffix-input {
  display: flex;
  padding: 0;
  border: 1px solid #cccccc;
  border-radius: 10px;
  &--disabled {
    background: #f7f7f7;
    border-color: #f7f7f7;
  }
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
