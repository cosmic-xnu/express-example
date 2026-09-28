const express = require('express')
const router = express.Router()

// api routes
{
    router.use(require('./routes/account'))
}

module.exports = router
