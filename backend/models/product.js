const BaseModel = require('./base')

module.exports = class Product extends BaseModel {
    constructor(connection) {
        super('products', connection)
        this.rules = {
            select: {
                allowed_query_keys: [
                    'id',
                    'name',
                    'barcode',
                    'withdrawn'
                ],
                selectable_fields: [
                    'id',
                    'name',
                    'description',
                    'category',
                    'barcode',
                    'withdrawn'
                ]
            },
            insert: {
                required_fields: [
                    'name',
                    'description',
                    'category',
                    'barcode'
                ],
                optional_fields: [
                    'withdrawn'
                ]
            },
            update: {
                updatable_fields: [
                    'name',
                    'description',
                    'barcode',
                    'category',
                    'withdrawn',
                ],
                allowed_query_keys: ['id']
            },
            delete: {
                allowed_query_keys: ['id']
            }
        }
    }
}
