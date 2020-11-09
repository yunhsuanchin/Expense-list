const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')

// route --> go to login page
router.get('/login', (req, res) => {
  res.render('login')
})

// route --> login request
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/users/login',
  successRedirect: '/',
  failureFlash: true,
  successFlash: true
}))

// route --> logout request
router.get('/logout', (req, res) => {
  req.flash('success_msg', `Bye bye ${req.user.name}, see you next time!`)
  req.logout()
  res.redirect('/users/login')
})

// route --> go to register page
router.get('/register', (req, res) => {
  res.render('register')
})

// route --> register request
router.post('/register', (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) {
        req.flash('error_msg', 'This email has been registered.')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }
      if (password !== confirmPassword) {
        req.flash('error_msg', 'The password does not matched.')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }

      bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))

        .then(() => {
          console.log('next')
          return next()
        })
        .catch(err => console.error(err))
    })
}, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/register',
  successFlash: true
}))

module.exports = router
