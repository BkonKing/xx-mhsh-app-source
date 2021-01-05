<template>
  <div class="face-collect-camera">
    <div class="container">
      <div class="content" id="content">
        <div class="camera-header__box" @click="closeCameraView">
          <img class="camera-header__btn" src="@/assets/img/close.png" />
        </div>
        <div id="camera" style="width: 100%;height: 100%;"></div>
      </div>
      <div class="footer">
        <div class="text">拍摄您本人人脸，请保证正对手机，光线充足</div>
        <div class="camera-footer__btn" @click="cameraOperate('takePhoto')">拍照</div>
      </div>
    </div>
  </div>
</template>

<script>
import { cjFace } from '@/api/personage'
import eventBus from '@/api/eventbus'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      FNPhotograph: null,
      complete: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    this.complete = this.userInfo.have_faceimg == 1 ? 2 : 0
    this.FNPhotograph = api.require('FNPhotograph')
    eventBus.$on('resume', () => {
      this.openCamera()
    })
    eventBus.$on('pause', () => {
      this.cameraOperate('close')
    })
  },
  mounted () {
    this.openCamera()
  },
  methods: {
    /* 打开摄像头 */
    openCamera () {
      const width = document.getElementById('camera').offsetWidth
      const height = document.getElementById('camera').offsetHeight
      const contentWidth = document.getElementById('content').offsetWidth
      const contentHeigth = document.getElementById('content').offsetHeight
      const rect = {
        x: (contentWidth - width) / 2,
        y: contentHeigth - height + api.safeArea.top,
        w: width,
        h: height
      }
      this.FNPhotograph.openCameraView(
        {
          rect,
          useFrontCamera: true
        },
        ret => {
          if (ret.status) {
            api.openFrame({
              name: 'camera',
              url: './camera.html',
              useWKWebView: true,
              bgColor: 'rgba(0, 0, 0, 0)',
              rect
            })
          }
        }
      )
    },
    /* 摄像头相关操作 */
    cameraOperate (type) {
      switch (type) {
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
          this.FNPhotograph.getCamera(ret => {
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
            ret => {
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
      })
        .then(res => {
          this.complete = 1
          this.cameraOperate({ detail: { type: 'close' } })
          this.mtjEvent({
            eventId: 74
          })
        })
        .catch(err => {
          api.alert({
            msg: err.message
          })
        })
    },
    closeCameraView () {
      this.$router.go(-1)
    }
  },
  beforeRouteLeave (to, from, next) {
    this.cameraOperate('close')
    next()
  }
}
</script>

<style lang="less" scoped>
.face-collect-camera {
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.text {
  font-size: 30px;
  color: #ffffff;
  text-align: center;
  margin-top: 80px;
}

.camera-header__btn {
  width: 100%;
  height: 100%;
}

.camera-header__box {
  position: absolute;
  top: 64px;
  left: 32px;
  width: 56px;
  height: 56px;
  padding: 10px;
}

.camera-footer__btn {
  position: fixed;
  bottom: 175px;
  left: 50%;
  margin-left: -60px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #fff;
  color: #222;
  font-size: 30px;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content {
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  border-left: 50px solid #00000099;
  border-right: 50px solid #00000099;
  border-top: 208px solid #00000099;
}

.footer {
  width: 100%;
  height: 466px;
  background: #00000099;
}
</style>
