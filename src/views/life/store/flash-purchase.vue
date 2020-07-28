<template>
	<div class="app-body tf-bg" :style="{ 'min-height': windowHeight+'px'}">
    <div class="order-bar bar-flash"><van-nav-bar title="限时闪购" :border="false" fixed left-text="" left-arrow></van-nav-bar></div>
    <div class="bar-empty"></div>

    <div class="flash-header">
      <div scroll-x class="flash-scroll" scroll-left="scrollLeft">
        <!-- <div :class="[navList.length < 5 ? 'nav-block' : '']">
          <template v-for="(item,index) in navList">
            <div class="flash-nav cur" data-index="index" catchtap="navFunc">
              <div class="nav-time"><text>{{item.start_time_val}}</text></div>
              <div class="nav-line"></div>
              <div class="nav-status">{{item.status_txt}}</div>
            </div>
          </template>
        </div> -->
        <div class="flash-nav" data-index="0" catchtap="navFunc">
          <div class="nav-time"><text>4月30日\n21:00</text></div>
          <div class="nav-line"></div>
          <div class="nav-status">已结束</div>
        </div>
        <div class="flash-nav" data-index="1" catchtap="navFunc">
          <div class="nav-time"><text>4月30日\n21:00</text></div>
          <div class="nav-line"></div>
          <div class="nav-status">已结束</div>
        </div>
        <div class="flash-nav cur" data-index="2" catchtap="navFunc">
          <div class="nav-time"><text>4月30日\n21:00</text></div>
          <div class="nav-line"></div>
          <div class="nav-status">即将开始</div>
        </div>
        <div :class="[3 == tapIndex ? 'cur' : '','flash-nav']" data-index="3" catchtap="navFunc">
          <div class="nav-time"><text>4月30日\n21:00</text></div>
          <div class="nav-line"></div>
          <div class="nav-status">即将开始</div>
        </div>
        <div class="flash-nav" catchtap="navFunc">
          <div class="nav-time"><text>4月30日\n21:00</text></div>
          <div class="nav-line"></div>
          <div class="nav-status">即将开始</div>
        </div>
      </div>
    </div>
    <!-- <div class="flash-time flash-time-over" wx:if="{{navList[tapIndex].status == 1}}">本场已结束</div> -->
    <div class="flash-time flex-center">
      <div class="count-icon count-icon-left">
        <div class="count-rectangle"></div>
        <div class="count-circular"></div>
      </div>
      <div class="count-icon count-icon-right">
        <div class="count-rectangle"></div>
        <div class="count-circular"></div>
      </div>
      <div class="flash-time-text">本场还剩</div>
      <div class="count-time">
        <div class="count-num">23</div>
        <div class="count-colon"></div>
        <div class="count-num">23</div>
        <div class="count-colon"></div>
        <div class="count-num">23</div>
      </div>
    </div>

    <div class="flash-list">
      <template v-if="1==1">
        <div class="flash-item item-big">
          <div class="flash-goods-pic"><img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" /></div>
          <div class="flash-goods-info">
            <div class="flash-goods-name p-nowrap">爱的诗意黑巧克力礼盒</div>
            <div class="flash-price-tip flex-center">
              <div class="goods-tip tip-pd flex-center">拼单优惠</div>
              <div class="flash-goods-price">
                <span class="goods-price-span1">￥</span>180
                <span class="goods-price-span2">￥150</span>
              </div>
            </div>
          </div>
          <div class="item-btn">
            <!-- <div class="btn-flash">马上抢</div> -->
            <!-- <div class="btn-collage">邀请拼单</div> -->
            <!-- <div class="btn-remind flex-center"><img src="@/assets/img/icon_01.png" />提醒</div> -->
            <!-- <div class="btn-remind-isset flex-center">已设提醒</div> -->
            <div class="btn-over">已抢光</div>
          </div>

        </div>
        <div class="flash-item item-small">
          <div class="flash-goods-pic"><img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" /></div>
          <div class="flash-goods-info">
            <div class="flash-goods-name p-nowrapm">爱的诗意黑巧克力礼盒爱的诗意黑巧克力礼盒</div>
            <div class="goods-tip-block">
              <div class="goods-tip tip-pd">拼单优惠</div>
            </div>
            <div class="flash-goods-price">
              <span class="goods-price-span1">￥</span>180
              <span class="goods-price-span2">￥150</span>
            </div>
          </div>
          <div class="item-btn">
            <!-- <div class="btn-flash">马上抢</div> -->
            <div class="btn-collage">邀请拼单</div>
            <!-- <div class="btn-remind flex-center"><img src="@/assets/img/icon_01.png" />提醒</div> -->
            <!-- <div class="btn-remind-isset flex-center">已设提醒</div> -->
            <!-- <div class="btn-over">已抢光</div> -->
          </div>
        </div>
        <div class="flash-item item-small">
          <div class="flash-goods-pic"><img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" /></div>
          <div class="flash-goods-info">
            <div class="flash-goods-name p-nowrapm">爱的诗意黑巧克力礼盒爱的诗意黑巧克力礼盒</div>
            <div class="flash-goods-price">
              <span class="goods-price-span1">￥</span>180
              <span class="goods-price-span2">￥150</span>
            </div>
          </div>
          <div class="item-btn">
            <!-- <div class="btn-flash">马上抢</div> -->
            <!-- <div class="btn-collage">邀请拼单</div> -->
            <!-- <div class="btn-remind flex-center"><img src="@/assets/img/icon_01.png" />提醒</div> -->
            <!-- <div class="btn-remind-isset flex-center">已设提醒</div> -->
            <div class="btn-over">已抢光</div>
          </div>
        </div>
        <div class="flash-item item-small">
          <div class="flash-goods-pic"><img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" /></div>
          <div class="flash-goods-info">
            <div class="flash-goods-name p-nowrapm">爱的诗意黑巧克力礼盒</div>
            <div class="goods-tip-block">
              <div class="goods-tip tip-pd">拼单优惠</div>
            </div>
            <div class="flash-goods-price">
              <span class="goods-price-span1">￥</span>180
              <span class="goods-price-span2">￥150</span>
            </div>
          </div>
          <div class="item-btn">
            <!-- <div class="btn-flash">马上抢</div> -->
            <!-- <div class="btn-collage">邀请拼单</div> -->
            <div class="btn-remind flex-center"><img src="@/assets/img/icon_01.png" />提醒</div>
            <!-- <div class="btn-remind-isset flex-center">已设提醒</div> -->
            <!-- <div class="btn-over">已抢光</div> -->
          </div>
        </div>
        <div class="flash-item item-small">
          <div class="flash-goods-pic"><img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" /></div>
          <div class="flash-goods-info">
            <div class="flash-goods-name p-nowrapm">爱的诗意黑巧克力礼盒</div>
            <div class="flash-goods-price">
              <span class="goods-price-span1">￥</span>180
              <span class="goods-price-span2">￥150</span>
            </div>
          </div>
          <div class="item-btn">
            <!-- <div class="btn-flash">马上抢</div> -->
            <!-- <div class="btn-collage">邀请拼单</div> -->
            <!-- <div class="btn-remind flex-center"><img src="@/assets/img/icon_01.png" />提醒</div> -->
            <div class="btn-remind-isset flex-center">已设提醒</div>
            <!-- <div class="btn-over">已抢光</div> -->
          </div>
        </div>
      </template>
    </div>

    <div class="mask-bg">
      <div class="mask-block">
        <div class="mask-close">
          <img class="img-100" src="@/assets/img/close.png" />
        </div>
        <div class="mask-tit flex-center">
          提醒消息将在活动开始时通知您
        </div>
        <div class="mask-btn flex-between">
          <div class="mask-cancel-btn flex-center">取消</div>
          <div class="mask-sure-btn flex-center">确定</div>
        </div>
      </div>
    </div>

	</div>
