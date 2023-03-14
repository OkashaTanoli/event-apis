const router = require("express").Router();
const { SignUpAdmin,LoginAdmin} = require('../controller/admin')

router.route('/signup').post(SignUpAdmin)
router.route('/login').post(LoginAdmin)


module.exports = router