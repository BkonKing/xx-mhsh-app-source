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
          <div class="receiver-cont">在深渊的边缘上，你守护我每一个孤独的梦--- 那风啊吹动草叶的喧响。太阳在远方白白地燃烧， 你在水洼旁，投进自己的影子微波荡荡，沉淀了 昨日的时光。假如有一天你也不免凋残，我只有 个简单的希望：保持着初放时的安…<div v-show="true" class="more-down"><i class="tf-icon tf-icon-caret-down"></i>展开</div></div>
          <div class="receiver-pic tf-row-wrap">
            <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
            <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
            <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
            <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
            <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
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
      <div class="task-btn-block">
        <div @click="submit" :class="[ formData.content ? '' : 'unable-btn', 'task-btn']">发布</div>
      </div>
      <confirm-model v-model="confirmShow" modelTit="确定已经完成任务？" modelSubTit="确定将结算幸福币给接单方"></confirm-model>
    </div>
  </div>
</template>

<script>
import {
  NavBar, Toast
} from 'vant'
import graphic from '../components/graphic'
import confirmModel from '../components/confirm-model'
import taskCard from '../components/task-card'
import { validForm } from '@/utils/util'
export default {
  components: {
    [NavBar.name]: NavBar,
    graphic,
    confirmModel,
    taskCard
  },
  data () {
    return {
      textNum: 0, // textarea 长度
      formData: {
        content: '',
        images: []
      },
      phTxt: '和对方说点什么',
      maxNum: 200,
      confirmShow: false,
      statusList: ['已完成', '未完成'],
      statusIndex: -1 // 0已完成 1未完成
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    // 图文信息
    getForm (val) {
      this.formData = val
      this.textNum = val.content.length
    },
    // 提交
    submit () {
      const validator = [
        {
          value: this.formData.content,
          message: '请输入要发布的内容'
        }
      ]
      validForm(validator).then((res) => {
        if (this.textNum > 500) {
          Toast('字数太多啦，分享的内容最多500字')
        } else {
          // addPostBar({
          //   category_id: typeId,
          //   content: this.content,
          //   images: this.images.join(',')
          // }).then((res) => {
          //   Dialog.alert({
          //     title: res.message
          //   }).then(res => {
          //     this.$router.go(-1)
          //   })
          //   this.mtjEvent({
          //     eventId: 42
          //   })
          // })
        }
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
  line-height: 48px;
  padding: 0 30px;
  position: relative;
  margin: 16px 0 20px;
  .more-down {
    position: absolute;
    right: 30px;
    bottom: 10px;
    font-size: 24px;
    line-height: 24px;
    color: #0089C9;
    background-color: #fff;
    i {
      padding: 0 20px 0 6px;
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
