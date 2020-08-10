<template>
  <div class="tf-bg">
    <van-nav-bar :title="title" :fixed="true" :border="false" left-arrow @click-left="goback"></van-nav-bar>
    <div class="tf-main-container">
      <van-search v-model="value[step]" placeholder="请输入关键字搜索" />
      <transition tag="div" :name="transitionName">
        <tf-list v-show="step === 0" class="tf-bg-white" key="0">
          <tf-list-item
            v-for="(item, i) in projectList"
            :key="i"
            v-show="item.project_name.indexOf(value[0]) !== -1"
            :title="item.project_name"
            @click="select(item)"
          ></tf-list-item>
        </tf-list>
      </transition>
      <transition tag="div" :name="transitionName">
        <tf-list v-show="step === 1" class="tf-bg-white" key="1">
          <tf-list-item
            v-for="(item, i) in buildList"
            :key="i"
            v-show="item.unit_name.indexOf(value[1]) !== -1"
            :title="`${activeProject.project_name}${item.unit_name}`"
            @click="select(item)"
          ></tf-list-item>
        </tf-list>
      </transition>
      <transition tag="div" :name="transitionName">
        <tf-list v-show="step === 2" class="tf-bg-white" key="1">
          <tf-list-item
            v-for="(item, i) in houseList"
            :key="i"
            v-show="item.house_name.indexOf(value[2]) !== -1"
            :title="`${activeProject.project_name}${activeBuild.unit_name}${item.house_name}`"
            @click="select(item)"
          ></tf-list-item>
        </tf-list>
      </transition>
    </div>
  </div>
</template>

<script>
import { NavBar, Search } from 'vant'
import tfList from '@/components/tf-list/index'
import tfListItem from '@/components/tf-list/item.vue'
import {
  searchProject,
  searchBuilding,
  searchUnit,
  searchHouse
} from '@/api/personage'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Search.name]: Search,
    tfList,
    tfListItem
  },
  data () {
    return {
      transitionName: '',
      value: ['', '', ''],
      title: '选择小区',
      step: 0,
      projectList: [],
      activeProject: {},
      buildList: [],
      activeBuild: {},
      houseList: [],
      activeHouse: {}
    }
  },
  created () {
    this.searchProject()
  },
  methods: {
    select (item) {
      switch (this.step) {
        case 0:
          this.activeProject = item
          this.searchUnit(item)
          this.nextStep()
          break
        case 1:
          this.activeBuild = item
          this.searchHouse(item)
          this.nextStep()
          break
        case 2:
          this.selectHouse(item)
          break
      }
    },
    searchProject () {
      searchProject().then((res) => {
        this.projectList = res.data
      })
    },
    searchUnit (item) {
      searchUnit({
        projectId: item.id
      }).then((res) => {
        this.buildList = res.data
      })
    },
    searchHouse (item) {
      searchHouse({
        projectId: this.activeProject.id,
        unitId: item.id
      }).then((res) => {
        this.houseList = res.data
      })
    },
    selectHouse (item) {
      const obj = {
        project_id: this.activeProject.id,
        // project_name: this.activeProject.project_name,
        building_id: this.activeBuild.id,
        // building_name: this.activeBuild.building_name,
        unit_id: this.activeBuild.id,
        // unit_name: this.activeBuild.unit_name,
        house_id: item.id,
        house_name:
          this.activeProject.project_name +
          this.activeBuild.unit_name +
          item.house_name
      }
      this.$store.commit('setHouseSelected', obj)
      this.$router.go(-1)
    },
    nextStep () {
      this.transitionName = 'slide-to-left'
      this.step++
    },
    goback () {
      if (this.step === 0) {
        this.$router.go(-1)
      } else {
        this.transitionName = 'slide-to-right'
        this.step--
      }
    }
  },
  watch: {
    step (value) {
      const text = ['选择小区', '选择楼栋单元', '选择房屋']
      this.title = text[value]
    }
  }
}
</script>

<style lang="less" scoped>
.tf-bg {
  position: relative;
}
/deep/ .tf-clist {
  border-radius: 0;
}
/deep/ .tf-clist-cell-right {
  flex: 0;
}
.slide-to-right-enter-active,
.slide-to-right-leave-active,
.slide-to-left-enter-active,
.slide-to-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  top: 208px;
  left: 0;
  right: 0;
  bottom: auto;
  backface-visibility: hidden;
  perspective: 800;
}
.slide-to-right-enter {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}
.slide-to-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-to-left-enter {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
.slide-to-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
