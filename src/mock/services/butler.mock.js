import Mock from 'mockjs'
import { builder } from '../util'

// 获取缴费列表
const lifePayList = () => {
  return builder({
    code: '200',
    success: true,
    message: 'OK',
    data: []
  }, '', 200)
}

Mock.mock(/\/live\/live\/lifepay_list/, 'post', lifePayList)
