<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar :fixed="true" placeholder border>
      <!-- <template #left>
        <span class="tf-icon tf-icon-guanbi" @click="closePublish"></span>
      </template>
      <template #right>
        <span v-preventReClick class="send-btn" :class="{'tf-text-orange': category_id && content}" @click="addPostBar">发送</span>
      </template> -->
    </van-nav-bar>
    <div class="tf-body-container">
      <div @click="selectShow=true">xuanz</div>
    </div>
    <date-picker :dateShow="false"></date-picker>
    <van-cell is-link @click="areaShow=true">展示弹出层</van-cell>
    <area-picker v-model="areaShow"></area-picker>
    <list-select v-model="selectShow" :selectList="selectList"></list-select>
  </div>
</template>

<script>
import datePicker from '../components/date-picker'
import areaPicker from '../components/area-picker'
import listSelect from '../components/list-select'
import {
  NavBar
} from 'vant'

export default {
  components: {
    [NavBar.name]: NavBar,
    datePicker,
    areaPicker,
    listSelect
  },
  data () {
    return {
      selectList: [
        {
          value: 0,
          text: '不限'
        },
        {
          value: 0,
          text: '指定地区'
        },
        {
          value: 0,
          text: '指定小区'
        },
        {
          value: 0,
          text: '指定人群'
        }
      ],
      selectShow: false, // 可见范围
      areaShow: false // 可见范围-指定地区
    }
  },
  created () {
    // this.category_id = this.$route.query.category_id || ''
    // this.getPostBarCategoryList()
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.tf-body-container{
  padding: 30px;
}

</style>
