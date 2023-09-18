import { Router } from 'express'
import { getHealth } from './health.controller'

const router: Router = Router()

router.get('/live', getHealth)

export default router
