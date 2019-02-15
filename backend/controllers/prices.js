const BaseController = require('./base')
const model = require('../models/price')
const dateformat = require('dateformat');
const {MalformedInput} = require('../errors')
const moment = require('moment')

module.exports = class PricesController extends BaseController {
    constructor(dbConnection) {
        super('prices', new model(dbConnection))

        this.formatResponse = item => {
            return {
                id: +item.id,
                price: +item.price,
                date: dateformat(item.date, 'yyyy-mm-dd'),
                productName: item.productName,
                productId: item.productId,
                productTags: [],
                shopId: item.shopId,
                shopName: item.shopName,
                shopTags: [],
                shopAddres: item.address,
                shopDist: 0
            }
        }
    }

    async list(params) {
        //{start = 0, count = 20, geoDist, geoLng, geoLat, dateFrom, dateTo, shops, products, tags, sort = 'price|ASC'}) {
        const conditions = {}

        if (!params.dateFrom && !params.dateTo) {
            // Case where bpth dates are missing, acceptable
            conditions.dateFrom = params.date = (new Date()).toISOString().split('T')[0]
            conditions.dateTo = conditions.dateFrom
        } else if (!params.dateFrom || !params.dateTo) {
            // One only missing, unacceptable
            throw new MalformedInput('Only single date parameter provided!')
        } else {
            if (!moment(params.dateFrom, "YYYY-MM-DD", true).isValid() ||
                    !moment(params.dateTo, "YYYY-MM-DD", true).isValid()) {
                throw new MalformedInput('Date Format must be YYYY-MM-DD')
            }
        }

        return super.list()
    }

    async create(params) {
        const price = await super.create(params)
        console.log(price)
        return this.read(price.id)
    }

    async read(id) {
        const price = await super.read(id)
        return price
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
