'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ideas', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      area_of_interest: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'id',
        },
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ideas');
  }
};