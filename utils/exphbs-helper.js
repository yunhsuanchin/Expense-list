const dayjs = require('dayjs')

module.exports = {
  if_equal (oldValue, newValue, option) {
    if (oldValue === newValue) {
      return option.fn(this)
    }
  },
  getFullDate (date) {
    return dayjs(date).format('YYYY-MM-DD')
  },
  getYearAndMonth (date) {
    return dayjs(date).format('YYYY-MM')
  }
}
