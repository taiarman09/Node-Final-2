import jwt, { decode } from 'jsonwebtoken'


export const middleWare = async (req, res, next) => {
    try {
        const token  = req.headers.token

        if (!token) {
            return res.status(404).json({
                status: false,
                message: "Not Found User Token"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT)
        req.User = decoded
        console.log(decoded)
        next()

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Invalid token ${error.message}`
        })
    }
}