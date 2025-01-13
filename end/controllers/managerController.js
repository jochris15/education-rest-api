const { Game, Event, Manager } = require('../models')

class ManagerController {
    static async read(req, res) {
        try {
            const managers = await Manager.findAll({
                include: Game
            })

            res.status(200).json({
                message: "Succeed read manager",
                managers
            })
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}

module.exports = ManagerController