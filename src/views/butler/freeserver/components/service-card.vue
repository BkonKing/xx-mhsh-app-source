<template>
  <div class="service-card-box">
    <div
      v-for="(item, i) in data"
      :key="i"
      v-show="(!active || active == item.category_type) && (item.category.indexOf(search) !== -1)"
      class="service-card"
      :class="{'service-card--disabled': item.is_stop == 1 || (item.sy_num == 0 && item.category_type == 2)}"
      @click="showService(item)"
    >
      <div
        class="service-card-tag"
        :class="{'service-card-tag--blue':item.category_type==1, 'service-card-tag--green':item.category_type==2}"
      ></div>
      <div class="service-card-content">
        <div class="service-card-name">{{item.category}}</div>
        <div v-if="item.is_stop == 1" class="service-card-info service-card-info--gray">暂停服务</div>
        <div
          v-else-if="item.category_type == 1"
          class="service-card-info"
          :class="{'service-card-info--gray': item.pd_num == 0 || item.status == 0}"
        >{{item.pd_num ? (item.status == 0 ? `正在排队${item.pd_num}人` : `排队中：第${item.pd_num + 1}位`) : '当前无人排队'}}</div>
        <div
          v-else
          class="service-card-info"
          :class="{'service-card-info--gray': item.sy_num == 0}"
        >{{`剩余${item.sy_num}个可借`}}</div>
      </div>
    </div>
    <tfDialog v-model="show" :title="activeServe.category">
      <div class="qr-box" v-if="!success">
        <img class="qr-img" src="@/assets/app-icon.png" />
        <div class="qr-status-box">
          <div class="qr-triangle"></div>
          <div class="qr-status">{{statusText}}</div>
        </div>
      </div>
      <div class="qr-box qr-status-box" v-else-if="activeServe.status == 0">
        <div class="success-tag">
          <span class="tf-icon tf-icon-check"></span>
        </div>
        <template v-if="activeServe.category_type == 1">
          <div class="tf-text-lg">排队成功</div>
          <div class="tf-text-lg tf-text-primary">排队中：第{{activeServe.pd_num + 1}}位</div>
        </template>
        <div class="tf-text-lg" v-if="activeServe.category_type==2">借用成功</div>
      </div>
      <div class="qr-status-box" v-else>
        <template v-if="activeServe.category_type==1">
          <div class="box-tag">开始享受服务</div>
          <div class="tf-text-sm tf-text-grey">感谢您的支持，祝您愉快</div>
        </template>
        <template v-if="activeServe.category_type==2">
          <div class="box-tag">归还成功</div>
          <div class="tf-text-sm tf-text-grey">感谢您的支持，祝您愉快</div>
        </template>
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
    active: {
      type: [String, Number],
      default: ''
    },
    search: {
      type: [String, Number],
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      statusText: '',
      show: false,
      success: false,
      activeServe: {} // 当前选中服务
    }
  },
  methods: {
    /* 点击服务显示二维码 */
    showService (item) {
      const {
        category_type: categoryType,
        category,
        status,
        is_stop,
        is_lineup,
        sy_num: syNum
      } = item
      // 暂停使用或者没有可借的借用服务直接返回
      if (is_stop == 1 || (syNum == 0 && categoryType == 2)) {
        return
      }
      this.activeServe = item
      this.statusText = ''
      // categoryType: 1-人工 2-借用
      // eslint-disable-next-line eqeqeq
      if (categoryType == 1) {
        this.statusText = status === 0 && is_lineup == 1 ? '开始排队' : '开始享受服务'
        this.getServeQrcode(status)
        // eslint-disable-next-line eqeqeq
      } else if (categoryType == 2) {
        this.statusText = status === 0 ? '借用' : '归还'
        this.getBorrowQrcode(status)
      }
      this.show = true
    },
    // 人工服务二维码
    getServeQrcode (status) {
      setTimeout(() => {
        this.success = true
      }, 500)
    },
    // 借用服务二维码
    getBorrowQrcode () {
      setTimeout(() => {
        this.success = true
      }, 2000)
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
  background: #fff;
  border-radius: 10px;
  .service-card-tag {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: @padding-md;
    background-color: #aaa;
  }
  .service-card-name {
    width: 265px;
    font-size: 26px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 2px dashed #aaa;
    color: @text-color;
  }
  .service-card-tag--blue {
    background-color: @blue-dark;
  }
  .service-card-tag--green {
    background-color: @green-dark;
  }
}

.service-card--disabled {
  background: #f9f9fa;
  .service-card-tag {
    background-color: #aaa;
  }
  .service-card-name {
    color: @gray-7;
  }
}

.service-card-info {
  font-size: 24px;
  color: @red-dark;
}

.service-card-info--gray {
  color: @gray-7;
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
  height: 66px;
  line-height: 66px;
  font-size: 30px;
  border-radius: 33px;
  color: #fff;
  background-color: @red-dark;
  text-align: center;
}

.qr-triangle {
  .triangle();
}

.success-tag {
  width: 320px;
  height: 320px;
  text-align: center;
  background: #ffa110;
  color: #fff;
  border-radius: 50%;
  .tf-icon-check {
    font-size: 240px;
    line-height: 320px;
  }
  & + .tf-text-lg {
    margin-top: 80px;
    margin-bottom: 20px;
  }
}

.box-tag {
  width: 100%;
  height: 120px;
  line-height: 120px;
  margin: 75px 0 60px;
  background: #f2f2f4;
  border-radius: 10px;
  font-size: 34px;
  text-align: center;
  & + .tf-text-grey {
    margin-bottom: 68px;
  }
}
</style>
