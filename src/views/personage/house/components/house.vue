<template>
  <div class="house-container tf-flex-column">
    <div class="tf-item-auto">
      <div
        v-for="(item, i) in houseList"
        :key="i"
        class="house-box"
        :class="{'house-owner': i === 0}"
        @click="change(item.binding_id, i)"
      >
        <div v-if="i === 0" class="tf-row-center">
          <div class="house-owner-current">当前房产</div>
        </div>
        <div class="tf-row-space-between">
          <div class="tf-row">
            <div class="house-user house-user--relation">{{houseRoleText[item.house_role]}}</div>
            <div class="tf-space-around">
              <div class="house-name">{{item.project_name}}</div>
              <div class="house-address">{{item.fc_info}}</div>
            </div>
          </div>
          <div
            v-if="mode && item.members && item.house_role == 1"
            class="tf-row-vertical-center house-people-box"
            @click.stop="manClick(item)"
          >
            <div class="tf-icon tf-icon-renshu"></div>
            <div class="house-people-number">{{item.members}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-placeholder">
      <button class="tf-btn tf-btn-primary" type="warn" @click="goAttestation">新增房产</button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { bindingDefault, bindingHouse } from '@/api/personage'
export default {
  name: 'houseContainer',
  props: {
    // 1:选择房屋 0：房屋信息
    mode: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      houseList: [],
      houseRoleText: {
        1: '业主',
        2: '业主成员',
        3: '租户',
        4: '租户成员'
      }
    }
  },
  created () {
    this.bindingHouse()
  },
  methods: {
    /* 获取房产信息 */
    bindingHouse () {
      bindingHouse().then((res) => {
        this.houseList = res.data || []
      })
    },
    goAttestation () {
      this.$router.push({
        path: '/pages/personage/house/attestation',
        query: {
          type: 1,
          mode: 0
        }
      })
    },
    change (bindingId, index) {
      if (this.mode) {
        this.$emit('change', bindingId)
      } else {
        this.bindingDefault(bindingId, index)
      }
    },
    /* 设置当前 */
    bindingDefault (bindingId, index) {
      bindingDefault({
        binding_id: bindingId
      }).then((res) => {
        // Toast.success('设置成功')
        const current = this.houseList.splice(index, 1)
        this.houseList.unshift(...current)
        this.$store.commit('setCurrentProject', ...current)
        this.$store.dispatch('getMyAccount')
        this.$router.go(-1)
      })
    },
    manClick (item) {
      this.$emit('manClick', item)
    },
    reload () {
      this.bindingHouse()
    }
  }
}
</script>

<style lang="less" scoped>
.house-container {
  width: 100%;
  height: 100%;
}

.btn-placeholder {
  margin-bottom: env(safe-area-inset-bottom);
  margin-bottom: constant(safe-area-inset-bottom);
}

.house-owner {
  border-width: 3px;
  border-style: solid;
  border-color: @red-dark;
  padding-top: 0 !important;
}

.house-owner-current {
  position: relative;
  width: 194px;
  height: 40px;
  line-height: 40px;
  background: @red-dark;
  font-size: 20px;
  color: #fff;
  text-align: center;
  margin-bottom: @padding-md;
}

.house-user {
  @flex();
  width: 88px;
  padding: 0 20px;
  height: 88px;
  text-align: center;
  align-items: center;
  color: #fff;
  font-size: 24px;
  margin-right: @padding-md;
}

.house-user--owner {
  background-image: linear-gradient(to top left, #eb5841, #f9866b);
}

.house-user--relation {
  background-image: linear-gradient(to top left, #ffc017, #ffa110);
}

.house-user--tenant {
  background-image: linear-gradient(to top left, #45d5da, #31b4b9);
}

.house-name {
  font-size: 30px;
  color: @text-color;
}

.house-address {
  font-size: 30px;
  color: @gray-7;
}

.house-box {
  background-color: #fff;
  border-radius: 8px;
  padding: 40px 30px;
  margin-bottom: @padding-lg;
}
.house-people-box {
  padding: 0 40px;
  border-left-width: 1px;
  border-left-style: dashed;
  border-left-color: #aaa;
}
.house-people-number {
  font-size: 30px;
  color: #383838;
  margin-left: 20px;
}
.tf-btn {
  width: 710px;
}
.tf-icon-renshu {
  font-size: 36px;
}
</style>
