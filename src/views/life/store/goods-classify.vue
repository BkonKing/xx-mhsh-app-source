<template>
  <div class="app-body white-bg">
    <div class="body-block">
      <div
        :class="[
          navList.length == 0 ? 'empty-188' : 'empty-276',
          'search-absolute'
        ]"
      >
        <div class="absolute-top">
          <div class="search-input-block flex-between">
            <div class="search-back flex-center" @click="$router.go(-1)">
              <img class="img-100" src="@/assets/img/icon_19.png" />
            </div>
            <div
              class="search-input-session flex-align-center"
              @click="linkFunc(6)"
            >
              <img class="search-icon" src="@/assets/img/icon_11.png" />
              <input
                class="search-input"
                type="text"
                placeholder="输入关键词搜索"
              />
            </div>
          </div>

          <div class="right-header">
            <div v-if="navList.length > 0" class="right-nav">
              <scrollBar direction="x" :activeIndex="activeIndex">
                <div
                  class="scroll-barItem"
                  v-for="(item, index) in navList"
                  :key="index"
                  @click="changeNav(index, item.id)"
                  :class="index === activeIndex ? 'active' : null"
                >
                  <div>{{ item.category_name }}</div>
                </div>
              </scrollBar>
            </div>
            <div class="sort-session flex-align-center">
              <div
                :class="[
                  'price-sort',
                  sort_val == 2 ? 'cur asc' : '',
                  sort_val == 3 ? 'cur desc' : ''
                ]"
                @click="sortFunc(23)"
              >
                价格
              </div>
              <div
                :class="['sales-sort', sort_val == 1 ? 'cur' : '']"
                @click="sortFunc(1)"
              >
                销量
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="classify-cont">
        <div class="classify-nav-block">
          <div class="classify-nav">
            <div
              v-for="(item, index) in leftNav"
              :class="[leftActiveIndex == index ? 'cur' : '', 'nav-item']"
              @click="categoryNav(index, item.id)"
            >
              {{ item.category_name }}
            </div>
          </div>
        </div>

        <div
          :class="[
            navList.length == 0 ? '' : 'classify-right-276',
            'classify-right'
          ]"
          id="classify-body"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text=""
            @load="onLoad"
          >
            <div v-if="listData.length > 0" class="classify-list">
              <div
                v-for="(item, index) in listData"
                class="classify-item flex-between"
                :key="index"
                :data-id="2"
                @click="linkFunc(5, { id: item.id })"
              >
                <img class="res-goods-pic" :src="item.thumb" />
                <div class="res-goods-info">
                  <div class="res-goods-name res-name p-nowrap">
                    {{ item.goods_name }}
                  </div>
                  <div class="res-goods-tags flex-align-center">
                    <template v-if="item.goods_type > 1">
                      <div
                        :class="[
                          item.goods_type == 2
                            ? 'label-item-tm'
                            : 'label-item-sg',
                          'label-item-block'
                        ]"
                      >
                        {{ item.goods_type == 2 ? "特卖" : "闪购" }}
                      </div>
                    </template>
                    <div
                      v-for="(val, j) in item.tag"
                      :key="j"
                      class="label-item-block label-item-tip"
                      :style="{
                        'border-color': val.tag_color,
                        color: val.tag_color
                      }"
                    >
                      {{ val.tag_name }}
                    </div>
                  </div>
                  <div class="res-goods-price">
                    <price-show
                      :money="item.rmb_price"
                      :credit="item.xfb_num"
                    ></price-show>
                  </div>
                  <div
                    class="res-goods-price-original"
                    v-if="item.y_price && item.y_price != '0'"
                  >
                    ￥{{ item.y_price / 100 }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="empty-session">
              <img src="@/assets/img/empty_goods.png" />
              <div>暂无商品</div>
            </div>
          </van-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TreeSelect, List } from 'vant'
