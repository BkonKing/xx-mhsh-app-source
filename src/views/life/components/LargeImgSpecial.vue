<template>
  <div
    v-if="data[dataKey.thumb]"
    class="banner-session"
    @click="handleClick"
  >
    <img class="img-100" :src="data[dataKey.thumb]" />
  </div>
</template>

<script>
export default {
  name: 'LargeImgSpecial',
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
          thumb: 'special_thumb',
          id: 'special_id'
        },
        1: {
          thumb: 'thumb',
          id: 'thematic_id'
        },
        2: {
          thumb: 'thumb',
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
    handleClick () {
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
.banner-session {
  margin: 0 auto 40px;
  width: 710px;
  height: 326px;
  border-radius: 10px;
  overflow: hidden;
}
</style>
