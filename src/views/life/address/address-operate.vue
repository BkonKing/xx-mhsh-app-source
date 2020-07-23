<template>
  <view class="tf-bg" :style="{ height: height }">
		<view class="form-list">
			<view class="form-item">
				<view class="item-name"><text class="color-222 font-28">收货人</text></view>
				<view class="itemt-text">
					<input class="itemt-input" type="text" name="name" @input="nameFunc" v-model="uname" placeholder="姓名" />
				</view>
				<view class="address-line"></view>
			</view>
			<view class="form-item">
				<view class="item-name"><text class="color-222 font-28">手机号码</text></view>
				<view class="itemt-text">
					<input class="itemt-input" type="number" name="phone" @input="telFunc" v-model="utel" placeholder="11位手机号" maxlength='11' />
				</view>
				<view class="address-line"></view>
			</view>
			<view class="form-item address-choose">
				<view class="item-name"><text class="color-222 font-28">收货地址</text></view>
				<template v-if="uaddress_detail">
					<view v-if="uaddress_name" class="itemt-text two-text">
						<view class="p-nowrap">{{uaddress_name}}</view>
						<view class="p-nowrap" hidden="true">{{uaddress_detail}}</view>
					</view>
					<view v-else class="itemt-text">
						<view class="p-nowrap">ddgaweg</view>
					</view>
				</template>
				<template v-else>
					<view class="itemt-text">
						<input class="itemt-input" type="text" disabled name="ucity" placeholder="小区/写字楼等"/>
					</view>
				</template>
				<view class="itemt-icon"><image class="itemt-icon-url" src="/resource/images/address_04.png"></image></view>
			</view>
			<view class="address-line address-line2"></view>
			<view class="form-item">
				<view class="item-name"></view>
				<view class="itemt-text">
					<input class="itemt-input" type="text" name="uaddress_house" v-model="uaddress_house" @input="houseFunc" placeholder="楼号/单元/门牌号" />
				</view>
			</view>
		</view>
		<view class="form-list">
			<view class="form-item label-session">
				<view class="item-name"><text class="color-222 font-28">地址标签</text></view>
				<view :class="[isLabel ? 'label-list-right' : '','label-list-session']" @click="swalFunc">
					<view class="label-list">
						<template v-if="isLabel">
							<text class="label-item label-cur color-919499 font-30">{{labelVal}}</text>
						</template>
						<template v-else>
							<text bindtap="labelSelect" data-index="1" :class="['label-item','color-919499','font-30',labelIndex == 1 ? 'label-cur' : '']" data-val="家">家</text>
							<text bindtap="labelSelect" data-index="2" :class="['label-item','color-919499','font-30',labelIndex == 2 ? 'label-cur' : '']" data-val="公司">公司</text>
							<text bindtap="labelSelect" data-index="3" :class="['label-item','color-919499','font-30',labelIndex == 3 ? 'label-cur' : '']" data-val="学校">学校</text>
						</template>
					</view>
					<view class="custom-session" @click="swalFunc">
						<template v-if="!isLabel"><text class="color-8f8f94 font-30">自定义</text></template>
						<image class="custom-session-arrow" src="/resource/images/right.png"></image>
					</view>
				</view>
				<view class="address-line"></view>
			</view>
			<view class="form-item default-item">
				<text class="default-item-name color-8f8f94 font-30">设置为默认地址</text>
				<view :class="['default-switch', switchChecked ? 'default-switch-checked' : '']" @click="defaultFunc">
					<text :class="['default-point', switchChecked ? 'default-point-checked' : '']"></text>
				</view>
				<!-- <view class="default-switch-checked default-switch" bindtap="defaultFunc">
					<text class="default-point-checked default-point"></text>
				</view> -->
			</view>
		</view>
    
    <view class="del-btn" v-if="1==1" @click="delAddress"><text class="color-eb5841 font-30">删除地址</text></view>
		<view class="fixed-submit-empty"></view>
		<view class="submit-fixed-buttom">
			<view :class="['submit-btn', btnDisabled ? 'submit-btn-unable' : '']">
				<text class="color-fff font-30">保存</text>
			</view>
		</view>
		
    <view class="mask-bg" catchtouchmove="true" v-if="!swalHidden" @click.stop="swalFunc"></view>
    <view class="swal-session bottom-fixed" v-if="!swalHidden" data-nohide="true" @click.stop="swalFunc">
			<view class="close-block">
				<view class="close-btn" @click.stop="swalFunc"><image src="/resource/images/close.png" class="width-100"></image></view>
			</view>
			<view class="swal-session-cont">
				<text class="swal-tit">选择地址标签</text>
				<view class="swal-list">
				  <view class="swal-item" data-index="0" catchtap="selectLabel">
				    <text class="swal-label color-fff font-24">自定</text>
				    <view class="swal-input-block">
				      <input class="swal-input" type="text" name="name" value="" placeholder="默认显示前两个字，可输入自定义标签" maxlength='10' bindinput="getCustomVal" />
				    </view>
				    <view class="swal-tick"><image class="tick-pic" v-if="swalIndex == 0" src="/resource/images/tick.png"></image></view>
				  </view>
				  <view class="swal-item" data-index="1" catchtap="selectLabel">
				    <text class="swal-label color-fff font-24">家</text>
				    <view class="swal-tick"><image class="tick-pic" v-if="swalIndex == 1" src="/resource/images/tick.png"></image></view>
				  </view>
				  <view class="swal-item" data-index="2" catchtap="selectLabel">
				    <text class="swal-label color-fff font-24">公司</text>
				    <view class="swal-tick"><image class="tick-pic" v-if="swalIndex == 2" src="/resource/images/tick.png"></image></view>
				  </view>
				  <view class="swal-item" data-index="3" catchtap="selectLabel">
				    <text class="swal-label color-fff font-24">学校</text>
				    <view class="swal-tick"><image class="tick-pic" v-if="swalIndex == 3" src="/resource/images/tick.png"></image></view>
				  </view>
				</view>
				<view class="submit-btn swal-sure">
					<text class="color-fff font-30">完成</text>
				</view>
			</view>
    </view>
    

  </view>
