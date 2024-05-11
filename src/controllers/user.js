import * as services from '../services/index.js'
import { internalServerError, badRequest } from '../utils/handleError.js'

export const getCurrent = async (req, res) => {
    try {
        const { id } = req.user
        console.log(id)
        const response = await services.getOne(id)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}
