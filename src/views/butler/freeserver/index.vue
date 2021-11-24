<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="免费服务"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <img
          class="icon-image"
          src="@/assets/butler/freeserver-forward.png"
          @click="shareShow = true"
        />
        <span
          class="tf-icon tf-icon-shijian"
          style="width: auto;line-height: 1;"
          @click="$router.push('/pages/butler/freeserver/list')"
        ></span>
      </template>
    </van-nav-bar>
    <div class="filter-box">
      <van-dropdown-menu v-show="!searchFocused" class="filter-menu">
        <van-dropdown-item
          v-model="checkedStatus"
          :options="bookingStatus"
          :title="checkedStatus ? '' : '预约状态'"
        >
          <div
            v-if="!(bookingStatus && bookingStatus.length)"
            class="no-data-text"
          >
            当前没有预约，快去预约吧
          </div></van-dropdown-item
        >
        <van-dropdown-item
          v-model="categoryType"
          :options="serverTypes"
          :title="categoryType ? '' : '服务类型'"
        />
      </van-dropdown-menu>
      <van-search
        class="search-box"
        v-model="search"
        @focus="switchFocus(true)"
        @blur="switchFocus(false)"
        @cancel="cancelSearch"
        :clearable="false"
        :show-action="searchFocused"
        :placeholder="searchFocused ? '请输入关键字搜索' : '搜一搜'"
      />
    </div>
    <div class="tf-body-container">
      <van-pull-refresh v-model="isLoading" @refresh="init">
        <service-card
          :categoryType="categoryType"
          :checkedStatus="checkedStatus"
          :search="search"
          :data="serviceList"
          @reload="getFreeServerList"
          @change="changeServer"
        ></service-card>
      </van-pull-refresh>
    </div>
    <tf-share
      :share-show="shareShow"
      :share-obj="shareObj"
      @closeSwal="closeShare"
    >
    </tf-share>
  </div>
</template>

<script>
import tfShare from '@/components/tf-share'
import serviceCard from './components/service-card.vue'
import { getFreeServerList, getServerCount } from '@/api/butler.js'
import { mapGetters } from 'vuex'
export default {
  components: {
    tfShare,
    serviceCard
  },
  data () {
    return {
      isLoading: false,
      search: '',
      searchFocused: false, // 搜索框聚焦中
      checkedStatus: 0, // 预约状态
      categoryType: 0, // 服务类型
      artificialCount: 0, // 人工服务数量
      borrowingCount: 0, // 借用服务数量
      serviceList: [],
      bookingStatus: [],
      shareShow: false,
      shareObj: {}
    }
  },
  computed: {
    ...mapGetters(['currentProject', 'userInfo']),
    serverTypes () {
      return [
        {
          text: '全部',
          value: ''
        },
        {
          text: `人工服务（${this.artificialCount}）`,
          value: '1'
        },
        {
          text: `借用服务（${this.borrowingCount}）`,
          value: '2'
        }
      ]
    },
    projectId () {
      return (
        (this.currentProject && this.currentProject.project_id) ||
        this.userInfo.enter_project_id
      )
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getFreeServerList()
      this.getServerCount()
    },
    getFreeServerList () {
      getFreeServerList({
        enter_project_id: this.projectId
      }).then(({ list }) => {
        this.serviceList = list
        this.isLoading = false
        this.setShareObj()
      })
    },
    setShareObj () {
      const projectName = this.currentProject
        ? this.currentProject.project_name
        : this.userInfo.enter_project_name
      // const content = this.serviceList.reduce(
      //   (previousObj, currentObj, index) => {
      //     const interval = index < this.serviceList.length - 1 ? '、' : ''
      //     return previousObj + currentObj.category + interval
      //   },
      //   ''
      // )
      this.shareObj = {
        title: `"${projectName}"免费服务，让生活更美好！`,
        description:
          '业主终身享受，案场游客可免费体验按摩、老人理发、洗车、义诊、小推车、工具箱借用等服务',
        thumb: 'widget://res/freeserver.png',
        contentUrl: `${process.env.VUE_APP_BASE_API}/wap/#/butler/freeServer?projectId=${this.projectId}`,
        pyqHide: false
      }
    },
    getServerCount () {
      getServerCount({
        enter_project_id: this.projectId
      }).then(({ data }) => {
        const {
          artificial_count: artificialCount,
          borrowing_count: borrowingCount
        } = data
        this.artificialCount = artificialCount
        this.borrowingCount = borrowingCount
        this.createBookingStatus(data)
      })
    },
    // 根据是否有状态动态添加显示的筛选选项
    createBookingStatus ({
      reserved_count: reservedCount,
      inline_count: inlineCount,
      bereturned_count: ereturnedCount
    }) {
      const bookingStatus = []
      reservedCount &&
        bookingStatus.push({
          text: `已预约（${reservedCount}）`,
          value: '1'
        })
      inlineCount &&
        bookingStatus.push({
          text: `排队中（${inlineCount}）`,
          value: '2'
        })
      ereturnedCount &&
        bookingStatus.push({
          text: `待归还（${ereturnedCount}）`,
          value: '3'
        })
      if (bookingStatus && bookingStatus.length) {
        bookingStatus.unshift({
          text: '全部',
          value: ''
        })
      }
      this.bookingStatus = bookingStatus
    },
    switchFocus (bool) {
      // 因为动态控制是否显示取消按钮，如果点击取消按妞就立即执行，
      // 则取消监听就不会执行
      setTimeout(() => {
        this.searchFocused = bool
      }, 0)
    },
    cancelSearch () {
      this.search = ''
    },
    closeShare (data) {
      this.shareShow = data == 1
    },
    changeServer ({ index, data }) {
      this.serviceList.splice(index, 1, data)
      this.getServerCount()
    }
  }
}
</script>

