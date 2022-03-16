<template>
  <refreshList :list.sync="list" :load="load" finished-text="">
    <template v-slot="{ item }">
      <div class="coin-list-item" @click="goDetails(item)">
        <div class="coin-list-item-left">
          <div class="coin-list-item__name">{{ item.title }}</div>
          <div class="coin-list-item__time">{{ item.ctime }}</div>
        </div>
        <div
          class="coin-list-item__number"
          :class="{ 'coin-list-item__number-primary': parseInt(item.credits) > 0 }"
        >
          {{ parseInt(item.credits) > 0 &&  type !== 'disabled' ? "+" : "" }}{{ item.credits }}
        </div>
      </div>
    </template>
  </refreshList>
</template>

<script>
import refreshList from '@/components/tf-refresh-list'
export default {
  components: {
    refreshList
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: ''
    },
    load: Function
  },
  data () {
    return {
      list: this.data
    }
  },
  methods: {
    goDetails ({ id, cash_id: cashId, id_type: idType, data_type: dataType }) {
      if (cashId) { // 提现
        this.$router.push({
          name: 'shopWithdrawDetail',
          query: {
            id
          }
        })
      } else if (dataType === 1) { // 不可用提现
        this.$router.push({
          name: 'shopWithdrawDetail',
          query: {
            id,
            idType
          }
        })
      } else if (dataType === 2) { // 不可用任务
        this.$router.push({
          name: 'taskDetail',
          query: {
            taskId: id
          }
        })
      } else {
        this.$router.push({
          name: 'happinessCoinDetails',
          query: {
            id
          }
        })
      }
    }
  },
  watch: {
    list (value) {
      this.$emit('update:data', value)
    },
    data (value) {
      this.list = value
    }
  }
}
</script>

<style lang="less" scoped>
.coin-list-item {
  @flex();
  justify-content: space-between;
  align-items: center;
  // height: 144px;
  padding: 36px 0;
}
.coin-list-item-left {
  justify-content: space-between;
}
.coin-list-item__name {
  font-size: 28px;
  font-weight: bold;
  color: #000000;
  line-height: 1;
}
.coin-list-item__time {
  margin-top: 30px;
  font-size: 24px;
  color: @gray-7;
  line-height: 1;
}
.coin-list-item__number {
  font-size: 32px;
  font-weight: bold;
  color: #000000;
  &-primary {
    color: #FEBF00;
  }
}
.coin-list-item__number--add {
  color: @red-dark;
}
</style>
