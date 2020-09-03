<template>
  <div style="height: 100%;">
    <refreshList ref="list" :list.sync="list" :load="load">
      <template v-slot="{item, index}">
        <div v-if="item.article_type == 2 || article_type == 2" class="activity-cell">
          <div @click="goDetails('2', item)">
            <div class="activity-image-box">
              <img class="activity-image" :src="item.thumbnail" />
              <div class="activity-join">{{item.joins || 0}}人已报名</div>
            </div>
            <div class="tf-status-tag">活动</div>
            <div class="activity-title">{{item.title}}</div>
            <div class="activity-time">{{item.ctime}}</div>
          </div>
          <operation :item="item" :article-type="item.article_type || article_type" :key="item.id"></operation>
        </div>
        <div v-else-if="item.article_type == 3 || article_type == 3">
          <div class="tf-card">
            <div class="tf-card-header" @click="goDetails('3', item)">
              <userInfo :avatar="item.avatar" :name="item.nickname" :time="item.ctime">
                <template v-slot:right>
                  <div class="group-tag">{{item.category}}</div>
                </template>
              </userInfo>
            </div>
            <div v-if="item.content" class="tf-card-content" @click="goDetails('3', item)">{{ item.content }}</div>
            <template v-if="item.images">
              <img width="33%" :src="item.images[0]" v-if="item.images.length === 1" @click.stop="preview(item.images[0])" />
              <tf-image-list class="tf-mt-base" mode="shadeShow" v-else-if="item.images.length > 1" :data="item.images"></tf-image-list>
            </template>
            <operation
              :item="item"
              :article-type="item.article_type || article_type"
              :key="item.id"
            >
              <div class="van-icon van-icon-ellipsis" @click.stop="onOperation(item, index)"></div>
            </operation>
          </div>
        </div>
        <div class="activity-cell" v-else-if="item.article_type == 1 || article_type == 1">
          <div @click="goDetails('1', item)">
            <img class="activity-image" :src="item.thumbnail" />
            <div class="tf-status-tag">资讯</div>
            <div class="activity-title">{{item.title}}</div>
          </div>
          <operation :item="item" :article-type="item.article_type || article_type" :key="item.id"></operation>
        </div>
      </template>
    </refreshList>
    <more-popup
      :moreShow.sync="moreShow"
      :deleteProp="status"
      :complain="!status"
      :shield="!status"
      :complainInfo="active"
      :complainType="1"
      @delete="deleteArticle"
    ></more-popup>
  </div>
</template>

<script>
import tfImageList from '@/components/tf-image-list'
import refreshList from '@/components/tf-refresh-list'
import UserInfo from '@/components/user-info/index.vue'
import morePopup from './morePopup'
import operation from './operation'
import { deleteComment, deleteArticle, addComplaint } from '@/api/neighbours'
import { mapGetters } from 'vuex'
import { Toast, ImagePreview } from 'vant'

export default {
  components: {
    tfImageList,
    refreshList,
    UserInfo,
    morePopup,
    operation
  },
  props: {
    data: {
      type: Array,
      defautl: () => []
    },
    article_type: {
      type: [Number, String],
      defautl: undefined
    },
    load: [Function]
  },
  data () {
    return {
      moreShow: false,
      list: this.data,
      active: {},
      activeIndex: undefined,
      status: true // 是否是本人发的帖
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    /* 操作 */
    onOperation (item, index) {
      this.moreShow = true
      this.status = item.is_mine
      this.active = item
      this.activeIndex = index
    },
    /* 删除帖子 */
    deleteArticle () {
      deleteArticle({
        id: this.active.id
      }).then(res => {
        this.list.splice(this.activeIndex, 1)
        Toast.success('删除成功')
        this.moreShow = false
      })
    },
    goDetails (articleType, { id, is_del }) {
      if (is_del == '1') {
        Toast('该贴已被删除')
        return
      }
      this.$router.push({
        path: '/pages/neighbours/details',
        query: {
          articleType,
          id
        }
      })
    },
    preview (src) {
      ImagePreview({
        images: [src]
      })
    },
    reload () {
      this.$refs.list.reload()
    }
  },
  watch: {
    data (value) {
      this.list = value
    },
    list (value) {
      this.$emit('update:data', value)
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
