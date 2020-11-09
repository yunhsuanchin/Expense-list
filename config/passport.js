const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
  // Middleware
  app.use(passport.initialize())
  app.use(passport.session())

  // Strategies
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'This email has not been registered.' })
        }

        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, { message: 'The password is incorrect.' })
            }
            return done(null, user, { message: 'Welcome!' })
          })
      })
      .catch(err => done(err))
  }))

  // Sessions
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err))
  })
}
