/**
 * 性别
 * @param {String} value
 */
export function sexText(value) {
  const sex = {
    1: '男',
    2: '女'
  }
  return sex[value] || '-'
}

/**
 * 用户角色
 * @param {String} value
 */
export function houseRoleText(value) {
  const houseRole = {
    0: '访客',
    1: '业主',
    2: '业主成员',
    3: '租户',
    4: '租户成员'
  }
  return houseRole[value] || '-'
}

/**
 * 用户角色
 * @param {String} value
 */
export function houseRoleColor(value) {
  const houseRole = {
    0: '#EB5841',
    1: '#EB5841',
    2: '#FFA110',
    3: '#31B4B9',
    4: '#31B4B9',
    5: '#448FE4'
  }
  return houseRole[value] || '-'
}

/**
 * 真实姓名首字转为'*'
 * @param {String} value
 */
export function privacyName(value) {
  return value ?
    `${'*' + value.substring(1)}` :
    '-'
}
