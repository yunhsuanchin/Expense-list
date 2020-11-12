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
  getNumberFormat (num) {
    let result = ''
    num = (num || 0).toString()
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`
      num = num.slice(0, num.length - 3)
    }
    if (num) { result = num + result }
    return result
  }
}
