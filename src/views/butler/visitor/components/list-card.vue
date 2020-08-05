<template>
  <div class="tf-card tf-mb-base">
    <div class="list-item">
      <span class="tf-status-tag" :class="{'tf-status-gray': data.is_visit != 0}">{{isVisitText[data.is_visit]}}</span>
      <div class="tf-row tf-mb-base">
        <div class="tf-text-lg tf-text-grey">来访日期：</div>
        <div class="tf-text-lg">
          {{ data.stime }}
          <!-- - {{ data.etime }} -->
        </div>
      </div>
      <div class="tf-row tf-mb-base">
        <div class="tf-text-lg tf-text-grey">进出次数：</div>
        <div class="tf-text-lg">{{ data.vtimes | vtimes }}</div>
      </div>
      <div class="tf-row tf-mb-base">
        <div class="tf-text-lg tf-text-grey">同行人数：</div>
        <div class="tf-text-lg">{{ data.num }}人</div>
      </div>
      <div class="tf-row tf-mb-base">
        <div class="tf-text-lg tf-text-grey">访客信息：</div>
        <div>
          <span class="tf-text-lg">{{ data.realname }} {{ data.gender | sex }}</span>
          <div class="tf-text-lg tf-text-grey tf-mt-base">{{ data.mobile }} {{ data.car_number }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isVisitText: {
        0: '到访',
        1: '已访',
        2: '已过期'
      }
    }
  },
  filters: {
    sex (value) {
      const sexText = {
        1: '男',
        2: '女'
      }
      return sexText[value]
    },
    vtimes (value) {
      const vtime = {
        1: '当日一次',
        2: '当日两次',
        3: '当日三次及以上'
      }
      return vtime[value]
    }
  }
}
</script>

<style lang="less" scoped>
.list-item {
  position: relative;
  background-color: #fff;
  border-radius: @border-radius-md;
  margin-bottom: @padding-md;
  padding: 30px 0;
}
.tf-status-tag {
  right: -30px;
}
.tf-status-gray {
  background: #AAAAAA;
}
.visit-status {
  position: absolute;
  right: 20px;
}
</style>
