<template>
  <div class="tf-timeline">
    <div class="tf-timeline__column">
      <div class="tf-timeline__column-text-container">
        <div
          v-for="(item,index) in options"
          :key="index"
          class="tf-timeline__column-text-box"
          :class="{'tf-timeline__column-text-grey': index>active}"
        >
          <div class="tf-timeline__column-time">{{item.ctime}}</div>
          <div v-if="item.remark" class="tf-timeline__column-desc">{{item.remark}}</div>
          <div class="tf-timeline__column-desc" v-else>
            <span>{{item.designee}}</span>
            <span class="tf-text-blue" @click="makePhoneCall(item.mobile)">{{item.mobile}}</span>
          </div>
        </div>
      </div>
      <div class="tf-timeline__column-container">
        <div
          class="tf-timeline__column-line-item"
          v-for="(item,index) in options"
          :key="index"
        >
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
      </div>
    </div>
  </div>
</template>

<script>
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

.tf-timeline__column-container {
  /* #ifndef APP-NVUE */
  display: inline-flex;
  /* #endif */
  width: 30px;
  flex-direction: column;
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
  flex: 1;
  align-items: center;
  justify-content: center;
}

.tf-timeline__row-line {
  flex: 1;
  height: 1px;
  background-color: @gray-7;
}

.tf-timeline__column-line {
  width: 1px;
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
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: @gray-6;
  margin: 4px 0px 5px 0px;
}

.tf-timeline__row-check {
  margin: 0px 6px;
}

.tf-timeline__column-check {
  width: 16px;
  height: 16px;
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
</style>
