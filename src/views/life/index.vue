<template>
  <div class="app-body">
    <!-- <div class="status-box"></div> -->
    <div class="fixed-top" id="life-top" :style="{'top':$store.state.paddingTop+'px'}">
      <div class="life-header">
        <div class="header-tit flex-between">
          <div class="font-34 font-weight">美好优选</div>
          <div class="header-right flex-align-center">
            <div class="header-link" @click="linkFunc(6)"><img class="img-100" src="@/assets/img/icon_16.png" /></div>
            <div class="header-link" @click="linkFunc(1)" v-txAnalysis="{eventId: 9}"><img class="img-100" src="@/assets/img/icon_17.png" /></div>
          </div>
        </div>
      </div>
      <div class="public-nav">
        <scrollBar direction="x" :activeIndex="activeIndex">
          <div
            class="scroll-barItem"
            v-for="(item, index) in navList"
            :key="index"
            @click="navFun(index)"
            :class="index === activeIndex ? 'active' : null"
          >
            <div>{{item.name}}</div>
          </div>
        </scrollBar>
      </div>
      <div v-if="activeIndex > 0 && navList[activeIndex].type == 2 && navList2.length" class="seconds-nav">
        <scrollBar direction="x" :activeIndex="activeIndex2">
          <div
            class="seconds-scroll-barItem"
            v-for="(item, index) in navList2"
            :key="index"
            @click="changeNav2(index, item.id)"
            :class="index === activeIndex2 ? 'active' : null"
          >
            <div>{{item.bargain_name}}</div>
          </div>
        </scrollBar>
      </div>
    </div>
    <div :class="[activeIndex > 0 && navList[activeIndex].type == 2 && navList2.length ? 'seconds-nav-show' : '','fixed-empty']"></div>

    <div :class="[activeIndex > 0 && navList[activeIndex].type == 2 && navList2.length ? 'scroll-body-two' : '','scroll-body']" id="life-body">
      <van-tabs v-model="active" :swipeable="swipeable" swipe-threshold="1" @change="changeNav">
        <van-tab v-for="(item, index) in navList" :key="index" :title="item.name">
          <!-- <template v-if="activeIndex==0 || (isChange&&activeIndex==0)"> -->
          <template v-if="index==0">
            <div class="life-home">
              <div v-if="bannerList.length > 0" class="life-swipe">
                <van-swipe :autoplay="3000" indicator-color="white">
                  <van-swipe-item v-for="(item,index) in bannerList"  @click="goLink(item.url)">
                    <img class="img-100" :src="item.img" />
                  </van-swipe-item>
                </van-swipe>
              </div>
              <div v-else class="banner-empty"></div>
              <div :class="[!navList2.length || !flashIcon || !nowMovieList.length ? 'flex-around' : '','tab-list flex-between']">
                <div v-if="navList2.length" class="tab-item flex" @click="selectNav(2)">
                  <img src="@/assets/img/icon_28.png" />
                  <div>9.9特卖</div>
                </div>
                <div v-if="flashIcon" class="tab-item flex" @click="selectNav(1)">
                  <img src="@/assets/img/icon_29.png" />
                  <div>限时闪购</div>
                </div>
                <div v-if="nowMovieList.length" class="tab-item flex" @click="linkFunc(8)">
                  <img src="@/assets/img/icon_30.png" />
                  <div>电影影院</div>
                </div>
                <div class="tab-item flex" @click="linkFunc(1)">
                  <img src="@/assets/img/icon_31.png" />
                  <div>全部分类</div>
                </div>
              </div>
              <div v-if="nowMovieList.length" class="life-session life-movie">
                <div class="movie-cont">
                  <div class="life-tit flex-between" @click="linkFunc(8)">
                    <div class="flex-align-center">
                      <span>热映电影</span>
                    </div>
                    <div class="life-arrow-right"><van-icon name="arrow" /></div>
                  </div>
                  <div class="movie-list">
                    <div v-for="(item, index) in nowMovieList" :key="index" class="movie-item">
                      <div class="movie-pic" @click="linkFunc(9, {id: item.film_id})">
                        <div class="movie-tip flex-between">
                          <div class="moive-score">{{ item.score != 0 ? (parseFloat(item.score) / 10) : '' }}</div>
                          <div class="moive-look">{{ item.want_view | wantFormat }}想看</div>
                        </div>
                        <img class="img-100" :src="item.cover" />
                      </div>
                      <div class="movie-name p-nowrap" @click="linkFunc(9, {id: item.film_id})">{{ item.film_name }}</div>
                      <div class="movie-price flex-center" @click="linkFunc(9, {id: item.film_id,code: item.film_code})">低至{{ item.ticket_price }}元<van-icon name="arrow" /></div>
                    </div>
                  </div>
                </div>
              </div>
              <template v-for="(item) in lifeData">
                <template v-if="item.type == 2">
                  <div v-if="item.child && item.child.length > 0" class="life-session life-sale">
                    <div class="sale-cont">
                      <div class="life-tit flex-between" @click="selectNav(2)">
                        <div class="flex-align-center">
                          <span>{{item.bargain_name}}</span>
                        </div>
                        <div class="life-arrow-right"><van-icon name="arrow" /></div>
                      </div>
                      <div class="special-goods-list">
                        <div v-for="(val, key) in item.child" :key="key" @click="linkFunc(5,{id: val.goods_id})" class="life-goods-item">
                          <div class="life-goods-pic">
                            <img class="img-100" :src="val.thumb" />
                          </div>
                          <!-- <div class="life-goods-name color-222 font-24 p-nowrap">{{val.goods_name}}</div> -->
                          <div class="life-goods-price"><span>￥</span>{{val.te_price/100}} <span>￥{{val.s_price/100}}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else-if="item.type == 1">
                  <div v-if="item.child && item.child.length > 0" class="life-session life-flash">
                    <div class="flash-cont">
                      <div class="life-tit flex-between" @click="selectNav(1)">
                        <div class="flex-align-center">
                          <span>限时闪购</span>
                          <van-count-down v-if="item.ollage_info && item.ollage_info.is_start==1" class="life-countdown flex-align-center" ref="countDown" :auto-start="true" :time="item.ollage_info.end_time*1000-newTime" @finish="finish">
                            <template v-slot="timeData">
                              <span class="countdown-time">{{ timeData.hours<10 ? '0'+timeData.hours : timeData.hours }}</span>
                              <div class="countdown-point">:</div>
                              <span class="countdown-time">{{ timeData.minutes<10 ? '0'+timeData.minutes : timeData.minutes }}</span>
                              <div class="countdown-point">:</div>
                              <span class="countdown-time">{{ timeData.seconds<10 ? '0'+timeData.seconds : timeData.seconds }}</span>
                            </template>
                          </van-count-down>
                          <div v-if="item.ollage_info && item.ollage_info.is_start==0" class="flash-no-start">即将开始</div>
                        </div>
                        <div class="life-arrow-right"><van-icon name="arrow" /></div>
                      </div>
                      <div class="flash-goods-list">
                        <div v-for="(val, key) in item.child" :key="key" @click="linkFunc(5,{id: val.goods_id})" class="life-goods-item">
                          <div class="life-goods-pic">
                            <img class="img-100" :src="val.thumb" />
                          </div>
                          <div class="life-goods-name color-222 font-24 p-nowrap">{{val.goods_name}}</div>
                          <div class="life-goods-price"><span>￥</span>{{val.o_price/100}} <span>￥{{val.s_price/100}}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="bg-guodu"></div>
                  <template  v-if="item.special_type == 2">
                    <div v-if="item.child && item.child.length > 0" class="special-session flex-between">
                      <div class="special-list">
                        <template v-if="item.child.length < 4" v-for="(val, key) in item.child">
                          <div @click="selectNav(3, val.special_id)" class="height-345">
                            <img class="img-100" :src="val.special_thumb" />
                            <div class="special-tip">
                              <div class="p-nowrap">{{val.special_name}}</div>
                              <div class="p-nowrap">{{val.special_text}}</div>
                            </div>
                            <div class="special-tip-bg"></div>
                          </div>
                        </template>
                        <template v-else>
                          <div v-if="key==0" class="height-440" @click="selectNav(3, val.special_id)">
                            <img class="img-100" :src="val.special_thumb" />
                            <div class="special-tip">
                              <div class="p-nowrap">{{val.special_name}}</div>
                              <div class="p-nowrap">{{val.special_text}}</div>
                            </div>
                            <div class="special-tip-bg"></div>
                          </div>
                          <div v-if="key==2" class="height-345" @click="selectNav(3, val.special_id)">
                            <img class="img-100" :src="val.special_thumb" />
                            <div class="special-tip">
                              <div class="p-nowrap">{{val.special_name}}</div>
                              <div class="p-nowrap">{{val.special_text}}</div>
                            </div>
                            <div class="special-tip-bg"></div>
                          </div>
                          <div v-if="key==1" class="height-345" @click="selectNav(3, val.special_id)">
                            <img class="img-100" :src="val.special_thumb" />
                            <div class="special-tip">
                              <div class="p-nowrap">{{val.special_name}}</div>
                              <div class="p-nowrap">{{val.special_text}}</div>
                            </div>
                            <div class="special-tip-bg"></div>
                          </div>
                          <div v-if="key==3" class="height-440" @click="selectNav(3, val.special_id)">
                            <img class="img-100" :src="val.special_thumb" />
                            <div class="special-tip">
                              <div class="p-nowrap">{{val.special_name}}</div>
                              <div class="p-nowrap">{{val.special_text}}</div>
                            </div>
                            <div class="special-tip-bg"></div>
                          </div>
                        </template>
                      </div>
                    </div>
                  </template>
                  <template v-else-if="item.special_type == 1">
                    <div v-if="item.child && item.child.length > 0" class="life-session">
                      <div :class="[item.special_text ? '' : 'life-area-tit-small', 'life-tit life-area-tit flex-between']" @click="selectNav(3, item.special_id)">
                        <div class="font-34 font-weight flex-column-center">
                          <div class="area-text-tit">{{item.special_name}}</div>
                          <div class="area-text-detail">{{item.special_text}}</div>
                        </div>
                        <div class="life-arrow-right"><img class="img-100" src="@/assets/img/right_03.png" /></div>
                      </div>
                      <div class="life-goods-list flex-align-center" ref="scrollEl" @scroll="scrollEvent" @touchend="touchEnd">
                        <div v-for="(val, key) in item.child" @click="linkFunc(5,{id: val.goods_id})" class="life-goods-item">
                          <div class="life-goods-pic">
                            <img class="img-100" :src="val.thumb" />
                          </div>
                          <div class="life-goods-name color-222 font-24 p-nowrap">{{val.goods_name}}</div>
                          <div class="life-goods-price">￥{{val.s_price/100}} <span v-if="val.original_price && val.original_price!='0'">￥{{val.original_price/100}}</span></div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div v-if="item.special_thumb" @click="selectNav(3, item.special_id)" class="banner-session">
                      <img class="img-100" :src="item.special_thumb" />
                    </div>
                  </template>
                </template>
              </template>
            </div>
          </template>
          <template v-else>
            <template v-if="navList[index].type==1">
              <flash-page
                @scrollEvent="scrollEvent" @touchEnd="touchEnd"
                ref="flash"
              ></flash-page>
            </template>
            <template v-else-if="navList[index].type==2">
              <special-page
                ref="special"
                :bargain_id="bargain_id"
              ></special-page>
            </template>
            <template v-else-if="navList[index].type==3">
              <area-page
                :ref="'area'+index"
                :special_id="special_id"
                :navBarShow="navBarShow"
              ></area-page>
            </template>
          </template>
          <!-- <van-list
            v-model="loading"
            :finished="finished"
            finished-text=""
            @load="onLoad"
          >
        </van-list> -->
        </van-tab>
      </van-tabs>
    </div>

    <div @click="linkFunc(7)" class="cart-fixed" v-txAnalysis="{eventId: 14}"><img src="@/assets/img/icon_18.png" /><div class="cart-num" v-if="cart_num > 0">{{cart_num}}</div></div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Icon, CountDown, List, Toast, Tab, Tabs } from 'vant'
