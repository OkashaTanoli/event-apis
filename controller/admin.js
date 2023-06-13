const Admin = require('../model/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const SignUpAdmin = async (req, res) => {
    const checkAdmin = await Admin.find({ email: req.body.email })
    if (checkAdmin.length) {
        return res.status(409).json({ message: "Admin Already Exists" })
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
                    const admin = await Admin.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        phoneNumber: req.body.phoneNumber,
                        address: req.body.address,
                        organization: req.body.organization
                    })
                    res.status(201).json({
                        message: 'Admin created successfully',
                        id: admin._id
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




const LoginAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email })
        if (!admin) {
            return res.status(401).json({
                message: "Auth Failed"
            })
        }
        bcrypt.compare(req.body.password, admin.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth Failed"
                })
            }
            if (result) {
                const token = jwt.sign(
                    {
                        email: admin.email,
                        adminId: admin._id
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


const GetAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find()
        res.status(200).json(admins)
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }

}

const GetAdmin = async (req, res) => {
    const adminId = req.userData.adminId
    try {
        const admin = await Admin.findOne({ _id: adminId })
        if (!admin) {
            return res.status(401).json({
                message: 'auth token invalid'
            })
        }
        res.status(200).json(admin)
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}



const DeleteAdmin = async (req, res) => {
    const adminId = req.userData.adminId
    try {
        const admin = await Admin.findOneAndDelete({ _id: adminId })
        if (!admin) {
            return res.status(401).json({
                message: 'auth token invalid'
            })
        }
        res.status(200).json({ message: 'Admin deleted successfully' })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}




const UpdateAdmin = async (req, res) => {
    const adminId = req.userData.adminId
    const newObj = {}
    for (let i = 0; i < Object.keys(req.body).length; i++) {
        newObj[Object.keys(req.body)[i]] = Object.values(req.body)[i]
    }
    try {
        const admin = await Admin.findOneAndUpdate({ _id: adminId }, newObj)
        if (!admin) {
            return res.status(401).json({
                message: 'auth token invalid'
            })
        }
        res.status(200).json({ message: 'Admin updated successfully' })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}




module.exports = {
    SignUpAdmin,
    LoginAdmin,
    GetAllAdmins,
    GetAdmin,
    UpdateAdmin,
    DeleteAdmin
}