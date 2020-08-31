<template>
  <div class="tf-timeline">
    <div class="tf-timeline__column">
      <div class="tf-timeline__column-text-container">
        <div class="tf-flex" v-for="(item,index) in options" :key="index">
          <div class="tf-timeline__column-line-item">
            <div
              class="tf-timeline__column-line tf-timeline__column-line--before"
              :style="{backgroundColor:index<=active&&index!==0?activeColor:index===0?'transparent':deactiveColor}"
            ></div>
            <div
              class="tf-timeline__column-check"
              :style="{'background-color':index===active?activeColor:deactiveColor}"
              v-if="index === active"
            ></div>
            <div
              class="tf-timeline__column-circle"
              v-else
              :style="{backgroundColor:index<active?activeColor:deactiveColor}"
            ></div>
            <div class="tf-timeline__column-line tf-timeline__column-line--after"></div>
          </div>
          <div
            class="tf-timeline__column-text-box"
            :class="{'tf-timeline__column-text-grey': index>active}"
          >
            <div class="tf-timeline__column-time">{{item.ctime}}</div>
            <!-- 撤销提报 -->
            <div class="tf-timeline__column-desc">
              <template v-if="item.sub_status == 3">
                {{item.remark}}
                <span
                  class="tf-text-blue"
                  @click="makePhoneCall(item.mobile)"
                >{{item.mobile}}</span>
              </template>
              <template v-else-if="item.sub_status == 6">
                <div>
                  {{item.sub_realname}}：
                  <span v-html="item.remark"></span>
                  <template v-if="item.mobile">
                    <span class="tf-text-blue" @click="makePhoneCall(item.mobile)">{{item.mobile}}</span>
                    <div
                      class="tf-icon tf-icon-xiangmuwancheng transaction-btn"
                      @click="$emit('negotiate', item)"
                    ></div>
                  </template>
                </div>
              </template>
              <template v-else-if="item.sub_status == 7">
                <div v-html="item.remark"></div>
                <div v-if="item.refuse_reason">拒绝原因：{{item.refuse_reason}}</div>
                <div>
                  处理人员：
                  <span class="tf-text-blue" @click="makePhoneCall(item.mobile)">{{item.designee}} {{item.mobile}}</span>
                </div>
                <div
                  class="tf-icon tf-icon-xiangmuwancheng transaction-btn"
                  @click="$emit('negotiate', item)"
                ></div>
              </template>
              <template v-else-if="item.sub_status == 10">
                {{item.remark}}
                <!-- 评价信息 -->
                <div
                  v-if="evaluateBtn"
                  class="tf-icon tf-icon-pingfenwancheng transaction-btn"
                  @click="$emit('evaluate', item)"
                ></div>
              </template>
              <template v-else-if="parseInt(item.sub_status) > 7 && parseInt(item.sub_status) < 12">
                {{item.remark}}
                <!-- 图片信息 -->
                <div
                  v-if="item.images.length"
                  class="tf-icon tf-icon-tupian transaction-btn"
                  @click="showImage(item.images)"
                >
                  <span class="van-info">{{item.images.length}}</span>
                </div>
              </template>
              <template v-else>
                {{item.remark}}
                <div v-if="item.refuse_reason">取消说明：{{item.refuse_reason}}</div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
export default {
  name: 'tfTimeline',
  props: {
    direction: {
      // 排列方向 row column
      type: String,
      default: 'column'
    },
    activeColor: {
      // 激活状态颜色
      type: String,
      default: '#EB5841'
    },
    deactiveColor: {
      // 未激活状态颜色
      type: String,
      default: '#aaa'
    },
    active: {
      // 当前步骤
      type: Number,
      default: 0
    },
    evaluateBtn: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default () {
        return []
      }
    } // 数据
  },
  data () {
    return {
      // optionsReverse: []
    }
  },
  watch: {
    options (value) {
      // const data = JSON.parse(JSON.stringify(value))
      // this.optionsReverse = data.reverse()
    }
  },
  methods: {
    makePhoneCall (phoneNumber) {
      api.call({
        type: 'tel_prompt',
        number: phoneNumber
      })
    },
    showImage (images) {
      ImagePreview({
        images,
        startPosition: 0,
        onClose () {
          // do something
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tf-timeline {
  /* #ifndef APP-NVUE */
  display: flex;
  width: 100%;
  /* #endif */
  /* #ifdef APP-NVUE */
  // flex: 1;
  /* #endif */
  flex-direction: column;
}

.tf-timeline__row {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
}

.tf-timeline__column {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row-reverse;
}

.tf-timeline__row-text-container {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
}

.tf-timeline__column-text-container {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  flex: 1;
}

.tf-timeline__row-time {
  font-size: @font-size-md;
  line-height: 16px;
  text-align: center;
}

.tf-timeline__column-time {
  font-size: 24px;
  text-align: left;
  line-height: 1;
  color: @gray-7;
  margin-bottom: 20px;
}

.tf-timeline__row-desc {
  font-size: 12px;
  line-height: 14px;
  text-align: center;
}

.tf-timeline__column-desc {
  position: relative;
  font-size: 30px;
  text-align: left;
  color: @text-color;
  line-height: 1;
  > span {
    line-height: 1;
  }
}

.tf-timeline__row-container {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
}

.tf-timeline__row-line-item {
  /* #ifndef APP-NVUE */
  display: inline-flex;
  /* #endif */
  flex-direction: row;
  flex: 1;
  height: 14px;
  line-height: 14px;
  align-items: center;
  justify-content: center;
}

.tf-timeline__column-line-item {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  // flex: 1;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
}

.tf-timeline__row-line {
  flex: 1;
  height: 1px;
  background-color: @gray-7;
}

.tf-timeline__column-line {
  width: 2px;
  background-color: @gray-7;
}

.tf-timeline__row-line--after {
  transform: translateX(1px);
}

.tf-timeline__column-line--after {
  flex: 1;
  transform: translate(0px, 1px);
}

.tf-timeline__row-line--before {
  transform: translateX(-1px);
}

.tf-timeline__column-line--before {
  height: 6px;
  transform: translate(0px, -1px);
}

.tf-timeline__row-circle {
  width: 5px;
  height: 5px;
  border-radius: 100px;
  background-color: @gray-6;
  margin: 0px 3px;
}

.tf-timeline__column-circle {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: @gray-6;
  margin: 4px 0px 5px 0px;
}

.tf-timeline__row-check {
  margin: 0px 6px;
}

.tf-timeline__column-check {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin: 2px 0px;
}
.tf-timeline__column-text-box {
  padding: 6px 8px 60px;
  flex: 1;
}
.tf-timeline__column-text-grey {
  .tf-timeline__column-desc {
    color: @gray-7;
  }
}
.phone-number {
  color: @blue-dark !important;
}
.transaction-btn {
  position: absolute;
  top: -40px;
  right: 0;
  width: 88px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #383838;
  border-radius: 50%;
  color: #383838;
  font-size: 55px;
  background: #fff;
  .van-info {
    background: #383838;
  }
}
</style>
