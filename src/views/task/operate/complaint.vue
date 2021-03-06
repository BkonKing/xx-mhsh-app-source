<template>
  <div class="tf-bg">
    <van-nav-bar
      title="任务投诉"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
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
            <div class="complaint-info-item-value">{{ nickName }}</div>
          </div>
          <div class="complaint-info-item">
            <div class="complaint-info-item-label">
              <span>任</span><span>务</span>
            </div>
            <div class="complaint-info-item-value van-ellipsis">
              {{ taskTitle }}
            </div>
          </div>
        </div>
        <div class="complaint-form">
          <div class="complaint-form-label">
            <span class="complaint-form-text">投诉类型</span>
            <span class="complaint-form-tag">*</span>
          </div>
          <div class="complaint-form-select" @click="typeVisible = true">
            <span
              class="complaint-form-text"
              :class="{ 'complain-type': complaintTypeText }"
              >{{ complaintTypeText || "请选择" }}</span
            >
            <span class="tf-icon tf-icon-right"></span>
          </div>
          <div class="complaint-form-label">
            <span class="complaint-form-text">投诉描述</span>
            <span class="complaint-form-tag">*</span>
          </div>
          <van-field
            v-model="content"
            rows="4"
            type="textarea"
            :maxlength="200"
            placeholder="请填写10字以上的投诉原因以便我们核实情况"
            show-word-limit
            autosize
            class="complaint-form-textarea"
          />
          <tf-uploader
            class="complaint-form-uploader"
            v-model="images"
            max-count="9"
          ></tf-uploader>
        </div>
      </div>
    </div>
    <div class="confirm-btn">
      <van-button
        v-preventReClick
        :class="{ 'no-fixed-btn': winResize }"
        size="large"
        type="danger"
        :disabled="!(complaintType && content && content.length > 9)"
        @click="complaintTask"
        >确认</van-button
      >
    </div>

    <van-popup
      v-model="typeVisible"
      safe-area-inset-bottom
      get-container="body"
      class="type-dialog"
    >
      <div
        v-for="item in typeList"
        :key="item.id"
        class="type-item van-ellipsis"
        @click="selectType(item)"
      >
        {{ item.complaint_type }}
      </div>
    </van-popup>
  </div>
</template>

<script>
// pages/task/operate/complaint
import tfUploader from '@/components/tf-uploader/index'
import { getTaskComplaint, complaintTask } from '@/api/task'
import { mapState } from 'vuex'
export default {
  components: {
    tfUploader
  },
  data () {
    return {
      taskId: '',
      complaintUid: '', // 被投诉用户id
      nickName: '',
      taskTitle: '',
      complaintType: '', // 投诉类型值
      complaintTypeText: '', // 投诉类型文本
      content: '', // 投诉描述
      images: [],
      typeList: [],
      typeVisible: false
    }
  },
  computed: {
    ...mapState(['winResize'])
  },
  created () {
    this.taskId = this.$route.query.taskId
    this.complaintUid = this.$route.query.complaintUid
    this.getTaskComplaint()
  },
  methods: {
    // 获取任务投诉 页面数据
    getTaskComplaint () {
      getTaskComplaint({
        type: 1,
        task_id: this.taskId,
        complainted_uid: this.complaintUid
      }).then(({ data }) => {
        const { bts_nickname, type_list, task_title } = data
        this.nickName = bts_nickname
        this.taskTitle = task_title
        this.typeList = type_list
      })
    },
    // 选择类型
    selectType ({ id, complaint_type }) {
      this.complaintType = id
      this.complaintTypeText = complaint_type
      this.typeVisible = false
    },
    // 投诉提交
    complaintTask () {
      complaintTask({
        task_id: this.taskId,
        complainted_uid: this.complaintUid,
        complaint_type: this.complaintType,
        content: this.content,
        image_url: this.images
      }).then(({ success }) => {
        success && this.$router.go(-1)
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar {
  background-color: #ff6555;
  .van-icon,
  .van-nav-bar__title {
    color: #fff;
  }
}
/deep/ .van-uploader__upload {
  width: 150px !important;
  height: 150px !important;
}
.tabbar {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-height: 300px;
  padding: 50px;
  background-color: #ff6555;
  background-image: url("~@/assets/neighbours/task-complaint.png");
  background-size: 220px 300px;
  background-repeat: no-repeat;
  background-position-x: 530px;
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
      line-height: 44px;
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
        width: 114px;
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
  margin-bottom: 30px;
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
  .complain-type {
    color: #000000;
  }
  .complaint-form-textarea {
    width: 650px;
    min-height: 260px;
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
      width: 150px !important;
      height: 150px !important;
      margin-left: 0 !important;
    }
    /deep/ .van-uploader__upload {
      border: 2px dashed #8f8f94;
      background: #fff;
    }
  }
}

.confirm-btn {
  height: 108px;
  /deep/ .van-button {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 5;
    width: 710px;
    font-size: 28px;
    border-radius: 44px !important;
  }
}

.type-dialog {
  width: 550px;
  padding: 0 30px;
  border-radius: 10px;
  .type-item {
    width: 100%;
    height: 109px;
    line-height: 109px;
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    color: #333333;
  }
  .type-item + .type-item {
    border-top: 1px solid #eeeeee;
  }
}

/deep/ .van-uploader__preview-delete {
  width: 36px;
  height: 36px;
  background: #000000cc;
  top: 0;
  right: 0;
  border-radius: 0px 0px 0px 14px;
  .van-icon-cross {
    font-size: 32px;
  }
}
/deep/ .van-field__word-limit {
  margin-bottom: 10px;
}

.no-fixed-btn {
  margin-left: 20px;
}
</style>
