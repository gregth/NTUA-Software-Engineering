const mysql = require('mysql2')
const config = require('../config.json')

const connection = mysql.createConnection(config.db);

module.exports = class BaseModel {
    constructor(table) {
        this.db = connection
        this.table = table
    }

    query(...args) {
        return this.db.query.apply(this.db, args)
    }
}
