<template>
  <div class="tf-bg tf-body">
    <van-nav-bar title="我的报事报修" :fixed="true" placeholder left-arrow @click-left="$router.go(-1)" />
    <div class="tf-body-container">
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
