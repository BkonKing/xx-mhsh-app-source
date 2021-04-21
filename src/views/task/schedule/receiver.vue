<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar
      title="任务进度"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <div class="tel-btn"><img src="@/assets/img/task_10.png" /></div>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <div class="release-header">
        <div class="release-user tf-row">
          <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
          <div class="tf-row-space-between">
            <div class="release-name van-ellipsis">美好生活物业</div>
            <!-- <div class="release-time color-FF5240">进行中</div> -->
            <div class="release-time color-ccc">进行中</div>
          </div>
          <div class="finish-btn">查看任务</div>
        </div>
      </div>
      <div class="schedule-list">
        <div class="schedule-item">
          <div class="line"></div>
          <div class="time">
            <div class="mask tf-row"><img class="img-100" src="@/assets/img/task_11.png" /></div>
            2021-03-01 12:00:00
          </div>
          <div class="cont tf-column">
            <div>接单方放弃任务</div>
            <div>放弃说明：接单方放弃任务放弃说明</div>
          </div>
        </div>
        <div class="schedule-item">
          <div class="line"></div>
          <div class="time">2021-03-01 12:00:00</div>
          <div class="cont tf-column">
            <div>接单方放弃任务</div>
          </div>
        </div>
        <div class="schedule-item">
          <div class="line"></div>
          <div class="time">
            <div class="mask tf-row"><span>2</span><img class="img-100" src="@/assets/img/task_12.png" /></div>
            2021-03-01 12:00:00
          </div>
          <div class="cont tf-column">
            <div>接单方放弃任务</div>
          </div>
        </div>
      </div>
      <op></op>
    </div>
    <task-popup v-model="endShow" :titName="endTit" :subTitName="endSubTit">
      <div slot="content" class="popup-cont end-cont">
        <div class="form-label">取消原因<span>*</span></div>
        <div class="select-block tf-row">
          <div class="popup-select tf-row-space-between">
            请选择
            <img src="@/assets/img/task_09.png" />
          </div>
        </div>
        <div class="form-label">补充说明</div>
        <graphic
          phTxt="请输入"
          :maxNum="200"
          @getForm="getForm"
        ></graphic>
        <div class="task-btn">确定</div>
      </div>
    </task-popup>
    <task-popup v-model="evaluateShow" :titName="evaluateTit">
      <div slot="content" class="evaluate-cont">
        <div class="evaluate-header tf-row-vertical-center">
          <img src="@/assets/img/task_15.png" />
          <img src="@/assets/img/task_16.png" />
          <div class="evaluate-user van-ellipsis">对接单方<span>旅途</span></div>
          <div class="evaluate-score">一般</div>
        </div>
        <div class="score-star tf-row-space-between">
          <div class="van-icon van-icon-star active"></div>
          <div class="van-icon van-icon-star active"></div>
          <div class="van-icon van-icon-star active"></div>
          <div class="van-icon van-icon-star"></div>
          <div class="van-icon van-icon-star"></div>
        </div>
        <div class="evaluate-label tf-row-space-between">
          <div>专业</div>
          <div>专业</div>
          <div>专业</div>
        </div>
        <div class="evaluate-cont">其他补充：噢噢噢噢噢噢噢噢哦哦哦哦哦哦哦哦哦</div>
      </div>
    </task-popup>
  </div>
</template>

