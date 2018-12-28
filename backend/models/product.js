const BaseModel = require('./base')

module.exports = class Product extends BaseModel {
    constructor() {
        super('products')
    }

    list() {
        return new Promise((resolve, reject) => {
            this.query(`SELECT * FROM ${this.table}`, (err, results) => {
                if (err) {
                    return reject(err)
                }

                resolve(results)
            })
        })
    }
}