import scrollBar from '@/components/scroll-bar'
import { getLifeInfo, getBanner, getMenu } from '@/api/life.js'
import { getfilmlist } from '@/api/movie'
import flashPage from './components/flash-page'
import specialPage from './components/special-page'
import areaPage from './components/area-page'
import { bMapGetLocationInfo } from '@/utils/util'
export default {
  components: {
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [CountDown.name]: CountDown,
    [List.name]: List,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    scrollBar,
    flashPage,
    specialPage,
    areaPage
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      lifeData: [], // 生活
      active: 0,
      activeIndex: 0, // 一级菜单选中项
      activeIndex2: 0, // 二级菜单选中项
      navList: [], // 一级菜单
      navList2: [], // 二级菜单
      bargain_id: '',
      initId: 0,
      navBarShow: false,
      special_id: '',
      newTime: '', // 当前时间
      bannerList: [], // 轮播图
      nowMovieList: [], // 热映电影
      cart_num: 0,
      isChange: false, // 菜单是否变动
      remindTit: '提醒消息将在活动开始时通知您', // 提醒标题
      flashIcon: true, // 闪购跳转图标是否显示

      listData: [], // 分类商品
      loading: false,
      finished: true,
      swipeable: true
    }
  },
  created () {

  },
  activated () {
    var cartList = api.getPrefs({ sync: true, key: 'cart' }) || []
    var cart_num = 0
    if (cartList && cartList.length > 0) {
      cartList = JSON.parse(cartList)
      for (var i = 0; i < cartList.length; i++) {
        cart_num += parseInt(cartList[i].count)
      }
    }
    this.cart_num = cart_num
    this.page = 1
    this.isRefresh = true
    // this.navList = [];
    // this.activeIndex = 0;
    // this.activeIndex2 = 0;
    this.getData()
    if (this.scrollTop) {
      document
        .getElementById('life-body')
        .getElementsByClassName(
          'van-tabs__content'
        )[0].scrollTop = this.scrollTop
    }
    if (this.scrollLeft) {
      document.getElementById('life-top').getElementsByClassName(
        'scrollBarContent'
      )[0].scrollLeft = this.scrollLeft
    }
    if (this.scrollLeft2 && document.getElementById('flash-top') && document.getElementById('flash-top').getElementsByClassName('scrollBarContent')) {
      document.getElementById('flash-top').getElementsByClassName(
        'scrollBarContent'
      )[0].scrollLeft = this.scrollLeft2
    }
  },
  methods: {
    onLoad () {
      this.getGoodsData()
    },
    getData () {
      getLifeInfo().then(res => {
        if (res.success) {
          this.lifeData = res.data
          this.newTime = parseInt(new Date().getTime())
        }
      })
      getBanner().then(res => {
        if (res.success) {
          this.bannerList = res.data
        }
      })
      // 获取影片资料(列表)
      this.getLocationInfo()
      // if (this.activeIndex == 0) {
      // }
      this.isChange = false
      this.getGoodsData()
    },
    // 获取当前地址信息
    getLocationInfo () {
      // adCode:行政区编码
      bMapGetLocationInfo().then(data => {
        const { adCode } = data
        this.getfilmlist(String(adCode).substring(0, 4) + '00')
      }).catch(() => {
        this.getfilmlist()
      })
    },
    // 获取热映影片资料(列表)
    getfilmlist (cityId = '') {
      getfilmlist({
        type: 1,
        page_index: 1,
        page_size: 3,
        city_id: cityId
      }).then(({ data }) => {
        this.nowMovieList = data
      })
      this.isChange = false
      this.getGoodsData()
    },
    getGoodsData () {
      getMenu().then(res => {
        if (res.success) {
          this.flag = true
          // if (this.isRefresh) {
          this.isRefresh = false
          var navArr = this.navList.concat()
          if (navArr.length && res.data.length) {
            if (JSON.stringify(navArr) != JSON.stringify(res.data)) {
              this.isChange = true
              this.navList = []
              this.navList2 = []
              this.active = 0
              this.activeIndex = 0
              this.activeIndex2 = 0
            }
          }
          // }
          if (this.navList.length == 0) {
            this.navList = this.navList.concat(res.data)
            let isFlash = false
            this.navList.forEach(item => {
              if (item.type == 2 && item.child) {
                this.navList2 = item.child
                this.initId = this.navList2[0].id
              }
              if (item.type == 1) {
                isFlash = true
              }
            })
            this.flashIcon = isFlash && true
          } else {
            // this.listData = this.page == 1 ? res.data.goods_list : this.listData.concat(res.data.goods_list)
            // this.isEmpty = !!(this.page == 1 && res.data.goods_list.length == 0)
            // if (res.data.goods_list.length < res.pageSize) {
            //   this.finished = true
            //   this.flag = true
            // } else {
            //   this.flag = false
            //   this.page = this.page + 1
            // }
            // this.loading = false
          }
        }
      })
    },
    compare (origin, target) {
      if (typeof target !== 'object') {
        // target不是对象/数组
        return origin === target // 直接返回全等的比较结果
      }
      if (typeof origin !== 'object') {
        // origin不是对象/数组
        return false // 直接返回false
      }
      for (const key of Object.keys(target)) {
        // 遍历target的所有自身属性的key
        if (!this.compare(origin[key], target[key])) {
          // 递归比较key对应的value，
          // value不等，则两对象不等，结束循环，退出函数，返回false
          return false
        }
      }
      // 遍历结束，所有value都深度比较相等，则两对象相等
      return true
    },
    goLink (url) {
      this.$router.push(url)
    },
    navFun (index) {
      this.active = index
    },
    // 闪购更多,专区更多
    selectNav (navType, id) {
      for (let i = 0; i < this.navList.length; i++) {
        if (this.navList[i].type == navType) {
          if (navType != 3 || (navType == 3 && this.navList[i].special_id == id)) {
            this.navFun(i)
            break
          }
        }
      }
    },
    changeNav (index = '') {
      this.bargain_id = this.initId
      this.active = index
      this.activeIndex = index
      this.activeIndex2 = 0
      if (index > 0) {
        this.flag = false
        if (this.navList[index].type == 1) {
          if (this.$refs.flash[0]) {
            this.$refs.flash[0].listInit()
          }
        }
        if (this.navList[index].type == 2 && this.navList[index].child) {
          this.navList2 = this.navList[index].child
          this.bargain_id = this.navList[index].child[0].id
          if (this.$refs.special[0]) {
            this.$refs.special[0].listInit()
          }
        } else {
          this.navList2 = []
        }
        if (this.navList[index].type == 3) {
          this.special_id = this.navList[index].special_id
          this.$nextTick(() => {
            const key = 'area' + index
            if (this.$refs[key]) {
              console.log(this.$refs[key][0])
              this.$refs[key][0].listInit()
            }
          })
        }
        this.listInit()
      } else {
        document
          .getElementById('life-body')
          .getElementsByClassName(
            'van-tabs__content'
          )[0].scrollTop = 0
        this.flag = true
        // this.page = 1;
        // this.finished = true;
      }
    },
    changeNav2 (index, id) {
      this.activeIndex2 = index
      this.bargain_id = id
      this.$nextTick(() => {
        this.$refs.special[0].listInit()
      })
      this.flag = false
      // this.activeIndex2 = index
      // this.listInit()
    },
    listInit () {
      // this.listData = []
      // this.page = 1
      // this.finished = false
      // this.loading = true
      if (!this.flag) {
        this.getGoodsData()
      }
    },
    // 倒计时开始
    start () {
      this.$refs.countDown.start()
    },
    // 倒计时暂停
    pause () {
      this.$refs.countDown.pause()
    },
    // 倒计时结束
    finish () {
      Toast('倒计时结束')
    },
    // 特卖横向滚动
    scrollEvent () {
      this.swipeable = false
    },
    // 结束横向滚动
    touchEnd () {
      this.swipeable = true
    },
    // bodyScroll () {
    //   console.log('body')
    // },
    linkFunc (type, obj = {}) {
      switch (type) {
        case 1:
          this.$router.push({
            name: 'releaseType'
          })
          // this.$router.push('/store/goods-classify')
          break
        case 2:
          this.$router.push('/store/flash-purchase')
          break
        case 3:
          this.$router.push('/store/special-sale')
          break
        case 4:
          this.$router.push({
            path: '/store/special-area',
            query: {
              id: obj.id
            }
          })
          break
        case 5:
          this.$router.push({
            path: '/store/goods-detail',
            query: {
              id: obj.id
            }
          })
          break
        case 6:
          this.$router.push('/store/search')
          break
        case 7:
          this.$router.push('/life/cart')
          break
        case 8:
          this.$router.push('/life/movie/index')
          break
        case 9:
          this.$router.push({
            name: 'movieFilmDetails',
            query: {
              id: obj.id
            }
          })
          break
        case 10:
          this.$router.push({
            name: 'movieSelectCinema',
            query: {
              id: obj.id,
              code: obj.code
            }
          })
          break
      }
    }
  },
  filters: {
    // 超过一万则以万为单位
    wantFormat (value) {
      const val = parseInt(value)
      return val > 9999 ? `${Math.ceil(val / 10000)}万` : val
    }
  },
  beforeRouteLeave (to, from, next) {
    const el = document
      .getElementById('life-body')
      .getElementsByClassName('van-tabs__content')
    this.scrollTop = (el.length && el[0].scrollTop) || 0
    const el2 = document.getElementById('life-top').getElementsByClassName(
      'scrollBarContent'
    )
    this.scrollLeft = (el2.length && el2[0].scrollLeft) || 0
    if (document.getElementById('flash-top') && document.getElementById('flash-top').getElementsByClassName('scrollBarContent')) {
      const el3 = document.getElementById('flash-top').getElementsByClassName(
        'scrollBarContent'
      )
      this.scrollLeft2 = (el3.length && el3[0].scrollLeft) || 0
    }
    next()
  }
}
</script>

