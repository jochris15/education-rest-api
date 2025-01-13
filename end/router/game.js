const express = require('express')
const GameController = require('../controllers/gameController')
const router = express.Router()

router.get('/', GameController.read)

module.exports = router