const User = require('./User')
const jwt = require('../../utils/jwt')
const { cookie } = require('../../config/config')
const { model } = require('mongoose')


module.exports = {
    get: {
        login(req, res, next){
            res.render('user/login.hbs')
        },
        register(req, res, next){
            res.render('user/register.hbs')
        },
        logout(req, res, next){
            req.user = null
            res.clearCookie(cookie).redirect('/home/')
        }
    },

    post: {
        login(req, res, next){
            const { username, password } = req.body

            console.log(req.body)
            User.findOne({ username }).then((user) => { 
                return Promise.all([user.passwordsMatch(password), user])
            }).then(([match, user]) => {
                if(!match) {
                    next(err) //Add the validator
                    return
                }
                const token = jwt.createToken(user)

                res.status(201).cookie(cookie, token, { maxAge: 3600000 }).redirect('/home')

            }).catch((error) => {
                console.log(error)
            })

        },
        register(req, res, next){
            const { username, password, repeatPassword} = req.body
            console.log(username, password, repeatPassword)

            if(password !== repeatPassword) {
                res.render('user/register.hbs', {
                    message: 'Password do not match !',
                    oldInput: {username, password, repeatPassword}
                })
                return
            }

            User.findOne({ username }).then((currUser) => {
                if(currUser){
                    throw new Error('The given username is already used !')
                }
                return User.create({ username, password })    
            }).then((createdUser) => {
                res.redirect('/users/login')
            }).catch((err) => {
                res.render('user/register.hbs', {
                    message: err.message,
                    oldInput: { username, password, repeatPassword } 
                })
            })

        }

    }
}