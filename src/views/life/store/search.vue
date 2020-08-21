<template>
	<div :class="[isFocus ? 'white-bg' : '','app-body']">
    <div :style="{'top':$store.state.paddingTop+'px'}" class="search-input-block flex-between">
      <div v-if="typeVal == 0" class="search-input-left flex-align-center">
        <img class="search-icon" src="@/assets/img/icon_11.png" />
        <van-search class="search-input" ref="input" v-model="search_val" @focus="focus" @search="onSearch" left-icon="" placeholder="搜索应用、商品、帖子" />
      </div>
      <div v-else-if="typeVal == 1" class="search-input-left flex-align-center">
        <img class="search-icon" src="@/assets/img/icon_11.png" />
        <van-search class="search-input" ref="input" v-model="goods_val" @search="initFunc" left-icon="" placeholder="搜索商品" />
      </div>
      <div v-else-if="typeVal == 2" class="search-input-left flex-align-center">
        <img class="search-icon" src="@/assets/img/icon_11.png" />
        <van-search class="search-input" ref="input" v-model="postbar_val" @search="initFunc" left-icon="" placeholder="搜索帖子" />
      </div>
      <div @click="cancelFunc" class="search-cancel flex-center">取消</div>
    </div>
    <div class="input-empty"></div>
    <template v-if="isFocus">
      <div v-if="hotWordsList.length > 0" class="search-session search-session1">
        <div class="search-tit">热门搜索</div>
        <div class="search-list">
          <div v-for="(item, index) in hotWordsList" @click="wordsSearch(item.search_word)" class="search-item">{{item.search_word}}</div>
          <!-- <div class="search-item">限时闪购</div>
          <div class="search-item">咖啡</div>
          <div class="search-item">商品</div>
          <div class="search-item">茶叶</div> -->
        </div>
      </div>
      <div v-if="searchList.length > 0" class="search-session">
        <div class="search-tit">历史搜索<div @click="delSearch" class="search-del"><img class="img-100" src="@/assets/img/icon_12.png" /></div></div>
        <div class="search-list">
          <div v-for="(item, index) in searchList" class="search-item" @click="wordsSearch(item)">{{item}}</div>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-if="typeVal==0" :style="{'top':$store.state.paddingTop+'px'}" class="public-nav">
        <van-tabs class="pt88" v-model="tapIndex" @click="onClickItem()">
          <van-tab v-for="(item, i) in items" :key="i" :title="item"></van-tab>
        </van-tabs>
      </div>
      <template v-else>
        <div class="result-more-box" :style="{'top':$store.state.paddingTop+'px'}">
          <div v-if="typeVal == 1" class="result-more-tit"><span class="color-222">商品</span>（{{goods_count2}}）</div>
          <div v-else-if="typeVal == 2" class="result-more-tit"><span class="color-222">帖子</span>（{{postbar_count2}}）</div>
          <!-- <div v-else class="result-more-tit"><span class="color-222">应用</span>（4）</div> -->
        </div>
      </template>
      <div class="nav-empty"></div>
      
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
      >
        <template v-if="(tapIndex==0 || tapIndex==3) && typeVal==0 || typeVal==3">
          <div v-if="appList.length > 0" class="search-session result-session">
            <div class="result-tit flex-between">
              <div class="result-tit-l"><span class="color-222">应用</span>（{{app_count}}）</div>
            </div>
            <div class="result-list list-690">
              <div v-for="(item, index) in appList" @click="goLink(item.url)" class="res-application-item">
                <img :src="item.icon_image" />
                <div class="application-name p-nowrap" v-html="item.application"></div>
              </div>
            </div>
          </div>
        </template>
        <template v-if="(tapIndex==0 || tapIndex==1) && typeVal==0 || typeVal==1">
          <div v-if="goodsList.length > 0" class="search-session result-session">
            <div v-if="typeVal!=1" class="result-tit flex-between">
              <div class="result-tit-l"><span class="color-222">商品</span>（{{goods_count}}）</div>
              <div @click="goMore(1)" class="result-tit-r flex-align-center"><img src="@/assets/img/icon_11.png" />更多商品</div>
            </div>
            <div class="result-list list-690">
              <template v-if="(tapIndex==0 || tapIndex==1) && typeVal==0">
                <div v-for="(item, index) in goodsList" v-if="index < 3" @click="linkFunc(5,{id:item.id})" class="res-goods-item flex-between">
                  <img class="res-goods-pic" :src="item.thumb" />
                  <div class="res-goods-info">
                    <div class="res-goods-name res-name p-nowrap" v-html="item.goods_name"></div>
                    <div v-if="item.goods_type > 1" class="flex-align-center">
                      <div v-if="item.goods_type == 2" class="res-goods-label res-goods-label-tm">特卖</div>
                      <div v-else class="res-goods-label res-goods-label-xssg">限时闪购</div>
                    </div>
                    <div class="res-goods-price">￥{{item.s_price/100}} <span v-if="item.y_price&&item.y_price!='0'">￥{{item.y_price/100}}</span></div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div v-for="(item, index) in goodsList2" @click="linkFunc(5,{id:item.id})" class="res-goods-item flex-between">
                  <img class="res-goods-pic" :src="item.thumb" />
                  <div class="res-goods-info">
                    <div class="res-goods-name res-name p-nowrap" v-html="item.goods_name"></div>
                    <div v-if="item.goods_type > 1" class="flex-align-center">
                      <div v-if="item.goods_type == 2" class="res-goods-label res-goods-label-tm">特卖</div>
                      <div v-else class="res-goods-label res-goods-label-xssg">限时闪购</div>
                    </div>
                    <div class="res-goods-price">￥{{item.s_price/100}} <span v-if="item.y_price&&item.y_price!='0'">￥{{item.y_price/100}}</span></div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
        <template v-if="(tapIndex==0 || tapIndex==2) && typeVal==0 || typeVal==2">
          <div v-if="postbarList.length > 0" class="search-session result-session">
            <div v-if="typeVal!=2" class="result-tit flex-between">
              <div class="result-tit-l"><span class="color-222">帖子</span>（{{postbar_count}}）</div>
              <div @click="goMore(2)" class="result-tit-r flex-align-center"><img src="@/assets/img/icon_11.png" />更多帖子</div>
            </div>
            <div class="result-list list-710">
              <template v-if="(tapIndex==0 || tapIndex==2) && typeVal==0">
                <div v-for="(item, index) in postbarList" v-if="index < 3" @click="linkFunc(30,{id: item.id})" class="res-post-item">
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
                  <div class="post-cont">{{item.content}}
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
                <div v-for="(item, index) in postbarList2" @click="linkFunc(30,{id: item.id})" class="res-post-item">
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
                  <div class="post-cont">{{item.content}}
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
      </van-list>
    </template>
	</div>
