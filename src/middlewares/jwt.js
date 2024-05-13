import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { badRequest, unauthorized } from '../utils/handleError.js'

export const createToken = (id, email, role_code) => {
    return jwt.sign({ id, email, role_code }, process.env.JWT_SECRET, {
        expiresIn: '10s',
    })
}

export const createRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_REFRESH_TOKEN, {
        expiresIn: '5d',
    })
}

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) return badRequest('Unauthorized', res)
    const accessToken = token.split(' ')[1]
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            const check = err instanceof TokenExpiredError
            if (!check) return unauthorized('Token invalid', res, check)
            if (check) return unauthorized('Token expired', res, check)
        }
        req.user = user
        next()
    })
}
