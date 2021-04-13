<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar :fixed="true" placeholder :border="false">
      <template #left>
        <span class="tf-icon tf-icon-guanbi" @click="closePage"></span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <task-card cardTit="小组类型">
        <div slot="content">
          <div class="label-block">
            <div @click="radioToggle" class="lable-tit tf-row-space-between">
              <div>知识分享</div>
              <div :class="[radioShow ? 'arrow-rorate' : '', 'right-arrow van-icon van-icon-arrow']"></div>
            </div>
            <div v-show="radioShow" class="radio-block">
              <radio-list v-model="radioIndex"></radio-list>
            </div>
          </div>
        </div>
      </task-card>
      <task-card cardTit="分享内容">
        <span slot="titIcon" class="tit-icon">*</span>
        <div slot="content">
          <van-field
            v-model.trim="content"
            autosize
            rows="8"
            :border="false"
            @input="getText"
            type="textarea"
            placeholder="来吧，想和大家分享点什么..."
          />
          <van-divider />
          <div class="text-num tf-row">
            <div><span :class="{'red': textNum>500}">{{ textNum }}</span>/500</div>
          </div>
          <div class="divider-line"></div>
          <div class="pic-block">
            <tf-uploader v-model="images" max-count="9"></tf-uploader>
          </div>
        </div>
      </task-card>
      <div class="btn-block">
        <div @click="submit" :class="[ radioIndex > -1 && content ? '' : 'unable-btn', 'task-btn']">发布</div>
      </div>
      <confirm-model v-model="confirmShow"></confirm-model>
    </div>
  </div>
</template>

<script>
import {
  NavBar, Toast
} from 'vant'
import taskCard from '../components/task-card'
import radioList from '../components/radio-list'
import tfUploader from '@/components/tf-uploader/index'
import confirmModel from '../components/confirm-model'
import { validForm } from '@/utils/util'
export default {
  components: {
    [NavBar.name]: NavBar,
    taskCard,
    radioList,
    tfUploader,
    confirmModel
  },
  data () {
    return {
      radioShow: false, // 小组类型显示
      radioIndex: -1, // 类型选中项
      content: '', // textarea内容
      textNum: 0, // textarea 长度
      images: [], // 上传图片列表
      confirmShow: true
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    // 小组类型消失隐藏
    radioToggle () {
      this.radioShow = !this.radioShow
    },
    // textarea内容变化
    getText (val) {
      console.log(val.trim().length)
      this.textNum = val.trim().length
    },
    // 提交
    submit () {
      const typeId = this.radioIndex
      const validator = [
        {
          value: typeId,
          message: '请选择发布类型'
        },
        {
          value: this.content,
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
    },
    closePage () {
      console.log(this.radioIndex > -1, this.content, this.images.length)
      if (this.radioIndex > -1 || this.content || this.images.length) {
        this.confirmShow = true
      } else {
        this.$router.go(-1)
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
  .lable-tit {
    height: 36px;
    align-items: center;
    font-size: 32px;
    padding: 0 30px;
    margin-top: 22px;
    margin-bottom: 37px;
    .right-arrow {
      width: 36px;
      height: 100%;
      line-height: 36px;
      text-align: center;
      color: #aaa;
      transition: all 0.3s;
      &.arrow-rorate {
        transform: rotate(-90deg);
      }
    }
  }
  .radio-block {
    margin-top: 47px;
    padding-left: 20px;
  }
  .tit-icon {
    color: #FEBF00;
  }
  /deep/ .van-field {
    padding: 6px 47px 36px 30px;
    textarea {
      min-height: 414px;
      font-size: 30px;
      color: #333333;
      line-height: 48px;
      word-break: break-all;
    }
    & + .van-divider--hairline {
      display: none;
    }
  }
  .text-num {
    align-items: center;
    justify-content: flex-end;
    padding-right: 30px;
    font-size: 26px;
    color: #7A7A7E;
    margin-bottom: 14px;
    div {
      line-height: 36px;
    }
    span.red {
      color: #FF6555;
    }
  }
  .divider-line {
    height: 1PX;
    background-color: #EEEEEE;
    margin-right: 60px;
    margin-bottom: 30px;
  }
}
.pic-block {
  padding: 0 0 10px 30px;
}
/deep/ .van-uploader__upload,
/deep/ .van-uploader__preview {
  width: 150px;
  height: 150px;
  margin: 0 16px 20px 0;
  .van-uploader__preview-delete {
    right: 0;
    top: 0;
    width: 36px;
    height: 36px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 0px 0px 0px 14px;
    .van-uploader__preview-delete-icon {
      font-size: 36px;
    }
  }
}
/deep/ .van-uploader__upload {
  background-color: #fff;
  border: 2px dashed #8F8F94;
  .van-uploader__upload-icon {
    color: #8F8F94;
    font-size: 40px;
  }
}
.btn-block {
  height: 166px;
  .task-btn {
    position: fixed;
    bottom: 30px;
    left: 20px;
    z-index: 5;
  }
}
</style>
