import { Router } from 'express'
import { loginUser, logoutUser, registerUser } from './auth.controller'
import { validateAuthBody } from './auth.middleware'

const router: Router = Router()

router.post('/register', validateAuthBody, registerUser)
router.post('/login', validateAuthBody, loginUser)
router.post('/logout', logoutUser)

export default router
