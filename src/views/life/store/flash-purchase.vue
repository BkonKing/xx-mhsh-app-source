<template>
	<div class="app-body">
    <div class="order-bar bar-flash">
      <van-nav-bar
        title="限时闪购"
        fixed
        :border="false"
        placeholder
        left-arrow
        @click-left="$router.go(-1)"
      ></van-nav-bar>
    </div>
  
    <div id="flash-top" :class="[navList.length < 5 ? 'flex-center' : '', 'flash-header']">
      <div class="flash-scroll">
        <scrollBar direction="x" :activeIndex="tapIndex">
          <div
            class=""
            v-for="(item, index) in navList"
            :key="index"
            @click="navFun(index)"
            :class="[tapIndex == index ? 'cur' : '','flash-nav']"
          >
            <div>
              <div class="nav-time" v-html="item.start_time_val"></div>
              <div class="nav-line"></div>
              <div class="nav-status">{{item.status_txt}}</div>
            </div>
          </div>
        </scrollBar>
      </div>
    </div>
    <!-- <div class="flash-time flash-time-over" v-if="{{navList[tapIndex].status == 1}}">本场已结束</div> -->
    <div class="flash-time flex-center">
      <div class="count-icon count-icon-left">
        <div class="count-rectangle"></div>
        <div class="count-circular"></div>
      </div>
      <div class="count-icon count-icon-right">
        <div class="count-rectangle"></div>
        <div class="count-circular"></div>
      </div>
      
      <template v-if="navList.length > 0">
        <div v-show="navList[tapIndex].status == 1" class="flash-time-text">本场已结束</div>
        <div v-show="navList[tapIndex].status == 2" class="flash-time-text">本场还剩</div>
        <van-count-down v-show="navList[tapIndex].status == 2" class="count-time" ref="countDown" :auto-start="false" :time="time" @finish="finish">
          <template v-slot="timeData">
            <span class="count-num">{{ timeData.hours<10 ? '0'+timeData.hours : timeData.hours }}</span>
            <div class="count-colon"></div>
            <span class="count-num">{{ timeData.minutes<10 ? '0'+timeData.minutes : timeData.minutes }}</span>
            <div class="count-colon"></div>
            <span class="count-num">{{ timeData.seconds<10 ? '0'+timeData.seconds : timeData.seconds }}</span>
          </template>
        </van-count-down>
        <div v-show="navList[tapIndex].status == 3">
          <div class="flash-time-text">即将开始</div>
        </div>
      </template>
    </div>
    <div class="scroll-body" id="flash-body">
      <van-tabs v-model="active" swipeable swipe-threshold="10" @change="changeNav">
        <van-tab v-for="(item, index) in navList" :title="item.status_txt">
          <van-list
              v-model="loading"
              :finished="finished"
              finished-text=""
              @load="onLoad"
            >
            <div class="flash-list">
              <template v-for="(item,index) in listData">
                <div @click="linkFunc(5,{id:item.goods_id})" :class="[index==0 ? 'item-big' : 'item-small','flash-item']">
                  <div class="flash-goods-pic">
                    <img class="img-100" :src="item.thumb" />
                  </div>
                  <div class="flash-goods-info">
                    <div class="flash-goods-name p-nowrap">{{item.goods_name}}</div>
                    <template v-if="index==0">
                      <div class="flash-price-tip flex-center">
                        <div v-if="item.price_status==2" class="goods-tip tip-pd flex-center">拼单优惠</div>
                        <div class="flash-goods-price">
                          <span class="goods-price-span1">￥</span>{{item.now_price/100}}
                          <span class="goods-price-span2">￥{{item.y_price/100}}</span>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <div class="goods-tip-block">
                        <div v-if="item.price_status==2" class="goods-tip tip-pd">拼单优惠</div>
                      </div>
                      <div class="flash-goods-price">
                        <span class="goods-price-span1">￥</span>{{item.now_price/100}}
                        <span class="goods-price-span2">￥{{item.y_price/100}}</span>
                      </div>
                    </template>
                  </div>
                  <div class="item-btn">
                    <template v-if="tapStatus > 1">
                      <template v-if="tapStatus == 2">
                        <template v-if="item.goods_num > 0 && item.is_over == 0">
                          <div class="btn-collage" v-if="item.price_status == 2 && item.is_partake">邀请拼单</div>
                          <div class="btn-flash" v-else>马上抢</div>
                        </template>
                        <div v-else class="btn-over">已抢光</div>
                      </template>
                      <template v-else>
                        <div v-if="!item.is_set" class="btn-remind flex-center" @click.stop="remindFunc(index,item.goods_id)" v-txAnalysis="{eventId: 19}"><img src="@/assets/img/icon_01.png" />提醒</div>
                        <div v-else class="btn-remind-isset flex-center">已设提醒</div>
                      </template>
                    </template>
                  </div>
                </div>
              </template>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>

    <remind-swal 
    :show-swal="showSwal"
    :remind-tit="remindTit"
    @closeSwal="closeSwal"
    @sureSwal="sureSwal()">
    </remind-swal>
	</div>
