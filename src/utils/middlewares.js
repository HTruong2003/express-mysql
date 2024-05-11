import { forbidden } from './handleError.js'

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
