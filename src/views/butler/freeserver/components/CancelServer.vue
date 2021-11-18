<template>
  <van-popup
    v-model="visible"
    class="cancel-server-dialog"
    get-container="body"
  >
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
            v-model="cancel_id"
            title="取消原因"
            value-key="content"
            selected-key="content"
            :columns="reasonList"
          >
            <template v-slot="{ valueText }">
              <div class="reason-text" :class="{ 'picker-active': cancel_id }">
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
          v-model="note"
          class="cancel-form-textarea"
          rows="2"
          autosize
          type="textarea"
          maxlength="200"
          placeholder="请输入"
        />
      </div>
      <van-button
        class="cancel-server-btn"
        :class="[
          isManualServer ? 'free-server-btn-blue' : 'free-server-btn-green'
        ]"
        @click="cancelReservation"
        >确定</van-button
      >
    </div>
  </van-popup>
</template>

<script>
import { mapGetters } from 'vuex'
import tfPicker from '@/components/tf-picker/index'
import { getCancelReason, cancelReservation } from '@/api/butler.js'
export default {
  name: 'CancelServer',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    tfPicker
  },
  data () {
    return {
      visible: this.value,
      reasonList: [],
      cancel_id: '',
      note: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'currentProject']),
    projectId () {
      return (
        (this.currentProject && this.currentProject.project_id) ||
        this.userInfo.enter_project_id
      )
    },
    // 是否人工服务，否则为借用服务
    isManualServer () {
      return this.data.category_type === 1
    }
  },
  watch: {
    value (newValue) {
      this.visible = newValue
    },
    visible (newValue) {
      this.$emit('input', newValue)
      if (!newValue) {
        this.cancel_id = ''
        this.note = ''
      }
    }
  },
  created () {
    this.getCancelReason()
  },
  methods: {
    async getCancelReason () {
      const { data } = await getCancelReason({
        enter_project_id: this.projectId
      })
      this.reasonList = data
    },
    // 取消预约
    async cancelReservation () {
      if (!this.cancel_id) {
        this.$toast('请选择取消原因')
        return
      }
      const { success } = await cancelReservation({
        code_id: this.codeId,
        server_id: this.data.server_id,
        cancel_id: this.cancel_id,
        note: this.note
      })
      if (success) {
        this.visible = false
        this.$toast('预约已取消')
        this.$emit('success')
      }
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
      padding: 0 30px;
      font-size: 24px;
      color: #222;
      border: 1px solid #cccccc;
      border-radius: 10px;
      /deep/ textarea {
        padding: 20px 0;
        line-height: 30px;
      }
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
      height: 76px;
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
.free-server-btn-blue {
  background: #00a0e9;
  color: #fff;
}
.free-server-btn-green {
  background: #6bc572;
  color: #fff;
}
</style>

<style lang="less">
.cancel-server-dialog {
  width: 560px;
  height: 736px;
  border-radius: 10px;
  * {
    line-height: 1;
  }
}
</style>
