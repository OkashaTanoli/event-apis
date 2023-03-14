const Client = require('../model/client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SignUpClient = async (req, res) => {
    const checkclient = await Client.find({ email: req.body.email })
    if (checkclient.length) {
        return res.status(409).json({ message: "User Already Exists" })
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
                    const user = await Client.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        phoneNumber: req.body.phoneNumber,
                        address: req.body.address,
                        familySize: req.body.familySize,
                        // activeStatus: req.body.activeStatus,
                        // clientStatus: req.body.clientStatus,
                        clientAttandance: req.body.clientAttandance
                    })
                    res.status(201).json({
                        message: 'User created successfully'
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


const LoginClient = async (req, res) => {
    try {
        const user = await Client.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({
                message: "Auth Failed"
            })
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth Failed"
                })
            }
            if (result) {
                const token = jwt.sign(
                    {
                        email: user.email,
                        userId: user._id
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


const GetClient = async (req, res) => {
    const userId = req.userData.userId
    try {
        const user = await Client.findOne({ _id: userId })
        if (!user) {
            return res.status(401).json({
                message: 'auth token invalid'
            })
        }
        res.status(200).json(user)
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}


const DeleteClient = async (req, res) => {
    const userId = req.userData.userId
    try {
        const user = await Client.findOneAndDelete({ _id: userId })
        if (!user) {
            return res.status(401).json({
                message: 'auth token invalid'
            })
        }
        res.status(200).json({ message: 'User deleted successfully' })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}


const UpdateClient = async (req, res) => {
    const userId = req.userData.userId
    const newObj = {}
    for (let i = 0; i < Object.keys(req.body).length; i++) {
        newObj[Object.keys(req.body)[i]] = Object.values(req.body)[i]
    }
    try {
        const user = await Client.findOneAndUpdate({ _id: userId }, newObj)
        if (!user) {
            return res.status(401).json({
                message: 'auth token invalid'
            })
        }
        res.status(200).json({ message: 'User updated successfully' })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}


module.exports = {
    SignUpClient,
    LoginClient,
    GetClient,
    UpdateClient,
    DeleteClient
}