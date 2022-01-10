const lifeRouter = [{
  path: '/life',
  name: 'life',
  component: () =>
    import(
      /* webpackChunkName: "lifeIndex" */
      '@/views/life/index'
    )
},
{
  path: '/store/goods-classify',
  name: 'goodsClassify',
  component: () =>
    import(
      /* webpackChunkName: "goodsClassify" */
      '@/views/life/store/goods-classify'
    ),
  meta: {
    keepAlive: true
  }
},
{
  path: '/store/flash-purchase',
  name: 'flashPurchase',
  component: () =>
    import(
      /* webpackChunkName: "flashPurchase" */
      '@/views/life/store/flash-purchase'
    ),
  meta: {
    keepAlive: true
  }
},
{
  path: '/store/special-sale',
  name: 'specialSale',
  component: () =>
    import(
      /* webpackChunkName: "specialSale" */
      '@/views/life/store/special-sale'
    ),
  meta: {
    keepAlive: true
  }
},
{
  path: '/store/special-area',
  name: 'specialArea',
  component: () =>
    import(
      /* webpackChunkName: "specialArea" */
      '@/views/life/store/special-area'
    ),
  meta: {
    keepAlive: true
  }
},
{
  path: '/store/goods-detail',
  name: 'goodsDetail',
  component: () =>
    import(
      /* webpackChunkName: "goodsDetail" */
      '@/views/life/store/goods-detail'
    )
},
{
  path: '/store/search',
  name: 'search',
  component: () =>
    import(
      /* webpackChunkName: "search" */
      '@/views/life/store/search'
    ),
  meta: {
    keepAlive: true
  }
},
{
  path: '/life/cart',
  name: 'cart',
  component: () =>
    import(
      /* webpackChunkName: "cart" */
      '@/views/life/cart/cart'
    )
},
{
  path: '/life/settlement',
  name: 'settlement',
  component: () =>
    import(
      /* webpackChunkName: "settlement" */
      '@/views/life/cart/settlement'
    ),
  meta: {
    keepAlive: true
  }
},
{
  path: '/coupon/list',
  name: 'couponList',
  component: () =>
    import(
      /* webpackChunkName: "couponList" */
      '@/views/life/coupon/coupon-list'
    ),
  meta: {
    keepAlive: true
  }
},
{
  path: '/coupon/coupon-select',
  name: 'couponSelect',
  component: () =>
    import(
      /* webpackChunkName: "couponSelect" */
      '@/views/life/coupon/coupon-select'
    ),
  meta: {
    keepAlive: true
  }
},
{
  path: '/order/list',
  name: 'orderList',
  component: () =>
    import(
      /* webpackChunkName: "orderList" */
      '@/views/life/order/order-list'
    ),
  meta: {
    keepAlive: true
  }
},
// 订单详情-幸福币使用
{
  path: '/order/coin-detail',
  name: 'coinDetail',
  component: () =>
    import(
      /* webpackChunkName: "orderDetail" */
      '@/views/life/order/coin-order-detail'
    ),
  meta: {
    keepAlive: true
  }
},
{
  path: '/order/detail',
  name: 'orderDetail',
  component: () =>
    import(
      /* webpackChunkName: "orderDetail" */
      '@/views/life/order/order-detail'
    ),
  meta: {
    keepAlive: true
  }
},
{
  path: '/order/special-detail',
  name: 'specialDetail',
  component: () =>
    import(
      /* webpackChunkName: "specialDetail" */
      '@/views/life/order/special-order-detail'
    )
},
{
  path: '/order/order-apply',
  name: 'orderApply',
  component: () =>
    import(
      /* webpackChunkName: "orderApply" */
      '@/views/life/order/order-apply'
    )
},
{
  path: '/order/apply-barter',
  name: 'applyBarter',
  component: () =>
    import(
      /* webpackChunkName: "applyBarter" */
      '@/views/life/order/apply-barter'
    ),
  meta: {
    keepAlive: true
  }
},
{
  path: '/order/barter-detail',
  name: 'barterDetail',
  component: () =>
    import(
      /* webpackChunkName: "barterDetail" */
      '@/views/life/order/barter-order-detail'
    )
},
{
  path: '/order/apply-refund',
  name: 'applyRefund',
  component: () =>
    import(
      /* webpackChunkName: "applyRefund" */
      '@/views/life/order/apply-refund'
    )
},
{
  path: '/order/refund-detail',
  name: 'refundDetail',
  component: () =>
    import(
      /* webpackChunkName: "refundDetail" */
      '@/views/life/order/refund-order-detail'
    )
},
{
  path: '/order/write-logistics',
  name: 'writeLogisticsl',
  component: () =>
    import(
      /* webpackChunkName: "writeLogisticsl" */
      '@/views/life/order/write-logistics'
    )
},
{
  path: '/logistics/list',
  name: 'logisticsList',
  component: () =>
    import(
      /* webpackChunkName: "logisticsList" */
      '@/views/life/logistics/logistics-list'
    )
},
{
  path: '/logistics/logistics-self',
  name: 'logisticsSelf',
  component: () =>
    import(
      /* webpackChunkName: "logisticsSelf" */
      '@/views/life/logistics/logistics-self'
    )
},
{
  path: '/logistics/logistics-express',
  name: 'logisticsExpress',
  component: () =>
    import(
      /* webpackChunkName: "logisticsExpress" */
      '@/views/life/logistics/logistics-express'
    )
},
{
  path: '/logistics/logistics-business',
  name: 'logisticsBusiness',
  component: () =>
    import(
      /* webpackChunkName: "logisticsExpress" */
      '@/views/life/logistics/logistics-business'
    )
},
{
  path: '/address/list',
  name: 'addressList',
  component: () =>
    import(
      /* webpackChunkName: "addressList" */
      '@/views/life/address/address-list'
    )
},
{
  path: '/address/edit',
  name: 'addressEdit',
  component: () =>
    import(
      /* webpackChunkName: "addressEdit" */
      '@/views/life/address/address-operate'
    ),
  meta: {
    keepAlive: true
  }
},
{
  path: '/address/map',
  name: 'addressMap',
  component: () =>
    import(
      /* webpackChunkName: "addressEdit" */
      '@/views/life/address/address-map'
    )
},
{
  path: '/order/verification',
  name: 'orderVerification',
  component: () =>
    import(
      /* webpackChunkName: "addressEdit" */
      '@/views/life/order/order-verification'
    )
},
/* 观影模块 start */
// 观影模块首页
{
  path: '/life/movie/index',
  name: 'movieIndex',
  component: () =>
    import(
      /* webpackChunkName: "movieIndex" */
      '@/views/life/movie/index'
    ),
  meta: {
    keepAlive: true
  }
},
// 影片/影院列表
{
  path: '/life/movie/list',
  name: 'movieList',
  component: () =>
    import(
      /* webpackChunkName: "movieList" */
      '@/views/life/movie/list'
    ),
  meta: {
    keepAlive: true
  }
},
// 影片详情
{
  path: '/life/movie/filmDetails',
  name: 'movieFilmDetails',
  component: () =>
    import(
      /* webpackChunkName: "movieFilmDetails" */
      '@/views/life/movie/filmDetails'
    ),
  meta: {
    keepAlive: true
  }
},
// 选择影院
{
  path: '/life/movie/selectCinema',
  name: 'movieSelectCinema',
  component: () =>
    import(
      /* webpackChunkName: "movieSelectCinema" */
      '@/views/life/movie/selectCinema'
    ),
  meta: {
    keepAlive: true
  }
},
// 演职人员
{
  path: '/life/movie/cast',
  name: 'movieCast',
  component: () =>
    import(
      /* webpackChunkName: "movieCast" */
      '@/views/life/movie/cast'
    )
},
// 影院详情
{
  path: '/life/movie/cinemaDetails',
  name: 'movieCinemaDetails',
  component: () =>
    import(
      /* webpackChunkName: "movieCinemaDetails" */
      '@/views/life/movie/cinemaDetails'
    ),
  meta: {
    keepAlive: true
  }
},
// 影院位置
{
  path: '/life/movie/location',
  name: 'movieLocation',
  component: () =>
    import(
      /* webpackChunkName: "movieLocation" */
      '@/views/life/movie/location'
    )
},
// 选择座位
{
  path: '/life/movie/seat',
  name: 'movieSeat',
  component: () =>
    import(
      /* webpackChunkName: "movieSeat" */
      '@/views/life/movie/seat'
    ),
  meta: {
    keepAlive: true
  }
},
// 确定电影票订单
{
  path: '/life/movie/confirmOrder',
  name: 'movieConfirmOrder',
  component: () =>
    import(
      /* webpackChunkName: "movieConfirmOrder" */
      '@/views/life/movie/confirmOrder'
    ),
  meta: {
    keepAlive: true
  }
},
// 我的影票订单列表
{
  path: '/life/movie/order',
  name: 'movieOrder',
  component: () =>
    import(
      /* webpackChunkName: "movieOrder" */
      '@/views/life/movie/order'
    ),
  meta: {
    keepAlive: true
  }
},
// 我的影票
{
  path: '/life/movie/ticket',
  name: 'movieTicket',
  component: () =>
    import(
      /* webpackChunkName: "movieTicket" */
      '@/views/life/movie/ticket'
    )
}
  /* 观影模块 end */
]

export default lifeRouter
