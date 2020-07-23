<template>
  <div class="tf-timeline">
    <div :class="[direction==='column'?'tf-timeline__column':'tf-timeline__row']">
      <div
        :class="[direction==='column'?'tf-timeline__column-text-container':'tf-timeline__row-text-container']"
      >
        <div class="tf-timeline__column-text-box" v-for="(item,index) in options" :key="index">
          <div
            :class="[direction==='column'?'tf-timeline__column-time':'tf-timeline__row-time']"
          >{{item.ctime}}</div>
          <div
            v-if="item.remark"
            :class="[direction==='column'?'tf-timeline__column-desc':'tf-timeline__row-desc']"
          >{{item.remark}}</div>
          <template v-else>
            <span
              :class="[direction==='column'?'tf-timeline__column-desc':'tf-timeline__row-desc']"
            >{{item.designee}}</span>
            <span
              :class="[direction==='column'?'tf-timeline__column-desc':'tf-timeline__row-desc', 'phone-number']"
              @click="makePhoneCall(item.mobile)"
            >{{item.mobile}}</span>
          </template>
        </div>
      </div>
      <div
        :class="[direction==='column'?'tf-timeline__column-container':'tf-timeline__row-container']"
      >
        <div
          :class="[direction==='column'?'tf-timeline__column-line-item':'tf-timeline__row-line-item']"
          v-for="(item,index) in options"
          :key="index"
        >
          <div
            :class="[direction==='column'?'tf-timeline__column-line':'tf-timeline__row-line',direction==='column'?'tf-timeline__column-line--before':'tf-timeline__row-line--before']"
            :style="{backgroundColor:index<=active&&index!==0?activeColor:index===0?'transparent':deactiveColor}"
          ></div>
          <div
            :class="[direction==='column'?'tf-timeline__column-check':'tf-timeline__row-check']"
            :style="{'background-color':index===active?activeColor:deactiveColor}"
            v-if="index === active"
          ></div>
          <div
            :class="[direction==='column'?'tf-timeline__column-circle':'tf-timeline__row-circle']"
            v-else
            :style="{backgroundColor:index<active?activeColor:deactiveColor}"
          ></div>
          <div
            :class="[direction==='column'?'tf-timeline__column-line':'tf-timeline__row-line',direction==='column'?'tf-timeline__column-line--after':'tf-timeline__row-line--after']"
            :style="{backgroundColor:index<active&&index!==options.length-1?activeColor:index===options.length-1?'transparent':deactiveColor}"
          ></div>
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
    return {}
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
  line-height: 18px;
  color: @gray-7;
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
  line-height: 46px;
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
  background-color: @gray-7;
  margin: 0px 3px;
}

.tf-timeline__column-circle {
  width: 5px;
  height: 5px;
  border-radius: 100px;
  background-color: @gray-7;
  margin: 4px 0px 5px 0px;
}

.tf-timeline__row-check {
  margin: 0px 6px;
}

.tf-timeline__column-check {
  width: 16px;
  height: 16px;
  line-height: 14px;
  border-radius: 50%;
  margin: 2px 0px;
}
.tf-timeline__column-text-box {
  padding: 6px 8px 60px;
  flex: 1;
}
.phone-number {
  color: @blue-dark !important;
}
</style>
