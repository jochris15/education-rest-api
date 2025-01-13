const express = require('express')
const ManagerController = require('../controllers/managerController')
const router = express.Router()

router.get('/', ManagerController.read)

module.exports = router