import scrollBar from '@/components/scroll-bar'
import PriceShow from '../../home/components/price-show'
import { getClassifyGoods } from '@/api/life.js'
export default {
  name: 'goodsClassify',
  components: {
    [TreeSelect.name]: TreeSelect,
    [List.name]: List,
    scrollBar,
    PriceShow
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      leftActiveIndex: 0,
      leftNav: [],
      activeIndex: 0, // 右侧菜单选中项
      category_id: '', // 分类id
      navList: [],

      sort_val: 0, // 排序（0.默认/无筛选 1.销量降序 2.价格升序 3.价格降序）

      page: 1, // 页码
      listData: [],
      loading: false,
      finished: false,
      marginTop: 0
    }
  },
  activated () {
    if (this.scrollTop) {
      document.getElementById('classify-body').scrollTop = this.scrollTop
    }
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.marginTop = this.$store.state.paddingTop
      }, 500)
    })
  },
  methods: {
    getGoodsData () {
      getClassifyGoods({
        page: this.page,
        category_id: this.category_id,
        order_type: this.sort_val
      }).then(res => {
        if (res.success) {
          this.flag = true
          console.log(this.leftNav.length)
          if (this.leftNav.length == 0) {
            this.leftNav = res.data.category_list
            if (res.data.category_list[this.leftActiveIndex].children) {
              this.navList =
                res.data.category_list[this.leftActiveIndex].children
            }
          }

          this.listData =
            this.page == 1
              ? res.data.goods_list
              : this.listData.concat(res.data.goods_list)
          this.isEmpty = !!(this.page == 1 && res.data.goods_list.length == 0)
          if (res.data.goods_list.length < res.pageSize) {
            this.finished = true
            this.flag = true
          } else {
            this.page = this.page + 1
            this.flag = false
          }
          this.loading = false
        }
      })
    },
    onLoad () {
      this.getGoodsData()
    },
    // 左侧菜单点击
    categoryNav (index, id) {
      this.leftActiveIndex = index
      this.category_id = this.leftNav[index].id
      if (this.leftNav[index].children) {
        this.navList = this.leftNav[index].children
        this.category_id = this.leftNav[index].children[0].id
      } else {
        this.navList = []
      }
      this.listInit()
    },
    // 右侧菜单点击
    changeNav (index, id) {
      this.activeIndex = index
      this.category_id = id
      this.listInit()
    },
    listInit () {
      this.page = 1
      this.loading = false
      this.finished = false
      this.listData = []
      if (!this.flag) {
        this.getGoodsData()
      }
    },
    // 排序
    sortFunc: function (sort = '') {
      if (sort == 23) {
        if (this.sort_val == 0 || this.sort_val == 1) {
          this.sort_val = 2
        } else {
          this.sort_val = this.sort_val == 2 ? 3 : 0
        }
      } else {
        this.sort_val = this.sort_val == 1 ? 0 : sort
      }
      this.listInit()
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
        case 6:
          this.$router.push('/store/search')
          break
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    console.log(to.name)
    if (to.name == 'life') {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    const el = document.getElementById('classify-body')
    this.scrollTop = (el && el.scrollTop) || 0
    next()
  }
}
</script>

<style scoped src="../../../styles/life.css"></style>
<style lang="less" scoped>
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
}
.white-bg.app-body {
  background-color: #fff;
}

.search-absolute {
  position: absolute;
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
.search-back img {
  width: 18px;
  height: 30px;
}

.classify-cont {
  /*padding-left: 190px;*/
  display: flex;
  justify-content: space-between;
}
/*左侧菜单*/
.classify-nav-block {
  /*margin-top: 88px;*/
  width: 160px;
  position: absolute;
  top: 88px;
  bottom: 0;
  left: 0;
  z-index: 30;
  overflow-y: auto;
  background-color: #f2f2f4;
  -webkit-overflow-scrolling: touch;
}
.classify-nav {
  width: 100%;
  height: 100%;
}
.nav-item {
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 24px;
  color: #666;
}
.nav-item.cur {
  background-color: #fff;
  color: #eb5841;
  font-size: 26px;
  font-weight: bold;
}

/*右侧列表*/
.classify-right {
  width: 530px;
  margin-right: 30px;
  position: absolute;
  right: 0;
  bottom: 0;
  top: 188px;
  overflow-y: auto;
}
.classify-right .van-list {
  height: 100%;
}
.classify-right-276.classify-right {
  top: 276px;
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
  display: inline-block;
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
  content: "";
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
.price-sort::before,
.price-sort::after {
  content: "";
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
  width: 530px;
  min-height: 160px;
  overflow: hidden;
  margin-bottom: 30px;
}
.res-goods-pic {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 4px;
  background-color: #f4f4f4;
}
.res-goods-info {
  width: 350px;
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
  display: flex;
  margin-top: 10px;
  padding-top: 10px;
  line-height: 1;
  font-size: 32px;
  color: #eb5841;
  /deep/ .price-icon {
    font-size: 24px;
  }
}
.res-goods-price-original {
  margin-top: 18px;
  font-size: 24px;
  line-height: 1;
  color: #8f8f94;
  text-decoration: line-through;
}
</style>
