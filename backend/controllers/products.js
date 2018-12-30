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
            res.status(400).json(err)
        }
    }

    read(req, res, id) {
        res.send(`READ ID: ${req.params.id}`)
    }

    async put(req, res, id) {
        try {
            let product_details = this.validate_put_request(req, res, id)
            console.log(product_details)
            await this.model.update(product_details, {id})
            res.status(200).json(product_details)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    }

    async patch(req, res, id) {
        try {
            let product_details = this.validate_patch_request(req, res, id)
            console.log(product_details)
            await this.model.update(product_details, {id})
            res.status(200).json(product_details)
        } catch (err) {
            res.status(400).json({message: err.message})
        }
    }

    delete(req, res, id) {
        res.send(`DELETE ID: ${req.params.id}`)
    }
}
