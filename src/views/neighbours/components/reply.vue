<template>
  <div class="tf-bg-white reply-container" :class="{'gray': grayTheme}">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell class="reply-cell" v-for="cell in list" :key="cell.id">
        <userInfo :avatar="cell.avatar || ''" :name="cell.account" :time="cell.ctime" size="m">
          <template v-if="!grayTheme" v-slot:right>
            <span class="thumbsups-number">{{cell.thumbsups}}</span>
            <span class="tf-icon tf-icon-like"></span>
          </template>
        </userInfo>
        <div class="reply-cell-content">
          <div class="reply-cell-content__text">{{cell.content}}</div>
          <div v-if="cell.images && cell.images.length > 0" class="reply-cell-content__img-box">
            <img class="reply-cell-content__img" :src="cell.images[0]" />
          </div>
          <div class="reply-cell-content__reply">
            <div class="reply-cell-content__reply__text" v-for="item in cell.child" :key="item.id">
              <span style="color: #222;">{{item.name}}</span>：
              <span>
                {{item.content}}
                <span
                  class="tf-text-blue"
                  v-if="item.images"
                  @click="lookImg(item.images)"
                >
                  <span class="tf-icon tf-icon-image"></span>查看图片
                </span>
              </span>
            </div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { List, Cell, ImagePreview } from 'vant'
import UserInfo from '@/components/user-info/index.vue'

export default {
  props: {
    grayTheme: {
      type: Boolean,
      default: false
    }
  },
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [ImagePreview.name]: ImagePreview,
    UserInfo
  },
  data () {
    return {
      list: [
        {
          id: '1',
          content:
            '在宏观调控不断深入与加强的背景下，房地产行业已经从过去的资源竞争，进入到产品竞争的阶段。对于房企而言，形成产品标准化管理体系，是快速提升房地产企业管理水平的有效捷径。',
          images: [
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'
          ],
          thumbsups: '5',
          child: [
            {
              id: '2',
              content:
                '在宏观调控不断深入与加强的背景下，房地产行业已经从过去的资源竞争，进入到产品竞争的阶段。对于房企而言，形成产品标准化管理体系，是快速提升房地产企业管理水平的有效捷径。',
              images: [
                'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
                'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'
              ],
              thumbsups: '5',
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
              thumbsups: '5',
              ctime: '2020-06-03 16:35:26'
            }
          ],
          ctime: '2020-06-03 16:35:26'
        }
      ],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 20000)
    },
    lookImg (images) {
      ImagePreview({
        images,
        closeable: true
      })
    }
  }
}
</script>

<style lang="less" scoped>
.reply-container {
  padding: 0 30px;
  .thumbsups-number {
    font-size: 24px;
    color: @gray-7;
  }
  .tf-icon-like {
    font-size: 36px;
    margin-left: 10px;
  }
  .reply-cell {
    padding: 30px 0;
    .reply-cell-content {
      padding-bottom: 30px;
      margin-left: 84px;
      margin-top: 30px;
      border-bottom: 1px solid @divider-color;
      &__text {
        margin-top: 30px;
        font-size: 26px;
        line-height: 1.8;
      }
      &__img-box {
        margin-top: 30px;
      }
      &__img {
        width: 203px;
        height: 203px;
      }
      &__reply {
        margin-top: 30px;
        padding: 30px 20px 20px;
        background: @background-color;
        &__text {
          font-size: 24px;
          color: #666;
          margin-bottom: 10px;
          line-height: 1.8;
        }
      }
    }
  }
}
.gray {
  background: @background-color;
  padding: 20px;
  .reply-cell {
    padding: 30px 20px;
    margin-bottom: 30px;
    border-radius:10px;
    .reply-cell-content {
      padding-bottom: 0;
      border-bottom: none;
    }
  }
}
</style>
