<template>
  <div class="coupon-list">
    <refreshList ref="list" :list.sync="list" :load="getList">
      <template v-slot="{ item, index }">
        <!-- <coupon-item :data="item"></coupon-item> -->
        <coupon-item
          @publish="openPublish(item, index)"
          @revise="openRevise(item, index)"
          @delete="openDelete(item, index)"
          @finish="openFinish(item, index)"
        ></coupon-item>
      </template>
      <template v-slot:nodata>
        <div class="no-data-box">
          <img class="no-data-img" src="@/assets/neighbours/notask.png" />
          <div class="no-data-text">暂无内容</div>
        </div>
      </template>
    </refreshList>
    <date-picker
      v-model="dateVisible"
      ref="date-picker"
      title="发布优惠券"
      :auto-close="false"
      @dateSure="publish"
    >
      <van-field class="date-radio" name="radio" label="发布时间：">
        <template #input>
          <van-radio-group
            v-model="zzz"
            direction="horizontal"
            checked-color="#FF6555"
          >
            <van-radio name="1">立即发布</van-radio>
            <van-radio name="2">定时发布</van-radio>
          </van-radio-group>
        </template>
      </van-field>
    </date-picker>
    <tf-dialog-v3
      v-model="deleteVisible"
      content="确定删除优惠券吗？"
      confirmButtonText="删除"
      @confirm="deleteCoupon"
    ></tf-dialog-v3>
    <tf-dialog-v3
      v-model="finishVisible"
      title="确定结束优惠券吗？"
      content="结束后将停止领取该券，但已被领取的优惠券可继续使用"
      confirmButtonText="结束"
      @confirm="deleteCoupon"
    ></tf-dialog-v3>
  </div>
</template>

<script>
import refreshList from '@/components/tf-refresh-list'
import TfDialogV3 from '@/components/tf-dialog-v3'
import CouponItem from './CouponItem'
import DatePicker from './DatePicker'
import { getUserTaskList, reUserTask } from '@/api/task'
export default {
  components: {
    refreshList,
    TfDialogV3,
    CouponItem,
    DatePicker
  },
  data () {
    return {
      // 0已接单、1进行中、2已完成、3已淘汰、4已放弃、5已终止
      list: [],
      taskId: '',
      activeIndex: '',
      deleteVisible: false,
      finishVisible: false,
      dateVisible: false,
      zzz: '1'
    }
  },
  created () {},
  activated () {
    this.updateSingleData()
  },
  methods: {
    // 获取我的报事报修
    getList (params) {
      return getUserTaskList(params)
    },
    // 刷新单条数据
    updateSingleData () {
      if (this.activeIndex !== '' && this.taskId !== '') {
        reUserTask({
          user_task_id: this.taskId
        }).then(({ data }) => {
          this.$set(this.list, this.activeIndex, data)
        })
      }
    },
    reload () {
      this.$refs.list.reload()
    },
    openPublish (item, index) {
      this.zzz = '1'
      this.activeIndex = index
      this.dateVisible = true
    },
    publish (data) {
      const { startTime, endTime } = data
      console.log(startTime, endTime)
      this.dateVisible = false
      this.updateSingleData()
    },
    openRevise ({ task_id: id }, index) {
      this.activeIndex = index
      this.$router.push({
        name: 'shopCreateCoupon',
        query: {
          id
        }
      })
    },
    openDelete () {
      this.deleteVisible = true
    },
    deleteCoupon () {},
    openFinish () {
      this.finishVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.coupon-list {
  height: 100%;
}
.date-radio {
  padding: 30px 0 42px;
  background: #f7f7f7;
  /deep/ .van-radio__icon--checked + .van-radio__label {
    color: #000000;
  }
  /deep/ .van-icon {
    width: 36px;
    height: 36px;
    line-height: 1;
  }
  /deep/ .van-radio__icon {
    height: 36px;
  }
  /deep/ .van-radio__label {
    margin-left: 20px;
    color: #222;
    line-height: 1;
  }
  /deep/ .van-field__value .van-field__control {
    justify-content: flex-end;
  }
  /deep/ .van-radio--horizontal {
    margin-right: 30px;
    + .van-radio--horizontal {
      margin-left: 40px;
    }
  }
}
</style>
