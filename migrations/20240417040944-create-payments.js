'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bca_payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CompanyCode: {
        type: Sequelize.STRING
      },
      CustomerNumber: {
        type: Sequelize.STRING
      },
      RequestID: {
        type: Sequelize.STRING
      },
      PaymentFlagStatus: {
        type: Sequelize.STRING
      },
      PaymentFlagReason: {
        type: Sequelize.JSON
      },
      CustomerName: {
        type: Sequelize.STRING
      },
      CurrencyCode: {
        type: Sequelize.STRING
      },
      PaidAmount: {
        type: Sequelize.INTEGER
      },
      TotalAmount: {
        type: Sequelize.INTEGER
      },
      TransactionDate: {
        type: Sequelize.STRING
      },
      DetailBills: {
        type: Sequelize.JSON
      },
      FreeTexts: {
        type: Sequelize.JSON
      },
      AdditionalData: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('bca_payments');
  }
};