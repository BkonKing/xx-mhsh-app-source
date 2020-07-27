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
  font-size: 0.28rem;
  overflow: hidden;
}

/*菜单*/
.flash-scroll {
  height: 2.18rem;
  background-image: linear-gradient(to right, #ffa912, #ffa812);
  position: relative;
}
/*倒计时*/
.flash-time {
  width: 7.1rem;
  height: 1rem;
  margin: 0.3rem auto;
  background-color: #fff;
  border-radius: 0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.count-icon {
  position: absolute;
  top: -0.44rem;
  left: 0.42rem;
  width: 0.28rem;
  height: 0.82rem;
}
.count-icon-right {
  left: auto;
  right: 0.42rem;
}
.count-rectangle {
  position: absolute;
  top: 0;
  left: 0.08rem;
  width: 0.12rem;
  height: 0.66rem;
  background-color: #383838;
  border-radius: 0.06rem;
  z-index: 5;
}
.count-circular {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0.28rem;
  height: 0.28rem;
  background-image: radial-gradient(#f2f2f4, #e2e2e4);
  border-radius:50%;
  z-index: 3;
}
/*.flash-time-over {
  color: #999;
}*/
.flash-time-text {
  margin-right: 0.3rem;
}
.count-time {
  display: flex;
}
.count-num {
  width: 0.66rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  background-color: #383838;
  border-radius: 0.1rem;
  color: #fff;
  font-size: 0.3rem;
}
.count-colon {
  height: 0.5rem;
  width: 0.3rem;
  position: relative;
}
.count-colon::before,.count-colon::after {
  content: '';
  position: absolute;
  width: 0.06rem;
  height: 0.06rem;
  background-color: #383838;
  border-radius: 50%;
  left: 0.12rem;
}
.count-colon::before {
  top: 0.14rem;
}
.count-colon::after {
  bottom: 0.14rem;
}
/* 列表 */
.flash-list {
  width: 7.1rem;
  margin: 0.3rem auto 0;
  overflow: hidden;
}
.flash-item {
  border-radius: 0.1rem;
  overflow: hidden;
  background-color: #fff;
  position: relative;
  margin-bottom: 0.3rem;
}
.item-small.flash-item {
  padding: 0.3rem;
  display: flex;
  justify-content: space-between;
}
.flash-goods-pic {
  width: 2.3rem;
  height: 2.3rem;
}
.flash-goods-info {
  width: 3.98rem;
  position: relative;
}
.flash-goods-name {
  color: #333;
  line-height: 0.42rem;
  height: 0.84rem;
}
.goods-tip-block {
  display: flex;
  height: 0.34rem;
  margin: 0.23rem 0 0.08rem;
}
.goods-tip {
  font-size: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.17rem;
  overflow: hidden;
}
.tip-pd {
  border: 1px solid #eb5841;
  color: #eb5841;
  width: 1rem;
}
.flash-goods-price {
  height: 0.78rem;
  line-height: 0.78rem;
  font-size: 0.42rem;
  color: #eb5841;
  font-weight: bold;
}
.flash-goods-price span {
  font-weight: normal;
  font-size: 0.24rem;
}
.goods-price-span2 {
  color: #999999;
  text-decoration: line-through;
}
.item-btn {
  position: absolute;
  right: 0.2rem;
  bottom: 0.3rem;
  width: 1.6rem;
  height: 0.86rem;
  padding: 0.1rem;
}
.item-btn div {
  height: 100%;
  line-height: 0.66rem;
  color: #ffffff;
  text-align: center;
  border-radius: 0.1rem;
  font-size: 0.26rem;
}
.btn-flash {
  background: linear-gradient(to right, #ffa110 , #ffbf17);
}
.btn-collage {
  background: linear-gradient(to right, #eb5842 , #f9856a);
}
.item-btn .btn-remind {
  border: 0.02rem solid #ffa110;
  color: #ffa110;
}
.item-btn .btn-remind-isset {
  border: 0.02rem solid #aaa;
  color: #8f8f94;
}
.item-btn .btn-over {
  color: #8f8f94;
}
.item-small .btn-over {
  text-align: right;
}
.btn-remind img {
  width: 0.36rem;
  height: 0.38rem;
  margin-right: 0.1rem;
}
.item-big {
  padding: 0.3rem;
}
.item-big .flash-goods-pic {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 0.2rem;
}
.item-big .flash-goods-info {
  width: 100%;
  text-align: center;
}
.item-big .flash-goods-name {
  line-height: 0.46rem;
  height: 0.46rem;
  font-size: 0.3rem;
}
.item-big .flash-goods-price {
  height: 0.72rem;
  margin-left: 0.2rem;
}
.item-big .flash-price-tip {
  height: 0.72rem;
}
.item-big .item-btn {
  position: inherit;
  width: 2.60rem;
  height: 0.66rem;
  margin: 0 auto;
  padding: 0;
  bottom: 0;
  right: 0;
}
.item-big .item-btn div {
  font-size: 0.28rem;
}
.item-big .btn-remind image {
  width: 0.36rem;
  height: 0.38rem;
  margin-right: 0.10rem;
}
/*弹窗*/
.mask-block {
  height: 2.73rem;
  padding: 0 0.5rem;
}
.mask-tit {
  height: 1.47rem;
  font-size: 0.3rem;
  color: #000;
}
</style>
