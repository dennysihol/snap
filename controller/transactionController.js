const { Transaction } = require ('../models/index')

class TransactionController {

    static async showTransaction(req, res, next){
        // Transaction.findAll()
        //     .then((result) => {
        //         res.status(200).json({result})
        //     }).catch((err) => {
        //         next(err)
        //     });
            try {
                const { CompanyCode, CustomerNumber, RequestID } = req.body;
            
                // Use Sequelize findOne
                const existingEntry = await Transaction.findOne({
                  where: {
                    CompanyCode : CompanyCode,
                    CustomerNumber: CustomerNumber,
                    RequestID: RequestID
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