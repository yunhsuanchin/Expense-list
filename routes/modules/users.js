const express = require('express')
const router = express.Router()
const passport = require('passport')

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

// route --> go to register page
router.get('/register', (req, res) => {
  res.render('register')
})

// route --> register request
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('This email has been registered.')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }
      if (password !== confirmPassword) {
        console.log('The password does not matched.')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }

      User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
})

module.exports = router
