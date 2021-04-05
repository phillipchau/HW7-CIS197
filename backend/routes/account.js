const express = require('express')

const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body
  User.create({ username, password }, (err, data) => {
    if (err) {
      next(new Error('Failed to signup'))
    } else {
      req.session.username = username
      req.session.password = password
      res.send(`user ${username} is created`)
    }
  })
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  User.findOne({ username, password }, (err, user) => {
    if (err) {
      next(new Error('Failed to Login'))
    } else if (user) {
      req.session.username = username
      req.session.password = password
      res.send('logged in')
    } else {
      next(new Error('Login not valid'))
    }
  })
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = ''
  req.session.password = ''
  res.send('user logged out')
})

router.get('/logstatus', (req, res) => {
  res.send({ user: req.session.username })
})

module.exports = router
