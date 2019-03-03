const BaseController = require('./base')
const model = require('../models/price')
const dateformat = require('dateformat');
const {MalformedInput} = require('../errors')
const moment = require('moment')
const productTagModel = require('../models/product_tag')
const shopTagModel = require('../models/shop_tag')

module.exports = class PricesController extends BaseController {
    constructor(dbConnection) {
        super('prices', new model(dbConnection))

        this.productTagModel = new productTagModel(dbConnection)
        this.shopTagModel = new shopTagModel(dbConnection)

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
                shopAddress: item.address,
                shopDist: item.distance,
                brand: item.brand,
                volume: item.volume,
                category: item.category,
                description: item.description,
                telephone: item.telephone,
                barcode: item.barcode,
                lng: item.lng,
                lat: item.lat,
                shopWithdrawn: item.shopWithdrawn,
                productWithdrawn: item.productWithdrawn
            }
        }

        this.sortable_rules = {
            default_key: 'price',
            default_order: 'ASC',
            allowed_sort_keys: ['price', 'dist', 'date'],
            allowed_order: ['ASC', 'DESC'],
            key_mappings: {'dist': 'distance'}
        }
    }

    async list(params) {
        const conditions = {}

        let dateFrom, dateTo
        if (!params.dateFrom && !params.dateTo) {
            // Case where bpth dates are missing, acceptable
            dateFrom = params.date = (new Date()).toISOString().split('T')[0]
            dateTo = dateFrom 
        } else if (!params.dateFrom || !params.dateTo) {
            // One only missing, unacceptable
            throw new MalformedInput('Only single date parameter provided!')
        } else {
            let momentFrom = moment(params.dateFrom, "YYYY-MM-DD", true)
            let momentTo = moment(params.dateTo, "YYYY-MM-DD", true)
            if (!momentFrom.isValid() || !momentTo.isValid()) {
                throw new MalformedInput('Date Format must be YYYY-MM-DD')
            }

            let diff =  momentTo.diff(momentFrom, 'days') + 1
            if (diff <= 0) {
                throw new MalformedInput('dateTo must be >= dateFrom')
            }
            
            dateFrom = params.dateFrom
            dateTo = params.dateTo  
        }

        conditions.date = {
            type: 'BETWEEN_DATE',
            lower: dateFrom,
            upper: dateTo
        } 

        if (params.tags) {
            conditions.tags = {
                type: 'TAGS',
                tags: this.arrayify(params.tags)
            }
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

        if (params.sort) {
            let sort_strings = this.arrayify(params.sort)
            console.log('dist|ASC' in sort_strings)
            if (sort_strings.includes('dist|ASC') 
                    || sort_strings.includes('dist|DESC')) {
                if (!(params.geoDist && params.geoLng && params.geoLat)) {
                    throw new MalformedInput('You must provide your location in order to sort by distance')
                }
            }
        }

        if (params.shops) {
            conditions.shopId = this.arrayify(params.shops)
        }
        if (params.products) {
            conditions.productId = this.arrayify(params.products)
        }

        if (params.price) {
            conditions.price = {
                operator: '<=',
                value: +params.price
            }
        }

        if (params.category) {
            conditions['products.category'] = params.category
        }

        conditions.distinct = true
        const response = await super.list(conditions, params, having)
        const prices = response.prices
        const productTags = new Map()
        const shopTags = new Map()
        for (const price of prices) {
            if (!productTags.has(price.productId)) {
                const tags = (await this.productTagModel.list({productId: price.productId})).map(tag => tag.tag)
                productTags.set(price.productId, tags)
            }
            price.productTags = productTags.get(price.productId)

            if (!shopTags.has(price.shopId)) {
                const tags = (await this.shopTagModel.list({shopId: price.shopId})).map(tag => tag.tag)
                shopTags.set(price.shopId, tags)
            }
            price.shopTags = shopTags.get(price.shopId)
        }

        return response
    }

    async create(params) {
        let momentFrom = moment(params.dateFrom, "YYYY-MM-DD", true)
        let momentTo = moment(params.dateTo, "YYYY-MM-DD", true)
        if (!momentFrom.isValid() || !momentTo.isValid()) {
            throw new MalformedInput('Date Format must be YYYY-MM-DD')
        }

        let diff =  momentTo.diff(momentFrom, 'days')
        if (diff < 0) {
            throw new MalformedInput('dateTo must be >= dateFrom')
        }

        delete params.dateFrom
        delete params.dateTo

        let prices = []
        params.date = momentFrom.format('YYYY-MM-DD')
        let price = await super.create(params)
        let price_encoded = await super.read(price.id)
        prices.push(price_encoded)

        // Add for rest of the days
        for (let i = 0; i < diff; i++) {
            params.date = momentFrom.add(1, 'days').format('YYYY-MM-DD')
            price = await super.create(params)
            price_encoded = await super.read(price.id)
            prices.push(price_encoded)
        }
        return prices
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
