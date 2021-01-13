export default {
  orderStatusText (status) {
    const text = ['', '超时未缴', '已缴费']
    return text[status]
  },
  payTypeText (type) {
    const text = ['水费', '电费', '燃气费', '水电公摊费']
    return text[type]
  },
  payTypeIcon (type) {
    const icon = [
      'tf-icon-shuifei',
      'tf-icon-dianfei',
      'tf-icon-ranqifei',
      'tf-icon-gongtanfei'
    ]
    return icon[type] || 'tf-icon-qitajiaofei'
  },
  dateText (val) {
    const date = new Date(val || new Date())
    const year = date.getFullYear()
    const currentYear = new Date().getFullYear()
    const month = date.getMonth() + 1
    const currentMonth = new Date().getMonth() + 1
    if (currentYear === year && currentMonth === month) {
      return '本月'
    }
    return `${date.getFullYear()}年${date.getMonth() + 1}月`
  }
}
