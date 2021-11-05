<template>
  <div class="app-body">
    <div class="order-bar bar-white">
      <van-nav-bar
        :title="barTitle"
        :fixed="true"
        :border="false"
        placeholder
        left-arrow
        @click-left="$router.go(-1)"
      ></van-nav-bar>
    </div>
    <div class="map-bottom bottom-fixed" :style="{'top': fixedTop > 0 ? fixedTop+'px' : 'auto','height': fixedHeight+'px'}">
      <form>
        <div class="search-box">
          <van-search
            class="search-v"
            v-model="searchVal"
            placeholder="请输入搜索关键词"
            @input="searchAddress"
          />
        </div>
      </form>
      <div class="search-list">
        <div v-for="(item, index) in searchList" @click="clickItem(index)" class="search-item flex-column-center">
          <div class="search-name">{{item.name}}</div>
          <div class="search-cont">{{item.address}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Search } from 'vant'
import eventBus from '@/utils/eventbus.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Search.name]: Search
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      isSelect: 0, // 0不是选择地址 1选择地址
      searchVal: '',
      searchList: [],
      // searchList: [{name: 'gewagaw',address:'ee',lon: '111',lat: '22',city: 'dd'},{name: '个娃发个挖',address:'eee',lon: '111',lat: '22',city: 'dd'}],
      bMap: '',
      fixedTop: '344',
      fixedHeight: '300',
      defaultHeight: '0', // 默认屏幕高度
      nowHeight: '0', // 实时屏幕高度
      barTitle: '收货地址'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'releaseEdit') {
        vm.barTitle = '任务完成地点'
      }
    })
  },
  created () {
    this.getData()
    const that = this
    setTimeout(() => {
      that.fixedTop = 344 + that.$store.state.paddingTop
      that.fixedHeight = api.winHeight - (344 + that.$store.state.paddingTop)
      that.defaultHeight = api.winHeight
    }, 500)
  },
  mounted: function () {
    window.onresize = () => {
      return (() => {
        // 实时屏幕高度
        this.nowHeight = api.winHeight
      })()
    }

    const that = this
    if (api.systemType == 'ios') {
      api.addEventListener({
        name: 'keyboardshow'
      }, function (ret, err) {
        const middleHeight = that.defaultHeight - that.fixedTop - ret.h
        const bli = api.winWidth / 750
        if (middleHeight < 122 * bli && middleHeight > -100) {
          that.bMap.setRect({
            rect: {
              x: 0,
              y: 44 + that.$store.state.paddingTop,
              w: api.winWidth,
              h: 300 + middleHeight - 122 * bli
            }
          })
          // that.fixedTop = 0;
          that.fixedTop = that.fixedTop + ret.h * bli
          // that.fixedTop = 344+that.$store.state.paddingTop - 122 + middleHeight;
          that.fixedHeight = 122 * bli
        }
      })

      api.addEventListener({
        name: 'keyboardhide'
      }, function (ret, err) {
        that.bMap.setRect({
          rect: {
            x: 0,
            y: 44 + that.$store.state.paddingTop,
            w: api.winWidth,
            h: 300
          }
        })
        that.fixedTop = 344 + that.$store.state.paddingTop
        that.fixedHeight = api.winHeight - (344 + that.$store.state.paddingTop)
      })
    }
  },
  methods: {
    getData () {
      var that = this
      var permission = 'location'
      var resultList = api.hasPermission({
        list: [permission]
      })
      if (resultList[0].granted) {
        // 已授权，可以继续下一步操作
        that.getMap()
      } else {
        api.requestPermission({
          list: [permission]
        }, function (res) {
          if (res.list[0].granted) {
            that.getMap()
            // 已授权，可以继续下一步操作
            // api.alert({
            //     msg: '已授权'
            // });
          } else {
            that.$router.go(-1)
          }
        })
      }
    },
    getMap () {
      var bMap = api.require('bMap')
      var maptop = this.$store.state.paddingTop
      this.bMap = bMap
      var that = this
      bMap.getLocation({
        accuracy: '100m',
        autoStop: true,
        filter: 1
      }, function (ret, err) {
        if (ret.status) {
          const lon_val = ret.lon
          const lat_val = ret.lat
          // 根据定位查找地址
          bMap.getNameFromCoords({
            lon: lon_val,
            lat: lat_val
          }, function (ret, err) {
            if (ret.status) {
              that.nowCity = ret.city
              ret.poiList.forEach((item, index) => {
                var obj = { name: '', address: '', lon: '', lat: '', city: '' }
                // alert(item.name);
                obj.name = item.name
                obj.address = item.address
                obj.lon = item.coord.lon
                obj.lat = item.coord.lat
                obj.city = item.city
                that.searchList.push(obj)
              })
              // that.searchList = address_data;
              // that.searchList[0].name = ret.poiList[0].name;

              // alert(ret.poiList[0].name+ret.address)
              // alert(JSON.stringify(ret));
            }
          })

          bMap.open({
            rect: {
              x: 0,
              y: 44 + maptop,
              w: api.winWidth,
              h: 300
            },
            center: {
              lon: lon_val,
              lat: lat_val
            },
            zoomLevel: 15,
            showUserLocation: true,
            fixedOn: api.frameName,
            fixed: true
          }, function (ret) {
            if (ret.status) {
              // bMap.searchInCity({
              //     city: '福州',
              //     keyword: val,
              //     pageIndex: 0,
              //     pageCapacity: 10
              // }, function(ret, err) {
              //     if (ret.status) {
              //         alert(JSON.stringify(ret.results));
              //         that.searchList = ret.results;
              //     } else {
              //         alert(JSON.stringify(err));
              //     }
              // });
            }
          })
        } else {
          // alert(err.code);
        }
      })
    },
    searchAddress () {
      // this.getData(this.searchVal);
      var searchVal = this.searchVal
      var that = this

      var map = api.require('bMap')

      map.searchInCity({
        city: that.nowCity,
        keyword: searchVal,
        pageIndex: 0,
        pageCapacity: 20
      }, function (ret, err) {
        if (ret.status) {
          // alert(JSON.stringify(ret.results));
          const res1 = ret.results
          const dataArr = []
          if (res1[0].address && res1[0].address != '(null)') {
            for (let k = 0; k < res1.length; k++) {
              if (res1[k].name.indexOf(searchVal) > -1) {
                dataArr.push(res1[k])
              }
            }
            that.searchList = dataArr
          } else {
            that.searchList = []
          }

          map.searchInBounds({
            keyword: searchVal,
            lbLon: 74.546,
            lbLat: 21.267,
            rtLon: 136.244,
            rtLat: 53.69,
            pageCapacity: 20
          }, function (ret, err) {
            if (ret.status) {
              // alert(JSON.stringify(ret.results));
              const searchRes = ret.results
              const dataArr2 = []
              if (searchRes[0].address && searchRes[0].address != '(null)') {
                for (let x = 0; x < searchRes.length; x++) {
                  if (searchRes[x].city.indexOf(that.nowCity) < 0) {
                    dataArr2.push(searchRes[x])
                  }
                }
                that.searchList = that.searchList.concat(dataArr2)
              } else {
                for (let j = 0; j < searchRes.length; j++) {
                  if (searchRes[j].name.indexOf(that.nowCity) < 0) {
                    map.searchInCity({
                      city: searchRes[j].name,
                      keyword: searchVal,
                      pageIndex: 0,
                      pageCapacity: 20
                    }, function (ret, err) {
                      if (ret.status) {
                        // alert(JSON.stringify(ret.results));
                        that.searchList = that.searchList.concat(ret.results)
                      }
                    })
                  }
                }
              }
              // alert(JSON.stringify(ret.results));
            } else {
              // alert(JSON.stringify(err));
            }
          })
        } else {
          // alert(JSON.stringify(err));
        }
      })
    },
    clickItem (index) {
      this.$store.commit('setMap_info', this.searchList[index])
      // 调用router回退页面
      this.$router.go(-1)
    }
  },
  beforeRouteLeave (to, from, next) {
    var bMap = api.require('bMap')
    bMap.close()
    next()
  }
}
</script>

<style scoped>
@import '../../../styles/life.css';
  .app-body {
    background-color: #fff;
    font-size: 28px;
    overflow: hidden;
  }
  .map-bottom {
    top: 750px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 10px 10px 0 0;
  }
  .search-box {
    height: 122px;
    padding: 30px;
  }
  .search-v {
    height: 100%;
    padding: 0;
  }
  .search-box input {
    border: 2px solid #383838;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 24px;
  }
  .search-box input:focus {
    text-align: left;
    padding-left: 20px;
  }
  .search-list {
    padding: 0 30px;
    position: absolute;
    top: 122px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
  .search-item {
    min-height: 126px;
    flex-wrap: wrap;
    border-bottom: 1px solid #f0f0f0;
  }
  .search-item div {
    width: 100%;
    min-height: 44px;
    line-height: 44px;
    color: #222;
  }
  div.search-cont {
    font-size: 24px;
    color: #8f8f94;
  }

</style>
