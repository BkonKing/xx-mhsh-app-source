<template>
  <div class="map-body">
    <div ref="fixed-footer" class="bottom-fixed">
      <div class="cinema-box">
        <div class="cinema-name">{{ destinationInfo.name }}</div>
        <slot></slot>
        <div class="cinema-address">{{ destinationInfo.address }}</div>
      </div>
      <div class="open-app-btn">
        <van-button type="primary" size="large" @click="openAppPopup"
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
      :overlay="false"
      position="bottom"
      get-container="body"
      class="app-popup"
      :style="{ height: `${footerHeight}px` }"
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
import { bMapGetLocationInfo } from '@/utils/util'
export default {
  name: 'tfMap',
  props: {
    destinationInfo: {
      type: Object,
      default: () => ({
        name: '',
        address: '',
        lon: '',
        lat: ''
      })
    },
    // 返回目的地按钮文本，如果为空则不显示该按钮，默认为空
    btnText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      bMap: '',
      footerHeight: 0, // 底部高度
      lon: 0, // 经度
      lat: 0, // 纬度
      isAppVisiable: false, // 打开应用弹窗
      hasBMap: false, // 是否安装百度地图
      hasAMap: false, // 是否安装高德地图
      hasQQMap: false, // 是否安装腾讯地图
      hasAppleMap: false // 是否安装苹果自带地图
    }
  },
  created () {
    window.goback = new CustomEvent('goback')
    document.addEventListener('goback', this.goBack)
    window.setCenter = new CustomEvent('setCenter')
    document.addEventListener('setCenter', this.setCenter)
    window.showUserLocation = new CustomEvent('showUserLocation')
    document.addEventListener('showUserLocation', this.showUserLocation)
  },
  mounted () {
    if (process.env.VUE_APP_IS_APP === '1') {
      handlePermission({
        name: 'location',
        title: '定位服务未开启',
        message: '此功能需要授权定位权限才能更好为您提供服务，请授权',
        confirmButtonText: '开启'
      })
        .then(() => {
          this.bMap = api.require('bMap')
          this.getLocationInfo()
          this.getMapInstalled()
        })
        .catch(() => {
          this.goBack()
          this.$emit('unLocation')
        })
    } else {
      // todo:测试
      this.lon = 119.33887
      this.lat = 26.05312
      this.$emit('init', {
        lon: this.lon,
        lat: this.lat,
        data: {}
      })
      this.getMapInstalled()
    }
  },
  watch: {
    destinationInfo () {
      this.openMap()
    }
  },
  methods: {
    // 获取当前地址信息
    getLocationInfo () {
      // adCode:行政区编码
      bMapGetLocationInfo().then(data => {
        const { lon, lat } = data
        this.lon = lon
        this.lat = lat
        this.$emit('init', {
          lon,
          lat,
          data
        })
      })
    },
    // 获取本地地图APP安装情况
    getMapInstalled () {
      // 判断是否有百度地图
      mapInstalled(1)
        .then(() => {
          this.hasBMap = true
        })
        .catch(() => {
          this.hasBMap = false
        })
      // 判断是否有高德地图
      mapInstalled(2)
        .then(() => {
          this.hasAMap = true
        })
        .catch(() => {
          this.hasAMap = false
        })
      // ios系统下判断是否有苹果自带地图
      if (api.systemType === 'ios') {
        mapInstalled(3)
          .then(() => {
            this.hasAppleMap = true
          })
          .catch(() => {
            this.hasAppleMap = false
          })
      }
      // 判断是否有腾讯地图
      mapInstalled(4)
        .then(() => {
          this.hasQQMap = true
        })
        .catch(() => {
          this.hasQQMap = false
        })
    },
    // 打开地图
    openMap () {
      // 底部高度
      const footerHeight =
        (this.$refs['fixed-footer'] &&
          this.$refs['fixed-footer'].clientHeight) ||
        0
      this.footerHeight = footerHeight
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
            lon: this.destinationInfo.lon,
            lat: this.destinationInfo.lat
          },
          zoomLevel: 17,
          showUserLocation: true,
          fixed: true
        },
        ret => {
          if (ret.status) {
            this.addAnnotations()
            this.openFrame()
          }
        }
      )
    },
    /**
     * 在地图上显示用户位置，会自动移动地图可视区域中心点到用户当前坐标位置
     * https://docs.apicloud.com/Client-API/Open-SDK/bMap#showUserLocation
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
          lon: this.destinationInfo.lon,
          lat: this.destinationInfo.lat
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
              lon: this.destinationInfo.lon,
              lat: this.destinationInfo.lat
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
    // 开启打开地图应用popup
    openAppPopup () {
      this.getMapInstalled()
      this.isAppVisiable = true
    },
    /**
     * 打开APP
     * @param {number} type 类型 1：百度地图 2：高德地图 3：苹果地图 4：腾讯地图
     */
    openMapApp (type) {
      openMapApp({
        type,
        name: this.destinationInfo.name,
        lat: this.destinationInfo.lat,
        lon: this.destinationInfo.lon
      })
    },
    // 打开地图上按钮的frame页面，只暂用一小部分大小，不能全部覆盖，否则地图将无法缩放
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
          marginTop: api.safeArea.top,
          marginBottom: 0
        }
      })
      api.openFrame({
        name: 'mapOperation',
        url: `./map-operation.html?btnText=${this.btnText}`,
        useWKWebView: true,
        bgColor: 'rgba(0, 0, 0, 0)',
        pageParam: {
          btnText: this.btnText
        },
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
    goBack () {
      // 调用router回退页面
      this.$router.go(-1)
    }
  },
  beforeDestroy () {
    this.bMap && this.bMap.close()
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
.map-body {
  height: 100%;
}
.bottom-fixed {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 292px;
  position: fixed;
  bottom: 0;
  /deep/ .van-button--large {
    border-radius: 44px !important;
  }
  .cinema-box {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 30px;
    background: #fff;
    color: #222;
    box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.25);
    border-radius: 20px 20px 0px 0px;
  }
  .cinema-name {
    font-size: 32px;
    font-weight: bold;
    line-height: 1;
    color: #000;
  }
  .cinema-address {
    padding-top: 25px;
    font-size: 24px;
    line-height: 36px;
    color: #8f8f94;
    .text-multiple-ellipsis();
  }
  .open-app-btn {
    padding: 0 30px 30px;
    background: #fff;
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
  display: flex;
  flex-direction: column;
  // height: 292px;
  border-radius: 20px 20px 0px 0px;
  /deep/ .van-popup__close-icon {
    font-size: 42px;
  }
  /deep/ .van-popup__close-icon--top-right {
    top: 22px;
  }
}
.popup-title {
  margin-top: 24px;
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: 500;
  color: #000;
  text-align: center;
}
.map-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  .map-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    font-size: 24px;
    color: #8f8f94;
  }
  .map-item-img {
    width: 90px;
    height: 90px;
    margin-bottom: 24px;
  }
}
</style>
