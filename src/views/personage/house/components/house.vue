<template>
  <div class="house-container tf-flex-column">
    <div class="tf-item-auto">
      <div
        v-for="(item, i) in houseList"
        :key="i"
        class="house-box"
        :class="{
          'house-owner': i === 0 && mode !== 2,
          'house-select': mode === 2 && selectId === item.house_id
        }"
        @click="handlechange(item, i)"
      >
        <div v-if="i === 0 && mode !== 2" class="tf-row-center">
          <div class="house-owner-current">当前房产</div>
        </div>
        <div class="tf-row-space-between">
          <div class="tf-row">
            <div class="house-user house-user--relation">
              {{ houseRoleText[item.house_role] }}
            </div>
            <div class="tf-space-around tf-flex-item">
              <div class="house-name">{{ item.project_name }}</div>
              <div class="house-address">{{ item.fc_info }}</div>
            </div>
          </div>
          <div
            v-if="mode && item.members && item.house_role == 1"
            class="tf-row-vertical-center house-people-box"
            @click.stop="manClick(item)"
          >
            <div class="tf-icon tf-icon-renshu"></div>
            <div class="house-people-number">{{ item.members }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="addStatus" class="btn-placeholder">
      <button class="tf-btn tf-btn-primary" type="warn" @click="goAttestation">
        新增房产
      </button>
    </div>
  </div>
</template>

<script>
import { bindingDefault, bindingHouse } from '@/api/personage'
export default {
  name: 'houseContainer',
  props: {
    // 2:选择房屋，不显示当前房屋，显示选中房屋  1:选择房屋，显示当前房屋 0：显示房屋信息，设置当前房屋
    mode: {
      type: Number,
      default: 1
    },
    // 是否过滤门禁房屋
    entranceStatus: {
      type: Boolean,
      default: false
    },
    addStatus: {
      type: Boolean,
      default: true
    },
    selectId: {
      type: [String, Number],
      default: ''
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
    // 获取房产信息
    bindingHouse () {
      bindingHouse().then(res => {
        this.houseList = res.data || []
        if (this.entranceStatus) {
          this.houseList = this.houseList.filter(obj => {
            return obj.is_menjin
          })
        }
      })
    },
    // 新增房产
    goAttestation () {
      this.$router.push({
        path: '/pages/personage/house/attestation',
        query: {
          type: 1,
          mode: 0
        }
      })
    },
    // 房屋点击切换
    handlechange (item, index) {
      const { binding_id: bindingId } = item
      // mode=1选择房屋触发change事件，mode=0设置当前房屋
      if (this.mode) {
        this.$emit('change', bindingId, item)
      } else {
        this.bindingDefault(bindingId, index)
      }
    },
    // 设置当前房屋
    bindingDefault (bindingId, index) {
      bindingDefault({
        binding_id: bindingId
      }).then(() => {
        const current = this.houseList.splice(index, 1)
        this.houseList.unshift(...current)
        this.$store.commit('setCurrentProject', ...current)
        this.$store.commit('clearKeepAlive')
        this.$store.dispatch('getMyAccount')
        this.$router.go(-1)
        this.mtjEvent({
          eventId: 73
        })
      })
    },
    // 右边人员模块点击
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
  border: 3px solid @red-dark;
  padding-top: 0 !important;
}

.house-owner-current {
  position: relative;
  width: 194px;
  height: 40px;
  line-height: 40px;
  background: url("~@/assets/imgs/current-house-tag.png");
  background-size: cover;
  font-size: 20px;
  color: #fff;
  text-align: center;
  margin-bottom: @padding-md;
}

.house-select {
  border: 3px solid @red-dark;
}

.house-user {
  @flex();
  justify-content: center;
  align-items: center;
  width: 88px;
  padding: 0 12px;
  height: 88px;
  margin-right: @padding-md;
  color: #fff;
  font-size: 24px;
  text-align: center;
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
  border-left: 2px dashed #aaa;
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
.tf-space-around {
  padding-right: 10px;
}
</style>
