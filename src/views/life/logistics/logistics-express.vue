<template>
	<div class="app-body">
    <div class="order-bar bar-white">
      <van-nav-bar
        title="物流详情"
        fixed
        :border="false"
        placeholder
        left-arrow
        @click-left="$router.go(-1)"
      ></van-nav-bar>
    </div>
    <template v-if="order_id">
      <template v-if="infoData">
        <div class="block-session logistics-goods">
          <div class="logistics-goods-pic">
            <div class="goods-num">共{{infoData.count}}件</div>
            <img class="img-100" :src="infoData.img_arr[0]" />
          </div>
          <div class="logistics-tip">
            <div>物流配送：{{infoData.name}}</div>
            <div>运单编号：{{infoData.kuaidi_numb}}</div>
          </div>
          <div class="copy-btn" @click="copy_cont(infoData.name2)">
            <div class="copy-text">复制</div>
          </div>
        </div>
        
        <div v-if="infoData.kd_text_arr.data.length" class="block-session logistics-body">
          <div class="logistics-list">
            <div v-for="(item, index) in infoData.kd_text_arr.data" class="logistics-item">
              <div class="item-icon-box"><div class="item-icon"></div></div>
              <div class="item-msg">{{item.context}}</div>
              <div class="item-time">{{item.time}}</div>
            </div>
          </div>
          <div class="logistics-line"></div>
        </div>
        <div v-else class="no-logistics color-8f8f94">暂无物流进度</div>
      </template>
    </template>
    <template v-else>
      <template v-if="infoData2">
        <div class="block-session logistics-goods">
          <div class="logistics-goods-pic">
            <div class="goods-num">共{{num}}件</div>
            <img class="img-100" :src="url" />
          </div>
          <div class="logistics-tip">
            <div>物流配送：{{infoData2.kuaidi_name}}</div>
            <div>运单编号：{{infoData2.kuaidi_numb}}</div>
          </div>
          <div class="copy-btn" @click="copy_cont(infoData2.kuaidi_numb)">
            <div class="copy-text">复制</div>
          </div>
        </div>
        
        <div v-if="infoData2.kd_text_arr.data.length" class="block-session logistics-body">
          <div class="logistics-list">
            <div v-for="(item, index) in infoData2.kd_text_arr.data" class="logistics-item">
              <div class="item-icon-box"><div class="item-icon"></div></div>
              <div class="item-msg">{{item.context}}</div>
              <div class="item-time">{{item.time}}</div>
            </div>
          </div>
          <div class="logistics-line"></div>
        </div>
        <div v-else class="no-logistics color-8f8f94">暂无物流进度</div>
      </template>
    </template>
    
	</div>
</template>

<script>
import { NavBar, Toast } from 'vant'
import { getLogisticsInfo, getLogisticsOne } from '@/api/life.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      order_id: '',
      infoData: '',
      infoData2: '',
      num: '',
      url: ''
    }
  },
  created(){
    this.order_id = this.$route.query.id;
    this.index = this.$route.query.index ? this.$route.query.index : 0;

    this.logistice_id = this.$route.query.logistice_id;
    this.num = this.$route.query.num;
    this.url = this.$route.query.url;
    this.getData();
  },
  methods: {
    getData () {
      if(this.order_id){
        getLogisticsInfo({
          order_project_id: this.order_id
        }).then(res => {
          if (res.success) {
            this.infoData = res.data[this.index];
          }
        })
      }else {

        getLogisticsOne({
          logistice_id: this.logistice_id
        }).then(res => {
          if (res.success) {
            this.infoData2 = res.data;
            console.log(this.infoData2.kd_text_arr.data);
          }
        })
      }
      
    },
    copy_cont(text_c){
      var clipBoard = api.require('clipBoard');
      clipBoard.set({
        value: text_c
      }, function(ret, err) {
        if (ret) {
            Toast('复制成功');
        } else {
            alert(JSON.stringify(err));
        }
      });
    },
  },
}
</script>

<style scoped  src="../../../styles/life.css"></style>
<style scoped>
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
}
.block-session {
  margin-bottom: 30px;
}
.logistics-goods {
  margin-top: 30px;
}
.logistics-goods {
  padding: 30px 0 30px 30px;
  display: flex;
  position: relative;
}
.logistics-goods-pic {
  width: 114px;
  height: 114px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}
.goods-num {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: rgba(0,0,0,0.5);
  color: #fff;
  font-size: 22px;
}
.logistics-tip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  color: #222;
}
.logistics-tip div {
  line-height: 57px;
}
.copy-btn {
  position: absolute;
  right: 20px;
  bottom: 27px;
  padding: 10px;
}
.copy-text {
  height: 32px;
  line-height: 28px;
  width: 58px;
  color: #ffa110;
  font-size: 22px;
  text-align: center;
  border: 2px solid #ffa110;
}
.no-logistics {
  line-height: 126px;
  text-align: center;
}
.logistics-body {
  position: relative;
  padding: 30px 40px 0 42px;
  overflow: hidden;
}
.logistics-list {
  color: #8f8f94;
  position: relative;
  z-index: 8;
}
.logistics-item {
  position: relative;
  padding: 0 0 44px 50px;
}
.item-msg {
  line-height: 46px;
}
.logistics-item:first-child .item-msg {
  color: #222;
}
.item-time {
  font-size: 24px;
  line-height: 38px;
  color: #999;
}
.item-icon-box {
  position: absolute;
  left: 0;
  top: 6px;
  width: 16px;
  height: 36px;
  background-color: #fff;
  padding: 10px 0;
}
.item-icon {
  width: 16px;
  height: 16px;
  background-color: #aaa;
  border-radius: 50%;
}
.logistics-item:nth-last-child(1) .item-icon-box {
  height: 100%;
}
.logistics-item:first-child .item-icon-box .item-icon {
  background-color: #eb5841;
}
.logistics-line {
  position: absolute;
  top: 42px;
  bottom: 40px;
  left: 50px;
  width: 1.3px;
  background-color: #aaa;
}
</style>
