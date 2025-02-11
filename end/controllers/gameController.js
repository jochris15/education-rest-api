const { Game, Event, Manager } = require('../models')

class GameController {
    static async read(req, res) {
        try {
            const games = await Game.findAll({
                include: [
                    {
                        model: Event,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    },
                    {
                        model: Manager,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    }
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })

            res.status(200).json({
                message: "Succeed read games",
                data: games
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