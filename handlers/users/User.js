const mongoose = require('mongoose')
const { Schema, model: Model } = mongoose
const { String, Number, ObjectId } = Schema.Types
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    likedPlays:[{
        type: ObjectId,
        ref: 'Play'
    }]
})

// match the hash with the right User password
userSchema.methods = {
    passwordsMatch(password){
        return bcrypt.compare(password, this.password )
    }
}

//Hash the User pass
userSchema.pre('save', function(next) {
    if (this.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            if(err) {
                return next(err)
            }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if(err) {
                    return next(err)
                }
                this.password = hash
                next()
            })
        })
        return
    }
    next()
})

module.exports = new Model('User', userSchema)