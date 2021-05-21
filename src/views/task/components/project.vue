<template>
  <div class="project-cont">
    <van-popup v-model="projectShow" position="bottom">
      <div class="project-header tf-row-vertical-center">
        <div class="project-tit">选择地区</div>
        <div @click="close" class="project-close tf-row-vertical-center van-icon van-icon-cross">
        </div>
      </div>
      <div class="search-block">
        <van-search v-model="searchVal" @input="searchProjectList" :clearable="false" placeholder="搜一搜">
          <div slot="left-icon" class="tf-icon tf-icon-sousuo1"></div>
        </van-search>
      </div>
      <div class="project-list">
        <div @click="onSelect(index, item.id)" v-for="(item ,index) in projectList" :key="index" class="project-item tf-row-space-between" :class="{'cur': selectProjcetId == item.id}">
          <div class="itme-name van-ellipsis">{{ item.project_name }}</div>
          <div class="check-block"><span class="tf-icon tf-icon-gou"></span></div>
        </div>
      </div>
      <div class="project-sure">
        <div @click="projectSure" class="task-btn">确定</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  Popup,
  Search
} from 'vant'
import { searchProjectList } from '@/api/task'
import { mapGetters } from 'vuex'
export default {
  components: {
    [Popup.name]: Popup,
    [Search.name]: Search
  },
  props: {
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
      selectProjcetId: '',
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
    searchProjectList () {
      searchProjectList({
        projectName: this.searchVal
      }).then(res => {
        this.projectList = res.data
        res.data.forEach((item, key) => {
          if (item.id == this.currentProject.project_id) {
            this.onSelect(key, item.id)
          }
        })
      })
    },
    onSelect (index, id) {
      this.tabIndex = index
      this.selectProjcetId = id
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
  border-radius: 20px 20px 0px 0px;
}
.project-cont {
  width: 100%;
}
.project-header {
  height: 90px;
  line-height: 90px;
  .project-tit {
    font-size: 32px;
    font-weight: 500;
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
    color: #AAAAAA;
  }
}
.project-sure {
  padding: 30px 20px;
}
.search-block {
  padding: 0 20px;
  /deep/.van-search {
    height: 68px;
    background: #F5F5F5;
    border-radius: 34px;
    padding-left: 0;
    overflow: hidden;
    .van-search__content {
      background-color: #F5F5F5;
    }
    .van-field__left-icon {
      display: flex;
      align-items: center;
      color: #AAAAAA;
      font-size: 32px;
      margin-right: 20px;
    }
    .van-field__control {
      font-size: 24px;
    }
  }
}

.project-list {
  max-height: 1080px;
  overflow-y: auto;
  .project-item {
    height: 108px;
    font-size: 28px;
    color: #8F8F94;
    padding: 0 20px;
    position: relative;
    align-items: center;
    &:last-child::after{
      display: none;
    }
    &::after {
      content: '';
      position: absolute;
      left: 20px;
      right: 20px;
      bottom: 0;
      height: 1PX;
      background-color: #EEEEEE;
    }
    .itme-name {
      line-height: 108px;
      max-width: 654px;
    }
    &.cur {
      color: #000;
      font-weight: 500;
      .check-block {
        background-color: #FF6555;
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
      border: 1PX solid #8F8F94;
      border-radius: 50%;
      span {
        display: none;
      }
    }
  }
}
</style>
