const BaseModel = require('./base')

module.exports = class ProductTag extends BaseModel {
    constructor(connection) {
        super('product_tags', connection)

        this.rules = {
            select: {
                allowed_query_keys: [
                    'productId',
                ],
                selectable_fields: [
                    'productId',
                    'tag'
                ]
            },
            insert: {
                required_fields: [
                    'productId',
                    'tag'
                ],
                optional_fields: []
            },
            update: {
                updatable_fields: [],
                allowed_query_keys: ['productId']
            },
            delete: {
                allowed_query_keys: ['productId', 'tag']
            }
        }
    }
}
