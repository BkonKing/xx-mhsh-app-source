<template>
  <div :class="[isFocus ? 'white-bg' : '','app-body']" id="scroll-body">
    <form>
    <div class="search-header">
      <div class="search-input-block flex-between">
        <div v-show="typeVal == 0" class="search-input-left flex-align-center">
          <img class="search-icon" src="@/assets/img/icon_11.png" />
          <!-- <van-search class="search-input" ref="input" v-model="search_val" @focus="focus" @input="onSearch" left-icon="" placeholder="搜索应用、商品、帖子" /> -->
          <div ref="seachInput" class="search-input"></div>
          <tf-input
            ref="tfinput"
            :inputInfo="inputInfo"
            @inputCall="inputCall"
            @inputFocus="inputFocus"
          >
          </tf-input>
        </div>
        <div v-show="typeVal > 0" class="search-input-left flex-align-center">
          <img class="search-icon" src="@/assets/img/icon_11.png" />
          <!-- <van-search class="search-input" ref="input" v-model="oneSeach_val" @input="initFunc" left-icon="" :placeholder="placeholder_val[typeVal-1]" /> -->
          <tf-input
            ref="tfinput2"
            :inputInfo="inputInfo2"
            @inputCall="inputCall2"
          >
          </tf-input>
        </div>
        <!-- <div v-else-if="typeVal == 2" class="search-input-left flex-align-center">
          <img class="search-icon" src="@/assets/img/icon_11.png" />
          <van-search class="search-input" ref="input" v-model="film_val" @input="initFunc" left-icon="" placeholder="搜索电影" />
        </div>
        <div v-else-if="typeVal == 3" class="search-input-left flex-align-center">
          <img class="search-icon" src="@/assets/img/icon_11.png" />
          <van-search class="search-input" ref="input" v-model="cinema_val" @input="initFunc" left-icon="" placeholder="搜索影院" />
        </div>
        <div v-else-if="typeVal == 4" class="search-input-left flex-align-center">
          <img class="search-icon" src="@/assets/img/icon_11.png" />
          <van-search class="search-input" ref="input" v-model="postbar_val" @input="initFunc" left-icon="" placeholder="搜索帖子" />
        </div> -->
        <div @click="cancelFunc" class="search-cancel flex-center">取消</div>
      </div>
    </div>
    </form>
    <template v-if="isFocus">
      <div v-if="hotWordsList.length > 0" class="search-session search-session1">
        <div class="search-tit">热门搜索</div>
        <div class="search-list">
          <div v-for="(item, index) in hotWordsList" :key="index" @click="wordsSearch(item.search_word)" class="search-item">{{item.search_word}}</div>
        </div>
      </div>
      <div v-if="searchList.length > 0" class="search-session">
        <div class="search-tit">历史搜索<div @click="delSearch" class="search-del"><img class="img-100" src="@/assets/img/icon_12.png" /></div></div>
        <div class="search-list">
          <div v-for="(item, index) in searchList" :key="index" class="search-item" @click="wordsSearch(item)">{{item}}</div>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-if="typeVal==0"  class="public-nav">
        <van-tabs class="pt88" swipe-threshold="6" v-model="tapIndex" @click="onClickItem()">
          <van-tab v-for="(item, i) in items" :key="i" :title="item"></van-tab>
        </van-tabs>
      </div>
      <template v-else>
        <div class="result-more-box" >
          <div v-if="typeVal > 0" class="result-more-tit"><span class="color-222">{{ items[typeVal] }}</span>（{{oneSeach_count}}）</div>
          <filter-cinema ref="filter-cinema" v-if="typeVal === 3" :cityId="cityId" :search="oneSeach_val" @change="changeFilterCinema"></filter-cinema>
        </div>
      </template>
      <div class="nav-empty" :class="{'nav-empty-cinema': typeVal === 3}"></div>

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
      >
        <template v-if="(tapIndex==0 || tapIndex==5) && typeVal==0 || typeVal==5">
          <template v-if="appList.length > 0">
            <div class="search-session result-session">
              <div class="result-tit flex-between">
                <div class="result-tit-l"><span class="color-222">应用</span>（{{app_count}}）</div>
              </div>
              <div class="result-list list-690">
                <div v-for="(item, index) in appList" :key="index" @click="goLink(item.url)" class="res-application-item">
                  <img :src="item.icon_image" />
                  <div class="application-name p-nowrap" v-html="item.application"></div>
                </div>
              </div>
            </div>
          </template>
        </template>
        <template v-if="(tapIndex==0 || tapIndex==1) && typeVal==0 || typeVal==1">
          <template v-if="goodsList.length > 0">
            <div class="search-session result-session">
              <div v-if="typeVal!=1" class="result-tit flex-between">
                <div class="result-tit-l"><span class="color-222">商品</span>（{{goods_count}}）</div>
                <div @click="goMore(1)" class="result-tit-r flex-align-center"><img src="@/assets/img/icon_11.png" />更多商品</div>
              </div>
              <div class="result-list list-690">
                <template v-if="(tapIndex==0 || tapIndex==1) && typeVal==0">
                  <div v-for="(item, index) in goodsList" :key="index" v-if="index < 3" @click="linkFunc(5,{id:item.id})" class="res-goods-item flex-between">
                    <img class="res-goods-pic" :src="item.thumb" />
                    <div class="res-goods-info">
                      <div class="res-goods-name res-name p-nowrap" v-html="item.goods_name"></div>
                      <div class="flex-align-center">
                        <template v-if="item.goods_type>1">
                          <div :class="[item.goods_type == 2 ? 'label-item-tm' : 'label-item-sg','label-item-block']">{{item.goods_type == 2 ? '特卖' : '闪购'}}</div>
                        </template>
                        <div v-for="(val, j) in item.tag" :key="j" class="label-item-block label-item-tip" :style="{ 'border-color': val.tag_color, 'color': val.tag_color}">{{ val.tag_name }}</div>
                      </div>
                      <div class="res-goods-price">￥{{item.s_price/100}} <span v-if="item.y_price&&item.y_price!='0'">￥{{item.y_price/100}}</span></div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div v-for="(item, index) in goodsList2" :key="index" @click="linkFunc(5,{id:item.id})" class="res-goods-item flex-between">
                    <img class="res-goods-pic" :src="item.thumb" />
                    <div class="res-goods-info">
                      <div class="res-goods-name res-name p-nowrap" v-html="item.goods_name"></div>
                      <div class="flex-align-center">
                        <template v-if="item.goods_type>1">
                          <div :class="[item.goods_type == 2 ? 'label-item-tm' : 'label-item-sg','label-item-block']">{{item.goods_type == 2 ? '特卖' : '闪购'}}</div>
                        </template>
                        <div v-for="(val, j) in item.tag" :key="j" class="label-item-block label-item-tip" :style="{ 'border-color': val.tag_color, 'color': val.tag_color}">{{ val.tag_name }}</div>
                      </div>
                      <div class="res-goods-price">￥{{item.s_price/100}} <span v-if="item.y_price&&item.y_price!='0'">￥{{item.y_price/100}}</span></div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </template>
        <template v-if="(tapIndex==0 || tapIndex==2) && typeVal==0 || typeVal==2">
          <template v-if="filmList.length > 0">
            <div class="search-session result-session">
              <div v-if="typeVal!=2" class="result-tit flex-between">
                <div class="result-tit-l"><span class="color-222">电影</span>（{{film_count}}）</div>
                <div @click="goMore(2)" class="result-tit-r flex-align-center"><img src="@/assets/img/icon_11.png" />更多电影</div>
              </div>
              <div class="result-list list-690">
                <template v-if="(tapIndex==0 || tapIndex==2) && typeVal==0">
                  <film-list class="film-list" :value="filmList" :disabled="true"></film-list>
                </template>
                <template v-else>
                  <film-list class="film-list"  :value="filmList2" :disabled="true"></film-list>
                </template>
              </div>
            </div>
          </template>
        </template>
        <template v-if="(tapIndex==0 || tapIndex==3) && typeVal==0 || typeVal==3">
          <template v-if="cinemaList.length > 0">
            <div class="search-session result-session">
              <div v-if="typeVal!=3" class="result-tit flex-between">
                <div class="result-tit-l"><span class="color-222">影院</span>（{{cinema_count}}）</div>
                <div @click="goMore(3)" class="result-tit-r flex-align-center"><img src="@/assets/img/icon_11.png" />更多影院</div>
              </div>
              <div class="result-list list-690">
                <template v-if="(tapIndex==0 || tapIndex==3) && typeVal==0">
                  <cinema-list class="cinema-list" :value="cinemaList" :tag="false" :disabled="true"></cinema-list>
                </template>
                <template v-else>
                  <cinema-list class="cinema-list" :value="cinemaList2" :tag="false" :disabled="true"></cinema-list>
                </template>
              </div>
            </div>
          </template>
        </template>
        <template v-if="(tapIndex==0 || tapIndex==4) && typeVal==0 || typeVal==4">
          <template v-if="postbarList.length > 0">
            <div class="search-session result-session">
              <div v-if="typeVal!=4" class="result-tit flex-between">
                <div class="result-tit-l"><span class="color-222">帖子</span>（{{postbar_count}}）</div>
                <div @click="goMore(4)" class="result-tit-r flex-align-center"><img src="@/assets/img/icon_11.png" />更多帖子</div>
              </div>
              <div class="result-list list-710">
                <template v-if="(tapIndex==0 || tapIndex==4) && typeVal==0">
                  <div v-for="(item, index) in postbarList" :key="index" v-if="index < 3" @click="linkFunc(30,{id: item.id})" class="res-post-item">
                    <div class="post-item-header">
                      <div class="post-user-info flex-align-center">
                        <img v-if="item.avatar" class="post-user-photo" :src="item.avatar" />
                        <img v-else class="post-user-photo" src="@/assets/imgs/touxiang.png"/>
                        <div class="flex-column-center">
                          <div class="post-user-name">{{item.nickname}}</div>
                          <div class="post-user-time">{{item.ctime}}</div>
                        </div>
                      </div>
                      <div v-if="item.category" class="post-group">{{item.category}}</div>
                    </div>
                    <div class="post-cont">
                      <div>{{item.content}}</div>
                      <template v-if="item.images">
                        <img class="tf-mt-lg" width="33%" :src="item.images[0]" v-if="item.images.length === 1" />
                        <tf-image-list class="tf-mt-base" v-else-if="item.images.length > 1" :data="item.images"></tf-image-list>
                      </template>
                      <!-- <img src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" /> -->
                    </div>
                    <div class="post-item-footer">
                      <div class="post-icon flex-between">
                        <div @click.stop="thumbsUp(item)" class="post-fabulous flex-align-center"><template v-if="item.is_thumbsup==1"><img src="@/assets/img/icon_13.png" /></template><template v-else><img src="@/assets/img/icon_15.png" /></template>{{item.thumbsups}}</div>
                        <div class="post-comment flex-align-center"><img src="@/assets/img/icon_14.png" />{{item.comments > 0 ? item.comments : ''}}</div>
                        <div class="post-point flex-center"><span></span><span></span><span></span></div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div v-for="(item, index) in postbarList2" :key="index" @click="linkFunc(30,{id: item.id})" class="res-post-item">
                    <div class="post-item-header">
                      <div class="post-user-info flex-align-center">
                        <img class="post-user-photo" :src="item.avatar" />
                        <div class="flex-column-center">
                          <div class="post-user-name">{{item.nickname}}</div>
                          <div class="post-user-time">{{item.ctime}}</div>
                        </div>
                      </div>
                      <div v-if="item.category" class="post-group">{{item.category}}</div>
                    </div>
                    <div class="post-cont">
                      <div>{{item.content}}</div>
                      <template v-if="item.images">
                        <img class="tf-mt-lg" width="33%" :src="item.images[0]" v-if="item.images.length === 1" />
                        <tf-image-list class="tf-mt-base" v-else-if="item.images.length > 1" :data="item.images"></tf-image-list>
                      </template>
                      <!-- <img src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" /> -->
                    </div>
                    <div class="post-item-footer">
                      <div class="post-icon flex-between">
                        <div @click.stop="thumbsUp(item)" class="post-fabulous flex-align-center"><template v-if="item.is_thumbsup==1"><img src="@/assets/img/icon_13.png" /></template><template v-else><img src="@/assets/img/icon_15.png" /></template>{{item.thumbsups}}</div>
                        <div class="post-comment flex-align-center"><img src="@/assets/img/icon_14.png" />{{item.comments > 0 ? item.comments : ''}}</div>
                        <div class="post-point flex-center"><span></span><span></span><span></span></div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </template>
        <div v-if="(tapIndex==0&&filmList.length==0&&cinemaList.length==0&&goodsList.length==0&&postbarList.length==0&&appList.length==0) || (tapIndex==1&&typeVal==0&&goodsList.length==0 || typeVal==1&&goodsList2.length==0) || (tapIndex==2&&typeVal==0&&filmList.length==0 || typeVal==2&&filmList2.length==0) || (tapIndex==3&&typeVal==0&&cinemaList.length==0 || typeVal==3&&cinemaList2.length==0) || (tapIndex==4&&typeVal==0&&postbarList.length==0 || typeVal==4&&postbarList2.length==0)|| (tapIndex==5&&typeVal==0&&appList.length==0)" class="empty-session">
          <img src="@/assets/img/empty_search.png" />
          <div>无搜索结果</div>
        </div>
      </van-list>
    </template>
  </div>
