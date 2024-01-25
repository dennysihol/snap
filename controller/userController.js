const {User} = require ('../models/index')

class UserController {

    static showUsers(req, res, next){
        User.findAll()
            .then((result) => {
                res.status(200).json({result})
            }).catch((err) => {
                next(err)
            });
    }

    static getUser(req, res, next){
        console.log("jalan ga nih?");
        const id = req.params.id
        User.findOne({
            where: {
                id : +id
            }
            
        })
            .then((result) => {
                if(result){
                    res.status(200).json({result})
                } else {
                    next({
                        code: 404,
                        message: "User not Found"
                    })
                }
            })
            .catch((err) => {
                next(err)
            })
            
    }

}

module.exports = UserController