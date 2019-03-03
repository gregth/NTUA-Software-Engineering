const BaseController = require('./base')
const model = require('../models/user')
const { NotFound } = require('../errors')
const md5 = require('md5')

module.exports = class UserController extends BaseController {
    constructor(dbConnection, sessions) {
        super('users', new model(dbConnection), sessions)

        this.formatResponse = item => {
            return {
                id: +item.id,
                username: item.username,
                firstName: item.firstName,
                lastName: item.lastName,
                email: item.email,
                telephone: item.telephone,
                birthdate: item.birthdate,
                admin: item.admin
            }
        }
    }

    async list() {
        throw new NotFound()
    }

    async create(params) {
        // TODO: throw error if password is missing
        params.passwordHash = md5(params.password)

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
