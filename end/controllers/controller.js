const { Game, Event, Manager } = require('../models')
class Controller {
    static async readGames(req, res) {
        try {
            const games = await Game.findAll()

            res.status(200).json({
                message: 'Success read games',
                games
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }

    static async readManagers(req, res) {
        try {
            const managers = await Manager.findAll()

            res.status(200).json({
                message: 'Success read managers',
                managers
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }

    static async readEvents(req, res) {
        try {
            const events = await Event.findAll()

            res.status(200).json({
                message: 'Success read events',
                events
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }

    static async addEvents(req, res) {
        try {
            const { name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, GameId } = req.body
            const event = await Event.create({ name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, GameId })

            res.status(201).json({
                message: "Success create new event",
                event
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

    static async readDetailEvent(req, res) {
        try {
            const { id } = req.params
            const event = await Event.findByPk(id)

            if (!event) {
                throw ({ name: "NotFound", id })
            }

            res.status(200).json({
                message: `Success read event with id ${event.id}`,
                event
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

    static async deleteEvent(req, res) {
        try {
            const { id } = req.params

            const event = await Event.findByPk(id)

            if (!event) {
                throw ({ name: "NotFound", id })
            }

            await Event.destroy({
                where: {
                    id
                }
            })

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

    static async editEvent(req, res) {
        try {
            const { id } = req.params
            const event = await Event.findByPk(id)

            if (!event) {
                throw ({ name: "NotFound", id })
            }

            const { name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, GameId } = req.body

            await Event.update({ name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, GameId }, {
                where: {
                    id
                }
            })

            res.status(200).json({
                message: `Success edit event with id ${id}`
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

            await Event.update({ eventStatus }, {
                where: {
                    id
                }
            })

            res.status(200).json({
                message: `Success edit event with id ${id}`
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

module.exports = Controller