const BaseController = require('./base')
const model = require('../models/shop')

module.exports = class ShopsController extends BaseController {
    constructor(dbConnection) {
        super(new model(dbConnection))
    }

    async list() {
        const list = await this.model.list()
        return {shops: list}
    }

    async create(params) {
        console.log(params)
        let shop = this.validate_post_params(params)

        const result = await this.model.insert(shop)

        return result.affectedRows > 0
    }

    async read(id) {
        return {shops: (await this.model.list({id}))}
    }

    async put(params, id) {
        let shop_details = this.validate_put_params(params)

        const result = await this.model.update(shop_details, {id})

        return result.affectedRows > 0
    }

    async patch(params, id) {
        let shop_details = this.validate_patch_params(params)

        const result = await this.model.update(shop_details, {id})

        return result.affectedRows > 0
    }

    async delete(id) {
        var result = await this.model.delete({id})

        return result.affectedRows > 0
    }
}
