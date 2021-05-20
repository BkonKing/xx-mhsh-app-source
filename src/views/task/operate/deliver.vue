<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar
      title="交付任务"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="tf-body-container">
      <graphic
        :phTxt="phTxt"
        :maxNum="maxNum"
        @getForm="getForm"
      >
        <div slot="header" class="deliver-header">
          <div class="deliver-tit">请确保已经完成任务</div>
          <div class="deliver-subtit">任务若交付，将提交给任务方进行确认</div>
          <div class="divider-line"></div>
        </div>
      </graphic>
      <div class="task-btn-block">
        <div v-preventReClick @click="submit" :class="[ formData.content.length > 200 ? 'unable-btn' : '', 'task-btn']">确定</div>
      </div>
      <confirm-model v-model="confirmShow"></confirm-model>
    </div>
  </div>
</template>

<script>
import {
  NavBar, Toast
} from 'vant'
import graphic from '../components/graphic'
import confirmModel from '../components/confirm-model'
import { deliverTask } from '@/api/task'
export default {
  components: {
    [NavBar.name]: NavBar,
    graphic,
    confirmModel
  },
  data () {
    return {
      taskId: '',
      userTaskId: '',
      textNum: 0, // textarea 长度
      formData: {
        content: '',
        image_url: []
      },
      phTxt: '和对方说点什么',
      maxNum: 200,
      confirmShow: false
    }
  },
  created () {
    this.userTaskId = this.$route.query.userTaskId
    this.taskId = this.$route.query.taskId
  },
  mounted () {

  },
  methods: {
    // 图文信息
    getForm (val) {
      this.formData = val
      this.formData.image_url = val.images
      this.textNum = val.content.length
    },
    // 提交
    submit () {
      if (this.textNum > 200) {
        Toast('交付说明 最多输入200字')
      } else {
        const params = Object.assign({}, this.formData, { user_task_id: this.userTaskId })
        deliverTask(params).then((res) => {
          Toast({
            message: '提交成功',
            onClose: () => {
              this.$router.go(-1)
            }
          })
        }).catch(() => {
          Toast('提交失败 请重试')
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar {
  // background-color: #F7F7F7;
  .van-nav-bar__left  {
    padding-left: 20px;
    .tf-icon{
      color: #000;
      font-size: 30px;
    }
  }
}
.tf-body-container{
  padding: 30px 20px 0;
  background-color: #F7F7F7;
  .deliver-header {
    padding-top: 30px;
  }
  .deliver-tit {
    font-size: 32px;
    font-weight: 500;
    color: #000000;
    line-height: 52px;
    position: relative;
    padding-left: 30px;
    margin-bottom: 20px;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -16px;
      width: 8px;
      height: 32px;
      background: #FEBF00;
      border-radius: 4px;
    }
  }
  .deliver-subtit {
    font-size: 24px;
    color: #8F8F94;
    padding-left: 30px;
    line-height: 44px;
    margin-bottom: 30px;
  }
  .divider-line {
    margin: 0 30px 20px;
  }
  /deep/ .van-field textarea {
    min-height: 300px;
  }
}
.task-btn-block {
  height: 166px;
}
</style>
