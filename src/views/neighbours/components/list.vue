<template>
  <div>
    <refreshList :list.sync="list" @load="onLoad">
      <template v-slot="{item}">
        <div v-if="category === 1 || item.category === 1" class="activity-cell">
          <div @click="goDetails(1, item.id)">
            <div class="activity-image-box">
              <img class="activity-image" :src="item.thumbnail" />
              <div class="activity-join">{{item.joins || 0}}人已报名</div>
            </div>
            <div class="tf-status-tag">活动</div>
            <div class="activity-title">{{item.title}}</div>
            <div class="activity-time">{{item.ctime}}</div>
          </div>
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
            <div class="tf-card-content" @click="goDetails(2)">{{ item.content }}</div>
            <tf-image-list :data="item.images" @click="goDetails(2)"></tf-image-list>
            <div class="activity-footer">
              <div class="tf-icon tf-icon-like">{{item.thumbsups}}</div>
              <div class="tf-icon tf-icon-message">{{item.comments}}</div>
              <div class="tf-icon tf-icon-ellipsis" @click="moreShow = true"></div>
            </div>
          </div>
        </div>
        <div class="activity-cell" v-else-if="category === 3 || item.category === 3">
          <div @click="goDetails(3, item.id)">
            <img class="activity-image" :src="item.thumbnail" />
            <div class="tf-status-tag">资讯</div>
            <div class="activity-title">{{item.content}}</div>
          </div>
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
  props: {
    data: {
      type: Array,
      defautl: () => []
    },
    category: {
      type: Number,
      defautl: undefined
    }
  },
  data () {
    return {
      moreShow: false,
      list: this.data
    }
  },
  methods: {
    onLoad () {},
    goDetails (category, id) {
      this.$router.push({
        path: '/pages/neighbours/details',
        query: {
          category,
          id
        }
      })
    }
  },
  watch: {
    data (value) {
      this.list = value
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
  .activity-image-box {
    position: relative;
    width: 100%;
    height: 365px;
    margin-bottom: 10px;
  }
  .activity-image {
    width: 100%;
    height: 365px;
  }
  .activity-join {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 66px;
    line-height: 66px;
    text-align: center;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 0 0 4px 4px;
    font-size: 24px;
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
    color: #aaa;
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
  height: 34px;
  line-height: 34px;
  padding: 0 13px;
  text-align: center;
  border: 2px solid @orange-dark;
  border-radius: 10px 0px 10px 10px;
  color: @orange-dark;
  font-size: 22px;
}
</style>
