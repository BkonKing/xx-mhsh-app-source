<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar :fixed="true" placeholder :border="false">
      <template #left>
        <span class="tf-icon tf-icon-guanbi" @click="closePage"></span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <div class="type-name">选择发布类型</div>
      <div class="type-block" :class="{ 'cur' : teamIndex > -1 }">
        <div class="type-tit">小组</div>
        <radio-list v-model="teamIndex"></radio-list>
      </div>
      <div class="type-block" :class="{ 'cur' : taskIndex > -1 }">
        <div class="type-tit">任务</div>
        <radio-list v-model="taskIndex"></radio-list>
      </div>
      <div class="task-btn type-btn" :class="{ 'unable-btn': !selectId }">下一步</div>
    </div>
  </div>
</template>

<script>
import {
  NavBar
} from 'vant'
import radioList from '../components/radio-list'
export default {
  components: {
    [NavBar.name]: NavBar,
    radioList
  },
  data () {
    return {
      selectType: 0, // 选中的类型 1小组 2任务
      selectId: 0, // 选择的id
      teamIndex: -1, // 小组选中项
      taskIndex: 0 // 任务选中项
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    closePage () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar {
  background-color: #F7F7F7;
  .van-nav-bar__left  {
    padding-left: 20px;
    .tf-icon{
      color: #000;
      font-size: 30px;
    }
  }
}
.tf-body-container{
  padding: 20px;
  font-size: 28px;
  color: #333;
  background: linear-gradient(180deg, #F7F7F7 0%, rgba(247, 247, 247, 0) 800px);
  .type-name {
    height: 74px;
    font-size: 36px;
    font-weight: 500;
    color: #000000;
    line-height: 74px;
    margin-bottom: 36px;
  }
  .type-block {
    background: #FFFFFF;
    border-radius: 10px;
    padding-left: 20px;
    padding-bottom: 10px;
    overflow: hidden;
    margin-bottom: 30px;
    &.cur {
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
      .type-tit {
        color: #000000;
      }
    }
    .type-tit {
      height: 88px;
      line-height: 88px;
      text-align: center;
      font-size: 32px;
      font-weight: 500;
      color: #aaa;
    }
    .type-list {
      margin-right: -6px;
    }
    .type-item {
      height: 64px;
      line-height: 64px;
      background: #F7F7F7;
      border-radius: 10px;
      font-size: 24px;
      padding: 0 28px;
      margin-right: 22px;
      margin-bottom: 20px;
      &.cur {
        background: #FFEDEB;
        color: #FF5240;
      }
    }
  }
  .type-btn {
    margin-top: 80px;
  }
}

</style>
