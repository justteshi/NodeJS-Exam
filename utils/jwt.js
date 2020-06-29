const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')


module.exports = {
    createToken(data) {                            //token Expires in 1 hour
        return jwt.sign({ _id: data._id }, secret, { expiresIn: '1h' })
    },
    veryfyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, data) => {
                if(err) {
                    reject(err)
                    return
                }
                resolve(data)
                return
            })
        }) 
    }
}