<template>
	<div class="app-body">
    <div class="order-bar bar-white"><van-nav-bar title="物流详情" :border="false" fixed @click-left="$router.go(-1)" left-arrow></van-nav-bar></div>
    <div class="bar-empty"></div>
    <div class="logistics-list">
      <template v-for="(item, index) in listData">
        <div class="logistics-item block-session" @click="logisticsLink(index)">
          <div class="item-header">
            <img v-if="item.buy_type == 1 && item.l_status == 0" class="wxchart-code" src="@/assets/img/code_01.png" />
            <div class="logistics-name">{{item.name}}<span :class="[item.buy_type!=0 && item.l_status == 0 ? 'color-eb5841' : '',item.buy_type!=0 && item.l_status == 1 ? 'color-8f8f94' : '']">（{{item.name2}}）</span></div>
            <div v-if="item.buy_type==0 && item.l_status==0" class="logistics-info">
              <div class="logistics-icon-circular"></div>
              <div class="logistics-icon-line"></div>
              <div class="logistics-text">{{item.kd_text_arr.data[0].context}}</div>
              <div class="logistics-time">{{item.kd_text_arr.data[0].time}}</div>
            </div>
          </div>
          <div class="item-pic-list">
            <div v-for="(val, key) in item.img_arr" class="item-pic-item">
              <img class="img-100" :src="val" />
            </div>
          </div>
        </div>
      </template>
      <!-- <div class="logistics-item block-session" @click="linkFunc(22,{id:2})">
        <div class="item-header">
          <div class="logistics-name">顺丰速运<span class="color-8f8f94">（已签收）</span></div>
          <div class="logistics-info">
            <div class="logistics-icon-circular"></div>
            <div class="logistics-icon-line"></div>
            <div class="logistics-text">仓库已接单</div>
            <div class="logistics-time">2018-11-11 11:11:11</div>
          </div>
        </div>
        <div class="item-pic-list">
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
        </div>
      </div>
      <div class="logistics-item block-session" @click="linkFunc(22,{id:2})">
        <div class="item-header">
          <div class="logistics-name">顺丰速运<span class="color-8f8f94">（SF123456789）</span></div>
          <div class="logistics-info">
            <div class="logistics-icon-circular"></div>
            <div class="logistics-icon-line"></div>
            <div class="logistics-text">仓库已接单</div>
            <div class="logistics-time">2018-11-11 11:11:11</div>
          </div>
        </div>
        <div class="item-pic-list">
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
        </div>
      </div>
      <div class="logistics-item block-session" @click="linkFunc(21,{id:2})">
        <div class="item-header">
          <img class="wxchart-code" src="@/assets/img/code_01.png" />
          <div class="logistics-name">上门自提<span class="color-eb5841">（未提货）</span></div>
        </div>
        <div class="item-pic-list">
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
        </div>
      </div>
      <div class="logistics-item block-session" @click="linkFunc(21,{id:2})">
        <div class="item-header">
          <img class="wxchart-code" src="@/assets/img/code_01.png" />
          <div class="logistics-name">上门自提<span class="color-8f8f94">（已提货）</span></div>
        </div>
        <div class="item-pic-list">
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
          <div class="item-pic-item">
            <img class="img-100" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
          </div>
        </div>
      </div> -->
    </div>
	</div>
</template>

<script>
import { NavBar } from 'vant'
import { getLogisticsInfo } from '@/api/life.js'
export default {
  components: {
    [NavBar.name]: NavBar,
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      listData: '',
    }
  },
  created(){
    this.order_id = this.$route.query.id;
    this.getData();
  },
  methods: {
    getData () {
      getLogisticsInfo({
        order_project_id: this.order_id
      }).then(res => {
        if (res.success) {
          this.listData = res.data;
        }
      })
    },
    logisticsLink(index) {
      var _this = this.listData[index];
      if(_this.buy_type == 0){ //0快递 1自提 2商家配送
        this.$router.push({
          path: '/logistics/logistics-express',
          query: {
            id: this.order_id,
            index: index
          }
        })
      }else if(_this.buy_type == 1){
        this.$router.push({
          path: '/logistics/logistics-self',
          query: {
            id: this.order_id,
            index: index
          }
        })
      }else {
        this.$router.push({
          path: '/logistics/logistics-business',
          query: {
            id: this.order_id,
            index: index
          }
        })
      }
    },
  }
}
</script>

<style scoped  src="../../../styles/life.css"></style>
<style scoped>
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
}

.logistics-list {
  margin-top: 30px;
}
.logistics-item {
  overflow: hidden;
  margin-bottom: 30px;
}
.item-header {
  width: 650px;
  margin: 0 auto;
  min-height: 90px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}
.wxchart-code {
  position: absolute;
  top: 23px;
  right: 5px;
  width: 44px;
  height: 44px;
}
.logistics-name {
  height: 80px;
  line-height: 90px;
  color: #222;
  overflow: hidden;
}
.logistics-info {
  position: relative;
  color: #999999;
  padding: 0 0 20px 60px;
}
.logistics-icon-circular {
  position: absolute;
  top: 14px;
  left: 12px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #383838;
}
.logistics-icon-line {
  position: absolute;
  top: 41px;
  bottom: 30px;
  left: 20px;
  width: 1.3px;
  border-radius: 50%;
  background-color: #aaa;
}
.logistics-text {
  line-height: 44px;
}
.logistics-time {
  font-size: 24px;
  line-height: 40px;
}
.item-pic-list {
  width: 670px;
  display: flex;
  padding: 30px 0 10px;
  margin: 0 auto;
  flex-wrap: wrap;
}
.item-pic-item {
  width: 114px;
  height: 114px;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  margin: 0 10px 20px;
} 
</style>
