import { Router } from 'express'
import { verifyRoute } from './route.controller'

const router: Router = Router()

router.get('/verify', verifyRoute)

export default router
