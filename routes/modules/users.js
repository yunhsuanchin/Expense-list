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
router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.render('login', { errorMsg: ['All fields below are required.'] })
  }
  next()
}, passport.authenticate('local', {
  failureRedirect: '/users/login',
  successRedirect: '/',
  failureFlash: true,
  successFlash: true
}))

// route --> logout request
router.get('/logout', (req, res) => {
  req.flash('successMsg', `Bye bye ${req.user.name}, see you next time!`)
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
  const errorMsg = []
  if (!email || !password || !confirmPassword) {
    errorMsg.push(['Except for name, all fields below are required.'])
  }

  if (password !== confirmPassword) {
    errorMsg.push(['The password does not matched.'])
  }

  if (password.length < 8) {
    errorMsg.push(['Password should be at least 8 characters.'])
  }

  if (errorMsg.length) {
    return res.render('register', {
      name,
      email,
      password,
      confirmPassword,
      errorMsg
    })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        errorMsg.push(['This email has been registered.'])
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword,
          errorMsg
        })
      }

      bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))

        .then(() => next())
        .catch(err => console.error(err))
    })
}, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/register',
  successFlash: true
}))

module.exports = router
