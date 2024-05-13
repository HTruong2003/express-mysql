import db from '../models'
import { generateCode } from '../utils/helpers.js'

export const createCategory = ({ value }) =>
    new Promise(async (res, rej) => {
        try {
            const checkExistValue = await db.Category.findOne({
                where: {
                    value: value.toUpperCase(),
                },
            })
            if (checkExistValue !== null)
                return res({
                    err: 1,
                    message: 'Category already exist',
                    category: null,
                })
            const response = await db.Category.create({
                code: generateCode(value),
                value,
            })
            res({
                err: response ? 0 : 1,
                message: response
                    ? 'Category created successfully'
                    : 'Category created failed',
                category: response,
            })
        } catch (error) {
            console.log(error)
            rej(error)
        }
    })
