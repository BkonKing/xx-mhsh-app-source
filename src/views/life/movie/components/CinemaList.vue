<template>
  <refreshList class="cinema-list" ref="list" :list.sync="list" :load="load">
    <template v-slot="{ item }">
      <div
        class="cinema-box"
        :class="{ 'cinema-box-tag': tag }"
        @click="goCinemaDetails(item)"
      >
        <div class="cinema-info">
          <div class="cinema-title">
            {{ item.cinema_name }}
          </div>
          <div class="cinema-price">
            <span class="tf-text-primary"
              ><span class="cinema-price-num">{{ item.ticket_price }}</span
              >元</span
            >起
          </div>
        </div>
        <div class="cinema-location">
          <div class="cinema-address">{{ item.address }}</div>
          <div class="cinema-distance">{{ item.distance }}km</div>
        </div>
        <div class="cinema-tags">
          <div class="cinema-tag" v-for="(tag, i) in item.hall" :key="i">
            {{ tag.hall_name }}
          </div>
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
    value: {
      type: Array,
      default: () => []
    },
    load: Function,
    tag: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      list: this.value
    }
  },
  methods: {
    // 跳转影院详情
    goCinemaDetails ({ cinema_id, cinema_name }) {
      this.$router.push({
        name: 'movieCinemaDetails',
        query: {
          id: cinema_id,
          name: cinema_name
        }
      })
    },
    reload () {
      this.$refs.list.reload()
    }
  },
  watch: {
    list (value) {
      this.$emit('input', value)
    },
    value (value) {
      this.list = value
    }
  }
}
</script>

<style lang="less" scoped>
.cinema-list {
  padding: 0;
}
.cinema-box {
  padding: 30px 0 10px;
  border-top: 2px solid #f0f0f0;
  .cinema-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .cinema-title {
      flex: 1;
      @text-ellipsis();
      font-size: 34px;
      font-weight: 500;
      color: #222222;
    }
    .cinema-price {
      font-size: 24px;
      color: #8f8f94;
    }
    .cinema-price-num {
      font-size: 30px;
    }
  }
  .cinema-location {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .cinema-address {
      flex: 1;
      @text-ellipsis();
      font-size: 24px;
      color: #666666;
    }
    .cinema-distance {
      font-size: 24px;
      color: #8f8f94;
    }
  }
  .cinema-tags {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    .cinema-tag {
      display: flex;
      align-items: center;
      height: 36px;
      margin-right: 10px;
      margin-bottom: 10px;
      padding: 0 12px;
      border: 1px solid #ffa110;
      border-radius: 4px;
      font-size: 24px;
      color: #ffa110;
    }
  }
}
.cinema-box-tag {
  padding-left: 20px;
  .cinema-title::before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    position: absolute;
    left: -10px;
    margin-top: 13px;
    background: #eb5841;
    border-radius: 10px;
  }
}
</style>
