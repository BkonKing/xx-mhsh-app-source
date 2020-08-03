<template>
	<div class="app-body white-bg" :style="{ 'min-height': windowHeight+'px'}">
    <div class="fixed-top">
      <div class="search-input-block flex-between">
        <div class="search-back flex-center" @click="$router.go(-1)">
          <img class="img-100" src="@/assets/img/icon_19.png" />
        </div>
        <div class="search-input-session flex-align-center" @click="linkFunc(6)">
          <img class="search-icon" src="@/assets/img/icon_11.png" />
          <input class="search-input" type="text" placeholder="输入关键词搜索" />
        </div>
      </div>
      
      <div class="right-header">
        <div class="right-nav">
          <scrollBar direction="x" :activeIndex="activeIndex">
            <div
              class="scroll-barItem"
              v-for="(item, index) in options"
              :key="index"
              @click="changeNav(item, index)"
              :class="index === activeIndex ? 'active' : null"
            >
              <div>{{item.name}}</div>
            </div>
          </scrollBar>
        </div>
        <div class="sort-session flex-align-center">
          <div :class="['price-sort', sort_val == 2 ? 'cur asc' : '',sort_val == 3 ? 'cur desc' : '']" @click="sortFunc(23)">价格</div>
          <div :class="['sales-sort', sort_val == 1 ? 'cur' : '']" @click="sortFunc(1)">销量</div>
        </div>
      </div>
    </div>
    <div v-if="1==2" class="empty-188"></div>
    <div v-else class="empty-276"></div>
		
    <!-- <div class="">
      <van-tree-select
  height="55vw"
  :items="items"
  :main-active-index.sync="activeIndex"
/>
    </div> -->
    <div class="classify-cont">
      <div class="classify-nav">
        <div v-for="(item,index) in leftNav" :class="[leftActiveIndex == index ? 'cur' : '', 'nav-item']" @click="categoryNav(index,item.id)">{{item.category}}</div>
      </div>
      <div class="classify-right">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="classify-list">
            <div v-for="(item,index) in list" class="classify-item flex-between" :data-id="2" @click="linkFunc(5,{id:2})">
              <img class="res-goods-pic" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622112505_52991.png" />
              <div class="res-goods-info">
                <div class="res-goods-name res-name p-nowrap">拍立得相机富士mini90 热门复古相</div>
                <div class="flex-align-center">
                  <div class="res-goods-label res-goods-label-tm">特卖</div>
                </div>
                <div class="res-goods-price">￥3800.00 <span>￥4000.00</span></div>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
    
	</div>
</template>

<script>
import { TreeSelect, List } from 'vant'
import scrollBar from '@/components/scroll-bar'
export default {
  components: {
    [TreeSelect.name]: TreeSelect,
    [List.name]: List,
    scrollBar
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      leftActiveIndex: 0,
      leftNav: [
        {id: 2, category: '休闲零食' },
        {id: 3, category: '酒水' },
        {id: 4, category: '冰饮' },
        {id: 7, category: '休闲零食' }
      ],
      activeIndex: 0,  //右侧菜单选中项
      options: [
        {id: 1, name: '首页'},
        {id: 2, name: '精选'},
        {id: 3, name: '限时抢购'},
        {id: 4, name: '热门推荐'},
        {id: 5, name: '聚划算'},
        {id: 6, name: '热门推荐'}, 
      ],

      sort_val: 0,         //排序（0.默认/无筛选 1.销量降序 2.价格升序 3.价格降序）

      list: [1,2,3,4],
      loading: false,
      finished: false
    }
  },
  methods: {
    onSubmit: function () {

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
        case 6:
        this.$router.push('/store/search');
        break;
      }
    },
    onLoad() {
      
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      if (this.list.length >= 40) {
        this.finished = true;
        console.log(222);
      }else {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;
      }
    
      // setTimeout(() => {
        
      // }, 1000);
    },
    //左侧菜单点击
    categoryNav(index, id) {
      this.leftActiveIndex = index;
    },
    //右侧菜单点击
    changeNav(item, index) {
      this.activeIndex = index;
    },
    // 排序
    sortFunc: function (sort='') {
      
      if(sort == 23){
        if(this.sort_val == 0 || this.sort_val == 1 || this.sort_val == 3){
          this.sort_val = 2;
        }else {
          this.sort_val = 3;
        }
      }else {
        this.sort_val = sort;
      }
      console.log(this.sort_val);
      return;
      
      if (sort_type =='default'){
        self.setData({
          sort_val: 1
        })
      }else {
        if (self.data.sort_val == 2){
          self.setData({
            sort_val: 3
          })
        }else {
          self.setData({
            sort_val: 2
          })
        }
      }
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
    },
  }
}
</script>

