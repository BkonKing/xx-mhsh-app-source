<template>
  <div class="film-box">
    <div class="film-info" @click="goFilmDetails">
      <div
        v-if="type !== 3 && versionList && versionList.length"
        class="film-version-container"
      >
        <div class="tf-flex" v-for="(version, i) in versionList" :key="i">
          <span class="film-version-tag">{{ version }}</span>
        </div>
      </div>
      <img v-if="data.cover" class="film-img" :src="data.cover" />
      <img v-else class="film-img" src="@/assets/imgs/movie_nocover.png" />
      <div class="film-footer" :class="{ 'film-flex-end': data.score == '0' }">
        <div v-if="data.score != '0'" class="film-score">
          {{ parseFloat(data.score) / 10 }}
        </div>
        <div v-if="data.want_view" class="film-want">
          {{ data.want_view | wantFormat }}想看
        </div>
      </div>
    </div>
    <div class="film-name" @click="goFilmDetails">{{ data.film_name }}</div>
    <template v-if="type === 1">
      <van-button round size="mini" type="primary" @click="buyTicket"
        >购票</van-button
      >
    </template>
    <template v-if="type === 2">
      <div class="film-publish">{{data.time2}}</div>
      <van-button
        v-if="data.pre_saleflag == '1' && data.film_code"
        round
        size="mini"
        color="#55B862"
        @click="buyTicket"
        >预售</van-button
      >
      <van-button
        v-else-if="data.view == '0'"
        round
        size="mini"
        type="warning"
        @click.stop="setviewwatch"
        >想看</van-button
      >
      <van-button v-else round size="mini">已想看</van-button>
    </template>
    <template v-if="type === 3">
      <van-button
        class="ticket-btn"
        round
        size="mini"
        type="primary"
        @click="buyTicket"
        >低至 <span class="tf-text-lg">{{ data.ticket_price }}</span
        > 元<span class="tf-icon tf-icon-right"></span
      ></van-button>
    </template>
  </div>
</template>

<script>
import { setviewwatch } from '@/api/movie'
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    // 1：热映 2：待映
    type: {
      type: Number,
      default: 1
    }
  },
  computed: {
    // 影片制式默认string，手动转为数组，并且只展示两个制式
    versionList () {
      const versions = this.data.version.split(',')
      return versions.length > 2 ? versions.slice(0, 2) : versions
    }
  },
  methods: {
    // 设置影片想看
    setviewwatch () {
      setviewwatch({
        film_id: this.data.film_id
      }).then(() => {
        // 变为已设置
        this.data.view = '1'
        this.data.want_view = parseInt(this.data.want_view) + 1
      })
    },
    // 跳转影片详情
    goFilmDetails ({ film_id }) {
      this.$router.push({
        name: 'movieFilmDetails',
        query: {
          id: this.data.film_id
        }
      })
    },
    // 售票/预售，跳转到选择影院
    buyTicket () {
      this.$router.push({
        name: 'movieSelectCinema',
        query: {
          id: this.data.film_id,
          code: this.data.film_code
        }
      })
    }
  },
  filters: {
    // 超过一万则以万为单位
    wantFormat (value) {
      const val = parseInt(value)
      return val > 9999 ? `${Math.ceil(val / 10000)}万` : val
    }
  }
}
</script>

<style lang="less" scoped>
.film-box {
  width: 192px;
  line-height: 1;
}

.film-info {
  width: 192px;
  height: 268px;
  position: relative;
  background: #e3e3e3;
  border-radius: 10px;
}

.film-version-container {
  position: absolute;
  top: 10px;
  left: 10px;
  .film-version-tag {
    padding: 4px 6px;
    margin-bottom: 10px;
    background: #000000;
    border-radius: 4px;
    font-size: 24px;
    line-height: 1;
    color: #ffffff;
    opacity: 0.6;
  }
}

.film-img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.film-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 66px;
  padding: 0 10px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(0deg, black, transparent);
  border-radius: 0px 0px 10px 10px;
}

.film-flex-end {
  justify-content: flex-end;
}

.film-score {
  font-size: 34px;
  font-weight: 500;
  color: #ffa110;
}

.film-want {
  font-size: 24px;
  color: #ffffff;
}

.film-name {
  width: 100%;
  margin-top: 20px;
  font-size: 34px;
  font-weight: 500;
  line-height: 1;
  color: #222222;
  @text-ellipsis();
}

.film-publish {
  margin-top: 20px;
  font-size: 26px;
  color: #8f8f94;
  line-height: 1;
}

.ticket-btn {
  width: 100% !important;
  /deep/ .van-button__text {
    display: flex;
    align-items: center;
    font-size: 26px;
    line-height: 1;
    .tf-text-lg {
      margin: 0 6px;
    }
  }
  .tf-icon-right {
    margin-left: 15px;
  }
}

/deep/ .van-button--round {
  width: 126px;
  margin-top: 20px;
  font-size: 30px;
}
/deep/ .van-button--default {
  color: #8f8f94;
  border-color: #aaaaaa;
}
</style>
