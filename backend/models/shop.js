const BaseModel = require('./base')

module.exports = class Shop extends BaseModel {
    constructor(connection) {
        super('shops', connection)
        this.rules = {
            select: {
                allowed_query_keys: [
                    'id',
                    'name',
                    'withdrawn'
                ],
                selectable_fields: [
                    'id',
                    'name',
                    'address',
                    'lng',
                    'lat',
                    'withdrawn',
                    'telephone',
                ]
            },
            insert: {
                required_fields: [
                    'name',
                    'address',
                    'lng',
                    'lat'
                ],
                optional_fields: [
                    'telephone',
                    'withdrawn'
                ]
            },
            update: {
                updatable_fields: [
                    'name',
                    'address',
                    'lng',
                    'lat',
                    'withdrawn',
                    'telephone',
                ],
                allowed_query_keys: ['id']
            },
            delete: {
                allowed_query_keys: ['id']
            }
        }
    }
}
