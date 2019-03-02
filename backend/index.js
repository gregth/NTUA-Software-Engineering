const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./config.json')
const { createSimpleRouter } = require('./utils')
const mysql = require('mysql2/promise')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

async function main() {
    const dbConnection = await mysql.createConnection(config.db);

    console.log('Connected to MySQL. Moving on...')
    const resources = ['products', 'shops', 'prices', 'users', 'login', 'logout']
    for (const resource of resources) {
        app.use(`/${resource}`, createSimpleRouter(resource, dbConnection))
    }

    app.listen(config.port, () => console.log(`Server listening on port ${config.port}`))
}

main().then().catch(err => {
    console.log(err)
})
