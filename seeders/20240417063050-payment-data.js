
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('payments', [{
      CompanyCode: "12345",
      CustomerNumber: "ABC0012300DEF",
      RequestID: "201507131507262221400000001975",
      PaymentFlagStatus: "00",
      PaymentFlagReason: JSON.stringify({ Indonesian: 'Sukses', English: 'Success' }),
      CustomerName: "Customer BCA Virtual Account",
      CurrencyCode: "IDR",
      PaidAmount: "150000.00",
      TotalAmount: "100000.00",
      TransactionDate: "15/03/2014 22:07:40",
      DetailBills: JSON.stringify([]),
      FreeTexts: JSON.stringify([
        {
          Indonesian: "Free Text 1",
          English: "Free Text 1"
        },
        {
          Indonesian: "Free Text 2",
          English: "Free Text 2"
        },
      ]),
      AdditionalData: ""
    },
    {
      CompanyCode: "12340",
      CustomerNumber: "ABC0012300DEB",
      RequestID: "201507131507262221400000001977",
      PaymentFlagStatus: "00",
      PaymentFlagReason: JSON.stringify({ Indonesian: 'Sukses', English: 'Success' }),
      CustomerName: "Customer BCA Virtual Account",
      CurrencyCode: "IDR",
      PaidAmount: "150000.00",
      TotalAmount: "100000.00",
      TransactionDate: "15/03/2014 22:07:40",
      DetailBills: JSON.stringify([]),
      FreeTexts: JSON.stringify([
        {
          Indonesian: "Free Text 1",
          English: "Free Text 1"
        },
        {
          Indonesian: "Free Text 2",
          English: "Free Text 2"
        },
      ]),
      AdditionalData: ""
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('payments', null, {});
  }
};

