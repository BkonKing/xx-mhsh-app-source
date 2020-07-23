<template>
  <view class="tf-bg-white" :style="{ height: height }">
    <placeholderNavBar></placeholderNavBar>
    <view class="page-bg"></view>
    <view class="nav-bar">
      <text class="tf-icon navbar-text">&#xe857;</text>
      <text class="navbar-title">幸福币</text>
      <text class="navbar-text" @click="goCoinRecord">明细</text>
    </view>
    <view class="tf-row-space-between">
      <view class="tf-row-center tf-flex-item">
        <text class="tf-icon coin-icon">&#xe80b;</text>
        <text class="coin-number">2333</text>
      </view>
      <text class="sign-tag sign-tag--complete">签到</text>
    </view>
    <scroll-view :scroll-y="true">
      <view class="tf-row-space-between tf-padding-lg">
        <view class="function-box">
          <text class="tf-icon function-box__icon">&#xe819;</text>
          <text class="function-box__text">扫一扫</text>
        </view>
        <view class="function-box">
          <text class="tf-icon function-box__icon function-box__icon--pay">&#xe81f;</text>
          <text class="function-box__text">付款码</text>
        </view>
        <view class="function-box">
          <text class="tf-icon function-box__icon function-box__icon--payreceipt">&#xe80b;</text>
          <text class="function-box__text">收款码</text>
        </view>
      </view>
      <text class="happiness-coin-title">幸福币任务</text>
      <view class="task-box">
        <view class="task-item">
          <view class="tf-row tf-flex-item">
            <text class="task-item__icon"></text>
            <view class="tf-space-between">
              <text class="task-item__title">完成房间认证</text>
              <view class="tf-row">
                <text class="task-item__remarks">开门认证成功获得</text>
                <text class="task-item__remarks--gold">20幸福币</text>
              </view>
            </view>
          </view>
          <!-- <text class="task-item__number">+20</text> -->
          <text class="task-item__btn">去完成</text>
        </view>
      </view>
      <view style="margin-top: 80px;">
        <text class="happiness-coin-title">幸福币特卖区</text>
        <text class="purchase-history" @click="goBuyRecord">购买记录</text>
      </view>
      <view class="sale-area">
        <view class="commodity-box">
          <image class="commodity-image" src="/static/app-icon.png"></image>
          <text class="commodity-name">雨前西湖龙井</text>
          <view class="tf-row" style="align-items: flex-end;">
            <text class="commodity-current-price">￥240</text>
            <text class="commodity-original-price">￥260</text>
          </view>
          <text class="commodity-coin">1000幸福币</text>
        </view>
        <view class="commodity-box">
          <image class="commodity-image" src="/static/app-icon.png"></image>
          <text class="commodity-name">雨前西湖龙井</text>
          <view class="tf-row" style="align-items: flex-end;">
            <text class="commodity-current-price">￥240</text>
            <text class="commodity-original-price">￥260</text>
          </view>
          <text class="commodity-coin">1000幸福币</text>
        </view>
        <view class="commodity-box">
          <image class="commodity-image" src="/static/app-icon.png"></image>
          <text class="commodity-name">雨前西湖龙井</text>
          <view class="tf-row" style="align-items: flex-end;">
            <text class="commodity-current-price">￥240</text>
            <text class="commodity-original-price">￥260</text>
          </view>
          <text class="commodity-coin">1000幸福币</text>
        </view>
      </view>
    </scroll-view>
		
		<!-- 签到start -->
		<view class="mask-block sign-mask" catchtouchmove="true" catchtap="toggleFunc">
			<view class="sign-mask-block">
				<view class="sign-block" data-show="show" catchtap="toggleFunc">
					<view class="mask-header">
						<text class="mask-tit">签到</text>
						<view class="mask-icon mask-icon-left"></view>
						<view class="mask-icon mask-icon-right"></view>
					</view>
					<view class="sign-cont">
						<view class="mask-bar">
							<text class="bar-btn bar-prev tf-icon" catchtap="handleCalendar" data-handle="prev">&#xe99d;
								<!-- <image src="prev.png"></image> -->
							</text>
							<text class="bar-month">{{cur_year}}年{{cur_month}}月</text>
							<template v-if="this_year!=cur_year || this_month!=cur_month">
								<text class="bar-btn bar-next tf-icon" catchtap="handleCalendar" data-handle="next">&#xe99c;
									<!-- <image src="next.png"></image> -->
								</text>
							</template>
							<template v-else>
								<view class="bar-btn bar-next"></view>
							</template>
						</view>
						<view class="mask-week">
							<text class="week-day">日</text>
							<text class="week-day">一</text>
							<text class="week-day">二</text>
							<text class="week-day">三</text>
							<text class="week-day">四</text>
							<text class="week-day">五</text>
							<text class="week-day">六</text>
						</view>
						<view class="mask-days">
							<template>
								<text v-for="(item,index) in sign_arr" :key="index" :class="['date-num',item.is_prev||item.is_next ? 'gray-month' : '',item.is_sign ? 'days-sign' : '',item.is_start ? 'start-sign' : '',item.is_end ? 'end-sign' : '',item.is_start&&item.is_end ? 'only-sign':'']">{{item.date}}</text>
							</template>
							<!-- <block wx:for="{{sign_arr}}" wx:key="*this">
						    <view class="{{item.is_prev||item.is_next ? 'gray-month' : ''}} {{item.is_sign ? 'days-sign' : ''}} {{item.is_start ? 'start-sign' : ''}} {{item.is_end ? 'end-sign' : ''}}">{{item.date}}</view>
						  </block> -->
						</view>
					</view>
				</view>
				<view class="mask-close-block">
					<view class="mask-close" catchtap="toggleFunc">
						<image class="width-100" src="close_03.png"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 签到end -->
  </view>
