const request = require('supertest')
import { describe, expect, it } from '@jest/globals'
const app = require('app')

const testCases = [
  { file: 'correct_gpx.gpx', description: 'GPX with coordinates', status: 200 },
  {
    file: 'empty_coords_gpx.gpx',
    description: 'GPX without coordinates',
    status: 406,
  },
  { file: 'correct_kml.kml', description: 'KML with coordinates', status: 200 },
  {
    file: 'empty_coords_kml.kml',
    description: 'KML without coordinates',
    status: 406,
  },
  { file: 'empty.gpx', description: 'Empty file', status: 406 },
  {
    file: 'extension_wrong.gpxt',
    description: 'Wrong file extension',
    status: 406,
  },
  {
    file: 'extension_double.gpx.gpx',
    description: 'Double extension',
    status: 406,
  },
]

describe.each(testCases)('POST /route/parse (%#) - %s', ({ file, status }) => {
  it(`Should return ${
    status === 200 ? 'coordinates' : 'an error'
  } from response`, async () => {
    const filePath = `src/__mocks__/route/${file}`

    const response = await request(app)
      .post('/route/parse')
      .attach('file', filePath)

    expect(response.status).toBe(status)
    if (status === 200) {
      expect(response.body).toHaveProperty('coords')
    } else {
      expect(response.body).toHaveProperty('message')
    }
  })
})
