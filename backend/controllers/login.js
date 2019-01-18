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
        const passwordHash = password + 'hashed'

        const [user] = await this.model.list({username, passwordHash})
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
