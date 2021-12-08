<template>
  <div class="coupon-item">
    <div
      class="coupon-card"
      :class="{ 'coupon-card-expanded': expanded }"
      @click="expanded = !expanded"
    >
      <div class="coupon-money"><span>￥</span>10</div>
      <div class="coupon-info">
        <div class="coupon-info-1">发行1000张，领取0张，使用0张</div>
        <div class="coupon-info-2">满100减10</div>
        <div class="coupon-info-3">
          <img
            class="coupon-img-sm"
            src="@/assets/personage/shop/time.png"
            alt=""
          /><span>3天有效</span>
        </div>
      </div>
      <i
        class="van-icon van-icon-arrow"
        :class="{ 'van-icon-arrow--expanded': expanded }"
      ></i>
      <div class="coupon-tag" :class="[statusClass]">
        {{ data.status | statusText }}
      </div>
    </div>
    <div class="coupon-panel" :class="{ 'coupon-panel-expanded': expanded }">
      <div class="group-box">
        <div class="group-item">
          <div class="group-num">990</div>
          <div class="group-text">剩余张数</div>
        </div>
        <div class="group-item">
          <div class="group-num">1</div>
          <div class="group-text">累计领取张数</div>
        </div>
        <div class="group-item">
          <div class="group-num">3</div>
          <div class="group-text">累计使用张数</div>
        </div>
        <div class="group-item">
          <div class="group-num">30%</div>
          <div class="group-text">累计使用率</div>
        </div>
      </div>
      <div class="coupon-btn-box">
        <div v-if="isUnpublished" class="coupon-btn" @click="emit('publish')">
          <img
            class="coupon-img"
            src="@/assets/personage/shop/publish.png"
            alt=""
          />
          <span>发布</span>
        </div>
        <div v-if="isReceive" class="coupon-btn" @click="emit('finish')">
          <img
            class="coupon-img"
            src="@/assets/personage/shop/finish.png"
            alt=""
          />
          <span>结束</span>
        </div>
        <div
          v-if="isUnpublished || isReceive"
          class="coupon-btn"
          @click="emit('revise')"
        >
          <img
            class="coupon-img"
            src="@/assets/personage/shop/edit.png"
            alt=""
          />
          <span>修改</span>
        </div>
        <div v-if="isFinish" class="coupon-btn">
          <img
            class="coupon-img"
            src="@/assets/personage/shop/copy.png"
            alt=""
          />
          <span>复制</span>
        </div>
        <div v-if="isFinish" class="coupon-btn">
          <img
            class="coupon-img"
            src="@/assets/personage/shop/look.png"
            alt=""
          />
          <span>查看</span>
        </div>
        <div
          v-if="isUnpublished || isFinish"
          class="coupon-btn"
          @click="emit('delete')"
        >
          <img
            class="coupon-img"
            src="@/assets/personage/shop/delete.png"
            alt=""
          />
          <span>删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CouponItem',
  props: {
    data: {
      type: Object,
      default: () => ({
        status: 1
      })
    }
  },
  data () {
    return {
      expanded: false
    }
  },
  computed: {
    isUnpublished () {
      return this.data.status === 1
    },
    isReceive () {
      return this.data.status === 2
    },
    isFinish () {
      return this.data.status === 3
    },
    statusClass () {
      const className = {
        1: 'coupon-tag-un',
        2: 'coupon-tag-ing',
        3: 'coupon-tag-end'
      }
      return className[this.data.status]
    }
  },
  filters: {
    statusText: function (value) {
      const text = {
        1: '未发布',
        2: '领取中',
        3: '已结束'
      }
      return text[value]
    }
  },
  methods: {
    emit (key) {
      this.$emit(key)
    }
  }
}
</script>

<style lang="less" scoped>
* {
  line-height: 1;
}
.coupon-card {
  display: flex;
  align-items: center;
  width: 710px;
  height: 202px;
  position: relative;
  background: #ffffff;
  border-radius: 10px;
  .coupon-money {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 136px;
    position: relative;
    font-size: 40px;
    font-weight: bold;
    color: #222222;
    &::after {
      content: "";
      position: absolute;
      right: 0;
      width: 1px;
      height: 72px;
      background: #eeeeee;
    }
    span {
      font-size: 24px;
    }
  }
  .coupon-info {
    flex: 1;
    padding: 45px 20px 45px 40px;
    &-1 {
      margin-bottom: 20px;
      font-size: 26px;
      color: #222222;
    }
    &-2 {
      margin-bottom: 20px;
      font-size: 24px;
      color: #8f8f94;
    }
    &-3 {
      display: flex;
      font-size: 24px;
      color: #8f8f94;
    }
    .coupon-img-sm {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
  }
  .van-icon-arrow {
    margin-right: 30px;
    margin-left: 30px;
    &::before {
      transform: rotate(90deg) translateZ(0);
      transition: transform 0.3s;
    }
    &--expanded::before {
      transform: rotate(-90deg);
    }
  }
  .coupon-tag {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px 0px 10px 0px;
    font-size: 24px;
    color: #ffffff;
  }
  .coupon-tag-ing {
    background: linear-gradient(90deg, #febf00 0%, #ffdc72 100%);
  }
  .coupon-tag-un {
    background: linear-gradient(90deg, #ff6555 0%, #ff8d81 100%);
  }
  .coupon-tag-end {
    background: linear-gradient(90deg, #c5ccd0 0%, #e6eaed 100%);
  }
}
.coupon-card-expanded {
  border-radius: 10px 10px 0px 0px;
}
.coupon-panel {
  width: 710px;
  height: 0;
  background: #ffffff;
  border-radius: 0px 0px 10px 10px;
  transition: height 0.3s ease-in-out;
  .group-box {
    display: flex;
    width: 100%;
    height: 176px;
    padding: 55px 0;
    background: linear-gradient(0deg, #ffffff 0%, #f9f9f9 100%);
    background-size: 100% 40px;
    background-repeat: no-repeat;
    .group-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .group-num {
      margin-bottom: 20px;
      font-size: 30px;
      font-weight: bold;
      color: #222222;
    }
    .group-text {
      font-size: 24px;
      color: #8f8f94;
    }
  }
  .coupon-btn-box {
    display: flex;
    width: 650px;
    height: 80px;
    margin: 0 30px;
    background: #f7f7f7;
    border-radius: 10px;
    .coupon-btn {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      + .coupon-btn::before {
        content: "";
        width: 1px;
        height: 32px;
        position: absolute;
        left: 0;
        top: 24px;
        background: #dddddd;
      }
      span {
        font-size: 24px;
      }
    }
  }
  .coupon-img {
    width: 28px;
    height: 28px;
    margin-right: 20px;
  }
}
.coupon-panel-expanded {
  height: 286px;
}
</style>
