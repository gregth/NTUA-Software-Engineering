const BaseController = require('./base')
const model = require('../models/user')
const { Unauthorized } = require('../errors')

module.exports = class LogoutController extends BaseController {
    constructor(dbConnection) {
        super('users', new model(dbConnection))
    }

    async list() {
        throw new NotFound()
    }

    async create(params) {
        // TODO: IMPLEMENT ME
        return true
    }

    async read() {
        throw new NotFound()
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
