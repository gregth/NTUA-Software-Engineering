const BaseController = require('./base')
const model = require('../models/shop')
const tagModel = require('../models/shop_tag')

module.exports = class ShopsController extends BaseController {
    constructor(dbConnection) {
        super('shops', new model(dbConnection))

        this.tagModel = new tagModel(dbConnection)

        this.formatResponse = item => {
            return {
                id: +item.id,
                name: item.name,
                address: item.address,
                lng: item.lng,
                lat: item.lat,
                tags: [], // fetched later
                withdrawn: !!item.withdrawn,
                telephone: item.telephone
            }
        }

        this.sortable_rules = {
            default_key: 'id',
            default_order: 'DESC',
            allowed_sort_keys: ['id', 'name'],
            allowed_order: ['ASC', 'DESC']
        }
    }

    async read(id) {
        const shop = await super.read(id)
        const tags = await this.tagModel.list({shopId: shop.id})
        shop.tags = tags.map(tag => tag.tag)

        return shop
    }

    async create(params) {
        const { tags } = params

        const shop = await super.create(params)

        if (typeof tags !== 'undefined') {
            const tagList = typeof tags === 'string' ? [tags] : tags
            for (const tag of tagList) {
                this.tagModel.insert({
                    shopId: shop.id,
                    tag
                })
            }
        }

        return this.read(shop.id)
    }

    async list(params={start: 0, count: 20, status: 'ACTIVE', sort: 'id|DESC'}) {
        const conditions = {}

        if (params.status === 'WITHDRAWN') {
            conditions.withdrawn = 1
        } else if (params.status === 'ACTIVE') {
            conditions.withdrawn = 0
        }

        let having
        if (params.geoDist && params.geoLng && params.geoLat) {
            having = {
                type: 'DISTANCE',
                lat: params.geoLat,
                lng: params.geoLng,
                radius: params.geoDist
            }
        }

        const result = await super.list(conditions, params, having)
        for (const shop of result.shops) {
            const tags = await this.tagModel.list({shopId: shop.id})
            shop.tags = tags.map(tag => tag.tag)
        }

        return result
    }
}
