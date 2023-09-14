// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export default {
  port: parseInt(process.env.PORT || '5000', 10),
  origin: process.env.ORIGIN,
  allowedExtensions: ['gpx', 'kml'],
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
}
