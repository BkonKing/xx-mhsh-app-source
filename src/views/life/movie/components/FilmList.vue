<template>
  <refreshList
    ref="list"
    :disabled="disabled"
    :pagination="pagination"
    :list.sync="list"
    :load="load"
  >
    <template v-slot="{ item, index }">
      <div
        class="film-publish-date"
        v-if="type === 2 && (index === 0 || item.time != list[index - 1].time)"
      >
        {{ item.time }}
      </div>
      <div class="film-box" @click="goFilmDetails(item)">
        <img class="film-cover" :src="item.cover" alt="" />
        <div class="film-info">
          <div class="film-title">
            {{ item.film_name }}
            <span v-if="item.score != '0'" class="tf-text-primary">{{
              parseFloat(item.score) / 10
            }}</span>
            <span
              v-else-if="
                type === 1 && item.pre_saleflag === '1' && item.want_view != 0
              "
              class="tf-text-sm tf-text-grey"
              ><span class="film-want-text">{{
                item.want_view | wantFormat
              }}</span
              >人想看</span
            >
          </div>
          <div class="film-content">
            <div class="film-left">
              <div v-if="item.type" class="film-type">
                类型：{{ item.type }}
              </div>
              <div v-if="item.cast" class="film-cast">
                主演：{{ item.cast }}
              </div>
            </div>
            <van-button
              v-if="item.pre_saleflag == '1' && item.film_code"
              round
              size="mini"
              color="#55B862"
              @click.stop="buyTicket(item)"
              >预售</van-button
            >
            <van-button
              v-else-if="type === 1"
              round
              size="mini"
              type="primary"
              @click.stop="buyTicket(item)"
              >购票</van-button
            >
            <template v-else-if="type === 2">
              <van-button
                v-if="item.view == '0'"
                round
                size="mini"
                type="warning"
                @click.stop="setviewwatch(item)"
                >想看</van-button
              >
              <van-button v-else round size="mini">已想看</van-button>
            </template>
          </div>
          <div v-if="type === 1 && item.version" class="film-tags">
            <div
              class="film-tag"
              v-for="(tag, i) in item.version.split(',')"
              :key="i"
            >
              {{ tag }}
            </div>
          </div>
          <div
            v-else-if="type === 1 && item.pre_saleflag == '1'"
            class="film-now-publish-date"
          >
            {{ item.publish_date }}上映
          </div>
          <div
            v-if="type === 2 && item.want_view != '0'"
            class="tf-text-sm tf-text-grey tf-mt-lg"
          >
            <span class="film-want-text">{{ item.want_view | wantFormat }}</span
            >人想看
          </div>
        </div>
      </div>
    </template>
  </refreshList>
</template>

<script>
import { setviewwatch } from '@/api/movie'
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
    // 1：热映 2：待映
    type: {
      type: Number,
      default: 1
    },
    load: Function,
    disabled: {
      type: Boolean,
      default: false
    },
    pagination: {
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
    // 设置影片想看
    setviewwatch (item) {
      setviewwatch({
        film_id: item.film_id
      }).then(() => {
        // 变为已设置
        item.view = '1'
        item.want_view = parseInt(item.want_view) + 1
      })
    },
    // 跳转影片详情
    goFilmDetails ({ film_id }) {
      this.$router.push({
        name: 'movieFilmDetails',
        query: {
          id: film_id
        }
      })
    },
    // 售票/预售，跳转到选择影院
    buyTicket (data) {
      this.$router.push({
        name: 'movieSelectCinema',
        query: {
          id: data.film_id,
          code: data.film_code
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
.film-publish-date {
  font-size: 34px;
  font-weight: 600;
  color: #222222;
  margin-top: 30px;
  margin-bottom: 30px;
}
.film-box {
  display: flex;
  min-height: 252px;
  margin-top: 10px;
  .film-cover {
    width: 160px;
    height: 224px;
    border-radius: 4px;
    margin-right: 20px;
  }
  .film-info {
    flex: 1;
    width: 0;
    border-bottom: 2px solid #f0f0f0;
  }
  .film-title {
    font-size: 34px;
    font-weight: 400;
    color: #222;
    .tf-text-primary,
    .tf-text-grey {
      margin-left: 10px;
    }
  }
  .film-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .film-left {
    flex: 1;
    width: 0;
    margin-top: 20px;
    margin-right: 36px;
    font-size: 24px;
    color: #666;
    .film-type,
    .film-cast {
      width: 100%;
      margin-bottom: 10px;
      @text-ellipsis();
    }
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
      padding: 0 12px;
      font-size: 24px;
      color: #8f8f94;
      border: 1px solid #aaaaaa;
      border-radius: 4px;
    }
  }
  .film-now-publish-date {
    margin-top: 18px;
    font-size: 24px;
    color: #222;
  }
  .film-want-text {
    color: #ffa110;
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
