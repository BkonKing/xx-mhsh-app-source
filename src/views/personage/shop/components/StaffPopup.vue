<template>
  <van-popup v-model="visible" closeable class="pay-popup" @close="handleClose">
    <div class="pay-mask">
      <div class="pay-step-item">
        <div class="pay-header">
          添加店员
        </div>
        <div class="form-card">
          <div class="form-card-label">
            店员手机号<span class="form-card-label-required">*</span>
          </div>
          <van-field
            v-model="formData.mobile"
            class="prefix-input"
            type="digit"
            maxlength="11"
            placeholder="手机号"
            :disabled="isEdit"
            :right-icon="isEdit ? '' : 'search'"
            @blur="handleBlur"
            @input="handleSearch"
          />
          <div
            v-if="selectVisible"
            class="select-box"
            v-click-out-side="closeOperation"
          >
            <div
              v-for="item in userOptions"
              :key="item.id"
              class="select-item"
              :class="{
                'select-item-disabled': +item.is_shops || +item.is_shops_clerk
              }"
              @click="handleSelect(item)"
            >
              {{ item.name_text }}
            </div>
          </div>
          <div v-if="isUnregistered" class="alert-text">
            手机号未注册，请先注册后再添加
          </div>
          <div class="form-card-label">
            店员姓名<span class="form-card-label-required">*</span>
          </div>
          <van-field
            v-model="formData.clerk_name"
            maxlength="10"
            placeholder="姓名"
            class="prefix-input"
          />
          <div class="form-card-label">
            店铺权限<span class="form-card-label-required">*</span>
          </div>
          <van-checkbox-group
            v-model="formData.clerk_power_data"
            direction="horizontal"
            checked-color="#FF6555"
            class="tf-checkbox-group"
          >
            <van-checkbox shape="square" name="1">店铺券管理</van-checkbox>
            <van-checkbox shape="square" name="2">扫码核销券</van-checkbox>
          </van-checkbox-group>
        </div>
        <van-button class="submit-btn" type="primary" @click="handleConfirm"
          >确定</van-button
        >
      </div>
    </div>
  </van-popup>
</template>

<script>
import ClickOutSide from '@/directive/ClickOutSide'
import { getUserOption, saveShopStaff } from '@/api/personage/shop'
import cloneDeep from 'lodash.clonedeep'
export default {
  name: 'StaffPopup',
  directives: {
    ClickOutSide
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    shopId: {
      type: [String, Number],
      default: ''
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      visible: this.value,
      selectVisible: false,
      formData: {
        mobile: '',
        clerk_name: '',
        clerk_power_data: []
      },
      userOptions: [],
      isUnregistered: false
    }
  },
  computed: {
    isEdit () {
      return !!+this.formData.id
    }
  },
  methods: {
    closeOperation () {
      this.selectVisible = false
    },
    handleBlur () {
      if (this.formData.mobile.length === 11) {
        this.selectVisible = true
      }
    },
    async handleSearch (value) {
      if (value.length === 11) {
        const { data } = await getUserOption({
          user_text: value
        })
        this.userOptions = data.list || []
        const userData = data.list[0]
        this.isUnregistered = userData
          ? !+userData.id || +userData.is_logoff
          : true
        this.selectVisible = true
      }
    },
    handleSelect (data) {
      if (+data.is_shops || +data.is_shops_clerk) {
        return
      }
      if (!this.formData.clerk_name) {
        this.formData.clerk_name = data.realname
        this.selectVisible = false
      }
    },
    handleClose () {
      this.$emit('close')
    },
    async handleConfirm () {
      if (!this.formData.mobile) {
        this.$toast('请填写店员手机号')
        return
      }
      if (!this.formData.clerk_name) {
        this.$toast('请填写店员姓名')
        return
      }
      if (!this.formData.clerk_power_data.length) {
        this.$toast('请设置店员店铺权限')
        return
      }
      if (this.isUnregistered) {
        this.$toast('请确认店员手机号是否已经注册')
        return
      }
      const { success } = await saveShopStaff({
        shops_id: this.shopId,
        ...this.formData
      })
      if (success) {
        this.$toast(this.isEdit ? '保存成功' : '添加成功')
        this.visible = false
        this.$emit('success')
      }
    }
  },
  watch: {
    visible (val) {
      this.$emit('input', val)
    },
    value (val) {
      if (val !== this.visible) {
        this.visible = val
      }
      if (val) {
        if (this.data) {
          const data = cloneDeep(this.data)
          data.shops_clerk_id = data.id
          data.clerk_power_data = data.clerk_power.split(',')
          this.formData = data
        } else {
          this.formData = {
            mobile: '',
            clerk_name: '',
            clerk_power_data: []
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pay-popup {
  width: 560px;
  border-radius: 10px 10px 0px 0px;
  /deep/ .van-icon-cross {
    font-size: 36px;
  }
}
.pay-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0 20px;
  font-size: 32px;
  font-weight: bold;
  color: #000000;
  line-height: 1;
}
.submit-btn {
  width: 500px;
  height: 80px;
  margin: 60px 30px 30px;
  border-radius: 10px;
  /deep/ .van-button__text {
    line-height: 1;
  }
}

.form-card {
  width: 560px;
  padding: 0 30px;
  background: #ffffff;
  border-radius: 10px;
  &-label {
    margin-top: 40px;
    margin-bottom: 20px;
    font-size: 26px;
    color: #000;
  }
  &-label-required {
    font-size: 26px;
    color: #ff5240;
  }
  .alert-text {
    margin-top: 14px;
    margin-left: 20px;
    font-size: 24px;
    color: #ff6555;
    line-height: 1;
  }
}
.select-box {
  width: 500px;
  max-height: 434px;
  position: absolute;
  z-index: 2;
  padding: 0 25px;
  overflow: auto;
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  .select-item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 84px;
    border-bottom: 1px solid #eeeeee;
    font-size: 26px;
    color: #000000;
    line-height: 1;
    &-disabled {
      color: #999;
    }
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
    padding-left: 20px;
    line-height: 80px;
  }
  /deep/ .van-field__control:disabled {
    background: #f7f7f7;
    color: #8f8f94;
  }
  /deep/ .van-field__right-icon {
    margin-right: 20px;
    .van-icon {
      font-size: 36px;
      color: #acacac;
    }
  }
}
.tf-checkbox-group {
  height: 36px;
  /deep/ .van-checkbox--horizontal {
    margin-right: 40px;
  }
  /deep/ .van-checkbox__label {
    margin-left: 20px;
    font-size: 28px;
    color: #000000;
    line-height: 1;
  }
  /deep/ .van-checkbox__icon {
    height: auto;
    .van-icon {
      width: 36px;
      height: 36px;
      border-radius: 6px;
    }
  }
  /deep/ .van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon {
    color: #fff;
  }
}
</style>
