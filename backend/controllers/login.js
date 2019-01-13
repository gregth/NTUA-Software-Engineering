const BaseController = require('./base')
const model = require('../models/user')
const { Unauthorized } = require('../errors')

let connectedUsers = 0

module.exports = class UserController extends BaseController {
    constructor(dbConnection) {
        super('users', new model(dbConnection))
    }

    async list() {
        throw new NotFound()
    }

    async create(params) {
        const { username, password } = params
        const password_hash = password + 'hashed'

        const [user] = await this.model.list({username, password_hash})
        if (typeof user !== 'undefined') {
            return {token: connectedUsers++}
        }

        throw new Unauthorized()
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
