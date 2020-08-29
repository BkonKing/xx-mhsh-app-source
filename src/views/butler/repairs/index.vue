<template>
  <div class="tf-bg">
    <van-nav-bar
      title="报事报修"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-shijian" @click="goList"></span>
      </template>
    </van-nav-bar>
    <div class="page-container">
      <van-notice-bar
        v-if="progressNum"
        class="swiper-nav tf-mb-lg"
        left-icon="warning-o"
        mode="link"
        background="rgba(249,134,107,0.2)"
        :scrollable="false"
        @click="goProgress()"
      >您有正在进行的报事报修，点击查看进度</van-notice-bar>
      <div class="tf-card">
        <div class="tf-card-header">选择类型</div>
        <div class="tf-card-content" style="padding-bottom: 10px;">
          <tf-radio-btn
            v-model="category_id"
            :data="categoryList"
            label-key="category"
            value-key="id"
          ></tf-radio-btn>
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
          <tf-uploader v-model="images" max-count="6"></tf-uploader>
        </div>
      </div>
      <van-button class="tf-mt-lg" color="#EB5841" size="large" @click="formSubmit">提交</van-button>
    </div>
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
import tfUploader from '@/components/tf-uploader/index'
import { addRepair, getRepairCategoryList } from '@/api/butler.js'
import { validForm } from '@/utils/util'
import { mapGetters } from 'vuex'
export default {
  components: {
    tfAlert,
    tfRadioBtn,
    tfUploader,
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
      progressNum: 0, // 进行中的报事报修数量
      repairId: '', // 如果进行中报事报修为一个，则repairId等于该报事报修id
      category_id: '',
      content: '',
      categoryList: [],
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
  computed: {
    ...mapGetters(['currentProject'])
  },
  created () {
    this.getRepairCategoryList()
  },
  methods: {
    /* 获取报事报修类型 */
    getRepairCategoryList () {
      getRepairCategoryList().then(({ data }) => {
        const { category, num, repair_id } = data
        this.categoryList = category
        this.progressNum = num
        this.repairId = repair_id
      })
    },
    /* 表单提交 */
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
    /* 新增报事报修 */
    addRepair () {
      addRepair(
        {
          content: this.content,
          images: this.images.join(','),
          category_id: this.category_id
        },
        this.currentProject.house_id
      ).then((res) => {
        if (res.success) {
          Dialog.alert({
            title: '提交成功'
          }).then(() => {
            this.repairId = res.data.repair_id
            this.goRepairDetails()
          })
        } else {
          Toast.fail('提交失败')
        }
      })
    },
    /* 判断进行中数量，若是只有一个正在进行中，跳转至详情页；
        若是有多个正在进行中，跳转至记录列表页； */
    goProgress () {
      if (this.progressNum == 1) {
        this.goRepairDetails()
      } else {
        this.goList()
      }
    },
    // 跳转到列表页
    goList () {
      this.$router.push('/pages/butler/repairs/list')
    },
    // 跳转到详情页
    goRepairDetails () {
      const url = `/pages/butler/repairs/details?id=${this.repairId}`
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
.page-container {
  padding: 30px 20px;
}
.swiper-nav {
  height: 88px;
  border-radius: 10px;
  /deep/ .van-notice-bar__content {
    color: #eb5841;
  }
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
      content: "\e85d";
    }
  }
}
.tf-card + .tf-card {
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
/deep/ .van-uploader__upload,
/deep/ .van-uploader__preview {
  width: 114px;
  height: 114px;
}
</style>
