const express = require('express')
const router = express.Router()

router.post('/signup_check/username', (req, res) => {
  res.status(200).end()
})

router.post('/signup_check/email', (req, res) => {
  res.status(200).end()
})

router.post('/signup_check/password', (req, res) => {
  res.status(200).end()
})

module.exports = router