const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

module.exports = [
  {
    name: '午餐',
    merchant: '春水堂',
    category: '餐飲食品',
    date: dayjs.utc('2019-7-9'),
    amount: 220
  },
  {
    name: '看電影',
    merchant: '華納威秀',
    category: '休閒娛樂',
    date: dayjs.utc('2020-8-12'),
    amount: 300
  },
  {
    name: '買牛奶',
    merchant: 'Costco',
    category: '餐飲食品',
    date: dayjs.utc('2019-9-7'),
    amount: 120
  },
  {
    name: '捷運',
    merchant: '捷運',
    category: '交通出行',
    date: dayjs.utc('2020-6-16'),
    amount: 35
  },
  {
    name: '買衣服',
    merchant: '新光三越',
    category: '家居物業',
    date: dayjs.utc('2020-10-1'),
    amount: 2180
  }
]
