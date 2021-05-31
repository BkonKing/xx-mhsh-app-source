<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar
      title="任务完成"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="tf-body-container">
      <task-card>
        <div class="card-cont" slot="content">
          <div class="session-tit">接单方 已确认完成任务</div>
          <div class="divider-line"></div>
          <div class="receiver-cont" ref="textCont">
            <div class="cont-text" :class="{'text-hidden': isOver&&!isDown}">
              <div @click="showToggle" v-show="isOver" class="more-down" :class="{'down-up' : isDown}">{{ isDown ? '收起' : '展开' }}</div>{{ infoData.content }}
            </div>
          </div>
          <div class="receiver-pic tf-row-wrap">
            <img @click="previewPic(index)" v-for="(item, index) in infoData.image_url_data" :key="index" :src="item" />
          </div>
        </div>
      </task-card>
      <graphic
        :phTxt="phTxt"
        :maxNum="maxNum"
        @getForm="getForm"
      >
        <div slot="header">
          <div class="session-tit red">任务方 请确认</div>
          <div class="divider-line"></div>
          <div class="initiator-session">
            <div class="form-label">接单方是否完成任务<span>*</span></div>
            <div class="radio-block tf-row">
              <div v-for="(item, index) in statusList" :key="index" @click="statusIndex=index" class="popup-radio tf-row-vertical-center" :class="{'active': index == statusIndex}">
                <div></div>
                <div>{{ item }}</div>
              </div>
            </div>
            <div class="initiator-tip">任务若确定已经完成，将结算幸福币给接单方</div>
          </div>
        </div>
      </graphic>
      <div v-if="btnShow" class="task-btn-block">
        <div v-preventReClick @click="submit" :class="[ statusIndex!=null && statusIndex > -1? '' : 'unable-btn', 'task-btn']">确认</div>
      </div>
      <confirm-model v-model="confirmShow" modelTit="确定已经完成任务？" modelSubTit="确定将结算幸福币给接单方" @sure="sure"></confirm-model>
    </div>
    <template v-if="infoData.image_url_data && infoData.image_url_data.length">
      <van-image-preview v-model="picShow" :images="infoData.image_url_data" :startPosition="picIndex">
      </van-image-preview>
    </template>
  </div>
</template>

<script>
import {
  NavBar,
  Toast,
  ImagePreview
} from 'vant'
import graphic from '../components/graphic'
import confirmModel from '../components/confirm-model'
import taskCard from '../components/task-card'
import { getCompleteInfo, submitCompleteInfo } from '@/api/task'
import { validForm } from '@/utils/util'
export default {
  components: {
    [NavBar.name]: NavBar,
    [ImagePreview.name]: ImagePreview,
    graphic,
    confirmModel,
    taskCard
  },
  data () {
    return {
      userTaskId: '',
      infoData: '',
      isOver: false, // 内容是否超出行数
      isDown: false,
      formData: {
        type: '',
        content: '',
        images: []
      },
      phTxt: '和对方说点什么',
      maxNum: 500,
      confirmShow: false,
      statusList: ['已完成', '未完成'],
      statusIndex: null, // 0已完成 1未完成
      picIndex: 0, // 图片预览起始位置索引
      picShow: false, // 查看大图
      btnShow: true
    }
  },
  created () {
    this.userTaskId = this.$route.query.userTaskId
    this.getData()
  },
  mounted () {
    const winHight = document.documentElement.clientHeight
    window.onresize = () => {
      const resizeHight = document.documentElement.clientHeight
      if (resizeHight < winHight - 100) {
        this.btnShow = false
      } else {
        this.btnShow = true
      }
    }
  },
  methods: {
    getData () {
      getCompleteInfo({ user_task_id: this.userTaskId }).then((res) => {
        console.log(res)
        this.infoData = res.data
        this.$nextTick(() => {
          this.getTextOver()
        })
      })
    },
    getTextOver () {
      const textCont = this.$refs.textCont
      const textHeight = textCont.clientHeight * 750 / document.documentElement.clientWidth
      if (textHeight > 48 * 5) {
        this.isOver = true
      }
    },
    showToggle () {
      this.isDown = !this.isDown
    },
    // 预览大图
    previewPic (index) {
      this.picIndex = index
      this.picShow = true
    },
    // 图文信息
    getForm (val) {
      this.formData.content = val.content
      this.formData.image_url = val.images
    },
    // 提交
    submit () {
      this.formData.type = this.statusIndex
      console.log(this.formData)
      const validator = [
        {
          value: this.formData.type,
          message: '请选择任务是否完成'
        }
      ]
      validForm(validator).then((res) => {
        if (this.formData.content.length > 500) {
          Toast('内容最多输入500字')
        } else {
          if (this.statusIndex == 1) {
            this.sure()
          } else {
            this.confirmShow = true
          }
        }
      }).catch(res => {})
    },
    sure () {
      this.formData.user_task_id = this.userTaskId
      submitCompleteInfo(this.formData).then((res) => {
        Toast({
          message: `已奖励${this.infoData.reward_happiness}幸福币给接单方`,
          onClose: () => {
            this.$router.go(-1)
          }
        })
      })
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
  /deep/textarea {
    min-height: 280px;
  }
}
.session-tit {
  height: 100px;
  line-height: 100px;
  position: relative;
  padding-left: 30px;
  font-size: 32px;
  font-weight: 500;
  color: #000000;
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
  &.red {
    height: 90px;
    line-height: 90px;
    &::before {
      background-color: #FF6555;
    }
  }
}
.divider-line {
  margin: 0 30px;
}
.receiver-cont {
  color: #000000;
  font-size: 30px;
  padding: 0 30px;
  position: relative;
  margin: 16px 0 20px;
  display: flex;
  .cont-text {
    line-height: 48px;
    overflow: hidden;
    &.text-hidden {
      height: 240px;
      overflow: hidden;
    }
    &::before {
      content: "";
      float: right;
      height: calc(100% - 45px);
    }
    .more-down {
      margin-right: 0;
      background-color: #fff;
      &::before {
        color: #000000;
      }
    }
  }

}
.receiver-pic {
  padding: 0 0 14px 30px;
  img {
    width: 150px;
    height: 150px;
    margin: 0 16px 16px 0;
  }
}
.initiator-session {
  padding: 0 30px;
}
.form-label {
  height: 82px;
  line-height: 82px;
  font-size: 24px;
  span {
    color: #FF6555;
  }
}
.popup-radio {
  height: 50px;
  font-size: 28px;
  margin-bottom: 20px;
  div:first-child {
    width: 30px;
    height: 30px;
    border: 1PX solid #000000;
    border-radius: 15px;
    margin-right: 10px;
    position: relative;
  }
  div:nth-child(2) {
    line-height: 50px;
  }
  &:nth-child(1) {
    width: 180px;
  }
  &:nth-child(2) {
    width: 194px;
  }
  &.active div:first-child {
    border-color: #FF5240;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 12px;
      height: 12px;
      background: #FF6555;
      border-radius: 50%;
    }
  }
}
.initiator-tip {
  height: 64px;
  line-height: 64px;
  text-align: center;
  background: #F7F7F7;
  border-radius: 10px;
  font-size: 24px;
  color: #8F8F94;
  margin-bottom: 30px;
}
</style>
