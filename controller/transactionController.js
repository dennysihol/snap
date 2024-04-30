const { bca_transactions } = require ('../models/index')

class TransactionController {

    static async showTransaction(req, res, next){

            try {
                const { CompanyCode, CustomerNumber, RequestID, TransactionDate } = req.body;
            
                // Use Sequelize findOne
                const existingEntry = await bca_transactions.findOne({
                  where: {
                    CompanyCode : CompanyCode,
                    CustomerNumber: CustomerNumber,
                    RequestID: RequestID,
                    TransactionDate : TransactionDate
                  }
                });
            
                if (existingEntry) {
                    
                  return res.status(200).json({existingEntry});
                }
                res.status(404).json({ message: 'Data Not Found!' });
            
              } catch (err) {
                next(err)
              }
    }

}

module.exports = TransactionController