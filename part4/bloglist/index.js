const app = require('./app')
const logger = require('./util/logger')

const PORT = 3003
app.listen(PORT,()=>{
    logger.info(`Server runnning on port ${PORT}`)
})