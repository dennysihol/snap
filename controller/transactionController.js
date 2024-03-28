const { Transaction } = require ('../models/index')

class TransactionController {

    static showTransaction(req, res, next){
        Transaction.findAll()
            .then((result) => {
                res.status(200).json({result})
            }).catch((err) => {
                next(err)
            });
    }

}

module.exports = TransactionController