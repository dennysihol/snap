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

    static addUser(req, res, next) {
        console.log("Test");
        const body = req.body
        const newUser = {
            firstName : body.firstName,
            lastName : body.lastName,
            email : body.email
        }

        Product.create(newUser)
            .then((product) => {
                res.status(201).json({product, message: "New User Added"})
            })
            .catch((err) => {
                next({
                    code: 401,
                    message: "Not Authorized"
                })
            })
    }

}

module.exports = UserController