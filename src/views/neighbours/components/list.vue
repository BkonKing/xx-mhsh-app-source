<template>
  <div style="height: 100%;">
    <refreshList ref="list" :list.sync="list" :load="load">
      <template v-slot="{ item, index }">
        <div class="article-cell">
          <div @click="goDetails(item.article_type, item)">
          <!-- 活动 -->
          <template v-if="item.article_type == 2">
            <img
              class="article-image"
              v-imageCach="item.thumbnail"
              :src="item.thumbnail"
            />
            <div class="article-tag activity-tag">活动</div>
            <div class="article-title">{{ item.title }}</div>
            <div class="article-time">
              <span>{{ item.ctime }}</span>
              <div v-if="item.joins != '0'" class="article-join">
                {{ item.joins || 0 }}人已报名
              </div>
            </div>
          </template>
          <!-- 帖子 -->
          <template v-else-if="item.article_type == 3">
            <div class="tf-card">
              <div class="tf-card-header">
                <userInfo
                  :ellipsis="true"
                  :avatar="item.avatar"
                  :name="item.nickname"
                  :time="item.ctime"
                >
                  <template v-slot:right>
                    <div class="group-tag">{{ item.category }}</div>
                  </template>
                </userInfo>
              </div>
              <div
                v-if="item.content"
                class="tf-card-content text-multiple-ellipsis-3"
              >
                {{ item.content }}
              </div>
              <template v-if="item.images">
                <img
                  class="tf-mt-base"
                  width="33%"
                  :src="item.images[0]"
                  v-if="item.images.length === 1"
                  v-imageCach="item.images[0]"
                  @click.stop="preview(item.images[0])"
                />
                <tf-image-list
                  class="tf-mt-base"
                  mode="shadeShow"
                  v-else-if="item.images.length > 1"
                  :data="item.images"
                ></tf-image-list>
              </template>
            </div>
          </template>
          <!-- 资讯 -->
          <template v-else-if="item.article_type == 1">
            <img
              class="article-image"
              :src="item.thumbnail"
              v-imageCach="item.thumbnail"
            />
            <div class="article-tag">资讯</div>
            <div class="article-title">{{ item.title }}</div>
          </template>
          </div>
          <operation
            :item="item"
            :article-type="item.article_type"
            :key="item.id"
            @delete="list.splice(index, 1)"
          >
          </operation>
        </div>
      </template>
    </refreshList>
  </div>
</template>

<script>
import tfImageList from '@/components/tf-image-list'
import refreshList from '@/components/tf-refresh-list'
import UserInfo from '@/components/user-info/index.vue'
import operation from './operation'
import { mapGetters } from 'vuex'
import { imagePreview } from '@/utils/util'

export default {
  components: {
    tfImageList,
    refreshList,
    UserInfo,
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
      list: this.data
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    goDetails (articleType, { id, is_del }) {
      if (is_del == '1') {
        this.$toast('该贴已被删除')
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
      imagePreview({
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
/deep/ .tf-list-refresh {
  padding: 30px 20px;
  .tf-van-cell {
    margin-bottom: 30px;
  }
}
// 资讯/活动
.article-cell {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #fff;
  border-radius: 10px;
  // 文章图片
  .article-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 10px 10px 0px 0px;
  }
  .article-tag {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 30px;
    right: 30px;
    width: 120px;
    height: 44px;
    font-size: 24px;
    color: #fff;
    border-radius: 4px;
    background-color: #ff5240cc;
  }
  .activity-tag {
    // width: 100px;
    // height: 40px;
    background-color: #febf00cc;
  }
  // 文章标题
  .article-title {
    margin-top: 24px;
    padding: 0 30px;
    font-size: 32px;
    font-weight: 600;
    color: #000;
    @text-ellipsis();
  }
  .article-time {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    margin-top: 26px;
    font-size: 24px;
    color: #aaaaaa;
  }
  .article-join {
    font-size: 24px;
    color: #ff6555;
  }
}
// 帖子
.tf-card-header {
  border-bottom: none;
  padding-bottom: 0;
  /deep/ .tf-avatar {
    width: 80px;
    height: 80px;
  }
  /deep/ .user-info--name {
    font-size: 28px;
    line-height: 1;
    color: #000;
  }
  /deep/ .user-info-time {
    color: #aaa;
  }
}
.tf-card-content {
  color: #333;
}
.group-tag {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  padding: 0 14px;
  text-align: center;
  font-size: 24px;
  color: #FF6555;
  background: #FFEDEB;
  border-radius: 4px;
}
.text-multiple-ellipsis-3 {
  padding: 0;
  margin: 30px 0;
  .text-multiple-ellipsis(3);
}

.ios-share /deep/ .mask-block {
  bottom: 98px;
}
</style>
