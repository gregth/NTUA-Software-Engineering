const BaseController = require('./base')
const model = require('../models/user')
const { NotFound } = require('../errors')

module.exports = class UserController extends BaseController {
    constructor(dbConnection) {
        super('users', new model(dbConnection))

        this.formatResponse = item => {
            return {
                id: +item.id,
                username: item.username,
                firstName: item.firstName,
                lastName: item.lastName,
                email: item.email,
                telephone: item.telephone,
                birthdate: item.birthdate
            }
        }
    }

    async list() {
        throw new NotFound()
    }

    async create(params) {
        // TODO: throw error if password is missing
        params.passwordHash = params.password + 'hashed'

        return super.create(params)
    }

    async put() {
        throw new NotFound()
    }

    async patch() {
        throw new NotFound()
    }

    async delete() {
        throw new NotFound()
    }
}
