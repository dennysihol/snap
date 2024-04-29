const { bca_payments } = require ('../models/index')

class PaymentController {

    static async showPayments(req, res, next){
        // Transaction.findAll()
        //     .then((result) => {
        //         res.status(200).json({result})
        //     }).catch((err) => {
        //         next(err)
        //     });
            try {
                const { CompanyCode, CustomerNumber, RequestID } = req.body;
            
                // Use Sequelize findOne
                const existingEntry = await bca_payments.findOne({
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

module.exports = PaymentController