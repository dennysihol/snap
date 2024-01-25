const errorHandler = (err, req, res, next) => {

    if(err.name == 'SequelizeValidationError'){
        let errors = []
        err.errors.forEach(e => {
            errors.push(e.massage)
        });
        res.status(400).json(
            {
                message: err.message,
                detail: errors
            }
        )
    } else if(err.code == 401){
        res.status(err.code).json({message: err.message})
    } else if(err.code == 404){
        res.status(err.code).json({message: err.message})
    } else if(err.code == 400){
        res.status(err.code).json({message: err.message})
    } else {
        res.status(500).json({message: err.message})
    }

}

module.exports = errorHandler