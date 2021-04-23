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
              <radio-list v-model="typeIndex"></radio-list>
            </div>
          </div>
        </div>
      </task-card> -->
      <type-select ref="typeRadio" :radioList="postTypeList" @selectCall="postCall"></type-select>
      <graphic
        :cardTit="cardTit"
        :phTxt="phTxt"
        :maxNum="maxNum"
        @getForm="getForm"
      >
      </graphic>
      <div class="task-btn-block">
        <div @click="submit" :class="[ typeIndex > -1 && formData.content ? '' : 'unable-btn', 'task-btn']">发布</div>
      </div>
      <confirm-model v-model="confirmShow" modelTit="确定放弃发布？" cancelTxt="放弃" yesTxt="取消" @cancel="$router.go(-1)"></confirm-model>
    </div>
  </div>
</template>

<script>
import {
  NavBar, Toast
} from 'vant'
import { getPostBarCategoryList, addPostBar } from '@/api/neighbours'
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
      postTypeList: [], // 类型
      textNum: 0, // textarea 长度
      formData: {
        content: '',
        images: []
      },
      cardTit: '分享内容',
      phTxt: '来吧，想和大家分享点什么……',
      maxNum: 500,
      confirmShow: false,
      typeIndex: -1, // 选中项
      typeName: '', // 类型选择项内容
      typeId: '' // 类型选择项id
    }
  },
  created () {
    this.typeId = this.$route.query.typeId
    this.getPostType()
  },
  mounted () {

  },
  methods: {
    // 小组类型
    getPostType () {
      getPostBarCategoryList().then(res => {
        this.postTypeList = res.data.map((item, key) => {
          if (item.id == this.typeId) {
            this.typeIndex = key
            this.typeName = item.category
            this.$refs.typeRadio.setType(key)
          }
          return {
            id: item.id,
            text: item.category
          }
        })
      })
    },
    // 选择小组类型
    postCall (index) {
      this.typeIndex = index
      this.typeId = this.postTypeList[index].id
      this.typeName = this.postTypeList[index].text
    },
    // 图文信息
    getForm (val) {
      this.formData = val
      this.textNum = val.content.length
    },
    // 提交
    submit () {
      const typeId = this.postTypeList[this.typeIndex].id
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
          addPostBar({
            category_id: typeId,
            content: this.formData.content,
            images: this.formData.images.join(',')
          }).then((res) => {
            Toast({
              message: res.message,
              duration: 2000,
              onOpened: () => {
                this.$router.go(-2)
              }
            })
            this.mtjEvent({
              eventId: 42
            })
          }).catch((res) => {
          })
        }
      })
    },
    closePage () {
      if (this.formData.content || this.formData.images.length) {
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
