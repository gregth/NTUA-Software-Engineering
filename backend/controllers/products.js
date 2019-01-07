const BaseController = require('./base')
const model = require('../models/product')
const { NotFound } = require('../errors')

module.exports = class ProductsController extends BaseController {
    constructor(dbConnection) {
        super(new model(dbConnection))
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

        const list = await this.model.list(conditions, order, count)
        return {products: list}
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

        return {products}
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
