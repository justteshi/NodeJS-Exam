const Play = require('../plays/Play')

module.exports = {
    get: {
        home(req, res, next) {
            const isLoggedIn = req.user !== undefined
            const limit = isLoggedIn ? 0 : 3
            const criteria = isLoggedIn ? { usersLiked: '-1' } : { createdAt: '-1' } 
            Play.find({ isPublic: true }).limit(limit).sort(criteria).lean().then((theaters) => {
                
                res.render('home/home.hbs', {
                    isLoggedIn,
                    theaters
                })
            })
            //console.log(req.user)
            
        }

    },
    post: {

    }
}