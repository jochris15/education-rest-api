const { Game, Event, Manager } = require('../models')

class GameController {
    static async read(req, res) {
        try {
            const games = await Game.findAll({
                include: [Event, Manager]
            })

            res.status(200).json({
                message: "Succeed read games",
                games
            })
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}

module.exports = GameController