const { Game, Event, Manager } = require('../models')

class GameController {
    static async read(req, res) {
        try {
            const games = await Game.findAll({
                include: [Event, Manager]
            })

            res.status(200).json({
                message: 'Success read games',
                data: games
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }

}

module.exports = GameController