<style scoped>
@import '../../../styles/life.css';
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
}
.white-bg.app-body {
  background-color: #fff;
}

.fixed-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 22;
}
/*搜索*/
.search-input-block {
  height: 88px;
  padding-right: 30px;
  background-color: #fff;
}
.empty-188 {
  height: 188px;
}
.empty-276 {
  height: 276px;
}
.search-input-session {
  width: 640px;
  height: 66px;
  background-color: #f2f2f4;
  border-radius: 10px;
  display: flex;
}
.search-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  margin: 0 14px 0 20px;
}
.search-input {
  width: 570px;
  height: 50px;
  line-height: 50px;
  font-size: 28px;
  background-color: #f2f2f4;
}
.search-back {
  width: 80px;
  height: 100%;
  padding: 29px 31px;
}

.classify-cont {
  padding-left: 190px;
}
/*左侧菜单*/
.classify-nav {
  position: fixed;
  top: 88px;
  bottom: 0;
  left: 0;
  width: 160px;
  background-color: #f2f2f4;
  z-index: 30;
  overflow-y: auto;
}
.nav-item {
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 24px;
  color: #666;
}
.nav-item.cur{
  background-color: #fff;
  color: #eb5841;
  font-size: 26px;
  font-weight: bold;
}

 
/*右侧列表*/
.classify-right {
  position: relative;
}
.right-header {
  width: 560px;
  margin-left: 190px;
  background-color: #fff;
}
.right-nav {
  height: 101px;
  border-bottom: 1px solid #f0f0f0;
  z-index: 20;
}
.scroll-barItem {
  font-size: 26px;
}
.scroll-barItem div {
  height: 100px;
  line-height: 100px;
  padding: 0 20px;
  color: #8f8f94;
  position: relative;
}
.scroll-barItem.active div {
  color: #222222;
}
.scroll-barItem.active div:after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: -35px;
  width: 70px;
  height: 3px;
  border-radius: 1.5px;
  background-color: #eb5841;
}
.sort-session {
  height: 88px;
}
.sort-session > div {
  height: 76px;
  width: 154px;
  line-height: 76px;
  text-align: center;
  color: #8f8f94;
}
.price-sort {
  margin: 0 139px 0 50px;
  position: relative;
}
.sort-session .cur {
  color: #eb5841;
}
.price-sort::before,.price-sort::after {
  content: '';
  position: absolute;
  right: 25px;
  width: 0;
  height: 0;
  border-style: solid;
}
.price-sort::before {
  top: 27px;
  border-width: 0 8px 8px 8px;
  border-color: transparent transparent #ccc transparent;
}
.price-sort::after {
  bottom: 27px;
  border-width: 8px 8px 0 8px;
  border-color: #ccc transparent transparent transparent;
}
.price-sort.cur.asc::before {
  border-color: transparent transparent #eb5841 transparent;
}
.price-sort.cur.desc::after {
  border-color: #eb5841 transparent transparent transparent;
}
.classify-item {
  height: 160px;
  width: 530px;
  margin-bottom: 30px;
}
.res-goods-pic {
  width: 160px;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}
.res-goods-info {
  width: 350px;
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
</style>
