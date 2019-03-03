const BaseController = require('./base')
const model = require('../models/user')
const { Unauthorized, NotFound } = require('../errors')

module.exports = class LogoutController extends BaseController {
    constructor(dbConnection, sessions) {
        super('users', new model(dbConnection), sessions)
    }

    async list() {
        throw new NotFound()
    }

    async create(params, token) {
        if (token && this.sessions.has(token)) {
            this.sessions.delete(token)
            return true
        }

        return false
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
