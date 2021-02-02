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
      <div class="map-operate">
        <div class="tf-icon tf-icon-dingwei" @click="setCenter">
          <span class="tf-text">返回商家</span>
        </div>
        <div class="tf-icon tf-icon-dingwei1" @click="showUserLocation"></div>
      </div>
      <div ref="fixed-footer" class="cinema-box">
        <div class="cinema-name">{{ info.cinema_name }}</div>
        <div class="cinema-address">{{ info.address }}</div>
        <van-button type="primary" size="large">到这去</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { handlePermission } from '@/utils/permission'
import { getCinemaPosition } from '@/api/movie'
import { set } from 'vuedraggable'
export default {
  data () {
    return {
      cinemaId: '',
      info: {},
      bMap: ''
    }
  },
  created () {
    this.cinemaId = this.$route.query.id
    this.getCinemaPosition()
    this.bMap = api.require('bMap')
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
      const footerHeight = (this.$refs['fixed-footer'] && this.$refs['fixed-footer'].clientHeight) || 0
      console.log(footerHeight)
      this.bMap.open(
        {
          rect: {
            x: 0,
            y: 0,
            w: api.winWidth,
            h: api.winHeight - footerHeight
          },
          center: {
            lon: this.info.longitude,
            lat: this.info.latitude
          },
          zoomLevel: 17,
          showUserLocation: true,
          fixed: true
        },
        function (ret) {
          if (ret.status) {
          }
        }
      )
    },
    // 获取影院位置
    getCinemaPosition () {
      getCinemaPosition({
        cinema_id: this.cinemaId
      }).then(({ data }) => {
        // latitude longitude
        this.info = data
      })
    },
    goBack (index) {
      // 调用router回退页面
      this.$router.go(-1)
    },
    /**
     * 在地图上显示用户位置，会自动移动地图可视区域中心点到用户当前坐标位置
     * isShow：
     * 类型：布尔
     * 描述：（可选项）是否显示用户位置
     * 默认值：true
     * trackingMode：
     * 类型：字符串
     * 描述：（可选项）用户当前位置显示形式
     * 默认值：none
     * 取值范围：
     * none（标准模式）注：Android平台为指向箭头，iOS平台为圆点
     * follow（跟踪模式）
     * compass（罗盘模式）
     * imageName：
     * 类型：字符串
     * 描述：（可选项）自定义当前位置图标的图片名称 (android不支持)
     * 注意：使用此模块需要自定义模块，参见“概述”内容
     * 默认值：百度地图默认当前位置图标
     * imagePath:
     * 类型：字符串
     * 描述：(可选项)当前位置显示图标的图片，支持fs,widget (ios不支持)
     * 默认值：百度地图默认当前位置图标
     */
    showUserLocation () {
      this.bMap.showUserLocation({
        isShow: true,
        trackingMode: 'none'
      })
    },
    // 根据经纬度设置百度地图中心点，此接口可带动画效果
    setCenter () {
      this.bMap.setCenter({
        coords: {
          lon: this.info.longitude,
          lat: this.info.latitude
        },
        animation: true
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.bMap && this.bMap.close()
    next()
  }
}
</script>

<style lang="less" scoped>
.bottom-fixed {
  width: 100%;
  position: fixed;
  bottom: 0;
  .cinema-box {
    padding: 30px;
    background: #fff;
    color: #222;
    box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.25);
    border-radius: 10px 10px 0px 0px;
  }
  .map-operate {
    display: flex;
    justify-content: flex-end;
    height: 88px;
    padding-right: 30px;
    margin-bottom: 40px;
    .tf-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 88px;
      padding: 0 24px;
      margin-left: 20px;
      font-size: 43px;
      background: #ffffff;
      box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.2);
      border-radius: 44px;
    }
    .tf-text {
      margin-left: 10px;
    }
  }
  .cinema-name {
    font-size: 34px;
    font-weight: 600;
    line-height: 48px;
  }
  .cinema-address {
    margin-bottom: 20px;
    font-size: 24px;
    color: #8f8f94;
    line-height: 48px;
  }
}
</style>
