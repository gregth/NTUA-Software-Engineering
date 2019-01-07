const BaseController = require('./base')
const model = require('../models/price')

module.exports = class PricesController extends BaseController {
    constructor(dbConnection) {
        super('prices', new model(dbConnection))

        this.formatResponse = item => {
            return {
                price: item.price,
                productId: item.productId,
                shopId: item.shopId,
                lat: item.lat,
                tags: [],
                withdrawn: !!item.withdrawn
            }
        }
    }

    async list({start = 0, count = 20, geoDist, geoLng, geoLat, dateFrom, dateTo, shops, products, tags, sort = 'price|ASC'}) {
        const order = [{
            field_name: sort.split('|')[0],
            order: sort.split('|')[1]
        }]

        const list = await this.model.list(null, order)

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
