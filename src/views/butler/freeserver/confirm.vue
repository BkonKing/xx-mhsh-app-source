<template>
  <div class="shade">
    <van-nav-bar
      class="invite-nav-bar"
      title="请确认服务信息"
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />
    <div class="invite-box">
      <div class="share-box">
        <div class="tf-bg">
          <div class="tf-text-grey">服务项目：{{info.server_category}}</div>
          <div class="tf-text-grey">申请：{{info.server_type}}{{info | serverInfo}}</div>
        </div>
        <div class="pd20">
          <div class="tf-text-grey">申请人：{{info.realname}}</div>
          <div class="tf-text-grey">手机号：{{info.mobile}}</div>
          <div class="tf-text-grey">房屋：{{info.fc_info}}</div>
        </div>
      </div>
      <button class="share-btn" @click="confirm">确认</button>
    </div>
  </div>
</template>

<script>
import { NavBar, Toast, Dialog } from 'vant'
import tfDialog from '@/components/tf-dialog/index.vue'
import { serverYuyue, serverClose } from '@/api/butler'
import { mapGetters } from 'vuex'
export default {
  components: {
    [NavBar.name]: NavBar,
    tfDialog
  },
  data () {
    return {
      info: {},
      code_id: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    const { info, code_id } = this.$route.query
    this.info = JSON.parse(info)
    this.codeId = code_id
  },
  methods: {
    confirm () {
      if (this.info.code_type == 1 || this.info.code_type == 3) {
        this.serverYuyue()
      } else {
        this.serverClose()
      }
    },
    /* 确认用户预约 */
    serverYuyue () {
      serverYuyue({
        code_id: this.info.code_id,
        uid: this.info.uid,
        project_id: this.userInfo.xm_project_id,
        category_id: this.info.category_id
      }).then((res) => {
        Dialog.alert({
          title: res.message
        }).then(() => {
          this.$router.go(-1)
        })
      })
    },
    /* 服务预约结束 */
    serverClose () {
      serverClose({
        code_id: this.info.code_id,
        uid: this.info.uid,
        project_id: this.info.project_id,
        server_id: this.info.server_id
      }).then((res) => {
        Dialog.alert({
          title: res.message || '服务结束'
        }).then(() => {
          this.$router.go(-1)
        })
      })
    }
  },
  filters: {
    serverText (value) {
      const text = {
        1: '借用',
        2: '归还',
        3: '排队',
        4: '享受服务'
      }
      return text[value]
    },
    serverInfo (value) {
      switch (value.code_type) {
        case '1':
          return `（可借${value.duration}）`
        case '2':
          return value.yj_time ? `（${value.yj_time}）` : ''
        case '3':
          return `（预计第${parseInt(value.pd_num) + 1}位）`
        case '4':
          return value.pd_time ? `（${value.pd_time}）` : ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.shade {
  width: 100%;
  height: 100%;
  background-color: #1b1b1b;
}

.invite-box {
  @flex-column();
  align-items: center;
}

.share-box {
  position: relative;
  width: 620px;
  margin: 80px 65px;
  padding: 30px;
  background-color: #fff;
  box-shadow: 0 0 6px #f1c7c5;
  // border:6px solid rgba(235, 88, 65, 0.3);
}

.share-btn {
  border: none;
  color: #fff;
  width: 620px;
  height: 88px;
  font-size: 30px;
  background-image: linear-gradient(to right, @red, @red-dark);
  border-radius: 10px;
}

.tf-bg {
  padding: 20px;
}

.tf-text-grey {
  font-size: 30px;
  margin-bottom: 10px;
}

.invite-nav-bar {
  background-color: #1b1b1b;
  /deep/ .van-icon {
    color: #fff;
  }
  /deep/ .van-nav-bar__title {
    color: #fff;
  }
}
.pd20 {
  padding: 20px;
}
</style>
