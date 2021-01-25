<template>
  <div class="tf-bg">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-zhuanfa"></span>
      </template>
    </van-nav-bar>
    <div class="tf-main-container">
      <div class="film-container">
        <div class="film-header">
          <img class="film-cover" :src="info.cover" alt="" />
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
            <div class="film-text">{{ info.score }}</div>
            <div class="film-minor">电影评分</div>
          </div>
          <div class="film-want">
            <div class="film-text">{{ info.want_view | wantFormat }}</div>
            <div class="film-minor">
              {{ parseInt(info.want_view) > 999 ? "万" : "" }}人想看
            </div>
          </div>
          <div class="film-view">
            <div class="film-text">{{ info.view }}</div>
            <div class="film-minor">
              {{ info.view === "1" ? "已想看" : "想看" }}
            </div>
          </div>
        </div>
      </div>
      <div class="film-introduction">{{ info.introduction }}</div>
      <div class="film-cast-info">
        <div class="film-cast-header" @click="goCast">
          <div class="film-cast-title">演职人员</div>
          <div class="tf-text-grey">全部 ></div>
        </div>
        <div class="van-ellipsis"><span class="tf-text-grey">导演：</span>{{ info.director }}</div>
        <div class="van-ellipsis">
          <span class="tf-text-grey"
            >{{ info.cast_type == "0" ? "主演" : "配音" }}：</span
          >{{ info.cast }}
        </div>
      </div>
      <van-button @click="goSelectCinema">购票</van-button>
    </div>
  </div>
</template>

<script>
import { getfilminfo } from '@/api/movie'
export default {
  name: 'movieFilmDetails',
  data () {
    return {
      id: '',
      title: '',
      info: {}
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getfilminfo()
  },
  methods: {
    // 获取影片详情
    getfilminfo () {
      getfilminfo({
        film_id: this.id
      }).then(({ data }) => {
        this.info = data
      })
    },
    // 购票跳转选择影院
    goSelectCinema () {
      this.$router.push({
        name: 'movieSelectCinema'
      })
    },
    // 跳转演职人员
    goCast () {
      this.$router.push({
        name: 'movieCast',
        query: {
          id: this.id
        }
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
/deep/ .van-nav-bar {
  background: #000c;
  .van-icon,
  .tf-icon {
    color: #fff;
  }
}
.film-container {
  padding: 30px;
  background: #000c;
  .film-header {
    display: flex;
    .film-cover {
      width: 186px;
      height: 259px;
      margin-right: 30px;
      border-radius: 4px;
    }
  }
  .film-title {
    margin-bottom: 22px;
    font-size: 42px;
    font-weight: 600;
    color: #fff;
  }
  .film-type,
  .film-duration,
  .film-publish {
    font-size: 26px;
    color: #ffffff99;
  }
  .film-tags {
    display: flex;
    flex-wrap: wrap;
    margin-top: 22px;
    .film-tag {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 38px;
      margin-right: 10px;
      margin-bottom: 10px;
      padding: 0 12px;
      font-size: 24px;
      color: #ffffff99;
      border: 1px solid #ffffff99;
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
}
.film-introduction {
  padding: 50px 30px;
  background: #fff;
  font-size: 30px;
  line-height: 50px;
  color: #222;
}
.film-cast-info {
  margin-top: 30px;
  padding: 40px 30px;
  background: #fff;
  font-size: 30px;
  color: #222;
  .film-cast-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .film-cast-title {
      font-size: 34px;
      font-weight: 500;
      color: #222222;
    }
    .tf-text-grey {
      font-size: 26px;
    }
  }
}
</style>
