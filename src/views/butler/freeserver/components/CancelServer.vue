<template>
  <van-popup v-model="revocationShow" class="cancel-server-dialog">
    <div class="cancel-server-header">
      <div class="cancel-server-title">取消预约</div>
      <span class="tf-icon tf-icon-guanbi" @click="visible = false"></span>
    </div>
    <div class="cancel-server-content">
      <div class="cancel-form-box">
        <div class="cancel-form-label">
          取消原因<span class="lable-red">*</span>
        </div>
        <div class="cancel-form-item" style="position:relative;">
          <tf-picker
            class="cancel-form-input"
            v-model="refuse_reason"
            title="取消原因"
            value-key="content"
            selected-key="content"
            :columns="reasonList"
          >
            <template v-slot="{ valueText }">
              <div
                class="reason-text"
                :class="{ 'picker-active': refuse_reason }"
              >
                {{ valueText }}
              </div>
            </template>
          </tf-picker>
          <div class="tf-icon tf-icon-right cancel-form-icon"></div>
        </div>
      </div>
      <div class="cancel-form-box">
        <div class="cancel-form-label">补充说明：</div>
        <van-field
          v-model="other_reason"
          class="cancel-form-textarea"
          rows="2"
          autosize
          type="textarea"
          maxlength="300"
          placeholder="请输入"
        />
      </div>
      <van-button class="cancel-server-btn cancel-server-btn-able"
        >确定</van-button
      >
    </div>
  </van-popup>
</template>

<script>
import tfPicker from '@/components/tf-picker/index'
export default {
  name: 'CancelServer',
  components: {
    tfPicker
  },
  data () {
    return {
      revocationShow: true,
      refuse_reason: '',
      other_reason: ''
    }
  }
}
</script>

<style lang="less" scoped>
.cancel-server-header {
  position: relative;
  padding-top: 40px;
  .cancel-server-title {
    font-size: 32px;
    font-weight: bold;
    color: #000000;
    text-align: center;
  }
  .tf-icon-guanbi {
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 30px;
    color: #000;
  }
}
.cancel-server-content {
  padding: 40px 30px 30px;
  .cancel-form-box {
    margin-bottom: 30px;
    .cancel-form-label {
      margin-bottom: 30px;
      font-size: 24px;
      color: #000000;
    }
    .cancel-form-input {
      width: 100%;
      height: 80px;
      padding-right: 74px;
      border: 1px solid #cccccc;
      border-radius: 10px;
    }
    .cancel-form-textarea {
      width: 100%;
      height: 260px;
      font-size: 24px;
      color: #222;
      border: 1px solid #cccccc;
      border-radius: 10px;
      line-height: 30px;
    }
    .cancel-form-icon {
      position: absolute;
      top: 30px;
      right: 30px;
      color: #aaaaaa;
    }
    .reason-text {
      display: flex;
      align-items: center;
      height: 80px;
      padding-left: 30px;
      font-size: 24px;
      color: #8f8f94;
      line-height: 1;
    }
  }
}
.lable-red {
  color: #ff6555;
}
.cancel-server-btn {
  width: 100%;
  background: #f7f7f7;
  border-radius: 10px;
  border: none;
  font-size: 26px;
  color: #8f8f94;
}
</style>

<style lang="less">
.cancel-server-dialog {
  width: 560px;
  border-radius: 10px;
  * {
    line-height: 1;
  }
}
</style>
