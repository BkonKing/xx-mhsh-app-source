<template>
  <div
    class="cinema-box"
    :class="{ 'cinema-box-tag': tag }"
    @click="goCinemaDetails(data)"
  >
    <div class="cinema-info">
      <div class="cinema-title">
        {{ data.cinema_name }}
      </div>
      <div class="cinema-price">
        <span class="tf-text-primary"
          ><span class="cinema-price-num">{{ data.ticket_price }}</span
          >元</span
        >起
      </div>
    </div>
    <div class="cinema-location">
      <div class="cinema-address">{{ data.address }}</div>
      <div class="cinema-distance">{{ data.distance }}km</div>
    </div>
    <!-- <div v-if="data.hall && data.hall.length" class="cinema-tags">
      <div class="cinema-tag" v-for="(tag, i) in data.hall" :key="i">
        {{ tag.hall_name }}
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'CinemaBox',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    // 是否显示厅标签
    tag: {
      type: Boolean,
      default: true
    },
    filmNo: {
      type: String,
      default: ''
    },
    // 排期日期
    scheduDate: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 跳转影院详情
    goCinemaDetails ({ cinema_id, cinema_name }) {
      this.$router.push({
        name: 'movieCinemaDetails',
        query: {
          id: cinema_id,
          filmNo: this.filmNo,
          name: cinema_name,
          scheduDate: this.scheduDate
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cinema-box {
  padding: 34px 0;
  border-bottom: 2px solid #f0f0f0;
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
      color: #222222;
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
    height: 50px;
    overflow: hidden;
    margin-top: 28px;
    .cinema-tag {
      display: flex;
      align-items: center;
      height: 40px;
      margin-right: 10px;
      margin-bottom: 12px;
      padding: 0 12px;
      border: 2px solid #ffa110;
      border-radius: 4px;
      font-size: 24px;
      line-height: 1;
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
