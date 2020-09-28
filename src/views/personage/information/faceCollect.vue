<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="人脸采集"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="tf-body-container">
      <template v-if="complete">
        <div class="success-tag">
          <span class="tf-icon tf-icon-gou"></span>
        </div>
        <div class="tf-text-lg tf-mt-lg tf-mb-lg">采集成功！</div>
        <div class="btn-box">
          <van-button type="danger" size="large" @click="openCamera">重新采集</van-button>
        </div>
      </template>
      <div v-else class="btn-box">
        <van-button type="danger" size="large" @click="openCamera">开始采集本人人脸</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Button } from 'vant'
import { cjFace } from '@/api/personage'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button
  },
  data () {
    return {
      FNPhotograph: null,
      complete: false
    }
  },
  created () {
    this.FNPhotograph = api.require('FNPhotograph')
    window.closeCameraView = new CustomEvent('cameraOperate', {
      detail: { type: 'close' }
    })
    window.changeCamera = new CustomEvent('cameraOperate', {
      detail: { type: 'change' }
    })
    window.takePhoto = new CustomEvent('cameraOperate', {
      detail: { type: 'takePhoto' }
    })
    document.addEventListener('cameraOperate', this.cameraOperate)
  },
  methods: {
    /* 打开摄像头 */
    openCamera () {
      this.FNPhotograph.openCameraView(
        {
          rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: 'auto'
          },
          useFrontCamera: true
        },
        (ret) => {
          if (ret.status) {
            api.openFrame({
              name: 'camera',
              url: './camera.html',
              rect: {
                x: 0,
                y: 0,
                w: 'auto',
                h: 'auto'
              }
            })
          }
        }
      )
    },
    /* 摄像头相关操作 */
    cameraOperate ({ detail }) {
      switch (detail.type) {
        // 关闭
        case 'close':
          api.closeFrame({
            name: 'camera'
          })
          this.FNPhotograph.closeCameraView(function (ret) {
            if (ret) {
              // alert(JSON.stringify(ret))
            }
          })
          break
        // 切换摄像头
        case 'change':
          this.FNPhotograph.getCamera((ret) => {
            if (ret.status) {
              const camera = ret.camera === 'front' ? 'back' : 'front'
              this.FNPhotograph.setCamera({
                camera: camera
              })
            }
          })
          break
        // 拍照
        case 'takePhoto':
          this.FNPhotograph.takePhoto(
            {
              quality: 'medium',
              path: 'fs://mhjy/renlian.png',
              album: false
            },
            (ret) => {
              this.uploadImage({ file: ret.imagePath })
            }
          )
          break
        default:
          break
      }
    },
    /* 上传图片到服务器 */
    uploadImage (file) {
      api.ajax(
        {
          url: process.env.VUE_APP_BASE_API + '/upload/uploads/uImages',
          method: 'post',
          headers: {
            Authorization: api.getPrefs({
              sync: true,
              key: 'access_token'
            })
          },
          data: {
            files: {
              imgFile: file.file
            }
          }
        },
        (ret, err) => {
          if (ret) {
            this.cjFace(ret.data)
          } else {
            api.alert({
              msg: err
            })
            console.log(JSON.stringify(err))
          }
        }
      )
    },
    /* 人脸采集上传 */
    cjFace (url) {
      cjFace({
        face_url: url
      }).then((res) => {
        this.complete = true
        this.cameraOperate({ detail: { type: 'close' } })
        this.mtjEvent({
          eventId: 74
        })
      }).catch((message) => {
        api.alert({
          msg: message
        })
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    document.removeEventListener('cameraOperate', this.cameraOperate)
    next()
  }
}
</script>

<style lang='less' scoped>
.tf-body-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .btn-box {
    width: 100%;
    padding: 0 10%;
  }
}
.success-tag {
  width: 240px;
  height: 240px;
  text-align: center;
  background: @red-dark;
  color: #fff;
  border-radius: 50%;
  .tf-icon-gou {
    font-size: 240px;
    line-height: 240px;
  }
}
</style>
