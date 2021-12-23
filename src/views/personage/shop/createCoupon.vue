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
            :placeholder="validProps.coupon_name ? '请输入券名称' : ''"
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
              class="prefix-input tf-mb-lg"
              :class="{ 'prefix-input--disabled': isDisabled }"
              :disabled="isDisabled"
            />
          </template>
          <template v-else>
            <form-date-picker
              v-model="formData.validityTime"
              :fieldClassName="{ 'error-field': validProps.validityTime }"
              :placeholder="validProps.validityTime ? '请选择日期' : ''"
              @input="validate('validityTime')"
            ></form-date-picker>
          </template>
        </template>
        <template v-if="formData.e_type === '1'">
          <div
            class="suffix-input tf-mb-lg"
            :class="[
              { 'suffix-input--disabled': isDisabled },
              { 'error-field': validProps.days_num }
            ]"
          >
            <van-field
              v-model="formData.days_num"
              type="number"
              class="prefix-input"
              :class="{ 'prefix-input--disabled': isDisabled }"
              :disabled="isDisabled"
              :placeholder="validProps.days_num ? '请输入' : ''"
              @blur="validate('days_num')"
            />
            <span class="suffix-text">天</span>
          </div>
        </template>
        <div class="form-card-label">
          券类型<span class="form-card-label-required">*</span>
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
              :class="[
                { 'suffix-input--disabled': isDisabled },
                { 'error-field': validProps.threshold_price }
              ]"
              :disabled="isDisabled"
              :placeholder="validProps.threshold_price ? '请输入' : ''"
              @blur="validate('threshold_price')"
          /></van-col>
          <van-col span="12"
            ><van-field
              v-if="formData.coupon_type === '1'"
              v-model="formData.reduce_price"
              label="减"
              type="number"
              maxlength="5"
              class="prefix-input"
              :class="[
                { 'suffix-input--disabled': isDisabled },
                { 'error-field': validProps.reduce_price }
              ]"
              :disabled="isDisabled"
              :placeholder="validProps.reduce_price ? '请输入' : ''"
              @blur="validate('reduce_price')"
            />
            <div
              v-if="formData.coupon_type === '2'"
              class="suffix-input"
              :class="{ 'error-field': validProps.reduce_discount }"
            >
              <van-field
                v-model="formData.reduce_discount"
                type="number"
                maxlength="5"
                class="prefix-input"
                :class="{ 'prefix-input--disabled': isDisabled }"
                :disabled="isDisabled"
                :placeholder="
                  validProps.reduce_discount ? '请输入' : '9折输入9'
                "
                @blur="validate('reduce_discount')"
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
            :class="[
              { 'suffix-input--disabled': isLook },
              { 'error-field': validProps.stock }
            ]"
            :disabled="isLook"
            :placeholder="validProps.stock ? '请输入' : ''"
            @blur="validate('stock')"
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
          :class="[
            { 'suffix-input--disabled': isLook },
            { 'error-field': validProps.limit_num }
          ]"
          :disabled="isLook"
          :placeholder="validProps.limit_num ? '请选择' : ''"
          @select="validate('limit_num')"
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
          <van-col v-if="isCreditInput" span="12"
            ><van-field
              v-model="formData.pay_credit"
              label="幸福币"
              type="number"
              class="prefix-input"
              :class="[
                {
                  'prefix-input--disabled':
                    (!!formData.pay_money && isMoneyInput) || isDisabled
                },
                { 'error-field': validProps.pay_credit }
              ]"
              :disabled="(!!formData.pay_money && isMoneyInput) || isDisabled"
              :placeholder="validProps.pay_credit ? '请输入' : ''"
              @blur="handleCreditBlur"
          /></van-col>
          <van-col v-if="isMoneyInput" span="12"
            ><van-field
              v-model="formData.pay_money"
              label="人民币"
              type="number"
              class="prefix-input"
              :class="[
                {
                  'prefix-input--disabled':
                    (!!formData.pay_credit && isCreditInput) || isDisabled
                },
                { 'error-field': validProps.pay_money }
              ]"
              :disabled="(!!formData.pay_credit && isCreditInput) || isDisabled"
              :placeholder="validProps.pay_money ? '请输入' : ''"
              @blur="handleMoneyBlur"
          /></van-col>
        </van-row>
        <collapsible-info
          v-if="remind && formData.coupon_mode === '2'"
          class="tf-mt-lg"
          :value="remind"
        ></collapsible-info>
        <!-- <div
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
        </div> -->
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
        <template v-if="formData.available_type === '2'">
          <div class="form-select" @click="projectShow = true">
            <span
              class="form-text"
              :class="{ 'error-color': validProps.available_project_id }"
              >{{
                formData.available_project_id
                  ? formData.available_project_name
                  : "请选择"
              }}</span
            >
            <span class="van-icon van-icon-arrow-down"></span>
          </div>
        </template>
        <div class="userType-checkbox" v-if="formData.available_type === '3'">
          <van-checkbox-group
            v-model="formData.house_role_ids"
            direction="horizontal"
            checked-color="#FEBF00"
            class="tf-checkbox-group"
            @change="validate('house_role_ids')"
          >
            <van-checkbox
              v-for="item in userTypes"
              :name="item.value"
              :key="item.value"
              shape="square"
              >{{ item.label }}</van-checkbox
            >
          </van-checkbox-group>
          <div
            v-if="validProps.house_role_ids"
            class="error-color tf-text tf-pd-base"
          >
            请选择
          </div>
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
            :class="[
              { 'suffix-input--disabled': isDisabled },
              { 'error-field': validProps.goods_type_name }
            ]"
            :disabled="isDisabled"
            :maxlength="10"
            :placeholder="validProps.goods_type_name ? '请输入' : ''"
            @blur="validate('goods_type_name')"
          />
        </template>
        <template v-if="formData.goods_type === '3'">
          <van-field
            v-model="formData.goods_type_precinct"
            class="prefix-input"
            :class="[
              { 'suffix-input--disabled': isDisabled },
              { 'error-field': validProps.goods_type_precinct }
            ]"
            :disabled="isDisabled"
            :maxlength="10"
            :placeholder="validProps.goods_type_precinct ? '请输入' : ''"
            @blur="validate('goods_type_precinct')"
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
            :fieldClassName="{ 'error-field': validProps.planTime }"
            :placeholder="validProps.planTime ? '请选择日期' : ''"
            @input="validate('planTime')"
          ></form-date-picker>
        </div>
      </div>
    </div>
    <van-button
      v-if="!isLook"
      class="submit-btn"
      type="primary"
      size="large"
      @click="handleSubmit"
      >提交</van-button
    >
    <select-project
      v-model="projectShow"
      title="指定社区"
      :selected="formData.available_project_id"
      @projectSure="projectCall"
    ></select-project>
  </div>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
