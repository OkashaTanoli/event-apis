const BusinessAdmin = require('../model/businessadmin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const SignUpBusinessAdmin = async (req, res) => {
    const checkBusinessAdmin = await BusinessAdmin.find({ email: req.body.email })
    if (checkBusinessAdmin.length) {
        return res.status(409).json({ message: "Business Admin Already Exists" })
    }
    else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                })
            }
            else {
                try {
                    const businessAdmin = await BusinessAdmin.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        phoneNumber: req.body.phoneNumber,
                        address: req.body.address,
                        organization: req.body.organization
                    })
                    res.status(201).json({
                        message: 'Business Admin created successfully'
                    })
                }
                catch (err) {
                    res.status(500).json({
                        error: err
                    })
                }
            }
        })
    }
}




const LoginBusinessAdmin = async (req, res) => {
    try {
        const businessAdmin = await BusinessAdmin.findOne({ email: req.body.email })
        if (!businessAdmin) {
            return res.status(401).json({
                message: "Auth Failed"
            })
        }
        bcrypt.compare(req.body.password, businessAdmin.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth Failed"
                })
            }
            if (result) {
                const token = jwt.sign(
                    {
                        email: businessAdmin.email,
                        adminId: businessAdmin._id
                    },
                    process.env.JWT_KEY
                )
                return res.status(200).json({
                    messagae: "Auth Successful",
                    token: token
                })
            }
            res.status(401).json({
                message: "Auth Failed"
            })
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}



module.exports = {
    SignUpBusinessAdmin,
    LoginBusinessAdmin
}