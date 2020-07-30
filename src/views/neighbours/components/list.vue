<template>
  <div>
    <refreshList :list.sync="list" @load="onLoad">
      <template v-slot="{item}">
        <div v-if="item.category === 1" class="activity-cell">
          <img class="activity-image" :src="item.images && item.images[0]" />
          <div class="tf-status-tag">活动</div>
          <div class="activity-title">{{item.content}}</div>
          <div class="activity-time">{{item.ctime}}</div>
          <div class="activity-footer">
            <div class="tf-icon tf-icon-like">{{item.thumbsups}}</div>
            <div class="tf-icon tf-icon-message">{{item.comments}}</div>
          </div>
        </div>
        <div v-else-if="item.category === 2">
          <div class="tf-card">
            <div class="tf-card-header">
              <userInfo :avatar="item.avatar" :name="item.account" :time="item.ctime">
                <template v-slot:right>
                  <div class="group-tag">公告小组</div>
                </template>
              </userInfo>
            </div>
            <div class="tf-card-content" @click="goDetails">{{ item.content }}</div>
            <tf-image-list :data="item.images" @click="goDetails"></tf-image-list>
            <div class="activity-footer">
              <div class="tf-icon tf-icon-like">{{item.thumbsups}}</div>
              <div class="tf-icon tf-icon-message">{{item.comments}}</div>
              <div class="tf-icon tf-icon-ellipsis" @click="moreShow = true"></div>
            </div>
          </div>
        </div>
        <div class="activity-cell" v-else>
          <img class="activity-image" :src="item.images && item.images[0]" />
          <div class="tf-status-tag">资讯</div>
          <div class="activity-title">{{item.content}}</div>
          <div class="activity-footer">
            <div class="tf-icon tf-icon-like">{{item.thumbsups}}</div>
            <div class="tf-icon tf-icon-message">{{item.comments}}</div>
          </div>
        </div>
      </template>
    </refreshList>
    <more-popup :moreShow.sync="moreShow"></more-popup>
  </div>
</template>

<script>
import tfImageList from '@/components/tf-image-list'
import refreshList from '@/components/tf-refresh-list'
import UserInfo from '@/components/user-info/index.vue'
import morePopup from './morePopup'

export default {
  components: {
    tfImageList,
    refreshList,
    UserInfo,
    morePopup
  },
  data () {
    return {
      moreShow: false,
      list: [
        {
          id: '2',
          content:
            '在宏观调控不断深入与加强的背景下，房地产行业已经从过去的资源竞争，进入到产品竞争的阶段。对于房企而言，形成产品标准化管理体系，是快速提升房地产企业管理水平的有效捷径。',
          images: [
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'
          ],
          category: 2,
          account: '小雪',
          avatar: 'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
          thumbsups: '5',
          comments: '3',
          ctime: '2020-06-03 16:35:26'
        },
        {
          id: '3',
          content:
            '在宏观调控不断深入与加强的背景下，房地产行业已经从过去的资源竞争，进入到产品竞争的阶段。对于房企而言，形成产品标准化管理体系，是快速提升房地产企业管理水平的有效捷径。',
          images: [
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'
          ],
          category: 3,
          account: '小雪',
          avatar: 'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
          thumbsups: '5',
          comments: '3',
          ctime: '2020-06-03 16:35:26'
        }
      ]
    }
  },
  methods: {
    onLoad () {},
    goDetails () {
      this.$router.push('/pages/neighbours/details')
    }
  }
}
</script>

<style lang="less" scoped>
.tf-card-header {
  border-bottom: none;
  padding-bottom: 0;
}
.activity-cell {
  width: 100%;
  background: #fff;
  border-radius: 10px;
  padding: 30px 30px 0;
  .activity-image {
    width: 100%;
    height: 365px;
    margin-bottom: 10px;
  }
  .activity-title {
    font-size: 30px;
    font-weight: 500;
    @text-ellipsis();
    margin-bottom: 10px;
  }
  .activity-time {
    font-size: 24px;
    color: @gray-7;
    margin-bottom: 10px;
  }
}
.activity-footer {
  margin-top: 20px;
  @flex();
  padding: 20px 0;
  border-top: 1px solid @divider-color;
  .tf-icon {
    text-align: center;
    width: 33.3%;
    font-size: 36px;
  }
}
.tf-status-tag {
  top: 50px;
  right: 20px;
  width: 120px;
  background-image: linear-gradient(
    to right,
    rgba(249, 134, 107, 1),
    rgba(235, 88, 65, 1)
  );
}
.group-tag {
  height:34px;
  line-height: 34px;
  padding: 0 13px;
  text-align: center;
  border:2px solid @orange-dark;
  border-radius:10px 0px 10px 10px;
  color: @orange-dark;
  font-size: 22px;
}
</style>
