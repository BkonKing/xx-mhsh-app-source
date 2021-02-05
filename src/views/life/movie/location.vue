<template>
  <div class="app-body">
    <van-nav-bar
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goBack"
    ></van-nav-bar>
    <div class="bottom-fixed">
      <div ref="fixed-footer" class="cinema-box">
        <div class="cinema-name">{{ info.cinema_name }}</div>
        <div class="cinema-address">{{ info.address }}</div>
        <van-button type="primary" size="large" @click="isAppVisiable = true"
          ><img
            class="path-icon"
            src="@/assets/imgs/movie_map_path.png"
          />到这去</van-button
        >
      </div>
    </div>
    <van-popup
      v-model="isAppVisiable"
      closeable
      position="bottom"
      get-container="body"
      class="app-popup"
    >
      <div class="popup-title">打开应用</div>
      <div class="map-list">
        <div v-if="hasBMap" class="map-item" @click="openMapApp(1)">
          <img
            class="map-item-img"
            src="@/assets/imgs/movie_baidu_map.png"
            alt=""
          />
          <div class="map-item-text">百度地图</div>
        </div>
        <div v-if="hasAMap" class="map-item" @click="openMapApp(2)">
          <img class="map-item-img" src="@/assets/imgs/movie_amap.png" alt="" />
          <div class="map-item-text">高德地图</div>
        </div>
        <div v-if="hasAppleMap" class="map-item" @click="openMapApp(3)">
          <img
            class="map-item-img"
            src="@/assets/imgs/movie_apple_map.png"
            alt=""
          />
          <div class="map-item-text">苹果地图</div>
        </div>
        <div v-if="hasQQMap" class="map-item" @click="openMapApp(4)">
          <img class="map-item-img" src="@/assets/imgs/movie_qmap.png" alt="" />
          <div class="map-item-text">腾讯地图</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { handlePermission } from '@/utils/permission'