<style lang="less" scoped>
.tf-body-container {
  padding: 30px 20px 0;
  background: #f7f7f7;
}
.placeholder {
  font-family: iconfont !important;
  color: @gray-7;
}
.no-data-text {
  padding: 24px 0;
  font-size: 24px;
  color: #8f8f94;
  text-align: center;
}
.filter-box {
  display: flex;
  height: 88px;
  background: #fff;
  .filter-menu {
    width: 400px;
    margin-right: 110px;
    /deep/ .van-popup {
      padding-top: 26px;
      padding-bottom: 26px;
      border-radius: 0px 0px 10px 10px;
      .van-dropdown-item__option {
        height: 72px;
        padding-left: 40px;
        line-height: 72px;
        font-size: 26px;
        color: #8f8f94;
        span {
          line-height: 1;
        }
      }
      .van-dropdown-item__option--active {
        background: #f7f7f7;
        .van-cell__title {
          color: #222222;
          span {
            font-weight: bold;
          }
        }
        .van-dropdown-item__icon {
          font-weight: bold;
          color: #222222;
        }
      }
    }
    /deep/ .van-dropdown-item--down {
      margin-top: -2px;
    }
    /deep/ .van-overlay {
      top: 4px;
    }
    /deep/ .van-dropdown-menu__bar {
      height: 100%;
      box-shadow: none;
      .van-dropdown-menu__title {
        font-size: 28px;
      }
      .van-dropdown-menu__title::after {
        margin-top: -8px;
        border: 6px solid;
        border-color: transparent transparent #8f8f94 #8f8f94;
        opacity: 1;
      }
      .van-dropdown-menu__title--active {
        color: #000000;
        &::after {
          margin-top: -3px;
        }
        .van-ellipsis {
          font-weight: bold;
        }
      }
    }
  }
  .search-box {
    flex: 1;
    padding: 12px 20px;
    /deep/ .van-search__content {
      height: 64px;
      padding-left: 30px;
      padding-right: 30px;
      border-radius: 32px;
      background: #f7f7f7;
      .van-cell {
        padding: 0;
        line-height: 64px;
        .van-icon-search {
          font-weight: bold;
          color: #a6a6a6;
        }
        .van-field__left-icon {
          margin-right: 10px;
          line-height: 64px;
        }
        .van-field__control {
          line-height: 62px;
        }
        .van-field__control::placeholder {
          font-size: 24px;
          line-height: 1 !important;
        }
      }
    }
  }
}

/deep/ .van-search__action {
  display: flex;
  align-items: center;
  height: 64px;
  margin-left: -40px;
  padding: 0 30px;
  position: relative;
  background: #f7f7f7;
  font-size: 24px;
  border-top-right-radius: 32px;
  border-bottom-right-radius: 32px;
  &::before {
    content: "";
    width: 1px;
    height: 30px;
    position: absolute;
    left: 0;
    background: #cccccc;
  }
}

.check-type {
  @flex();
  justify-content: flex-start;
  margin-top: @padding-md;
  margin-bottom: @padding-md;
}

.icon-image {
  width: 44px;
  height: 44px;
  margin-right: 30px;
}

.check-type__box {
  font-size: @font-size-md;
  margin-right: @padding-md;
  height: 30px;
  background-color: #f2f2f2;
  border-radius: 15px;
}

.check-type--checked {
  color: #fff;
  background-color: @blue-dark;
}

.tab-btn-box {
  @flex();
  margin-bottom: @padding-lg;
}

.tab-btn {
  @flex();
  align-items: center;
  min-width: 200px;
  height: 66px;
  padding: 0 20px;
  border: 2px solid #aaa;
  border-radius: 33px;
  margin-right: @padding-md;
  justify-content: center;
  .tf-circle-tag--blue,
  .tf-circle-tag--success {
    margin-right: 10px;
  }
}
.tab-btn--blue {
  background-color: @blue-dark;
  .tab-btn__text-box,
  .tf-text-grey {
    color: #fff;
  }
}
.tf-bg-success {
  .tf-text-grey {
    color: #fff;
  }
}
.tab-btn__text-box {
  font-size: 24px;
  line-height: 66px;
}
.tf-main-container {
  padding-top: 88px !important;
}
</style>