<style scoped  src="../../styles/life.css"></style>
<style scoped lang="less">
.scroll-body {
  height: calc(100% - 176px);
  overflow-y: auto;
  position: relative;
}
.scroll-body-two.scroll-body {
  height: calc(100% - 268px);
}
.app-body {
  background-color: #fff;
  font-size: 28px;
  color: #222;
}
.fixed-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
}
.fixed-empty {
  /*height: 176px;*/
  /*height: 206px;*/
  height: 176px;
}
.seconds-nav-show.fixed-empty {
  height: 268px;
}
.life-header {
  background-color: #fff;
}
.header-tit {
  height: 88px;
  padding-left: 0.3rem;
}
.header-right {
  height: 100%;
}
.header-link {
  width: 88px;
  height: 88px;
  padding: 22px;
}
.header-link {
  margin-right: 10px;
}

/*导航*/
.public-nav {
  height: 89px;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
}
.scroll-barItem {
  font-size: 30px;
  display: inline-block;
}
.scroll-barItem div {
  height: 88px;
  line-height: 88px;
  padding: 0 30px;
  color: #222;
  position: relative;
}
.scroll-barItem.active div {
  color: #eb5841;
  font-size: 34px;
  font-weight: bold;
}
.scroll-barItem.active div:after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: -30px;
  width: 60px;
  height: 4px;
  border-radius: 2px;
  background-color: #eb5841;
}
.seconds-nav {
  height: 90px;
  background-color: #fff;
  padding: 20px 0;
}
.seconds-scroll-barItem {
  display: inline-block;
}
.seconds-scroll-barItem:first-child {
  margin-left: 30px;
}
.seconds-scroll-barItem div {
  height: 50px;
  line-height: 50px;
  padding: 0 30px;
  color: #222;
  background: #F2F2F4;
  border-radius: 4px;
  position: relative;
  margin-right: 10px;
  font-size: 22px;
}
.seconds-scroll-barItem.active div {
  color: #EB5841;
  background: #FDEEEC;
}

