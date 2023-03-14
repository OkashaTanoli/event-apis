const Owner = require('../model/owner')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const SignUpOwner = async (req, res) => {
    const owner = await Owner.find({ email: req.body.email })
    if (owner.length) {
        return res.status(409).json({ message: "Owner Already Exists" })
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
                    const owner = await Owner.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        phoneNumber: req.body.phoneNumber,
                        address: req.body.address,
                    })
                    res.status(201).json({
                        message: 'Owner created successfully'
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




const LoginOwner = async (req, res) => {
    try {
        const owner = await Owner.findOne({ email: req.body.email })
        if (!owner) {
            return res.status(401).json({
                message: "Auth Failed"
            })
        }
        bcrypt.compare(req.body.password, owner.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth Failed"
                })
            }
            if (result) {
                const token = jwt.sign(
                    {
                        email: owner.email,
                        adminId: owner._id
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
    SignUpOwner,
    LoginOwner
}