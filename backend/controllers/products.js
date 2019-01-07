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
        if (result.insertId) {
            // TODO: possible race condition
            return this.read(result.insertId)
        }

        throw new Error(`Did not create product: ${JSON.stringify(params)}`)
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

        const result = await this.model.update(product_details, {id})
        if (result.affectedRows > 0) {
            return this.read(id)
        }

        throw new Error(`Did not update product ${id}: ${params}`)
    }

    async patch(params, id) {
        let product_details = this.validate_patch_params(params)

        const result = await this.model.update(product_details, {id})
        if (result.affectedRows > 0) {
            return this.read(id)
        }

        throw new Error(`Did not update product ${id}: ${params}`)
    }

    async delete(id) {
        let role = 'user', result
        if (role == 'admin') {
            result = await this.model.delete({id})
        } else {
            result = await this.model.update({'withdrawn': true}, {id})
        }

        if (result.affectedRows > 0) {
            return {message: 'OK'}
        }

        throw new Error(`Did not delete product ${id}`)
    }
}
