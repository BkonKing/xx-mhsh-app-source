<template>
  <div class="app-body" :style="{ 'min-height': windowHeight+'px' }">
    <div class="order-bar bar-white"><van-nav-bar title="添加/修改地址" :border="false" fixed left-text="" left-arrow></van-nav-bar></div>
    <div class="bar-empty"></div>
		<div class="form-list">
			<div class="form-item flex-align-center">
				<div class="item-name flex-align-center"><div class="color-222 font-28">收货人</div></div>
				<div class="itemt-text">
					<input class="itemt-input" type="text" name="name" @input="nameFunc" v-model="uname" placeholder="姓名" />
				</div>
				<div class="address-line"></div>
			</div>
			<div class="form-item flex-align-center">
				<div class="item-name flex-align-center"><div class="color-222 font-28">手机号码</div></div>
				<div class="itemt-text">
					<input class="itemt-input" type="number" name="phone" @input="telFunc" v-model="utel" placeholder="11位手机号" maxlength='11' />
				</div>
				<div class="address-line"></div>
			</div>
			<div class="form-item flex-align-center address-choose">
				<div class="item-name flex-align-center"><div class="color-222 font-28">收货地址</div></div>
				<template v-if="uaddress_detail">
					<div v-if="uaddress_name" class="itemt-text two-text">
						<div class="p-nowrap">{{uaddress_name}}</div>
						<div class="p-nowrap" hidden="true">{{uaddress_detail}}</div>
					</div>
					<div v-else class="itemt-text">
						<div class="p-nowrap">ddgaweg</div>
					</div>
				</template>
				<template v-else>
					<div class="itemt-text">
						<input class="itemt-input" type="text" readonly name="ucity" placeholder="小区/写字楼等"/>
					</div>
				</template>
				<div class="itemt-icon flex-center"><img class="itemt-icon-url" src="@/assets/img/address_03.png" /></div>
				<div class="address-line address-line2"></div>
			</div>

			<div class="form-item flex-align-center">
				<div class="item-name flex-align-center"></div>
				<div class="itemt-text">
					<input class="itemt-input" type="text" name="uaddress_house" v-model="uaddress_house" @input="houseFunc" placeholder="楼号/单元/门牌号" />
				</div>
			</div>
		</div>
		<div class="form-list">
			<div class="form-item flex-align-center label-session flex-between">
				<div class="item-name flex-align-center"><div class="color-222 font-28">地址标签</div></div>
				<div :class="[isLabel ? 'label-list-right' : '','label-list-session']">
					<div class="label-list">
						<template v-if="isLabel">
							<div class="label-item label-cur color-919499 font-30">{{labelVal}}</div>
						</template>
						<template v-else>
							<div @click.stop="labelSelect" data-index="1" :class="['label-item','color-919499','font-30',labelIndex == 1 ? 'label-cur' : '']" data-val="家">家</div>
							<div @click.stop="labelSelect" data-index="2" :class="['label-item','color-919499','font-30',labelIndex == 2 ? 'label-cur' : '']" data-val="公司">公司</div>
							<div @click.stop="labelSelect" data-index="3" :class="['label-item','color-919499','font-30',labelIndex == 3 ? 'label-cur' : '']" data-val="学校">学校</div>
						</template>
					</div>
					<div class="custom-session flex-center" @click="swalFunc">
						<template v-if="!isLabel"><div class="color-8f8f94 font-30">自定义</div></template>
						<!-- <van-icon class="van-icon" name="arrow" size="32px" color="#aaa" /> -->
						<img class="custom-session-arrow" src="@/assets/img/right.png" />
					</div>
				</div>
				<div class="address-line"></div>
			</div>
			<div class="form-item flex-align-center default-item flex-between">
				<div class="default-item-name color-222 font-30">设置为默认地址</div>
				<div :class="['default-switch', switchChecked ? 'default-switch-checked' : '']" @click="defaultFunc">
					<div class="default-point"></div>
				</div>
				<!-- <div class="default-switch-checked default-switch" bindtap="defaultFunc">
					<div class="default-point-checked default-point"></div>
				</div> -->
			</div>
		</div>

    <div class="del-btn flex-center" v-if="1==1" @click="delAddress"><div class="color-eb5841 font-30">删除地址</div></div>
		<div class="fixed-submit-empty"></div>
		<div class="submit-fixed-buttom">
			<div :class="['submit-btn', btnDisabled ? 'submit-btn-unable' : '']">
				<div class="color-fff font-30">保存</div>
			</div>
		</div>

    <div class="mask-bg" catchtouchmove="true" v-if="!swalHidden" @click.stop="swalFunc"></div>
    <div class="swal-session bottom-fixed" v-if="!swalHidden" data-nohide="true" @click.stop="swalFunc">
			<div class="close-block" @click.stop="swalFunc">
				<div class="close-btn flex-center"><img class="img-100" src="@/assets/img/close.png" /></div>
			</div>
			<div class="swal-session-cont">
				<div class="swal-tit">选择地址标签</div>
				<div class="swal-list">
				  <div class="swal-item flex-between" data-index="0" @click.stop="selectLabel">
				    <div class="swal-label color-fff font-24">自定</div>
				    <div class="swal-input-block">
				      <input class="swal-input" type="text" name="name" placeholder="默认显示前两个字，可输入自定义标签" maxlength='10' @input="getCustomVal" />
				    </div>
				    <div class="swal-tick"><img class="tick-pic" v-if="swalIndex == 0" src="@/assets/img/tick.png" /></div>
				  </div>
				  <div class="swal-item flex-between" data-index="1" @click.stop="selectLabel">
				    <div class="swal-label color-fff font-24">家</div>
				    <div class="swal-tick"><img class="tick-pic" v-if="swalIndex == 1" src="@/assets/img/tick.png" /></div>
				  </div>
				  <div class="swal-item flex-between" data-index="2" @click.stop="selectLabel">
				    <div class="swal-label color-fff font-24">公司</div>
				    <div class="swal-tick"><img class="tick-pic" v-if="swalIndex == 2" src="@/assets/img/tick.png" /></div>
				  </div>
				  <div class="swal-item flex-between" data-index="3" @click.stop="selectLabel">
				    <div class="swal-label color-fff font-24">学校</div>
				    <div class="swal-tick"><img class="tick-pic" v-if="swalIndex == 3" src="@/assets/img/tick.png" /></div>
				  </div>
				</div>
				<div class="submit-btn swal-sure" @click.stop="sureFunc">
					<div class="color-fff font-30">完成</div>
				</div>
			</div>
    </div>
  </div>