</template>

<script>
import { NavBar, CountDown, List, Toast, Tab, Tabs } from 'vant'
import scrollBar from '@/components/scroll-bar'
import remindSwal from './../components/remind-swal'
import { mapGetters } from 'vuex'
import { getFlashNav, getFlashGoods, getFlashGoodsOne, remindSend } from '@/api/life.js'
export default {
  name: 'flashPurchase',
  components: {
    [NavBar.name]: NavBar,
    [CountDown.name]: CountDown,
    [List.name]: List,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    scrollBar,
    remindSwal
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      time: '',
      active: 0,
      tapIndex: 0, // 菜单选中项
      tapStatus: 0, // 菜单选中项状态 1已结束 2进行中 3即将开始
      model_txt: '',//通知消息提示词
      showSwal: false,       //提醒弹窗
      remindTit: '提醒消息将在活动开始时通知您',         //提醒标题
      set_id: '',            //提醒的商品id
      set_index: '',         //点击提醒的商品index
      ollage_id: '',         //当前选中的闪购id
      navList: [],           //菜单列表
      listData: [],          //页面数据列表
      noMoreHidden: true,    //上拉加载更多，没有更多是否隐藏
      userId: '',            //用户uid   
      page: 1,   //页码
      pageSize: 10,  //分页条数
      isEmpty: false, //是否为空
      loading: false,
      finished: true
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  created () {
    this.getData();
    api.addEventListener(
      {
        name: 'swiperight'
      },
      (ret, err) => {
        
      }
    )
  },
  activated () {
    if (this.scrollLeft) {
      document.getElementById('flash-top').getElementsByClassName(
          'scrollBarContent'
        )[0].scrollLeft = this.scrollLeft
    }
    if (this.scrollTop) {
      document
      .getElementById('flash-body')
      .getElementsByClassName('van-tabs__content')[0]
      .scrollTop = this.scrollTop
    }
  },
  methods: {
    onLoad() {
      console.log(1234);
      // 异步更新数据
      this.getGoodsData();
      return;
    },
    updateOne(){
      getFlashGoodsOne({
        goods_id: this.tapId,
        ollage_id: this.ollage_id
      }).then(res => {
        if (res.success) {
          if(res.data.list_data && res.data.list_data.length){
            var listOne = res.data.list_data[0];
            for (var i=0; i < this.listData.length; i++) {
              if(this.listData[i].goods_id == this.tapId){
                this.listData.splice(i,1,listOne);
                break;
              }
            }
          }
        }
      })
    },
    getData () {
      getFlashNav().then(res => {
        if (res.success) {
          this.navList = res.data.nav_list;
          this.active = res.data.tap_index;
          this.tapIndex = res.data.tap_index;
          this.tapStatus = res.data.nav_list[res.data.tap_index].status;
          this.model_txt = res.data.model_txt;
          this.ollage_id = res.data.nav_list[res.data.tap_index].id;
          this.finished = false;
          if(this.tapStatus == 2){
            let newTime = parseInt(new Date().getTime());
            console.log(newTime)
            this.time = res.data.nav_list[res.data.tap_index].end_time*1000-newTime;
            this.$nextTick(() => {
              this.start();
            });
          }
        }
      })
    },
    getGoodsData () {
      getFlashGoods({
        page: this.page,
        ollage_id: this.ollage_id
      }).then(res => {
        if (res.success) {
          this.flag = true;
          this.listData = this.page == 1 ? res.data.list_data : this.listData.concat(res.data.list_data);
          this.isEmpty = this.page == 1 && res.data.list_data.length ==0 ? true : false;
          if(res.data.list_data.length < res.pageSize){
            this.finished = true;
            this.flag = true;
          }else {
            this.page = this.page+1;
            this.flag = false;
          }
          this.loading = false;
        }
      })
    },
    listInit(){
      this.listData = [];
      this.page = 1;
      this.finished = false;
      this.loading = true;
      if(!this.flag){
        this.getGoodsData();
      }
    },
    //倒计时开始
    start() {
      this.$refs.countDown.start();
    },
    //倒计时暂停
    pause() {
      this.$refs.countDown.pause();
    },
    //倒计时结束
    finish() {
      this.getData();
      this.getGoodsData();
    },
    //菜单点击
    navFun(index) {
      this.active = index;
      console.log(1223);
    },
    changeNav(index) {
      this.active = index
      this.tapIndex = index;
      this.tapStatus = this.navList[index].status;
      this.ollage_id = this.navList[index].id;
      this.flag = false;
      this.listInit();
      let newTime = parseInt(new Date().getTime()/1000);
      let startTime = this.navList[index].start_time;
      if(newTime >=startTime && this.tapStatus == 3){
        if(newTime >=startTime){   //当前时间大于等于活动开始时间
          this.getData();
        }
      }
    },
    closeSwal(data){
      console.log(data)
      this.showSwal = data == 1 ? true : false;
    },

    /**
     * 提醒
    */
    remindFunc(index, id) {
      const that = this;
      this.set_id = id;
      this.set_index = index;
      let newTime = parseInt(new Date().getTime()/1000);
      let overTime = this.navList[this.tapIndex].start_time;
      if(newTime >=overTime){   //当前时间大于等于活动开始时间
        Toast('该商品已开抢');
        setTimeout(() => {
          this.getData();
          that.page = 1;
          that.getGoodsData();
        }, 1500);
      }else {
        this.showSwal = true;
      }
    },
    /**
     * 提醒回调
    */
    sureSwal: function (e) {
      const that = this;
      this.closeSwal(0);
      remindSend({
        goods_id: this.set_id,
        ollage_id: this.navList[this.tapIndex].id
      }).then(res => {
        if (res.success) {
          Toast(res.message);
          this.listData[this.set_index].is_set = true;
        }
      })
    },
    linkFunc (type,obj={}) {
      this.tapId = obj.id;
      switch (type){
        case 5:
        this.$router.push({
          path: '/store/goods-detail',
          query: {
            id: obj.id
          }
        })
        break;
      }
    },
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if(from.name=='goodsDetail'){
        vm.updateOne();
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    if(to.name == 'life'){
      this.$destroy();
      this.$store.commit('deleteKeepAlive',from.name);
    }
    const el = document.getElementById('flash-top').getElementsByClassName(
          'scrollBarContent'
        )
    this.scrollLeft = (el.length && el[0].scrollLeft) || 0
    console.log(document.getElementById('flash-body'));
    const el2 = document
      .getElementById('flash-body')
      .getElementsByClassName('van-tabs__content')
    this.scrollTop = (el2.length && el2[0].scrollTop) || 0
    next();
  }
}
</script>

<style scoped  src="../../../styles/life.css"></style>
<style scoped>
.scroll-body {
  height: calc(100% - 466px);
  overflow-y: auto;
  position: relative;
}
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
}

/*菜单*/
.flash-header {
  background-image: linear-gradient(to bottom, #38b3ef, #68e0cf);
  /*background-image: linear-gradient(to right, #ffa912, #ffa812);*/
}
.flash-scroll {
  height: 218px;
  position: relative;
  display: flex;
  overflow-x: auto;
}
.flash-scroll::-webkit-scrollbar {
  display: none;
}

.nav-block {
  display: flex;
  justify-content: center;
}
.flash-header.flex-center .flash-nav {
  width: 187px;
}
.flash-nav {
  flex-shrink: 0;
  width: 190px;
  position: relative;
  color: #fff;
  text-align: center;
  overflow: hidden;
  opacity: 0.6;
  display: inline-block;
}
.nav-time {
  line-height: 42px;
  font-size: 30px;
  height: 122px;
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: normal;
}
.nav-line {
  height: 2px;
  width: 100px;
  background-color: #fff;
  margin: 0 auto 8px;
}
.nav-status {
  height: 48px;
  line-height: 48px;
  width: 160px;
  font-size: 24px;
  margin: 0 auto;
}
.flash-nav.cur {
  opacity: 1;
}
.flash-nav.cur .nav-line {
  opacity: 0;
}
.flash-nav.cur .nav-status {
  background-color: #ffffff;
  border-radius: 24px;
  color: #67dfd0;
}
.flash-nav.cur .nav-time {
  line-height: 52px;
  font-size: 34px;
}
/*倒计时*/
.flash-time {
  width: 710px;
  height: 100px;
  margin: 30px auto;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: 4px 0 9px rgba(0,0,0,0.1)
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
  margin: 0 auto;
  min-height: 500px;
  /*overflow: hidden;*/
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
  background-color: #f4f4f4;
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
  margin: 23px 0 8px;
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
  border: 1.5px solid #eb5841;
  color: #eb5841;
  width: 100px;
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
  background: #2da0fb;
}
.btn-collage {
  background: linear-gradient(to right, #eb5842 , #f9856a);
}
.item-btn .btn-remind {
  border: 2px solid #2da0fb;
  color: #2da0fb;
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
  width: 300px;
  height: 300px;
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
