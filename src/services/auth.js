import db from '../models'
import { hashPassword, comparePassword } from '../utils/helpers.js'
import { createToken } from '../middlewares/jwt.js'

export const register = ({ email, password }) =>
    new Promise(async (res, rej) => {
        try {
            const response = await db.User.findOrCreate({
                where: { email },
                defaults: {
                    email,
                    password: hashPassword(password),
                },
            })
            const token = response[1]
                ? createToken(
                      response[1].id,
                      response[1].email,
                      response[1].role_code
                  )
                : null
            res({
                err: response[1] ? 0 : 1,
                message: response[1]
                    ? 'Register is successful'
                    : 'Email already exists',
                accessToken: token && `Bearer ${token}`,
            })
        } catch (error) {
            rej(error)
        }
    })

export const login = ({ email, password }) =>
    new Promise(async (res, rej) => {
        try {
            const response = await db.User.findOne({
                where: { email },
                raw: true,
            })
            const isChecked =
                response && comparePassword(password, response.password)
            const token = isChecked
                ? createToken(response.id, response.email, response.role_code)
                : null
            res({
                err: token ? 0 : 1,
                message: token
                    ? 'Login is successful'
                    : response
                    ? 'Password is incorrect'
                    : 'Email is not registered',
                accessToken: token && `Bearer ${token}`,
            })
        } catch (error) {
            rej(error)
        }
    })
