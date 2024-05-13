import express from 'express'
import * as controllers from '../controllers/index.js'
import { checkSchema } from 'express-validator'
import { categoryValidation } from '../utils/validationSchema.js'

const router = express.Router()

router.post('/', checkSchema(categoryValidation), controllers.createCategory)

export default router