</template>

<script>
import { Tab, Tabs, Search, List } from 'vant'
import tfImageList from '@/components/tf-image-list'
import FilmList from '@/views/life/movie/components/FilmList'
import CinemaList from '@/views/life/movie/components/CinemaList'
import FilterCinema from '@/views/life/movie/components/FilterCinema'
import { handlePermission } from '@/utils/permission'
import { bMapGetLocationInfo } from '@/utils/util'
import { thumbsUp } from '@/api/neighbours'
import tfInput from '@/components/tf-input'
import { getHotWords, getSearchGoods, getSearchApp, getSearchPostbar } from '@/api/life.js'
import { getFilmCinemaSeach, getFilmSeachList, getCinemaSeachList } from '@/api/movie.js'
export default {
  name: 'search',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Search.name]: Search,
    [List.name]: List,
    tfImageList,
    tfInput,
    FilmList,
    CinemaList,
    FilterCinema
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      items: ['全部', '商品', '电影', '影院', '帖子', '应用'],
      res_name: '<span>热门</span>报修',
      search_val: '', // 搜索输入框值
      oneSeach_val: '', // 商品输入框、电影输入框、影院输入框、帖子输入框（单独选中更多时输入框）
      placeholder_val: ['搜索商品', '搜索电影', '搜索影院', '搜索帖子'], // placeholder
      noneHidden: true, // 缺省页是否隐藏（搜索无结果）
      isFocus: true, // 显示热搜词和历史搜索
      searchList: [], // 历史搜索词列表
      hotWordsList: [], // 热搜词列表
      // resShopList: [],   //搜索结果列表
      goodsList: [], // 搜索结果（商品）
      goodsList2: [], // 搜索结果（商品）
      filmList: [], // 搜索结果（电影）
      filmList2: [], // 搜索结果（电影）
      filterParams: {}, // 搜索结果影院过滤参数
      cinemaList: [], // 搜索结果（影院）
      cinemaList2: [], // 搜索结果（影院）
      appList: [], // 搜索结果（应用）
      postbarList: [], // 搜索结果（帖子）
      postbarList2: [], // 搜索结果（帖子）
      goods_count: 0, // 搜索商品结果数量
      film_count: 0, // 搜索电影结果数量
      cinema_count: 0, // 搜索影院结果数量
      app_count: 0, // 搜索应用结果数量
      postbar_count: 0, // 搜索帖子结果数量
      oneSeach_count: 0, // 搜索结果数量
      cityId: 0, // 城市id
      lon: 0, // 经度
      lat: 0, // 纬度

      page: 1, // 分页页码
      pageSize: 10, // 每页数
      noMoreHidden: true, // 上拉加载更多，没有更多是否隐藏
      tapIndex: 0, // 0全部 1商品 2电影 3影院 4帖子 5应用
      typeVal: 0, // 1更多商品 2更多电影 3更多影院 4更多帖子 5更多应用

      loading: false,
      finished: true,
      inputInfo: {
        x: 63,
        y: 10,
        w: 300,
        h: 30,
        size: 15,
        color: '#000',
        autoFocus: true,
        phtext: '搜索应用、商品、帖子',
        keyboardType: 'search',
        fixed: true
      },
      inputInfo2: {
        x: 63,
        y: 10,
        w: 300,
        h: 30,
        size: 15,
        color: '#000',
        autoFocus: true,
        phtext: '搜索应用',
        keyboardType: 'search',
        fixed: true
      },
      iscache: false // 是否跳转到详情页
    }
  },
  created () {
    if (process.env.VUE_APP_IS_APP === '1') {
      handlePermission({
        name: 'location',
        title: '定位服务未开启',
        message: '此功能需要授权定位权限才能更好为您提供服务，请授权',
        confirmButtonText: '开启'
      })
        .then(() => {
          this.getLocationInfo()
        })
        .catch(() => {
          this.items.splice(3, 1)
        })
    }
    this.isSelect = this.$route.query.isSelect
    // this.searchList = JSON.parse(localStorage.getItem('searchWords')) || [];
    var searchWords = api.getPrefs({ sync: true, key: 'searchWords' }) || []
    if (searchWords && searchWords.length > 0) {
      this.searchList = JSON.parse(searchWords)
    }
    this.getData()
  },
  mounted () {
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     // that.$refs.input.getElementsByClassName('van-field__control')[0].focus()
    //   }, 500)
    // })
  },
  activated () {
    if (this.typeVal > 0) {
      setTimeout(() => {
        this.$refs.tfinput2.openInput()
      }, 500)
    } else {
      this.inputInfo.y = this.$refs.seachInput.getBoundingClientRect().top
      this.inputInfo.x = 88 * api.winWidth / 750
      this.inputInfo.w = this.$refs.seachInput.offsetWidth
      this.inputInfo.h = this.$refs.seachInput.offsetHeight
      setTimeout(() => {
        this.$refs.tfinput.openInput()
      }, 500)
    }
    if (this.scrollTop) {
      document.getElementById('scroll-body').scrollTop = this.scrollTop
    }
  },
  methods: {
    // 获取当前地址信息 adCode:行政区编码 cityCode:城市编码
    getLocationInfo () {
      bMapGetLocationInfo().then(({ cityCode, adCode, lon, lat }) => {
        // 百度获取的cityCode不同，需要将区域的后两位转为0才是当前城市编码
        this.cityId = String(adCode).substring(0, 4) + '00'
        this.lon = lon
        this.lat = lat
      })
    },
    // 输入框值变化/点击搜索
    inputCall (val) {
      this.search_val = val
      this.onSearch()
    },
    // 输入框值变化/点击搜索
    inputCall2 (val) {
      this.oneSeach_val = val
      this.initFunc()
    },
    // 聚焦
    inputFocus () {
      this.focus()
    },
    onLoad () {
      // 异步更新数据
      if (this.typeVal == 1) {
        this.getSearchGoods(2)
      } else if (this.typeVal == 2) {
        this.getFilmSeachList()
      } else if (this.typeVal == 3) {
        this.$refs['filter-cinema'] && this.$refs['filter-cinema'].reload()
        this.getCinemaSeachList()
      } else if (this.typeVal == 4) {
        this.getSearchPostbar(2)
      } else if (this.typeVal == 5) {
        this.getSearchApp(2)
      }
    },
    getData () {
      // 热词
      getHotWords().then(res => {
        if (res.success) {
          this.hotWordsList = res.data
        }
      })
    },
    // 搜索商品
    initFunc () {
      this.page = 1
      if (!this.loading && !this.finished) {
        this.onLoad()
      } else {
        this.finished = false
        this.loading = false
      }
    },
    getSearchGoods (type = '') {
      var search_key = this.search_val
      const that = this
      if (this.typeVal == 1) {
        search_key = this.oneSeach_val
      }
      getSearchGoods({
        search_key: search_key,
        page: this.page,
        search_num: this.pageSize
      }).then(res => {
        if (res.success) {
          const dataArr = res.data
          var val = search_key
          if (dataArr && dataArr.length > 0) {
            for (var i = 0; i < dataArr.length; i++) {
              var findText = dataArr[i].goods_name.split(val)
              var result = findText.join('<span style="color:#448fe4;">' + val + '</span>')
              dataArr[i].goods_name = result
            }
          }
          if (this.typeVal > 0) {
            this.goodsList2 = this.page == 1 ? res.data : this.goodsList2.concat(res.data)
            if (res.data.length < this.pageSize) {
              this.finished = true
            } else {
              this.page = this.page + 1
            }
            this.loading = false
            this.oneSeach_count = res.count_num
          } else {
            this.goodsList = this.page == 1 ? res.data : this.goodsList.concat(res.data)
            this.goods_count = res.count_num
          }
        }
      })
    },
    // 搜索电影或影院
    getFilmCinemaSeach () {
      if (!this.cityId) {
        return
      }
      getFilmCinemaSeach({
        city_id: this.cityId,
        search: this.search_val,
        lng: this.lon,
        lat: this.lat
      }).then(res => {
        if (res.success) {
          var val = this.search_val
          const dataArr = res.data.film_info
          // if (dataArr && dataArr.length > 0) {
          //   for (let i = 0; i < dataArr.length; i++) {
          //     const findText = dataArr[i].film_name.split(val)
          //     const result = findText.join('<span style="color:#448fe4;">' + val + '</span>')
          //     dataArr[i].film_name = result
          //   }
          // }
          this.filmList = this.page == 1 ? dataArr : this.filmList.concat(dataArr)
          this.film_count = res.data.film_count
          const dataArr2 = res.data.cinema_info
          /* if (dataArr2 && dataArr2.length > 0) {
            for (let i = 0; i < dataArr2.length; i++) {
              const findText2 = dataArr2[i].cinema_name.split(val)
              const result2 = findText2.join('<span style="color:#448fe4;">' + val + '</span>')
              dataArr2[i].cinema_name = result2
            }
          } */
          this.cinemaList = this.page == 1 ? dataArr2 : this.cinemaList.concat(dataArr2)
          this.cinema_count = res.data.cinema_count
        }
      })
    },
    // 搜索电影
    getFilmSeachList () {
      if (!this.cityId) {
        return
      }
      const search_key = this.typeVal == 2 ? this.oneSeach_val : this.search_val
      getFilmSeachList({
        search: search_key,
        page_index: this.page,
        page_size: 10,
        search_num: this.pageSize
      }).then(res => {
        if (res.success) {
          const dataArr = res.data.film_info
          var val = this.search_val
          // if (dataArr && dataArr.length > 0) {
          //   for (var i = 0; i < dataArr.length; i++) {
          //     var findText = dataArr[i].film_name.split(val)
          //     var result = findText.join('<span style="color:#448fe4;">' + val + '</span>')
          //     dataArr[i].film_name = result
          //   }
          // }
          this.filmList2 = this.page == 1 ? dataArr : this.filmList2.concat(dataArr)
          if (dataArr.length < this.pageSize) {
            this.finished = true
          } else {
            this.page = this.page + 1
          }
          this.loading = false
          this.oneSeach_count = res.data.total
        }
      })
    },
    // 过滤影院
    changeFilterCinema (params) {
      this.page = 1
      this.filterParams = {
        county_id: params.countyId,
        hall_no: params.hallNo,
        sort_type: params.sortType
      }
      this.getCinemaSeachList()
    },
    // 搜索影院
    getCinemaSeachList () {
      if (!this.cityId) {
        return
      }
      var search_key = this.typeVal == 3 ? this.oneSeach_val : this.search_val
      getCinemaSeachList({
        city_id: this.cityId,
        search: search_key,
        lng: this.lon,
        lat: this.lat,
        page_index: this.page,
        page_size: 10,
        ...this.filterParams
      }).then(res => {
        if (res.success) {
          const dataArr = res.data.cinema_info
          // if (dataArr && dataArr.length > 0) {
          //   for (var i = 0; i < dataArr.length; i++) {
          //     var findText = dataArr[i].cinema_name.split(search_key)
          //     var result = findText.join('<span style="color:#448fe4;">' + search_key + '</span>')
          //     dataArr[i].cinema_name = result
          //   }
          // }
          this.cinemaList2 = this.page == 1 ? dataArr : this.cinemaList2.concat(dataArr)
          if (dataArr.length < this.pageSize) {
            this.finished = true
          } else {
            this.page = this.page + 1
          }
          this.loading = false
          this.oneSeach_count = res.data.total
        }
      })
    },
    // 搜索app
    getSearchApp () {
      const that = this
      getSearchApp({
        search_key: this.search_val,
        pages: this.page,
        search_num: this.pageSize
      }).then(res => {
        if (res.success) {
          const dataArr = res.data
          if (dataArr && dataArr.length > 0) {
            for (var i = 0; i < dataArr.length; i++) {
              var findText = dataArr[i].application.split(that.search_val)
              var result = findText.join('<span style="color:#448fe4;">' + that.search_val + '</span>')
              dataArr[i].application = result
            }
          }
          this.appList = this.page == 1 ? res.data : this.appList.concat(res.data)
          this.app_count = res.count_num
          if (this.typeVal > 0) {
            if (res.data.length < this.pageSize) {
              this.finished = true
            } else {
              this.page = this.page + 1
            }
            this.loading = false
          }
        }
      })
    },
    // 搜索帖子
    getSearchPostbar (type = '') {
      var search_key = this.search_val
      if (this.typeVal == 4) {
        search_key = this.oneSeach_val
      }
      getSearchPostbar({
        search_key: search_key,
        pages: this.page,
        search_num: this.pageSize
      }).then(res => {
        if (res.success) {
          // let dataArr = res.data;
          // var val = that.search_val;
          // if(that.typeVal == 4){
          //   val = that.postbar_val;
          // }
          // if(dataArr&&dataArr.length > 0){
          //   for (var i=0; i<dataArr.length; i++) {
          //     var findText = dataArr[i].content.split(val);
          //     var result= findText.join('<span style="color:#448fe4;">' + val + '</span>');
          //     dataArr[i].content = result;
          //   }
          // }
          if (this.typeVal > 0) {
            this.postbarList2 = this.page == 1 ? res.data : this.postbarList2.concat(res.data)
            if (res.data.length < this.pageSize) {
              this.finished = true
            } else {
              this.page = this.page + 1
            }
            this.loading = false
            this.oneSeach_count = res.count_num
          } else {
            this.postbarList = this.page == 1 ? res.data : this.postbarList.concat(res.data)
            this.postbar_count = res.count_num
          }
        }
      })
    },
    // 取消
    cancelFunc () {
      if (this.typeVal > 0) {
        this.typeVal = 0
        this.finished = true
        this.loading = false
        this.page = 1
        this.$refs.tfinput2.hideSeach()
        if (!this.iscache) {
          this.$refs.tfinput.showSeach()
        } else {
          this.iscache = false
          this.$refs.tfinput.openInput()
        }
      } else {
        this.$router.go(-1)
      }
    },
    // 菜单切换
    onClickItem (index) {
      console.log(this.tapIndex)
    },
    // 更多
    goMore (typeVal) {
      this.$refs.tfinput.hideSeach()
      this.inputInfo2.y = this.inputInfo.y
      this.inputInfo2.x = this.inputInfo.x
      this.inputInfo2.w = this.inputInfo.w
      this.inputInfo2.h = this.inputInfo.h
      this.typeVal = typeVal
      this.finished = false
      this.loading = false
      this.page = 1
      if (typeVal > 0) {
        this.oneSeach_val = this.search_val
      }
      this.inputInfo2.phtext = this.placeholder_val[this.typeVal - 1]
      this.$refs.tfinput2.initOpen(this.oneSeach_val)
      // this.goSearch();
    },

    /**
     * 删除输入框内容
    */
    inputDel: function (e) {
      const that = this
      that.setData({
        search_val: '',
        isFocus: true
      })
    },
    /**
     * 获取焦点
    */
    focus: function (e) {
      if (!this.isFocus) {
        this.isFocus = true
      }
    },
    /**
     * 失去焦点
    */
    blur: function (e) {
      this.isFocus = false
    },
    /**
     * 点击关键词搜索
    */
    wordsSearch: function (val) {
      this.isFocus = false
      this.search_val = val
      this.noneHidden = true
      this.noMoreHidden = true
      this.page = 1
      this.addSearch()
      this.$refs.tfinput.setValue(val)
    },
    /**
     * 点击输入框搜索
    */
    onSearch: function (e) {
      this.isFocus = false
      this.noneHidden = true
      this.noMoreHidden = true
      this.page = 1
      this.addSearch()
    },
    /**
     * 加入历史搜索
    */
    addSearch: function (e) {
      var key_word = this.search_val
      if (key_word) {
        for (var key in this.searchList) {
          if (key_word == this.searchList[key]) {
            this.searchList.splice(key, 1)
          }
        }

        const wordText = []
        wordText[0] = key_word
        this.searchList = wordText.concat(this.searchList)
        if (this.searchList.length > 30) {
          this.searchList = this.searchList.splice(30, 1)
        }
        // localStorage.setItem('searchWords', JSON.stringify(this.searchList));
        api.setPrefs({ key: 'searchWords', value: JSON.stringify(this.searchList) })
        console.log(this.searchList)
        this.goSearch()
      }
    },
    goSearch: function (e) {
      this.mtjEvent({ eventId: '5' })
      if (this.typeVal == 0) {
        this.getSearchGoods()
        this.getFilmCinemaSeach()
        this.getSearchApp()
        this.getSearchPostbar()
      } else if (this.typeVal == 1) {
        this.getSearchGoods()
      } else if (this.typeVal == 2 || this.typeVal == 3) {
        this.getFilmCinemaSeach()
      } else if (this.typeVal == 4) {
        this.getSearchPostbar()
      } else if (this.typeVal == 5) {
        this.getSearchApp()
      }
    },
    /**
     * 删除历史搜索
    */
    delSearch: function (e) {
      // localStorage.removeItem("searchWords");
      api.removePrefs({ key: 'searchWords' })
      this.searchList = []
      // const that = this;
      // var addrId = e.currentTarget.dataset.id;
      // that.setData({
      //   searchList: []
      // });
      // wx.removeStorageSync('searchWords');
      // wx.showToast({
      //   title: '删除成功',
      //   duration: 2000
      // });
    },
    // 点赞
    thumbsUp (item) {
      // 判断是否点过赞，点过赞无法取消
      if (item.is_thumbsup) {
        return
      }
      thumbsUp({
        id: item.id,
        t_type: 1
      }).then((res) => {
        // 点赞图标点亮
        item.thumbsups++
        item.is_thumbsup = 1
      })
    },
    goLink (url) {
      this.$router.push(url)
    },
    linkFunc (type, obj = {}) {
      switch (type) {
        case 5:
          this.$router.push({
            path: '/store/goods-detail',
            query: {
              id: obj.id
            }
          })
          break
        case 30:
          this.$router.push({
            path: '/pages/neighbours/details',
            query: {
              articleType: '3',
              id: obj.id
            }
          })
          break
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$refs.tfinput.closeSeach()
    this.$refs.tfinput2.closeSeach()
    const deleteList = ['life', 'home', 'movieIndex', 'movieList']
    if (deleteList.includes(to.name)) {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    } else {
      this.iscache = true
    }
    const el = document.getElementById('scroll-body')
    this.scrollTop = (el && el.scrollTop) || 0
    next()
  }
}
</script>

<style scoped  src="../../../styles/life.css"></style>
<style scoped>
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
  color: #222;
}
.white-bg.app-body {
  background-color: #fff;
}

