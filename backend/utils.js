const express = require('express')

const createControllerRoutes = controller => {
    const router = express.Router()
    router.get('/', (req, res) => controller.list(req, res))
    router.get('/:id', (req, res) => controller.read(req, res, req.params.id))
    router.post('/', (req, res) => controller.create(req, res))
    router.put('/:id', (req, res) => controller.put(req, res, req.params.id))
    router.patch('/:id', (req, res) => controller.patch(req, res, req.params.id))
    router.delete('/:id', (req, res) => controller.delete(req, res, req.params.id))

    return router
}

const createSimpleRouter = (key, connection) => {
    const ControllerClass = require(`./controllers/${key}`)
    const controller = new ControllerClass(connection)

    return createControllerRoutes(controller)
}

module.exports = {
    createControllerRoutes,
    createSimpleRouter
}
