const express = require('express')
const router = express.Router()
const gameRouter = require('./game')
const managerRouter = require('./manager')
const eventRouter = require('./event')

router.use("/games", gameRouter)
router.use("/managers", managerRouter)
router.use("/events", eventRouter)

module.exports = router