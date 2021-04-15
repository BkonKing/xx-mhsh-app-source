<template>
  <div class="select-dropdown">
    <div class="group-box">
      <div class="group-container" ref="container">
        <div
          class="group-item"
          v-for="item in group"
          :key="item.id"
          :class="{ 'group-active': item.id === categoryId }"
          @click="handleChange(item)"
        >
          {{ item.category }}
        </div>
      </div>
      <img
        v-if="groupDropdown"
        class="group-dropdown"
        src="@/assets/neighbours/shouqi.png"
        @click="groupDropdown = false"
      />
      <img
        v-else
        class="group-dropdown"
        src="@/assets/neighbours/zhankai.png"
        @click="groupDropdown = true"
      />
    </div>
    <div
      v-if="groupDropdown"
      class="group-open-overlay"
      @click="groupDropdown = false"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'selectDropdown',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    group: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      groupDropdown: this.visible,
      categoryId: this.value
    }
  },
  methods: {
    handleChange (item) {
      this.groupDropdown = false
      this.$emit('change', item)
    }
  },
  watch: {
    categoryId (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.categoryId = val
    },
    groupDropdown (val) {
      if (!val) {
        this.$nextTick(() => {
          this.$refs.container.scrollLeft = this.$refs.container.getElementsByClassName('group-active')[0].offsetLeft - 14
        })
      }
      this.$emit('update:visible', val)
    },
    visible (val) {
      this.groupDropdown = val
    }
  }
}
</script>

<style lang="less" scoped>
// 小组
.group-box {
  display: flex;
  height: 124px;
  padding: 30px 20px;
  background: #ffffff;
  .group-container {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    overflow: auto;
  }
  .group-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    min-width: 140px;
    height: 64px;
    padding: 0 20px;
    margin-right: 28px;
    background: #f7f7f7;
    border: 1px solid #f7f7f7;
    border-radius: 10px;
    font-size: 24px;
    color: #8f8f94;
  }
  .group-active {
    border: 1px solid #cccccc;
    font-weight: 500;
    color: #000000;
  }
  .group-dropdown {
    width: 38px;
    height: 64px;
    margin-left: 20px;
  }
}
</style>
