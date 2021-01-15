<template>
  <refreshList
    class="building-list"
    :class="{ 'build-loading': load }"
    ref="list"
    :list.sync="list"
    :load="load"
    :immediate-check="false"
  >
    <template v-slot="{ item }">
      <div class="build-item" @click="jump(item)">
        <div class="build-left">
          <div class="build-name">{{ item.building_name }}</div>
          <div class="build-number">{{ item.count }}户</div>
        </div>
        <div class="build-right" :class="{'build-center': !item.w_icon || !item.e_icon}">
          <div v-if="item.w_icon" class="build-water" :class="{ active: item.w_icon == 1 }">
            <span class="tf-icon tf-icon-shuibiao"></span>
          </div>
          <div v-if="item.e_icon" class="build-electricity" :class="{ active: item.e_icon == 1 }">
            <span class="tf-icon tf-icon-dianbiao"></span>
          </div>
        </div>
      </div>
    </template>
  </refreshList>
</template>

<script>
import refreshList from '@/components/tf-refresh-list'
export default {
  components: {
    refreshList
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    load: Function
  },
  data () {
    return {
      list: this.data
    }
  },
  methods: {
    jump ({ building_id, building_name, project_month_id }) {
      this.$router.push({
        name: 'waterElectricitySelect',
        query: {
          id: building_id,
          monthId: project_month_id,
          name: building_name
        }
      })
    },
    reload () {
      this.$refs.list.reload()
    }
  },
  watch: {
    list (value) {
      this.$emit('update:data', value)
    },
    data (value) {
      this.list = value
    }
  }
}
</script>

<style lang="less" scoped>
.building-list {
  /deep/ .van-cell {
    width: 50%;
    margin-bottom: 20px;
    padding: 0 10px;
  }
  .build-item {
    display: flex;
    height: 142px;
    padding: 30px;
    background: #ffffff;
    border-radius: 10px;
    .build-left {
      flex: 1;
      width: 0;
      @flex-column();
      justify-content: space-between;
      .build-name {
        width: 100%;
        font-size: 28px;
        font-weight: 500;
        @text-ellipsis();
      }
      .build-number {
        font-size: 22px;
        color: #8f8f94;
      }
    }
    .build-right {
      @flex-column();
      justify-content: space-between;
      width: 36px;
      margin-left: 20px;
      .build-water,
      .build-electricity {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 36px;
        height: 36px;
        border-radius: 6px;
        background: #aaaaaa33;
        color: #aaa;
      }
      .build-water.active {
        background: #599eed33;
        color: #599eed;
      }
      .build-electricity.active {
        background: #ffb91533;
        color: #ffb915;
      }
    }
    .build-center {
      justify-content: center;
    }
  }
}
.building-list {
  height: calc(100% - 126px) !important;
}
.building-list:not(.build-loading) {
  /deep/ .van-list {
    width: calc(100% + 20px);
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
  }
}
/deep/ .tf-van-cell {
  float: left;
}
</style>
