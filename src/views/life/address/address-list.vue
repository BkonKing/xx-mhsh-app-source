<template>
  <div class="app-body">
    <div class="order-bar bar-white">
      <van-nav-bar title="收货地址"
                   :border="false"
                   fixed
                   @click-left="$router.go(-1)"
                   left-arrow></van-nav-bar>
    </div>
    <div class="bar-empty"></div>
    <van-list v-model="loading"
              :finished="finished"
              finished-text=""
              @load="onLoad">
      <div v-if="listData.length"
           class="address-list">
        <div v-for="(item,index) in listData" :key="index"
             @click="selectFunc(index)"
             class="address-item">
          <div class="address-label flex-center">
            <div v-if="item.label"
                 class="font-24 color-fff">{{item.label}}</div>
            <img v-else
                 class="label-icon"
                 src="@/assets/img/address_04.png" />
          </div>
          <div class="address-info">
            <div class="address-user flex-align-center">
              <div class="address-name">
                <div class="color-222 font-30 p-nowrap">{{item.realname}}</div>
              </div>
              <div class="address-tel">
                <div class="color-222 font-30">{{item.mobile}}</div>
              </div>
            </div>
            <div class="address-detail flex-align-center">
              <div v-if="item.is_default == 1"
                   class="address-default">默认</div>
              <div class="default-detail-text color-8f8f94 font-24 p-nowrap">{{item.address_cont + item.address_name+item.address_house}}</div>
            </div>
          </div>
          <div class="address-link flex-align-center"
               @click.stop="linkFunc(24,{id:item.id})">
            <img class="address-edit-icon"
                 src="@/assets/img/edit_01.png" />
          </div>
          <div class="address-line"></div>
        </div>
      </div>
      <div v-else
           class="empty-session">
        <img src="@/assets/img/empty_cart.png" />
        <div>暂无地址</div>
      </div>
    </van-list>
    <div class="fixed-submit-empty"></div>
    <div class="submit-fixed-buttom">
      <div class="submit-btn"
           @click="linkFunc(23)">
        <div class="color-fff font-30">添加新地址</div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, List } from 'vant'
import { getAddress } from '@/api/life.js'
import eventBus from '@/utils/eventbus.js'
import { getArea } from '@/utils/util'
export default {
  components: {
    [NavBar.name]: NavBar,
    [List.name]: List
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      isSelect: 0, // 0不是选择地址 1选择地址
      listData: [], // 数据列表
      page: 1, // 页码
      pageSize: 10, // 分页条数
      isEmpty: false, // 是否为空
      loading: false,
      finished: false,
      selectIndex: -1 // 结算传递的地址id所在地址列表的index
    }
  },
  created () {
    this.isSelect = this.$route.query.isSelect
    this.addressId = this.$route.query.addressId
    console.log(this.isSelect)
  },
  beforeRouteLeave (to, from, next) {
    console.log(to.name, from.name)
    if (to.name == 'settlement' && this.isSelect) {
      this.updataAddress(this.selectIndex)
    }
    next()
  },
  methods: {
    selectFunc (index) {
      if (!this.isSelect) return
      // 传递一个map，chooseAddress是key，id是value
      this.selectIndex = index
      // eventBus.$emit('chooseAddress', JSON.stringify(this.listData[index]))
      // 调用router回退页面
      this.$router.go(-1)
    },
    updataAddress (index) {
      if (this.isSelect) {
        eventBus.$emit('chooseAddress', JSON.stringify(this.listData[index]))
      }
    },
    onLoad () {
      // 异步更新数据
      this.getData()
    },
    getData () {
      getAddress({
        page: this.page,
        special_id: ''
      }).then(res => {
        if (res.success) {
          if (res.data) {
            console.log(getArea('新疆维吾尔自治区和田地区和田县'))
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].address_cont = getArea(res.data[i].address_detail)
              // res.data[i].address_name = getArea(res.data[i].address_detail) + res.data[i].address_name
              if (this.addressId && this.addressId == res.data[i].id) {
                this.selectIndex = i
              }
            }
            this.listData = this.page == 1 ? res.data : this.listData.concat(res.data)
            this.isEmpty = !!(this.page == 1 && res.data.length == 0)
            // if(res.data.length < res.pageSize){
            //   this.finished = true;
            // }else {
            //   this.page = this.page+1;
            // }
            this.finished = true
            this.loading = false
          } else {
            this.finished = true
          }
        }
      })
    },
    linkFunc (type, obj = {}) {
      switch (type) {
        case 23:
          this.$router.push('/address/edit')
          break
        case 24:
          this.$router.push({
            path: '/address/edit',
            query: {
              id: obj.id
            }
          })
          break
      }
    }
  }
}
</script>

<style scoped>
@import "../../../styles/life.css";
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
}
.address-list {
  background-color: #fff;
}
.address-item {
  height: 162px;
  display: flex;
  position: relative;
}
.address-label {
  width: 80px;
  height: 80px;
  background-color: #aaa;
  padding: 0 16px;
  margin: 40px 0 0 30px;
}
.address-label div {
  white-space: nowrap;
  overflow: hidden;
}
.label-icon {
  width: 25px;
  height: 32px;
}
.address-info {
  margin-left: 20px;
  width: 526px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 40px;
}
.address-user {
  display: flex;
  align-items: center;
  height: 36px;
}
.address-name {
  max-width: 300px;
  margin-right: 20px;
}
.address-detail {
  height: 38px;
}
.address-default {
  width: 60px;
  height: 30px;
  font-size: 24px;
  color: #ffffff;
  line-height: 30px;
  border-radius: 2px;
  text-align: center;
  margin-right: 10px;
  background-image: -webkit-linear-gradient(to right, #f9866b, #eb5942);
  background-image: linear-gradient(to right, #f9866b, #eb5942);
}
.address-detail-text {
  max-width: 526px;
}
.default-detail-text {
  max-width: 100%;
}
.address-link {
  width: 94px;
  padding-right: 30px;
  justify-content: flex-end;
}
.address-edit-icon {
  width: 44px;
  height: 44px;
}
.address-line {
  height: 1px;
  background-color: #f0f0f0;
  position: absolute;
  bottom: 0;
  left: 30px;
  right: 30px;
}
</style>
