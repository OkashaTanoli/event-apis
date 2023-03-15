const router = require("express").Router();
const { SignUpOwner, LoginOwner, GetOwner, UpdateOwner, DeleteOwner } = require('../controller/owner');
const { CheckUser } = require("../middleware/checkuser");

router.route('/signup').post(SignUpOwner)
router.route('/login').post(LoginOwner)
router.route('/').get(CheckUser, GetOwner).delete(CheckUser, DeleteOwner).patch(CheckUser, UpdateOwner)


module.exports = router