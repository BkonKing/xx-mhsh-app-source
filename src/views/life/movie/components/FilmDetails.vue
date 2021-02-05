<template>
  <div class="film-container">
    <div class="film-header">
      <img class="film-cover" :src="info.cover" alt="影片封面" />
      <div class="film-info">
        <div class="film-title">{{ info.film_name }}</div>
        <div v-if="info.type" class="film-type">类型：{{ info.type }}</div>
        <div class="film-duration">
          {{ info.duration }}分钟 / {{ info.area }}
        </div>
        <div class="film-publish">{{ info.publish_date }}中国大陆上映</div>
        <div class="film-tags" v-if="info.version">
          <div
            class="film-tag"
            v-for="(tag, i) in info.version.split(',')"
            :key="i"
          >
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
    <div class="film-footer">
      <div class="film-score">
        <div class="film-text">{{ parseFloat(info.score) / 10 }}</div>
        <div class="film-minor">电影评分</div>
      </div>
      <div class="film-want">
        <div class="film-text">{{ info.want_view | wantFormat }}</div>
        <div class="film-minor">
          {{ parseInt(info.want_view) > 9999 ? "万" : "" }}人想看
        </div>
      </div>
      <div class="film-view">
        <div class="film-text">
          <img
            class="film-collect"
            v-if="info.view == 1"
            src="@/assets/imgs/movie_collect.png"
            alt=""
          />
          <img
            class="film-uncollect"
            v-else
            src="@/assets/imgs/movie_uncollect.png"
            @click="setviewwatch"
          />
        </div>
        <div class="film-minor">
          {{ info.view === "1" ? "已想看" : "想看" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setviewwatch } from '@/api/movie'
export default {
  name: 'filmDetails',
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    // 设置影片想看
    setviewwatch () {
      setviewwatch({
        film_id: this.info.film_id
      }).then(() => {
        // 变为已设置
        this.info.view = '1'
        this.info.want_view = parseInt(this.info.want_view) + 1
      })
    }
  },
  filters: {
    // 超过一万则以万为单位
    wantFormat (value) {
      const val = parseInt(value)
      return val > 9999 ? `${Math.ceil(val / 10000)}` : val
    }
  }
}
</script>

<style lang="less" scoped>
.film-container {
  padding: 30px;
  background: #000c;
  .film-header {
    display: flex;
    .film-cover {
      width: 186px;
      height: 259px;
      margin-right: 30px;
      font-size: 28px;
      color: #fff;
      border-radius: 4px;
    }
  }
  .film-title {
    margin-bottom: 16px;
    font-size: 42px;
    font-weight: 600;
    color: #fff;
  }
  .film-type,
  .film-duration,
  .film-publish {
    margin-top: 6px;
    font-size: 26px;
    color: #ffffff99;
  }
  .film-tags {
    display: flex;
    flex-wrap: wrap;
    margin-top: 18px;
    .film-tag {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      margin-bottom: 10px;
      padding: 4px 12px;
      font-size: 24px;
      line-height: 1;
      color: #ffffff99;
      border: 2px solid #ffffff99;
      border-radius: 4px;
    }
  }
  .film-footer {
    display: flex;
    height: 130px;
    margin-top: 30px;
    padding: 22px 0;
    background: #ffffff1a;
    border-radius: 10px;
    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    > div + div {
      border-left: 2px solid #ffffff66;
    }
    .film-text {
      font-size: 48px;
      font-weight: 500;
      color: #ffa110;
    }
    .film-minor {
      font-size: 24px;
      color: #fff;
    }
  }
  .film-collect {
    width: 40px;
    height: 40px;
  }
  .film-uncollect {
    width: 48px;
    height: 48px;
  }
}
</style>
