<template>
	<div :class="[wordsShow ? 'white-bg' : '','app-body']" :style="{ 'min-height': windowHeight+'px'}">
    <div class="search-input-block flex-between">
      <div class="search-input-left flex-align-center">
        <img class="search-icon" src="@/assets/img/icon_11.png" />
        <input class="search-input" v-model="search_val" @focus="focus" type="text" placeholder="搜索应用、商品、帖子" />
      </div>
      <div class="search-cancel flex-center">取消</div>
    </div>
    <template v-if="!wordsShow">
      <div class="search-session search-session1">
        <div class="search-tit">热门搜索</div>
        <div class="search-list">
          <div class="search-item">电子产品</div>
          <div class="search-item">限时闪购</div>
          <div class="search-item">咖啡</div>
          <div class="search-item">商品</div>
          <div class="search-item">茶叶</div>
        </div>
      </div>
      <div class="search-session">
        <div class="search-tit">历史搜索<div class="search-del"><img class="img-100" src="@/assets/img/icon_12.png" /></div></div>
        <div class="search-list">
          <div class="search-item">电子产品</div>
          <div class="search-item">限时闪购</div>
          <div class="search-item">咖啡</div>
          <div class="search-item">商品</div>
          <div class="search-item">茶叶</div>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-if="1==2" class="public-nav">
        <van-tabs class="pt88" v-model="current" @click="onClickItem">
          <van-tab v-for="(item, i) in items" :key="i" :title="item"></van-tab>
        </van-tabs>
      </div>
      <div class="result-more-tit"><span class="color-222">商品</span>（2）</div>
      <div class="search-session result-session">
        <div class="result-tit flex-between">
          <div class="result-tit-l"><span class="color-222">应用</span>（2）</div>
        </div>
        <div class="result-list list-690">
          <div class="res-application-item">
            <img src="" />
            <div class="application-name p-nowrap" v-html="res_name"></div>
          </div>
          <div class="res-application-item">
            <img src="" />
            <div class="application-name res-name p-nowrap" v-html="res_name"></div>
          </div>
        </div>
      </div>
      <div class="search-session result-session">
        <div class="result-tit flex-between">
          <div class="result-tit-l"><span class="color-222">商品</span>（2）</div>
          <div class="result-tit-r flex-align-center"><img src="@/assets/img/icon_11.png" />更多商品</div>
        </div>
        <div class="result-list list-690">
          <div class="res-goods-item flex-between">
            <img class="res-goods-pic" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
            <div class="res-goods-info">
              <div class="res-goods-name res-name p-nowrap">拍立得相机富士mini90 热门复古相</div>
              <div class="flex-align-center">
                <div class="res-goods-label res-goods-label-tm">特卖</div>
              </div>
              <div class="res-goods-price">￥3800.00 <span>￥4000.00</span></div>
            </div>
          </div>
          <div class="res-goods-item flex-between">
            <img class="res-goods-pic" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
            <div class="res-goods-info">
              <div class="res-goods-name res-name p-nowrap">拍立得相机富士mini90 热门复古相</div>
              <div class="flex-align-center">
                <div class="res-goods-label res-goods-label-xssg">限时闪购</div>
              </div>
              <div class="res-goods-price">￥3800.00 <span>￥4000.00</span></div>
            </div>
          </div>
          <div class="res-goods-item flex-between">
            <img class="res-goods-pic" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
            <div class="res-goods-info">
              <div class="res-goods-name res-name p-nowrap">拍立得相机富士mini90 热门复古相</div>
              <div class="res-goods-price">￥3800.00 <span>￥4000.00</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="search-session result-session">
        <div class="result-tit flex-between">
          <div class="result-tit-l"><span class="color-222">帖子</span>（2）</div>
          <div class="result-tit-r flex-align-center"><img src="@/assets/img/icon_11.png" />更多帖子</div>
        </div>
        <div class="result-list list-710">
          <div class="res-post-item">
            <div class="post-item-header">
              <div class="post-user-info flex-align-center">
                <img class="post-user-photo" src="http://192.168.1.158/library/user_avatar/202007/0220/tx_39.jpg" />
                <div class="flex-column-center">
                  <div class="post-user-name">蔡文姬</div>
                  <div class="post-user-time">2020-07-07 12:00</div>
                </div>
              </div>
              <div class="post-group">公告小组</div>
            </div>
            <div class="post-cont">近日，教育部印发热门《大中小学劳动教育指导纲要（试行）》,明确要强化学生劳动观念，弘扬勤俭、奋斗、创新、奉献的劳动精神。
              <img src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
            </div>
            <div class="post-item-footer">
              <div class="post-icon flex-between">
                <div class="post-fabulous flex-align-center"><img src="@/assets/img/icon_15.png" />1万+</div>
                <div class="post-comment flex-align-center"><img src="@/assets/img/icon_14.png" />9999</div>
                <div class="post-point flex-center"><span></span><span></span><span></span></div>
              </div>
            </div>
          </div>
          <div class="res-post-item">
            <div class="post-item-header">
              <div class="post-user-info flex-align-center">
                <img class="post-user-photo" src="http://192.168.1.158/library/user_avatar/202007/0220/tx_39.jpg" />
                <div class="flex-column-center">
                  <div class="post-user-name">蔡文姬</div>
                  <div class="post-user-time">2020-07-07 12:00</div>
                </div>
              </div>
              <div class="post-group">公告小组</div>
            </div>
            <div class="post-cont">近日，教育部印发热门《大中小学劳动教育指导纲要（试行）》,明确要强化学生劳动观念，弘扬勤俭、奋斗、创新、奉献的劳动精神。</div>
            <div class="post-item-footer">
              <div class="post-icon flex-between">
                <div class="post-fabulous flex-align-center"><img src="@/assets/img/icon_15.png" />1万+</div>
                <div class="post-comment flex-align-center"><img src="@/assets/img/icon_14.png" />9999</div>
                <div class="post-point flex-center"><span></span><span></span><span></span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
	</div>
