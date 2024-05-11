import express from 'express'
import * as controllers from '../controllers/index.js'
import { checkSchema } from 'express-validator'
import { userValidation } from '../utils/validationSchema.js'

const router = express.Router()

router.post('/register', checkSchema(userValidation), controllers.register)
router.post('/login', checkSchema(userValidation), controllers.login)

export default router
