<template>
  <div>
    <van-popup
      v-model="show"
      :close-on-click-overlay="false"
      closeable
      round
      position="bottom"
    >
      <div class="goods-share-popup">
        <div class="goods-share-popup-title">
          分享商品 送{{ infoData.credits }}幸福币
        </div>
        <div class="goods-share-popup-text">点击选择一个商品</div>
        <ul class="goods-list">
          <li
            v-for="(item, i) in infoData.list"
            :key="i"
            class="goods-item"
            @click="selectGoods(item)"
          >
            <i
              v-if="activeGoods.goods_id === item.goods_id"
              class="tf-icon tf-icon-yijiaofu goods-selected-icon"
            ></i>
            <img class="goods-img" :src="item.pic" alt="" />
          </li>
        </ul>
        <van-button class="share-btn" type="danger" @click="handleShare"
          >分享</van-button
        >
      </div>
    </van-popup>
    <tf-share
      :title="`分享商品 送${infoData.credits}幸福币`"
      :close-on-click-overlay="false"
      :close-icon="false"
      :share-show="shareShow"
      :share-obj="shareObj"
      @success="success"
      @closeSwal="closeShare"
    ></tf-share>
  </div>
</template>

<script>
import tfShare from '@/components/tf-share'
import { giveCredits } from '@/api/life'
import { downloadPic } from '@/utils/util'
export default {
  name: 'goods-share',
  components: {
    tfShare
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    infoData: {
      type: Object,
      default: () => ({
        list: []
      })
    }
  },
  data () {
    return {
      show: this.value,
      activeGoods: {},
      shareShow: false,
      shareObj: {}
    }
  },
  watch: {
    value (val) {
      this.show = val
      if (val && this.infoData.list && this.infoData.list.length === 1) {
        this.handleShare()
      }
    },
    show (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    // 选中商品
    selectGoods (goods) {
      this.activeGoods = goods
    },
    // 点击分享
    handleShare () {
      this.show = false
      this.shareShow = true
      if (!this.activeGoods.goods_id) {
        this.activeGoods = this.infoData.list[0]
        this.downloadSharePic()
      }
    },
    // 保存分享图片
    downloadSharePic () {
      const urlName = 'goods_' + this.activeGoods.goods_id
      downloadPic(this.activeGoods.share_img, urlName)
        .then(data => {
          this.setShareObj(data)
        })
        .catch(() => {
          this.setShareObj('')
        })
    },
    // 设置分享参数
    setShareObj (data) {
      this.shareObj = {
        title: this.activeGoods.goods_name,
        description: '好货分享给你！',
        pyqTitle: this.activeGoods.goods_name,
        thumb: data ? 'fs://' + data + '.png' : '',
        contentUrl:
          'http://live.tosolomo.com/wap/#/goodsDetail?id=' +
          this.infoData.goods_id
      }
    },
    success () {
      giveCredits({
        order_id: this.activeGoods.order_id
      }).then(({ success }) => {
        success && this.$toast(`商品分享成功，奖励${this.infoData.credits}幸福币`)
      })
    },
    closeShare (data) {
      console.log(data)
      this.shareShow = data === 1
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-icon-cross {
  top: 30px;
  right: 30px;
  font-size: 36px;
}
.goods-share-popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  &-title {
    font-size: 32px;
    line-height: 1;
    color: #000000;
  }
  &-text {
    margin-top: 30px;
    font-size: 24px;
    line-height: 1;
    color: #8f8f94;
  }
  .goods-list {
    display: flex;
    margin-top: 50px;
    .goods-item {
      position: relative;
    }
    .goods-item + .goods-item {
      margin-left: 40px;
    }
    .goods-img {
      width: 130px;
      height: 130px;
      background: #f7f7f7;
      border-radius: 4px;
    }
  }
  .share-btn {
    width: 100%;
    height: 80px;
    margin-top: 50px;
    border-radius: 40px;
  }
  .goods-selected-icon {
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 40px;
    line-height: 1;
    color: #eb5841;
    background: #fff;
  }
}
</style>