import { mapInstalled, openMapApp } from '@/utils/apicloud_util'
import { getCinemaPosition } from '@/api/movie'
export default {
  data () {
    return {
      cinemaId: '',
      info: {},
      bMap: '',
      lon: 119.33887, // 经度
      lat: 26.05312, // 纬度
      isAppVisiable: false,
      hasBMap: true,
      hasAMap: true,
      hasQQMap: true,
      hasAppleMap: true
    }
  },
  created () {
    this.cinemaId = this.$route.query.id
    this.getCinemaPosition()
    this.bMap = api.require('bMap')
    this.getMapInstalled()
    // 绑定frame返回事件
    window.goback = new CustomEvent('goback')
    document.addEventListener('goback', this.goBack)
    window.setCenter = new CustomEvent('setCenter')
    document.addEventListener('setCenter', this.setCenter)
    window.showUserLocation = new CustomEvent('showUserLocation')
    document.addEventListener('showUserLocation', this.showUserLocation)
    return
    handlePermission({
      name: 'location',
      title: '定位服务未开启',
      message: '此功能需要授权定位权限才能更好为您提供服务，请授权',
      confirmButtonText: '开启'
    })
      .then(() => {
        this.bMap = api.require('bMap')
        this.getMap()
      })
      .catch(() => {
        this.goBack()
      })
  },
  mounted () {
    setTimeout(() => {
      this.getMap()
    }, 1000)
  },
  methods: {
    getMap () {
      const footerHeight =
        (this.$refs['fixed-footer'] &&
          this.$refs['fixed-footer'].clientHeight) ||
        0
      this.bMap.open(
        {
          rect: {
            x: 0,
            y: 0,
            w: api.winWidth,
            h: api.winHeight - footerHeight
            // h: 300
          },
          center: {
            lon: this.info.longitude,
            lat: this.info.latitude
          },
          zoomLevel: 17,
          showUserLocation: true,
          fixed: true
        },
        ret => {
          if (ret.status) {
            this.addAnnotations()
            this.setMaxAndMinZoomLevel()
            this.openFrame()
          }
        }
      )
    },
    // 获取影院位置
    getCinemaPosition () {
      getCinemaPosition({
        cinema_id: this.cinemaId,
        lat: this.lat,
        lng: this.lon
      }).then(({ data }) => {
        // latitude longitude
        this.info = data
      })
    },
    // 设置最大缩放比例
    setMaxAndMinZoomLevel () {
      this.bMap.setMaxAndMinZoomLevel({
        maxLevel: 18,
        minLevel: 10
      })
    },
    /**
     * 在地图上显示用户位置，会自动移动地图可视区域中心点到用户当前坐标位置
     * https://docs.apicloud.com/Client-API/Open-SDK/bMap#showUserLocation
     * trackingMode：（可选项）用户当前位置显示形式
     * 取值范围：
     * none（标准模式）注：Android平台为指向箭头，iOS平台为圆点
     * follow（跟踪模式）
     * compass（罗盘模式）
     */
    showUserLocation () {
      this.bMap.showUserLocation({
        zoomLevel: 17,
        trackingMode: 'none'
      })
    },
    // 根据经纬度设置百度地图中心点，此接口可带动画效果
    setCenter () {
      this.bMap.setCenter({
        zoomLevel: 17,
        coords: {
          lon: this.info.longitude,
          lat: this.info.latitude
        },
        animation: true
      })
    },
    // 在地图上添加标注信息 https://docs.apicloud.com/Client-API/Open-SDK/bMap#addAnnotations
    addAnnotations () {
      this.bMap.addAnnotations(
        {
          annotations: [
            {
              id: 1,
              lon: this.info.longitude,
              lat: this.info.latitude
            }
          ],
          icon: 'widget://res/annotation.png'
        },
        function (ret) {
          if (ret) {
            console.log(ret.id)
          }
        }
      )
    },
    // 获取本地地图APP安装情况
    getMapInstalled () {
      // 判断是否有百度地图
      mapInstalled(1)
        .then(() => {
          this.hasBMap = true
        })
        .catch(() => {})
      // 判断是否有高德地图
      mapInstalled(2)
        .then(() => {
          this.hasAMap = true
        })
        .catch(() => {})
      // ios系统下判断是否有苹果自带地图
      if (api.systemType === 'ios') {
        mapInstalled(3)
          .then(() => {
            this.hasAppleMap = true
          })
          .catch(() => {})
      }
      // 判断是否有腾讯地图
      mapInstalled(4)
        .then(() => {
          this.hasQQMap = true
        })
        .catch(() => {})
    },
    /**
     * 打开APP
     * @param {number} type 类型 1：百度地图 2：高德地图 3：苹果地图 4：腾讯地图
     */
    openMapApp (type) {
      openMapApp({
        type,
        name: this.info.cinema_name,
        lat: this.info.latitude,
        lon: this.info.longitude
      })
    },
    openFrame () {
      api.openFrame({
        name: 'mapClose',
        url: './map-close.html',
        useWKWebView: true,
        bgColor: 'rgba(0, 0, 0, 0)',
        rect: {
          x: 0,
          y: 0,
          w: '100px',
          h: '100px',
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          marginBottom: 0
        }
      })
      api.openFrame({
        name: 'mapOperation',
        url: './map-operation.html',
        useWKWebView: true,
        bgColor: 'rgba(0, 0, 0, 0)',
        rect: {
          x: 0,
          y: api.winHeight - this.$refs['fixed-footer'].clientHeight - 64,
          w: 'auto',
          h: '64px',
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          marginBottom: 0
        }
      })
    },
    // 关闭frame
    closeFrame () {
      api.closeFrame({
        name: 'mapClose'
      })
      api.closeFrame({
        name: 'mapOperation'
      })
    },
    goBack (index) {
      // 调用router回退页面
      this.$router.go(-1)
    }
  },
  beforeRouteLeave (to, from, next) {
    this.bMap && this.bMap.close()
    next()
  },
  beforeDestroy () {
    this.closeFrame()
    document.removeEventListener('goback', this.goBack)
    window.goback = ''
    document.removeEventListener('setCenter', this.setCenter)
    window.setCenter = ''
    document.removeEventListener('showUserLocation', this.showUserLocation)
    window.showUserLocation = ''
  }
}
</script>

<style lang="less" scoped>
.bottom-fixed {
  width: 100%;
  height: 312px;
  position: fixed;
  bottom: 0;
  .cinema-box {
    height: 100%;
    padding: 50px 30px 30px;
    background: #fff;
    color: #222;
    box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.25);
    border-radius: 10px 10px 0px 0px;
  }
  .cinema-name {
    font-size: 34px;
    font-weight: 600;
    line-height: 48px;
  }
  .cinema-address {
    margin-bottom: 50px;
    font-size: 24px;
    color: #8f8f94;
    line-height: 48px;
  }
  /deep/ .van-button__text {
    display: flex;
    align-items: center;
  }
  .path-icon {
    width: 34px;
    height: 44px;
    margin-right: 10px;
  }
}
.app-popup {
  height: 312px;
  /deep/ .van-popup__close-icon {
    font-size: 36px;
  }
}
.popup-title {
  margin-top: 24px;
  margin-bottom: 40px;
  font-size: 34px;
  font-weight: 500;
  color: #222222;
  text-align: center;
}
.map-list {
  display: flex;
  .map-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    font-size: 26px;
    color: #8f8f94;
  }
  .map-item-img {
    width: 90px;
    height: 90px;
    margin-bottom: 20px;
  }
}
</style>
