const express = require('express')
const Question = require('../models/question')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()
router.get('/questions', (req, res, next) => {
  Question.find({}, (err, data) => {
    if (err) {
      next(new Error('Data not found'))
    } else {
      res.send(data)
    }
  })
})

router.post('/questions/add', isAuthenticated, (req, res, next) => {
  const { questionText } = req.body
  const author = req.session.username
  const answer = ''
  Question.create({ questionText, answer, author }, (err, data) => {
    if (err) {
      next(new Error('Could not add data'))
    } else {
      res.send('question is created')
    }
  })
})

router.post('/questions/answer', isAuthenticated, (req, res, next) => {
  const { _id, answer } = req.body
  Question.findOneAndUpdate({ _id }, { answer }, { useFindAndModify: false }, (err, data) => {
    if (err) {
      next(new Error('Could not answer question'))
    } else {
      res.send('question is answered')
    }
  })
})

module.exports = router
