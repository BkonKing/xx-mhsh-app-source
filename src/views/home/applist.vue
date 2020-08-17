<template>
  <div class="tf-bg">
    <div class="van-nav-bar van-nav-bar--fixed">
      <div class="van-nav-bar__left">
        <i
          v-show="!editMode"
          class="van-icon van-icon-arrow-left van-nav-bar__arrow"
          @click="$router.go(-1)"
        ></i>
        <span v-show="editMode" class="font-26" @click="cancelEdit">取消</span>
      </div>
      <div v-show="!editMode" class="search-box">
        <van-search v-model="value" placeholder="全部应用" />
      </div>
      <div class="van-nav-bar__title van-ellipsis" v-show="editMode">管理应用</div>
      <div class="van-nav-bar__right">
        <span v-show="!editMode" @click="edit">编辑</span>
        <span class="comfirm-btn" v-show="editMode" @click="saveMyApp">完成</span>
      </div>
    </div>
    <div class="tf-main-container" :class="{'app-container--edit': editMode}">
      <div class="tf-bg-white home-app">
        <div class="edit-hint" v-if="editMode">按住应用可拖动调整顺序</div>
        <van-divider dashed>以下应用展示在首页</van-divider>
        <draggable
          class="app-container"
          :class="{'dragging': isDragging}"
          id="app-container"
          v-model="myAppList"
          handle="#app-container"
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
            v-for="(item,i) in myAppList"
            :class="{'noborder': myAppList.length - myAppList.length % 5 <= i}"
            :key="i"
            :src="item.icon_image"
            :name="item.application"
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
import { NavBar, Divider, Search, Toast } from 'vant'
import appContainer from './components/app-container'
import appItem from './components/app-item'
import draggable from 'vuedraggable'
import { getMyApp, saveMyApp, getAllApp } from '@/api/home'
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
      myAppList: [],
      latelyList: [],
      butlerList: [],
      neighbourList: [],
      myAppList_copy: [],
      allAppList_copy: {}
    }
  },
  created () {
    this.getAllApp()
    this.getMyApp()
  },
  methods: {
    edit () {
      this.editMode = true
      this.myAppList_copy = this.cloneObject(this.myAppList)
      this.allAppList_copy = this.cloneObject({
        latelyList: this.latelyList,
        butlerList: this.butlerList,
        neighbourList: this.neighbourList
      })
    },
    /* 添加应用 */
    add (item) {
      if (this.myAppList.length >= 9) {
        Toast('数量已经到达上限')
        return
      }
      item.status = 2
      this.myAppList.push(item)
    },
    /* 删除应用 */
    remove (item, i) {
      this.myAppList.splice(i, 1)
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
    },
    /* 取消编辑 */
    cancelEdit () {
      this.myAppList = this.myAppList_copy
      this.toTypeList(this.allAppList_copy)
      this.editMode = false
    },
    getAllApp () {
      getAllApp().then((res) => {
        this.toTypeList(res.data)
      })
    },
    /* 给所有应用分类赋值 */
    toTypeList (obj) {
      const { latelyList, butlerList, neighbourList } = obj
      this.latelyList = latelyList
      this.butlerList = butlerList
      this.neighbourList = neighbourList
    },
    getMyApp () {
      Toast.loading({
        overlay: true,
        duration: 0,
        message: '加载中'
      })
      getMyApp().then((res) => {
        this.myAppList = res.data
        Toast.clear()
      })
    },
    saveMyApp () {
      const ids = this.myAppList.map((obj) => obj.id)
      const params = {
        appids: ids.join(',')
      }
      saveMyApp(params).then((res) => {
        this.editMode = false
      })
    },
    cloneObject (obj) {
      return JSON.parse(JSON.stringify(obj))
    }
  }
}
</script>

<style lang='less' scoped>
.search-box {
  position: absolute;
  left: 90px;
  right: 90px;
  /deep/ input::placeholder {
    font-size: 24px;
    color: #8f8f94 !important;
  }
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
  background: #ffa110;
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
  padding: 40px 30px 0;
}
.home-app {
  padding-top: 20px;
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
  .module-title {
    padding: 40px 30px;
  }
}
.dragging {
  /deep/ .sortable-drag::after {
    border: 1px solid @divider-color !important;
  }
}
</style>
