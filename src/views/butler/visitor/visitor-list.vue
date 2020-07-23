<template>
  <scroll-view class="tf-padding-base tf-bg">
    <list>
      <cell v-for="(item, i) in data" :key="item.id">
        <view class="list-item tf-row-space-between">
          <view class="tf-row">
            <text class="tf-text">{{ item.realname }}</text>
            <text class="tf-text">{{ item.gender | sex}}</text>
            <text class="tf-text tf-text-grey">{{ item.mobile }}</text>
            <text class="tf-text tf-text-grey">{{ item.car_number }}</text>
          </view>
          <view class="tf-row">
            <text class="tf-icon" @click="jump(0, item)">{{ icon_edit_square }}</text>
            <text class="tf-icon icon--remove" @click="deleteMyVisitor(item.id)">{{ icon_delete }}</text>
          </view>
        </view>
      </cell>
    </list>
    <button type="warn" @click="jump(1)">新增访客</button>
  </scroll-view>
</template>

<script>
import { getMyVisitorList, deleteMyVisitor } from '@/api/butler/butler.js';
import { icon_delete, icon_edit_square } from '../../const/icon.js';
export default {
  data() {
    return {
      icon_delete,
      icon_edit_square,
      items: ['待来访', '已过期', '已到访'],
      current: 0,
      data: [
        {
          id: '1',
          realname: '陈小东',
          mobile: '13699466258',
          gender: 1,
          car_number: '闽A88888'
        },{
        "id": "2",
        "realname": "许岩",
        "mobile": "13793636398",
        "gender": 2,
        "car_number": "闽A88866"
    }
      ]
    };
  },
  methods: {
    getMyVisitorList() {
      getMyVisitorList().then(res => {
        if (res.success) {
          this.data = res.data;
        }
      });
    },
    deleteMyVisitor({id}) {
      deleteMyVisitor({
        id
      }).then(res => {
        uni.showToast({
          title: '删除成功'
        });
      })
    },
    jump(type, item) {
      let url = `/pages/butler/visitor/edit?type=${type}`
      if (type === 0) {
        url = `${url}&info=${JSON.stringify(item)}`
      }
      uni.navigateTo({
        url: url
      });
    }
  },
  filters: {
    sex(value) {
      const sexText = {
        1: '男',
        2: '女'
      };
      return sexText[value];
    }
  }
};
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
  margin-left: @padding-md;
}
.icon--remove {
  color: @red-dark;
}
</style>
