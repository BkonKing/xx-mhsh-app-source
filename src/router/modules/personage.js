const personageRouter = [
  /* 设置 */
  {
    path: '/pages/personage/setting/index',
    name: 'settingIndex',
    component: () =>
      import(
        /* webpackChunkName: "settingIndex" */
        '@/views/personage/setting/index.vue'
      )
  },
  /* 切换账号 */
  {
    path: '/pages/personage/setting/account',
    name: 'settingAccount',
    component: () =>
      import(
        /* webpackChunkName: "settingAccount" */
        '@/views/personage/setting/account.vue'
      )
  },
  /* 关于我们 */
  {
    path: '/pages/personage/setting/about',
    name: 'settingAbout',
    component: () =>
      import(
        /* webpackChunkName: "settingAbout" */
        '@/views/personage/setting/about.vue'
      )
  },
  /* 个人资料 */
  {
    path: '/pages/personage/information/index',
    name: 'informationIndex',
    component: () =>
      import(
        /* webpackChunkName: "informationIndex" */
        '@/views/personage/information/index.vue'
      ),
    meta: {
      keepAlive: true
    }
  },
  /* 新增房产 */
  {
    path: '/pages/personage/house/attestation',
    name: 'houseAttestation',
    component: () =>
      import(
        /* webpackChunkName: "houseAttestation" */
        '@/views/personage/house/attestation.vue'
      ),
    meta: {
      keepAlive: true
    }
  },
  /* 选择小区 */
  {
    path: '/pages/personage/house/select-community',
    name: 'houSelectCommunity',
    component: () =>
      import(
        /* webpackChunkName: "houSelectCommunity" */
        '@/views/personage/house/select-community.vue'
      )
  },
  /* 选择房产 */
  {
    path: '/pages/personage/house/select-house',
    name: 'houSeselectHouse',
    component: () =>
      import(
        /* webpackChunkName: "houSeselectHouse" */
        '@/views/personage/house/select-house.vue'
      )
  },
  /* 手机验证 */
  {
    path: '/pages/personage/information/phone',
    name: 'informationPhone',
    component: () =>
      import(
        /* webpackChunkName: "informationPhone" */
        '@/views/personage/information/phone.vue'
      )
  },
  /* 支付密码 */
  {
    path: '/pages/personage/information/payment-code',
    name: 'informationPaymentCode',
    component: () =>
      import(
        /* webpackChunkName: "informationPaymentCode" */
        '@/views/personage/information/payment-code.vue'
      )
  },
  /* 忘记支付密码 */
  {
    path: '/pages/personage/information/forget-payment-code',
    name: 'informationForgetPaymentCode',
    component: () =>
      import(
        /* webpackChunkName: "informationForgetPaymentCode" */
        '@/views/personage/information/forget-payment-code.vue'
      ),
    meta: {
      keepAlive: true
    }
  },
  /* 登录密码 */
  {
    path: '/pages/personage/information/login-password',
    name: 'informationLoginPassword',
    component: () =>
      import(
        /* webpackChunkName: "informationLoginPassword" */
        '@/views/personage/information/login-password.vue'
      )
  },
  /* 意见反馈 */
  {
    path: '/pages/personage/feedback/index',
    name: 'feedbackIndex',
    component: () =>
      import(
        /* webpackChunkName: "feedbackIndex" */
        '@/views/personage/feedback/index.vue'
      )
  },
  {
    path: '/pages/personage/feedback/list',
    name: 'feedbackList',
    component: () =>
      import(
        /* webpackChunkName: "feedbackList" */
        '@/views/personage/feedback/list.vue'
      )
  },
  {
    path: '/pages/personage/feedback/details',
    name: 'feedbackDetails',
    component: () =>
      import(
        /* webpackChunkName: "feedbackDetails" */
        '@/views/personage/feedback/details.vue'
      )
  },
  /* 事务处理 */
  {
    path: '/pages/personage/transaction/index',
    name: 'transactionIndex',
    component: () =>
      import(
        /* webpackChunkName: "transactionIndex" */
        '@/views/personage/transaction/index.vue'
      ),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/pages/personage/transaction/details',
    name: 'transactionDetails',
    component: () =>
      import(
        /* webpackChunkName: "transactionDetails" */
        '@/views/personage/transaction/details.vue'
      )
  },
  /* 消息 */
  {
    path: '/pages/personage/message/index',
    name: 'messageIndex',
    component: () =>
      import(
        /* webpackChunkName: "messageIndex" */
        '@/views/personage/message/index.vue'
      ),
    meta: {
      keepAlive: true
    }
  },
  /* app系统消息详情 */
  {
    path: '/pages/personage/message/sysMsgInfo',
    name: 'sysMsgInfo',
    component: () =>
      import(
        /* webpackChunkName: "sysMsgInfo" */
        '@/views/personage/message/sysMsgInfo.vue'
      )
  },
  /* 签到 */
  {
    path: '/pages/personage/happiness-coin/index',
    name: 'happinessCoinIndex',
    component: () =>
      import(
        /* webpackChunkName: "happinessCoinIndex" */
        '@/views/personage/happiness-coin/index.vue'
      ),
    meta: {
      keepAlive: true
    }
  },
  /* 幸福币记录 */
  {
    path: '/pages/personage/happiness-coin/coin-record',
    name: 'happinessCoinRecord',
    component: () =>
      import(
        /* webpackChunkName: "happinessCoinRecord" */
        '@/views/personage/happiness-coin/coin-record.vue'
      ),
    meta: {
      keepAlive: true
    }
  },
  /* 购买记录 */
  {
    path: '/pages/personage/happiness-coin/buy-record',
    name: 'happinessCoinBuyRecord',
    component: () =>
      import(
        /* webpackChunkName: "happinessCoinBuyRecord" */
        '@/views/personage/happiness-coin/buy-record.vue'
      )
  },
  /* 幸福币明细 */
  {
    path: '/pages/personage/happiness-coin/details',
    name: 'happinessCoinDetails',
    component: () =>
      import(
        /* webpackChunkName: "happinessCoinDetails" */
        '@/views/personage/happiness-coin/details.vue'
      )
  },
  /* 收付款 */
  {
    path: '/pages/personage/happiness-coin/payment',
    name: 'happinessCoinPayment',
    component: () =>
      import(
        /* webpackChunkName: "happinessCoinPayment" */
        '@/views/personage/happiness-coin/payment.vue'
      ),
    meta: {
      keepAlive: true
    }
  },
  /* 我的互动 */
  {
    path: '/pages/personage/interaction/index',
    name: 'interactionIndex',
    component: () =>
      import(
        /* webpackChunkName: "interactionIndex" */
        '@/views/personage/interaction/index.vue'
      ),
    meta: {
      keepAlive: true
    }
  },
  /* 常见问题 */
  {
    path: '/pages/personage/question/index',
    name: 'questionIndex',
    component: () =>
      import(
        /* webpackChunkName: "questionIndex" */
        '@/views/personage/question/index.vue'
      )
  },
  /* 扫码 */
  {
    path: '/pages/personage/scanCode/index',
    name: 'scanCodeIndex',
    component: () =>
      import(
        /* webpackChunkName: "scanCodeIndex" */
        '@/views/personage/scanCode/index.vue'
      )
  },
  /* 协议列表 */
  {
    path: '/pages/personage/agreement/list',
    name: 'agreementList',
    component: () =>
      import(
        /* webpackChunkName: "agreementList" */
        '@/views/personage/setting/agreementList.vue'
      )
  },
  /* 屏蔽设置 */
  {
    path: '/pages/personage/setting/shield',
    name: 'settingShield',
    component: () =>
      import(
        /* webpackChunkName: "settingShield" */
        '@/views/personage/setting/shield.vue'
      )
  },
  /* 人脸收集 */
  {
    path: '/pages/personage/information/faceCollect',
    name: 'faceCollect',
    component: () =>
      import(
        /* webpackChunkName: "faceCollect" */
        '@/views/personage/information/faceCollect.vue'
      )
  },
  // 实名认证
  {
    path: '/pages/personage/information/certification',
    name: 'certification',
    component: () =>
      import(
        /* webpackChunkName: "certification" */
        '@/views/personage/information/certification.vue'
      ),
    meta: {
      keepAlive: true
    }
  },
  // 个人信息
  {
    path: '/pages/personage/information/personInfo',
    name: 'personInfo',
    component: () =>
      import(
        /* webpackChunkName: "personInfo" */
        '@/views/personage/information/personInfo.vue'
      )
  },
  // 实名信息
  {
    path: '/pages/personage/information/realNameInfo',
    name: 'realNameInfo',
    component: () =>
      import(
        /* webpackChunkName: "realNameInfo" */
        '@/views/personage/information/realNameInfo.vue'
      )
  },
  // 添加银行卡
  {
    path: '/pages/personage/information/addBankCard',
    name: 'addBankCard',
    component: () =>
      import(
        /* webpackChunkName: "addBankCard" */
        '@/views/personage/information/addBankCard.vue'
      ),
    meta: {
      keepAlive: true
    }
  },
  // 支持的银行卡列表
  {
    path: '/pages/personage/information/support-bankCard-list',
    name: 'supportBankCardList',
    component: () =>
      import(
        /* webpackChunkName: "supportBankCardList" */
        '@/views/personage/information/support-bankCard-list.vue'
      )
  },
  // 验证预留手机号
  {
    path: '/pages/personage/information/verifyPhone',
    name: 'verifyPhone',
    component: () =>
      import(
        /* webpackChunkName: "verifyPhone" */
        '@/views/personage/information/verifyPhone.vue'
      )
  },
  // 支付协议
  {
    path: '/pages/personage/information/pay-agreeMent',
    name: 'payAgreeMent',
    component: () =>
      import(
        /* webpackChunkName: "payAgreeMent" */
        '@/views/personage/information/pay-agreeMent.vue'
      )
  },
  // 我的银行卡
  {
    path: '/pages/personage/information/bankCard',
    name: 'bankCard',
    component: () =>
      import(
        /* webpackChunkName: "bankCard" */
        '@/views/personage/information/bankCard.vue'
      )
  },
  /* 人脸收集拍照 */
  {
    path: '/pages/personage/information/faceCollectCamera',
    name: 'faceCollectCamera',
    component: () =>
      import(
        /* webpackChunkName: "faceCollectCamera" */
        '@/views/personage/information/faceCollectCamera.vue'
      )
  },
  /* 水电费-选择房间 */
  {
    path: '/pages/personage/water-electricity/select',
    name: 'waterElectricitySelect',
    component: () =>
      import(
        /* webpackChunkName: "waterElectricitySelect" */
        '@/views/personage/transaction/water-electricity/select.vue'
      )
  },
  /* 水电费-水电抄表 */
  {
    path: '/pages/personage/water-electricity/meter-reading',
    name: 'waterElectricityMeter',
    component: () =>
      import(
        /* webpackChunkName: "waterElectricityMeter" */
        '@/views/personage/transaction/water-electricity/meter-reading.vue'
      )
  },
  /* 幸福币-推荐购房 */
  {
    path: '/pages/personage/happiness-coin/recomBuyHouse',
    name: 'recomBuyHouse',
    component: () =>
      import(
        /* webpackChunkName: "recomBuyHouse" */
        '@/views/personage/happiness-coin/recom-buy-house.vue'
      )
  },
  /** 幸福币-推荐记录 */
  {
    path: '/pages/personage/happiness-coin/recomRecord',
    name: 'recomRecord',
    component: () =>
      import(
        /* webpackChunkName: "recomRecord" */
        '@/views/personage/happiness-coin/recom-record.vue'
      )
  },
  /** 我的资料-注销账号 */
  {
    path: '/personage/logout',
    name: 'logout',
    component: () =>
      import(
        /* webpackChunkName: "logout" */
        '@/views/personage/information/logout'
      ),
    meta: {
      keepAlive: true
    }
  },
  /** 邀请 */
  {
    path: '/personage/invite/index',
    name: 'inviteIndex',
    component: () =>
      import(
        /* webpackChunkName: "inviteIndex" */
        '@/views/personage/invite/index'
      ),
    meta: {
      keepAlive: true
    }
  },
  /** 邀请-面对面邀请 */
  {
    path: '/personage/invite/QRCode',
    name: 'inviteQRCode',
    component: () =>
      import(
        /* webpackChunkName: "inviteQRCode" */
        '@/views/personage/invite/QRCode'
      )
  },
  // 商户首页
  {
    path: '/personage/shop/index',
    name: 'shopIndex',
    component: () =>
      import(
        /* webpackChunkName: "shopIndex" */
        '@/views/personage/shop/index'
      )
  },
  // 店铺资料
  {
    path: '/personage/shop/information',
    name: 'shopInformation',
    component: () =>
      import(
        /* webpackChunkName: "shopInformation" */
        '@/views/personage/shop/information'
      ),
    meta: {
      keepAlive: true
    }
  },
  // 创建优惠券
  {
    path: '/personage/shop/createCoupon',
    name: 'shopCreateCoupon',
    component: () =>
      import(
        /* webpackChunkName: "shopCreateCoupon" */
        '@/views/personage/shop/createCoupon'
      )
  },
  // 优惠券管理
  {
    path: '/personage/shop/couponManager',
    name: 'shopCouponManager',
    component: () =>
      import(
        /* webpackChunkName: "shopCouponManager" */
        '@/views/personage/shop/couponManager'
      ),
    meta: {
      keepAlive: true
    }
  },
  // 优惠券使用记录
  {
    path: '/personage/shop/couponUseRecord',
    name: 'shopCouponUseRecord',
    component: () =>
      import(
        /* webpackChunkName: "shopCouponUseRecord" */
        '@/views/personage/shop/couponUseRecord'
      )
  },
  // 优惠券购买记录
  {
    path: '/personage/shop/couponPurchaseRecord',
    name: 'shopCouponPurchaseRecord',
    component: () =>
      import(
        /* webpackChunkName: "shopCouponPurchaseRecord" */
        '@/views/personage/shop/couponPurchaseRecord'
      )
  },
  // 优惠券订单详情
  {
    path: '/personage/shop/couponDetail',
    name: 'shopCouponDetail',
    component: () =>
      import(
        /* webpackChunkName: "shopCouponDetail" */
        '@/views/personage/shop/couponDetail'
      )
  },
  // 核销优惠券
  {
    path: '/personage/shop/verification',
    name: 'shopCouponVerification',
    component: () =>
      import(
        /* webpackChunkName: "shopCouponVerification" */
        '@/views/personage/shop/verification'
      )
  },
  // 商户地址
  {
    path: '/personage/shop/location',
    name: 'shopLocation',
    component: () =>
      import(
        /* webpackChunkName: "shopLocation" */
        '@/views/personage/shop/location'
      )
  }
]

export default personageRouter
