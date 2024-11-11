const { Game, Manager } = require('../models')

class ManagerController {
    static async read(req, res) {
        try {
            const managers = await Manager.findAll({
                include: Game
            })

            res.status(200).json({
                message: 'Success read managers',
                data: managers
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }

}

module.exports = ManagerController