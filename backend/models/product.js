const BaseModel = require('./base')

module.exports = class Product extends BaseModel {
    constructor(connection) {
        super('products', connection)
    }

    async list() {
        return await this.execute(`SELECT * FROM ${this.table}`)
    }
}