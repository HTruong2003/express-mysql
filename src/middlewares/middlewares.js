import db from '../models/index.js'
import {
    badRequest,
    forbidden,
    internalServerError,
    notFound,
} from '../utils/handleError.js'

export const checkAdmin = (req, res, next) => {
    const { role_code } = req.user
    if (role_code !== 'R1')
        return forbidden(
            'You do not have permission to access this resource. Please enter admin account',
            res
        )
    next()
}

export const checkModeratorOrAdmin = (req, res, next) => {
    const { role_code } = req.user
    if (role_code !== 'R1' && role_code !== 'R2')
        return forbidden(
            'You do not have permission to access this resource. Please enter admin or moderator account',
            res
        )
    next()
}

export const resolveData = (model) => async (req, res, next) => {
    try {
        const {
            params: { id },
        } = req
        let parsedId
        if (!isNaN(id)) {
            parsedId = parseInt(id)
            return badRequest('Invalid ID', res)
        } else {
            parsedId = id
        }

        const findData = await db[model].findByPk(parsedId)

        if (!findData) {
            return notFound(`${model} not found`)(req, res)
        }
        req[`${model}`] = findData
        next()
    } catch (error) {
        console.log(error)
        return internalServerError(res)
    }
}
