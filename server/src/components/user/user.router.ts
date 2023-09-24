import { Router } from 'express'
import { getUser } from './user.controller'
import { verifyAuthorization } from 'core/middleware/verifyAuthorization'

const router: Router = Router()

router.get('/', verifyAuthorization, getUser)

export default router
