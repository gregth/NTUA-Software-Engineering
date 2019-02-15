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
                    'dateFrom',
                    'dateTo'
                ],
                selectable_fields: [
                    'id',
                    'price',
                    'shopId',
                    'productId',
                    'dateFrom',
                    'dateTo'
                ]
            },
            insert: {
                required_fields: [
                    'price',
                    'shopId',
                    'productId',
                    'dateFrom',
                    'dateTo'
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
