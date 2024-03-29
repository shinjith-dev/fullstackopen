const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const logger = require('./util/logger')
const config = require('./util/config')
const middleware = require('./util/middleware')
const usersRoutes = require('./controllers/users')

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB: ', error.message)
  })

app.use(cors())
if (process.env.NODE_ENV === 'production') app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRoutes)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
