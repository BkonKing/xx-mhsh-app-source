<template>
  <div class="header-bg">
    <van-nav-bar
      class="entrance-nav-bar"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-zhushishuoming" @click="showInstructions"></span>
        <span class="tf-icon tf-icon-shijian" @click="goList"></span>
      </template>
    </van-nav-bar>
    <div class="select-house" @click="goAttestation">
      <div class="tf-row-vertical-center">
        <span class="tf-icon tf-icon-dingwei"></span>
        <span>{{houseName || '请选择'}}</span>
      </div>
      <span class="tf-icon tf-icon-caret-down"></span>
    </div>
    <div class="entrance-box">
      <div class="entrance-box__type" v-txAnalysis="{eventId: 25}" @click="qrOpenDoor">
        <div class="tf-icon-box" :class="{'active': active === 1}">
          <img
            v-if="active === 1"
            class="tf-icon"
            src="@/assets/imgs/entrance_erweima_active.png"
          />
          <img v-else class="tf-icon" src="@/assets/imgs/entrance_erweima.png" />
        </div>
        <div class="entrance-box__type--name">二维码开门</div>
      </div>
      <div class="entrance-box__divider"></div>
      <div class="entrance-box__type" v-txAnalysis="{eventId: 26}" @click="active = 2">
        <div class="tf-icon-box" :class="{'active': active === 2}">
          <img
            v-if="active === 2"
            class="tf-icon"
            src="@/assets/imgs/entrance_yijian_active.png"
          />
          <img v-else class="tf-icon" src="@/assets/imgs/entrance_yijian.png" />
        </div>
        <div class="entrance-box__type--name">一键开门</div>
      </div>
    </div>
    <div class="tf-row-center tf-mt-lg">
      <div v-show="active === 1" class="entrance-operation">
        <div class="entrance-operation__box">
          <div class="triangle" :class="{'triangle-left': active === 1}"></div>
          <img :src="qrImg" class="qrcode-image" @click="getQrCode" />
          <!-- <canvas id="qrcode" canvas-id="qrcode" class="qrcode-image" /> -->
        </div>
        <div class="entrance-operation__alert tf-row-center">
          <img class="img" src="@/assets/imgs/shuaxin.png" />
          <div>自动刷新（{{countDownNum}}s）</div>
        </div>
      </div>
      <div v-show="active === 2" class="entrance-operation">
        <div class="entrance-operation__box">
          <div class="triangle" :class="{'triangle-right': active === 2}"></div>
          <div class="instantly-btn" @click="ycOpenDoor">立即开门</div>
        </div>
        <div class="entrance-operation__alert">{{openDoorTime ? `已开门` : '点击即可开门'}}</div>
      </div>
    </div>
    <tf-dialog
      class="explain-dialog"
      v-model="show"
      title="使用说明"
      :showFotter="true"
      :hiddenOff="true"
      @confirm="confirmDialog"
    >
      <div class="dialog-content">
        <div class="tf-text-lg">二维码开门</div>
        <div class="tf-text-sm">智能门禁摄像头需要读到二维码信息后才能发送开幕指令给单元门门禁，正确的使用方法是将二维码对准摄像头。</div>
        <div class="tf-text-lg tf-mt-lg">一键开门</div>
        <div class="tf-text-sm">点击立即开门按钮即可远程开启单元门。</div>
        <div class="tf-text-sm tf-mt-lg">提示：请勿随意点击或给陌生人开门，否则追究法律责任。具体查看协议<router-link class="tf-text-blue" to="/agreement?type=1">《{{otherAgreement.title}}》</router-link>。</div>
      </div>
    </tf-dialog>
  </div>
</template>

<script>
import { NavBar, Toast } from 'vant'
import tfDialog from '@/components/tf-dialog/index.vue'
import { mapGetters } from 'vuex'
import { getQrCode, ycOpenDoor } from '@/api/butler.js'
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
      FNScanner: null,
      qrImg: '',
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
      ]
    }
  },
  computed: {
    ...mapGetters(['currentProject', 'otherAgreement']),
    houseName () {
      if (this.currentProject) {
        return this.currentProject.project_name + this.currentProject.fc_info
      }
      return ''
    }
  },
  created () {
    // 首次进入页面需弹窗一次使用说明
    const firstStatus = api.getPrefs({
      sync: true,
      key: 'first-entrance'
    })
    this.FNScanner = api.require('FNScanner')
    if (!firstStatus) {
      this.showInstructions()
      api.setPrefs({
        key: 'first-entrance',
        value: 1
      })
    }
    this.mtjEvent({
      eventId: 25
    })
    this.getQrCode()
  },
  methods: {
    // 二维码开门
    qrOpenDoor () {
      this.active = 1
      this.getQrCode()
    },
    // 获取二维码开门数据
    getQrCode () {
      this.timer && clearTimeout(this.timer)
      getQrCode({
        houseId: this.currentProject.house_id
      }).then((res) => {
        this.makeQRCode(res.data)
      })
    },
    /**
     * 生成二维码
     * @param {string} text 二维码内容
     */
    makeQRCode (text) {
      this.FNScanner.encodeImg(
        {
          content: text,
          saveImg: {
            path:
              'fs://mhsh' +
              Math.floor(Math.random() * 10000000000 + 1) +
              '.png',
            w: 270,
            h: 270
          }
        },
        (ret, err) => {
          if (ret.status) {
            this.countDownNum = 120
            this.qrImg = ret.imgPath
            this.refreshTimer()
          } else {
            console.error(JSON.stringify(err))
          }
        }
      )
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
      ycOpenDoor({
        houseId: this.currentProject.house_id
      }).then((res) => {
        if (res.success) {
          this.openDoorTime = true
            .toLocaleString()
            .replace(/:\d{1,2}$/, ' ')
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
    },
    goAttestation () {
      this.$router.push('/pages/personage/house/select-house')
    }
  },
  beforeDestroy () {
    this.timer && clearTimeout(this.timer)
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

  .tf-icon-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 88px;
    height: 88px;
    border-radius: 50%;
    border: 1px solid #fff;
    &.active {
      background: #fff;
    }
    .tf-icon {
      width: 44px;
      height: 44px;
    }
  }

  &--name {
    font-size: 30px;
    color: #fff;
    margin-top: 20px;
  }
}

.dialog-content {
  // max-height: 345px;
  line-height: 46px;
  font-size: 24px;
  color: #666;
  // overflow: auto;
}

.entrance-nav-bar {
  /deep/ .van-nav-bar {
    background: none;
  }
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
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 34px;
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

    .img {
      width: 36px;
      height: 36px;
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

.explain-dialog {
  /deep/ .dialog-content {
    // height: 400px;
    // overflow: auto;
    .tf-text-lg {
      color: #222;
      margin-bottom: 10px;
    }
    .tf-text-sm {
      color: #666;
    }
  }
  /deep/ .tf-dialog-footer {
    justify-content: center;
    .tf-dialog-footer__btn {
      flex: initial;
      width: 300px;
    }
  }
}
</style>
