const BaseController = require('./base')
const model = require('../models/product')
const tagModel = require('../models/product_tag')

module.exports = class ProductsController extends BaseController {
    constructor(dbConnection) {
        super('products', new model(dbConnection))

        this.tagModel = new tagModel(dbConnection)

        this.formatResponse = item => {
            return {
                id: +item.id,
                name: item.name,
                description: item.description,
                category: item.category,
                tags: [], // fetched later
                withdrawn: !!item.withdrawn,
                extraData: {
                    barcode: +item.barcode,
                    brand: item.brand,
                    volume: +item.volume
                }
            }
        }
    }

    async read(id) {
        const product = await super.read(id)
        const tags = await this.tagModel.list({product_id: product.id})
        product.tags = tags.map(tag => tag.tag)

        return product
    }

    async create(params) {
        const { tags } = params

        const product = await super.create(params)

        if (typeof tags !== 'undefined') {
            const tagList = tags.split(',')
            for (const tag of tagList) {
                this.tagModel.insert({
                    product_id: product.id,
                    tag
                })
            }
        }

        return product
    }
}
