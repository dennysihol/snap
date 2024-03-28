"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init(
    {
      CompanyCode: DataTypes.STRING,
      CustomerNumber: DataTypes.STRING,
      RequestID: DataTypes.STRING,
      InquiryStatus: DataTypes.STRING,
      InquiryReason: DataTypes.JSON,
      CustomerName: DataTypes.STRING,
      CurrencyCode: DataTypes.STRING,
      TotalAmount: DataTypes.STRING,
      SubCompany: DataTypes.STRING,
      DetailBills: DataTypes.STRING,
      FreeTexts: DataTypes.STRING,
      AdditionalData: DataTypes.JSON,
      PaymentFlagStatus: DataTypes.STRING,
      PaymentFlagReason: DataTypes.JSON,
      PaidAmount: DataTypes.INTEGER,
      TotalAmount: DataTypes.INTEGER,
      TransactionDate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
