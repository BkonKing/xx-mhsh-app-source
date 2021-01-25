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
    <div class="map-bottom bottom-fixed" :style="{'top': fixedTop > 0 ? fixedTop+'px' : 'auto','height': fixedHeight+'px'}">
      <div class="search-list">
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Search } from 'vant'
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
      nowHeight: '0' // 实时屏幕高度
    }
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
    clickItem (index) {
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

</style>
