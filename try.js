const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

const day = dayjs.utc('2019-7-9')
console.log(day)
