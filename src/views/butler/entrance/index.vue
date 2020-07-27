<template>
  <div class="header-bg">
    <van-nav-bar
      class="entrance-nav-bar"
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
      style="background: none;"
    >
      <template #right>
        <span class="tf-icon" @click="showInstructions">&#xe78c;</span>
        <span class="tf-icon" @click="goList">&#xe791;</span>
      </template>
    </van-nav-bar>
    <div class="select-house">
      <div class="tf-row-vertical-center">
        <span class="tf-icon tf-icon-location"></span>
        <span>焦作征云美好生活家园 5栋2单元1001</span>
      </div>
      <span class="tf-icon tf-icon-caret-down"></span>
    </div>
    <div class="entrance-box">
      <div class="entrance-box__type" :class="{'active': active === 1}" @click="qrOpenDoor">
        <div class="tf-icon">&#xe82f;</div>
        <div class="entrance-box__type--name">二维码开门</div>
      </div>
      <div class="entrance-box__divider"></div>
      <div class="entrance-box__type" :class="{'active': active === 2}" @click="active = 2">
        <div class="tf-icon">&#xe912;</div>
        <div class="entrance-box__type--name">一键开门</div>
      </div>
    </div>
    <div class="tf-row-center tf-mt-lg">
      <div v-show="active === 1" class="entrance-operation" @click="getQrCode">
        <div class="entrance-operation__box">
          <div class="triangle" :class="{'triangle-left': active === 1}"></div>
          <canvas id="qrcode" canvas-id="qrcode" class="qrcode-image" />
        </div>
        <div class="entrance-operation__alert tf-row-center">
          <div class="tf-icon">&#xe79a;</div>
          <div>自动刷新（{{countDownNum}}s）</div>
        </div>
      </div>
      <div v-show="active === 2" class="entrance-operation">
        <div class="entrance-operation__box">
          <div class="triangle" :class="{'triangle-right': active === 2}"></div>
          <div class="instantly-btn" @click="ycOpenDoor">立即开门</div>
        </div>
        <div class="entrance-operation__alert">{{openDoorTime ? `${openDoorTime}已开门` : '点击即可开门'}}</div>
      </div>
    </div>
    <tf-dialog
      v-model="show"
      title="使用说明"
      :showFotter="true"
      :hiddenOff="true"
      @confirm="confirmDialog"
    >
      <div scroll-y="true">
        <div class="dialog-content">{{instructionContent}}</div>
      </div>
    </tf-dialog>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import tfDialog from '@/components/tf-dialog/index.vue'
import { getQrCode, ycOpenDoor } from '@/api/butler/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    tfDialog
  },
  data () {
    return {
      show: false,
      countDownNum: 120,
      timer: null,
      active: 1,
      openDoorTime: '',
      options: [
        {
          text: 'item1',
          value: 0
        },
        {
          text: 'item2',
          value: 1
        },
        {
          text: 'item3',
          value: 2
        }
      ],
      // 使用说明
      instructionContent:
        '说明书，是以应用文体的方式对某事或物来进行相对的详细描述，方便人们认识和了解某事或物。说明书要实事求是，有一说一、有二说二，不可为达到某种目的而夸大产品作用和性能。说明书要全面的说明事物，不仅介绍其优点，同时还要清楚地说明应注意的事项和可能产生的问题。产品说明书、使用说明书、安装说明书一般采用说明性文字，而戏剧演出类说明书则可以以记叙、抒情为主。说明书可根据情况需要，使用图片、图表等多样的形式，以期达到最好的说明效果。'
    }
  },
  created () {
    // 首次进入页面需弹窗一次使用说明
    const firstStatus = api.getGlobalData({
      key: 'first-entrance'
    })
    if (!firstStatus) {
      this.showInstructions()
      api.setGlobalData({
        key: 'first-entrance',
        value: 1
      })
    }
  },
  mounted () {
    // const query = uni.createSelectorQuery().in(this)
    // query
    //   .select('.entrance-operation__box')
    //   .boundingClientRect(data => {
    //     this.qrHeight = data.height - 60
    //   })
    //   .exec()
    // setTimeout(() => {
    //   this.getQrCode()
    // }, 100)
  },
  methods: {
    // 二维码开门
    qrOpenDoor () {
      this.active = 1
      this.getQrCode()
    },
    // 获取二维码开门数据
    getQrCode () {
      // getQrCode().then({
      // if (res.success) {
      this.makeQRCode('qgEkdpVHKbbEXcW3C6SDxfK5bjrJo+Uv6ltvQR0GBYce6Uen')
      // }
      // })
    },
    /**
     * 生成二维码
     * @param {string} text 二维码内容
     */
    makeQRCode (text) {
      uQRCode.make({
        canvasId: 'qrcode',
        // componentInstance: this,
        text,
        size: this.qrHeight,
        margin: 10,
        backgroundColor: '#ffffff',
        foregroundColor: '#000000',
        fileType: 'jpg',
        correctLevel: uQRCode.defaults.correctLevel,
        success: (res) => {
          // 生成成功后开启自动刷新
          this.countDownNum = 120
          this.timer && clearTimeout(this.timer)
          this.refreshTimer()
        }
      })
    },
    // 自动刷新
    refreshTimer () {
      this.timer = setTimeout(() => {
        if (this.countDownNum === 0) {
          this.getQrCode()
          return
        }
        this.countDownNum--
        this.refreshTimer()
      }, 1000)
    },
    // 立即开门，开门成功后显示开门时间
    ycOpenDoor () {
      ycOpenDoor().then((res) => {
        if (res.success) {
          this.openDoorTime = res
        }
      })
    },
    // 使用说明弹窗
    showInstructions () {
      this.show = true
    },
    // 使用说明确认按钮
    confirmDialog () {
      this.show = false
    },
    goList () {
      this.$router.push('/pages/butler/entrance/list')
    }
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}

