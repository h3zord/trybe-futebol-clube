'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        type: Sequelize.STRING(30),
        allowNull: false,
        field: 'team_name',
      }
    })
  },

  down: async (queryInterface, _Sequelize) => {
   await queryInterface.dropTable('teams')
  }
};