</template>

<script>
import placeholderNavBar from '@/pages/components/placeholder-nav-bar/index.nvue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
export default {
  components: {
    placeholderNavBar,
    uniNavBar
  },
  data() {
    return {
      height: 'auto',
			
			mask_hidden: true, //签到日历是否隐藏
			this_year: 2020, //当天的年份
			this_month: 7, //当天的月份
			cur_year: 0, //签到日历展示年份
			cur_month: 0, //签到日历展示月份
			sign_arr: 0, //签到日历展示数据
    };
  },
  onLoad() {
    const res = uni.getSystemInfoSync();
    this.height = `${res.windowHeight}px`;
		var sign_list = [];
					sign_list[0] = 
		        [
		            {'date': 28,
		            'is_prev': 1}
		        ];
					// sign_list[0] = [];
					sign_list = [
		    {
		            'date': 28,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        },
		    {
		            'date': 29,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 30,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		       }
		
		    ,{
		            'date': 1,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 2,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
					      'date': 3,
					      'is_prev': '',
					      'is_next': 1,
					      'is_start': '',
					      'is_end': '',
					      'is_sign': '',
		        }
		
		    , {
		            'date': 4,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': 1,
		            'is_end': 1,
		            'is_sign': 1,
		        }
		
		    ,{
		            'date': 5,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 6,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': 1,
		            'is_end': '',
		            'is_sign': 1,
		        }
		
		    ,{
		            'date': 7,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': 1,
		        }
		
		    ,{
		            'date': 8,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': 1,
		        }
		
		    ,{
		            'date': 9,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': 1,
		            'is_sign': 1,
		        }
		
		    ,{
		            'date': 10,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 11,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 12,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    , {
		            'date': 13,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 14,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 15,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 16,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 17,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': 1,
		            'is_end': 1,
		            'is_sign': 1,
		        }
		
		    ,{
		            'date': 18,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 19,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 20,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		       }
		
		    ,{
		            'date': 21,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 22,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 23,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 24,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 25,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 26,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 27,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 28,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 29,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 30,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 31,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
		
		    ,{
		            'date': 1,
		            'is_prev': '',
		            'is_next': 1,
		            'is_start': '',
		            'is_end': '',
		            'is_sign': '',
		        }
						]
		
		
		console.log(sign_list);
		
					this.sign_arr = sign_list;
  },
  methods: {
    goCoinRecord() {
      uni.navigateTo({
        url: '/pages/personage/happiness-coin/coin-record'
      })
    },
    goBuyRecord() {
      uni.navigateTo({
        url: '/pages/personage/happiness-coin/buy-record'
      })
    },
		/**
		 * 日历
		 */
		DayNumOfMonth: function(year, month) {
			var oldmonth = month; //原参数
			var dys_array = [];
			month--;
			var d = new Date(year, month, 1); //获取当月1号的时间  
			d.setDate(d.getDate() + 32 - d.getDate());
			var days = 32 - d.getDate(); //计算当月有多少天
			var new_d = new Date(year, month, 1); //重新获取当月1号的时间
			//var get_s_w = new_d.getDay();
			var get_week = new_d.getDay(); //重新获取当月1号星期几
			if (get_week > 0) { //如果大于0，那么要取出上个月最后的几天
				var s_month = month - 1;
				var s_ds = new Date(year, s_month, 1); //获取上个月1号的时间 
				s_ds.setDate(s_ds.getDate() + 32 - s_ds.getDate());
				var s_days = 32 - s_ds.getDate(); //计算上个月有多少天
		
				var start_dys = s_days - get_week + 1; //需要从上个月哪一号开始补
				for (var i = start_dys; i <= s_days; i++) {
					// dys_array.push(i);
					dys_array.push({
						date: i,
						is_prev: true,
						is_next: false,
						is_start: false,
						is_end: false,
						is_sign: false
					});
				}
			}
			for (var n = 1; n <= days; n++) { //当月的所有天数
				dys_array.push({
					date: n,
					is_prev: false,
					is_next: false,
					is_start: false,
					is_end: false,
					is_sign: false
				});
			}
			var e_ds = new Date(year, month, days); //当月的最后一天
			var get_e_week = e_ds.getDay(); //当月的最后一天星期几
			var s_mot = 6 - parseInt(get_e_week); //计算还需补充下一个月的天数
			if (s_mot) {
				for (var t = 1; t <= s_mot; t++) {
					dys_array.push({
						date: t,
						is_prev: false,
						is_next: true,
						is_start: false,
						is_end: false,
						is_sign: false
					});
				}
			}
			console.log(dys_array);
			this.setData({
				sign_arr: dys_array
			})
		},
  }
};
</script>

<style lang="less" scoped>
$gold-color: #ca864e;
/* 日历 start */
	.mask-block {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.8);
		justify-content: center;
		align-items: center;
	}
	.mask-close-block {
		height: 120px;
		padding-top: 30px;
		justify-content: center;
		align-items: center;
	}
	.sign-block {
		width: 624px;
		// min-height: 784px;
		border-radius: 10px;
	}
	.sign-cont {
		background-color: @text-color-inverse;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	.mask-close {
		width: 90px;
		height: 90px;
		padding: 20px;
		background-color: #ccc;
	}
  .mask-header {
		height: 140px;
		position: relative;
	}
	.mask-tit {
		height: 98px;
		line-height: 98px;
		font-size: 34px;
		color: @text-color-inverse;
		text-align: center;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		background-image: -webkit-linear-gradient(to right, @orange, @orange-dark);
		background-image: linear-gradient(to right, @orange, @orange-dark);
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.mask-icon {
		position: absolute;
		top: 0;
		width: 24px;
		height: 80px;
		border-radius: 12px;
		background-color: @text-color-inverse;
		box-shadow: 0 4px 12px rgba($color: #000, $alpha: 0.3);
	}
	.mask-icon-left {
		left: 80px;
	}
	.mask-icon-right {
		right: 80px;
	}
	.mask-bar {
		width: 570px;
		height: 60px;
		background-color: @divider-color;
		border-radius: 30px;
		margin: 30px 0 0 30px;
		flex-direction: row;
		justify-content: space-between;
	}
	.bar-btn {
		width: 70px;
		height: 60px;
		position: relative;
		line-height: 60px;
		text-align: center;
		color: @gray-6;
	}
	.bar-month {
		width: 216px;
		line-height: 60px;
		text-align: center;
		font-size: 30px;
		color: @text-color;
	}
	.mask-week {
		height: 80px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		text-align: center;
	}
	.week-day {
		width: 82px;
		text-align: center;
		line-height: 80px;
		font-size: 22px;
		color: @gray-7;
	}
	.mask-days {
		width: 574px;
		margin-left: 24px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		overflow: hidden;
		margin-bottom: 60px;
	}
	.date-num {
		width: 82px;
		height: 36px;
		line-height: 36px;
		text-align: center;
		margin-bottom: 25px;
		color: @text-color;
		font-size: 24px;
	}
	.only-sign {
		width: 36px;
		margin: 0 23px;
	}
	.gray-month {
		color: #999;
	}
	.days-sign {
		background-color: #ffae00;
		color: #fff;
	}
	.start-sign {
		border-top-left-radius: 36px;
		border-bottom-left-radius: 36px;
	}
	.end-sign {
		border-top-right-radius: 36px;
		border-bottom-right-radius: 36px;
	}
	/* end */
.page-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 750px;
  height: 378px;
  background-color: #fbe1ca;
}
.nav-bar {
  flex-direction: row;
  justify-content: space-around;
  height: 44px;
  padding: 0 15px;
}
.navbar-title {
  flex: 1;
  font-size: 17px;
  line-height: 44px;
  text-align: center;
  font-weight: 500;
  color: #ca864e;
}
.navbar-text {
  color: #ca864e;
  line-height: 44px;
  font-size: 26px;
}
.sign-tag {
  width: 240px;
  height: 88px;
  line-height: 88px;
  text-align: center;
  color: #fff;
  font-size: 30px;
  background-image: linear-gradient(to right, rgba(249, 134, 107, 1), rgba(235, 88, 65, 1));
  border-top-left-radius: 44px;
  border-bottom-left-radius: 44px;
}
.sign-tag--complete {
  color: #8f8f94;
  background-image: none;
  background-color: #f0f0f0;
}
.tf-row-space-between {
  height: 290px;
  align-items: center;
}
.coin-number {
  font-size: 72px;
  line-height: 72px;
  font-weight: 500;
  color: $gold-color;
}
.coin-icon {
  font-size: 36px;
  color: $gold-color;
  justify-content: flex-end;
}
.function-box {
  padding: 10px 46px;
}
.function-box__text {
  font-size: 30px;
  text-align: center;
}
.function-box__icon {
  width: 98px;
  height: 98px;
  line-height: 98px;
  background-image: linear-gradient(to bottom right, rgba(255, 192, 23, 1), rgba(255, 161, 16, 1));
  border-radius: 49px;
  margin-bottom: 15px;
  color: #fff;
  text-align: center;
  font-size: 50px;
}
.function-box__icon--pay {
  background-image: linear-gradient(to bottom right, rgba(111, 202, 123, 1), rgba(85, 184, 98, 1));
}
.function-box__icon--payreceipt {
  background-image: linear-gradient(to bottom right, rgba(99, 166, 241, 1), rgba(68, 143, 228, 1));
}
.happiness-coin-title {
  font-size: 34px;
  font-weight: 500;
  color: $gold-color;
  text-align: center;
  margin-bottom: 38px;
}
.task-box {
  padding: 30px;
  margin: 0 30px;
  background-color: #fef8f2;
  border-radius: 10px;
}
.task-item {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 90px;
}
.task-item__icon {
  width: 90px;
  height: 90px;
  line-height: 90px;
  text-align: center;
  background-color: #ffdec8;
  border-radius: 45px;
  margin-right: 20px;
}
.task-item__title {
  font-size: 30px;
  font-weight: 500;
}
.task-item__remarks {
  font-size: 24px;
  color: @gray-7;
}
.task-item__remarks--gold {
  font-size: 24px;
  color: $gold-color;
}
.task-item__number {
  width: 150px;
  text-align: center;
  font-size: 38px;
  line-height: 90px;
  font-weight: 500;
  color: #eb5841;
}
.task-item__btn {
  width: 150px;
  height: 46px;
  line-height: 46px;
  text-align: center;
  background-image: linear-gradient(to bottom, rgba(249, 134, 107, 1), rgba(235, 88, 65, 1));
  border-radius: 23px;
  font-size: 24px;
  color: #fff;
}
.purchase-history {
  position: absolute;
  right: 30px;
  font-size: 24px;
  color: @gray-7;
  line-height: 44px;
}
.sale-area {
  padding: 0 30px;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.commodity-box {
  margin-bottom: 30px;
}
.commodity-image {
  width: 330px;
  height: 330px;
}
.commodity-name {
  font-size: 28px;
  margin: 20px 0;
}
.commodity-current-price {
  font-size: 30px;
  margin-right: 10px;
}
.commodity-original-price {
  font-size: 24px;
  color: @gray-7;
  text-decoration: line-through;
}
.commodity-coin {
  margin-top: 15px;
  font-size: 30px;
  color: #eb5841;
}
</style>