/*搜索框*/
.search-input-block {
  height: 88px;
  padding-left: 30px;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: auto;
  background-color: #fff;
  z-index: 20;
}
.search-header {
  height: 88px;
}
.search-input-left {
  width: 611px;
  height: 60px;
  border: 2px solid #383838;
  border-radius: 10px;
  display: flex;
  overflow: hidden;
}
.search-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  margin: 0 10px 0 28px;
}
.search-input {
  z-index: -1;
  width: 540px;
  height: 50px;
  line-height: 50px;
  font-size: 24px;
}
.public-nav {
  height: 98px;
  background-color: #fff;
}
.search-cancel {
  width: 109px;
  color: #222;
  font-size: 26px;
}

/*热门搜索、历史搜索*/
.search-session1 {
  margin-bottom: 20px;
}
.search-tit {
  height: 98px;
  line-height: 88px;
  padding: 10px 0 0 30px;
  color: #222;
  font-size: 30px;
  font-weight: bold;
  position: relative;
}
.search-del {
  position: absolute;
  top: 22px;
  right: 14px;
  width: 68px;
  height: 66px;
  padding: 15px;
  display: flex;
}
.search-list {
  width: 710px;
  margin: 0 10px 0 30px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
.search-item {
  height: 80px;
  line-height: 80px;
  padding: 0 28px;
  color: #8f8f94;
  background-color: #f2f2f4;
  font-size: 26px;
  margin: 0 20px 20px 0;
}

/*搜索结果*/
.result-session {
  margin-top: 30px;
  background-color: #fff;
}
.result-tit {
  height: 80px;
  width: 690px;
  margin: 0 auto;
  color: #8f8f94;
  border-bottom: 1px solid #f0f0f0;
}
.result-more-tit {
  text-align: center;
  height: 98px;
  line-height: 98px;
  color: #8f8f94;
  background-color: #fff;
}
.public-nav,.result-more-box {
  position: fixed;
  left: 0;
  right: 0;
  /*margin-top: 88px;*/
  z-index: 20;
}
.nav-empty {
  height: 98px;
}
.nav-empty-cinema {
  height: 188px;
}
.result-tit-l {
  font-size: 30px;
}
.result-tit-r {
  font-size: 24px;
  height: 100%;
}
.result-tit-r img {
  height: 24px;
  width: 24px;
  margin-right: 10px;
}
.result-list {
  padding: 30px 0 10px;
  margin: 0 auto;
}
.list-690 {
  width: 690px;
  display: flex;
  flex-wrap: wrap;
}
  /*应用*/
.res-application-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100px;
  margin: 0 47px 10px 0;
}
.res-application-item:nth-child(5n) {
  margin-right: 0;
}
.res-application-item img {
  width: 60px;
  height: 60px;
}
.application-name {
  height: 64px;
  line-height: 64px;
  width: 100%;
  text-align: center;
  color: #222;
  font-size: 24px;
}
.res-name span {
  color: #448fe4;
}
  /*商品*/
