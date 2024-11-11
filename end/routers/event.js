const express = require('express')
const EventController = require('../controllers/eventController')
const router = express.Router()

router.get('/', EventController.read)
router.post('/', EventController.create)
router.get('/:id', EventController.readDetail)
router.delete('/:id', EventController.delete)
router.put('/:id', EventController.update)
router.patch('/:id', EventController.updateStatus)


module.exports = router