</template>

<script>
	export default {
		data() {
			return {
				height: '',
				barObj: {
					isBorder: true,
					titName: '添加/编辑地址',
					// goback_pic: '../../image/goback4.png'
				},
				switchChecked: false,    //设置默认是否选择 false
				swalHidden: true,        //自定义标签弹窗是否隐藏 true
				labelIndex: 1,           //标签选择 0、自定义 1、家 2、公司 3、学校(提交后台)
				swalIndex: 0,            //弹窗标签选择 0、自定义 1、家 2、公司 3、学校
				customVal: '',           //自定义标签值
				labelVal: '',            //标签值
				labelValPost:'',         //标签值(提交后台)
				isLabel: 0,              //已经选择了地址标签
		
				userId: '',              //用户uid
				btnDisabled: true,       //保存按钮是否能点击
				uname: '',               //用户名
				utel: '',                //手机号
				uaddress_name: '',       //收货地址名称
				uaddress_detail: '',     //收货地址详情
				uaddress_house: '',      //收货地址门牌号
				lat: '',                 //经度
				lng: '',                 //纬度
				addrId: '',              //上个页面传的地址id
				// addHide: true,
				// mapHide: false,
				// addressList: [],
				ulatitude: '',            //经度
				ulongitude: '',           //纬度
				key_word: '附近',
				qqmapkey: '',
				markHidden: true,
			};
		},
		onLoad(options) {
			const res = uni.getSystemInfoSync();
			this.height = `${res.windowHeight}px`;
			if (typeof (options.addrId) != 'undefined') {
				this.addrId = options.addrId;
			}
		},
		methods: {
			/**
			 * 获取姓名
			*/
			nameFunc: function (e) {
				this.isAble();
			},
			/**
			 * 获取电话号码
			*/
			telFunc: function (e) {
				this.isAble();
			},
			/**
			 * 门牌号
			*/
			houseFunc: function (e) {
				this.isAble();
			},
			/**
			 * 提交
			*/
			formSubmit: function (e) {
				const that = this;
				//console.log(adds);return;
				that.setData({
					btnDisabled: true
				})
				app.util.request({
					'url': '/xcx/wxjson/edit_address',
					'cachetime': '0',
					'data': {
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
						uid: that.data.userId,
					},
					success(res) {
						that.setData({
							btnDisabled: false
						})
						var status = res.data.code;
						if (status == '0000') {
							wx.showToast({
								title: '保存成功！',
								duration: 2000
							});
							wx.navigateBack();
						} else {
							wx.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
			},
			/**
			 * 获取修改地址信息
			*/
			getData: function (is_refresh) {
				const that = this;
				app.util.request({
					'url': '/xcx/wxjson/address_info_json',
					'cachetime': '0',
					'data': {
						uid: that.data.userId,
						add_id: that.data.addrId,
						is_refresh: is_refresh,
						cj_code: scene_val
					},
					success(res) {
						let result = res.data;
						if (result.code = "0000" && is_refresh){
							if (result.data.address_info){
								let info = result.data.address_info;
								console.log(info);
								that.setData({
									btnDisabled: false,
									uname: info.uname,
									utel: info.utel,
									uaddress_name: info.uaddress_name,
									uaddress_detail: info.uaddress_detail,
									uaddress_house: info.uaddress_house,
									labelIndex: info.ulabel_id,
									swalIndex: info.ulabel_id,
									switchChecked: info.is_default==1 ? true : false,
									labelVal: info.ulabel,
									labelValPost: info.ulabel,
									lat: info.lat,
									lng: info.lng
								})
								if (result.data.address_info.ulabel_id === 0){
									that.data.customVal = result.data.address_info.ulabel;
								}
								if (result.data.address_info.ulabel_id !== "" && result.data.address_info.ulabel !== ""){
									that.setData({
										isLabel: 1
									})
								}
							}
						}
					}
				});
			},
			// inputTxet: function (e) {
			// 	var value = e.detail.value;
			// 	this.setData({
			// 		key_word: value,
			// 	})
			// 	if (e.currentTarget.dataset.key_word == "") {
			// 		wx.showToast({
			// 			title: '请输入内容',
			// 			icon: 'success',
			// 			duration: 1000
			// 		})
			// 	} else {
			// 		var that = this;
			// 		that.GetLocation();
			// 	}
			// },
			getadd: function (e) {
				var that = this;
				var addid = e.currentTarget.dataset.addkey;
				var resadd = that.data.addressList[addid];
				that.setData({
					ucity: resadd.ad_info.province + resadd.ad_info.city + resadd.ad_info.district + resadd.title,
					addHide: true,
					mapHide: false,
				})
				that.data.lat = resadd.location.lat;
				that.data.lng = resadd.location.lng;
				that.isAble();
			},
			atuoGetLocation(e) {
				const that = this;
				qqmapsdk.geocoder({
					address: that.data.ucity + that.data.uaddress_city,   //用户输入的地址（注：地址中请包含城市名称，否则会影响解析效果），如：'北京市海淀区彩和坊路海淀西大街74号'
					success: res => {
						that.data.lng = res.result.location.lng;
						that.data.lat = res.result.location.lat;
					},
					fail: res => {
						console.log(1111);
					},
				})
			},
			/**
			 * 判断提交按钮是否能够点击
			*/
			isAble: function (e) {
				const that = this;
				console.log(this.uname.trim(),this.utel.trim(),this.uaddress_house.trim());return;
				if (that.data.uname.trim() == '' || that.data.utel.trim() == '' || that.data.uaddress_detail == '' || that.data.uaddress_house == '') {
					that.setData({
						btnDisabled: true
					})
				} else {
					that.setData({
						btnDisabled: false
					})
				}
			},
			/**
			 * 设置结果
			*/
			handler: function (e) {
				const that = this;
				if (e.detail.authSetting["scope.userLocation"]) {
					that.setData({
						markHidden: true
					})
					// that.GetLocation();
				}
			},
			/**
			 * 设置默认
			*/
			defaultFunc: function (e) {
				this.switchChecked = !this.switchChecked;
			},
			/**
			 * 删除地址
			*/
			delAddress: function (e) {
				const that = this;
				wx.showModal({
					title: '提示',
					content: '确认删除吗？',
					success: function (res) {
						if (res.confirm) {
							app.util.request({
								'url': '/xcx/wxjson/del_address',
								'cachetime': '0',
								'data': {
									add_id: that.data.addrId,
									uid: that.data.userId
								},
								success(res) {
									var result = res.data;
									if (result.code == '0000') {
										wx.navigateBack({})
									} else {
										wx.showToast({
											title: result.msg,
											duration: 2000
										});
									}
								}
							});
						}
					}
				});
			},
			/**
			 * 地址选择
			*/
			chooseAddress: function (e) {
				const that = this;
				wx.chooseLocation({
					success(res) {
						console.log(res);
						that.setData({
							uaddress_name: res.name,
							uaddress_detail: res.address,
							uaddress_house: '',
						})
						that.data.lat = res.latitude;
						that.data.lng = res.longitude;
						that.isAble();
					},fail(res){
						wx.getSetting({
							success(res) {
								if (!res.authSetting['scope.userLocation']) {
									wx.authorize({
										scope: 'scope.userLocation',
										success() {
										}, fail() {
											wx.showModal({
												title: '"不荒唐"需要获取您的地理位置',
												content: '不荒唐希望获得您的地理位置，以为您提供更好的服务！',
												showCancel: false,
												success: function (res2) {
													if (res2.confirm) {
														wx.openSetting({
															success: function (data) {
																console.log("openSetting success");
															},
															fail: function (data) {
																console.log("openSetting fail");
															}
														});
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
				const that = this;
				// console.log(e);return;
				if (typeof e.currentTarget.dataset.nohide !== "undefined" && e.currentTarget.dataset.nohide) {
					that.swalHidden = false;
				} else {
					that.swalHidden = !that.swalHidden;
				}
		
			},
			/**
			 * 勾选标签（弹窗）
			*/
			selectLabel: function (e) {
				const that = this;
				console.log(e);
				let swalIndex = e.currentTarget.dataset.index;
				that.setData({
					swalIndex: swalIndex
				})
				if (swalIndex!=0){
					// that.setData({
					//   customVal: ''
					// })
				}
			},
			/**
			 * 标签选择
			*/
			labelSelect: function (e) {
				const that = this;
				console.log(e.currentTarget.dataset.index)
				let labelIndex = e.currentTarget.dataset.index;
				that.setData({
					labelIndex: labelIndex,
				})
				that.data.labelVal = e.currentTarget.dataset.val;
				that.data.labelValPost = e.currentTarget.dataset.val;
			},
			/**
			 * 获取自定义标签值
			*/
			getCustomVal: function (e) {
				const that = this;
				that.data.customVal = e.detail.value.trim()
				that.data.labelVal = e.detail.value.trim();
			},
			/**
			 * 标签选择确定
			*/
			sureFunc: function (e) {
				const that = this;
				if (that.data.swalIndex == 0 && that.data.customVal == '') {
					wx.showToast({
						title: '请填写自定义值',
						icon: 'none',
						duration: 1000,
						mask: true
					})
				} else {
					let labelArr = [that.data.customVal, '家', '公司', '学校'];
					that.setData({
						labelVal: labelArr[that.data.swalIndex],
						swalHidden: !that.data.swalHidden,
						isLabel: 1,
						labelValPost: labelArr[that.data.swalIndex],
						labelIndex: that.data.swalIndex
					})
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../styles/life.less';
  .form-list {
    background-color: #fff;
		margin-bottom: 30px;
  }
  .form-item {
		@extend %fx-flex-center;
    min-height: 100px;
    padding: 0 30px;
    position: relative;
  }
  .address-line {
    height: 1px;
    background-color: @divider-color;
    position: absolute;
    bottom: 0;
    left: 30px;
    right: 30px;
  }
	.address-line2 {
		left: 170px;
		bottom: 100px;
	}
  .item-name {
    width: 140px;
    height: 100px;
		@extend %fx-flex-center;
  }
  .itemt-text {
    width: 550px;
    padding: 20px 0;
  }
	.itemt-input {
		font-size: 28px;
		color: @text-color;
	}
  // .address-choose .itemt-text {
  //   width: 488px;
  //   flex-grow: 0;
  //   display: flex;
  //   align-items: center;
  // }
  // .address-choose .itemt-text.two-text {
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: flex-start;
  //   padding-top: 38px;
  // }
  // .two-text view {
  //   max-width: 488px;
  // }
  .itemt-icon {
    width: 44px;
    justify-content: center;
    @extend %fx-flex-center;
    height: 100px;
  }
  .itemt-icon-url {
    width: 44px;
    height: 44px;
  }
  // .itemt-text input {
  //   width: 100%;
  //   height: 100%;
  //   font-size: 30px;
  //   color: #212124;
  //   float: left;
  // }
  
  .label-session {
    @extend %fx-space-between;
    padding-right: 0;
  }
  .label-list-session {
    width: 580px;
    @extend %fx-space-between;
  }
  .label-list-right {
    justify-content: flex-end;
  }
  .label-list {
    @extend %fx-row;
    height: 60px;
  }
  .label-item {
    margin-right: 20px;
    @extend %border-all;
    height: 60px;
		line-height: 56px;
    padding: 0 24px;
    @include border-radius(30px);
		@extend %fx-flex-center;
		justify-content: center;
  }
  .label-cur {
    background-color: @gray-6;
    color: @text-color-inverse;
  }
  // .label-item:last-child {
  //   margin-right: 0;
  // }
  .custom-session {
		@extend %fx-flex-center;
    padding-right: 30px;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		@extend %fx-flex-center;
  }
  .custom-session-arrow {
    width: 16px;
    height: 26px;
    margin-left: 18px;
  }
  .default-item {
    align-items: center;
    justify-content: space-between;
  }
  .default-item-name {
    width: 250px;
  }
  .default-switch {
    position: relative;
    width: 86px;
    height: 48px;
    align-items: center;
    background-color: @gray-6;
    border-radius: 24px;
    transition: all 0.3s linear;
  }
  .default-point {
    position: absolute;
    right: 5px;
    top: 5px;
    bottom: 5px;
		height: 40px;
		width: 40px;
    border-radius: 20px;
    background-color: @text-color-inverse;
    transition: all 0.3s linear;
  }
  .default-switch-checked {
    background-color: @red-dark;
  }
  .default-point-checked {
    right: 42px;
  }
  .del-btn {
		height: 100px;
    background-color: @text-color-inverse;
		@extend %fx-flex-center;
		justify-content: center;
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
	  @extend %fx-flex-center;
	  justify-content: center;
	}
	.swal-session-cont {
	  height: 690px;
	  padding: 0 30px;
		background-color: @text-color-inverse;
	}
  .swal-tit {
    height: 110px;
    line-height: 110px;
    text-align: center;
    font-size: 34px;
    color: #60646b;
  }
  .swal-item {
    height: 80px;
    margin-bottom: 30px;
    @extend %fx-space-between;
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
    @extend %border-bottom;
    padding: 20px 0;
  }
  .swal-input {
    font-size: 30px;
    color: #222;
    line-height: 39px;
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
