import db from '../models'
import { hashPassword, comparePassword } from '../utils/helpers.js'
import { createRefreshToken, createToken } from '../middlewares/jwt.js'
import jwt from 'jsonwebtoken'

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
            const token = response[0]
                ? createToken(
                      response[0].id,
                      response[0].email,
                      response[0].role_code
                  )
                : null

            const refreshToken = response[0]
                ? createRefreshToken(response[0].id)
                : null

            res({
                err: response[0] ? 0 : 1,
                message: response[0]
                    ? 'Register is successful'
                    : 'Email already exists',
                accessToken: token && `Bearer ${token}`,
                refreshToken: refreshToken,
            })

            if (refreshToken) {
                await db.User.update(
                    {
                        refreshToken,
                    },
                    {
                        where: {
                            id: response[0].id,
                        },
                    }
                )
            }
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
                ? createToken(
                      response.id,
                      response.email,
                      response.role_code,
                      '10s'
                  )
                : null
            const refreshToken = isChecked
                ? createRefreshToken(response.id)
                : null
            res({
                err: token ? 0 : 1,
                message: token
                    ? 'Login is successful'
                    : response
                    ? 'Password is incorrect'
                    : 'Email is not registered',
                accessToken: token && `Bearer ${token}`,
                refreshToken: refreshToken,
            })

            if (refreshToken) {
                await db.User.update(
                    {
                        refreshToken,
                    },
                    {
                        where: {
                            id: response.id,
                        },
                    }
                )
            }
        } catch (error) {
            rej(error)
        }
    })

export const refreshToken = ({ refreshToken }) =>
    new Promise(async (res, rej) => {
        try {
            const response = await db.User.findOne({
                where: {
                    refreshToken,
                },
            })
            if (response) {
                jwt.verify(
                    refreshToken,
                    process.env.JWT_SECRET_REFRESH_TOKEN,
                    (err) => {
                        if (err) {
                            res({
                                err: 1,
                                message: err.message,
                            })
                        } else {
                            const accessToken = createToken(
                                response.id,
                                response.email,
                                response.role_code
                            )
                            res({
                                err: accessToken ? 0 : 1,
                                message: accessToken
                                    ? 'Refresh token successful'
                                    : 'Fail to refresh token',
                                accessToken: accessToken
                                    ? `Bearer ${accessToken}`
                                    : null,
                                refreshToken: refreshToken,
                            })
                        }
                    }
                )
            }

            res({
                err: 1,
                message: 'RefreshToken invalid',
            })
        } catch (error) {
            console.log(error)
            rej(error)
        }
    })
