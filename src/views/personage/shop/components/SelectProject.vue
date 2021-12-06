<template>
  <div class="project-cont">
    <van-popup v-model="projectShow" position="bottom">
      <div class="project-header tf-row-vertical-center">
        <div class="project-tit">{{ title }}</div>
        <div
          class="project-close tf-row-vertical-center van-icon van-icon-cross"
          @click="close"
        ></div>
      </div>
      <div class="search-block">
        <van-search
          v-model="searchVal"
          :clearable="false"
          placeholder="搜一搜"
          @input="search"
        >
          <div slot="left-icon" class="tf-icon tf-icon-sousuo1"></div>
        </van-search>
      </div>
      <div v-if="projectList.length" class="project-list">
        <div
          v-for="(item, index) in projectList"
          :key="index"
          class="project-item"
          :class="{ cur: selectProjectId == item.id }"
          @click="onSelect(index, item.id)"
        >
          <div class="item-name van-ellipsis">{{ item.project_name }}</div>
          <div v-if="selectProjectId == item.id" class="check-block">
            <span class="tf-icon tf-icon-gou"></span>
          </div>
        </div>
      </div>
      <div v-else class="project-empty">暂无内容</div>
      <div @click="projectSure" class="task-btn">确定</div>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { searchProjectList } from '@/api/task'
import { debounce } from '@/utils/util'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      projectShow: this.value,
      searchVal: '',
      tabIndex: -1,
      selectProjectId: '',
      projectList: []
    }
  },
  computed: {
    ...mapGetters(['currentProject'])
  },
  created () {
    this.searchProjectList()
  },
  methods: {
    search: debounce(function () {
      this.searchProjectList()
    }, 300),
    searchProjectList () {
      searchProjectList({
        projectName: this.searchVal
      }).then(res => {
        this.projectList = res.data
        res.data.forEach((item, key) => {
          if (
            this.currentProject &&
            item.id == this.currentProject.project_id
          ) {
            this.onSelect(key, item.id)
          }
        })
      })
    },
    onSelect (index, id) {
      this.tabIndex = index
      this.selectProjectId = id
    },
    close () {
      this.projectShow = false
    },
    projectSure (index) {
      this.close()
      this.$emit('projectSure', this.projectList[this.tabIndex])
    }
  },
  watch: {
    value (val) {
      this.projectShow = val
    },
    projectShow (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-popup {
  display: flex;
  flex-direction: column;
  height: 1000px;
  background: #ffffff;
  border-radius: 20px 20px 0px 0px;
}
.project-cont {
  width: 100%;
}
.project-header {
  flex-shrink: 0;
  height: 90px;
  line-height: 90px;
  .project-tit {
    font-size: 32px;
    font-weight: bold;
    color: #000000;
    flex-grow: 1;
    text-align: center;
    padding-left: 76px;
  }
  .project-close {
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

.project-list {
  padding-bottom: 110px;
  overflow-y: auto;
  .project-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 108px;
    font-size: 28px;
    color: #8f8f94;
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
    }
    &.cur {
      font-weight: bold;
      color: #000;
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
.project-empty {
  height: 102px;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #8f8f94;
  line-height: 36px;
  padding-top: 46px;
  text-align: center;
}
</style>