</template>

<script>
import { NavBar, Toast } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      barObj: {
        isBorder: true,
        titName: '添加/编辑地址'
        // goback_pic: '../../image/goback4.png'
      },
      switchChecked: false, // 设置默认是否选择 false
      swalHidden: true, // 自定义标签弹窗是否隐藏 true
      labelIndex: 1, // 标签选择 0、自定义 1、家 2、公司 3、学校(提交后台)
      swalIndex: 0, // 弹窗标签选择 0、自定义 1、家 2、公司 3、学校
      customVal: '', // 自定义标签值
      labelVal: '', // 标签值
      labelValPost: '', // 标签值(提交后台)
      isLabel: 0, // 已经选择了地址标签

      userId: '', // 用户uid
      btnDisabled: true, // 保存按钮是否能点击
      uname: '', // 用户名
      utel: '', // 手机号
      uaddress_name: '', // 收货地址名称
      uaddress_detail: '', // 收货地址详情
      uaddress_house: '', // 收货地址门牌号
      lat: '', // 经度
      lng: '', // 纬度
      addrId: '', // 上个页面传的地址id
      // addHide: true,
      // mapHide: false,
      // addressList: [],
      ulatitude: '', // 经度
      ulongitude: '', // 纬度
      key_word: '附近',
      qqmapkey: '',
      markHidden: true
    }
  },
  // onLoad(options) {
  // 	const res = uni.getSystemInfoSync();
  // 	if (typeof (options.addrId) != 'undefined') {
  // 		this.addrId = options.addrId;
  // 	}
  // },
  methods: {
    /**
			 * 获取姓名
			*/
    nameFunc: function (e) {
      this.isAble()
    },
    /**
			 * 获取电话号码
			*/
    telFunc: function (e) {
      this.isAble()
    },
    /**
			 * 门牌号
			*/
    houseFunc: function (e) {
      this.isAble()
    },
    /**
			 * 提交
			*/
    formSubmit: function (e) {
      const that = this
      // console.log(adds);return;
      that.btnDisabled = true
      app.util.request({
        url: '/xcx/wxjson/edit_address',
        cachetime: '0',
        data: {
          add_id: that.data.addrId,
          uname: that.data.uname,
          utel: that.data.utel,
          uaddress_name: that.data.uaddress_name,
          uaddress_detail: that.data.uaddress_detail,
          uaddress_house: that.data.uaddress_house,
          ulabel_id: that.data.labelValPost ? that.data.labelIndex : '',
          ulabel: that.data.labelValPost,
          is_default: that.data.switchChecked ? 1 : 0,
          lat: that.data.lat,
          lng: that.data.lng,
          uid: that.data.userId
        },
        success (res) {
          that.btnDisabled = false
          var status = res.data.code
          if (status == '0000') {
            wx.showToast({
              title: '保存成功！',
              duration: 2000
            })
            wx.navigateBack()
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    },
    /**
			 * 获取修改地址信息
			*/
    getData: function (is_refresh) {
      const that = this
      app.util.request({
        url: '/xcx/wxjson/address_info_json',
        cachetime: '0',
        data: {
          uid: that.data.userId,
          add_id: that.data.addrId,
          is_refresh: is_refresh
        },
        success (res) {
          const result = res.data
          if (result.code = '0000' && is_refresh) {
            if (result.data.address_info) {
              const info = result.data.address_info
              console.log(info)
              that.setData({
                btnDisabled: false,
                uname: info.uname,
                utel: info.utel,
                uaddress_name: info.uaddress_name,
                uaddress_detail: info.uaddress_detail,
                uaddress_house: info.uaddress_house,
                labelIndex: info.ulabel_id,
                swalIndex: info.ulabel_id,
                switchChecked: info.is_default == 1,
                labelVal: info.ulabel,
                labelValPost: info.ulabel,
                lat: info.lat,
                lng: info.lng
              })
              if (result.data.address_info.ulabel_id === 0) {
                that.data.customVal = result.data.address_info.ulabel
              }
              if (result.data.address_info.ulabel_id !== '' && result.data.address_info.ulabel !== '') {
                that.setData({
                  isLabel: 1
                })
              }
            }
          }
        }
      })
    },
    getadd: function (e) {
      var that = this
      var addid = e.currentTarget.dataset.addkey
      var resadd = that.data.addressList[addid]
      that.setData({
        ucity: resadd.ad_info.province + resadd.ad_info.city + resadd.ad_info.district + resadd.title,
        addHide: true,
        mapHide: false
      })
      that.data.lat = resadd.location.lat
      that.data.lng = resadd.location.lng
      that.isAble()
    },
    atuoGetLocation (e) {
      const that = this
      qqmapsdk.geocoder({
        address: that.data.ucity + that.data.uaddress_city, // 用户输入的地址（注：地址中请包含城市名称，否则会影响解析效果），如：'北京市海淀区彩和坊路海淀西大街74号'
        success: res => {
          that.data.lng = res.result.location.lng
          that.data.lat = res.result.location.lat
        },
        fail: res => {
          console.log(1111)
        }
      })
    },
    /**
			 * 判断提交按钮是否能够点击
			*/
    isAble: function (e) {
      const that = this
      console.log(this.uname.trim(), this.utel.trim(), this.uaddress_house.trim()); return
      if (that.data.uname.trim() == '' || that.data.utel.trim() == '' || that.data.uaddress_detail == '' || that.data.uaddress_house == '') {
        that.btnDisabled = true
      } else {
        that.btnDisabled = false
      }
    },
    /**
			 * 设置结果
			*/
    handler: function (e) {
      const that = this
      if (e.detail.authSetting['scope.userLocation']) {
        that.markHidden = true
        // that.GetLocation();
      }
    },
    /**
			 * 设置默认
			*/
    defaultFunc: function (e) {
      this.switchChecked = !this.switchChecked
    },
    /**
			 * 删除地址
			*/
    delAddress: function (e) {
      const that = this
      wx.showModal({
        title: '提示',
        content: '确认删除吗？',
        success: function (res) {
          if (res.confirm) {
            app.util.request({
              url: '/xcx/wxjson/del_address',
              cachetime: '0',
              data: {
                add_id: that.data.addrId,
                uid: that.data.userId
              },
              success (res) {
                var result = res.data
                if (result.code == '0000') {
                  wx.navigateBack({})
                } else {
                  wx.showToast({
                    title: result.msg,
                    duration: 2000
                  })
                }
              }
            })
          }
        }
      })
    },
    /**
			 * 地址选择
			*/
    chooseAddress: function (e) {
      const that = this
      wx.chooseLocation({
        success (res) {
          console.log(res)
          that.setData({
            uaddress_name: res.name,
            uaddress_detail: res.address,
            uaddress_house: ''
          })
          that.data.lat = res.latitude
          that.data.lng = res.longitude
          that.isAble()
        },
        fail (res) {
          wx.getSetting({
            success (res) {
              if (!res.authSetting['scope.userLocation']) {
                wx.authorize({
                  scope: 'scope.userLocation',
                  success () {
                  },
                  fail () {
                    wx.showModal({
                      title: '"不荒唐"需要获取您的地理位置',
                      content: '不荒唐希望获得您的地理位置，以为您提供更好的服务！',
                      showCancel: false,
                      success: function (res2) {
                        if (res2.confirm) {
                          wx.openSetting({
                            success: function (data) {
                              console.log('openSetting success')
                            },
                            fail: function (data) {
                              console.log('openSetting fail')
                            }
                          })
                        }
                      }
                    })
                  }
                })
              }
            }
          })
        }
      })
    },
    /**
			 * 自定义标签弹窗
			*/
    swalFunc: function (e) {
      const that = this
      // console.log(e);return;
      if (typeof e.currentTarget.dataset.nohide !== 'undefined' && e.currentTarget.dataset.nohide) {
        that.swalHidden = false
      } else {
        that.swalHidden = !that.swalHidden
      }
    },
    /**
			 * 勾选标签（弹窗）
			*/
    selectLabel: function (e) {
      const that = this
      console.log(e)
      const swalIndex = e.currentTarget.dataset.index
      that.swalIndex = swalIndex
      if (swalIndex != 0) {
        // that.setData({
        //   customVal: ''
        // })
      }
    },
    /**
			 * 标签选择
			*/
    labelSelect: function (e) {
      const that = this
      console.log(e.currentTarget.dataset.index)
      const labelIndex = e.currentTarget.dataset.index
      that.labelIndex = labelIndex
      that.labelVal = e.currentTarget.dataset.val
      that.labelValPost = e.currentTarget.dataset.val
    },
    /**
			 * 获取自定义标签值
			*/
    getCustomVal: function (e) {
      const that = this
      console.log(e)
      that.customVal = e.target.value.trim()
      that.labelVal = e.target.value.trim()
    },
    /**
			 * 标签选择确定
			*/
    sureFunc: function (e) {
      const that = this
      if (that.swalIndex == 0 && that.customVal == '') {
        this.$toast('请填写自定义值')
        // Toast('');
        // wx.showToast({
        // 	title: '请填写自定义值',
        // 	icon: 'none',
        // 	duration: 1000,
        // 	mask: true
        // })
      } else {
        const labelArr = [that.customVal, '家', '公司', '学校']
        that.labelVal = labelArr[that.swalIndex]
        that.swalHidden = !that.swalHidden
        that.isLabel = 1
        that.labelValPost = labelArr[that.swalIndex]
        that.labelIndex = that.swalIndex
      }
    }
  }
}
</script>

<style scoped>
@import '../../../styles/life.css';
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
  overflow: hidden;
}
.form-list {
  background-color: #fff;
	margin-bottom: 30px;
}
.form-item {
  min-height: 100px;
  padding: 0 30px;
  position: relative;
}
.address-line {
  height: 1px;
  background-color: #f0f0f0;
  position: absolute;
  bottom: 0;
  left: 30px;
  right: 30px;
}
.address-line2 {
	left: 170px;
	bottom: 0;
}
.item-name {
	flex-shrink: 0;
  width: 140px;
  height: 100px;
}
.itemt-text {
  width: 550px;
  padding: 20px 0;
}
.itemt-input,.swal-input {
	font-size: 28px;
	color: #222222;
	outline: none;
  border: none;
  padding: 0;
  margin: 0;
  text-decoration: inherit;
}
/*.address-choose .itemt-text {
  width: 488px;
  flex-grow: 0;
  display: flex;
  align-items: center;
}
.address-choose .itemt-text.two-text {
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-top: 38px;
}
.two-text div {
  max-width: 488px;
}*/
.itemt-icon {
  width: 44px;
  height: 100px;
}
.itemt-icon-url {
  width: 29px;
  height: 36px;
}
/*.itemt-text input {
  width: 100%;
  height: 100%;
  font-size: 30px;
  color: #212124;
  float: left;
}*/

.label-session {
  padding-right: 0;
}
.label-list-session {
  width: 580px;
  display: flex;
	justify-content: space-between;
	align-items: center;
}
.label-list-right {
  justify-content: flex-end;
}
.label-list {
  display: flex;
  height: 60px;
}
.label-item {
  margin-right: 20px;
  border: 1.3px solid #aaa;
  height: 60px;
	line-height: 56px;
  padding: 0 24px;
  border-radius: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.label-cur {
  background-color: #aaa;
  color: #fff;
}
/*.label-item:last-child {
  margin-right: 0;
}*/
.custom-session {
  padding-right: 30px;
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
}
.custom-session-arrow {
  width: 16px;
  height: 26px;
  margin-left: 18px;
}
.default-item-name {
  width: 250px;
}
.default-switch {
  position: relative;
  width: 86px;
  height: 48px;
  align-items: center;
  background-color: #aaa;
  border-radius: 24px;
  transition: all 0.3s linear;
}
.default-point {
  position: absolute;
  left: 5px;
  top: 5px;
  bottom: 5px;
	width: 40px;
  border-radius: 20px;
  background-color: #fff;
  transition: all 0.3s linear;
}
.default-switch-checked {
  background-color: #eb5841;
}
.default-switch-checked .default-point {
	right: 5px;
	left: 42px;
}
.del-btn {
	height: 100px;
  color: #eb5841;
  background-color: #fff;
}

/*弹窗*/
.swal-session {
  animation: translateMove 0.5s;
  -webkit-animation: translateMove 0.5s;
  height: 800px;
  z-index: 188;
}
.close-block {
	height: 110px;
	position: relative;
}
.close-btn {
  position: absolute;
  width: 110px;
  height: 110px;
  top: 0;
  right: 0;
  padding: 30px;
}
.swal-session-cont {
  height: 690px;
  padding: 0 30px;
	background-color: #fff;
}
.swal-tit {
  height: 110px;
  line-height: 110px;
  text-align: center;
  font-size: 30px;
  color: #222;
}
.swal-item {
  height: 80px;
  margin-bottom: 30px;
}
.swal-label {
  width: 80px;
  height: 80px;
	line-height: 80px;
  background-color: #b8babf;
	text-align: center;
}
.swal-tick {
  width: 44px;
  height: 80px;
  padding: 18px 0;
}
.tick-pic {
	width: 44px;
	height: 44px;
}
.swal-input-block {
  height: 79px;
  width: 524px;
  border-bottom: 1px solid #f1f1f1;
  padding: 20px 0;
}
.swal-input {
  font-size: 30px;
  color: #222;
  line-height: 39px;
  width: 100%;
}
.swal-sure {
  margin-top: 10px;
}

@keyframes translateMove
{
  from {transform:translateY(100%);}
  to {transform:translateY(0);}
}

@-webkit-keyframes translateMove
{
  from {transform:translateY(100%);}
  to {transform:translateY(0);}
}
</style>
