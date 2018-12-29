const BaseController = require('./base')
const model = require('../models/product')

module.exports = class ProductsController extends BaseController {
    constructor(dbConnection) {
        super(new model(dbConnection))
    }

    async list(req, res) {
        try {
            const list = await this.model.list()
            res.send(JSON.stringify(list))
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    }

    create(req, res) {
        res.sendStatus(204)
    }

    read(req, res, id) {
        res.send(`READ ID: ${req.params.id}`)
    }

    put(req, res, id) {
        res.send(`PUT ID: ${req.params.id}`)
    }

    patch(req, res, id) {
        res.send(`PATCH ID: ${req.params.id}`)
    }

    delete(req, res, id) {
        res.send(`DELETE ID: ${req.params.id}`)
    }
}
