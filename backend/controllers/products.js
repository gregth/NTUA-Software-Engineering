const BaseController = require('./base')
const model = require('../models/product')

module.exports = class ProductsController extends BaseController {
    constructor(dbConnection) {
        super('products', new model(dbConnection))

        this.formatResponse = item => {
            return {
                id: +item.id,
                name: item.name,
                description: item.description,
                category: item.category,
                tags: [],
                withdrawn: !!item.withdrawn,
                extraData: {
                    barcode: +item.barcode
                }
            }
        }
    }
}
