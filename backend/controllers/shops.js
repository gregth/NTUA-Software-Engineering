const BaseController = require('./base')
const model = require('../models/shop')

module.exports = class ShopsController extends BaseController {
    constructor(dbConnection) {
        super('shops', new model(dbConnection))

        this.formatResponse = item => {
            return {
                id: +item.id,
                name: item.name,
                address: item.address,
                lng: item.lng,
                lat: item.lat,
                tags: [],
                withdrawn: !!item.withdrawn
            }
        }
    }
}
