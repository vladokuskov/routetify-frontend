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
})
