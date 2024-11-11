const { Game, Event, Manager } = require('../models')
class EventController {
    static async read(req, res) {
        try {
            const events = await Event.findAll({
                include: {
                    model: Game,
                    include: Manager
                }
            })

            res.status(200).json({
                message: 'Success read events',
                data: events
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }

    static async create(req, res) {
        try {
            const { name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, GameId } = req.body
            const event = await Event.create({ name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, GameId })

            res.status(201).json({
                message: "Success create new event",
                data: event
            })
        } catch (error) {
            console.log(error);
            let status = 500
            let message = 'Internal Server Error'

            if (error.name == 'SequelizeValidationError') {
                status = 400
                message = error.errors[0].message
            }

            if (error.name == 'SequelizeDatabaseError') {
                status = 400
                message = 'Invalid input'
            }

            if (error.name == 'SequelizeForeignKeyConstraintError') {
                status = 400
                message = 'Invalid input'
            }

            res.status(status).json({
                message
            })
        }
    }

    static async readDetail(req, res) {
        try {
            const { id } = req.params
            const event = await Event.findByPk(id)

            if (!event) {
                throw ({ name: "NotFound", id })
            }

            res.status(200).json({
                message: `Success read event with id ${event.id}`,
                data: event
            })
        } catch (error) {
            console.log(error);
            let status = 500
            let message = 'Internal Server Error'

            if (error.name == 'NotFound') {
                status = 404
                message = `Data with id ${error.id} not found`
            }

            res.status(status).json({
                message
            })
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params

            const event = await Event.findByPk(id)

            if (!event) {
                throw ({ name: "NotFound", id })
            }

            await event.destroy()

            res.status(200).json({
                message: `Success delete event with id ${id}`
            })
        } catch (error) {
            console.log(error);
            let status = 500
            let message = 'Internal Server Error'

            if (error.name == 'NotFound') {
                status = 404
                message = `Data with id ${error.id} not found`
            }

            res.status(status).json({
                message
            })
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params
            const event = await Event.findByPk(id)

            if (!event) {
                throw ({ name: "NotFound", id })
            }

            const { name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, GameId } = req.body

            await event.update({ name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, GameId })

            res.status(200).json({
                message: `Success edit event with id ${id}`,
                data: event
            })
        } catch (error) {
            console.log(error);
            let status = 500
            let message = 'Internal Server Error'

            if (error.name == 'SequelizeValidationError') {
                status = 400
                message = error.errors[0].message
            }

            if (error.name == 'SequelizeDatabaseError') {
                status = 400
                message = 'Invalid input'
            }

            if (error.name == 'SequelizeForeignKeyConstraintError') {
                status = 400
                message = 'Invalid input'
            }

            if (error.name == 'NotFound') {
                status = 404
                message = `Data with id ${error.id} not found`
            }

            res.status(status).json({
                message
            })
        }
    }

    static async updateStatus(req, res) {
        try {
            const { id } = req.params
            const event = await Event.findByPk(id)

            if (!event) {
                throw ({ name: "NotFound", id })
            }

            const { eventStatus } = req.body

            await event.update({ eventStatus })

            res.status(200).json({
                message: `Success edit event status with id ${id}`,
                status: event.eventStatus
            })
        } catch (error) {
            console.log(error);
            let status = 500
            let message = 'Internal Server Error'
            if (error.name == 'SequelizeValidationError') {
                status = 400
                message = error.errors[0].message
            }

            if (error.name == 'SequelizeDatabaseError') {
                status = 400
                message = 'Invalid input'
            }

            if (error.name == 'NotFound') {
                status = 404
                message = `Data with id ${error.id} not found`
            }

            res.status(status).json({
                message
            })
        }
    }
}

module.exports = EventController