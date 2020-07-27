<template>
  <div class="tf-bg">
    <van-nav-bar title="我的报事报修" :fixed="true" left-arrow @click-left="$router.go(-1)" />
    <div class="tf-main-container">
      <refreshList :list.sync="repairList" @load="onLoad">
        <template v-slot="{item}">
          <div class="list-item--time">{{item.ctime}}</div>
          <div class="tf-card" @click="jump(item)">
            <div class="tf-card-header">
              <div class="tf-card-header__title">{{item.category}}</div>
              <div
                class="tf-card-header__status"
                :class="{'tf-card-header__status--complete': item.status > 5}"
              >{{statusText[item.status]}}</div>
            </div>
            <div class="tf-card-content">{{item.content}}</div>
          </div>
        </template>
      </refreshList>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import { statusText } from '@/const/butler.js'
import { getRepairList } from '@/api/butler/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    refreshList
  },
  data () {
    return {
      repairList: [
        {
          id: '1',
          category: '居家报修',
          content: '厨房下水道堵了',
          images: [
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'
          ],
          status: 6,
          ctime: '2020-06-03 16:35:26'
        }
      ],
      statusText
    }
  },
  created () {
    this.getRepairList()
  },
  methods: {
    onLoad () {},
    getRepairList () {
      getRepairList({
        projectId: '',
        repairId: ''
      }).then((res) => {
        if (res.success) {
          this.repairList = res.data
        }
      })
    },
    jump (item) {
      const url = `/pages/butler/repairs/details?id=${item.id}&title=${item.category}`
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.list-item--time {
  font-size: 24px;
  text-align: center;
  color: @gray-7;
  margin-top: @padding-md;
  margin-bottom: @padding-md;
}

.tf-card-header__title {
  width: 550px;
}

.tf-card-content {
  color: @text-color;
}
.repair-list {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 20px;
  right: 20px;
}
</style>
