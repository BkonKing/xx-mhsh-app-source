<template>
  <div style="width:100%;height:100%;">
    <refreshList :list.sync="list" :load="load" finished-text>
      <template v-slot="{ item }">
        <div class="tf-list-content tf-mb-base tf-center">{{ item.ctime }}</div>
        <div class="tf-list" @click="jump(item)">
          <!-- 商品交易 -->
          <img
            v-if="type == 'transaction' && parseInt(item.sub_type) < 6"
            class="tf-list-image"
            :src="item.thumb"
          />
          <!-- 工作 -->
          <div
            v-else-if="type == 'work'"
            class="list-icon-box tf-icon"
            :class="item.repairs_status | repairIcon"
          ></div>
          <div v-else-if="type === 'system' && [27, 28].includes(+item.sub_type)" class="list-icon-box audit-icon">
            <img v-if="+item.sub_type === 27" class="pass-icon" src="@/assets/personage/pass.png" alt="">
            <img v-else class="un-pass-icon" src="@/assets/personage/unPass.png" alt="">
          </div>
          <div
            v-else-if="type !== 'system'"
            class="list-icon-box tf-icon"
            :class="item.sub_type | iconClass(item.title)"
          ></div>
          <!-- 右边内容 -->
          <div class="tf-space-around">
            <div
              class="tf-row-vertical-center"
              :class="{ 'tf-mb-base': type === 'system' }"
            >
              <div
                class="tf-list-title"
                :class="{ 'tf-read-after-tag': item.status }"
              >
                {{ item.title }}
              </div>
              <div
                v-if="item.is_read == '0'"
                class="tf-circle-tag--warning"
              ></div>
            </div>
            <div
              class="tf-list-content"
              :class="{ 'system-content': type == 'transaction' }"
            >
              {{ item.content }}
            </div>
          </div>
        </div>
      </template>
      <template v-slot:nodata>
        <div class="empty-session">
          <img
            class="empty-session__img"
            src="@/assets/imgs/message_xiaoxi.png"
          />
          <div class="empty-session__text">暂无消息</div>
        </div>
      </template>
    </refreshList>
    <van-popup class="more-dialog" v-model="moreShowChild">
      <div v-if="isRead == '0'" class="more-btn" @click="mark">标记已读</div>
      <div class="more-btn tf-text-primary">删除</div>
    </van-popup>
  </div>
</template>

<script>
import { Popup } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import longtap from '@/directive/tap/index.js'
export default {
  components: {
    refreshList,
    [Popup.name]: Popup
  },
  props: {
    type: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      default: () => []
    },
    load: {
      type: Function
    }
  },
  directives: {
    longtap
  },
  data () {
    return {
      list: this.data,
      active: null,
      moreShowChild: false,
      isRead: '1' // 是否已读，判断是否需要显示标记已读
    }
  },
  methods: {
    operate (item) {
      this.isRead = item.is_read
      this.active = item
      this.moreShowChild = true
    },
    jump (item) {
      this.$emit('click', item)
    },
    readAll () {
      this.list.forEach(obj => {
        obj.is_read = '1'
      })
    },
    mark () {
      this.$emit('mark', this.active)
    }
  },
  watch: {
    list (value) {
      this.$emit('update:data', value)
    },
    data (value) {
      this.list = value
    }
  },
  filters: {
    // 1=交易退款成功、2=订单已发货、3=限时闪购活动开始提醒、4换货寄出提醒、5=退货寄出提醒、6=幸福币使用、7=幸福币获得、8=系统通知、9=意见反馈、10=我收到的赞、11=我发布的文章收到的评论、12=我评论的内容收到回复、13=公告通知、14=归还通知、15=投诉表扬、16=报事报修、17=活动报名通知、18=活动开始通知
    iconClass (value, title) {
      if (value === '23' || value === '24') {
        const icon = {
          任务已发布: 'tf-icon-renwufabu', // 任务已发布
          任务审核通过: 'tf-icon-renwufabu', // 任务审核通过
          任务已超时: 'tf-icon-renwuchaoshi', // 任务已超时
          任务已交付: 'tf-icon-yijiaofu', // 任务已交付
          任务投诉: 'tf-icon-renwutousu', // 任务投诉
          任务已失效: 'tf-icon-renwushixiao', // 任务已失效
          任务审核失败: 'tf-icon-renwushenhe', // 任务审核失败
          任务已接单: 'tf-icon-yijiedan', // 任务已接单
          任务未完成: 'tf-icon-weiwancheng', // 任务未完成
          任务已完成: 'tf-icon-yiwancheng', // 任务已完成
          任务已淘汰: 'tf-icon-yitaotai', // 任务已淘汰
          任务已放弃: 'tf-icon-yifangqi', // 任务已放弃
          任务提问: 'tf-icon-renwutiwen', // 任务提问
          任务已终止: 'tf-icon-yizhongzhi', // 任务已终止
          任务已延期: 'tf-icon-renwuyanqi', // 任务已延期
          任务已评价: 'tf-icon-renwupingjia', // 任务已评价
          任务已暂停: 'tf-icon-renwuzanting' // 任务已暂停
        }
        return icon[title]
      }
      const icon = {
        6: 'tf-icon-xingfubi1 xingfubi1-use',
        7: 'tf-icon-xingfubi1',
        13: 'tf-icon-gonggao1',
        14: 'tf-icon-guihuan',
        15: 'tf-icon-biaoyangtousu',
        16: 'tf-icon-baoshibaoxiu',
        17: 'tf-icon-huodongbaoming',
        18: 'tf-icon-huodongkaishi',
        19: 'tf-icon-lifepaymessage',
        20: 'tf-icon-lifepaymessage',
        22: 'tf-icon-lifepaymessage',
        25: 'tf-icon-renwutiwen', // 任务提问
        26: 'tf-icon-xingfubi1'
      }
      return icon[value]
    },
    repairIcon (value) {
      const icon = {
        1: 'tf-icon-daichuli',
        2: 'tf-icon-daifenpai',
        3: 'tf-icon-daijiean',
        4: 'tf-icon-yijiean',
        5: 'tf-icon-baoshibaoxiu'
      }
      return icon[value]
    }
  }
}
</script>

