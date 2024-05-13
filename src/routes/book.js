import express from 'express'
import * as controllers from '../controllers/index.js'
import { checkSchema } from 'express-validator'
import { bookValidation } from '../utils/validationSchema.js'
import {
    checkModeratorOrAdmin,
    resolveData,
} from '../middlewares/middlewares.js'
import { verifyToken } from '../middlewares/jwt.js'
import uploadCloud from '../middlewares/cloudinary.js'

const router = express.Router()

router.get('/', controllers.getAllBooks)
router.get('/:id', resolveData('Book'), controllers.getOneBook)

router.use(verifyToken)
router.use(checkModeratorOrAdmin)
router.post(
    '/',
    uploadCloud.single('image'),
    checkSchema(bookValidation),
    controllers.createBook
)
router.put(
    '/:id',
    uploadCloud.single('image'),
    checkSchema(bookValidation),
    controllers.updateBook
)
router.delete('/:id', resolveData('Book'), controllers.deleteBook)

export default router
