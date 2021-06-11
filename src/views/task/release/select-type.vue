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
        <radio-list v-model="teamIndex" :radioList="postTypeList" @selectCall="postCall"></radio-list>
      </div>
      <div v-if="isOpeningTask" class="type-block" :class="{ 'cur' : taskIndex > -1 }">
        <div class="type-tit">任务</div>
        <radio-list v-model="taskIndex" :radioList="taskTypeList" @selectCall="taskCall"></radio-list>
      </div>
      <div @click="goLink" class="task-btn type-btn" :class="{ 'unable-btn': !selectId }">下一步</div>
    </div>
  </div>
</template>

<script>
import {
  NavBar
} from 'vant'
import radioList from '../components/radio-list'
import { getPostBarCategoryList } from '@/api/neighbours'
import { getTaskTypeList } from '@/api/task'
export default {
  components: {
    [NavBar.name]: NavBar,
    radioList
  },
  data () {
    return {
      postTypeList: [], // 小组类型
      taskTypeList: [], // 任务类型
      selectType: 0, // 选中的类型 1小组 2任务
      selectId: 0, // 选择的id
      teamIndex: -1, // 小组选中项
      taskIndex: -1, // 任务选中项
      isOpeningTask: 0 // 是否开启任务
    }
  },
  created () {
    this.isOpeningTask = +this.$route.query.task
    this.getPostType()
    this.isOpeningTask && this.getTaskType()
  },
  mounted () {
  },
  methods: {
    // 小组类型
    getPostType () {
      getPostBarCategoryList().then(res => {
        this.postTypeList = res.data.map(item => {
          return {
            id: item.id,
            text: item.category
          }
        })
      })
    },
    // 任务类型
    getTaskType () {
      getTaskTypeList().then(res => {
        this.taskTypeList = res.data.map(item => {
          return {
            id: item.id,
            text: item.type_name
          }
        })
      })
    },
    // 选择小组类型
    postCall (index) {
      if (this.taskIndex > -1) {
        this.taskIndex = -1
      }
      this.selectId = this.postTypeList[index].id
    },
    // 选择任务类型
    taskCall (index) {
      if (this.teamIndex > -1) {
        this.teamIndex = -1
      }
      this.selectId = this.taskTypeList[index].id
    },
    goLink () {
      if (this.teamIndex > -1) {
        this.$router.push({
          name: 'postPubuish',
          query: {
            typeId: this.selectId
          }
        })
      } else if (this.taskIndex > -1) {
        console.log(this.taskTypeList, this.taskIndex)
        this.$router.push({
          name: 'releaseEdit',
          query: {
            typeId: this.selectId
          }
        })
      }
    },
    // 关闭
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
