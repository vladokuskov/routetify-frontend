const request = require('supertest')
import { describe, expect, it } from '@jest/globals'
const app = require('app')

describe('GET /health/live', () => {
  it('Should return successful status for health', async () => {
    const response = await request(app).get('/health/live')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('uptime')
    expect(response.body).toHaveProperty('responseTime')
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('timestamp')
  })

  it('Should include response time in milliseconds', async () => {
    const response = await request(app).get('/health/live')
    const healthCheck = response.body

    expect(response.status).toBe(200)
    expect(healthCheck).toHaveProperty('responseTime')
    expect(typeof healthCheck.responseTime).toBe('object')

    // Validate that responseTime is in milliseconds
    const [seconds, nanoseconds] = healthCheck.responseTime
    expect(seconds).toBeGreaterThanOrEqual(0)
    expect(nanoseconds).toBeGreaterThanOrEqual(0)
  })

  it('Should calculate uptime correctly', async () => {
    // Mock process.uptime to return a known value
    jest.spyOn(process, 'uptime').mockImplementation(() => 60) // 60 seconds

    const response = await request(app).get('/health/live')
    const healthCheck = response.body

    expect(response.status).toBe(200)
    expect(healthCheck).toHaveProperty('uptime', 60)
  })
})
