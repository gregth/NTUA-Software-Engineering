const BaseController = require('./base')
const model = require('../models/price')

module.exports = class PricesController extends BaseController {
    constructor(dbConnection) {
        super(new model(dbConnection))
    }

    async list() {
        const list = await this.model.list()
        return {prices: list}
    }

    async create(params) {
        let price = this.validate_post_params(params)

        const result = await this.model.insert(price)

        return result.affectedRows > 0
    }

    async read(id) {
        return {prices: (await this.model.list({id}))}
    }

    async put(params, id) {
        let price_details = this.validate_put_params(params)

        const result = await this.model.update(price_details, {id})

        return result.affectedRows > 0
    }

    async patch(params, id) {
        let price_details = this.validate_patch_params(params)

        const result = await this.model.update(price_details, {id})

        return result.affectedRows > 0
    }

    async delete(id) {
        var result = await this.model.delete({id})

        return result.affectedRows > 0
    }
}
