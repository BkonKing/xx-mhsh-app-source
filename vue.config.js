const path = require('path')
const fs = require('fs')
const {
  exec,
  spawn
} = require('child_process')

const appname = 'dist' // 项目文件名
const appPort = 8111 // 浏览器打开端口。
const apicloudPort = 9999 // 真机同步端口
const scriptActive = process.env.npm_lifecycle_event

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  outputDir: './' + appname, // 运行时生成的生产环境构建文件的目录(默认""dist""，构建之前会被清除)
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  filenameHashing: process.env.NODE_ENV === 'production' /** 开发环境关闭文件哈希值 */,
  productionSourceMap: false,
  pages: {
    // pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
    index: {
      // 除了 entry 之外都是可选的
      entry: 'src/main.js', // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
      template: 'public/index.html', // 模板来源
      filename: 'index.html', // 在 apiCloud/index.html 的输出
      title: '美好生活' // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
    }
  },
  lintOnSave: false, // 是否在保存的时候检查
  css: {
    loaderOptions: {
      less: {
        // 若使用 less-loader@5，请移除 lessOptions 这一级，直接配置选项。
        modifyVars: {
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${path.join(__dirname, 'src/styles/var.less')}";`,
        },
      },
    },
  },
  // webpack配置
  chainWebpack: config => {
    config.entry('index').add('@babel/polyfill') // 添加babel-poiyfill
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStyleResource(config.module.rule('less').oneOf(type))
    )
    // 清除css，js版本号
    config.output.filename('static/[name].js').end()
    config.output.chunkFilename('static/[name].js').end()
    // 为生产环境修改配置...
    if (process.env.NODE_ENV === 'production') {
      config.plugin('extract-css').tap(args => [{
        filename: 'static/[name].css',
        chunkFilename: 'static/[name].css'
      }])
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "development") {
      config.devtool = 'cheap-module-source-map'
    }
    config.plugins = config.plugins.concat([{
      apply: compiler => {
        if (scriptActive === 'watch-build') {
          /** 插件初始化后开启wifi服务 */
          compiler.hooks.afterPlugins.tap('apicloud', () => {
            // 在子进程运行命令行，提供监听事件
            const wifiWorker = spawn(`apicloud wifiStart --port ${apicloudPort}`, {
              shell: true
            })
            wifiWorker.stdout.on('data', function (chunk) {
              /** 严格模式下不允许使用八进制 */
              console.log('\033[32m【APICloud-cli】:' + chunk.toString() + '\033[0m\n')
            })
            wifiWorker.on('error', err => {
              console.log('请确保已安装apicloud-cli' + err)
            })
          })
          /** 生成资源后,删除重复热更新文件 */
          compiler.hooks.afterEmit.tap('apicloud', compilation => {
            const assets = compilation.assets // assets资源文件列表
            const unlinked = [] // 被删除文件列表
            const files = fs.readdirSync(
              path.join(__dirname, `./${appname}/`)
            )
            if (files.length) {
              let jsFiles = files.filter(f => /.*(\.js|\.json)$/.test(f))
              jsFiles.forEach(file => {
                if (!assets[file]) {
                  fs.unlinkSync(path.resolve(`./${appname}/${file}`)) // 删除文件
                  unlinked.push(file)
                }
              })
              if (unlinked.length > 0) {
                console.log('删除热更新文件: ', unlinked)
              }
            }
          })
          /** 编译完成，真机同步 */
          compiler.hooks.done.tap('apicloud', () => {
            // 在子进程运行命令行，提供回调函数
            exec(
              `apicloud wifiSync --project ./${appname} --updateAll false --port ${apicloudPort}`,
              (error, stdout) => {
                if (error) {
                  console.error(`exec error: ${error}`)
                  console.log(
                    `error: wifi真机同步失败，请确保已安装apicloud-cli或已启动Wifi服务`
                  )
                  return
                }
                console.log('\033[44;30m DONE \033[40;34m ' + '【APICloud-cli】:wifi真机同步成功' + '\033[0m')
              }
            )
          })
        }
      }
    }])
  },
  // webpack-dev-server配置
  devServer: {
    // 环境配置
    host: 'localhost',
    hot: false,
    port: appPort,
    https: false,
    hotOnly: false,
    open: true,
    proxy: {
      /** 解决本地测试跨域问题 */
      '/api/xwtj': {
        target: 'http://tj.mhshjy.com/api/v1',
        pathRewrite: {
          '^/api/xwtj': ''
        }
      },
      '/api': {
        // target: 'http://meihaoshenghuo.com/app/api/v1',
        // target: 'https://test.tosolomo.com/app/api/v1', 
        target: 'https://develop.mhshjy.com/app/api/v1',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  transpileDependencies: ['swiper', 'dom7', 'ssr-window'],
  // 第三方插件配置
  pluginOptions: {}
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.join(__dirname, 'src/styles/var.less'), // 需要全局导入的less
      ],
    })
}
