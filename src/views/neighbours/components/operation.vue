<template>
  <div class="activity-footer">
    <div
      class="tf-icon tf-icon-zan"
      :class="{'like-active': item.is_thumbsup}"
      @click.stop="thumbsUp(item)"
    >
      <span class="tf-text-sm">{{item.thumbsups | numberText}}</span>
    </div>
    <div class="tf-icon tf-icon-pinglun" @click.stop="goDetails">
      <span class="tf-text-sm">{{item.comments | numberText}}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { thumbsUp } from '@/api/neighbours'
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    articleType: {
      default: ''
    }
  },
  data () {
    return {
      status: true // 是否是本人发的帖
    }
  },
  methods: {
    thumbsUp (item) {
      // 判断是否点过赞，点过赞无法取消
      if (item.is_thumbsup) {
        return
      }
      thumbsUp({
        id: item.id,
        t_type: 1
      }).then((res) => {
        // 点赞图标点亮
        item.thumbsups++
        item.is_thumbsup = 1
      })
    },
    goDetails () {
      this.$router.push({
        path: '/pages/neighbours/details',
        query: {
          articleType: this.articleType,
          id: this.item.id
        }
      })
    }
  },
  filters: {
    numberText (value) {
      let text = ''
      if (value < 10000 && value > 0) {
        text = value
      } else if (value >= 10000) {
        text = `${Math.floor(value / 10000)}万+`
      }
      return text
    }
  }
}
</script>

<style lang="less" scoped>
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
.like-active::before {
  color: @orange-dark;
}
</style>