.res-goods-item {
  width: 100%;
  height: 160px;
  margin-bottom: 30px;
}
.res-goods-pic {
  width: 160px;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}
.res-goods-info {
  width: 509px;
  height: 100%;
}
.res-goods-name {
  height: 46px;
  line-height: 46px;
}
.label-item-block {
  margin: 10px 10px 14px 0;
}
.res-goods-price {
  padding-top: 10px;
  line-height: 44px;
  font-size: 32px;
  color: #eb5841;
}
.res-goods-price span {
  font-size: 24px;
  color: #8f8f94;
  text-decoration: line-through;
}
  /*帖子*/
.list-710 {
  width: 710px;
}
.res-post-item {
  border: 1.5px solid #aaa;
  border-radius: 10px;
  padding: 30px 30px 0;
  margin-bottom: 30px;
}
.post-item-header {
  height: 88px;
  position: relative;
}
.post-user-info {
  width: 532px;
  height: 100%;
}
.post-user-photo {
  width: 88px;
  height: 100%;
  border-radius: 50%;
  margin-right: 20px;
  overflow: hidden;
}
.post-user-name {
  line-height: 44px;
}
.post-user-time {
  font-size: 24px;
  color: #8f8f94;
  line-height: 36px;
}
.post-group {
  position: absolute;
  top: 6px;
  right: 0;
  height: 34px;
  line-height: 30px;
  padding: 0 11px;
  border-radius: 10px 0 10px 10px;
  font-size: 22px;
  color: #ffa110;
  border: 2px solid #ffa110;
}
.post-cont {
  padding: 30px 0;
  line-height: 52px;
}
.post-cont img {
  max-width: 100%;
  object-fit: cover;
}
.post-item-footer {
  height: 90px;
  border-top: 1px solid #f0f0f0;
  overflow: hidden;
}
.post-icon {
  width: 570px;
  height: 47px;
  margin: 22px auto 0;
}
.post-fabulous,.post-comment {
  color: #8f8f94;
  font-size: 24px;
}
.post-fabulous img,.post-comment img {
  width: 36px;
  height: 36px;
  margin-right: 8px;
}
.post-point {
  width: 36px;
}
.post-point span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #aaa;
  margin: 2px;
}
/* 影片列表 */
.film-list {
  padding: 0;
}
/* 电影院列表 */
.cinema-list >>> .tf-van-list > .tf-van-cell:first-child .cinema-box{
  padding-top: 0;
  border-top: none;
}
.cinema-list >>> .van-pull-refresh__track > .tf-text-grey {
  display: none;
}
</style>
