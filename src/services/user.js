import db from '../models'
import { comparePassword } from '../utils/helpers.js'
import { createToken } from '../middlewares/jwt.js'

export const getOne = (userId) =>
    new Promise(async (res, rej) => {
        try {
            const response = await db.User.findOne({
                where: { id: userId },
                attributes: {
                    exclude: ['password', 'role_code'],
                },
                include: [
                    {
                        model: db.Role,
                        as: 'role',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt'],
                        },
                    },
                ],
            })

            res({
                err: response ? 0 : 1,
                message: response ? 'User got successfully' : 'User not found',
                userData: response,
            })
        } catch (error) {
            rej(error)
        }
    })
