const butlerRouter = [
  /* 云门禁 */
  {
    path: '/pages/butler/entrance/index',
    name: 'entranceIndex',
    component: () =>
      import(
        /* webpackChunkName: "entranceIndex" */
        '@/views/butler/entrance/index.vue'
      )
  },
  {
    path: '/pages/butler/entrance/list',
    name: 'entranceList',
    component: () =>
      import(
        /* webpackChunkName: "entranceList" */
        '@/views/butler/entrance/list.vue'
      )
  },
  /* 公告通知 */
  {
    path: '/pages/butler/notice/index',
    name: 'noticeIndex',
    component: () =>
      import(
        /* webpackChunkName: "noticeIndex" */
        '@/views/butler/notice/index.vue'
      ),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/pages/butler/notice/details',
    name: 'noticeDetails',
    component: () =>
      import(
        /* webpackChunkName: "noticeDetails" */
        '@/views/butler/notice/details.vue'
      )
  },
  /* 报事报修 */
  {
    path: '/pages/butler/repairs/index',
    name: 'repairsIndex',
    component: () =>
      import(
        /* webpackChunkName: "repairsIndex" */
        '@/views/butler/repairs/index.vue'
      )
  },
  {
    path: '/pages/butler/repairs/details',
    name: 'repairsDetails',
    component: () =>
      import(
        /* webpackChunkName: "repairsDetails" */
        '@/views/butler/repairs/details.vue'
      )
  },
  {
    path: '/pages/butler/repairs/list',
    name: 'repairsList',
    component: () =>
      import(
        /* webpackChunkName: "repairsList" */
        '@/views/butler/repairs/list.vue'
      ),
    meta: {
      keepAlive: true
    }
  },
  // 评价
  {
    path: '/pages/butler/repairs/evaluate',
    name: 'repairsEvaluate',
    component: () =>
      import(
        /* webpackChunkName: "repairsEvaluate" */
        '@/views/butler/repairs/evaluate.vue'
      )
  },
  /* 免费服务 */
  {
    path: '/pages/butler/freeserver/index',
    name: 'freeserverIndex',
    component: () =>
      import(
        /* webpackChunkName: "freeserverIndex" */
        '@/views/butler/freeserver/index.vue'
      )
  },
  {
    path: '/pages/butler/freeserver/list',
    name: 'freeserverList',
    component: () =>
      import(
        /* webpackChunkName: "freeserverList" */
        '@/views/butler/freeserver/list.vue'
      )
  },
  {
    path: '/pages/butler/freeserver/confirm',
    name: 'freeserverConfirm',
    component: () =>
      import(
        /* webpackChunkName: "freeserverConfirm" */
        '@/views/butler/freeserver/confirm.vue'
      )
  },
  /* 访客邀约 */
  {
    path: '/pages/butler/visitor/index',
    name: 'visitorIndex',
    component: () =>
      import(
        /* webpackChunkName: "visitorIndex" */
        '@/views/butler/visitor/index.vue'
      ),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/pages/butler/visitor/invite',
    name: 'visitorInvite',
    component: () =>
      import(
        /* webpackChunkName: "visitorInvite" */
        '@/views/butler/visitor/invite.vue'
      )
  },
  {
    path: '/pages/butler/visitor/visitor-list',
    name: 'visitorVisitorList',
    component: () =>
      import(
        /* webpackChunkName: "visitorVisitorList" */
        '@/views/butler/visitor/visitor-list.vue'
      )
  },
  {
    path: '/pages/butler/visitor/invite-list',
    name: 'visitorInviteList',
    component: () =>
      import(
        /* webpackChunkName: "visitorInviteList" */
        '@/views/butler/visitor/invite-list.vue'
      )
  },
  {
    path: '/pages/butler/visitor/edit',
    name: 'visitorEdit',
    component: () =>
      import(
        /* webpackChunkName: "visitorEdit" */
        '@/views/butler/visitor/edit.vue'
      )
  },
  /* 投诉表扬 */
  {
    path: '/pages/butler/compraise/index',
    name: 'compraiseIndex',
    component: () =>
      import(
        /* webpackChunkName: "compraiseIndex" */
        '@/views/butler/compraise/index.vue'
      )
  },
  {
    path: '/pages/butler/compraise/list',
    name: 'compraiseList',
    component: () =>
      import(
        /* webpackChunkName: "compraiseList" */
        '@/views/butler/compraise/list.vue'
      )
  },
  {
    path: '/pages/butler/compraise/details',
    name: 'compraiseDetails',
    component: () =>
      import(
        /* webpackChunkName: "compraiseDetails" */
        '@/views/butler/compraise/details.vue'
      )
  },
  /* 问卷投票 */
  {
    path: '/pages/butler/questionnaire/index',
    name: 'questionnaireIndex',
    component: () =>
      import(
        /* webpackChunkName: "questionnaireIndex" */
        '@/views/butler/questionnaire/index.vue'
      )
  },
  {
    path: '/pages/butler/questionnaire/details',
    name: 'questionnaireDetails',
    component: () =>
      import(
        /* webpackChunkName: "questionnaireDetails" */
        '@/views/butler/questionnaire/details.vue'
      )
  },
  {
    path: '/pages/butler/questionnaire/my',
    name: 'questionnaireMy',
    component: () =>
      import(
        /* webpackChunkName: "questionnaireMy" */
        '@/views/butler/questionnaire/my.vue'
      )
  },
  /* 呼叫物业 */
  {
    path: '/pages/butler/call-property/index',
    name: 'propertyIndex',
    component: () =>
      import(
        /* webpackChunkName: "propertyIndex" */
        '@/views/butler/call-property/index.vue'
      )
  },
  /* 便民电话 */
  {
    path: '/pages/butler/convenience-phone/index',
    name: 'convenienceIndex',
    component: () =>
      import(
        /* webpackChunkName: "convenienceIndex" */
        '@/views/butler/convenience-phone/index.vue'
      )
  },
  /* 生活缴费 */
  {
    path: '/pages/butler/live-pay/index',
    name: 'livePayIndex',
    meta: {
      keepAlive: true
    },
    component: () =>
      import(
        /* webpackChunkName: "livePayIndex" */
        '@/views/butler/live-pay/index.vue'
      )
  },
  // 充值页面
  {
    path: '/pages/butler/live-pay/topUp',
    name: 'livePayTopUp',
    meta: {
      keepAlive: true
    },
    component: () =>
      import(
        /* webpackChunkName: "livePayTopUp" */
        '@/views/butler/live-pay/top-up.vue'
      )
  },
  /* 主要缴费页面 */
  {
    path: '/pages/butler/live-pay/mainPay',
    name: 'livemainPay',
    meta: {
      keepAlive: true
    },
    component: () =>
      import(
        /* webpackChunkName: "livemainPay" */
        '@/views/butler/live-pay/main-pay.vue'
      )
  },
  /* 其他费用缴费页面 */
  {
    path: '/pages/butler/live-pay/pay',
    name: 'livePayPay',
    meta: {
      keepAlive: true
    },
    component: () =>
      import(
        /* webpackChunkName: "livePayPay" */
        '@/views/butler/live-pay/pay.vue'
      )
  },
  // 缴费账单
  {
    path: '/pages/butler/live-pay/payBill',
    name: 'livePayPayBill',
    meta: {
      keepAlive: true
    },
    component: () =>
      import(
        /* webpackChunkName: "livePayPayBill" */
        '@/views/butler/live-pay/pay-bill.vue'
      )
  },
  /* 充缴记录 */
  {
    path: '/pages/butler/live-pay/record',
    name: 'livePayRecord',
    meta: {
      keepAlive: true
    },
    component: () =>
      import(
        /* webpackChunkName: "livePayRecord" */
        '@/views/butler/live-pay/record.vue'
      )
  },
  /* 缴费记录详情 */
  {
    path: '/pages/butler/live-pay/record-detail',
    name: 'livePayRecordDetail',
    component: () =>
      import(
        /* webpackChunkName: "livePayRecordDetail" */
        '@/views/butler/live-pay/record-detail.vue'
      )
  },
  /* 费用详情 */
  {
    path: '/pages/butler/live-pay/cost-detail',
    name: 'livePayCostDetail',
    component: () =>
      import(
        /* webpackChunkName: "livePayCostDetail" */
        '@/views/butler/live-pay/cost-detail.vue'
      )
  }
]

export default butlerRouter
