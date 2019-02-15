const BaseModel = require('./base')

module.exports = class Price extends BaseModel {
    constructor(connection) {
        super('prices', connection)
        this.rules = {
            select: {
                allowed_query_keys: [
                    'id',
                    'productId',
                    'shopId',
                    'date',
                ],
                selectable_fields: [
                    'prices.id',
                    'price',
                    'date',
                    'shopId',
                    'shops.name AS shopName',
                    'shops.address',
                    'products.name AS productName',
                    'productId',
                ],
                joins: [{
                    type: 'INNER JOIN',
                    table: 'shops',
                    on:'prices.shopId = shops.id'
                }, {
                    type: 'INNER JOIN',
                    table: 'products',
                    on:'prices.productId = products.id'
                }],
                ambiguous_fields_mappings: {
                    'id': 'prices.id',
                    'name': 'products.name'
                }
            },
            insert: {
                required_fields: [
                    'price',
                    'shopId',
                    'productId',
                    'date',
                ],
                optional_fields: []
            },
            update: {
                updatable_fields: [],
                allowed_query_keys: []
            },
            delete: {
                allowed_query_keys: []
            }
        }
    }
}
