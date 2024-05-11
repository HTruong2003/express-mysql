import userRoute from './user.js'
import authRoute from './auth.js'
import { notFound } from '../utils/handleError.js'

const route = (app) => {
    app.use('/api/users', userRoute)
    app.use('/api/auth', authRoute)

    app.use(notFound)
}

module.exports = route
