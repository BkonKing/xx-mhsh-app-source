<template>
  <div class="schedule-list">
    <div v-for="(item, index) in listData" :key="index" class="schedule-item">
      <div
        v-if="listData.length > 1"
        class="line"
        :class="{ 'small-line': index == listData.length - 1 }"
      ></div>
      <div class="time" :class="{ 'red-point': +item.is_red }">
        <div
          v-if="item.evaluate_id > 0"
          @click="evaluate(item.evaluate_id)"
          class="mask tf-row"
        >
          <img class="img-100" src="@/assets/img/task_11.png" />
        </div>
        <div
          @click="previewPic(index)"
          v-if="item.image_url && item.image_url.length"
          class="mask tf-row"
        >
          <img class="img-100" src="@/assets/img/task_12.png" />
          <span>{{ item.image_url.length }}</span>
        </div>
        {{ item.ctime }}
      </div>
      <div class="cont tf-column">
        <div>{{ item.progress_title }}</div>
        <div v-if="item.content">{{item.content}}</div>
      </div>
    </div>
    <van-image-preview
      v-model="picShow"
      :images="images"
      :startPosition="picIndex"
    >
    </van-image-preview>
    <task-popup v-model="evaluateShow" :titName="evaluateTit">
      <div slot="content" class="evaluate-cont">
        <div class="evaluate-header tf-row-vertical-center">
          <img src="@/assets/img/task_15.png" />
          <img src="@/assets/img/task_16.png" />
          <div class="evaluate-user van-ellipsis">
            对接单方<span>{{ evaluateInfo.nickname }}</span>
          </div>
        </div>
        <div class="score-star tf-row-space-between">
          <div
            class="van-icon van-icon-star"
            v-for="(item, index) in 5"
            :key="index"
            :class="{ active: evaluateInfo.evaluate_stars > index }"
          ></div>
        </div>
        <div class="evaluate-score">{{ evaluateInfo.stars_detail }}</div>
        <div class="evaluate-label tf-row-space-between">
          <div
            v-for="(item, index) in evaluateInfo.evaluate_tags_data"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div class="evaluate-detail">
          其他补充：{{ evaluateInfo.evaluate_supplement || "无" }}
        </div>
      </div>
    </task-popup>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import { getEvaluateInfo } from '@/api/task'
import taskPopup from '../components/task-popup'
export default {
  components: {
    [ImagePreview.name]: ImagePreview,
    taskPopup
  },
  props: {
    listData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      images: [],
      evaluateTit: '评价',
      evaluateShow: false, // 评价
      evaluateInfo: {},
      picIndex: 0, // 图片预览起始位置索引
      picShow: false // 查看大图
    }
  },
  created () {},
  methods: {
    // 预览大图
    previewPic (index) {
      this.images = this.listData[index].image_url
      this.picIndex = 0
      this.picShow = true
    },
    evaluate (id) {
      const sortArr = ['非常不满意', '不满意', '一般', '比较满意', '非常满意']
      getEvaluateInfo({ evaluate_id: id }).then(res => {
        res.data.stars_detail = sortArr[res.data.evaluate_stars - 1]
        this.evaluateInfo = res.data
        this.evaluateShow = true
      })
    }
  }
}
</script>

<style lang="less" scoped>
.schedule-list {
  background: #ffffff;
  border-radius: 10px;
  margin-top: -20px;
  padding: 20px 0;
  .schedule-item {
    position: relative;
    .line {
      width: 1px;
      position: absolute;
      left: 68px;
      top: 0;
      bottom: 0;
      background-color: #8f8f94;
      &.small-line {
        height: 30px;
        bottom: auto;
      }
    }
    &:first-child {
      .line {
        top: 30px;
      }
      .time::before {
        background: #febf00;
      }
      .cont div {
        font-weight: bold;
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
    color: #8f8f94;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: 64px;
      top: 50%;
      transform: translate(0, -50%);
      width: 10px;
      height: 10px;
      background: #8f8f94;
      border-radius: 50%;
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
        background: #febf00;
        border-radius: 14px;
        text-align: center;
        line-height: 28px;
        color: #ffffff;
        font-size: 24px;
        top: -14px;
        right: -14px;
      }
    }
  }
  .red-point::before {
    background: #ff6555;
  }
  .cont {
    max-width: 660px;
    color: #000000;
    padding-left: 104px;
    word-break: break-all;
    padding-bottom: 10px;
    div {
      line-height: 44px;
    }
  }
}

.evaluate-cont {
  .evaluate-header {
    height: 283px;
    background: #febf00;
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
  }
  .evaluate-score {
    display: flex;
    justify-content: center;
    z-index: 4;
    font-size: 24px;
    line-height: 44px;
  }
  .score-star {
    width: 430px;
    height: 100px;
    background: #ffffff;
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
        color: #febf00;
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
      color: #8f8f94;
      margin-bottom: 16px;
    }
  }
  .evaluate-label div,
  .evaluate-detail {
    background: #f7f7f7;
    border-radius: 10px;
    font-size: 24px;
  }
  .evaluate-detail {
    width: 500px;
    height: 260px;
    line-height: 44px;
    margin: 0 auto 30px;
    padding: 20px 30px;
    overflow-y: auto;
  }
}
</style>