</template>

<script>
import { Tab, Tabs, Image } from 'vant'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      items: ['全部', '商品', '帖子', '应用'],
      res_name: "<span>热门</span>报修",
      search_val: '',    //搜索输入框值
      noneHidden: true,  //缺省页是否隐藏（搜索无结果）
      wordsShow: true,   //显示热搜词和历史搜索
      searchList: [],    //历史搜索词列表
      hotWordsList: [],  //热搜词列表
      resShopList: [],   //搜索结果列表

      page: 1,           //分页页码
      noMoreHidden: true,//上拉加载更多，没有更多是否隐藏
    }
  },
  methods: {
    onSubmit: function () {

    },
    created() {
      this.$nextTick((x)=>{   //正确写法
         this.$refs.inputs.focus();
      })
    },
    /**
     * 获取热门搜索词/request
    */
    getHotWords: function (e) {
      const that = this;
      app.util.request({
        'url': '/xcx/wxjson/hot_word',
        'cachetime': '0',
        'data': {
          uid: that.data.userId,
          cj_code: app.util.getScene()
        },
        success(res) {
          let result = res.data;
          if (result.code == '0000') {
            that.setData({
              hotWordsList: result.data.hot_word_list,
            })
          }
        }
      });
    },
    /**
     * 删除输入框内容
    */
    inputDel: function (e) {
      const that = this;
      that.setData({
        search_val: '',
        wordsShow: true
      });
      key_word = '';
    },
    /**
     * 获取焦点
    */
    focus: function (e) {
      const that = this;
      that.setData({
        // search_val: '',
        wordsShow: true
      });
    },
    /**
     * 失去焦点
    */
    blur: function (e) {
      const that = this;
      // that.setData({
      //   wordsShow: false
      // });
    },
    /**
     * 获取输入框值
    */
    getInputVal: function (e) {
      const that = this;
      key_word = e.detail.value;
      that.setData({
        search_val: key_word
      })
    },
    /**
     * 点击关键词搜索
    */
    wordsSearch: function (e) {
      const that = this;
      that.setData({
        wordsShow: false
      });
      key_word = e.currentTarget.dataset.words;

      that.setData({
        search_val: key_word,
        resShopList: [],
        noneHidden: true,
        noMoreHidden: true
      });
      that.data.page = 1;
      that.addSearch();
    },
    /**
     * 点击输入框搜索
    */
    compSearch: function (e) {
      const that = this;
      that.setData({
        wordsShow: false,
        search_val: key_word,
      });
      that.setData({
        resShopList: [],
        noneHidden: true,
        noMoreHidden: true
      });
      that.data.page = 1;
      that.addSearch();
    },
    /**
     * 加入历史搜索
    */
    addSearch: function (e) {
      const that = this;
      if (key_word) {
        that.setData({
          // searchVal: that.data.searchVal,
          resShopList: [],
        });
        for (var key in that.data.searchList) {
          if (key_word == that.data.searchList[key]) {
            that.data.searchList.splice(key, 1);
          }
        }
        let wordText = [];
        wordText[0] = key_word;
        that.setData({
          searchList: wordText.concat(that.data.searchList)
        });
        if (that.data.searchList.length > 30) {
          that.data.searchList.splice(30, 1);
          that.setData({
            searchList: that.data.searchList
          });
        }
        wx.setStorageSync('searchWords', that.data.searchList);
        that.goSearch();
      }
    },
    goSearch: function (e) {
      const that = this;
      if (that.data.noMoreHidden) {
        app.util.request({
          'url': '/xcx/wxjson/search_goods',
          'cachetime': '0',
          'data': {
            uid: that.data.userId,
            keyword: key_word,
            page: that.data.page,
            cj_code: app.util.getScene()
          },
          success(res) {
            let result = res.data;
            if (result.code == '0000') {
              if (result.data.goods_list.length && result.data.goods_list.length > 0) {
                that.setData({
                  resShopList: that.data.page == 1 ? result.data.goods_list : that.data.resShopList.concat(result.data.goods_list),
                  noneHidden: true,
                });
              } else {
                that.setData({
                  noneHidden: false,
                });
              }
              if (result.data.goods_list.length == 0 && that.data.page > 1) {
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
      const that = this;
      var addrId = e.currentTarget.dataset.id;
      that.setData({
        searchList: []
      });
      wx.removeStorageSync('searchWords');
      wx.showToast({
        title: '删除成功',
        duration: 2000
      });
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
}
.search-input-left {
  width: 611px;
  height: 60px;
  border: 2px solid #383838;
  border-radius: 10px;
  display: flex;
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
  margin: 0 50px 10px 0;
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
