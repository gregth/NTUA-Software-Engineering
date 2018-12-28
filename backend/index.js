const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3000
const { createSimpleRouter } = require('./utils')

app.use(cors())

const resources = ['products', 'shops', 'prices']
for (const resource of resources) {
    app.use(`/${resource}`, createSimpleRouter(resource))
}

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
