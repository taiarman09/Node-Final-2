import { User } from "../models/UserModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const UserRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: 'All Filed Required'
            })
        }

        const ExitsUser = await User.findOne({ email })

        if (ExitsUser) {
            return res.status(400).json({
                status: false,
                message: "User Already Register"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const NewUser = await User({ id: User._id, name, email, password: hashPassword })
        await NewUser.save()

        return res.status(201).json({
            status: true,
            message: "User registered successfully!",
            data: {
                id: NewUser._id,
                name: NewUser.name,
                email: NewUser.email
            }
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `User Register Error ${error.message}`
        })
    }
}

export const UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: 'Both Filed Required'
            })
        }

        const ExitsUser = await User.findOne({ email })

        if (!ExitsUser) {
            return res.status(400).json({
                status: false,
                message: "Not Found Email and Password! Please Register First."
            })
        }

        const isMatch = await bcrypt.compare(password, ExitsUser.password)
        if (!isMatch) {
            return res.status(400).json({
                status: false,
                message: "Password is Incorrect"
            })
        }

        const token = jwt.sign(
            { id: ExitsUser._id, email: ExitsUser.email }, process.env.JWT, { expiresIn: '1d' }
        )

        return res.status(201).json({
            message: "Login successful",
            token: token
        })


    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `User Login Error ${error.message}`
        })
    }
}