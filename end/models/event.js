'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.Game, { foreignKey: "GameId" })
    }
  }
  Event.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name required"
        },
        notNull: {
          msg: "Name required"
        }
      }
    },
    description: DataTypes.TEXT,
    totalPrize: DataTypes.STRING,
    eventPoster: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    eventType: DataTypes.STRING,
    eventStatus: DataTypes.STRING,
    GameId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};