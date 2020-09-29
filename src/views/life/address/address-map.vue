<template>
  <div class="app-body">
    <div class="order-bar bar-white">
      <van-nav-bar
        title="收货地址"
        :fixed="true"
        :border="false"
        placeholder
        left-arrow
        @click-left="$router.go(-1)"
      ></van-nav-bar>
    </div>
    <div class="map-bottom bottom-fixed" :style="{'top': fixedTop,'height': fixedHeight}">
      <div class="search-box">
        <!-- <input type="text" placeholder="搜索地点" v-model="searchVal" @search="searchAddress" /> -->
        <van-search
          class="search-v"
          v-model="searchVal"
          placeholder="请输入搜索关键词"
          @search="searchAddress"
        />
      </div>
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
import eventBus from '@/api/eventbus.js';
export default {
  components: {
    [NavBar.name]: NavBar,
    [Search.name]: Search,
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      isSelect: 0,  //0不是选择地址 1选择地址
      searchVal: '',
      searchList: [],
      // searchList: [{name: 'gewagaw',address:'eee',lon: '111',lat: '22',city: 'dd'},{name: '个娃发个挖',address:'eee',lon: '111',lat: '22',city: 'dd'}],
      bMap: '',
      fixedTop: '344px',
      fixedHeight: '300px',
    }
  },
  created () {
    this.fixedTop = 344+this.$store.state.paddingTop + 'px';
    this.fixedHeight = api.winHeight - (344+this.$store.state.paddingTop) + 'px';
    this.getData()
  },
  deactivated(){
    // var bMap = api.require('bMap');
    // this.bMap.close();
  },
  methods: {
    getData(){
      var that = this;
      var permission = 'location';
      var resultList = api.hasPermission({
          list: [permission]
      });
      if (resultList[0].granted) {
          // 已授权，可以继续下一步操作
          that.getMap();
      } else {
          api.requestPermission({
              list: [permission],
          }, function(res) {
              if (res.list[0].granted) {
                that.getMap();
                  // 已授权，可以继续下一步操作
                  // api.alert({
                  //     msg: '已授权'
                  // });
              }else {
                that.$router.go(-1);
              }
          });
      }
    },
    getMap(){
      var bMap = api.require('bMap');
      var maptop = this.$store.state.paddingTop;
      this.bMap = bMap;
      var that = this;
      bMap.getLocation({
          accuracy: '100m',
          autoStop: true,
          filter: 1
      }, function(ret, err) {
          if (ret.status) {
              let lon_val = ret.lon;
              let lat_val = ret.lat
              //根据定位查找地址
              bMap.getNameFromCoords({
                  lon: lon_val,
                  lat: lat_val
              }, function(ret, err) {
                  if (ret.status) {
                    ret.poiList.forEach((item, index) => {
                      var obj = {name: '',address:'',lon: '',lat: '',city: ''};
                      // alert(item.name);
                      obj.name = item.name;
                      obj.address = item.address;
                      obj.lon = item.coord.lon;
                      obj.lat = item.coord.lat;
                      obj.city = item.city;
                      that.searchList.push(obj);
                    })
                    // that.searchList = address_data;
                    // that.searchList[0].name = ret.poiList[0].name;

                    // alert(ret.poiList[0].name+ret.address)
                    // alert(JSON.stringify(ret));
                  }
              });

              bMap.open({
                  rect: {
                      x: 0,
                      y: 44+maptop,
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
              }, function(ret) {
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
              });
          } else {
              // alert(err.code);
          }
      });


      return;
      // var bMap = api.require('bMap');
      // bMap.searchInCity({
      //     city: '全国',
      //     keyword: '三盛滨江',
      //     pageIndex: 0,
      //     pageCapacity: 4
      // }, function(ret, err) {
      //     if (ret.status) {
      //         alert(JSON.stringify(ret));
      //     } else {
      //         alert(JSON.stringify(err));
      //     }
      // });
    },
    searchAddress() {
      this.getData(this.searchVal);
      var searchVal = this.searchVal;
      var that = this;


      var map = api.require('bMap');
      map.searchInBounds({
          keyword: searchVal,
          lbLon: 74.546,
          lbLat: 21.267,
          rtLon: 136.244,
          rtLat: 53.69
      }, function(ret, err) {
          if (ret.status) {
              // alert(JSON.stringify(ret.results));
              that.searchList = ret.results;
          } else {
              // alert(JSON.stringify(err));
          }
      });return;



      // var bMap = api.require('bMap');
      // this.bMap.searchInCity({
      //     city: '全国',
      //     keyword: searchVal,
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
    },
    clickItem(index){
      // this.bMap.close();
      //传递一个map，chooseAddress是key，id是value
      eventBus.$emit('chooseMap',JSON.stringify(this.searchList[index]));
      //调用router回退页面
      this.$router.go(-1);
    }
  },
  beforeRouteLeave (to, from, next) {
    var bMap = api.require('bMap');
    bMap.close();
    next();
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
  .map-bottom {
    top: 750px;
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
    height: 126px;
    flex-wrap: wrap;
    border-bottom: 1px solid #f0f0f0;
  }
  .search-item div {
    width: 100%;
    height: 44px;
    line-height: 44px;
    color: #222;
  }
  div.search-cont {
    font-size: 24px;
    color: #8f8f94;
  }

</style>
