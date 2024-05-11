import express from 'express'
import * as controllers from '../controllers/index.js'
import { verifyToken } from '../utils/jwt.js'
import { checkAdmin, checkModeratorOrAdmin } from '../utils/middlewares.js'

const router = express.Router()

// Public

// Private
router.use(verifyToken)
router.use(checkAdmin)
router.get('/', controllers.getCurrent)

export default router
