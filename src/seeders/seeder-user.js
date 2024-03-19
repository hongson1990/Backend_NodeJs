'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'xxxx.gmail.com',
      password: '123456',
      firstName: 'Nguyen',
      lastName: 'Son',
      address: 'VietName',
      phonenumber: '01696103036',
      gender: 1,
      image: 'sex',
      roleId: 'ROLE',
      positionId: '01696103036',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
