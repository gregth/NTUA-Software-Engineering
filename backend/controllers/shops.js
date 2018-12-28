const BaseController = require('./base')

module.exports = class ShopsController extends BaseController {
    list(req, res) {
        res.sendStatus(204)
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
