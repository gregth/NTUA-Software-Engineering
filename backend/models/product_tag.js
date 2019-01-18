const BaseModel = require('./base')

module.exports = class ProductTag extends BaseModel {
    constructor(connection) {
        super('product_tags', connection)

        this.rules = {
            select: {
                allowed_query_keys: [
                    'product_id',
                ],
                selectable_fields: [
                    'product_id',
                    'tag'
                ]
            },
            insert: {
                required_fields: [
                    'product_id',
                    'tag'
                ],
                optional_fields: []
            },
            update: {
                updatable_fields: [],
                allowed_query_keys: ['product_id']
            },
            delete: {
                allowed_query_keys: ['product_id', 'tag']
            }
        }
    }
}
