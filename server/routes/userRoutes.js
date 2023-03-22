import UserModel from "../Models/User.js";
import jwt from 'jsonwebtoken'
import {Router} from "express";
import bcrypt from "bcrypt";
import config from "config";
import checkAuth from "../middleware/checkAuth.js";
import {userValidation} from "../utils/userValidator.js";
import handleValidation from "../utils/handleValidation.js";

const router = new Router()

router.post('/register', userValidation, handleValidation, async (req, res) => {
    try {
        const {email, password} = req.body
        const candidate = await UserModel.findOne({email: email})

        if (candidate) {
            return res.status(500).json({
                message: "user already exist",
                user: candidate
            })
        }

        const hashedPassword = await bcrypt.hash(password, 8)
        const user = await UserModel.create({
            email,
            passwordHash: hashedPassword,
        })

        const token = jwt.sign({
            _id: user._id
        }, config.get('secretKey'), {expiresIn: '30d'})

        console.log(user)

        res.status(200).json({
            message: "register success",
            user,
            token
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            err
        })
    }
})

router.post('/login', userValidation, handleValidation, async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})

        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            })
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.passwordHash)

        if(!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid login or password P"
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, config.get('secretKey'), {expiresIn: '30d'})

        res.status(200).json({
            message: 'login success',
            user,
            token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            err
        })
    }
})

router.get('/getMe', checkAuth, async (req, res) => {
    try {
        const user = await UserModel.findOne({_id: req.userId})

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        res.status(200).json({
            user
        })
    } catch (err) {
        res.status(500).json({
            err
        })
    }
})

export default router