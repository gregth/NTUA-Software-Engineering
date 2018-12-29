const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./config.json')
const { createSimpleRouter } = require('./utils')
const mysql = require('mysql2/promise')

app.use(cors())

async function main() {
    const connection = await mysql.createConnection(config.db);

    console.log('Connected. Moving on...')
    const resources = ['products', 'shops', 'prices']
    for (const resource of resources) {
        app.use(`/${resource}`, createSimpleRouter(resource, connection))
    }

    app.listen(config.port, () => console.log(`Server listening on port ${config.port}`))
}

main().then().catch(err => {
    console.log(err)
})