<template>
  <div class="tf-bg">
    <div data-v-85b8baae class="van-nav-bar van-nav-bar--fixed">
      <div class="van-nav-bar__left">
        <i
          v-show="!editMode"
          class="van-icon van-icon-arrow-left van-nav-bar__arrow"
          @click="$router.go(-1)"
        ></i>
        <span v-show="editMode" class="font-26" @click="editMode = false">取消</span>
      </div>
      <div v-show="!editMode" class="search-box">
        <van-search v-model="value" placeholder="全部应用" />
      </div>
      <div class="van-nav-bar__title van-ellipsis" v-show="editMode">管理应用</div>
      <div class="van-nav-bar__right">
        <span v-show="!editMode" @click="editMode = true">编辑</span>
        <span class="comfirm-btn" v-show="editMode" @click="editMode = false">完成</span>
      </div>
    </div>
    <div class="tf-main-container" :class="{'app-container--edit': editMode}">
      <div class="tf-bg-white home-app">
        <div class="edit-hint" v-if="editMode">按住应用可拖动调整顺序</div>
        <van-divider dashed>以下应用展示在首页</van-divider>
        <draggable
          class="app-container"
          :class="{'dragging': isDragging}"
          v-model="homeList"
          :options="{
            animation: 0,
            group: 'description',
            disabled: !editMode,
            ghostClass: 'ghost'
          }"
          :move="onMove"
          @start="isDragging=true"
          @end="isDragging=false"
        >
          <app-item
            v-for="(item,i) in homeList"
            :class="{'noborder': homeList.length - homeList.length % 5 <= i}"
            :key="i"
            :src="item.src"
            :name="item.name"
            :status="item.status"
            :editMode="editMode"
            mode="remove"
            @remove="remove(item, i)"
          ></app-item>
        </draggable>
      </div>
      <div class="tf-bg-white tf-mt-lg">
        <div class="tf-mb-lg">
          <div class="module-title">最近使用</div>
          <app-container :data="latelyList" :editMode="editMode" @add="add"></app-container>
        </div>
        <div class="tf-mb-lg">
          <div class="module-title">智慧管家</div>
          <app-container :data="butlerList" :editMode="editMode" @add="add"></app-container>
        </div>
        <div>
          <div class="module-title">和谐邻里</div>
          <app-container :data="neighbourList" :editMode="editMode" @add="add"></app-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Divider, Search } from 'vant'
import appContainer from './components/app-container'
import appItem from './components/app-item'
import draggable from 'vuedraggable'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Divider.name]: Divider,
    [Search.name]: Search,
    appContainer,
    appItem,
    draggable
  },
  data () {
    return {
      value: '',
      editMode: false,
      isDragging: false,
      homeList: [
        {
          id: '1',
          src: '/src/assets/logo.png',
          name: '云门禁',
          status: 0
        },
        {
          id: '2',
          src: '/src/assets/logo.png',
          name: '公告通知',
          status: 2
        }
      ],
      latelyList: [
        {
          id: '1',
          src: '/src/assets/logo.png',
          name: '云门禁',
          status: 0
        }
      ],
      butlerList: [
        {
          id: '1',
          src: '/src/assets/logo.png',
          name: '云门禁',
          status: 0
        },
        {
          id: '2',
          src: '/src/assets/logo.png',
          name: '公告通知',
          status: 2
        },
        {
          id: '3',
          src: '/src/assets/logo.png',
          name: '报事报修',
          status: 0
        },
        {
          id: '4',
          src: '/src/assets/logo.png',
          name: '免费服务',
          status: 0
        },
        {
          id: '5',
          src: '/src/assets/logo.png',
          name: '访客邀约',
          status: 0
        },
        {
          id: '6',
          src: '/src/assets/logo.png',
          name: '投诉表扬',
          status: 1
        },
        {
          id: '7',
          src: '/src/assets/logo.png',
          name: '小区活动',
          status: 1
        }
      ],
      neighbourList: [
        {
          id: '8',
          src: '/src/assets/logo.png',
          name: '活动',
          status: 1
        },
        {
          id: '9',
          src: '/src/assets/logo.png',
          name: '资讯',
          status: 1
        }
      ]
    }
  },
  methods: {
    edit () {
      this.editMode = true
    },
    add (item) {
      item.status = 2
      this.homeList.push(item)
    },
    remove (item, i) {
      this.homeList.splice(i, 1)
      const { id } = item
      const changeStatus = (obj) => {
        if (obj.id === id) {
          if (obj.status !== 0) {
            obj.status = 1
          }
          return true
        }
      }
      this.latelyList.some(changeStatus)
      this.butlerList.some(changeStatus)
      this.neighbourList.some(changeStatus)
    },
    onMove ({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      )
    }
  }
}
</script>

<style lang='less' scoped>
.search-box {
  position: absolute;
  left: 90px;
  right: 90px;
  /deep/ .van-search {
    .van-search__content {
      height: 44px;
      padding-left: @padding-md;
    }

    .van-cell {
      padding: 0 @padding-md 0 0;

      .van-field__left-icon,
      .van-field__control {
        line-height: 44px;
      }

      .van-field__control {
        font-size: @font-size-md;
      }

      .van-icon {
        font-size: 24px;
      }
    }
  }
}
.comfirm-btn {
  height: 44px;
  line-height: 44px;
  padding: 0 23px;
  background: #FFA110;
  border-radius: 4px;
  color: #fff;
  font-size: 24px;
  text-align: center;
}
/deep/ .van-divider {
  color: @gray-7;
  font-size: 24px;
  margin-bottom: 40px;
}
.edit-hint {
  font-size: 26px;
  text-align: center;
  margin-bottom: 40px;
}
.tf-main-container {
  padding-top: 88px;
}
.module-title {
  font-size: 30px;
  font-weight: 500;
  padding: 40px 30px;
}
.home-app {
  padding-top: 50px;
  padding-bottom: 40px;
}
.app-container {
  display: flex;
  flex-wrap: wrap;
}
.app-container--edit {
  .app-container {
    border-top: 1px solid @divider-color;
    border-bottom: 1px solid @divider-color;
  }
  /deep/ .noborder.app-box--edit::after {
    border-bottom-width: 0;
  }
}
.dragging {
  /deep/ .sortable-drag::after {
    border-width: 1px !important;
  }
}
</style>
