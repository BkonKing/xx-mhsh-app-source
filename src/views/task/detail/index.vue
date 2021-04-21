<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar
      title="社区义工"
      :fixed="true"
      placeholder
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span
          class="van-icon van-icon-ellipsis"
          @click="openArticleDialog"
        ></span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <div class="header-block">
        <!-- <div class="task-status">审核中</div> -->
        <!-- <div class="task-status bg-ccc">已失效</div> -->
        <!-- <div class="task-status bg-FF6555">审核失败</div> -->
        <div class="task-status bg-FEBF00">已完成</div>
        <img class="header-bg" src="@/assets/img/task_01.png" />
        <div class="task-tit">小区清洁志愿者小区清洁 志愿者小区清洁志愿</div>
        <div class="task-coin tf-row-vertical-center">
          <img src="@/assets/img/task_02.png" />
          <div class="coin-num">100</div>
          <div class="coin-unit">幸福币/人</div>
        </div>
        <div class="task-label tf-row">
          <div class="lable-item">日结</div>
          <div class="lable-item">日结日结日结日结日结</div>
          <div class="lable-item">日结日结日结</div>
        </div>
      </div>
      <div class="body-cont">
        <div class="task-session">
          <div class="session-tit">任务来源</div>
          <div class="release-user tf-row">
            <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
            <div class="tf-row-space-between">
              <div class="release-name van-ellipsis">美好生活物业</div>
              <div class="release-time">2021-03-21 12:00</div>
            </div>
          </div>
          <div class="complain-tip tf-row-space-between">
            <div>凡涉及到内容有违法信息传播。收费不合理， 请您警惕并手机关联证据向我们举报。</div>
            <div>投诉</div>
          </div>
        </div>
        <div class="task-session">
          <div class="session-tit tf-row-space-between">接单用户<div class="tit-right tf-row-vertical-center">查看<img src="@/assets/img/task_09.png" /></div></div>
          <div class="release-user tf-row">
            <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
            <div class="tf-row-space-between">
              <div class="release-name van-ellipsis">美好生活物业</div>
              <div class="release-time color-FF5240">进行中</div>
            </div>
            <div class="finish-btn">交付任务</div>
          </div>
          <div class="progress-step">
            <div>03-21  12:00 已完成</div>
            <div>03-21 12:00 接单成功，任务进行中</div>
          </div>
        </div>
        <div class="task-session">
          <div class="session-tit">任务要求</div>
          <div class="ask-list">
            <div class="ask-item">需要人数：2人（1人已接单）</div>
            <div class="ask-item">完成时间：截止 2021-03-10 12:00</div>
            <div class="ask-item">可见范围：不限</div>
          </div>
        </div>
        <div class="task-session">
          <div class="session-tit">完成地点</div>
          <div class="task-address tf-vertical-center">
            <div class="van-ellipsis">三盛滨江国际1号楼 线下科技</div>
            <div class="van-ellipsis">福建省 福州市 仓山区</div>
            <img class="address-arrow" src="@/assets/img/task_04.png" />
            <img class="address-bg" src="@/assets/img/task_03.png" />
          </div>
        </div>
        <div class="task-session">
          <div class="session-tit tf-row-space-between">任务说明<span class="tit-right">更新：1天前</span></div>
          <div class="detai-cont">
            <div class="cont-text">在深渊的边缘上，你守护我每一个孤独的梦---那风啊吹动草叶的喧响。太阳在远方白白地燃烧，你在水洼旁，投进自己的影子微波荡荡，沉淀了昨日的时光。 假如有一天你也不免凋残，我只有个简单的希望：保持着初放时的安祥。</div>
            <div class="cont-pic tf-row-wrap">
              <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
              <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
              <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
              <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
              <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
            </div>
          </div>
        </div>
      </div>
      <op></op>
    </div>
  </div>
</template>

<script>
import {
  NavBar
} from 'vant'
import op from '../components/op'
export default {
  components: {
    [NavBar.name]: NavBar,
    op
  },
  data () {
    return {
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

    }
  }
}
</script>