<script>
import {
  NavBar
} from 'vant'
import op from '../components/op'
import taskPopup from '../components/task-popup'
import graphic from '../components/graphic'
export default {
  components: {
    [NavBar.name]: NavBar,
    op,
    taskPopup,
    graphic
  },
  data () {
    return {
      endShow: false, // 淘汰弹窗
      endTit: '放弃任务', // 淘汰标题
      endSubTit: '请先与对方沟通协商', // 淘汰标题
      evaluateShow: true, // 评价
      evaluateTit: '评价'
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
  padding: 30px 20px;
  font-size: 28px;
  color: #333;
  background-color: #F7F7F7;
}
/deep/ .van-nav-bar__right {
  padding: 0;
  .tel-btn {
    padding: 16px 20px;
    display: flex;
    img {
      width: 36px;
      height: 36px;
    }
  }
}
.release-header {
  height: 160px;
  background: linear-gradient(90deg, #FFD34D 0%, #FEBF00 100%);
  border-radius: 10px 10px 0 0;
  padding: 30px;
}
.release-user {
  height: 80px;
  align-items: center;
  color: #000000;
  img {
    width: 80px;
    height: 100%;
    border-radius: 50%;
    margin-right: 30px;
  }
  & > div.tf-row-space-between {
    max-width: 398px;
    height: 100%;
    flex-grow: 1;
    flex-direction: column;
  }
  .release-name {
    font-weight: 500;
    line-height: 36px;
  }
  .release-time {
    font-size: 24px;
    line-height: 30px;
    &.color-FF5240 {
      color: #FF5240;
    }
    &.color-ccc {
      opacity: 0.6;
    }
  }
  .finish-btn {
    width: 168px;
    height: 56px;
    background: #FFF6BA;
    border-radius: 28px;
    text-align: center;
    line-height: 56px;
    font-size: 24px;
    color: #816100;
    flex-shrink: 0;
  }
}
.schedule-list {
  background: #FFFFFF;
  border-radius: 10px;
  margin-top: -20px;
  padding: 20px 0;
  .schedule-item {
    position: relative;
    .line {
      width: 1PX;
      position: absolute;
      left: 68px;
      top: 0;
      bottom: 0;
      background-color: #8F8F94;
    }
    &:first-child {
      .line {
        top: 30px;
      }
    }
    &:last-child {
      .line {
        height: 30px;
        bottom: auto;
      }
    }
  }
  .time {
    height: 60px;
    line-height: 60px;
    padding-left: 104px;
    font-size: 24px;
    color: #8F8F94;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 64px;
      top: 50%;
      transform: translate(0, -50%);
      width: 10px;
      height: 10px;
      background: #8F8F94;
      border-radius: 50%
    }
    .mask {
      position: absolute;
      width: 36px;
      height: 36px;
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translate(0, -50%);
      span {
        position: absolute;
        width: 28px;
        height: 28px;
        background: #FEBF00;
        border-radius: 14px;
        text-align: center;
        line-height: 28px;
        color: #FFFFFF;
        font-size: 24px;
        top: -14px;
        right: -14px;
      }
    }
  }
  .cont {
    max-width: 586px;
    color: #000000;
    padding-left: 104px;
    word-break: break-all;
    padding-bottom: 10px;
    div {
      line-height: 44px;
    }
  }
}

.end-cont {
  .select-block {
    margin: 0;
    .popup-select {
      width: 180px;
      height: 80px;
      border: 1PX solid #CCCCCC;
      border-radius: 10px;
      color: #8F8F94;
      padding-left: 20px;
      line-height: 76px;
      align-items: center;
      flex: 1;
      img {
        width: 36px;
        height: 36px;
        margin-right: 18px;
      }
    }
  }
  /deep/.task-card {
    width: 100%;
    margin-bottom: 10px;
    .text-block {
      width: 500px;
      min-height: 260px;
      border: 1PX solid #CCCCCC;
      border-radius: 10px;
      margin-bottom: 30px;
      overflow: hidden;
      textarea {
        min-height: 200px;
      }
    }
    .van-cell {
      height: 210px;
      padding: 16px 20px 0 30px;
    }
    .text-num {
      margin-bottom: 0;
      padding-right: 20px;
    }
    .divider-line {
      display: none;
    }
    .pic-block {
      padding-left: 0;
      padding-bottom: 0;
      .van-uploader__upload,
      .van-uploader__preview {
        width: 112px;
        height: 112px;
        margin: 0 16px 20px 0;
      }
    }
  }
}
.evaluate-cont {
  .evaluate-header {
    height: 283px;
    background: #FEBF00;
    margin-top: -106px;
    position: relative;
    flex-direction: column;
    img {
      position: absolute;
    }
    img:nth-child(1) {
      width: 133px;
      height: 135px;
      top: 0;
      right: 0;
    }
    img:nth-child(2) {
      width: 156px;
      height: 167px;
      left: 0;
      bottom: 0;
    }
    .evaluate-user {
      z-index: 4;
      font-size: 28px;
      line-height: 44px;
      margin: 116px 0 10px 0;
      max-width: 100%;
      span {
        font-weight: bold;
        padding-left: 20px;
      }
    }
    .evaluate-score {
      z-index: 4;
      font-size: 24px;
      line-height: 44px;
    }
  }
  .score-star {
    width: 430px;
    height: 100px;
    background: #FFFFFF;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.05);
    border-radius: 50px;
    margin: -50px auto 50px;
    position: relative;
    z-index: 15;
    align-items: center;
    padding: 0 60px;
    div {
      font-size: 40px;
      color: #ccc;
      &.active {
        color: #FEBF00;
      }
    }
  }
  .evaluate-label {
    flex-wrap: wrap;
    margin: 0 30px 14px;
    div {
      width: 240px;
      height: 64px;
      line-height: 64px;
      text-align: center;
      color: #8F8F94;
      margin-bottom: 16px;
    }
  }
  .evaluate-label div,.evaluate-cont {
    background: #F7F7F7;
    border-radius: 10px;
    font-size: 24px;
  }
  .evaluate-cont {
    width: 500px;
    height: 260px;
    line-height: 44px;
    margin: 0 auto 30px;
    padding: 20px 30px;
  }
}
</style>
