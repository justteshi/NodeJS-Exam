const mongoose = require('mongoose')
const { Schema, model: Model } = mongoose
const { String, Boolean, ObjectId } = Schema.Types


const playSchema = new Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
        maxlength: 50,
    },
    imageUrl:{
        type: String,
        required: true
    },
    isPublic:{
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: String,
        required: true
    },
    creator:{
        type: ObjectId,
        ref: 'User'
    },
    usersLiked:[{
        type: ObjectId,
        ref: 'User'
    }]
})

playSchema.path('imageUrl').validate(function(url) {
    return url.startsWith('http://') || url.startsWith('https://')
}, 'Image url is not valid')

module.exports = new Model('Play', playSchema)