</template>

<script>
import { NavBar } from 'vant'

// import '@/styles/life.css'
export default {
  components: {
    [NavBar.name]: NavBar
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      navList: ['全部全部全部', '9.9封顶', '19.9封顶', '29.9封顶', '1929.9封顶'],
      tapIndex: 0, // 菜单选中项
      tapStatus: 0, // 菜单选中项状态 1已结束 2进行中 3即将开始
      scrollLeft: '' // 滚动菜单移动距离
    }
  },
  methods: {
    onSubmit: function () {

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

/*菜单*/
.flash-scroll {
  height: 218px;
  background-image: linear-gradient(to right, #ffa912, #ffa812);
  position: relative;
}
/*倒计时*/
.flash-time {
  width: 710px;
  height: 1px;
  margin: 30 auto;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.count-icon {
  position: absolute;
  top: -44px;
  left: 42px;
  width: 28px;
  height: 82px;
}
.count-icon-right {
  left: auto;
  right: 42px;
}
.count-rectangle {
  position: absolute;
  top: 0;
  left: 8px;
  width: 12px;
  height: 66px;
  background-color: #383838;
  border-radius: 6px;
  z-index: 5;
}
.count-circular {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 28px;
  height: 28px;
  background-image: radial-gradient(#f2f2f4, #e2e2e4);
  border-radius:50%;
  z-index: 3;
}
/*.flash-time-over {
  color: #999;
}*/
.flash-time-text {
  margin-right: 30px;
}
.count-time {
  display: flex;
}
.count-num {
  width: 66px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #383838;
  border-radius: 10px;
  color: #fff;
  font-size: 30px;
}
.count-colon {
  height: 50px;
  width: 30px;
  position: relative;
}
.count-colon::before,.count-colon::after {
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: #383838;
  border-radius: 50%;
  left: 12px;
}
.count-colon::before {
  top: 14px;
}
.count-colon::after {
  bottom: 14px;
}
/* 列表 */
.flash-list {
  width: 710px;
  margin: 30rem auto 0;
  overflow: hidden;
}
.flash-item {
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
  position: relative;
  margin-bottom: 30px;
}
.item-small.flash-item {
  padding: 30px;
  display: flex;
  justify-content: space-between;
}
.flash-goods-pic {
  width: 230px;
  height: 230px;
}
.flash-goods-info {
  width: 398px;
  position: relative;
}
.flash-goods-name {
  color: #333;
  line-height: 42px;
  height: 84px;
}
.goods-tip-block {
  display: flex;
  height: 34px;
  margin: 23rem 0 8px;
}
.goods-tip {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 17px;
  overflow: hidden;
}
.tip-pd {
  border: 1px solid #eb5841;
  color: #eb5841;
  width: 1px;
}
.flash-goods-price {
  height: 78px;
  line-height: 78px;
  font-size: 42px;
  color: #eb5841;
  font-weight: bold;
}
.flash-goods-price span {
  font-weight: normal;
  font-size: 24px;
}
.goods-price-span2 {
  color: #999999;
  text-decoration: line-through;
}
.item-btn {
  position: absolute;
  right: 20px;
  bottom: 30px;
  width: 160px;
  height: 86px;
  padding: 10px;
}
.item-btn div {
  height: 100%;
  line-height: 66px;
  color: #ffffff;
  text-align: center;
  border-radius: 10px;
  font-size: 26px;
}
.btn-flash {
  background: linear-gradient(to right, #ffa110 , #ffbf17);
}
.btn-collage {
  background: linear-gradient(to right, #eb5842 , #f9856a);
}
.item-btn .btn-remind {
  border: 2px solid #ffa110;
  color: #ffa110;
}
.item-btn .btn-remind-isset {
  border: 2px solid #aaa;
  color: #8f8f94;
}
.item-btn .btn-over {
  color: #8f8f94;
}
.item-small .btn-over {
  text-align: right;
}
.btn-remind img {
  width: 36px;
  height: 38px;
  margin-right: 10px;
}
.item-big {
  padding: 30px;
}
.item-big .flash-goods-pic {
  width: 30px;
  height: 30px;
  margin: 0 auto 20px;
}
.item-big .flash-goods-info {
  width: 100%;
  text-align: center;
}
.item-big .flash-goods-name {
  line-height: 46px;
  height: 46px;
  font-size: 30px;
}
.item-big .flash-goods-price {
  height: 72px;
  margin-left: 20px;
}
.item-big .flash-price-tip {
  height: 72px;
}
.item-big .item-btn {
  position: inherit;
  width: 260px;
  height: 66px;
  margin: 0 auto;
  padding: 0;
  bottom: 0;
  right: 0;
}
.item-big .item-btn div {
  font-size: 28px;
}
.item-big .btn-remind image {
  width: 36px;
  height: 38px;
  margin-right: 10px;
}
/*弹窗*/
.mask-block {
  height: 273px;
  padding: 0 50px;
}
.mask-tit {
  height: 147px;
  font-size: 30px;
  color: #000;
}
</style>