<style lang="less" scoped>
.list-icon-box {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  line-height: 80px;
  border-radius: 10px;
  font-size: 44px;
  color: #fff;
  text-align: center;
  margin-right: 20px;
}
.tf-space-around {
  flex: 1;
  width: 0;
}
.tf-list-title,
.tf-list-content {
  width: 100%;
  line-height: 1;
  @text-ellipsis();
}
.tf-circle-tag--warning {
  width: 14px;
  height: 14px;
  margin-left: 8px;
}
.system-content {
  line-height: 1.4;
  white-space: initial;
}
/* 更多弹窗 */
.more-dialog {
  width: 500px;
  padding: 0 30px;
  border-radius: 10px;
  .more-btn {
    height: 120px;
    line-height: 120px;
    text-align: center;
    font-size: 30px;
  }
  .more-btn + .more-btn {
    border-top: 1px solid @divider-color;
  }
}
.empty-session {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px;
  &__img {
    width: 483px;
    height: 335px;
  }
  &__text {
    font-size: 28px;
    text-align: center;
    line-height: 96px;
    color: #222;
  }
}
.tf-circle-tag--warning {
  width: 14px;
  height: 14px;
  margin-left: 8px;
}
.tf-icon-daichuli,
.tf-icon-gonggao1,
.tf-icon-huodongbaoming,
.tf-icon-xingfubi1,
.tf-icon-yijiedan,
.tf-icon-weiwancheng,
.tf-icon-yiwancheng,
.tf-icon-renwuyanqi,
.tf-icon-renwupingjia,
.tf-icon-renwuzanting,
.tf-icon-renwufabu,
.tf-icon-yijiaofu,
.tf-icon-renwushixiao {
  background: #ffa110;
}
.tf-icon-daifenpai,
.tf-icon-baoshibaoxiu {
  background: #5c76d8;
}
.tf-icon-yijiean,
.tf-icon-biaoyangtousu {
  background: #4bb192;
}
.tf-icon-daijiean,
.tf-icon-tf-icon-guihuan,
.tf-icon-huodongkaishi,
.audit-icon {
  background: #fd7d6f;
}
.tf-icon-lifepaymessage {
  font-size: 44px;
  background: #ff6551;
}
.xingfubi1-use,
.tf-icon-yitaotai,
.tf-icon-yizhongzhi,
.tf-icon-renwuchaoshi,
.tf-icon-renwushenhe,
.tf-icon-renwutousu {
  background: #ff6555;
}
.tf-icon-yifangqi {
  background: #CCCCCC;
}
.tf-icon-renwutiwen {
background: #00A0E9;
}
.tf-list-image {
  object-fit: cover;
}
.audit-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  .pass-icon {
    width: 38px;
  }
  .un-pass-icon {
    width: 45px;
  }
}
</style>
