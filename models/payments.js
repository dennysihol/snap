'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payments.init({
    CompanyCode: DataTypes.STRING,
    CustomerNumber: DataTypes.STRING,
    RequestID: DataTypes.STRING,
    PaymentFlagStatus: DataTypes.STRING,
    PaymentFlagReason: DataTypes.JSON,
    CustomerName: DataTypes.STRING,
    CurrencyCode: DataTypes.STRING,
    PaidAmount: DataTypes.INTEGER,
    TotalAmount: DataTypes.INTEGER,
    TransactionDate: DataTypes.STRING,
    DetailBills: DataTypes.JSON,
    FreeTexts: DataTypes.JSON,
    AdditionalData: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payments',
  });
  return Payments;
};