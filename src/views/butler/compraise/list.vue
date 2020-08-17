<template>
  <div class="tf-bg">
    <van-nav-bar title="我的投诉表扬" :fixed="true" placeholder left-arrow @click-left="$router.go(-1)" />
    <div class="tf-main-container">
      <refreshList :list.sync="data" :load="getComPraiseList">
        <template v-slot="{item}">
          <div class="tf-card" @click="jump(item)">
            <div class="tf-card-header">
              <userInfo :avatar="userInfo.avatar" :name="userInfo.account" :time="item.ctime">
                <template v-slot:right>
                  <div
                    class="tf-icon"
                    :class="[{'tf-text-primary': item.info_type==2}, item.info_type == '1' ? 'tf-icon-tousu' : 'tf-icon-biaoyang']"
                  ></div>
                </template>
              </userInfo>
            </div>
            <div class="tf-card-content">{{ item.content }}</div>
            <tf-image-list class="pb10" :data="item.images"></tf-image-list>
            <div v-if="item.reply" class="reply-box">
              <div class="reply-title">社区回复</div>
              <div class="reply-content">{{ item.reply }}</div>
            </div>
          </div>
        </template>
      </refreshList>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import userInfo from '@/components/user-info/index.vue'
import { getComPraiseList } from '@/api/butler.js'
import tfImageList from '@/components/tf-image-list'
import { mapGetters } from 'vuex'
export default {
  components: {
    [NavBar.name]: NavBar,
    refreshList,
    tfImageList,
    userInfo
  },
  data () {
    return {
      data: []
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    getComPraiseList () {
      return getComPraiseList()
    },
    jump (item) {
      const url = `/pages/butler/compraise/details?id=${item.id}&type=${item.info_type}`
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.tf-card {
  margin-bottom: @padding-lg;
}

.tf-card-header {
  border-bottom: 1px solid @divider-color;
}

.reply-box {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: @divider-color;
  padding-bottom: 40px;
}

.reply-title {
  font-size: @font-size-md;
  padding: 30px 0;
}

.reply-content {
  padding: 30px;
  background-color: #f0f0f0;
  color: @gray-7;
  font-size: 24px;
  line-height: 52px;
  border-radius: 10px;
}

.tf-image-box {
  @flex();
  justify-content: space-between;
  position: relative;
  padding-bottom: 30px;
}

.pb10 {
  padding-bottom: 10px;
}

.tf-icon {
  font-size: 36px;
  line-height: 88px;
  color: #383838;
}
</style>
