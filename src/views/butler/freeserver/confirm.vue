<template>
  <div class="shade">
    <van-nav-bar
      class="invite-nav-bar"
      title="请确认服务信息"
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />
    <div class="invite-box">
      <div class="share-box">
        <div class="tf-bg">
          <div class="tf-text-grey">服务项目：</div>
          <div class="tf-text-grey">申请：</div>
        </div>
        <div class="pd20">
          <div class="tf-text-grey">申请人：</div>
        <div class="tf-text-grey">手机号：</div>
        <div class="tf-text-grey">房屋：</div>
        </div>
      </div>
      <button class="share-btn" @click="serverYuyue">确认</button>
    </div>
  </div>
</template>

<script>
import { NavBar, Toast } from 'vant'
import tfDialog from '@/components/tf-dialog/index.vue'
import { serverYuyue } from '@/api/butler'
export default {
  components: {
    [NavBar.name]: NavBar,
    tfDialog
  },
  data () {
    return {
      type: '',
      server_id: '',
      project_id: '',
      uid: ''
    }
  },
  created () {
    const { type, server_id, project_id, uid } = this.$route.query
    this.type = type
    this.server_id = server_id
    this.project_id = project_id
    this.uid = uid
  },
  methods: {
    serverYuyue () {
      serverYuyue({
        uid: this.uid,
        project_id: this.project_id,
        server_id: this.server_id
      }).then(res => {
        Toast.success('确认成功')
      })
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
  font-size:30px;
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
