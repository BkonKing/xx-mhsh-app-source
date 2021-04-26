<template>
  <div class="tf-bg">
    <van-popup safe-area-inset-bottom class="more-dialog" v-model="typeShow">
      <div class="more-btn" @click="openDialog(1)">发放</div>
      <div class="more-btn btn-red" @click="openDialog(2)">
        核销
      </div>
    </van-popup>
    <van-dialog
      class="integral-dialog"
      v-model="show"
      :show-confirm-button="false"
    >
      <div class="container-inner">
        <div class="integral-dialog-header">
          <span class="integral-dialog-title">{{ type | text }}积分</span>
          <div class="tf-icon tf-icon-guanbi" @click="$router.go(-1)" />
        </div>
        <userInfo
          class="userInfo"
          :avatar="info.avatar"
          :name="userName"
          :time="info.mobile"
        ></userInfo>
        <div class="payment-box">
          <div class="payment-box__text">{{ type | text }}数量</div>
          <div class="payment-box__money">
            <img
              src="@/assets/imgs/activity-dialog-icon.png"
              alt=""
              class="payment-box__icon"
            />
            <van-field
              id="input"
              class="payment-box__money-number"
              v-model="value"
              :autofocus="true"
              type="digit"
            />
          </div>
          <van-button
            type="primary"
            size="large"
            :disabled="!value"
            @click="confirm"
            >确认</van-button
          >
        </div>
      </div>
    </van-dialog>
    <van-number-keyboard
      v-model="value"
      :show="showKeyboard"
      safe-area-inset-bottom
      key="number"
      theme="custom"
      close-button-text="确定"
      extra-key="."
      z-index="3000"
      @close="confirm"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
import userInfo from '@/components/user-info/index.vue'
import { mapGetters } from 'vuex'
import { getActivityUserInfo, giveIntergral } from '@/api/activity'
export default {
  components: {
    userInfo
  },
  computed: {
    ...mapGetters(['userInfo']),
    userName () {
      const nickname = this.info.nickname || '暂无昵称'
      const realname = this.info.realname
        ? `(${'*' + this.info.realname.substring(1)})`
        : ''
      return `${nickname}${realname}`
    }
  },
  data () {
    return {
      type: 1, // 1：发放 2: 核销
      userId: '',
      info: {},
      value: '',
      typeShow: false,
      show: false,
      showKeyboard: false
    }
  },
  created () {
    this.userId = this.$route.query.userId
    this.getActivityUserInfo()
  },
  methods: {
    // 打开发放核销弹窗
    openDialog (type) {
      this.type = type
      this.typeShow = false
      this.show = true
      this.$nextTick(() => {
        document.getElementById('input').focus()
      })
    },
    // 完成
    confirm () {
      if (!this.value || parseFloat(this.value) < 1) {
        this.$toast('请输入数量')
        return
      }
      this.grantNumber()
    },
    // 获取发放/核销用户信息和当前权限
    getActivityUserInfo () {
      getActivityUserInfo({
        project_id: this.userInfo.xm_project_id,
        code_info: this.userId
      }).then(({ data, is_qx_data: qxData }) => {
        this.info = data
        if (qxData.ff_is_qx && qxData.hx_is_qx) {
          this.typeShow = true
        } else {
          this.type = qxData.ff_is_qx ? 1 : 2
          this.show = true
        }
      })
    },
    // 发放/核销积分
    grantNumber () {
      const params = {
        project_id: this.userInfo.xm_project_id,
        type: this.type,
        points: this.value,
        client_uid: this.info.client_uid
      }
      giveIntergral(params).then(res => {
        this.show = false
        this.$toast({
          className: 'activity-toast',
          message: res.message
        })
        setTimeout(() => {
          this.$router.go(-1)
        }, 500)
      })
    },
    touchstart () {
      this.showKeyboard = true
    }
  },
  filters: {
    text (value) {
      const textList = {
        1: '发放',
        2: '核销'
      }
      return textList[value]
    }
  }
}
</script>

<style lang="less" scoped>
/* 更多弹窗 */
.more-dialog {
  width: 450px;
  padding: 0 30px;
  border-radius: 20px;
  .more-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 110px;
    font-size: 32px;
    color: #000;
  }
  .btn-red {
    color: #ff5240;
  }
  .van-ellipsis {
    width: 100%;
  }
  .more-btn + .more-btn {
    border-top: 2px solid #eee;
  }
}
.integral-dialog {
  width: 650px;
  background: #f7f7f7;
  border-radius: 20px;
  .container-inner {
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    background-color: #f7f7f7;
    width: 650px;
  }
  .integral-dialog-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 39px;
    margin-right: 39px;
    width: 349px;
    height: 32px;
    align-self: flex-end;
  }

  .integral-dialog-title {
    font-size: 32px;
    font-weight: 500;
    color: #000000;
  }

  .tf-icon-guanbi {
    font-size: 30px;
    color: #a9a9a9;
  }

  .userInfo {
    margin-top: 39px;
    margin-left: 40px;
    /deep/ .user-info__left-box {
      height: 80px;
      .tf-avatar {
        width: 80px;
        height: 80px;
        .user-info--name {
          font-size: 26px;
        }
      }
    }
  }

  .payment-box {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    padding: 80px 30px 30px;
    margin-top: 29px;
    border-radius: 20px;
    background-color: #ffffff;
    &__text {
      font-size: 26px;
      font-weight: 500;
      color: #000000;
      line-height: 1;
    }
    &__money {
      display: flex;
      align-items: flex-end;
      width: 100%;
      margin-top: 20px;
      margin-bottom: 80px;
      border-bottom: 2px solid #dddddd;
    }
    /deep/ .van-button--primary {
      background-color: #febf00;
      border-color: #febf00;
      font-size: 32px;
      font-weight: 500;
      color: #000000;
    }
    /deep/ .van-button--disabled {
      background-color: #eeeeee;
      border-color: #eeeeee;
      color: #cccccc;
    }
    &__icon {
      width: 36px;
      height: 36px;
      margin-bottom: 36px;
    }
    &__money-number {
      font-size: 64px;
      color: #000;
      // border-bottom: 2px solid #dddddd;
    }
  }
  /deep/ .van-dialog__footer {
    padding: 0;
  }
}
/deep/ .van-key {
  height: 120px;
  font-size: 36px;
}
/deep/ .van-key--large {
  height: 100%;
}
</style>

<style>
.activity-toast {
  width: 500px;
  height: 88px;
  font-size: 26px;
  color: #ffffff;
  background: #00000099;
  border-radius: 10px;
}
</style>
