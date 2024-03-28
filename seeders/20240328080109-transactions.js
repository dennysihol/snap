
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('transactions', [{
      CompanyCode: "12345",
      CustomerNumber: "ABC0012300DEF",
      RequestID: "201507131507262221400000001975",
      InquiryStatus: "00",
      InquiryReason: JSON.stringify({ Indonesian: 'Sukses', English: 'Success' }),
      CustomerName: "Sihol",
      CurrencyCode: "IDR",
      TotalAmount: "150000.00",
      SubCompany: "00001",
      DetailBills: JSON.stringify([
        {
          BillDescription: {
            Indonesian: "Maintenance",
            English: "Maintenance"
          },
          BillAmount: "70000.00",
          BillNumber: "1234567890",
          BillSubCompany: "00001"
        },
        {
          BillDescription: {
            Indonesian: "Listrik",
            English: "Electric"
          },
          BillAmount: "50000.00",
          BillNumber: "1133557799",
          BillSubCompany: "00001"
        },
        {
          BillDescription: {
            Indonesian: "Air",
            English: "Water"
          },
          BillAmount: "30000.00",
          BillNumber: "2244668800",
          BillSubCompany: "00001"
        }
      ]),
      FreeTexts: JSON.stringify([
        {
          Indonesian: "Free Text 1",
          English: "Free Text 1"
        },
        {
          Indonesian: "Free Text 2",
          English: "Free Text 2"
        }
      ]),
      AdditionalData: JSON.stringify({}),
      PaymentFlagReason: JSON.stringify({}),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('transactions', null, {});
  }
};

