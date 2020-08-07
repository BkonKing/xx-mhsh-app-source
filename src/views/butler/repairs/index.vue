<template>
  <div class="tf-bg tf-main-container">
    <van-nav-bar title="报事报修" :fixed="true" :border="false" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <span class="tf-icon tf-icon-time-circle" @click="goList"></span>
      </template>
    </van-nav-bar>
    <van-notice-bar
      v-if="progressList.length"
      class="swiper-nav"
      left-icon="warning-o"
      mode="link"
      background="rgba(249,134,107,0.2)"
      :scrollable="false"
    >
      <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
        <van-swipe-item
          v-for="item in progressList"
          :key="item.id"
          @click="goProgress(item)"
        >{{item.content}}</van-swipe-item>
      </van-swipe>
    </van-notice-bar>
    <div class="tf-card">
      <div class="tf-card-header">选择类型</div>
      <div class="tf-card-content" style="padding-bottom: 10px;">
        <tf-radio-btn v-model="category_id" :data="items"></tf-radio-btn>
      </div>
    </div>
    <div class="tf-card">
      <div class="tf-card-header">内容描述</div>
      <div class="tf-card-content">
        <van-field
          class="uni-input"
          v-model="content"
          autosize
          type="textarea"
          :maxlength="300"
          placeholder="请描述具体内容"
          show-word-limit
        />
      </div>
    </div>
    <div class="tf-card">
      <div class="tf-card-header">上传图片</div>
      <div class="tf-card-content">
        <van-uploader :after-read="uploadSuccess" :max-count="6" />
      </div>
    </div>
    <van-button class="tf-mt-lg" color="#EB5841" size="large" @click="formSubmit">提交</van-button>
  </div>
</template>

<script>
import {
  NavBar,
  Field,
  Uploader,
  Button,
  Toast,
  Dialog,
  NoticeBar,
  swipe,
  SwipeItem
} from 'vant'
import tfAlert from '@/components/tf-alert/index.vue'
import tfRadioBtn from '@/components/tf-radio-btn/index.vue'
// import uImg from '@/components/uploadImg/uploadImg.vue'
import { addRepair } from '@/api/butler.js'
import { validForm } from '@/utils/util'
export default {
  components: {
    tfAlert,
    tfRadioBtn,
    [NavBar.name]: NavBar,
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [NoticeBar.name]: NoticeBar,
    [swipe.name]: swipe,
    [SwipeItem.name]: SwipeItem,
    [Field.name]: Field
    // uImg
  },
  data () {
    return {
      progressList: [
        {
          id: 1,
          content: '您有正在进行的报事报修，点击查看进度',
          category: '报事报修'
        }
      ], // 进行中的报事报修数量
      category_id: '',
      content: '',
      items: [
        {
          value: 'USA',
          name: '美国'
        },
        {
          value: 'CHN',
          name: '中国',
          checked: 'true'
        },
        {
          value: 'BRA',
          name: '巴西'
        },
        {
          value: 'JPN',
          name: '日本'
        },
        {
          value: 'ENG',
          name: '英国'
        },
        {
          value: 'FRA',
          name: '法国'
        }
      ],
      images: [],
      msg: '',
      length: 140,
      placeholder: '欢迎反馈任何意见和问题,您的反馈也是我们产品的动力哦',
      limitNum: 6,
      uploadFileUrl: '', // 替换成你的后端接收文件地址
      name: '', // 上传的名字
      header: {
        // 如果需要header，请上传
      }
    }
  },
  // 点击导航栏 buttons 时触发
  onNavigationBarButtonTap (e) {
    const index = e.index
    if (index === 0) {
      this.goList()
    }
  },
  methods: {
    formSubmit: function () {
      const validator = [
        {
          value: this.category_id,
          message: '请选择类型'
        },
        {
          value: this.content,
          message: '请输入内容'
        }
      ]
      validForm(validator).then((res) => {
        this.addRepair()
      })
    },
    // 新增报事报修
    addRepair () {
      addRepair({
        content: this.content,
        images: this.images,
        category_id: this.category_id,
        project_id: '2',
        house_id: '1'
      }).then((res) => {
        if (res.success) {
          Dialog.alert({
            title: '提交成功'
          }).then(() => {
            setTimeout(() => {
              this.goList()
            }, 1000)
          })
        } else {
          Toast.fail('提交失败')
        }
      })
    },
    /* 判断进行中数量，若是只有一个正在进行中，跳转至详情页；
        若是有多个正在进行中，跳转至记录列表页； */
    goProgress (item) {
      if (this.progressList.length === 1) {
        this.goRepairDetails(item)
      } else {
        this.goList()
      }
    },
    // 跳转到列表页
    goList () {
      this.$router.push('/pages/butler/repairs/list')
    },
    // 跳转到详情页
    goRepairDetails ({ id, category }) {
      const url = `/pages/butler/repairs/details?id=${id}&title=${category}`
      this.$router.push(url)
    },
    // 图片上传回调
    uploadSuccess (result) {
      if (result.statusCode === 200) {
        // 上传成功的回调处理
        Toast('上传成功')
      } else {
        Toast('上传失败')
      }
    },
    // 上传方法的调用
    upFile () {
      this.$refs.upimg.upload()
    }
  }
}
</script>

<style lang="less" scoped>
.tf-main-container {
  padding: 118px 20px 30px;
}
.swiper-nav {
  height: 88px;
  border-radius: 10px;
  .notice-swipe {
    height: 88px;
    /deep/ .van-swipe-item {
      line-height: 88px;
    }
  }
  /deep/ .van-icon-arrow {
    font-size: 24px !important;
    &::before {
      font-family: tficonfont;
      content: '\e85d'
    }
  }
}
.tf-card {
  margin-top: @padding-lg;
}
.tf-card-header {
  font-size: @font-size-md !important;
  font-weight: bold;
}
.uni-input {
  font-size: @font-size-md !important;
  padding: 0;
}
.alert-box {
  margin-top: 30px;
}
</style>
