import { matchedData, validationResult } from 'express-validator'
import * as services from '../services/index.js'
import { internalServerError, badRequest } from '../utils/handleError.js'

export const register = async (req, res) => {
    try {
        const result = validationResult(req)
        if (!result.isEmpty())
            return result.errors.forEach((err) => badRequest(err, res))

        const data = matchedData(req)
        const response = await services.register(data)
        return res.status(201).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const login = async (req, res) => {
    try {
        const result = validationResult(req)
        console.log(result)
        if (!result.isEmpty())
            return result.errors.forEach((err) => badRequest(err, res))

        const data = matchedData(req)
        const response = await services.login(data)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}
