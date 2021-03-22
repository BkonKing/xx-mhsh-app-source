// 获取房屋数据
export const houseLiveList = [
  /\/live\/new_live\/house_list/,
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: [{
      project_name: '武夷绿洲',
      fc_info: '1号楼1单元101室',
      project_id: '2',
      house_id: '15738',
      expenses_house_id: 1
    },
    {
      project_name: '五凤兰庭',
      fc_info: '测试2栋1单元1101室',
      project_id: '1',
      house_id: '1298',
      expenses_house_id: 2
    },
    {
      project_name: '五凤兰庭',
      fc_info: '1号楼1单元1801室',
      project_id: '1',
      house_id: '15737',
      expenses_house_id: '8557'
    }
    ]
  }
]

// 获取缴费列表
export const lifePayList = [
  /\/live\/new_live\/lifepay_list/,
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    force_text: '',
    data: [{
      qf_money: 0,
      genre_name: '水费',
      genre_type: 1,
      genre_icon: 'http://192.168.1.147/upload/image/20210115/20210115195107_99550.svg',
      balance: 2,
      z_balance: 2
    },
    {
      qf_money: 13,
      genre_name: '其他费用',
      genre_type: 4,
      genre_icon: 'http://192.168.1.147/upload/image/20210115/20210115195207_60447.svg',
      balance: 0,
      z_balance: 13
    },
    {
      qf_money: -1,
      genre_name: '电费',
      genre_type: 2,
      genre_icon: 'http://192.168.1.147/upload/image/20210115/20210115195119_97692.svg',
      balance: 0,
      z_balance: -1
    },
    {
      qf_money: 0,
      genre_name: '燃气费',
      genre_type: 3,
      genre_icon: 'http://192.168.1.147/upload/image/20210115/20210115195155_60425.svg',
      balance: 0,
      z_balance: 0
    }
    ]
  }
]

export const choiceLifePayList = [
  /\/live\/new_live\/choice_lifepay_list/,
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    table_data: [{
      stay_money: 3,
      already_money: 0,
      month_name: '2020-08',
      child: [{
        id: '61',
        project_genre_id: '3',
        is_force: '0',
        genre_id: '4',
        genre_name: '物业费',
        genre_icon: 'http://192.168.1.147/upload/image/20210115/20210115195145_87070.svg',
        money: 3,
        order_status: '0',
        order_status_name: '待缴费'
      }]
    },
    {
      stay_money: 40,
      already_money: 0,
      month_name: '2020-09',
      child: [{
        id: '63',
        project_genre_id: '3',
        is_force: '0',
        genre_id: '4',
        genre_name: '物业费',
        genre_icon: 'http://192.168.1.147/upload/image/20210115/20210115195145_87070.svg',
        money: 40,
        order_status: '0',
        order_status_name: '待缴费'
      }]
    }
    ]
  }
]

export const feeDetails = [
  /\/live\/new_live\/fee_details/,
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: {
      id: '55',
      genre_id: '1',
      genre_name: '水费',
      icon: 'http://192.168.1.147/upload/image/20210115/20210115195107_99550.svg',
      house_property_name: '五凤兰庭 1号楼-1单元-1801室',
      realname: '郑先生',
      time: '2021-03-01~2021-03-31',
      qf_money: 0,
      money: 0.33,
      violations_money: 1,
      pay_money: 0.33,
      order_status: 1,
      surface: '1',
      account_numb: 'wwww',
      disparity: '21（单位）',
      pic: ''
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

export const rechargeJson = [
  /\/live\/new_live\/recharge_json/,
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: {
      project_name: '五凤兰庭',
      genre_name: '水费',
      genre_icon: 'http://192.168.1.147/upload/image/20210115/20210115195107_99550.svg',
      realname: '郑先生',
      house_property_name: '1号楼-1单元-1801室',
      account_numb: 'wwww',
      z_balance: -1.07
    }
  }
]

export const genreBillList = [
  /\/live\/new_live\/genre_bill_list/,
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: {
      genre_name: '其他费用',
      zz_qf_money: 1,
      zz_yj_money: 13,
      list: [{
        name: '2021年01月',
        z_qf_money: 0,
        z_yj_money: 13,
        child: [{
          id: '55',
          genre_id: '7',
          pay_money: 5,
          qf_money: 0,
          order_status: '2',
          name: '垃圾清运费'
        },
        {
          id: '56',
          genre_id: '6',
          pay_money: 8,
          qf_money: 1,
          order_status: '1',
          name: '水电公摊费'
        }
        ]
      }]
    }
  }
]

export const monthList = [
  /\/live\/new_live\/month_list/,
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: [{
      text: '全部',
      value: ''
    },
    {
      text: '2021年03月',
      value: '2021年03月'
    }
    ]
  }
]

export const genreList = [
  /\/live\/new_live\/genre_list/,
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    genre_id_data: [{
      text: '全部',
      value: ''
    },
    {
      text: '水费',
      value: '1'
    },
    {
      text: '物业费',
      value: '4'
    },
    {
      text: '电费',
      value: '2'
    },
    {
      text: '燃气费',
      value: '3'
    },
    {
      text: '电梯费',
      value: '5'
    },
    {
      text: '水电公摊费',
      value: '6'
    },
    {
      text: '垃圾清运费',
      value: '7'
    }
    ],
    genre_type_data: [{
      text: '全部',
      value: ''
    },
    {
      text: '水费',
      value: '1'
    },
    {
      text: '电费',
      value: '2'
    },
    {
      text: '燃气费',
      value: '3'
    },
    {
      text: '其他费用',
      value: 4
    }
    ]
  }
]

export const payLogList = [
  /\/live\/new_live\/pay_log_list/,
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: [
      {
        month_name: '2021年03月',
        z_recharge: 0,
        z_renew: 53.93,
        list: [
          {
            id: '178',
            bill_type: '2',
            genre_type: '4',
            genre_id: '4',
            money: 40,
            balance: 0,
            pay_time: '2021-03-17 11:02:26',
            name: '缴费-物业费'
          }
        ]
      }
    ]
  }
]

export const payLogDetails = [
  /\/live\/new_live\/pay_log_details/,
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: {
      id: '165',
      bill_type: 1,
      genre_type: '4',
      genre_id: '6',
      money: '8.00',
      balance: '0.00',
      payable: '8.00',
      pay_time: '2021-03-16 09:58:23',
      realname: '郑先生',
      mobile: '15959063868',
      genre_icon: 'http://192.168.1.147/upload/image/20210115/20210115195217_94713.svg',
      genre_name: '缴费 - 水电公摊费',
      house_property_name: '1号楼-1单元-1801室',
      project_name: '五凤兰庭',
      account_numb: '',
      owner_name: '郑先生',
      days_time: '2021-01',
      setmeal_days: '2021-01-01~2021-01-31'
    }
  }
]
