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
      )
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
  /* 签到 */
  {
    path: '/pages/personage/happiness-coin/index',
    name: 'happinessCoinIndex',
    component: () =>
      import(
        /* webpackChunkName: "happinessCoinIndex" */
        '@/views/personage/happiness-coin/index.vue'
      )
  },
  /* 幸福币记录 */
  {
    path: '/pages/personage/happiness-coin/coin-record',
    name: 'happinessCoinRecord',
    component: () =>
      import(
        /* webpackChunkName: "happinessCoinRecord" */
        '@/views/personage/happiness-coin/coin-record.vue'
      )
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
      )
  },
  /* 我的互动 */
  {
    path: '/pages/personage/interaction/index',
    name: 'interactionIndex',
    component: () =>
      import(
        /* webpackChunkName: "interactionIndex" */
        '@/views/personage/interaction/index.vue'
      )
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
  }
]

export default personageRouter
