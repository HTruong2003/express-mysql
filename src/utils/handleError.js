import createError from 'http-errors'

export const badRequest = (err, res) => {
    const error = createError.BadRequest(err)
    return res.status(error.status).json({
        err: 1,
        message: error.message,
    })
}

export const internalServerError = (res) => {
    const error = createError.InternalServerError()
    return res.status(error.status).json({
        err: 1,
        message: error.message,
    })
}

export const notFound = (req, res) => {
    const error = createError.NotFound('Bad gateway')
    return res.status(error.status).json({
        err: 1,
        message: error.message,
    })
}

export const unauthorized = (err, res) => {
    const error = createError.Unauthorized(err)
    return res.status(error.status).json({
        err: 1,
        message: error.message,
    })
}

export const forbidden = (err, res) => {
    const error = createError.Forbidden(err)
    return res.status(error.status).json({
        err: 1,
        message: error.message,
    })
}
