'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
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
  Manager.init({
    name: DataTypes.STRING,
    GameId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Manager',
  });
  return Manager;
};