// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export default {
  port: parseInt(process.env.PORT || '5000', 10),
  origin: process.env.ORIGIN || 'http://localhost:3000',
  allowedExtensions: ['gpx', 'kml'],
  saltRounds: process.env.SALT_ROUND || 12,
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },
}
