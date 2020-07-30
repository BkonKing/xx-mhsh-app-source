<template>
  <div class="tf-bg-white">
    <van-nav-bar :fixed="true" border>
      <template #left>
        <span class="tf-icon tf-icon-close" @click="$router.go(-1)"></span>
      </template>
      <template #right>
        <span class="tf-icon tf-icon-send" @click="goMyList"></span>
      </template>
    </van-nav-bar>
    <div class="tf-main-container">
      <van-dropdown-menu class="publish-type" :overlay="false" :close-on-click-outside="false">
        <van-dropdown-item title="发布类型" ref="item">
          <tf-radio-btn :data="types" @change="handRadioChange"></tf-radio-btn>
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
        <van-uploader :after-read="uploadSuccess" />
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
  Uploader
} from 'vant'
import tfRadioBtn from '@/components/tf-radio-btn/index.vue'

export default {
  components: {
    [NavBar.name]: NavBar,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Field.name]: Field,
    [Divider.name]: Divider,
    [Uploader.name]: Uploader,
    tfRadioBtn
  },
  data () {
    return {
      category_id: '',
      content: '',
      types: [
        {
          value: 1,
          name: '社区服务'
        },
        {
          value: 2,
          name: '老年活动中心'
        },
        {
          value: 3,
          name: '政务咨询'
        },
        {
          value: 4,
          name: '活动'
        },
        {
          value: 5,
          name: '咨询'
        },
        {
          value: 6,
          name: '书法兴趣小组'
        },
        {
          value: 7,
          name: '社区工作组'
        }
      ]
    }
  },
  created () {},
  methods: {
    // 选择类型
    handRadioChange (value) {
      this.category_id = value
    }
  }
}
</script>

<style lang="less" scoped>
.tf-bg-white {
  height: 100%;
}
.tf-main-container {
  padding: 118px 30px 0;
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
    border-color: transparent transparent @text-color @text-color;
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
/deep/ .van-uploader__upload {
  width: 216px;
  height: 216px;
}
.tf-icon-close {
  font-size: 44px;
}
</style>
