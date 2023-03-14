const router = require("express").Router();
const { SignUpOwner, LoginOwner } = require('../controller/owner')

router.route('/signup').post(SignUpOwner)
router.route('/login').post(LoginOwner)


module.exports = router