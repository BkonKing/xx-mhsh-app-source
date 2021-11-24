<template>
  <div class="service-card-box">
    <div
      v-for="(item, index) in data"
      :key="item.id"
      v-show="
        (!categoryType || categoryType == item.category_type) &&
          (!checkedStatus || checkedStatus == item.server_status) &&
          item.category.indexOf(search) !== -1
      "
      class="service-card"
      :class="{
        'service-card--disabled': item.is_stop == 1 || !item.appointment
      }"
      @click="showService(item, index)"
    >
      <div
        class="service-card-tag"
        :class="{
          'service-card-tag--blue': item.category_type === 1,
          'service-card-tag--green': item.category_type === 2
        }"
      ></div>
      <div class="service-card-content">
        <div class="service-card-name">{{ item.category }}</div>
        <div
          v-if="item.is_stop == 1 || !item.appointment"
          class="service-card-info"
        >
          {{ item.is_stop == 1 ? "暂停服务" : "仅部分用户可享受服务" }}
        </div>
        <div v-else class="service-card-info">
          <span
            v-if="[1, 2, 3].includes(item.server_status)"
            class="status-tag status-tag-end"
            :class="{ 'status-tag-ing': [2, 3].includes(item.server_status) }"
            >{{ item.server_status | statusName }}</span
          >
          <span :class="{ 'tf-text-red': [2, 3].includes(item.server_status) }">{{
            item | pdText
          }}</span>
        </div>
      </div>
    </div>
    <service-pop
      v-model="popVisible"
      :data="activeServe"
      :id="activeServe.id"
      @change="changeServer"
    ></service-pop>
  </div>
</template>

<script>
import ServicePop from './ServicePop'
import { mapGetters } from 'vuex'
export default {
  components: {
    ServicePop
  },
  props: {
    categoryType: {
      type: [String, Number],
      default: ''
    },
    checkedStatus: {
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
      popVisible: false,
      // FNScanner: null,
      activeServe: {}, // 当前选中服务
      activeIndex: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'currentProject'])
  },
  methods: {
    // 点击服务显示二维码
    showService (item, index) {
      const { is_stop: isStop, appointment } = item
      // 暂停使用或者没有可借的借用服务直接返回
      if (+isStop === 1 || appointment === 0) {
        return
      }
      this.activeServe = item
      this.activeIndex = index
      this.popVisible = true
    },
    changeServer (data) {
      this.$emit('change', {
        index: this.activeIndex,
        data
      })
    }
  },
  filters: {
    statusName (status) {
      const statusName = {
        1: '已预约',
        2: '排队中',
        3: '待归还'
      }
      return statusName[status]
    },
    pdText ({
      category_type: type,
      server_status: status,
      appointment_count: appointmentCount,
      server_count: serverCount,
      remaining_count: remainingCount,
      service_queue: serverQueue,
      return_time: returnTime
    }) {
      if ([2, 3].includes(status)) {
        const inProgress = {
          2: `第${serverQueue}位`, // 排队中
          3: returnTime && `请${returnTime.substring(5, 10)}归还` // 待归还
        }
        return inProgress[status] || ''
      } else {
        // 借用需显示剩余数量
        const borrowRemain = type === 2 ? `(剩余${remainingCount || 0}个)` : ''
        // 有预约则显示预约
        return appointmentCount
          ? `${appointmentCount}人预约${borrowRemain}`
          : `累计服务${serverCount}人${borrowRemain}`
      }
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
  position: relative;
  width: 345px;
  min-height: 144px;
  padding: 0 18px;
  margin-bottom: @padding-lg;
  background: #fff;
  border-radius: 10px;
  .service-card-tag {
    position: absolute;
    left: 0;
    top: 22px;
    width: 6px;
    height: 32px;
    background: #00a0e9;
    border-radius: 3px;
  }
  .service-card-name {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 82px;
    padding: 4px 0;
    font-size: 26px;
    font-weight: bold;
    line-height: 36px;
    color: #222222;
    border-bottom: 2px dotted #cccccc;
  }
  .service-card-tag--blue {
    background-color: #00a0e9;
  }
  .service-card-tag--green {
    background-color: #6bc572;
  }
}

.service-card--disabled {
  background: #eeeeee;
  .service-card-tag {
    background-color: #bbbbbb;
  }
  .service-card-name {
    color: #8f8f94;
  }
}

.service-card-info {
  display: flex;
  align-items: center;
  height: 60px;
  font-size: 24px;
  color: @gray-7;
  .status-tag {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 88px;
    height: 42px;
    padding: 0 8px;
    margin-right: 10px;
    border-radius: 6px;
    font-size: 22px;
    font-weight: bold;
    line-height: 1;
  }
  .status-tag-end {
    background: #febf001a;
    color: #febf00;
  }
  .status-tag-ing {
    background: #ff65551a;
    color: #ff6555;
  }
}
.tf-text-red {
  color: #ff6555;
}
</style>
