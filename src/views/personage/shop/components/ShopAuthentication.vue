<template>
  <div>
    <div class="tf-body-container">
      <div class="status-container">
        <div v-if="+formData.a_state === 1" class="tf-flex-center">
          <img
            class="status-img"
            src="@/assets/personage/shop/review-ing.png"
          /><span class="status-text">审核中</span>
        </div>
        <div v-if="+formData.a_state === 3" class="tf-flex-center">
          <img
            class="status-img"
            src="@/assets/personage/shop/review-able.png"
          /><span class="status-text status-text-1">已认证</span>
        </div>
        <van-collapse v-if="+formData.a_state === 2" v-model="activeCollapse">
          <van-collapse-item class="tf-collapse-item" name="1">
            <template #title>
              <div class="tf-flex-center">
                <img
                  class="status-img"
                  src="@/assets/personage/shop/review-un.png"
                /><span class="status-text">审核未通过，请修改后再次提交</span>
              </div>
            </template>
            <div class="tf-collapse-content">
              审核说明：{{ formData.attestation_error_explain }}
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
      <div class="form-card" style="padding-top: 0;padding-bottom: 0;">
        <div class="cell-item">
          <div class="item-left">
            经营者<span class="form-card-label-required">*</span>
          </div>
          <div class="item-cont">
            <van-field
              v-model="formData.operator_realname"
              maxlength="15"
              placeholder="姓名"
              :disabled="isDisabled"
            />
          </div>
        </div>
        <div class="cell-item" style="border-bottom: none;">
          <div class="item-left">
            联系电话<span class="form-card-label-required">*</span>
          </div>
          <div class="item-cont">
            <van-field
              v-model="formData.operator_mobile"
              maxlength="15"
              type="digit"
              :disabled="isDisabled"
            />
          </div>
        </div>
      </div>
      <div class="form-card" style="padding-top: 0;">
        <div class="cell-item" @click="openSelect">
          <div class="item-left">
            认证类型<span class="form-card-label-required">*</span>
          </div>
          <div class="item-cont p-30">
            {{ formData.a_type_name || "请选择" }}
          </div>
          <div v-if="!isDisabled" class="item-arrow">
            <i class="van-icon van-icon-arrow"></i>
          </div>
        </div>
        <template v-if="formData.a_type === '1'">
          <div class="cell-item" style="border-bottom: none;">
            <div class="item-left">
              身份证<span class="form-card-label-required">*</span>
            </div>
          </div>
          <div class="tf-flex">
            <tf-uploader
              v-model="voucher_img1"
              max-count="1"
              class="IDCard-upload"
              :disabled="isDisabled"
              :deletable="!isDisabled"
              :show-upload="!isDisabled"
              ><div class="custom-upload-box">
                <img src="@/assets/personage/shop/IDCard1.png" />
                <div>上传人像面</div>
              </div></tf-uploader
            >
            <tf-uploader
              v-model="voucher_img2"
              max-count="1"
              class="tf-ml-lg IDCard-upload"
              :disabled="isDisabled"
              :deletable="!isDisabled"
              :show-upload="!isDisabled"
              ><div class="custom-upload-box">
                <img src="@/assets/personage/shop/IDCard2.png" />
                <div>上传国徽面</div>
              </div></tf-uploader
            >
          </div>
        </template>
        <template v-if="formData.a_type === '2'">
          <div class="cell-item" style="border-bottom: none;">
            <div class="item-left">
              营业执照<span class="form-card-label-required">*</span>
            </div>
          </div>
          <div>
            <tf-uploader
              v-model="voucher_img"
              max-count="3"
              class="license-upload"
              :disabled="isDisabled"
              :deletable="!isDisabled"
              :show-upload="!isDisabled"
            ></tf-uploader>
          </div>
        </template>
      </div>
    </div>
    <van-button
      v-if="+formData.a_state === 0 || isEdit"
      class="submit-btn"
      :disabled="submitAble"
      @click="submit"
      >提交审核</van-button
    >
    <van-button
      v-if="+formData.a_state > 1 && !isEdit"
      class="submit-btn white-btn"
      @click="switchEdit"
      >修改</van-button
    >
    <tf-select-popup
      v-model="typeVisible"
      title="认证类型"
      :selected="formData.a_type"
      :data="typeOptions"
      @confirm="selectConfirm"
    ></tf-select-popup>
  </div>
</template>

