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
        let validation = this.validate_post_request(req, res)
        if (validation.succesfull) {
            console.log("Gonna create a new product...")
            let product = validation.validated_params
            this.model.insert(product)
            res.status(200).json(validation.validated_params)
        } else {
            res.status(400).json({error: validation.error})
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
