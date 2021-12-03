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
        <div class="area-block bottom-line tf-row-space-between">
          <van-field
            v-model.trim="formData.aaa"
            :autosize="false"
            rows="1"
            :border="false"
            type="textarea"
          />
          <div class="text-num">
            <span :class="{ red: formData.aaa.length > 10 }">{{
              formData.aaa.length
            }}</span
            ><span>/10</span>
          </div>
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
          :disabled="isEdit"
        >
          <van-radio name="1">固定日期</van-radio>
          <van-radio name="2">固定天数</van-radio>
          <van-radio name="3">领取当月</van-radio>
        </van-radio-group>
        <div class="form-card-label">
          使用时间<span class="form-card-label-required">*</span>
        </div>
        <van-radio-group
          v-model="formData.ccc"
          direction="horizontal"
          checked-color="#FF6555"
          class="tf-radio-group"
          :disabled="isEdit"
        >
          <van-radio name="1">满减券</van-radio>
          <van-radio name="2">折扣券</van-radio>
        </van-radio-group>
        <van-row class="gutter-row" type="flex">
          <van-col span="12"
            ><van-field
              v-model="formData.ddd"
              label="满"
              type="number"
              class="prefix-input"
          /></van-col>
          <van-col span="12"
            ><van-field
              v-model="formData.eee"
              label="减"
              type="number"
              class="prefix-input"
          /></van-col>
        </van-row>
        <div class="form-card-label tf-mt-lg tf-mb-base">
          发行量（张）<span class="form-card-label-required">*</span>
        </div>
        <van-field v-model="formData.ddd" type="number" class="prefix-input" />
        <div class="form-card-label tf-mt-lg tf-mb-base">
          每人限领（张）<span class="form-card-label-required">*</span>
        </div>
        <van-field v-model="formData.ddd" type="number" class="prefix-input" />
      </div>
      <div class="form-card" style="padding-bottom: 0;">
        <!-- <div class="form-card-label">
          使用场景<span class="form-card-label-required">*</span>
        </div>
        <van-checkbox-group
          v-model="formData.ccc"
          direction="horizontal"
          checked-color="#FF6555"
          class="tf-radio-group"
          :disabled="isEdit"
        >
          <van-radio name="1">线下使用</van-radio>
          <van-radio name="2">APP使用</van-radio>
        </van-checkbox-group> -->
        <div class="form-card-label">
          领取方式<span class="form-card-label-required">*</span>
        </div>
        <van-radio-group
          v-model="formData.ccc"
          direction="horizontal"
          checked-color="#FF6555"
          class="tf-radio-group"
          :disabled="isEdit"
        >
          <van-radio name="1">免费领取</van-radio>
          <van-radio name="2">付费领取</van-radio>
        </van-radio-group>
        <van-row class="gutter-row" type="flex">
          <van-col span="12"
            ><van-field
              v-model="formData.ddd"
              label="幸福币"
              type="number"
              class="prefix-input"
          /></van-col>
          <van-col span="12"
            ><van-field
              v-model="formData.eee"
              label="人民币"
              type="number"
              class="prefix-input"
          /></van-col>
        </van-row>
        <div class="form-card-label tf-mt-lg">
          可领取用户
        </div>
        <van-radio-group
          v-model="formData.ccc"
          direction="horizontal"
          checked-color="#FF6555"
          class="tf-radio-group"
          :disabled="isEdit"
        >
          <van-radio name="1">全部用户</van-radio>
          <van-radio name="2">指定社区</van-radio>
          <van-radio name="3">指定类型</van-radio>
        </van-radio-group>
        <div class="form-card-label">
          可使用商品
        </div>
        <van-radio-group
          v-model="formData.ccc"
          direction="horizontal"
          checked-color="#FF6555"
          class="tf-radio-group"
          :disabled="isEdit"
        >
          <van-radio name="1">全部商品</van-radio>
          <van-radio name="2">指定分类</van-radio>
          <van-radio name="3">指定专区</van-radio>
        </van-radio-group>
        <div class="form-card-label">
          发布时间
        </div>
        <van-radio-group
          v-model="formData.ccc"
          direction="horizontal"
          checked-color="#FF6555"
          class="tf-radio-group"
          :disabled="isEdit"
        >
          <van-radio name="1">立即发布</van-radio>
          <van-radio name="2">定时发布</van-radio>
        </van-radio-group>
      </div>
      <van-button class="submit-btn" type="primary" size="large"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'shopCreateCoupon',
  data () {
    return {
      key: '',
      isEdit: false,
      formData: {
        aaa: '',
        bbb: '',
        ccc: '',
        ddd: '',
        eee: ''
      }
    }
  },
  computed: {
    title () {
      return '创建优惠券'
    }
  }
}
</script>

<style src="./style/form.less" lang="less" scoped></style>

<style lang="less" scoped>
.tf-body-container {
  padding-bottom: 30px;
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
}
.submit-btn {
  width: 710px;
  height: 80px;
  margin: 60px 20px 0;
  background: #ff6555;
  border: none;
  border-radius: 40px !important;
}
</style>
