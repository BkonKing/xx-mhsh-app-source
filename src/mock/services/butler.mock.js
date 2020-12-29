import Mock from 'mockjs'

// 获取缴费列表
const lifePayList = () => {
  return {
    code: '200',
    success: true,
    message: 'OK',
    month_name_text: '还需缴费¥222（本月¥201，往月¥21）',
    table_data: [
      {
        common_money: 201,
        already_money: 0,
        stay_money: 201,
        child: [
          {
            id: '36',
            genre_name: '物业费',
            genre_icon: 'http://xxxx.com/upload/image/20201203/20201203151548_94644.png',
            money: 201,
            order_status: '0',
            order_status_name: '待缴费'
          }
        ],
        month_name: '本月'
      },
      {
        common_money: 21,
        already_money: 0,
        stay_money: 21,
        child: [
          {
            id: '39',
            genre_name: '物业费',
            genre_icon: 'http://xxxx.com/upload/image/20201203/20201203151548_94644.png',
            money: 21,
            order_status: '0',
            order_status_name: '待缴费'
          }
        ],
        month_name: '2020-11'
      }
    ],
    data: [
      {
        project_name: '五凤兰庭',
        fc_info: '测试1栋1单元201室',
        project_id: '1',
        house_id: '1296',
        expenses_house_id: '10'
      },
      {
        project_name: '五凤兰庭',
        fc_info: '233栋B单元606室',
        project_id: '1',
        house_id: '13397',
        expenses_house_id: '12'
      },
      {
        project_name: '五凤兰庭',
        fc_info: '3号楼5单元202室',
        project_id: '1',
        house_id: '13396',
        expenses_house_id: '11'
      }
    ]
  }
}

const choiceLifePayList = () => {
  return {
    code: '200',
    success: true,
    message: 'OK',
    z_stay_money: 222,
    month_name_text: '还需缴费¥222（往月¥21，本月¥201）',
    table_data: [
      {
        stay_money: 21,
        child: [
          {
            id: '39',
            project_genre_id: '3',
            is_force: '0',
            genre_id: '3',
            genre_name: '物业费',
            genre_icon: 'http://xx.com/upload/image/20201203/20201203151548_94644.png',
            money: 21,
            order_status: '0',
            order_status_name: '待缴费'
          }
        ],
        month_name: '2020-11',
        common_money: 21
      },
      {
        stay_money: 201,
        child: [
          {
            id: '36',
            project_genre_id: '3',
            is_force: '0',
            genre_id: '3',
            genre_name: '物业费',
            genre_icon: 'http://xx.com/upload/image/20201203/20201203151548_94644.png',
            money: 201,
            order_status: '0',
            order_status_name: '待缴费'
          }
        ],
        month_name: '本月'
      }
    ]
  }
}

const feeDetails = () => {
  return {
    code: '200',
    success: true,
    message: 'OK',
    data: {
      genre_id: '3',
      genre_name: '物业费',
      icon: 'http://meihaoshenghuo.com//upload/image/20201203/20201203151548_94644.png',
      house_property_name: '五凤兰庭 1号楼-1单元-201室',
      account_numb: null,
      realname: '郑先生',
      surface: null,
      time: '2020-11-15~2020-12-15',
      disparity: '0',
      pic: false,
      money: 201,
      violations_money: 0,
      order_status: '0'
    }
  }
}

Mock.mock(/\/live\/live\/lifepay_list/, 'post', lifePayList)
Mock.mock(/\/live\/live\/choice_lifepay_list/, 'post', choiceLifePayList)
Mock.mock(/\/live\/live\/fee_details/, 'post', feeDetails)
