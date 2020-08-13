<template>
  <div class="tf-padding-base tf-bg">
    <van-nav-bar title="访客" :fixed="true" left-arrow @click-left="$router.go(-1)" />
    <div class="tf-main-container">
      <div
        v-for="(item, i) in data"
        :key="i"
        class="list-item tf-row-space-between"
        @click="onClick(item)"
      >
        <div class="tf-row">
          <div class="tf-text">{{ item.realname }}</div>
          <div class="tf-text">{{ item.gender | sex}}</div>
          <div class="tf-text tf-text-grey">{{ item.mobile }}</div>
          <div class="tf-text tf-text-grey">{{ item.car_number }}</div>
        </div>
        <div class="tf-row">
          <span class="tf-icon tf-icon-bianxie-square" @click.stop="jump(0, item)"></span>
          <span class="tf-icon tf-icon-delete icon--remove" @click.stop="deleteMyVisitor(item.id)"></span>
        </div>
      </div>
      <van-button type="danger" size="large" @click="jump(1)">新增访客</van-button>
    </div>
  </div>
</template>

<script>
import { NavBar, Button, Toast, Dialog } from 'vant'
import { getMyVisitorList, deleteMyVisitor } from '@/api/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button
  },
  data () {
    return {
      type: undefined,
      data: []
    }
  },
  created () {
    this.type = this.$route.query.type
    this.getMyVisitorList()
  },
  methods: {
    onClick (item) {
      // eslint-disable-next-line eqeqeq
      if (this.type == '2') {
        this.$store.commit('setVisitorList', item)
        this.$router.go(-1)
      }
    },
    getMyVisitorList () {
      getMyVisitorList().then((res) => {
        if (res.success) {
          this.data = res.data
        }
      })
    },
    deleteMyVisitor (id) {
      Dialog.alert({
        title: '是否删除该访客信息'
      }).then(() => {
        deleteMyVisitor({
          id
        }).then((res) => {
          Toast({
            message: '删除成功'
          })
          this.getMyVisitorList()
        })
      })
    },
    jump (type, item) {
      let url = `/pages/butler/visitor/edit?type=${type}`
      if (type === 0) {
        url = `${url}&info=${JSON.stringify(item)}`
      }
      this.$router.push(url)
    }
  },
  filters: {
    sex (value) {
      const sexText = {
        1: '男',
        2: '女'
      }
      return sexText[value]
    }
  }
}
</script>

<style lang="less" scoped>
.list-item {
  height: 120px;
  align-items: center;
  padding: 0 30px;
  margin-bottom: @padding-lg;
  border-radius: @border-radius-md;
  background-color: #fff;
}
.tf-text {
  margin-right: @padding-md;
}
.tf-icon {
  font-size: 42px;
  margin-left: @padding-md;
}
.icon--remove {
  color: @red-dark;
}
</style>
