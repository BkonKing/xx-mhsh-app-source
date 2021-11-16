<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="免费服务"
      :fixed="true"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="tf-body-container">
      <refreshList :list.sync="data" :load="getMyFreeServerList">
        <template v-slot="{ item }">
          <div class="tf-card">
            <div class="tf-card-header">
              <div class="tf-card-header__title">
                <div class="header-name">
                  {{ item.category
                  }}<span
                    class="status-tag"
                    :class="{
                      'status-tag-info': item.server_status === 1,
                      'status-tag-ing': [2, 3].includes(item.server_status)
                    }"
                    >{{ item.server_status_desc }}</span
                  >
                </div>
                <div class="header-time">
                  预约服务：<span>{{ item.ctime }}</span>
                </div>
                <template v-if="item.category_type == 1">
                  <div v-if="item.server_status == 2 || item.stime" class="header-time">
                    排队时间：<span v-if="item.server_status == 2" class="alert-text"
                      >第 {{ item.service_queue }} 位</span
                    ><span v-if="item.stime">{{ item.stime }}</span>
                  </div>
                  <div
                    v-if="item.server_status == 4 && item.etime"
                    class="header-time"
                  >
                    服务时间：<span>{{ item.etime }}</span>
                  </div>
                </template>
                <template v-else>
                  <div v-if="item.server_status == 3 && item.stime" class="header-time">
                    借用时间：<span>{{ item.stime }}</span>
                  </div>
                  <div v-if="item.status == 3 || item.status == 4" class="header-time">
                    归还时间：<span v-if="item.status == 3" class="alert-text"
                      >请于 {{ item.return_time }} 前归还</span
                    ><span v-if="item.status == 4 && item.etime">{{ item.etime }}</span>
                  </div>
                </template>
                <div v-if="item.server_status == 5" class="header-time">
                  取消时间：<span>{{ item.cancel_time }}</span>
                </div>
              </div>
              <div
                v-if="[1, 2, 3].includes(item.server_status)"
                class="tf-icon tf-icon-erweima"
                @click="showService(item)"
              ></div>
            </div>
            <div
              v-if="item.location || item.server_time"
              class="tf-card-content"
            >
              <span
                class="tf-icon"
                :class="[true ? 'tf-icon-shijian' : 'tf-icon-dingwei']"
              ></span
              ><span class="info-text"
                >{{ item.location }}（{{ item.server_time }}）</span
              >
            </div>
          </div>
        </template>
      </refreshList>
    </div>
    <service-pop
      v-model="popVisible"
      :data="activeServer"
      :id="activeServer.id"
    ></service-pop>
  </div>
</template>

<script>
import refreshList from '@/components/tf-refresh-list'
import ServicePop from './components/ServicePop'
import { getMyFreeServerList } from '@/api/butler.js'
import { mapGetters } from 'vuex'
export default {
  components: {
    refreshList,
    ServicePop
  },
  data () {
    return {
      data: [],
      popVisible: false,
      activeServer: {}
    }
  },
  computed: {
    ...mapGetters(['currentProject', 'userInfo']),
    projectId () {
      return this.currentProject.project_id
    }
  },
  created () {
    // this.getMyFreeServerList()
  },
  methods: {
    getMyFreeServerList ({ pages }) {
      const len = this.data.length
      return getMyFreeServerList({
        enter_project_id: this.projectId,
        server_id: (len && pages !== 1 && this.data[len - 1].server_id) || ''
      }).then(({ data }) => {
        return {
          data: data.list
        }
      })
    },
    // 点击服务显示二维码
    showService (item) {
      this.activeServer = item
      this.popVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.tf-body-container {
  padding-top: 10px;
}
.tf-card-header__title {
  width: 100%;
  font-size: 32px;
  font-weight: bold;
}
.header-name {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  line-height: 1;
  .status-tag {
    font-size: 24px;
    color: #8f8f94;
  }
  .status-tag-info {
    color: #00a0e9;
  }
  .status-tag-ing {
    color: #ff6555;
  }
}
.header-time {
  margin-top: 19px;
  font-size: 26px;
  font-weight: 500;
  line-height: 1;
  color: #8f8f94;
  span {
    color: #222222;
  }
}
.alert-success-text {
  color: #6bc572 !important;
}
.alert-info-text {
  color: #00a0e9 !important;
}
.alert-text {
  color: #ff6555 !important;
}
.tf-card-content {
  .tf-icon {
    margin-right: 10px;
    font-size: 28px;
    font-weight: bold;
    color: #000;
  }
  .info-text {
    font-size: 26px;
    color: #8f8f94;
  }
}
.tf-icon-erweima {
  position: absolute;
  top: 84px;
  right: 30px;
  font-size: 40px;
  line-height: 1;
}

.qr-box {
  padding: 0 70px;
}

.qr-img {
  width: 320px;
  height: 320px;
}

.qr-status-box {
  @flex-column();
  align-items: center;
  margin-bottom: 6px;
}

.qr-status {
  width: 320px;
  height: 66px;
  line-height: 66px;
  font-size: 30px;
  font-weight: 500;
  border-radius: 33px;
  color: #ff6555;
  background-color: #ff65551a;
  text-align: center;
}

.qr-triangle {
  .triangle-bottom(12px, 15px, #ff65551a);
}

.qr-alert {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  font-size: 26px;
  font-weight: 500;
  color: #8f8f94;
}
</style>
