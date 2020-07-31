<template>
  <div class="tf-bg">
    <van-nav-bar
      title="访客邀约记录"
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="tf-main-container">
      <van-tabs v-model="isVisit">
        <van-tab v-for="(item, i) in items" :key="i" @click="onClickItem" :title="item"></van-tab>
      </van-tabs>
      <refreshList :list.sync="data" @load="getVisitorLogList">
        <template v-slot="{item}">
          <div class="tf-card tf-mb-base">
            <div class="list-item">
              <span class="tf-status-tag">已过期</span>
              <div class="tf-row tf-mb-base">
                <div class="tf-text-lg tf-text-grey">来访日期：</div>
                <div class="tf-text-lg">
                  {{ item.stime }}
                  <!-- - {{ item.etime }} -->
                </div>
              </div>
              <div class="tf-row tf-mb-base">
                <div class="tf-text-lg tf-text-grey">进出次数：</div>
                <div class="tf-text-lg">{{ item.vtimes | vtimes }}</div>
              </div>
              <div class="tf-row tf-mb-base">
                <div class="tf-text-lg tf-text-grey">同行人数：</div>
                <div class="tf-text-lg">{{ item.num }}人</div>
              </div>
              <div class="tf-row tf-mb-base">
                <div class="tf-text-lg tf-text-grey">访客信息：</div>
                <div>
                  <span class="tf-text-lg">{{ item.realname }} {{ item.gender | sex }}</span>
                  <div class="tf-text-lg tf-text-grey tf-mt-base">{{ item.mobile }} {{ item.car_number }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </refreshList>
    </div>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import { getVisitorLogList } from '@/api/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    refreshList
  },
  data () {
    return {
      items: ['待来访', '已过期', '已到访'],
      isVisit: 0,
      data: [
        {
          id: '1',
          realname: '陈小东',
          mobile: '13699466258',
          gender: '1',
          stime: '2020-05-12 10:00:00',
          etime: '2020-05-12 15:00:00',
          vtimes: '1',
          vlogs: ['2020-05-12 10:11:36'],
          car_number: '闽A88888',
          num: '1',
          is_visit: '1',
          ctime: '2020-05-12 09:55:21'
        },
        {
          id: '2',
          realname: '许岩',
          mobile: '13793636398',
          gender: '2',
          stime: '2020-05-12 10:00:00',
          etime: '2020-05-12 15:00:00',
          vtimes: '1',
          vlogs: '',
          car_number: '闽A88866',
          num: '1',
          is_visit: '2',
          ctime: '2020-05-12 10:31:15'
        }
      ]
    }
  },
  created () {
    this.getVisitorLogList()
  },
  methods: {
    getVisitorLogList () {
      getVisitorLogList({
        isVisit: this.isVisit
      }).then(res => {
        if (res.success) {
          this.data = res.data
        }
      })
    },
    onClickItem (e) {
      if (this.isVisit !== e.currentIndex) {
        this.isVisit = e.currentIndex
        this.getVisitorLogList()
      }
    }
  },
  filters: {
    sex (value) {
      const sexText = {
        1: '男',
        2: '女'
      }
      return sexText[value]
    },
    vtimes (value) {
      const vtime = {
        1: '当日一次',
        2: '当日两次',
        3: '当日三次及以上'
      }
      return vtime[value]
    }
  }
}
</script>

<style lang="less" scoped>
.list-item {
  position: relative;
  background-color: #fff;
  border-radius: @border-radius-md;
  margin-bottom: @padding-md;
  padding: 30px 0;
}

.visit-status {
  position: absolute;
  right: 20px;
}

.tf-status-tag {
  right: -30px;
}
</style>
