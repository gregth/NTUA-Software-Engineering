const BaseController = require('./base')
const model = require('../models/product')
const { NotFound } = require('../errors')

module.exports = class ProductsController extends BaseController {
    constructor(dbConnection) {
        super(new model(dbConnection))

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

    async list({start = 0, count = 20, status = 'ACTIVE', sort = 'id|DESC'}) {
        const conditions = {}
        if (status === 'WITHDRAWN') {
            conditions.withdrawn = 1
        } else if (status === 'ACTIVE') {
            conditions.withdrawn = 0
        }

        const order = [{
            field_name: sort.split('|')[0],
            order: sort.split('|')[1]
        }]

        start = parseInt(start, 10)
        count = parseInt(count, 10)

        const list = await this.model.list(conditions, order)
        return {
            start,
            count,
            total: list.length,
            products: list.slice(start, start + count).map(this.formatResponse)
        }
    }

    async create(params) {
        let product = this.validate_post_params(params)

        const result = await this.model.insert(product)

        return result.affectedRows > 0
    }

    async read(id) {
        const products = await this.model.list({id})
        if (products.length === 0) {
            throw new NotFound()
        }

        return this.formatResponse(products[0])
    }

    async put(params, id) {
        let product_details = this.validate_put_params(params)
        console.log(product_details)

        const result = await this.model.update(product_details, {id})

        return result.affectedRows > 0
    }

    async patch(params, id) {
        let product_details = this.validate_patch_params(params)
        console.log(product_details)

        const result = await this.model.update(product_details, {id})

        return result.affectedRows > 0
    }

    async delete(id) {
        let role = 'user'
        if (role == 'admin') {
            var result = await this.model.delete({id})
        } else {
            var result = await this.model.update({'withdrawn': true}, {id})
        }

        return result.affectedRows > 0
    }
}
