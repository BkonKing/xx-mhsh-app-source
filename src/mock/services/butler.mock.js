// 获取缴费列表
export const lifePayList = [
  /\/live\/live\/lifepay_list/,
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    month_name_text: '还需缴费¥222（本月¥201，往月¥21）',
    table_data: [{
      common_money: 201,
      already_money: 0,
      stay_money: 201,
      child: [{
        id: '36',
        genre_name: '物业费',
        genre_icon: 'http://xxxx.com/upload/image/20201203/20201203151548_94644.png',
        money: 201,
        order_status: '0',
        order_status_name: '待缴费'
      }],
      month_name: '本月'
    },
    {
      common_money: 21,
      already_money: 0,
      stay_money: 21,
      child: [{
        id: '39',
        genre_name: '物业费',
        genre_icon: 'http://xxxx.com/upload/image/20201203/20201203151548_94644.png',
        money: 21,
        order_status: '0',
        order_status_name: '待缴费'
      }],
      month_name: '2020-11'
    }
    ],
    data: [{
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
]

export const choiceLifePayList = [
  /\/live\/live\/fee_details/,
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    z_stay_money: 222,
    month_name_text: '还需缴费¥222（往月¥21，本月¥201）',
    table_data: [{
      stay_money: 21,
      child: [{
        id: '39',
        project_genre_id: '3',
        is_force: '0',
        genre_id: '3',
        genre_name: '物业费',
        genre_icon: 'http://xx.com/upload/image/20201203/20201203151548_94644.png',
        money: 21,
        order_status: '0',
        order_status_name: '待缴费'
      }],
      month_name: '2020-11',
      common_money: 21
    },
    {
      stay_money: 201,
      child: [{
        id: '36',
        project_genre_id: '3',
        is_force: '0',
        genre_id: '3',
        genre_name: '物业费',
        genre_icon: 'http://xx.com/upload/image/20201203/20201203151548_94644.png',
        money: 201,
        order_status: '0',
        order_status_name: '待缴费'
      }],
      month_name: '本月'
    }
    ]
  }
]

export const feeDetails = [
  /\/live\/live\/fee_details/,
  'post',
  {
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
]

export const lifePayRecord = [
  /\/live\/live\/lifepay_record_list/,
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: [{
      already_money: 201,
      child: [{
        id: '36',
        project_genre_id: '3',
        genre_id: '3',
        genre_name: '物业费',
        genre_icon: 'http://meihaoshenghuo.com//upload/image/20201203/20201203151548_94644.png',
        money: 201,
        pay_time: '1970-01-01 08:00:00',
        order_status: '2',
        order_status_name: '已缴费'
      }],
      month_name: '2020-12'
    }]
  }
]

export const paymentDetails = [
  /\/live\/live\/payment_details/,
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: {
      id: '36',
      genre_id: '3',
      genre_name: '物业费',
      icon: 'http://meihaoshenghuo.com//upload/image/20201203/20201203151548_94644.png',
      house_property_name: '五凤兰庭 1号楼-1单元-201室',
      account_numb: null,
      realname: '郑先生',
      days_time: '2020-12',
      time: '2020-11-15~2020-12-15',
      order_numb: '132012231423450102049',
      pay_time: '2020-12-25 08:00:00'
    }
  }
]

export const hydropowerList = [
  /\/live\/thing\/hydropower_list/,
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    month_record_list: [{
      project_month_id: '3',
      building_id: '7',
      count: '1',
      building_name: '7栋栋栋栋栋栋栋栋栋栋栋',
      w_icon: 'http://meihaoshenghuo.com/upload/image/20201203/20201203151548_94644.png',
      e_icon: 'http://meihaoshenghuo.com/upload/image/20201203/20201203151548_94644.png'
    }],
    record_state: [{
      text: '全部(8)',
      value: '全部'
    },
    {
      text: '已完成(4)',
      value: '已完成'
    },
    {
      text: '未完成(4)',
      value: '未完成'
    },
    {
      text: '未抄水表(2)',
      value: '未抄水表'
    },
    {
      text: '未抄电表(3)',
      value: '未抄电表'
    }
    ],
    month_list: [{
      id: '1',
      setmeal_days: '2020-12',
      days_time: '1606752000',
      is_water_fee: '1',
      is_water_bill: '1',
      is_electric_fee: '1',
      is_electric_bill: '1',
      days_time_name: '2020年12月'
    },
    {
      id: '3',
      setmeal_days: '2020-10',
      days_time: '1601481600',
      is_water_fee: '1',
      is_water_bill: '0',
      is_electric_fee: '1',
      is_electric_bill: '0',
      days_time_name: '2020年10月'
    }
    ]
  }
]

export const houseList = [
  /\/live\/thing\/choose_house_list/,
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    unit_data: [{
      text: '全部（3）',
      value: 0
    },
    {
      text: '7单元（3）',
      value: '8'
    }
    ],
    month_record_list: [{
      id: '16',
      unit_id: '1',
      house_id: '8',
      is_water_fee: '1',
      is_electric_fee: '1',
      disparity_water: '0',
      disparity_electric: '0',
      unit_house_name: '1单元-101室',
      w_icon: 'http://xxxx.com/sf/cccccccgggggg.png',
      e_icon: 'http://xxxx.com/df/cccccccgggggg.png'
    }],
    record_state: [{
      text: '全部(8)',
      value: '全部'
    },
    {
      text: '已完成(4)',
      value: '已完成'
    },
    {
      text: '未完成(4)',
      value: '未完成'
    },
    {
      text: '未抄水表(2)',
      value: '未抄水表'
    },
    {
      text: '未抄电表(3)',
      value: '未抄电表'
    }
    ]
  }
]

export const monthRecordJson = [
  /\/live\/thing\/getMonthRecordJson/,
  'post',
  {
    code: '200',
    success: true,
    message: '成功！',
    timestamp: 1609147516732,
    data: {
      id: 20,
      house_property_name: '7栋-7单元-502',
      errors_digit: 1000,
      record: parseInt(Math.random() * 1000 + 1, 10) + '',
      old_record: '000050',
      old_record_time: '10-01',
      pic: ''
    }
  }
]

export const editRecord = [
  /\/live\/thing\/editRecord/,
  'post',
  {
    code: '200',
    success: true,
    message: '成功'
  }
]