/*轮播*/
.life-swipe {
  height: 326px;
  width: 710px;
  border-radius: 10px;
  overflow: hidden;
  margin: 30px auto 46px;
}
.banner-empty {
  height: 30px;
}
.life-swipe .van-swipe {
  height: 100%;
}
.life-swipe .van-swipe-item img {
  width: 100%;
  height: 100%;
}
/**/
.tab-list {
  padding: 14px 20px 40px;
  // background: linear-gradient(to bottom,#fff 60%,#f2f2f4);
}
.tab-list.flex-around {
  justify-content: space-around;
}
.tab-item {
  @flex-column();
  width: 133px;
  height: 178px;
}
.tab-item img {
  width: 100%;
  height: 133px;
}
.tab-item div {
  font-size: 28px;
  line-height: 28px;
  color: #222222;
  text-align: center;
}
// 电影
.movie-list {
  display: flex;
  padding: 0 20px;
}
.movie-item {
  width: 216px;
  flex-shrink: 0;
  margin-right: 11px;
  padding-bottom: 40px;
}
.movie-pic {
  height: 302px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  position: relative;
  margin-bottom: 8px;
}
.movie-tip {
  height: 74px;
  background: linear-gradient(to top, rgba(51,51,51),transparent);
  // opacity: 0.8;
  border-radius: 0px 0px 10px 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  padding: 0 4px 0 11px;
}
.moive-score {
  font-size: 34px;
  font-weight: 500;
  color: #FFA110;
}
.moive-look {
  font-size: 20px;
  color: #FFFFFF;
}
.movie-name {
  width: 190px;
  font-size: 30px;
  line-height: 54px;
  font-weight: 500;
  margin: 0 auto;
  text-align: center;
}
.movie-price {
  width: 180px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  background: #EB5841;
  border-radius: 21px;
  font-size: 22px;
  color: #fff;
  margin: 0 auto;
}
.life-session.life-movie,
.life-session.life-sale,
.life-session.life-flash {
  // background-color: #f2f2f4;
  margin-bottom: 0;
  padding-bottom: 40px;
}
.life-session + .bg-guodu {
  height: 40px;
  margin-bottom: -20px;
  // background: linear-gradient(to bottom,#f2f2f4,#fff);
}
.life-movie .life-arrow-right,
.life-sale .life-arrow-right,
.life-flash .life-arrow-right {
  width: 20px;
  text-align: right;
  height: 30px;
  line-height: 30px;
  font-size: 30px;
}
.life-movie .life-tit {
  color: #E66E57;
  background: url('../../assets/img/icon_32.png') no-repeat 40px top /260px auto;
}
.life-sale .life-tit {
  color: #63A85C;
  background: url('../../assets/img/icon_33.png') no-repeat 40px top /260px auto;
}
.life-flash .life-tit {
  color: #FF8A14;
  background: url('../../assets/img/icon_34.png') no-repeat 40px top /260px auto;
}
.movie-cont {
  @life-public-session();
  background: linear-gradient(0deg, #FFFFFF, #FFDAD3);
}
.sale-cont {
  @life-public-session();
  background: linear-gradient(0deg, #FFFFFF, #D9F1BD);
  padding-bottom: 20px;
}
.life-flash .flash-cont {
  // @life-public-session();
  background: linear-gradient(0deg, #FFFFFF, #FFF7AF);
  padding-bottom: 20px;
  width: 710px;
  margin: 0 auto;
  border-radius: 10px;
}
.van-tabs__content {
  .van-tab__pane,.flash-cont {
    height: 100%;
  }
}
/*特卖、闪购、专区*/
@life-public-session: {
  width: 710px;
  margin: 0 auto;
  border-radius: 10px;
}
.life-session {
  margin-bottom: 80px;
}
.life-tit {
  width: 710px;
  padding: 0 30px;
  height: 96px;
  margin: 0 auto;
  font-size: 38px;
  font-weight: bold;
}
.life-arrow-right,
.life-arrow-right img {
  width: 15px;
  height: 26px;
}
.life-special-tit {
  background: url('../../assets/img/bg_01.png') center top /100% 100%;
}
.life-flash-tit {
  background: url('../../assets/img/bg_02.png') center top /100% 100%;
}
.life-goods-list {
  /*width: 720px;
  margin-left: 30px;*/
  padding-left: 30px;
  height: 367px;
  overflow-x: auto;
  white-space: nowrap;
}
.special-goods-list,.flash-goods-list {
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
.special-goods-list .life-goods-item,
.flash-goods-list .life-goods-item {
  width: 216px;
  border-radius: 10px;
  margin-right: 11px;
  overflow: hidden;
  background-color: #fff;
  margin-bottom: 20px;
}
.flash-goods-list .life-goods-item {
  margin-right: 0;
}
.special-goods-list .life-goods-pic,
.flash-goods-list .life-goods-pic {
  height: 216px;
  border-radius: 0;
}
.special-goods-list,.flash-goods-list {
  .life-goods-price {
    font-size: 38px;
    line-height: 70px;
    text-align: center;
    span:nth-child(1) {
      color: #eb5841;
      font-size: 24px;
      text-decoration: none;
    }
    span:nth-child(2) {
      font-size: 26px;
    }
  }
}
.flash-goods-list {
  justify-content: space-around;
  .life-goods-name {
    line-height: 40px;
    margin-top: 13px;
    padding: 0 10px;
  }
  .life-goods-price {
    text-align: left;
    padding: 0 10px;
  }
}
.life-goods-list::-webkit-scrollbar {
  display: none;
}
.life-goods-item {
  width: 230px;
  height: 100%;
  margin-right: 20px;
  flex-shrink: 0;
  position: relative;
}
.special-goods-list .life-goods-item:nth-child(3n) {
  margin-right: 0;
}
.life-goods-pic {
  display: flex;
  width: 100%;
  height: 230px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f4f4f4;
  position: relative;
}
.goods-pic-icon {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}
.flash-goods-info {
  flex-grow: 1;
  margin-left: 20px;
  height: 100%;
}
.life-goods-name {
  line-height: 42px;
  margin-top: 10px;
  font-size: 24px;
}
.flash-goods-info .life-goods-name {
  font-size: 28px;
  line-height: 46px;
  margin-top: 8px;
}
.life-goods-price {
  font-size: 30px;
  color: #eb5841;
  font-weight: bold;
  line-height: 44px;
}
.flash-goods-info .life-goods-price {
  font-size: 42px;
  line-height: 52px;
}
.life-goods-price span {
  font-weight: normal;
  font-size: 24px;
  color: #8f8f94;
  text-decoration: line-through;
}
.flash-no-start {
  width: 130px;
  height: 42px;
  text-align: center;
  line-height: 38px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid #FF8A14;
  border-radius: 10px;
  font-size: 24px;
  font-weight: 500;
  color: #FF8A14;
  margin-left: 19px;
}
.life-countdown {
  height: 44px;
  margin-left: 20px;
}
.life-countdown div {
  height: 100%;
  line-height: 42px;
  text-align: center;
  color: #FF8A14;
}
.countdown-time {
  text-align: center;
  background-color: #fff;
  color: #ffffff;
  font-size: 24px;
  width: 42px;
  height: 42px;
  line-height: 42px;
  background: #FF8A14;
  border-radius: 10px;
}
.countdown-point {
  width: 20px;
  position: relative;
}
.countdown-point::before,.countdown-point::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: #fff;
  border-radius: 50%;
  left: 8px;
}
.countdown-point::before {
  top: 16px;
}
.countdown-point::after {
  bottom: 16px;
}

.special-session {
  margin: 0 auto 28px;
  width: 710px;
  /*height: 805px;*/
}
.special-list {
  /*height: 100%;*/
  width: 100%;
  -moz-column-count: 2;
  /* Firefox */
  -webkit-column-count: 2;
  /* Safari 和 Chrome */
  column-count: 2;
  -moz-column-gap: 20px;
  -webkit-column-gap: 20px;
  column-gap: 20px;
}
.special-list > div {
  width: 345px;
  position: relative;
  /*padding-bottom: 20px;*/
  break-inside: avoid;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
}
.special-list > div img {
  border-radius: 10px;
}
.height-440 {
  height: 440px;
  overflow: hidden;
}
.height-345 {
  height: 345px;
  overflow: hidden;
}
.special-tip-bg {
  position: absolute;;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  background-image: linear-gradient(to bottom, rgb(129, 129, 129), transparent);
}
.special-tip {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 10px;
  color: #fff;
  z-index: 10;
}
.special-tip div:nth-child(1) {
  font-size: 30px;
  font-weight: bold;
  line-height: 46px
}
.special-tip div:nth-child(2) {
  font-size: 24px;
  line-height: 40px
}
.life-area-tit {
  height: 138px;
  padding: 0 30px 0 10px;
}
.life-area-tit-small.life-area-tit {
  height: 100px;
}
.life-area-tit .life-arrow-right {
  /*margin-top: 52px;
  height: 86px;
  padding: 30px 0;*/
}
.area-text-tit {
  line-height: 52px;
}
.area-text-detail {
  line-height: 42px;
  font-weight: normal;
  font-size: 24px;
  color: #8f8f94;
}
.banner-session {
  margin: 34px auto 74px;
  width: 710px;
  height: 326px;
  border-radius: 10px;
  overflow: hidden;
}
  /*闪购*/
.item-btn {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 140px;
  height: 66px;
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

/*购物车*/
.cart-fixed {
  position: fixed;
  right: 20px;
  bottom: 138px;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 4px 13px rgba(160,160,160,0.4);
  z-index: 55;
  display: flex;
}
.cart-fixed img {
  width: 60px;
  height: 60px;
  margin: 25px 0 0 25px;
}
.cart-num {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 34px;
  height: 34px;
  background-color: #eb5841;
  border-radius: 17px;
  padding: 0 8px;
  text-align: center;
  font-size: 24px;
  color: #fff;
}

/*二级菜单商品*/
.life-seconds-list {
  padding-left: 30px;
  display: flex;
  flex-wrap: wrap;
  /*padding-bottom: 100px;*/
}
.mt-30 {
  margin-top: 30px;
}
.life-seconds-list .life-goods-item {
  width: 330px;
  height: 492px;
  margin-right: 30px;
  flex-shrink: 0;
}
.life-seconds-list .life-goods-pic {
  height: 330px;
}
.life-seconds-list .life-goods-name {
  line-height: 46px;
  margin-top: 20px;
  font-size: 28px;
}
.life-goods-price {
  font-size: 34px;
  line-height: 46px;
}
div.empty-session {
  padding-top: 100px;
}
.app-body {
  /deep/ .life-home {
    background: linear-gradient(to bottom, #fff,#f2f2f4, #fff);
  }
}
</style>