</template>

<script>
import { Tab, Tabs, Search, List } from 'vant'
import tfImageList from '@/components/tf-image-list'
import { thumbsUp } from '@/api/neighbours'
import { getHotWords, getSearchGoods, getSearchApp, getSearchPostbar } from '@/api/life.js'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Search.name]: Search,
    [List.name]: List,
    tfImageList
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      items: ['全部', '商品', '帖子', '应用'],
      res_name: "<span>热门</span>报修",
      search_val: '',    //搜索输入框值
      goods_val: '',     //商品输入框
      postbar_val: '',   //帖子输入框
      noneHidden: true,  //缺省页是否隐藏（搜索无结果）
      isFocus: true,   //显示热搜词和历史搜索
      searchList: [],    //历史搜索词列表
      hotWordsList: [],  //热搜词列表
      // resShopList: [],   //搜索结果列表
      goodsList: [],     //搜索结果（商品）
      goodsList2: [],    //搜索结果（商品）
      appList: [],       //搜索结果（应用）
      postbarList: [],   //搜索结果（帖子）
      postbarList2: [],  //搜索结果（帖子）
      goods_count: 0,    //搜索商品结果数量
      goods_count2: 0,    //搜索商品结果数量(单独搜索)
      app_count: 0,      //搜索应用结果数量
      postbar_count: 0,  //搜索帖子结果数量
      postbar_count2: 0,  //搜索帖子结果数量(单独搜索)

      page: 1,           //分页页码
      pageSize: 10,      //每页数
      noMoreHidden: true,//上拉加载更多，没有更多是否隐藏
      tapIndex: 0,       //0全部 1商品 2帖子 3应用
      typeVal: 0,        //1更多商品 2更多帖子 3更多应用

      loading: false,
      finished: true,
    }
  },
  created(){
    this.isSelect = this.$route.query.isSelect;
    // this.searchList = JSON.parse(localStorage.getItem('searchWords')) || [];
    this.searchList = JSON.parse(api.getPrefs({ key: 'searchWords' })) || [];
    this.getData();
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.input.getElementsByClassName('van-field__control')[0].focus()
    })
  },
  methods: {
    onLoad() {
      // 异步更新数据
      if(this.typeVal == 1){
        this.getSearchGoods(2);
      }else if(this.typeVal == 2){
        this.getSearchPostbar(2);
      }else {
        this.getSearchApp(2);
      }
      return;
    },
    getData () {
      //热词
      getHotWords().then(res => {
        if (res.success) {
          this.hotWordsList = res.data
        }
      })
    },
    //搜索商品
    initFunc(){
      this.finished = false;
      this.loading = false;
      this.page = 1;
    },
    getSearchGoods(type=''){
      // if(type == 1){
      //   this.finished = false;
      //   this.loading = false;
      //   this.page = 1;
      //   this.goodsList = [];
      //   if(!this.goods_val){
      //     this.goods_val = this.search_val;
      //   }
      //   console.log(this.goods_val);
      // }

      var search_key = this.search_val;
      if(this.typeVal == 1){
        search_key = this.goods_val;
      }
      getSearchGoods({
        search_key: search_key,
        page: this.page,
        search_num: this.pageSize,
      }).then(res => {
        if (res.success) {
          if(this.typeVal > 0){
            this.goodsList2 = this.page == 1 ? res.data : this.goodsList2.concat(res.data);
            if(res.data.length < this.pageSize){
              this.finished = true;
            }else {
              this.page = this.page+1;
            }
            this.loading = false;
            this.goods_count2 = res.count_num;
          }else {
            this.goodsList = this.page == 1 ? res.data : this.goodsList.concat(res.data);
            this.goods_count = res.count_num;
          }
        }
      })
    },
    //搜索app
    getSearchApp(){
      getSearchApp({
        search_key: this.search_val,
        pages: this.page,
        search_num: this.pageSize,
      }).then(res => {
        if (res.success) {
          this.appList = this.page == 1 ? res.data : this.appList.concat(res.data);
          this.app_count = res.count_num;
          if(this.typeVal > 0){
            if(res.data.length < this.pageSize){
              this.finished = true;
            }else {
              this.page = this.page+1;
            }
            this.loading = false;
          }
        }
      })
    },
    //搜索帖子
    getSearchPostbar(type=''){
      // var search_key = this.search_val;
      // if(type == 1){
      //   this.finished = false;
      //   this.loading = false;
      //   this.page = 1;
      //   this.postbarList = [];
      //   if(!this.postbar_val){
      //     this.postbar_val = this.search_val;
      //   }
      //   search_key = this.postbar_val;
      // }else if(type == 2){
      //   if(!this.postbar_val){
      //     this.postbar_val = this.search_val;
      //   }
      //   search_key = this.postbar_val;
      // }
      var search_key = this.search_val;
      if(this.typeVal == 2){
        search_key = this.postbar_val;
      }
      getSearchPostbar({
        search_key: search_key,
        pages: this.page,
        search_num: this.pageSize,
      }).then(res => {
        if (res.success) {
          
          if(this.typeVal > 0){
            this.postbarList2 = this.page == 1 ? res.data : this.postbarList2.concat(res.data);
            if(res.data.length < this.pageSize){
              this.finished = true;
            }else {
              this.page = this.page+1;
            }
            this.loading = false;
            this.postbar_count2 = res.count_num;
          }else {
            this.postbarList = this.page == 1 ? res.data : this.postbarList.concat(res.data);
            this.postbar_count = res.count_num;
          }
        }
      })
    },
    //取消
    cancelFunc(){
      if(this.typeVal > 0){
        this.typeVal = 0;
        this.finished = true;
        this.loading = false;
        this.page = 1;
      }else {
        this.$router.go(-1);
      }
    },
    //菜单切换
    onClickItem(index){
      console.log(this.tapIndex)
    },
    //更多
    goMore(typeVal){
      this.typeVal = typeVal;
      this.finished = false;
      this.loading = false;
      this.page = 1;
      if(typeVal == 1){
        this.goods_val = this.search_val;
      }else if(typeVal == 2){
        this.postbar_val = this.search_val;
      }
      // this.goSearch();
    },
    
    /**
     * 删除输入框内容
    */
    inputDel: function (e) {
      const that = this;
      that.setData({
        search_val: '',
        isFocus: true
      });
    },
    /**
     * 获取焦点
    */
    focus: function (e) {
      if(!this.isFocus){
        this.isFocus = true;
      }
    },
    /**
     * 失去焦点
    */
    blur: function (e) {
      this.isFocus = false;
    },
    /**
     * 获取输入框值
    */
    // getInputVal: function (e) {
    //   const that = this;
    //   key_word = e.detail.value;
    //   that.setData({
    //     search_val: key_word
    //   })
    // },
    /**
     * 点击关键词搜索
    */
    wordsSearch: function (val) {
      this.isFocus = false;
      this.search_val = val;
      this.noneHidden = true;
      this.noMoreHidden = true;
      this.page = 1;
      this.addSearch();
    },
    /**
     * 点击输入框搜索
    */
    onSearch: function (e) {
      this.isFocus = false;
      this.noneHidden = true;
      this.noMoreHidden = true;
      this.page = 1;
      this.addSearch();
    },
    /**
     * 加入历史搜索
    */
    addSearch: function (e) {
      var key_word = this.search_val;
      if (key_word) {
        for (var key in this.searchList) {
          if (key_word == this.searchList[key]) {
            this.searchList.splice(key, 1);
          }
        }
        
        let wordText = [];
        wordText[0] = key_word;
        this.searchList = wordText.concat(this.searchList);
        if (this.searchList.length > 30) {
          this.searchList = this.searchList.splice(30, 1);
        }
        // localStorage.setItem('searchWords', JSON.stringify(this.searchList));
        api.setPrefs({ key: 'searchWords', value: JSON.stringify(this.searchList) });
        console.log(this.searchList);
        this.goSearch();
      }

    },
    goSearch: function (e) {
      if(this.typeVal == 0){
        this.getSearchGoods();
        this.getSearchApp();
        this.getSearchPostbar();
      }else if(this.typeVal == 1){
        this.getSearchGoods();
      }else if(this.typeVal == 2){
        this.getSearchPostbar();
      }else {
        this.getSearchApp();
      }
      
      return;
      if (this.noMoreHidden) {
        app.util.request({
          'url': '/xcx/wxjson/search_goods',
          'cachetime': '0',
          'data': {
            uid: this.userId,
            keyword: key_word,
            page: this.page,
            cj_code: app.util.getScene()
          },
          success(res) {
            let result = res.data;
            if (result.code == '0000') {
              if (result.data.goods_list.length && result.data.goods_list.length > 0) {
                that.setData({
                  resShopList: this.page == 1 ? result.data.goods_list : this.resShopList.concat(result.data.goods_list),
                  noneHidden: true,
                });
              } else {
                that.setData({
                  noneHidden: false,
                });
              }
              if (result.data.goods_list.length == 0 && this.page > 1) {
                that.setData({
                  noneHidden: true,
                  noMoreHidden: false
                })
              }else {
                that.setData({
                  noMoreHidden: true
                })
              }
            }
          }
        });
      }
    },
    /**
     * 删除历史搜索
    */
    delSearch: function (e) {
      // localStorage.removeItem("searchWords");
      api.removePrefs({ key: 'searchWords' });
      this.searchList = [];
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
    //点赞
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
    goLink(url){
      this.$router.push(url);
    },
    linkFunc (type,obj={}) {
      switch (type){
        case 5:
        this.$router.push({
          path: '/store/goods-detail',
          query: {
            id: obj.id
          }
        })
        break;
        case 30:
        this.$router.push({
          path: '/pages/neighbours/details',
          query: {
            articleType: this.articleType,
            id: obj.id
          }
        })
        break;
      }
    },
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
  background-color: #fff;
  z-index: 20;
}
.input-empty {
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
  margin-top: 88px;
  z-index: 20;
}
.nav-empty {
  height: 98px;
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
.res-goods-label {
  height: 44px;
  line-height: 44px;
  padding: 0 11px;
  border-radius: 4px;
  font-size: 24px;
  margin: 10px 0 6px;
}
.res-goods-label-tm {
  color: #55b862;
  background-color: #eef8ef;
}
.res-goods-label-xssg {
  color: #eb5841;
  background-color: #fdeeec;
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
</style>
