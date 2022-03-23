<template>
  <div class="special-session flex-between">
    <div class="special-list">
      <div
        v-for="(item, key) in showData"
        class="special-item"
        :class="[showData.length < 4 ? 'special-item' : `special-item-${key}`]"
        :key="key"
        @click="handleClick(item)"
      >
        <img
          class="img-100"
          :src="item[dataKey[item.sortsetting_type].thumb]"
        />
        <div class="special-tip">
          <div class="p-nowrap">
            {{ item[dataKey[item.sortsetting_type].name] }}
          </div>
          <div class="p-nowrap">
            {{ item[dataKey[item.sortsetting_type].text] }}
          </div>
        </div>
        <div class="special-tip-bg"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlockSpecial',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      dataKey: {
        0: {
          name: 'special_name',
          text: 'special_text',
          thumb: 'special_thumb',
          id: 'special_id'
        },
        1: {
          name: 'thematic_name',
          text: '',
          thumb: 'thumb',
          id: 'thematic_id'
        },
        2: {
          name: 'category_name',
          text: '',
          thumb: 'thumb',
          id: 'category_id'
        }
      }
    }
  },
  computed: {
    showData () {
      const list = this.data.child
      return list.length < 5 ? list : list.slice(0, 4)
    }
  },
  methods: {
    handleClick (data) {
      const methodName = {
        0: 'selectNav',
        1: 'goActiveSpecial',
        2: 'goGoodsType'
      }
      const idKey = this.dataKey[data.sortsetting_type]
      const id = data[idKey.id]
      this[methodName[data.sortsetting_type]](id)
    },
    selectNav (id) {
      this.$emit('selectNav', {
        navType: 3,
        id
      })
    },
    goActiveSpecial (id) {
      this.$router.push({
        name: 'activitySpecial',
        query: {
          id
        }
      })
    },
    goGoodsType (id) {
      this.$emit('selectNav', {
        navType: 5,
        id
      })
    }
  }
}
</script>

<style lang="less" scoped>
.special-session {
  width: 710px;
  margin: 0 auto 28px;
}
.special-list {
  width: 100%;
  column-count: 2;
  column-gap: 20px;
  .special-item {
    width: 345px;
    height: 345px;
    position: relative;
    break-inside: avoid;
    margin-bottom: 20px;
    border-radius: 10px;
    overflow: hidden;
    img {
      border-radius: 10px;
    }
  }
  .special-item-0,
  .special-item-3 {
    height: 440px;
  }
}
.special-tip-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  background-image: linear-gradient(to bottom, rgb(129, 129, 129), transparent);
}
.special-tip {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 10px;
  color: #fff;
  z-index: 10;
}
.special-tip div:nth-child(1) {
  font-size: 30px;
  font-weight: bold;
  line-height: 46px;
}
.special-tip div:nth-child(2) {
  font-size: 24px;
  line-height: 40px;
}
</style>
