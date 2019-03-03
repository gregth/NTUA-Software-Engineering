const BaseController = require('./base')
const model = require('../models/user')
const md5 = require('md5')
const { Unauthorized, NotFound } = require('../errors')

module.exports = class UserController extends BaseController {
    constructor(dbConnection, sessions) {
        super('login', new model(dbConnection), sessions)
    }

    async list() {
        throw new NotFound()
    }

    async create(params) {
        const { username, password } = params
        const passwordHash = md5(password)

        const [user] = await this.model.list({username, passwordHash})
        if (typeof user !== 'undefined') {
            const random = Math.round(Math.random() * 100000000)
            const token = md5(`${user.id}${user.username}${user.firstName}${user.lastName}${user.email}${random}`)
            this.sessions.set(token, user.admin === 1)
            return {token}
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
