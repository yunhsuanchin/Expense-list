if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const User = require('../user')

const users = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  Promise.all([User.deleteMany()])
    .then(() => {
      Promise.all(users.map(user => {
        return bcrypt.genSalt(10)
          .then(salt => bcrypt.hash(user.password, salt))
          .then(hash => User.create({
            name: user.name,
            email: user.email,
            password: hash
          }))
      }))
        .then(() => {
          console.log('Done for userSeeder creation.')
          process.exit()
        })
        .catch(err => console.error(err))
    })
})
