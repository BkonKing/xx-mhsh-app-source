const lifeRouter = [
  {
    path: '/life',
    name: 'life',
    component: () =>
      import(
        /* webpackChunkName: "lifeIndex" */
        '@/views/life/index'
      )
  },
  {
    path: '/store/flash-purchase',
    name: 'flashPurchase',
    component: () =>
      import(
        /* webpackChunkName: "flashPurchase" */
        '@/views/life/store/flash-purchase'
      )
  },
  {
    path: '/store/special-sale',
    name: 'specialSale',
    component: () =>
      import(
        /* webpackChunkName: "specialSale" */
        '@/views/life/store/special-sale'
      )
  },
  {
    path: '/store/special-area',
    name: 'specialArea',
    component: () =>
      import(
        /* webpackChunkName: "specialArea" */
        '@/views/life/store/special-area'
      )
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
    path: '/cart',
    name: 'cart',
    component: () =>
      import(
        /* webpackChunkName: "cart" */
        '@/views/life/cart/cart'
      )
  },
  {
    path: '/settlement',
    name: 'settlement',
    component: () =>
      import(
        /* webpackChunkName: "settlement" */
        '@/views/life/cart/settlement'
      )
  },
  {
    path: '/coupon/list',
    name: 'couponList',
    component: () =>
      import(
        /* webpackChunkName: "couponList" */
        '@/views/life/coupon/coupon-list'
      )
  },
  {
    path: '/coupon/coupon-select',
    name: 'couponSelect',
    component: () =>
      import(
        /* webpackChunkName: "couponSelect" */
        '@/views/life/coupon/coupon-select'
      )
  },
  {
    path: '/order/list',
    name: 'orderList',
    component: () =>
      import(
        /* webpackChunkName: "orderList" */
        '@/views/life/order/order-list'
      )
  },
  {
    path: '/order/detail',
    name: 'orderDetail',
    component: () =>
      import(
        /* webpackChunkName: "orderDetail" */
        '@/views/life/order/order-detail'
      )
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
      )
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
      )
  }
]

export default lifeRouter
