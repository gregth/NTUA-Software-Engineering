const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./config.json')
const { createSimpleRouter } = require('./utils')

app.use(cors())

const resources = ['products', 'shops', 'prices']
for (const resource of resources) {
    app.use(`/${resource}`, createSimpleRouter(resource))
}

app.listen(config.port, () => console.log(`Server listening on port ${config.port}`))
