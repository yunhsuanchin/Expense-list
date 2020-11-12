const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
  // Middleware
  app.use(passport.initialize())
  app.use(passport.session())

  // Local Strategies
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('errorMsg', 'This email has not been registered.'))
        }

        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, req.flash('errorMsg', 'The password is incorrect.'))
            }
            return done(null, user, req.flash('successMsg', `Hey ${user.name}, welcome!`))
          })
      })
      .catch(err => done(err))
  }))

  // Facebook Strategies
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName'],
    passReqToCallback: true
  }, (req, accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) {
          return done(null, user, req.flash('successMsg', `Hey ${user.name}, welcome back!`))
        }

        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt.genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user, req.flash('successMsg', `Nice to meet you, ${user.name}!`)))
          .catch(err => done(err))
      })
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
