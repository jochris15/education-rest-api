'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      totalPrize: {
        type: Sequelize.STRING
      },
      eventPoster: {
        type: Sequelize.STRING
      },
      eventDate: {
        type: Sequelize.DATE
      },
      eventType: {
        type: Sequelize.STRING
      },
      eventStatus: {
        type: Sequelize.STRING
      },
      GameId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Games",
          key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};