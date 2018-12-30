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

    async create(req, res) {
        try {
            let product = this.validate_post_request(req, res)
            console.log("Creating a new product...")
            await this.model.insert(product)
            res.status(200).json(product)
        } catch (err) {
            rer.status(400).json(err)
        }
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
