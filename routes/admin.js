const router = require("express").Router();
const { SignUpAdmin, LoginAdmin, GetAdmin, UpdateAdmin, DeleteAdmin } = require('../controller/admin');
const { CheckUser } = require("../middleware/checkuser");

router.route('/signup').post(SignUpAdmin)
router.route('/login').post(LoginAdmin)
router.route('/').get(CheckUser, GetAdmin).delete(CheckUser, DeleteAdmin).patch(CheckUser, UpdateAdmin)



module.exports = router