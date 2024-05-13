import express from 'express'
import * as controllers from '../controllers/index.js'
import { verifyToken } from '../middlewares/jwt.js'

const router = express.Router()

router.use(verifyToken)
router.get('/', controllers.getCurrent)

export default router
