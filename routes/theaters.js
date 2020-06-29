const router = require('express').Router()
const handler = require('../handlers/plays')
const isAuth = require('../utils/isAuth')
const validations = require('../utils/validator')

router.get('/create', isAuth(), handler.get.createPlay)
router.get('/details/:playId', isAuth(true), handler.get.detailsPlay)
router.get('/like-play/:playId', isAuth(true), handler.get.likePlay)
router.get('/delete-play/:playId', isAuth(), handler.get.deletePlay)
router.get('/edit-play/:playId', isAuth(), handler.get.editPlay)


router.post('/create', isAuth(true), handler.post.createPlay)


module.exports = router