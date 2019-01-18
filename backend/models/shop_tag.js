const BaseModel = require('./base')

module.exports = class ShopTag extends BaseModel {
    constructor(connection) {
        super('shop_tags', connection)

        this.rules = {
            select: {
                allowed_query_keys: [
                    'shopId',
                ],
                selectable_fields: [
                    'shopId',
                    'tag'
                ]
            },
            insert: {
                required_fields: [
                    'shopId',
                    'tag'
                ],
                optional_fields: []
            },
            update: {
                updatable_fields: [],
                allowed_query_keys: ['shopId']
            },
            delete: {
                allowed_query_keys: ['shopId', 'tag']
            }
        }
    }
}
