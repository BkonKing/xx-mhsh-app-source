<template>
  <div class="tf-card tf-mb-base">
    <div class="list-item" @click="onClick">
      <span
        class="tf-status-tag"
        :class="{'tf-status-gray': data.is_visit != 0}"
      >{{isVisitText[data.is_visit]}}</span>
      <div v-if="data.dftime" class="tf-row dftime">
        <div class="tf-text-lg tf-text-grey">到访时间：</div>
        <div class="tf-text-lg">{{ data.dftime }}</div>
      </div>
      <div class="tf-row tf-mb-base">
        <div class="tf-text-lg tf-text-grey">来访日期：</div>
        <div class="tf-text-lg">{{ data.lftime }}</div>
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
        0: '待来访',
        1: '已访',
        2: '已过期'
      }
    }
  },
  methods: {
    onClick () {
      if (this.data.is_visit === '0') {
        this.$router.push({
          name: 'visitorInvite',
          query: {
            id: this.data.id
          }
        })
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
.dftime {
  padding-bottom: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid #F0F0F0;
}
.tf-status-tag {
  top: 15px;
  right: -30px;
}
.tf-status-gray {
  background: #aaaaaa;
}
.visit-status {
  position: absolute;
  right: 20px;
}
</style>
