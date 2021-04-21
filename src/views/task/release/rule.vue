<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar :fixed="true" placeholder :border="false">
      <template #left>
        <span class="tf-icon tf-icon-guanbi" @click="closePage"></span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <!-- <task-card cardTit="小组类型">
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
      </task-card> -->
      <type-select></type-select>
      <graphic
        :cardTit="cardTit"
        :phTxt="phTxt"
        :maxNum="maxNum"
        @getForm="getForm"
      >
      </graphic>
      <div class="task-btn-block">
        <div @click="submit" :class="[ radioIndex > -1 && formData.content ? '' : 'unable-btn', 'task-btn']">发布</div>
      </div>
      <confirm-model v-model="confirmShow"></confirm-model>
    </div>
  </div>
</template>

<script>
import {
  NavBar, Toast
} from 'vant'
import typeSelect from '../components/type-select'
import graphic from '../components/graphic'
import confirmModel from '../components/confirm-model'
import { validForm } from '@/utils/util'
export default {
  components: {
    [NavBar.name]: NavBar,
    typeSelect,
    graphic,
    confirmModel
  },
  data () {
    return {
      radioIndex: 0, // 类型选中项
      textNum: 0, // textarea 长度
      formData: {
        content: '',
        images: []
      },
      cardTit: '分享内容',
      phTxt: '来吧，想和大家分享点什么……',
      maxNum: 500,
      confirmShow: false
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
      const typeId = this.radioIndex
      const validator = [
        {
          value: typeId,
          message: '请选择发布类型'
        },
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
    },
    closePage () {
      console.log(this.radioIndex > -1, this.formData.content, this.images.length)
      if (this.radioIndex > -1 || this.formData.content || this.images.length) {
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
}
.task-btn-block {
  height: 166px;
}
</style>
