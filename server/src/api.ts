import express, { Router } from 'express'
import routeRoutes from 'components/route/route.router'
import authRoutes from 'components/auth/auth.router'
import healthRoutes from 'components/health/health.router'
import userRoutes from 'components/user/user.router'

const router: Router = Router()

router.use(express.static('public'))
router.use(express.json())
router.use('/route', routeRoutes)
router.use('/health', healthRoutes)
router.use('/auth', authRoutes)
router.use('/user', userRoutes)

export default router
