<template>
  <refreshList :list.sync="list" :load="load" finished-text="">
    <template v-slot="{item}">
      <div class="coin-list-item" @click="goDetails(item)">
        <div class="coin-list-item-left">
          <div class="coin-list-item__name">{{item.title}}</div>
          <div class="coin-list-item__time">{{item.ctime}}</div>
        </div>
        <div
          class="coin-list-item__number"
          :class="{'tf-text-primary': parseInt(item.credits) > 0}"
        >{{parseInt(item.credits) > 0 ? '+' : ''}}{{item.credits}}</div>
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
    load: Function
  },
  data () {
    return {
      list: this.data
    }
  },
  methods: {
    goDetails ({ id }) {
      this.$router.push({
        name: 'happinessCoinDetails',
        query: {
          id
        }
      })
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
  padding: 20px 0 30px 0;
  border-bottom: 1px solid @divider-color;
}
.coin-list-item-left {
  height: 84px;
  justify-content: space-between;
}
.coin-list-item__name {
  font-size: 30px;
  margin-bottom: 8px;
}
.coin-list-item__time {
  font-size: 24px;
  color: @gray-7;
}
.coin-list-item__number {
  font-size: 38px;
  font-weight: 500;
  color: @gray-7;
}
.coin-list-item__number--add {
  color: @red-dark;
}
</style>
