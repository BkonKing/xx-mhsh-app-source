// 判断环境不是 prod时，加载 mock 服务
if (process.env.NODE_ENV !== 'production') {
  // const Mock = require('mockjs')
  // Mock.setup({
  //   timeout: '500-800'
  // })

  // const context = require.context('./services', true, /\.mock.js$/)

  // context.keys().forEach((key) => {
  //   Object.keys(context(key)).forEach((paramKey) => {
  //     Mock.mock(...context(key)[paramKey])
  //   })
  // })
}
