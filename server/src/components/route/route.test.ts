const request = require('supertest')
import app from 'app'

describe('POST /route/parse', () => {
  it('should return coordinates from parsed file', async () => {
    const response = await request
      .agent(app)
      .post('/route/parse')
      .set('content-type', 'multipart/form-data')
      .attach('file', 'server/src/mocks/route/correct_gpx.gpx')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('coords')
  })
})
