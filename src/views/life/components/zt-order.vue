<template>
  <div v-show="thSwal" class="mask-bg" @click="calcel(0)">
    <div class="mask-block" @click.stop="calcel(1)">
      <div class="mask-close">
        <img class="img-100" src="@/assets/img/close.png" @click.stop="calcel(0)" />
      </div>
      <div class="th-body">
        <div class="th-bg">
          <div class="th-tit">提货二维码</div>
          <div class="th-info flex-column-center">
            <div class="flex-align-center">
              <div>手机号码:</div>
              <div>{{ infoData.rece_mobile }}</div>
            </div>
            <div class="flex-align-center th-address">
              <div>提货地点:</div>
              <div>{{ infoData.take_address }}</div>
            </div>
          </div>
        </div>
        <div class="th-cont flex-align-center">
          <template v-if="infoData.l_status != 1">
            <div class="th-tip">提货时请出示二维码给商家</div>
            <img class="wx-code" :src="infoData.qrCode" />
          </template>
          <template v-else>
            <div class="th-tip">{{infoData.s_txt}}</div>
            <div class="th-time">{{infoData.s_time}}</div>
            <img class="th-sucess-icon" src="@/assets/img/sucess.png" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLogisticsInfo } from '@/api/life.js'
export default {
  name: 'zt-order',
  props: {
    thSwal: {
      type: Boolean,
      default: false
    },
    remindTit: {
      type: String,
      default: ''
    },
    showFotter: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      infoData: ''
    }
  },
  methods: {
    // 自提物流
    getLogistics (id) {
      getLogisticsInfo({
        order_project_id: id
      }).then(res => {
        if (res.success) {
          this.infoData = res.data[0]
          // this.thSwal = true
        }
      })
    },
    calcel (val) {
      if (val == 0) {
        this.$emit('update:thSwal', false)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/life.css';
/*弹窗*/
.mask-block {
  min-height: 3.64rem;
  height: auto;
  padding: 0;
  .mask-body {
    padding: 0 50px;
  }
}
.mask-tit {
  height: 147px;
  font-size: 30px;
  color: #000;
  border-bottom: none;
}
.mask-btn div.mask-sure-btn {
  width: 215px;
}
.th-body {
  border-radius: 10px;
  overflow: hidden;
  .th-bg {
    background: linear-gradient(90deg, #F9866B, #EB5841);
  }
  .th-tit {
    height: 88px;
    line-height: 88px;
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    color: #FFFFFF;
  }
  .th-info {
    font-size: 24px;
    font-weight: 400;
    color: #FFFFFF;
    padding: 20px 30px;
    background: rgba(255, 255, 255, 0.1);
    & > div {
      min-height: 42px;
      line-height: 42px;
    }
    .flex-align-center div:nth-child(1) {
      width: 133px;
      flex-shrink: 0;
    }
    .th-address {
      align-items: flex-start;
      padding-top: 10px;
      div:nth-child(2) {
        word-break: break-all;
      }
    }
  }
  .th-cont {
    font-size: 24px;
    color: #8F8F94;
    flex-direction: column;
    height: 543px;
    .th-tip {
      line-height: 46px;
      margin: 38px auto 6px;
    }
    .th-time {
      line-height: 46px;
      margin-bottom: 86px;
    }
    img.wx-code {
      width: 380px;
      height: 380px;
      margin-top: 13px;
    }
    img.th-sucess-icon {
      width: 160px;
      height: 160px;
    }
  }
}
</style>
