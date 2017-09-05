
const router = require('../../core/raichu-middleware').Router()
const login = require('../passport/controller/login')

router.use('/passport/login', login.signIn)
router.use('/passport/logout', login.logout)

module.exports = router