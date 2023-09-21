import { Router } from 'express'
import { loginUser, logoutUser, registerUser } from './auth.controller'
import { validateRegistrationBody } from './auth.middleware'

const router: Router = Router()

router.post('/register', validateRegistrationBody, registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

export default router
