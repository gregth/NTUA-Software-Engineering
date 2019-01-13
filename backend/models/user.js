const BaseModel = require('./base')

module.exports = class User extends BaseModel {
    constructor(connection) {
        super('users', connection)
        this.rules = {
            select: {
                allowed_query_keys: [
                    'id',
                    'username',
                    'password_hash'
                ],
                selectable_fields: [
                    'id',
                    'username',
                    'first_name',
                    'last_name',
                    'email',
                    'telephone',
                    'birthdate'
                ]
            },
            insert: {
                required_fields: [
                    'username',
                    'first_name',
                    'last_name',
                    'email',
                    'telephone',
                    'password_hash',
                    'birthdate'
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
