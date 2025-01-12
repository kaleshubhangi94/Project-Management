module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('projects', 'ownerId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users', // The table name of the User model
        key: 'id',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projects', 'ownerId');
  },
};
