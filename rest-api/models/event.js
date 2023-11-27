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
      this.belongsTo(models.Game, { foreignKey: 'GameId' })
    }
  }
  Event.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name required"
        },
        notEmpty: {
          msg: "Name required"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description required"
        },
        notEmpty: {
          msg: "Description required"
        }
      }
    },
    totalPrize: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "totalPrize required"
        },
        notEmpty: {
          msg: "totalPrize required"
        }
      }
    },
    eventPoster: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Poster required"
        },
        notEmpty: {
          msg: "Poster required"
        }
      }
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Date required"
        },
        notEmpty: {
          msg: "Date required"
        }
      }
    },
    eventType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Type required"
        },
        notEmpty: {
          msg: "Type required"
        }
      }
    },
    eventStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Status required"
        },
        notEmpty: {
          msg: "Status required"
        }
      }
    },
    GameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Game required"
        },
        notEmpty: {
          msg: "Game required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};