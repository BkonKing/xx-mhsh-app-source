<template>
  <div class="tf-bg">
    <van-nav-bar
      title="任务投诉"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="tf-main-container">
      <van-cell-group class="complaint-container">
        <van-cell title="投诉用户" center value="用户昵称（150****5124）" />
        <van-cell
          title="任务名称"
          center
          value="标题标题标题标题标题标题标题标题标题标题标题标"
          is-link
        />
        <van-cell title="完成地点" center value="不合理要求" />
        <div class="content">
          投诉描述内容投诉描述内容投诉描述内容投诉描述内
          容投诉描述内容投诉描述内容投诉描述内容投诉描述内容投诉描述内
          容投诉描述内容 容投诉描述内容
        </div>
        <tf-image-list
          class="image-list"
          v-if="images"
          :data="images"
          :column="4"
          mode="show"
        ></tf-image-list>
      </van-cell-group>
      <div class="complaint-group-2">
        <span class="complaint-text">处理回复：</span
        >投诉描述内容内容投诉描述内容内容投诉描述内容内容投诉描述内容内容投诉描述内容内投诉描述内容内容投诉描述内容内容投诉描述内投诉描述内容内容投诉描述内容内容投诉描述
      </div>
    </div>
  </div>
</template>

<script>
// pages/task/personage/complaint
import tfImageList from '@/components/tf-image-list'
export default {
  components: {
    tfImageList
  },
  data () {
    return {
      images: [
        'https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/ceb195f0a30911eb87dd518891254080.png',
        'https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/ceb195f0a30911eb87dd518891254080.png',
        'https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/ceb195f0a30911eb87dd518891254080.png',
        'https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/ceb195f0a30911eb87dd518891254080.png',
        'https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/ceb195f0a30911eb87dd518891254080.png'
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.tf-main-container {
  padding: 30px 20px;
}

.complaint-container {
  padding: 0 30px;
  border-radius: 10px;
  /deep/ .van-cell {
    height: 104px;
    padding: 10px 0;
    border-bottom: 1px solid #eeeeee;
    .van-cell__title {
      flex: initial;
      width: 200px;
      font-size: 28px;
      color: #7a7a7e;
      line-height: 1;
    }
    .van-cell__value {
      font-size: 26px;
      font-weight: 500;
      color: #000000;
      line-height: 1;
      @text-ellipsis();
    }
  }
}

.content {
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 28px;
  color: #000000;
  line-height: 48px;
}

.image-list {
  margin-top: 10px;
  margin-bottom: 10px;
}

.complaint-group-2 {
  width: 100%;
  padding: 20px 30px;
  margin-top: 30px;
  border-radius: 10px;
  background-color: #fff;
  line-height: 48px;
  color: #8f8f94;
  font-size: 26px;
}

.complaint-text {
  font-weight: 500;
  color: #000000;
}
</style>
