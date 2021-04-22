<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="任务投诉"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-time-circle"></span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <div class="tabbar">
        <div class="alert-header">
          <div class="alert-title">请填写以下信息投诉对方</div>
          <ul class="alert-content">
            <li>
              非常抱歉给您带来不便，请填写信息帮助我们明确问题。
            </li>
            <li>
              如果存在交易争执、要求不合理等情况，直接联系对方沟
              通处理是最有效的方式。
            </li>
          </ul>
        </div>
      </div>
      <div class="complaint-content">
        <div class="complaint-info">
          <div class="complaint-info-item">
            <div class="complaint-info-item-label">投诉用户</div>
            <div class="complaint-info-item-value">用户昵称（186****1234）</div>
          </div>
          <div class="complaint-info-item">
            <div class="complaint-info-item-label">
              <span>任</span><span>务</span>
            </div>
            <div class="complaint-info-item-value">
              任务标题任务标题任务标题任务标…
            </div>
          </div>
        </div>
        <div class="complaint-form">
          <div class="complaint-form-label">
            <span class="complaint-form-text">投诉类型</span>
            <span class="complaint-form-tag">*</span>
          </div>
          <div class="complaint-form-select">
            <span class="complaint-form-text">请选择</span>
            <span class="tf-icon tf-icon-right"></span>
          </div>
          <div class="complaint-form-label">
            <span class="complaint-form-text">投诉描述</span>
            <span class="complaint-form-tag">*</span>
          </div>
          <van-field
            v-model="content"
            autosize
            rows="4"
            type="textarea"
            :maxlength="200"
            placeholder="请填写10字以上的投诉原因以便我们核实情况"
            show-word-limit
            class="complaint-form-textarea"
          />
          <tf-uploader
            class="complaint-form-uploader"
            v-model="images"
            max-count="9"
          ></tf-uploader>
        </div>
      </div>
      <van-button
        class="confirm-btn"
        v-preventReClick
        size="large"
        type="danger"
        :disabled="saveDisabled"
        @click="save"
        >确认</van-button
      >
    </div>
  </div>
</template>

<script>
// pages/task/operate/complaint
import tfUploader from '@/components/tf-uploader/index'
export default {
  components: {
    tfUploader
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.tabbar {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 300px;
  padding: 50px;
  background-color: #ff6555;
  overflow: hidden;
  color: #ffffff;
  line-height: 24px;
}
.alert-header {
  .alert-title {
    margin-bottom: 30px;
    font-size: 32px;
    font-weight: 500;
    color: #ffffff;
    line-height: 1;
  }
  .alert-content {
    font-size: 24px;
    font-weight: 400;
    color: #ffffffcc;
    li {
      display: flex;
      line-height: 42px;
      &::before {
        content: "";
        display: block;
        width: 6px;
        height: 6px;
        margin-top: 16px;
        margin-right: 14px;
        background: #ffffffcc;
        border-radius: 3px;
      }
    }
  }
}
.complaint-content {
  display: flex;
  flex-direction: column;
  margin-top: -42px;
  padding: 0 20px;
  .complaint-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 30px;
    border-radius: 10px;
    background-color: #ffffff;
    .complaint-info-item {
      display: flex;
      align-items: center;
      height: 106px;
      line-height: 28px;
      &-label {
        display: flex;
        justify-content: space-between;
        width: 112px;
        margin-right: 88px;
        font-size: 28px;
        color: #000000;
      }
      &-value {
        flex: 1;
        font-size: 28px;
        font-weight: 500;
        color: #000000;
      }
    }
    .complaint-info-item + .complaint-info-item {
      border-top: 1px solid #eeeeee;
    }
  }
  .complaint-form {
    display: flex;
    position: relative;
    align-items: flex-start;
    flex-direction: column;
    margin-top: 30px;
    border-radius: 10px;
    background-color: #ffffff;
    width: 710px;
    overflow: hidden;
  }
}

.complaint-form {
  padding: 0 30px 20px;
  .complaint-form-label {
    display: flex;
    align-items: flex-start;
    margin-top: 38px;
    line-height: 28px;
    .complaint-form-text {
      margin-right: 1px;
      font-size: 28px;
      color: #000000;
    }
    .complaint-form-tag {
      margin-top: 2px;
      letter-spacing: 0px;
      color: #ff6555;
      font-size: 28px;
    }
  }
  .complaint-form-select {
    box-sizing: border-box;
    display: flex;
    position: relative;
    align-items: center;
    align-self: center;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 31px;
    border: 1px solid #cbcbcb;
    border-radius: 10px;
    padding-right: 19px;
    padding-left: 30px;
    width: 650px;
    height: 80px;
    line-height: 28px;
    letter-spacing: 0px;
    white-space: nowrap;
    color: #8f8f94;
    font-size: 28px;
  }
  .complaint-form-textarea {
    width: 650px;
    height: 260px;
    padding: 30px 30px 0;
    margin-top: 30px;
    font-size: 28px;
    color: #000000;
    border: 1px solid #cccccc;
    border-radius: 10px;
    /deep/ .van-field__control {
      line-height: 44px;
    }
    /deep/ .van-field__word-limit {
      color: #8f8f94;
    }
  }
  .complaint-form-uploader {
    margin-top: 30px;
    /deep/ .van-uploader__upload,
    /deep/ .van-uploader__preview {
      width: 150px;
      height: 150px;
    }
  }
}

.confirm-btn {
  margin: 60px 20px 30px;
  width: 710px;
  border-radius: 44px !important;
}
</style>
