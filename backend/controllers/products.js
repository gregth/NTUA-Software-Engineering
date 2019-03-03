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

        this.sortable_rules = {
            default_key: 'id',
            default_order: 'DESC',
            allowed_sort_keys: ['id', 'name'],
            allowed_order: ['ASC', 'DESC']
        }
    }

    async list(params={start: 0, count: 20, status: 'ACTIVE', sort: 'id|DESC'}) {
        const conditions = {}

        if (params.barcode) {
            conditions.barcode = +params.barcode
        }

        if (params.categories) {
            conditions.category = params.categories.split(',')
        }

        if (params.search) {
            conditions.name = {type: 'LIKE', value: params.search}
        }

        if (params.status === 'WITHDRAWN') {
            conditions.withdrawn = 1
        } else if (params.status === 'ACTIVE') {
            conditions.withdrawn = 0
        }

        const response = await super.list(conditions, params)
        const products = response.products
        for (const product of products) {
            const tags = await this.tagModel.list({productId: product.id})
            product.tags = tags.map(tag => tag.tag)
        }

        return response
    }

    async read(id) {
        const product = await super.read(id)
        const tags = await this.tagModel.list({productId: product.id})
        product.tags = tags.map(tag => tag.tag)

        return product
    }

    async create(params) {
        const { tags } = params

        const product = await super.create(params)

        if (typeof tags !== 'undefined') {
            const tagList = typeof tags === 'string' ? [tags] : tags
            for (const tag of tagList) {
                this.tagModel.insert({
                    productId: product.id,
                    tag
                })
            }
        }

        return this.read(product.id)
    }
}
