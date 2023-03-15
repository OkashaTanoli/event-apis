const router = require("express").Router();
const { SignUpBusinessAdmin, LoginBusinessAdmin,GetBusinessAdmin,UpdateBusinessAdmin,DeleteBusinessAdmin } = require('../controller/businessadmin');
const { CheckUser } = require("../middleware/checkuser");

router.route('/signup').post(SignUpBusinessAdmin)
router.route('/login').post(LoginBusinessAdmin)
router.route('/').get(CheckUser, GetBusinessAdmin).delete(CheckUser, DeleteBusinessAdmin).patch(CheckUser, UpdateBusinessAdmin)


module.exports = router