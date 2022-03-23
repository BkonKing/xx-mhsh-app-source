<template>
  <div class="life-session-area">
    <div
      :class="[
        data[dataKey.explain] ? '' : 'life-area-tit-small',
        'life-tit life-area-tit flex-between'
      ]"
      @click="handleClickHeader(3)"
    >
      <div class="font-34 font-weight flex-column-center">
        <div class="area-text-tit">{{ data[dataKey.title] }}</div>
        <div v-if="data[dataKey.explain]" class="area-text-detail">
          {{ data[dataKey.explain] }}
        </div>
      </div>
      <div class="life-arrow-right">
        <img class="img-100" src="@/assets/img/right_03.png" />
      </div>
    </div>
    <div class="life-goods-list-container">
      <div
        class="life-goods-list flex-align-center"
        ref="scrollEl"
        @scroll="scrollEvent"
        @touchend="touchEnd"
      >
        <div
          v-for="(val, key) in data.child"
          @click="goGoodsDetail(val)"
          class="life-goods-item"
          :key="key"
        >
          <div class="life-goods-pic">
            <img class="img-100" :src="val.thumb" />
          </div>
          <div class="life-goods-name color-222 font-24 p-nowrap">
            {{ val.goods_name }}
          </div>
          <price-show
            class="price-tag-3"
            :money="val.rmb_price"
            :credit="val.xfb_num"
          ></price-show>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import priceShow from '@/views/home/components/price-show'
export default {
  name: 'ListSpecial',
  components: {
    priceShow
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // 0专区 1专题 2商品分类
    type () {
      return this.data.sortsetting_type || 0
    },
    dataKey () {
      const key = {
        0: {
          title: 'special_name',
          explain: 'special_text',
          id: 'special_id'
        },
        1: {
          title: 'thematic_name',
          explain: '',
          id: 'thematic_id'
        },
        2: {
          title: 'category_name',
          explain: '',
          id: 'category_id'
        }
      }
      return key[this.type]
    },
    detailId () {
      return this.data[this.dataKey.id]
    }
  },
  methods: {
    scrollEvent () {
      this.$emit('scrollEvent')
    },
    touchEnd () {
      this.$emit('touchEnd')
    },
    handleClickHeader () {
      const methodName = {
        0: 'selectNav',
        1: 'goActiveSpecial',
        2: 'goGoodsType'
      }
      this[methodName[this.type]]()
    },
    selectNav () {
      this.$emit('selectNav', { navType: 3, id: this.detailId })
    },
    goActiveSpecial () {
      this.$router.push({
        name: 'activitySpecial',
        query: {
          id: this.detailId
        }
      })
    },
    goGoodsType () {
      this.$emit('selectNav', { navType: 5, id: this.detailId })
    },
    goGoodsDetail ({ goods_id: id }) {
      this.$router.push({
        path: '/store/goods-detail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.life-session-area {
  margin: 0 20px 40px;
  background: #fff;
  border-radius: 10px;
  .life-area-tit {
    align-items: flex-end;
    padding: 20px;
  }
  .life-arrow-right {
    line-height: 1;
  }
  .life-goods-item {
    flex-shrink: 0;
    width: 216px;
    height: 100%;
    position: relative;
    + .life-goods-item {
      margin-left: 12px;
    }
  }
  .life-goods-pic {
    height: 216px;
  }
}
.life-area-tit {
  height: auto;
  padding: 0 30px 0 10px;
}
.life-area-tit-small.life-area-tit {
  height: 100px;
}
.life-arrow-right,
.life-arrow-right img {
  width: 15px;
}
.life-goods-list-container {
  width: 710px;
  padding: 0 20px 20px;
  margin: 0 auto;
}
.life-goods-list {
  overflow-x: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
  .life-goods-name {
    line-height: 1;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 0 10px;
    font-size: 24px;
  }
}
.life-goods-pic {
  display: flex;
  width: 100%;
  height: 230px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f4f4f4;
  position: relative;
}
.area-text-tit {
  line-height: 1;
}
.area-text-detail {
  margin-top: 20px;
  line-height: 1;
  font-weight: normal;
  font-size: 24px;
  color: #8f8f94;
}
.price-tag-3 {
  height: 56px;
  font-size: 28px;
}
</style>
