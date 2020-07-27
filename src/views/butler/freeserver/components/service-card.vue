<template>
  <div class="service-card-box">
    <div class="service-card" :class="{'service-card--primary': item.sy_num || item.jy_num}" v-for="(item, i) in data" :key="i" @click="showService(item)">
      <div class="service-card-tag" :class="{'service-card-tag--primary': item.sy_num || item.jy_num}"></div>
      <div class="service-card-content">
        <div class="service-card-name" :class="{'service-card-name--primary': item.sy_num}">{{item.category}}</div>
        <div v-if="item.categoryType" class="service-card-info" :class="{'service-card-info--primary': item.jy_num}">{{item.jy_num ? `正在排队${item.jy_num}人` : '当前无人排队'}}</div>
        <div v-else class="service-card-info" :class="{'service-card-info--primary': item.sy_num}">{{`剩余${item.sy_num}个可借`}}</div>
      </div>
    </div>
    <tfDialog v-model="show" :title="title">
      <div class="qr-box">
        <img class="qr-img" src="@/assets/app-icon.png">
        <div class="qr-status-box">
          <div class="qr-triangle"></div>
          <div class="qr-status">{{statusText}}</div>
        </div>
      </div>
    </tfDialog>
  </div>
</template>

<script>
import tfDialog from '@/components/tf-dialog/index.vue'
export default {
  components: {
    tfDialog
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      statusText: '',
      title: '',
      show: false
    }
  },
  methods: {
    showService ({ category_type, category, status }) {
      this.statusText = ''
      if (category_type === 1) {
        this.statusText = status === 1 ? '开始' : '结束'
      } else if (category_type === 2) {
        this.statusText = status === 1 ? '借用' : '归还'
      }
      this.title = category
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>
  .service-card-box {
    @flex();
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .service-card {
    @flex();
    align-items: center;
    width: 345px;
    height: 150px;
    padding: 30px 20px;
    margin-bottom: @padding-lg;
    background-color: #f9f9fa;
    border-radius: 10px;
  }

  .service-card-tag {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: @padding-md;
    background-color: #aaa;
  }

  .service-card--primary {
    background-color: #fff;
  }

  .service-card-tag--primary {
    background-color: @blue-dark;
  }

  .service-card-name {
    width: 265px;
    font-size: 26px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom-width: 2px;
    border-bottom-style: dashed;
    border-bottom-color: #aaa;
    color: @gray-7;
  }

  .service-card-name--primary {
    color: @text-color;
  }

  .service-card-info {
    font-size: 24px;
    color: @gray-7;
  }

  .service-card-info--primary {
    color: @red-dark;
  }

  .qr-box {
    padding: 40px 70px;
  }

  .qr-img {
    width: 320px;
    height: 320px;
  }

  .qr-status-box {
    @flex-column();
    align-items: center;
    margin-top: 26px;
  }

  .qr-status {
    width: 320px;
    height:66px;
    line-height: 66px;
    font-size:30px;
    border-radius:33px;
    color: #fff;
    background-color: @red-dark;
    text-align: center;
  }

  .qr-triangle {
    .triangle();
  }
</style>
