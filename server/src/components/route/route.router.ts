import { Router } from 'express'
import { parseRoute } from './route.controller'

const router: Router = Router()

router.post('/parse', parseRoute)

export default router
