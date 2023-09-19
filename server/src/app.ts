import config from 'config'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import api from 'api'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: config.origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  }),
)

app.use(api)

module.exports = app
