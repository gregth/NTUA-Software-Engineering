const BaseModel = require('./base')

module.exports = class ShopTag extends BaseModel {
    constructor(connection) {
        super('shop_tags', connection)

        this.rules = {
            select: {
                allowed_query_keys: [
                    'shop_id',
                ],
                selectable_fields: [
                    'shop_id',
                    'tag'
                ]
            },
            insert: {
                required_fields: [
                    'shop_id',
                    'tag'
                ],
                optional_fields: []
            },
            update: {
                updatable_fields: [],
                allowed_query_keys: ['shop_id']
            },
            delete: {
                allowed_query_keys: ['shop_id', 'tag']
            }
        }
    }
}
