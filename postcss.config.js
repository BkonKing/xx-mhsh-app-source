module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        'Android >= 4.0',
        'iOS >= 8',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8'
        // 'last 10 versions', // 所有主流浏览器最近10版本用
      ],
      grid: true
    },
    'postcss-pxtorem': {
      // 设计稿 375:37.5
      // 设计稿：750:75
      // Vant 是基于 375
      rootValue: 75,
      propList: ['*']
      // exclude: /node_modules/i
    }
  }
}