<style lang="less" scoped>
.tf-body-container{
  font-size: 28px;
  color: #333;
  background-color: #F7F7F7;
}
/deep/.van-nav-bar {
  background-color: #FFD34D;
  .van-nav-bar__right .van-icon {
    font-size: 44px;
  }
}
.header-block {
  background-color: #F7F7F7;
  padding: 38px 0 20px 50px;
  background: linear-gradient(0deg, #FEBF00 0%, #FFD34D 100%);
  position: relative;
  margin-bottom: 30px;
  .task-tit {
    font-size: 44px;
    font-weight: 500;
    color: #2A334A;
    line-height: 60px;
    width: 486px;
    margin-bottom: 10px;
  }
  .task-coin {
    height: 56px;
    line-height: 56px;
    color: #2A334A;
    margin-bottom: 30px;
    img {
      width: 36px;
      height: 36px;
      margin-right: 10px;
    }
    .coin-num {
      font-size: 40px;
      font-weight: 500;
      margin-right: 10px;
    }
    .coin-unit {
      font-size: 24px;
    }
  }
  .task-label {
    position: relative;
    z-index: 5;
    .lable-item {
      background-color: #FCD86E;
      height: 48px;
      line-height: 48px;
      border-radius: 10px;
      padding: 0 18px;
      font-size: 24px;
      color: #A46400;
      margin: 0 10px 20px 0;
    }
  }
  .header-bg {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 250px;
    height: 241px;
  }
  .task-status {
    position: absolute;
    right: 0;
    top: 38px;
    width: 140px;
    height: 64px;
    line-height: 64px;
    text-align: center;
    background: #FE8900;
    border-radius: 32px 0px 0px 32px;
    font-size: 26px;
    font-weight: 500;
    color: #FFFFFF;
    z-index: 3;
    &.bg-ccc {
      background: #CCCCCC;
    }
    &.bg-FF6555 {
      background: #FF6555;
    }
    &.bg-FEBF00 {
      background: #FEBF00;
    }
  }
}
.task-session {
  width: 710px;
  margin: 0 auto 30px;
  background-color: #fff;
  overflow: hidden;
  padding: 0 30px;
  border-radius: 10px;
  .session-tit {
    font-size: 32px;
    font-weight: 500;
    color: #000000;
    height: 100px;
    padding-top: 10px;
    line-height: 90px;
    .tit-right {
      font-size: 24px;
      color: #8F8F94;
      line-height: 90px;
      img {
        width: 36px;
        height: 36px;
        margin-left: 8px;
      }
    }
  }
}
.release-user {
  height: 80px;
  margin: 10px 0 40px;
  align-items: stretch;
  img {
    width: 80px;
    height: 100%;
    border-radius: 50%;
    margin-right: 30px;
  }
  & > div.tf-row-space-between {
    max-width: 398px;
    flex-grow: 1;
    flex-direction: column;
  }
  .release-name {
    font-weight: 500;
    color: #000000;
    line-height: 36px;
  }
  .release-time {
    font-size: 24px;
    color: #8F8F94;
    line-height: 30px;
    &.color-FF5240 {
      color: #FF5240;
    }
  }
  .finish-btn {
    width: 143px;
    text-align: center;
    height: 64px;
    line-height: 64px;
    background: #FF6555;
    border-radius: 10px;
    font-size: 24px;
    color: #FFFFFF;
    justify-content: flex-start;
    flex-shrink: 0;
  }
}
.ask-list {
  margin-bottom: 30px;
  div {
    line-height: 44px;
    font-size: 26px;
    color: #000000;
  }
}
.task-address {
  height: 128px;
  background: linear-gradient(90deg, #F7F7F7 0%, #FFFFFF 100%);
  border-radius: 10px;
  margin-bottom: 40px;
  position: relative;
  padding-left: 30px;
  div {
    position: relative;
    z-index: 5;
    line-height: 44px;
    max-width: 530px;
  }
  div:nth-child(1) {
    font-size: 26px;
    color: #000000;
  }
  div:nth-child(2) {
    font-size: 24px;
    color: #8F8F94;
  }
  img {
    position: absolute;
  }
  .address-arrow {
    right: 30px;
    top: 40px;
    width: 48px;
    height: 48px;
    z-index: 3;
  }
  .address-bg {
    right: 0;
    top: 0;
    width: 314px;
    height: 100%;
  }
}
.detai-cont {
  .cont-text {
    color: #8F8F94;
    line-height: 48px;
    font-size: 30px;
    position: relative;
    margin-bottom: 30px;
  }
  .cont-pic {
    img {
      width: 150px;
      height: 150px;
      margin: 0 16px 16px 0;
      object-fit: cover;
    }
    img:nth-child(4) {
      margin-right: 0;
    }
    margin-bottom: 24px;
  }
}
.complain-tip {
  height: 112px;
  align-items: center;
  background: #F7F7F7;
  margin: -10px 0 40px;
  padding: 0 16px 0 28px;
  font-size: 24px;
  div:nth-child(1) {
    width: 480px;
    color: #8F8F94;
  }
  div:nth-child(2) {
    width: 100px;
    height: 48px;
    text-align: center;
    line-height: 44px;
    border: 1PX solid #FF6555;
    border-radius: 10px;
    color: #FF6555;
  }
}
.progress-step {
  background: #FFF6F5;
  border-radius: 10px;
  padding: 28px 20px 28px 0;
  font-size: 24px;
  color: #8F8F94;
  margin-bottom: 40px;
  div {
    line-height: 48px;
    position: relative;
    padding-left: 60px;
    &::before {
      content: '';
      position: absolute;
      left: 30px;
      top: 19px;
      width: 10px;
      height: 10px;
      background: #8F8F94;
      border-radius: 50%;
    }
    &:first-child {
      color: #000000;
      &::before {
        background: #000000;
      }
    }
  }
}
</style>
