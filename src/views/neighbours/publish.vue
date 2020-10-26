<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar :fixed="true" placeholder border>
      <template #left>
        <span class="tf-icon tf-icon-guanbi" @click="closePublish"></span>
      </template>
      <template #right>
        <span v-preventReClick class="send-btn" :class="{'tf-text-orange': category_id && content}" @click="addPostBar">发送</span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <van-dropdown-menu class="publish-type" :overlay="false" :close-on-click-outside="false">
        <van-dropdown-item :title="radioLabel || '发布类型'" ref="item">
          <tf-radio-btn v-model="category_id" :data="types" @change="handRadioChange"></tf-radio-btn>
        </van-dropdown-item>
      </van-dropdown-menu>
      <van-field
        v-model="content"
        autosize
        rows="8"
        type="textarea"
        :maxlength="500"
        placeholder="来吧，想和大家分享点什么..."
        show-word-limit
      />
      <van-divider />
      <tf-uploader v-model="images" max-count="9"></tf-uploader>
    </div>
  </div>
</template>

<script>
import {
  NavBar,
  DropdownMenu,
  DropdownItem,
  Field,
  Divider,
  Uploader,
  Dialog,
  Toast
} from 'vant'
import tfRadioBtn from '@/components/tf-radio-btn/index'
import tfUploader from '@/components/tf-uploader/index'
import { addPostBar, getPostBarCategoryList } from '@/api/neighbours'
import { validForm } from '@/utils/util'

export default {
  components: {
    [NavBar.name]: NavBar,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Field.name]: Field,
    [Divider.name]: Divider,
    [Uploader.name]: Uploader,
    [Dialog.name]: Dialog,
    tfRadioBtn,
    tfUploader
  },
  data () {
    return {
      category_id: '',
      content: '',
      radioLabel: '',
      types: [],
      images: []
    }
  },
  created () {
    this.category_id = this.$route.query.category_id || ''
    this.getPostBarCategoryList()
  },
  mounted () {
    this.$refs.item.toggle()
  },
  methods: {
    /* 获取话题小组 */
    getPostBarCategoryList () {
      getPostBarCategoryList().then((res) => {
        this.types = res.data.length ? res.data.map(obj => {
          return {
            value: obj.id,
            name: obj.category
          }
        }) : []
      })
    },
    /* 选择完类型自动折叠起类型选择区域 */
    handRadioChange (value, label) {
      this.radioLabel = label
      this.$refs.item.toggle()
    },
    /* 无内容(图片、文字)时直接返回；有内容时弹窗提示 */
    closePublish () {
      if (this.category_id || this.content || this.images.length > 0) {
        Dialog.confirm({
          message: '确定放弃发布'
        })
          .then(() => {
            this.$router.go(-1)
          })
          .catch(() => {
            // on cancel
          })
      } else {
        this.$router.go(-1)
      }
    },
    // 发布
    addPostBar () {
      const validator = [
        {
          value: this.category_id,
          message: '请选择发布类型'
        },
        {
          value: this.content,
          message: '请输入要发布的内容'
        }
      ]
      validForm(validator).then((res) => {
        addPostBar({
          category_id: this.category_id,
          content: this.content,
          images: this.images.join(',')
        }).then((res) => {
          Dialog.alert({
            title: res.message
          }).then(res => {
            this.$router.go(-1)
          })
          this.mtjEvent({
            eventId: 42
          })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tf-body-container{
  padding: 30px;
}
.publish-type {
  /deep/ .van-dropdown-item {
    position: initial;
  }
  /deep/ .van-dropdown-menu__bar {
    border-radius: 33px;
    background: @background-color;
    margin-bottom: 30px;
  }
  /deep/ .van-dropdown-menu__title {
    display: block;
    width: 100%;
    text-align: center;
  }
  /deep/ .van-dropdown-menu__title,
  .van-dropdown-menu__title--active {
    color: @text-color;
  }
  /deep/ .van-dropdown-menu__title::after {
    right: 30px;
    margin-top: -7px;
    border: 7px solid;
    border-color: transparent transparent #aaa #aaa;
  }
  /deep/ .van-dropdown-item__content {
    position: initial;
    width: 690px;
    padding: 30px 30px 0;
    // height: 188px;
    background: @background-color;
    margin-bottom: 30px;
  }
}
/deep/ .radio-btn-group {
  justify-content: flex-start;
}
/deep/ .radio-btn__item {
  height: 54px;
  border: 2px solid #aaaaaa;
  border-radius: 4px !important;
  margin-right: 20px;
  .radio-btn__text {
    font-size: 24px;
    line-height: 54px;
  }
}
/deep/ .van-uploader__upload,
/deep/ .van-uploader__preview {
  width: 216px;
  height: 216px;
}
.tf-icon-guanbi {
  font-size: 44px;
}
.send-btn {
  color: #aaa;
}
</style>
