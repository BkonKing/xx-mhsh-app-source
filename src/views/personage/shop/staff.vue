<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="店员管理"
      :fixed="true"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="tf-body-container">
      <refreshList :list.sync="list" :load="getStaffList">
        <template v-slot="{ item, index }">
          <div class="staff-item flex-row justify-between">
            <div class="flex-col">
              <div class="staff-userInfo flex-row">
                <div v-if="+item.is_shopkeeper" class="shop-user-tag">
                  店主
                </div>
                <span class="staff-userInfo-text">{{item.clerk_name}}</span>
                <span class="staff-userInfo-text">{{item.mobile}}</span>
              </div>
              <span class="staff-userInfo-1">{{item.clerk_power_text}}</span>
            </div>
            <div v-if="!+item.is_shopkeeper" class="flex-row align-center">
              <img
                class="staff-icon"
                src="@/assets/personage/shop/staff-delete.png"
                @click="handleDel(item, index)"
              />
              <img class="staff-icon" src="@/assets/personage/shop/staff-edit.png" @click="handleEdit(item, index)" />
            </div>
          </div>
        </template>
      </refreshList>
      <div class="publish-btn" @click="handleAdd">
        <img class="publish-img" src="@/assets/neighbours/publish.png" />
      </div>
    </div>
    <staff-popup v-model="staffVisible" :shopId="shopId" :data="activeStaff"></staff-popup>
  </div>
</template>

<script>
import refreshList from '@/components/tf-refresh-list'
import StaffPopup from './components/StaffPopup'
import { getStaffList, delShopStaff } from '@/api/personage/shop'
export default {
  components: {
    refreshList,
    StaffPopup
  },
  data () {
    return {
      list: [],
      staffVisible: false,
      shopId: '',
      activeStaff: {}
    }
  },
  created () {
    this.shopId = this.$route.query.shopId
  },
  methods: {
    getStaffList (params) {
      return getStaffList({
        page: params.pages,
        shops_id: this.shopId
      })
    },
    handleAdd () {
      this.activeStaff = null
      this.staffVisible = true
    },
    handleEdit (data) {
      this.activeStaff = data
      this.staffVisible = true
    },
    async handleDel ({ id }, index) {
      const { success } = await delShopStaff({
        shops_clerk_id: id,
        shops_id: this.shopId
      })
      if (success) {
        this.$toast('删除成功')
        this.list.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.flex-col {
  display: flex;
  flex-direction: column;
}
.flex-row {
  display: flex;
  flex-direction: row;
}

.justify-between {
  display: flex;
  justify-content: space-between;
}
.align-center {
  display: flex;
  align-items: center;
}
/deep/ .tf-list-refresh {
  padding: 30px 20px;
}
.staff-item {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  height: 150px;
  width: 710px;
  padding: 36px 30px 30px 30px;
  margin-bottom: 10px;
  .staff-userInfo {
    width: 100%;
    height: 36px;
    .shop-user-tag {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 64px;
      height: 36px;
      margin-right: 20px;
      background: #00a0e9;
      border-radius: 4px;
      font-size: 24px;
      font-weight: bold;
      color: #ffffff;
    }
    .staff-userInfo-text {
      display: block;
      color: #222222;
      font-size: 28px;
      line-height: 28px;
      margin-top: 6px;
      + .staff-userInfo-text {
        margin-left: 32px;
      }
    }
  }
  .staff-userInfo-1 {
    display: block;
    width: 100%;
    height: 26px;
    color: rgba(143, 143, 148, 1);
    font-size: 26px;
    line-height: 26px;
    margin-top: 13px;
  }
  .staff-icon {
    width: 48px;
    height: 48px;
    + .staff-icon {
      margin-left: 30px;
    }
  }
}
.publish-btn {
  position: fixed;
  right: 21px;
  bottom: 41px;
  width: 108px;
  height: 108px;
  margin-bottom: env(safe-area-inset-bottom);
  margin-bottom: constant(safe-area-inset-bottom);
  .publish-img {
    width: 100%;
    height: 100%;
  }
}
</style>
