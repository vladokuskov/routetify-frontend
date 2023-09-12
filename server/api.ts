import express, { Router } from 'express'
import routeRoutes from '@components/route/route.router'

const router: Router = Router()

router.use(express.json())
router.use('/route', routeRoutes)

export default router
