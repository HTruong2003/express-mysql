import userRoute from './user.js'
import authRoute from './auth.js'
import bookRoute from './book.js'
import categoryRoute from './category.js'
import { notFound } from '../utils/handleError.js'

const route = (app) => {
    app.use('/api/categories', categoryRoute)
    app.use('/api/books', bookRoute)
    app.use('/api/users', userRoute)
    app.use('/api/auth', authRoute)

    app.use(notFound('Bad gateway'))
}

module.exports = route