<script>
import tfUploader from '@/components/tf-uploader'
import TfSelectPopup from '@/components/tf-select-popup'
import {
  getShopAttestationInfo,
  saveAttestationInfo
} from '@/api/personage/shop'
export default {
  name: 'ShopInformationTab',
  components: {
    tfUploader,
    TfSelectPopup
  },
  props: {
    shopId: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      typeVisible: false,
      activeCollapse: [],
      typeOptions: [
        {
          text: '个人',
          id: '1'
        },
        {
          text: '商户',
          id: '2'
        }
      ],
      formData: {
        operator_realname: '',
        operator_mobile: '',
        a_type: '',
        a_type_name: ''
      },
      voucher_img: [],
      voucher_img1: [],
      voucher_img2: [],
      isEdit: false
    }
  },
  computed: {
    uploadImgStatus1 () {
      const { a_type: type } = this.formData
      return type === '1' &&
        this.voucher_img1 &&
        this.voucher_img1.length &&
        this.voucher_img2 &&
        this.voucher_img2.length
    },
    uploadImgStatus2 () {
      const { a_type: type } = this.formData
      return type === '2' && this.voucher_img && this.voucher_img.length
    },
    submitAble () {
      const { operator_realname: realname, operator_mobile: mobile, a_type: type } = this.formData
      return !(realname && mobile && type && (this.uploadImgStatus1 || this.uploadImgStatus2))
    },
    isDisabled () {
      return +this.formData.a_state > 0 && !this.isEdit
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const { data } = await getShopAttestationInfo({
        shops_id: this.shopId
      })
      this.formData = data
      this.voucher_img = data.voucher_img_data || []
      if (+data.a_type === 1) {
        const img1 = this.voucher_img[0]
        const img2 = this.voucher_img[1]
        this.voucher_img1 = img1 ? [img1] : []
        this.voucher_img2 = img2 ? [img2] : []
      }
    },
    openSelect () {
      !this.isDisabled && (this.typeVisible = true)
    },
    // 选择认证类型
    selectConfirm (data) {
      const { id, text } = data
      this.formData.a_type = id
      this.formData.a_type_name = text
      this.voucher_img = []
      this.voucher_img1 = []
      this.voucher_img2 = []
    },
    switchEdit () {
      this.isEdit = true
    },
    async submit () {
      if (!this.formData.operator_realname) {
        this.$toast('请填写经营者')
        return
      }
      if (!this.formData.operator_mobile) {
        this.$toast('请填写联系电话')
        return
      }
      if (!this.formData.a_type) {
        this.$toast('请选择认证类型')
        return
      }
      if (+this.formData.a_type === 1 && !this.uploadImgStatus1) {
        this.$toast('请上传身份证')
        return
      }
      if (+this.formData.a_type === 2 && !this.uploadImgStatus2) {
        this.$toast('请上传营业执照')
        return
      }
      this.formData.voucher_img =
        +this.formData.a_type === 1
          ? [...this.voucher_img1, ...this.voucher_img2]
          : this.voucher_img
      const { success } = await saveAttestationInfo({
        ...this.formData,
        shops_id: this.shopId
      })
      if (success) {
        this.$toast('提交成功')
        this.isEdit = false
        this.getData()
      }
    }
  }
}
</script>

<style src="../style/form.less" lang="less" scoped></style>

<style lang="less" scoped>
.license-upload /deep/ .van-uploader__upload {
  width: 204px;
  height: 204px;
  background: #fff;
  border: 1px dashed #8f8f94;
}
.license-upload /deep/ .van-uploader__preview {
  width: 204px !important;
  height: 204px !important;
  margin-right: 10px !important;
  margin-left: 0 !important;
  // + .van-uploader__preview {
  //   margin-left: 10px !important;
  // }
}
.license-upload
  /deep/
  .van-uploader__wrapper
  .van-uploader__preview:last-child {
  margin-right: 0;
}
.tf-ml-lg {
  margin-left: 30px;
}
.IDCard-upload {
  width: 310px;
  height: 196px;
  /deep/ .van-uploader__upload,
  /deep/ .van-uploader__preview {
    width: 310px !important;
    height: 196px !important;
    margin: 0;
  }
}
.custom-upload-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 310px;
  height: 196px;
  background: #fff;
  border: 1px dashed #8f8f94;
  img {
    width: 162px;
    height: 101px;
    border: 1px dashed #8f8f94;
  }
  div {
    margin-top: 20px;
    font-size: 24px;
    font-weight: 500;
    color: #8f8f94;
  }
}
.status-container {
  padding: 30px 20px 0;
  > .tf-flex-center {
    padding: 10px 0;
  }
  .status-img {
    width: 32px;
    height: 32px;
  }
  .status-text {
    margin-left: 20px;
    font-size: 28px;
    line-height: 1;
    color: #ff6555;
  }
  .status-text-1 {
    color: #222222;
  }
  .tf-collapse-item {
    border-radius: 10px;
    /deep/ .van-cell {
      height: 80px;
      align-items: center;
      background: #ff65551a;
      .van-cell__right-icon {
        color: #ff6555;
      }
      &.van-cell--clickable:active {
        background: #ff65551a !important;
      }
    }
    /deep/ .van-collapse-item__content {
      padding-top: 6px;
      background: #ff65551a;
    }
    .tf-collapse-content {
      padding: 0 10px;
      font-size: 24px;
      color: #4b120c;
    }
  }
}
.submit-btn {
  width: 710px;
  height: 80px;
  margin: 30px 20px;
  position: fixed;
  bottom: 0;
  background: #ff5240;
  border-radius: 40px;
  border: none;
  font-size: 28px;
  color: #ffffff;
  /deep/ .van-button__text {
    line-height: 1;
  }
}
.white-btn {
  background: #ffffff;
  border: 1px solid #fff;
  color: #222222;
}
/deep/ .van-button--disabled {
  opacity: 0.3;
}
.item-cont /deep/ .van-field__control:disabled {
  color: #222;
}
/deep/ .van-uploader__wrapper--disabled {
  opacity: 1;
}
</style>
