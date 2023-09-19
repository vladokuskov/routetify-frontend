const request = require('supertest')
import { describe, expect, it } from '@jest/globals'
const app = require('app')

// GPX

describe('POST /route/parse (1)', () => {
  it('Should return coordinates from response, GPX', async () => {
    const response = await request(app)
      .post('/route/parse')
      .attach('file', 'src/__mocks__/route/gpx/correct_gpx.gpx')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('coords')
  })
})

describe('POST /route/parse (2)', () => {
  it('Should return error about file without coordinates', async () => {
    const response = await request(app)
      .post('/route/parse')
      .attach('file', 'src/__mocks__/route/gpx/empty_coords_gpx.gpx')

    expect(response.status).toBe(406)
    expect(response.body).toHaveProperty('message')
  })
})

// KML

describe('POST /route/parse (3)', () => {
  it('Should return coordinates from response, KML', async () => {
    const response = await request(app)
      .post('/route/parse')
      .attach('file', 'src/__mocks__/route/kml/correct_kml.kml')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('coords')
  })
})

describe('POST /route/parse (4)', () => {
  it('Should return error about file without coordinates', async () => {
    const response = await request(app)
      .post('/route/parse')
      .attach('file', 'src/__mocks__/route/kml/empty_coords_kml.kml')

    expect(response.status).toBe(406)
    expect(response.body).toHaveProperty('message')
  })
})

// GENERAL

describe('POST /route/parse (5)', () => {
  it('Should return error about empty file', async () => {
    const response = await request(app)
      .post('/route/parse')
      .attach('file', 'src/__mocks__/route/empty.gpx')

    expect(response.status).toBe(406)
    expect(response.body).toHaveProperty('message')
  })
})

describe('POST /route/parse (6)', () => {
  it('Should return error about extension', async () => {
    const response = await request(app)
      .post('/route/parse')
      .attach('file', 'src/__mocks__/route/extension_wrong.gpxt')

    expect(response.status).toBe(406)
    expect(response.body).toHaveProperty('message')
  })
})

describe('POST /route/parse (7)', () => {
  it('Should return error about single extension', async () => {
    const response = await request(app)
      .post('/route/parse')
      .attach('file', 'src/__mocks__/route/extension_double.gpx.gpx')

    expect(response.status).toBe(406)
    expect(response.body).toHaveProperty('message')
  })
})

describe('POST /route/parse (8)', () => {
  it('Should return error about content type', async () => {
    const response = await request(app).post('/route/parse')

    expect(response.status).toBe(406)
    expect(response.body).toHaveProperty('message')
  })
})
