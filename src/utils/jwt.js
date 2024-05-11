import jwt from 'jsonwebtoken'
import { badRequest, unauthorized } from './handleError.js'

export const createToken = (id, email, role_code) => {
    return jwt.sign({ id, email, role_code }, process.env.JWT_SECRET, {
        expiresIn: '5d',
    })
}

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) return badRequest('Unauthorized', res)
    const accessToken = token.split(' ')[1]
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if (err) return unauthorized('Token may be expired or invalid', res)
        req.user = user
        next()
    })
}
