const User = require('../users/User')
const { validationResult } = require('express-validator')
const Play = require('./Play')

module.exports = {
    get: {
        createPlay(req, res){
           // console.log(req.user)
           const isLoggedIn = req.user !== undefined
            res.render('theatre/create-theater.hbs', {
                isLoggedIn
            })
        },
        detailsPlay(req, res){
            const { playId } = req.params
            const isLoggedIn = req.user !== undefined
            Play.findById(playId).lean().populate('usersLiked').then((play) => {
                const currUser = JSON.stringify(req.user._id)
                const imLiked = JSON.stringify(play.usersLiked).includes(currUser)
                res.render('theatre/theater-details.hbs', {
                    isLoggedIn,
                    play,
                    imLiked,
                    isCreator: JSON.stringify(req.user._id) === JSON.stringify(play.creator),
                    // imAlreadyIn
                })
            })
        },
        likePlay(req, res){
            const { playId } = req.params
            const userId = req.user._id
            return Promise.all([
                Play.updateOne({_id:playId}, {$push: {usersLiked: userId}}),
                User.updateOne({_id:userId}, {$push: {likedPlays: playId}})
            ]).then(([updatedPlay, updatedUser]) => {
                res.redirect(`/theaters/details/${playId}`)
            }).catch((err) => {
                console.log(err.message)
            })

        },
        deletePlay(req, res){
            const { playId } = req.params
            const userId = req.user._id
            return Promise.all([
                Play.deleteOne({_id:playId}),
                User.updateOne({_id:userId}, {$pull: {likedPlays: playId}})
            ]).then(([updatedPlay, updatedUser]) => {
                res.redirect(`/home/`)
            }).catch((err) => {
                console.log(err.message)
            })
        },
        editPlay(req, res){
            const isLoggedIn = req.user !== undefined
            const { playId } = req.params
            const play = Play.findById(playId).then((play) => {

            })
            res.render('theatre/edit-theater.hbs',{
                isLoggedIn,
                play
            })
        }
    },
    post: {
        createPlay(req, res, next){
            const { title, description, imageUrl, isPublic: isChecked } = req.body
            const isPublic = isChecked === 'on' ? true : false
            const createdAt = (new Date() + "").slice(0,24)
            const creator = req.user._id

            Play.create({ title, description, imageUrl, isPublic, createdAt, creator }).then((createdPlay) =>{
                console.log(createdPlay)
                res.status(201).redirect('/home/')
            })
            
        }
    }
}