<template>
  <div class="tf-bg">
    <van-nav-bar title="我的报事报修" :fixed="true" left-arrow @click-left="$router.go(-1)" />
    <div class="tf-main-container">
      <list></list>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import list from './components/list'

export default {
  components: {
    [NavBar.name]: NavBar,
    list
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
      ]
    }
  },
  created () {},
  methods: {}
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
