const BaseModel = require('./base')

module.exports = class User extends BaseModel {
    constructor(connection) {
        super('users', connection)
        this.rules = {
            select: {
                allowed_query_keys: [
                    'id',
                    'username',
                    'passwordHash'
                ],
                selectable_fields: [
                    'id',
                    'username',
                    'firstName',
                    'lastName',
                    'email',
                    'telephone',
                    'birthdate'
                ]
            },
            insert: {
                required_fields: [
                    'username',
                    'firstName',
                    'lastName',
                    'email',
                    'telephone',
                    'passwordHash',
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
