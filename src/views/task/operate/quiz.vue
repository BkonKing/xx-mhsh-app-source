<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar :fixed="true"
                 :border="false"
                 placeholder
                 left-arrow
                 @click-left="goback">
      <template #title>
        <div class="title">任务提问</div>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <div v-show="false" class="empty-session">
        <img src="" />
        <div>暂无内容</div>
      </div>
      <div class="quiz-list">
        <div class="quiz-item">
          <div class="operate-btn van-icon van-icon-ellipsis"></div>
          <div class="item-header">
            <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
            <div class="name-time tf-column">
              <div class="user-name van-ellipsis">月亮照常落下</div>
              <div class="itme-time">2021-3-25 12:35:26</div>
            </div>
          </div>
          <div class="item-cont">月亮升起，有雕归巢的声音，有鱼儿越出碧光，有琴 声演绎古老传说。</div>
          <div class="reply-cont">
            <span>任务方：</span>哦哦哦哦哦哦~
            <div class="more-down"></div>
          </div>
          <div v-show="false" class="reply-btn tf-row-center">回复TA</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  NavBar
} from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar
  },
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

.tf-body-container{
  padding: 20px;
  font-size: 28px;
  color: #333;
  background-color: #F7F7F7;
}
.empty-session {
  padding-top: 382;
  align-items: center;
  img {
    width: 209px;
    height: 240px;
  }
  div {
    font-size: 26px;
    color: #8F8F94;
    line-height: 36px;
    margin-top: 44px;
  }
}
.quiz-item {
  width: 710px;
  background: #FFFFFF;
  border-radius: 10px;
  margin: 0 auto 30px;
  padding: 30px;
  position: relative;
  .item-header {
    @flex();
    height: 80px;
    margin-bottom: 30px;
    img {
      width: 80px;
      height: 100%;
      border-radius: 50%;
      margin-right: 20px;
    }
    .name-time {
      max-width: 480px;
      justify-content: center;
    }
    .user-name {
      font-weight: 500;
      color: #000000;
      line-height: 36px;
      margin-bottom: 4px;
    }
    .itme-time {
      font-size: 22px;
      color: #AAAAAA;
      line-height: 36px;
    }
  }
  .operate-btn {
    position: absolute;
    right: 22px;
    top: 35px;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #8F8F94;
    transform: rotate(90deg);
  }
  .item-cont {
    font-size: 28px;
    color: #333333;
    line-height: 44px;
    margin-bottom: 22px;
  }
  .reply-btn {
    width: 650px;
    height: 88px;
    background: #FFFFFF;
    border: 1PX solid #CCCCCC;
    border-radius: 44px;
    align-items: center;
  }
  .reply-cont {
    padding: 22px 30px;
    background: #F7F7F7;
    border-radius: 10px;
    color: #8F8F94;
    line-height: 44px;
    span {
      color: #E98400;
    }
  }
}
</style>
