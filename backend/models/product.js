const BaseModel = require('./base')

module.exports = class Product extends BaseModel {
    constructor(connection) {
        super('products', connection)
        this.rules = {
            select: {
                allowed_select_keys: [
                    'id',
                    'name',
                    'barcode'
                ],
                selectable_fields: [
                    'id',
                    'name',
                    'description',
                    'barcode',
                    'withdrawn'
                ]
            },
            insert: {
                required_fields: [
                    'id',
                    'name',
                    'description',
                    'barcode'
                ],
                optional_fields: [
                    'withdrawn'
                ]
            },
            update: {
                updatable_fields: [
                    'id',   
                    'name',
                    'description',
                    'barcode',
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