<template>
  <div>
    <div class="tf-body-container">
      <div class="status-container">
        <!-- <div class="tf-flex-center">
          <img
            class="status-img"
            src="@/assets/personage/shop/review-ing.png"
          /><span class="status-text">审核中</span>
        </div> -->
        <!-- <div class="tf-flex-center">
          <img
            class="status-img"
            src="@/assets/personage/shop/review-able.png"
          /><span class="status-text status-text-1">审核中</span>
        </div> -->
        <van-collapse v-model="activeCollapse">
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
              审核说明：审核未通过，请修改后再次提交。身份证个信息错误请重新上传，请修改后再次提交。身份证个信息错误请重新上传。
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
              v-model="formData.business_hours"
              maxlength="15"
              type="text"
            />
          </div>
        </div>
        <div class="cell-item">
          <div class="item-left">
            联系电话<span class="form-card-label-required">*</span>
          </div>
          <div class="item-cont">
            <van-field v-model="formData.phone" maxlength="15" type="number" />
          </div>
        </div>
      </div>
      <div class="form-card" style="padding-top: 0;">
        <div class="cell-item" @click="typeVisible = true">
          <div class="item-left">认证类型</div>
          <div class="item-cont p-30">
            {{ formData.project_name || "请选择" }}
          </div>
          <div class="item-arrow">
            <i class="van-icon van-icon-arrow"></i>
          </div>
        </div>
        <template v-if="formData.project_id === '1'">
          <div class="cell-item" style="border-bottom: none;">
            <div class="item-left">
              身份证<span class="form-card-label-required">*</span>
            </div>
          </div>
          <div class="tf-flex">
            <tf-uploader
              v-model="formData.shops_notice"
              max-count="1"
              class="IDCard-upload"
              ><div class="custom-upload-box">
                <img src="@/assets/personage/shop/IDCard1.png" />
                <div>上传人像面</div>
              </div></tf-uploader
            >
            <tf-uploader
              v-model="formData.shops_notice"
              max-count="1"
              class="tf-ml-lg IDCard-upload"
              ><div class="custom-upload-box">
                <img src="@/assets/personage/shop/IDCard2.png" />
                <div>上传国徽面</div>
              </div></tf-uploader
            >
          </div>
        </template>
        <template v-if="formData.project_id === '2'">
          <div class="cell-item" style="border-bottom: none;">
            <div class="item-left">
              营业执照<span class="form-card-label-required">*</span>
            </div>
          </div>
          <div>
            <tf-uploader
              v-model="formData.shops_notice"
              max-count="3"
              class="license-upload"
            ></tf-uploader>
          </div>
        </template>
      </div>
    </div>
    <van-button
      class="submit-btn"
      :disabled="!formData.shops_name"
      @click="submit"
      >提交审核</van-button
    >
    <tf-select-popup
      v-model="typeVisible"
      title="认证类型"
      :data="typeOptions"
      @confirm="selectConfirm"
    ></tf-select-popup>
  </div>
</template>

<script>
import tfUploader from '@/components/tf-uploader'
import TfSelectPopup from '@/components/tf-select-popup'
import { getShopAttestationInfo, saveAttestationInfo } from '@/api/personage/shop'
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
        shops_name: '',
        address: '',
        business_hours: '',
        phone: '',
        project_id: '',
        project_name: '',
        shops_notice: []
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const { shops_info: data } = await getShopAttestationInfo({
        shops_id: this.shopId
      })
      this.formData = data
      this.formData.shops_notice = []
    },
    // 项目选择(小区)
    selectConfirm (data) {
      const { id, text: projectName } = data
      this.formData.project_name = projectName
      this.formData.project_id = id
    },
    async submit () {
      if (!this.formData.shops_name) {
        this.$toast('请填写店铺名称')
      }
      const { success } = await saveAttestationInfo({
        ...this.formData,
        shops_id: this.shopId
      })
      if (success) {
        this.$toast('提交成功')
        this.$router.go(-1)
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
  margin: 0;
  + .van-uploader__preview {
    margin-left: 10px !important;
  }
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
/deep/ .van-button--disabled {
  opacity: 0.3;
}
</style>
