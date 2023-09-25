const request = require('supertest')
import { describe, expect, it } from '@jest/globals'
import { BAD_REQUEST } from 'http-status'
const app = require('app')

describe('Authorization middleware', () => {
  it('Should handle invalid token and return a bad request error', async () => {
    const response = await request(app).get('/user').set('Cookie', '123')

    expect(response.status).toBe(BAD_REQUEST)

    expect(response.body).toEqual({ message: 'Token not found in the cookie' })
  })

  it('Should handle missing token in the cookie and return a bad request error', async () => {
    const response = await request(app).get('/user').set('Cookie', 'token=123')

    expect(response.status).toBe(BAD_REQUEST)

    expect(response.body).toEqual({ message: 'Failed to authenticate token' })
  })
})
