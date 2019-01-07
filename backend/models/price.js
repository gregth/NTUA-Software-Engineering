const BaseModel = require('./base')

module.exports = class Price extends BaseModel {
    constructor(connection) {
        super('prices', connection)
        this.rules = {
            select: {
                allowed_query_keys: [
                    'id',
                    'product_id',
                    'shop_id',
                    'dateFrom',
                    'dateTo'
                ],
                selectable_fields: [
                    'id',
                    'price',
                    'shop_id',
                    'product_id',
                    'dateFrom',
                    'dateTo'
                ]
            },
            insert: {
                required_fields: [
                    'price',
                    'shop_id',
                    'product_id',
                    'dateFrom',
                    'dateTo'
                ],
		optional_fields: []
            },
            update: {
                updatable_fields: [
                    'price',
                ],
                allowed_query_keys: ['id']
            },
            delete: {
                allowed_query_keys: ['id']
            }
        }
    }
}