import FormDatePicker from './components/FormDatePicker'
import SelectPopup from './components/SelectPopup'
import SelectProject from './components/SelectProject'
import CollapsibleInfo from './components/CollapsibleInfo'
import { getShopCouponInfo, saveCouponInfo } from '@/api/personage/shop'

export default {
  name: 'shopCreateCoupon',
  components: {
    CollapsibleInfo,
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
          label: '不限',
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
        available_type: '1',
        house_role_ids: [],
        goods_type: '1',
        goods_type_name: '',
        goods_type_precinct: '',
        release_type: '1',
        planTime: '',
        available_project_id: '',
        available_project_name: '',
        reduce_discount: '',
        reduce_price: '',
        threshold_price: ''
      },
      validProps: {
        coupon_name: false,
        days_num: false,
        threshold_price: false,
        reduce_price: false,
        reduce_discount: false,
        stock: false,
        limit_num: false,
        pay_credit: false,
        pay_money: false,
        validityTime: false,
        available_project_id: false,
        house_role_ids: false,
        goods_type_name: false,
        goods_type_precinct: false,
        planTime: false
      }
    }
  },
  computed: {
    title () {
      const title = {
        0: '创建优惠券',
        1: '优惠券修改',
        2: '优惠券',
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
        shops_id: this.shopId,
        shops_coupon_id: this.couponId
      })
      const {
        remind,
        coupon_type_data: couponTypes,
        coupon_scene_data: sceneData,
        coupon_mode_data: receiveModes,
        coupon_mode_type: modeTypeData,
        receive_coupon_data: receiveUserType,
        coupon_goods_type_data: goodsTypes
      } = jsonData
      this.remind = remind
      this.couponTypes = couponTypes
      this.sceneData = sceneData
      this.receiveModes = receiveModes
      switch (+modeTypeData) {
        case 1:
          this.isCreditInput = true
          break
        case 2:
          this.isMoneyInput = true
          break
        case 3:
          this.isCreditInput = true
          this.isMoneyInput = true
          break
      }
      this.receiveUserType = receiveUserType
      this.goodsTypes = goodsTypes
      // 数据回填
      if (this.isAdd) return
      if (this.isEdit) {
        couponInfo.stockShow = couponInfo.stock
        couponInfo.stock = ''
      }
      couponInfo.available_type = +couponInfo.available_type + 1 + ''
      couponInfo.coupon_scene = ['1']
      if (this.isCopy) {
        couponInfo.e_type = '2'
        couponInfo.validityTime = ''
        couponInfo.days_num = ''
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
      couponInfo.house_role_ids = couponInfo.house_role_ids
        ? couponInfo.house_role_ids.split(',')
        : []
      couponInfo.shops_coupon_id = this.isCopy ? '' : couponInfo.id
      this.formData = couponInfo
    },
    handleCreditBlur () {
      this.formData.pay_money && (this.formData.pay_credit = '')
      this.validate('pay_credit')
    },
    handleMoneyBlur () {
      this.formData.pay_credit && (this.formData.pay_money = '')
      this.validate('pay_money')
    },
    // 项目选择(小区)
    projectCall (projectData) {
      const { id, project_name: projectName } = projectData
      this.formData.available_project_name = projectName
      this.formData.available_project_id = id
      this.validate('available_project_id')
    },
    validate (key) {
      !this.isLook && this.formData[key] && (this.validProps[key] = false)
    },
    handleSubmit () {
      let validStatus = true
      const props = cloneDeep(this.validProps)
      const unValidation = []
      if (+this.formData.e_type === 2) {
        unValidation.push('days_num')
      } else if (+this.formData.e_type === 1) {
        unValidation.push('validityTime')
      } else {
        unValidation.push('days_num', 'validityTime')
      }
      if (+this.formData.coupon_type === 1) {
        unValidation.push('reduce_discount')
      } else if (+this.formData.coupon_type === 2) {
        unValidation.push('reduce_price')
      }
      if (!(+this.formData.coupon_mode === 2)) {
        unValidation.push('pay_credit', 'pay_money')
      } else {
        unValidation.push(
          this.formData.pay_credit ? 'pay_money' : 'pay_credit'
        )
      }
      if (this.isEdit) {
        unValidation.push('stock')
      }
      if (+this.formData.available_type === 1) {
        unValidation.push('available_project_id', 'house_role_ids')
      } else if (+this.formData.available_type === 2) {
        unValidation.push('house_role_ids')
      } else if (+this.formData.available_type === 3) {
        unValidation.push('available_project_id')
      }
      if (+this.formData.goods_type === 2) {
        unValidation.push('goods_type_precinct')
      } else if (+this.formData.goods_type === 3) {
        unValidation.push('goods_type_name')
      } else {
        unValidation.push('goods_type_name', 'goods_type_precinct')
      }
      if (!(+this.formData.release_type === 2)) {
        unValidation.push('planTime')
      }
      Object.keys(props).forEach(key => {
        if (
          !unValidation.includes(key) &&
          (!this.formData[key] || this.formData[key].length === 0)
        ) {
          validStatus = false
          this.validProps[key] = true
        } else {
          this.validProps[key] = false
        }
      })
      if (validStatus) {
        if (
          this.formData.coupon_type === '1' &&
          parseFloat(this.formData.reduce_price) >=
            parseFloat(this.formData.threshold_price)
        ) {
          this.$toast('使用门槛需大于券面额')
          return
        }
        this.saveCouponInfo()
      } else {
        this.$toast('请填写完整')
      }
    },
    async saveCouponInfo () {
      const params = cloneDeep(this.formData)
      const validityTime = params.validityTime
      if (validityTime) {
        const validityTimeArr = validityTime.split('~')
        params.g_stime = validityTimeArr[0]
        params.g_etime = validityTimeArr[1]
      }
      const planTime = params.planTime
      if (planTime) {
        const planArr = planTime.split('~')
        params.plan_stime = planArr[0]
        params.plan_etime = planArr[1]
      }
      if (+params.coupon_mode === 2) {
        const credit = params.pay_credit
        params.pay_type = credit ? '1' : '2'
        params.pay_money = credit || params.pay_money
      }
      if (+params.goods_type === 3) {
        params.goods_type_name = params.goods_type_precinct
      }
      params.house_role_ids = params.house_role_ids.join(',')
      params.available_type = +params.available_type - 1 + ''
      this.shopId && (params.shops_id = this.shopId)
      const { success } = await saveCouponInfo(params).catch(({ code }) => {
        if (+code === 205) {
          setTimeout(() => {
            this.$router.go(-1)
          }, 500)
        }
      })
      if (success) {
        this.$toast('提交成功')
        this.$router.go(-1)
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
.error-color {
  color: #ff6555 !important;
}
.error-field {
  border-color: #ff6555 !important;
  /deep/ .van-field__control::placeholder {
    font-weight: 400;
    color: #ff6555 !important;
  }
  /deep/ .complain-form-placeholder {
    font-weight: 400;
    color: #ff6555 !important;
  }
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
  min-height: 96px;
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
  min-height: 162px;
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
  margin: 30px 20px;
  background: #ff6555;
  border: none;
  border-radius: 40px !important;
}
.tf-pd-lg {
  padding-bottom: 30px;
}
.tf-pd-base {
  padding-bottom: 20px;
}
</style>
