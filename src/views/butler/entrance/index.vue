<template>
	<view>
		<view class="header-bg"></view>
		<tf-select class="tf-select" :options="options"></tf-select>
		<view class="entrance-box">
			<view class="entrance-box__type" :class="{'active': active === 1}" @click="qrOpenDoor">
				<text class="tf-icon">&#xe82f;</text>
				<text class="entrance-box__type--name">二维码开门</text>
			</view>
			<view class="entrance-box__divider"></view>
			<view class="entrance-box__type" :class="{'active': active === 2}" @click="active = 2">
				<text class="tf-icon">&#xe912;</text>
				<text class="entrance-box__type--name">一键开门</text>
			</view>
		</view>
		<view class="tf-row-center tf-mt-lg">
			<view v-show="active === 1" class="entrance-operation" @click="getQrCode">
				<view class="entrance-operation__box">
					<canvas id="qrcode" canvas-id="qrcode" class="qrcode-image" />
				</view>
				<view class="entrance-operation__alert tf-row-center">
					<text class="tf-icon">&#xe79a;</text>
					<text>自动刷新（{{countDownNum}}s）</text>
				</view>
			</view>
			<view v-show="active === 2" class="entrance-operation">
				<view class="entrance-operation__box">
					<view class="instantly-btn" @click="ycOpenDoor">立即开门</view>
				</view>
				<view class="entrance-operation__alert">{{openDoorTime ? `${openDoorTime}已开门` : '点击即可开门'}}</view>
			</view>
		</view>
		<tf-dialog ref="dialog" title="使用说明" :showFotter="true" :hiddenOff="true" @confirm="confirmDialog">
			<scroll-view scroll-y="true" >
				<text class="dialog-content">{{instructionContent}}</text>
			</scroll-view>
		</tf-dialog>
	</view>
</template>

<script>
import tfSelect from '../../components/tf-select/index.vue'
import uQRCode from '@/js_sdk/Sansnn-uQRCode/uqrcode.js'
import tfDialog from '@/pages/components/tf-dialog/index.vue'
import {
  getQrCode,
  ycOpenDoor
} from '@/api/butler/butler.js'
export default {
  components: {
    tfSelect,
    tfDialog
  },
  data () {
    return {
      countDownNum: 120,
      timer: null,
      active: 1,
      openDoorTime: '',
      options: [{
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
      instructionContent: '说明书，是以应用文体的方式对某事或物来进行相对的详细描述，方便人们认识和了解某事或物。说明书要实事求是，有一说一、有二说二，不可为达到某种目的而夸大产品作用和性能。说明书要全面的说明事物，不仅介绍其优点，同时还要清楚地说明应注意的事项和可能产生的问题。产品说明书、使用说明书、安装说明书一般采用说明性文字，而戏剧演出类说明书则可以以记叙、抒情为主。说明书可根据情况需要，使用图片、图表等多样的形式，以期达到最好的说明效果。'
    }
  },
  // 点击导航栏 buttons 时触发
  onNavigationBarButtonTap ({
    index
  }) {
    if (index === 1) {
      this.showInstructions()
    } else if (index === 0) {
      uni.navigateTo({
        url: '/pages/butler/entrance/list'
      })
    }
  },
  onLoad () {
    // 首次进入页面需弹窗一次使用说明
    uni.getStorage({
      key: 'first-entrance',
      success: (res) => {
        // console.log(res.data);
      },
      fail: (res) => {
        this.showInstructions()
        uni.setStorage({
          key: 'first-entrance',
          data: 1
        })
      }
    })
  },
  onReady () {
    const query = uni.createSelectorQuery().in(this)
    query.select('.entrance-operation__box').boundingClientRect(data => {
      this.qrHeight = data.height - 60
    }).exec()
    setTimeout(() => {
      this.getQrCode()
    }, 100)
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
        success: res => {
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
      this.$refs.dialog.open()
      // uni.showModal({
      // 	title: '使用说明',
      // 	content: '说明书，是以应用文体的方式对某事或物来进行相对的详细描述，方便人们认识和了解某事或物。说明书要实事求是，有一说一、有二说二，不可为达到某种目的而夸大产品作用和性能。说明书要全面的说明事物，不仅介绍其优点，同时还要清楚地说明应注意的事项和可能产生的问题。产品说明书、使用说明书、安装说明书一般采用说明性文字，而戏剧演出类说明书则可以以记叙、抒情为主。说明书可根据情况需要，使用图片、图表等多样的形式，以期达到最好的说明效果。',
      // 	showCancel: false,
      // 	confirmColor: '#EB5841',
      // 	confirmText: '确定',
      // 	success: res => {},
      // 	fail: () => {},
      // 	complete: () => {}
      // });
    },
    // 使用说明确认按钮
    confirmDialog () {
      this.$refs.dialog.close()
    }
  }
}
</script>

<style lang="less" scoped>
	* {
		box-sizing: border-box;
	}

	.header-bg {
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 670px;
		background-image: linear-gradient(to bottom, @red, @red-dark);
	}

	.tf-select {
		width: 100%;
		padding: 0 50px;
		margin: 50px 0;
	}

	.entrance-box {
		flex-direction: row !important;
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

	.entrance-box__type {
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

	scroll-view {
		height: 345px;
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
</style>
