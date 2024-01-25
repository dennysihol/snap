module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'joni',
      lastName: 'Dou',
      email: 'joni@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Joko',
      lastName: 'Doen',
      email: 'joko@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'josi',
      lastName: 'Doer',
      email: 'josi@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};