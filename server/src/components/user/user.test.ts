const request = require('supertest')
import { describe, expect, it } from '@jest/globals'
import { UNAUTHORIZED } from 'http-status'
const app = require('app')

describe('GET /user', () => {
  it('Should handle unauthorized access and return an unauthorized error', async () => {
    const response = await request(app).get('/user')

    expect(response.status).toBe(UNAUTHORIZED)

    expect(response.body).toEqual({ message: 'Unauthorized' })
  })
})
