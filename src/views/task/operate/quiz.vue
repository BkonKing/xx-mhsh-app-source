<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #title>
        <div class="title">任务提问</div>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <div v-show="false" class="empty-session">
        <img src="@/assets/img/empty_quiz.png" />
        <div>暂无内容</div>
      </div>
      <div class="quiz-list">
        <div class="quiz-item">
          <div class="operate-ellipsis van-icon van-icon-ellipsis"></div>
          <div class="item-header">
            <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
            <div class="name-time tf-column">
              <div class="user-name van-ellipsis">月亮照常落下</div>
              <div class="itme-time">2021-3-25 12:35:26</div>
            </div>
          </div>
          <div class="item-cont">月亮升起，有雕归巢的声音，有鱼儿越出碧光，有琴 声演绎古老传说。</div>
          <div class="reply-cont">
            <div :class="{'test-over': isOver}" ref="test">
              <span>任务方：</span>{{ text }}
            </div>
            <div v-show="isOver" class="more-down"><i class="tf-icon tf-icon-caret-down"></i>展开</div>
          </div>
          <div v-show="false" class="reply-btn tf-row-center">回复TA</div>
        </div>
        <div class="quiz-item">
          <div class="operate-ellipsis van-icon van-icon-ellipsis">
            <div class="operate-btn">
              <div>屏蔽</div>
              <div class="line"></div>
              <div>投诉</div>
            </div>
          </div>
          <div class="item-header">
            <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
            <div class="name-time tf-column">
              <div class="user-name van-ellipsis">月亮照常落下</div>
              <div class="itme-time">2021-3-25 12:35:26</div>
            </div>
          </div>
          <div class="item-cont">月亮升起，有雕归巢的声音，有鱼儿越出碧光，有琴 声演绎古老传说。</div>
          <div class="reply-btn tf-row-center">回复TA</div>
        </div>
      </div>
      <div class="quiz-input"></div>
    </div>
    <comment
      ref="comment"
      v-model="commentShow"

    ></comment>
  </div>
</template>

<script>
import {
  NavBar
} from 'vant'
import comment from '../components/comment'
export default {
  components: {
    [NavBar.name]: NavBar,
    comment
  },
  data () {
    return {
      commentShow: false,
      text: '',
      isOver: false
    }
  },
  created () {
    this.getData()
  },
  mounted () {

  },
  methods: {
    getData () {
      this.text = '哦哦哦哦哦哦~哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦'
      this.$nextTick(() => {
        this.test = this.$refs.test
        console.log(this.test.clientHeight)
        const textHeight = this.test.clientHeight * 750 / document.documentElement.clientWidth
        console.log(textHeight)
        if (textHeight > 60) {
          this.isOver = true
        }
        // this.showDetailBtn = this.detailDom.clientHeight < this.detailDom.scrollHeight;
      })
    }
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
  padding-top: 382px;
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
  .operate-ellipsis {
    position: absolute;
    right: 30px;
    top: 54px;
    width: 36px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    color: #8F8F94;
    // transform: rotate(90deg);
    .operate-btn {
      position: absolute;
      top: 50%;
      left: -255px;
      margin-top: -36px;
      width: 225px;
      height: 72px;
      line-height: 72px;
      background-color: #333333;
      border-radius: 10px;
      @flex();
      align-items: center;
      color: #FFFFFF;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -10px;
        margin-top: -5px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 5px 0 5px 10px;
        border-color: transparent transparent transparent #333333;
      }
      & > div {
        flex-grow: 1;
        text-align: center;
      }
      .line {
        width: 2pX;
        flex-grow: 0;
        height: 30px;
        background: #8F8F94;
      }
    }
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

    position: relative;
    & > div {
      line-height: 44px;
      max-height: 132px;
      overflow: hidden;
    }
    span {
      color: #E98400;
    }
    .more-down {
      position: absolute;
      right: 30px;
      bottom: 30px;
      font-size: 24px;
      line-height: 24px;
      color: #0089C9;
      background-color: #F7F7F7;
      i {
        padding: 0 10px 0 6px;
      }
    }
  }
}
</style>
