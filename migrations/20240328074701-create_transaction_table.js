"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("bca_transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CompanyCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CustomerNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      RequestID: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      InquiryStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      InquiryReason: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      CustomerName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CurrencyCode: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [1, 3]
        }
      },
      SubCompany: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      DetailBills: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      FreeTexts: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      AdditionalData: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      PaymentFlagStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      PaymentFlagReason: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      PaidAmount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      TotalAmount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      TransactionDate: {
        type: Sequelize.STRING,
        allowNull: false,
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

  down : (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('bca_transactions');
  },
};
