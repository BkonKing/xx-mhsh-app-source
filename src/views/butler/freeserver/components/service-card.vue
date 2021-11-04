<template>
  <div class="service-card-box">
    <div
      v-for="(item, i) in data"
      :key="i"
      v-show="
        (!active || active == item.category_type) &&
          item.category.indexOf(search) !== -1
      "
      class="service-card"
      :class="{
        'service-card--disabled':
          item.is_stop == 1 ||
          (item.sy_num == 0 &&
            item.category_type == 2 &&
            item.server_status == 0)
      }"
      @click="showService(item)"
    >
      <div
        class="service-card-tag"
        :class="{
          'service-card-tag--blue': item.category_type == 1,
          'service-card-tag--green': item.category_type == 2
        }"
      ></div>
      <div class="service-card-content">
        <div class="service-card-name">{{ item.category }}</div>
        <div v-if="item.is_stop == 1" class="service-card-info">
          暂停服务
        </div>
        <div
          v-else
          class="service-card-info"
          :class="{ 'tf-text-primary': item.server_status == 1 }"
        >
          <span class="status-tag status-tag-end">排队中</span>
          <span>{{ item | pdText }}</span>
        </div>
      </div>
    </div>
    <service-pop v-model="popVisible" :data="activeServe"></service-pop>
  </div>
</template>

<script>
import ServicePop from './ServicePop'
import { mapGetters } from 'vuex'
import { getServerCode, serverCodeStatus } from '@/api/butler.js'
export default {
  components: {
    ServicePop
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
      popVisible: false,
      // FNScanner: null,
      activeServe: {} // 当前选中服务
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'currentProject'])
  },
  methods: {
    // 点击服务显示二维码
    showService (item) {
      const {
        category_type: categoryType,
        server_status: status,
        is_stop: isStop,
        sy_num: syNum
      } = item
      // 暂停使用或者没有可借的借用服务直接返回
      if (
        +isStop === 1 ||
        (syNum === 0 && +categoryType === 2 && status === 0)
      ) {
        return
      }
      this.activeServe = item
      this.popVisible = true
    }
  },
  watch: {
    popVisible (value) {
      this.$emit('reload')
    }
  },
  filters: {
    pdText (obj) {
      if (obj.category_type == '1') {
        if (obj.is_lineup == 0) {
          return '无需排队'
        }
        if (obj.pd_num == 0) {
          return '当前无人排队'
        }
        if (obj.server_status == 0) {
          return `正在排队${obj.pd_num}人`
        } else {
          return `排队中：第${obj.pd_num}位`
        }
      } else if (obj.category_type == '2') {
        if (obj.server_status == 0) {
          return `剩余${obj.sy_num}个可借`
        } else {
          return '借用中'
        }
      } else {
        return '累计服务58人'
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
    top: 25px;
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
    background-color: @blue-dark;
  }
  .service-card-tag--green {
    background-color: @green-dark;
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
    min-width: 80px;
    height: 42px;
    padding: 0 8px;
    margin-right: 17px;
    border-radius: 6px;
    font-size: 22px;
    font-weight: bold;
    line-height: 1;
  }
  .status-tag-ing {
    background: #ff65551a;
    color: #ff6555;
  }
  .status-tag-end {
    background: #febf001a;
    color: #FEBF00;
  }
}
</style>
