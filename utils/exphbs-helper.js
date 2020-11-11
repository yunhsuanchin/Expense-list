const dayjs = require('dayjs')

module.exports = {
  if_equal (oldValue, newValue, option) {
    if (oldValue === newValue) {
      return option.fn(this)
    }
  },
  dateFormat (date) {
    return dayjs(date).format('YYYY-MM-DD')
  }
}
