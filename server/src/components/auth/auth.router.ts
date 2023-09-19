import { Router } from 'express'
import { loginUser, logoutUser } from './auth.controller'

const router: Router = Router()

router.post('/login', loginUser)
router.post('/logout', logoutUser)

export default router
