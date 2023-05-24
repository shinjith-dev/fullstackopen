const app = require('./app')
const { PORT } = require('./util/config')
const logger = require('./util/logger')

app.listen(PORT, () => {
  logger.info(`Server runnning on port ${PORT}`)
})
