<template>
  <van-nav-bar class="tf-nav-bar" placeholder>
    <template #left>
      <div class="tf-row-vertical-center room_btn" @click="goAttestation">
        <span class="tf-icon tf-icon-dingwei"></span>
        <span class="tf-text" :class="{ underline: !attestationType }">{{
          attestationType || "游客 - 美好生活家园"
        }}</span>
      </div>
    </template>
    <template #right>
      <span
        v-if="search"
        class="tf-icon tf-icon-sousuo"
        @click="onSearch"
      ></span>
      <span class="tf-icon tf-icon-saoyisao" @click="scan"></span>
      <span class="tf-icon tf-icon-xiaoxi" @click="goMessage">
        <span v-if="userInfo.message_mum != 0" class="van-info">{{
          userInfo.message_mum
        }}</span>
      </span>
    </template>
  </van-nav-bar>
</template>

<script>
import { NavBar } from 'vant'
import { mapGetters } from 'vuex'
export default {
  components: {
    [NavBar.name]: NavBar
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    search: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['currentProject', 'userInfo']),
    attestationType () {
      const currentProject = this.currentProject
      const {
        enter_project_id: enterProjectId,
        enter_project_name: enterProjectName,
        bsbx_allots: bsbxAllots,
        project_name: projectName,
        id_type: idType
      } = this.userInfo
      if (currentProject) {
        return `${currentProject.project_name}${currentProject.fc_info}` // 已认证
      } else if (+enterProjectId) {
        if (+idType === 1) {
          return `未认证 - ${enterProjectName}` // 游客未认证业主
        } else if (+idType === 2) {
          return `游客 - ${enterProjectName}` // 游客定位
        } else {
          return ''
        }
      } else if (bsbxAllots === '1' && projectName) {
        return projectName // 有报事报修的服务人员
      }
      return ''
    }
  },
  methods: {
    goMessage () {
      this.$router.push('/pages/personage/message/index')
    },
    // 跳转房屋认证
    goAttestation () {
      const url = this.currentProject
        ? '/pages/personage/house/select-house'
        : '/pages/personage/house/attestation?type=1&mode=0&select=1'
      this.$router.push(url)
      if (!this.currentProject || this.currentProject.length === 0) {
        this.mtjEvent({
          eventId: 23
        })
      }
    },
    scan () {
      this.$router.push('/pages/personage/scanCode/index')
    },
    onSearch () {
      this.$router.push('/store/search')
    }
  }
}
</script>

<style lang="less" scoped>
.bulter-nav-bar /deep/ .van-nav-bar__left {
  max-width: calc(100% - 210px);
}
/deep/ .van-nav-bar__left {
  max-width: calc(100% - 305px);
  .room_btn {
    width: 100%;
  }
  .tf-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.tf-nav-bar {
  background: none;
  &:after {
    border: none;
  }
}
.tf-icon {
  font-size: 44px;
  color: #fff;
}

.tf-icon-dingwei {
  margin-right: 5px;
}

.tf-text {
  color: #fff;
}

.tf-icon-xiaoxi {
  position: relative;
}

/deep/ .van-nav-bar__right {
  padding-right: 0;
}

.van-info {
  background: #fff;
  color: @red-dark;
  top: 24px;
  right: 22px;
}

.underline {
  text-decoration: underline;
}
</style>
