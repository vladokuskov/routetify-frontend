import express, { Router } from 'express'
import routeRoutes from 'components/route/route.router'
import healthRoutes from 'components/healthcheck/healthcheck.router'

const router: Router = Router()

router.use(express.static('public'))
router.use(express.json())
router.use('/route', routeRoutes)
router.use('/health', healthRoutes)

export default router
