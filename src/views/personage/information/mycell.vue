<template>
  <div class="mycell">
    <van-cell :is-link="isShow" center>
      <template #title>
        <div class="title">{{ title }}</div>
      </template>
      <template>
        <img
          v-if="type == 'img' && userInfo.avatar"
          :src="userInfo.avatar"
          alt=""
        />
        <img
          v-else-if="type == 'img' && !avatar"
          src="@/assets/imgs/touxiang.png"
          alt=""
        />
        <i
          v-else-if="type == 'iconfont' && userInfo.gender == 1"
          class="tf-icon tf-icon-xingbie1 nan"
        ></i>
        <i
          v-else-if="type == 'iconfont' && userInfo.gender == 2"
          class="tf-icon tf-icon-xingbie nv"
        ></i>
        <div v-else class="value">
          {{ value }}
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { Cell, CellGroup } from 'vant'
import { mapGetters } from 'vuex'
export default {
  components: {
    [Cell.name]: Cell
  },
  data () {
    return {}
  },
  props: {
    title: {
      type: String
    },
    value: {
      type: [String, Object]
    },
    isShow: {
      type: Boolean,
      default: true
    },
    type: {
      type: String
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>

<style lang="less" scoped>
.mycell {
  width: 100% !important;
  .title {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 82px;
  }
  .value {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 82px;
  }
  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .nan {
    color: #448fe4;
    font-size: 26px;
  }
  .nv {
    color: #ff3366;
    font-size: 26px;
  }
}
</style>
