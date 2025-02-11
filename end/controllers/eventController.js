const { Game, Event, Manager } = require('../models')

class EventController {
    static async read(req, res) {
        try {
            const events = await Event.findAll({
                include: {
                    model: Game,
                    include: {
                        model: Manager,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })

            res.status(200).json({
                message: "Succeed read events",
                data: events
            })
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async create(req, res) {
        try {
            const { name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, GameId } = req.body

            const event = await Event.create({ name, description, totalPrize, eventPoster, eventDate, eventType, eventStatus, GameId })

            delete event.dataValues.createdAt
            delete event.dataValues.updatedAt

            res.status(201).json({
                message: "Succeed create new data",
                data: event
            })
        } catch (error) {
            let message = "Internal server error"
            let status = 500

            console.log(error);

            if (error.name === "SequelizeValidationError") {
                message = error.errors[0].message
                status = 400
            }

            if (error.name === "SequelizeDatabaseError") {
                message = "Invalid data type"
                status = 400
            }

            res.status(status).json({
                message
            })
        }
    }

    static async readById(req, res) {
        try {
            const { id } = req.params
            const event = await Event.findByPk(id, {
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })

            if (!event) throw { name: "NotFound" }

            res.status(200).json({
                message: "Succeed read data detail",
                data: event
            })
        } catch (error) {
            let message = "Internal server error"
            let status = 500

            if (error.name === 'NotFound') {
                message = "Data not found"
                status = 404
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

            if (!event) throw { name: "NotFound" }

            await event.destroy()

            res.status(200).json({
                message: "Delete succeed",
                event
            })
        } catch (error) {
            let message = "Internal server error"
            let status = 500

            if (error.name === 'NotFound') {
                message = "Data not found"
                status = 404
            }

            res.status(status).json({
                message
            })
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params

            const event = await Event.findByPk(id, {
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })

            if (!event) throw { name: "NotFound" }

            const { name, description, totalPrize, eventPoster, eventDate, eventType, GameId } = req.body

            await event.update({ name, description, totalPrize, eventPoster, eventDate, eventType, GameId })

            res.status(200).json({
                message: "update succeed",
                data: event
            })
        } catch (error) {
            let message = "Internal server error"
            let status = 500

            if (error.name === "SequelizeValidationError") {
                message = error.errors[0].message
                status = 400
            }

            if (error.name === "SequelizeDatabaseError") {
                message = "Invalid data type"
                status = 400
            }

            if (error.name === 'NotFound') {
                message = "Data not found"
                status = 404
            }

            res.status(status).json({
                message
            })
        }
    }

    static async updateStatus(req, res) {
        try {
            const { id } = req.params

            const event = await Event.findByPk(id, {
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })

            if (!event) throw { name: "NotFound" }

            const { eventStatus } = req.body

            await event.update({ eventStatus })

            res.status(200).json({
                message: "update status succeed",
                status: event.eventStatus
            })
        } catch (error) {
            let message = "Internal server error"
            let status = 500

            if (error.name === "SequelizeValidationError") {
                message = error.errors[0].message
                status = 400
            }

            if (error.name === "SequelizeDatabaseError") {
                message = "Invalid data type"
                status = 400
            }

            if (error.name === 'NotFound') {
                message = "Data not found"
                status = 404
            }

            res.status(status).json({
                message
            })
        }
    }
}

module.exports = EventController