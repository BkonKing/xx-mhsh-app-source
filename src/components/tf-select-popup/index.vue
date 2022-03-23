<template>
  <div class="tf-select-popup-cont">
    <van-popup v-model="visible" position="bottom">
      <div class="tf-select-popup-header tf-row-vertical-center">
        <div class="tf-select-popup-tit">{{ title }}</div>
        <div
          class="tf-select-popup-close tf-row-vertical-center van-icon van-icon-cross"
          @click="close"
        ></div>
      </div>
      <div v-if="showSearch" class="search-block">
        <van-search
          v-model="searchVal"
          :clearable="false"
          placeholder="搜一搜"
          @input="search"
        >
          <div slot="left-icon" class="tf-icon tf-icon-sousuo1"></div>
        </van-search>
      </div>
      <div v-if="data.length" class="tf-select-popup-list">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="tf-select-popup-item"
          :class="{ cur: currentSelected == item[valueKey] }"
          @click="onSelect(index, item[valueKey])"
        >
          <div class="item-name">
            <slot name="label" v-bind:record="item">{{ item[labelKey] }}</slot>
          </div>
          <div v-if="currentSelected == item[valueKey]" class="check-block">
            <span class="tf-icon tf-icon-gou"></span>
          </div>
        </div>
      </div>
      <div v-else class="tf-select-popup-empty">暂无内容</div>
      <div class="fixed-bottom-placeholder" v-if="isSelectMode">
        <van-button v-preventReClick @click="confirm" class="task-btn"
          >确定</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { debounce } from '@/utils/util'
export default {
  name: 'tfSelectPopup',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    selected: {
      type: [String, Number],
      default: ''
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    isSelectMode: {
      type: Boolean,
      default: true
    },
    labelKey: {
      type: String,
      default: 'text'
    },
    valueKey: {
      type: String,
      default: 'id'
    }
  },
  data () {
    return {
      visible: this.value,
      searchVal: '',
      tabIndex: -1,
      currentSelected: ''
    }
  },
  methods: {
    search: debounce(function () {
      this.getData()
    }, 300),
    getData () {
      this.$emit('search')
    },
    onSelect (index, id) {
      if (this.isSelectMode) {
        this.tabIndex = index
        this.currentSelected = id
        this.$emit('update:select', id)
      }
    },
    close () {
      this.visible = false
    },
    confirm () {
      this.close()
      this.$emit('confirm', this.data[this.tabIndex])
    }
  },
  watch: {
    value (val) {
      this.visible = val
    },
    visible (val) {
      this.$emit('input', val)
    },
    selected: {
      handler (newValue) {
        if (newValue !== this.currentSelected) {
          this.currentSelected = newValue
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-popup {
  display: flex;
  flex-direction: column;
  max-height: 1000px;
  // min-height: 340px;
  background: #ffffff;
  border-radius: 20px 20px 0px 0px;
}
.tf-select-popup-cont {
  width: 100%;
}
.tf-select-popup-header {
  flex-shrink: 0;
  height: 90px;
  line-height: 90px;
  .tf-select-popup-tit {
    font-size: 32px;
    font-weight: bold;
    color: #000000;
    flex-grow: 1;
    text-align: center;
    padding-left: 76px;
  }
  .tf-select-popup-close {
    width: 50px;
    height: 50px;
    padding: 10px;
    margin-right: 26px;
    font-size: 40px;
    justify-content: center;
    color: #aaaaaa;
  }
}
.task-btn {
  position: absolute;
  bottom: 30px;
  left: 20px;
}
.search-block {
  padding: 0 20px;
  /deep/.van-search {
    height: 68px;
    background: #f5f5f5;
    border-radius: 34px;
    padding-left: 0;
    overflow: hidden;
    .van-search__content {
      height: 68px;
      background-color: #f5f5f5;
      .van-field__body {
        line-height: 68px;
      }
      .van-field__control {
        line-height: 68px;
        font-size: 28px;
      }
    }
    .van-field__left-icon {
      display: flex;
      align-items: center;
      color: #aaaaaa;
      font-size: 32px;
      margin-right: 20px;
    }
  }
}

.tf-select-popup-list {
  overflow-y: auto;
  .tf-select-popup-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 108px;
    font-size: 28px;
    color: #000;
    padding: 0 20px;
    position: relative;
    &:last-child::after {
      display: none;
    }
    &::after {
      content: "";
      position: absolute;
      left: 20px;
      right: 20px;
      bottom: 0;
      height: 1px;
      background-color: #eeeeee;
    }
    .item-name {
      display: flex;
      align-items: center;
      max-width: 654px;
      line-height: 1;
      word-break: break-all;
    }
    &.cur {
      color: #000;
      .item-name {
        font-weight: bold;
      }
      .check-block {
        background-color: #ff6555;
        border: 0;
        color: #fff;
        text-align: center;
        line-height: 36px;
        font-weight: bold;
        span {
          display: inline;
        }
      }
    }
    .check-block {
      width: 36px;
      height: 36px;
      border: 1px solid #8f8f94;
      border-radius: 50%;
      span {
        display: none;
      }
    }
  }
}

.fixed-bottom-placeholder {
  padding-bottom: 110px;
}
.tf-select-popup-empty {
  height: 102px;
  font-size: 28px;
  color: #8f8f94;
  line-height: 36px;
  padding-top: 46px;
  text-align: center;
}
</style>
