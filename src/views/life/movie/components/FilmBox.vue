<template>
  <div class="film-box">
    <div class="film-info">
      <img class="film-img" :src="data.cover" />
      <div class="film-footer" :class="{ 'film-flex-end': data.score == '0' }">
        <div v-if="data.score != '0'" class="film-score">{{ data.score }}</div>
        <div v-if="data.want_view" class="film-want">
          {{ data.want_view | wantFormat }}想看
        </div>
      </div>
    </div>
    <div class="film-name">{{ data.film_name }}</div>
    <template v-if="type === 1">
      <van-button round size="mini" type="primary">购票</van-button>
    </template>
    <template v-if="type === 2">
      <van-button v-if="data.publish_date == '1'" round size="mini"  color="#55B862"
        >预售</van-button
      >
      <van-button v-else-if="data.view == '0'" round size="mini" type="warning" @click="setviewwatch"
        >想看</van-button
      >
      <van-button v-else round size="mini">已想看</van-button>
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
}

.film-info {
  width: 192px;
  height: 268px;
  position: relative;
  background: #e3e3e3;
  border-radius: 10px;
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

/deep/ .van-button--round {
  width: 126px;
  margin-top: 20px;
  font-size: 30px;
}
/deep/ .van-button--default {
  color: #8F8F94;
  border-color: #AAAAAA;
}
</style>