.header-bg {
  background: linear-gradient(to bottom, @red, @red-dark);
  background-size: 100% 670px;
  background-repeat: no-repeat;
  padding-top: 88px;
}

.tf-select {
  width: 100%;
  padding: 0 50px;
  margin: 50px 0;
}

.entrance-box {
  @flex();
  justify-content: space-around;
  padding: 0 105px;

  &__divider {
    width: 1px;
    height: 70px;
    background: #fff;
    border-radius: 1px;
    margin-top: 35px;
  }
}

.entrance-operation__box {
  position: relative;
  margin-top: 30px;
  .triangle {
    position: absolute;
    top: -60px;
    .triangle(30px, 30px, #fff);
  }
  .triangle-left {
    left: 90px;
  }
  .triangle-right {
    right: 90px;
  }
}

.entrance-box__type {
  @flex();
  flex-direction: column;
  align-items: center;

  .tf-icon {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    border: 1px solid #fff;
    text-align: center;
    line-height: 88px;
    font-size: 66px;
    color: #fff;
  }

  &--name {
    font-size: 30px;
    color: #fff;
    margin-top: 20px;
  }

  &.active {
    .tf-icon {
      background: #fff;
      color: @red-dark;
    }
  }
}

.dialog-content {
  margin: 60px 0;
  // max-height: 345px;
  line-height: 46px;
  font-size: 24px;
  color: #666;
  // overflow: auto;
}

.entrance-nav-bar {
  .tf-icon {
    color: #fff;
    font-size: 44px;
    margin-left: 20px;
  }
  /deep/ .van-icon {
    color: #fff;
  }
}

.entrance-operation {
  &__box {
    display: flex;
    width: 540px;
    height: 540px;
    padding: 30px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(235, 88, 65, 0.3);
    justify-content: center;
    align-items: center;

    .qrcode-image {
      width: 100%;
      height: 100%;
    }

    .instantly-btn {
      width: 300px;
      height: 300px;
      line-height: 280px;
      text-align: center;
      color: #fff;
      font-weight: bold;
      background-image: linear-gradient(to bottom right, @orange, @orange-dark);
      border: 10px solid #ffe6a2;
      border-radius: 50%;
    }
  }

  .entrance-operation__alert {
    font-size: @font-size-md;
    color: @gray-7;
    text-align: center;
    margin-top: 88px;

    .tf-icon {
      font-size: 36px;
      margin-right: @padding-md;
    }
  }
}

.select-house {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 650px;
  height: 66px;
  margin: 58px auto;
  padding: 0 30px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 33px;
  span {
    font-size: 28px;
    color: #fff;
    margin-right: 10px;
  }
  .tf-icon {
    font-size: 34px;
  }
}
</style>
